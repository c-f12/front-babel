(function (history) {
  //Crea el objeto historyManager y guarda dentro todas las funciones.
  //Otra forma de hacerlo, crear historyManager como una función y hacer todos los métodos como prototypes,
  //y para inicializar el objeto abajo ponemos new HistoryManager.init().
  var historyManager = {
    /**
     * Inicializa la app
     */
    init: function () {
      this.historyManager = this;
      this.pageInfo = {};
      this.getDomElements(); // Obtiene los elementos del DOM que vamos a utilizar
      this.shimLinks(); // establece el mismo manejador de eventos para todos los enlaces
      this.listenHistoryStates(); // informa por consola de los eventos de los estados
      this.loadCurrentState();
    },
    /**
     * Obtiene los elementos del DOM que vamos a utilizar
     */
    getDomElements: function () {
      this.links = document.querySelectorAll('#menu a');
      this.titleElement = document.getElementById('title');
      this.contentElement = document.getElementById('content');
    },
    //Creamos el manejador de eventos para todos los enlaces: (el manejador es processLink)
    shimLinks: function () {
      for (var index = 0; index < this.links.length; index++) {
        this.links[index].addEventListener('click', this.processLink.bind(this), false);
      }
    },
    /**
     * Manejador de eventos de todos los enlaces:
     */
    processLink: function (e) {
      //El preventDefault lo hace sobre el objeto Event.
      event.preventDefault();
      //Guardo los datos de la página:
      this.pageInfo = {
        timestamp: (new Date()).getMilliseconds(),
        title: e.currentTarget.title,
        srcUrl: e.currentTarget.href,
        url: e.currentTarget.href,
        jsonFile: this.getJsonFile(e.currentTarget.href)
      };
      //Me traigo los datos:
      historyManager.getDataFromJson(this.pageInfo.jsonFile);
    },
    //Transforma en una URL completa el parámetro:
    getJsonFile: function (url) {
      return 'data/' + url
        .substring(url.lastIndexOf('/') + 1)
        .replace('.html', '.json');
    },
    getParameterByName: function (name) {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
      return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    },
    //Llamada AJAX pura:
    getDataFromJson: function (jsonFile) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', jsonFile, true);
      xhr.onreadystatechange = jsonGot.bind(this);
      xhr.send();

      function jsonGot() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            
            var pageData = JSON.parse(xhr.responseText);
            historyManager.titleElement.innerHTML = pageData.title;
            document.title = pageData.title;
            //Escribo los datos que me han llegado por JSON:
            historyManager.contentElement.innerHTML = pageData.content;
            //Disparo el pushState:
            history.pushState(this.pageInfo, pageData.title, this.pageInfo.url);
          } else {
            alert('There was a problem with the request.');
          }
        }
      }
    },
    loadCurrentState: function () {
      var jsonFile;
      if (history.state && history.state.jsonFile) {
        jsonFile = history.state.jsonFile;
      } else {
        this.getParameterByName('from');
        var urlFrom = location.pathname.replace('index', this.getParameterByName('from'));
        jsonFile = this.getJsonFile(urlFrom);
      }
      if (jsonFile && jsonFile != 'data/') {
        console.log(jsonFile)
        this.getDataFromJson(jsonFile);
      }
    },
    listenHistoryStates: function () {
      window.addEventListener('popstate', function (e) {
        console.log('popstate event ==> %o', e);
      }, false);
      window.addEventListener('hashchange', function (e) {
        console.log('popstate event ==> %o', e);
      }, false);
    },
    //Cuando navegamos por el historial(hacia atras) se dispara esta función:
    onpopstate: function (e) {
      console.log(this, e);
    }
  };

  historyManager.init();

})(window.history);