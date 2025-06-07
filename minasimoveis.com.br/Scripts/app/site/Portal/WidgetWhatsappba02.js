
//https://www.widgetsquad.com/
//login: fredlu01@hotmail.com

$(document).ready(function () {
    setTimeout(function () {
        ChangeWidgetWpp();
    }, 1500);
});

function ChangeWidgetWpp() {
    var codigo = $('#CodigoImovel').val();
    var titulo = $('#titleConcat').text();

    var msg = 'Olá, gostaria de receber mais informações';
    var msg2 = ' sobre o imóvel "' + titulo + '" (' + codigo + ').';
    var msg3 = '!';

    if (codigo)
        msg += msg2;
    else
        msg += msg3;

    $('.altumcode-site').remove();
    $('.altumcode-whatsapp-start-chat-button').attr('href', 'https://api.whatsapp.com/send?phone=' + numeroTelWpp + '&text=' + msg);

    if (openWidget())
        $('.altumcode-whatsapp-bubble-icon-holder').click();
}

function openWidget() {
    var open = $("#openWidget").val();

    if (open)
        return true;
    else
        return false;
}