function dragging(oEvent) {
    $(oEvent.target).addClass('dragging');
    $draggedItem = $(oEvent.target);
}
function draggingEnded(oEvent) {
    $(oEvent.target).removeClass('dragging');
}

function dropItem(oEvent) {
    var domNicho = $(oEvent.target);
    if (domNicho.hasClass('nicho') && domNicho.children().length == 0) {
        //el detach es para quitarlo del elemento del DOM al que esta asociado:
        $draggedItem.detach();
        $draggedItem.appendTo(domNicho);
    }
}

//draggedItem - objeto del DOM que estamos arrastrando
var $draggedItem;
$(document).ready(function () {
    // eventos cuando se arrastra (drag) un item
    $('.item').on('dragstart', dragging);
    $('.item').on('dragend', draggingEnded);
    // eventos cuando se suelta (drop) un item
    //Dentro de nicho se puede soltar el elemento. Previenes dragenter y dragover(se eliminan)
    $('.nicho').on('dragenter', function (oEv) {oEv.preventDefault() });
    $('.nicho').on('dragover', function (oEv) {oEv.preventDefault() });
    $('.nicho').on('drop', dropItem);
});