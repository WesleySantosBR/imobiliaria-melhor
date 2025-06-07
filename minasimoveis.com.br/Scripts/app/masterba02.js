var numeroTelWpp = '5537933003868';

$(document).ready(function () {
    AplicarMascaras();
    SendWpp();
});

function AplicarMascaras() {
    $('.MascaraTelefone').mask('(00) 00000-0000');
    $('.MascaraDinheiro').mask('00.000.000', { reverse: true });
}

function SendWpp() {
    $('.SendWpp').click(function () {
        var url = 'https://wa.me/' + numeroTelWpp;
        var win = window.open(url, '_blank');
        win.focus();
    });
}

///--- Mensagem de Erro passando a mensagem 
function ExibirBoxErro(mensagem) {

    toastr.options = { positionClass: "toast-top-center", fadeOut: 10 };
    toastr.error(mensagem);

    //noty({
    //    text: mensagem, layout: 'topCenter', type: 'error', animation: {
    //        open: { height: 'toggle' }, //--- Propiedade de animação ao abrir
    //        close: { height: 'toggle' }, //--- Propiedade de animação ao fechar
    //        easing: 'swing', //--- Tipo de animação
    //        speed: 500 //--- Tempo de abertura e fechamento da animação
    //    }, timeout: 9000 //--- Tempo para fechamento da notificação
    //});
}

///--- Mensagem de Sucesso passando a mensagem
function ExibirBoxSucesso(mensagem) {

    toastr.options = { positionClass: "toast-top-center", fadeOut: 10 };
    toastr.success(mensagem);

    //noty({
    //    text: mensagem, layout: 'topCenter', type: 'success', animation: {
    //        open: { height: 'toggle' }, //--- Propiedade de animação ao abrir
    //        close: { height: 'toggle' }, //--- Propiedade de animação ao fechar
    //        easing: 'swing', //--- Tipo de animação
    //        speed: 500 //--- Tempo de abertura e fechamento da animação
    //    }, timeout: 9000
    //});
}

///--- Mensagem de Alerta passando a mensagem 
function ExibirBoxAlerta(mensagem) {

    toastr.options = { positionClass: "toast-top-center", fadeOut: 10 };
    toastr.info(mensagem);

    //noty({
    //    text: mensagem, layout: 'topCenter', type: 'warning', animation: {
    //        open: { height: 'toggle' }, //--- Propiedade de animação ao abrir
    //        close: { height: 'toggle' }, //--- Propiedade de animação ao fechar
    //        easing: 'swing', //--- Tipo de animação
    //        speed: 500 //--- Tempo de abertura e fechamento da animação
    //    }, timeout: 9000
    //});
}

function PageLoading(acao) {
    if (acao == "hide") {
        $(".page-loading").fadeOut("slow");
        $(".page-loading-text").fadeOut("slow");
    }

    if (acao == "show") {
        $(".page-loading").fadeIn("slow");
        $(".page-loading-text").fadeIn("slow");
    }
}

function AddPontos(valor) {
    var sValor = valor.toString();

    if (sValor.length <= 3)
        return sValor;

    if (sValor.length == 4)
        return sValor.substring(0, 1) + "." + sValor.substring(0, 3);

    if (sValor.length == 5)
        return sValor.substring(0, 2) + "." + sValor.substring(1, 4);

    if (sValor.length == 6)
        return sValor.substring(0, 3) + "." + sValor.substring(2, 5);

    if (sValor.length == 7)
        return sValor.substring(0, 1) + "." + sValor.substring(0, 3) + "." + sValor.substring(2, 5);
}

// function PesquisarCodigo() {
//     var codigo = $('#pesquisaCodigo').val();

//     if (isNullEmptyUndefined(codigo) && $('.pesquisaCodigo').length > 1)
//         codigo = $('.pesquisaCodigo')[$('.pesquisaCodigo').length -1].value;

//     $('#pesquisaCodigo').val(codigo); //garantir que os dois inputs tenham valor

//     if (!isNullEmptyUndefined(codigo)) {
//         //Redirecionar("/Detalhe/Imovel/" + codigo);
//         $('#btnSubmit').click();
//     }
// }
function PesquisarCodigo() {
    var codigo = $('#pesquisaCodigo').val();
    if (isNullEmptyUndefined(codigo) && $('.pesquisaCodigo').length > 1)
        codigo = $('.pesquisaCodigo')[$('.pesquisaCodigo').length -1].value;
    $('#pesquisaCodigo').val(codigo);
    if (!isNullEmptyUndefined(codigo)) {
        window.location.href = "file:///C:/Meus%20Sites/imobiliaria%20melhor/minasimoveis.com.br/Detalhe/Imovel/" + codigo + ".html";
    }
}

$(document).on('keypress', function (e) {
    if (e.which == 13 && $("#pesquisaCodigo").is(":focus")) {
        PesquisarCodigo();
    }
});