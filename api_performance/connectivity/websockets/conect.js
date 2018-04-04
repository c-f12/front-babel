//El objeto WebSocket tiene 2 métodos sólo.
let socket = new WebSocket('ws://localhost:8085')
socket.onopen = function(){
    alert("Socket has been opened!");
}