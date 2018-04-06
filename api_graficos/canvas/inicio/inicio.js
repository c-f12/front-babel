function app(){
    let canvas = document.querySelector('canvas');
    let c = canvas.getContext('2d');
    
    c.fillStyle = "plum";
    c.strokeStyle = "purple";
    //fillRect: x, y, width, height
    c.fillRect(100,100,200,200);
    c.strokeRect(100,100,200,200);

    c.strokeStyle = "turquoise";
    c.font = '20px Arial'
    c.fillText('Hola Mundo', 100, 350);
    c.strokeText('Hola Mundo', 120, 200);
};

window.addEventListener('load', app);