(function() {
    window.addEventListener('load', app, false)

    function app() {
        let socket = new WebSocket('ws://localhost:8085')
        let eBoton = document.querySelector('#btnSend')
        let eInput = document.querySelector('#nptName')

        eBoton.addEventListener('click', btnSend)
        connect()

        function btnSend () {
            let data = eInput.value || 'Pepe'
            socket.send(data)
        }

        function connect() {
            socket.onopen = function(){
                console.log("Socket has been opened!");
            }

            socket.onmessage = function(evt) {
                console.log("Recibido ", evt.data);
            }
        } // FIn de la función connect
    }

})()

/* Enviamos un nombre al servidor, el servidor recibe el nombre y 
te lo reenvia y muestra en consola Hola + nombre */
