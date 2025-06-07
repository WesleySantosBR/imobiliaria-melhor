var last_valid_bairro = null;
var last_valid_tipo = null;

$(document).ready(function () {
    var isPost = $('#isPost').val();

    if (isPost == true || isPost == 'true' || isPost == 'True')
        document.getElementById("scrollResultado").scrollIntoView();

    //var x = window.matchMedia("(max-width: 480px)")
    //myFunction(x);
    //x.addListener(myFunction);
    
});

function Pesquisar() {
    PageLoading('show');
    $('#btnSubmit').click();
}

function MoreResults() {
    var pagina = parseInt($('#Parametros_Pagina').val());
    pagina++;

    $('#Parametros_Pagina').val(pagina);

    Pesquisar();
}

function MoreResultsImoveis() {
    var pagina = parseInt($('#Parametros_Pagina').val());
    pagina++;

    $('#Parametros_Pagina').val(pagina);

    PesquisarImoveis();
}

$('#negociacao').on('change', function () {
    if (this.value === '1') { //1 = aluguel
        //$('#slider-range').hide();
        //$('#slider-range-aluguel').show();
        //$("#amount").val("R$" + $("#slider-range-aluguel").slider("values", 0) + " ate R$" + $("#slider-range-aluguel").slider("values", 1) + " ");
        //resetSlider(5000);

        $('#Parametros_PrecoDe').val('3.000');
        $('#Parametros_PrecoAte').val('30.000');
    }
    else {
        ////$('#slider-range-aluguel').hide();
        ////$('#slider-range').show();
        ////$("#amount").val("R$" + $("#slider-range").slider("values", 0) + " ate R$" + $("#slider-range").slider("values", 1) + " ");
        ////resetSlider(3000000);

        $('#Parametros_PrecoDe').val('300.000');
        $('#Parametros_PrecoAte').val('10.000.000');
    }
});

$("#bairro").on('change', function () {
    if ($("#bairro option:selected").length > 3) {
        $(this).val(last_valid_bairro);
        $('.selectpicker').selectpicker('refresh');
        ExibirBoxErro('Max. 3 opções.');
    }
    else
        last_valid_bairro = $(this).val();
});


$("#tipo").on('change', function () {
    if ($("#tipo option:selected").length > 3) {
        $(this).val(last_valid_tipo);
        $('.selectpicker').selectpicker('refresh');
        ExibirBoxErro('Max. 3 opções.');
    }
    else
        last_valid_tipo = $(this).val();
});


$("#cidade").on('change', function () {
    var selecionada = $("#cidade option:selected").val();

    if (!isNullEmptyUndefined(selecionada))
        AtualizarBairros(selecionada);
});

function PesquisarImoveis() {
    var Negociacao = $('#negociacao').val().join(',');
    var UF = $('#estado').val();
    var Cidade = $('#cidade').val();
    var Bairros = $('#bairro').val().join(',');
    var Tipos = $('#tipo').val().join(',');
    var Quartos = $('#quartos').val();
    var Banheiros = $('#banheiros').val();
    var PrecoDe = $("#Parametros_PrecoDe").val();
    var PrecoAte = $("#Parametros_PrecoAte").val();
    var Registros = 12;
    var Pagina = $('#Parametros_Pagina').val();

    var URL = "\/Pesquisa\/Index";

    if (!isNullEmptyUndefined(Negociacao))
        URL = MontarURLPesquisa(URL, "negociacao", Negociacao);

    if (!isNullEmptyUndefined(UF))
        URL = MontarURLPesquisa(URL, "uf", UF);

    if (!isNullEmptyUndefined(Cidade))
        URL = MontarURLPesquisa(URL, "cidade", Cidade);

    if (!isNullEmptyUndefined(Bairros))
        URL = MontarURLPesquisa(URL, "bairro", Bairros);

    if (!isNullEmptyUndefined(Quartos))
        URL = MontarURLPesquisa(URL, "quartos", Quartos);

    if (!isNullEmptyUndefined(Banheiros))
        URL = MontarURLPesquisa(URL, "banheiros", Banheiros);

    if (!isNullEmptyUndefined(Tipos))
        URL = MontarURLPesquisa(URL, "tipo", Tipos);

    if (!isNullEmptyUndefined(PrecoDe))
        URL = MontarURLPesquisa(URL, "de", PrecoDe);

    if (!isNullEmptyUndefined(PrecoAte))
        URL = MontarURLPesquisa(URL, "ate", PrecoAte);

    if (!isNullEmptyUndefined(Registros))
        URL = MontarURLPesquisa(URL, "registros", Registros);

    if (!isNullEmptyUndefined(Pagina))
        URL = MontarURLPesquisa(URL, "pagina", Pagina);

    Redirecionar(URL);
}

function MontarURLPesquisa(urlbase, nome, parametro) {
    var retorno = urlbase + ((urlbase.indexOf("?") > -1 ? "&" : "?") + nome + "=" + parametro);
    return retorno;
}


function AtualizarBairros(city) {
    if (!isNullEmptyUndefined(city)) {
        var option = "<option value='{1}'>{0}</option>";
        var todasopcoes = [];

        var hidden = "<input type='hidden' hidden name='Listas.Bairros[{0}].{3}' value='{1}'/>";
        var todoshidden = [];

        ajaxGetFn("Home/AtualizarBairros", { Cidade: city }, "", function (dados) {
            if (dados.Bairros != null && dados.Bairros != undefined) {

                todasopcoes.push(option.replace('{0}', "Todos").replace('{1}', ""));

                for (var i = 0; i < dados.Bairros.length; i++) {
                    todasopcoes.push(option.replace('{0}', dados.Bairros[i].Label).replace('{1}', dados.Bairros[i].Value));

                    todoshidden.push(hidden.replace('{0}', i).replace('{1}', dados.Bairros[i].Label).replace('{3}', 'Label'));
                    todoshidden.push(hidden.replace('{0}', i).replace('{1}', dados.Bairros[i].Value).replace('{3}', 'Value'));
                }

                $('#listasbairro').html(todoshidden);
                $('#bairro optgroup').html(todasopcoes);
                $('.selectpicker').selectpicker('refresh');
            }
        });
    }
}

//function myFunction(x) {
//    if (x.matches) {
//        $('.price_filter').hide();
//        $('.preco').show();
//    } else {
//        $('.preco').hide();
//        $('.price_filter').show();
//    }
//}

