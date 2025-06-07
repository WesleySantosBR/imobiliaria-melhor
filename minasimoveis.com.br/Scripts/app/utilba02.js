
//CarregarDataTablesResponsive('#tbR5011', true, true, true, true, [0, 4], [10, 25, 50, 100], [2], 0, [1, "desc"]);
function CarregarDataTablesResponsive(idTabela, paginacao, ordenacaoGeral, informacao, pesquisa, ordenacaoColuna, opcaoPaginacao, camposDatas, colunaResponsiva, colunaOrdenacao, paginacaoSimples, colunaGrupo, exportar, footCols) {
    var useFooter = false;
    var botoesExportar = [
        {
            extend: 'excelHtml5',
            text: '<i class="fa fa-file-excel-o"></i>',
            orientation: 'landscape',
            titleAttr: 'Excel',
            footer: false
        },
        {
            extend: 'pdfHtml5',
            text: '<i class="fa fa-file-pdf-o"></i>',
            titleAttr: 'PDF',
            orientation: 'landscape',
            footer: false
        },
        {
            extend: 'print',
            orientation: 'landscape',
            text: '<i class="fa fa-print"></i>',
            titleAttr: 'Imprimir',
            footer: false
        }
    ];
    $.extend($.fn.dataTableExt.oSort, {
        "date-eu-pre": function (date) {
            date = date.replace(" ", "");

            if (!date) {
                return 0;
            }

            var year;
            var eu_date = date.split(/[\.\-\/]/);

            if (eu_date.length < 2)
                return 0;

            /*year (optional)*/
            if (eu_date[2]) {
                year = eu_date[2];
            }
            else {
                year = 0;
            }

            /*month*/
            var month = eu_date[1];
            if (month.length == 1) {
                month = 0 + month;
            }

            /*day*/
            var day = eu_date[0];
            if (day.length == 1) {
                day = 0 + day;
            }

            return (year + month + day) * 1;
        },

        "date-eu-asc": function (a, b) {
            return ((a < b) ? -1 : ((a > b) ? 1 : 0));
        },

        "date-eu-desc": function (a, b) {
            return ((a < b) ? 1 : ((a > b) ? -1 : 0));
        }
    });
    if (paginacao == undefined) {
        paginacao = true;
    }

    if (ordenacaoGeral == undefined) {
        ordenacaoGeral = true;
    }

    if (informacao == undefined) {
        informacao = true;
    }

    if (pesquisa == undefined) {
        pesquisa = true;
    }

    if (opcaoPaginacao == undefined || opcaoPaginacao == null) {
        opcaoPaginacao = [10, 25, 50, 100]
    }

    if (ordenacaoColuna == null) {
        ordenacaoColuna = undefined;
    }

    if (colunaResponsiva == null) {
        colunaResponsiva = -1;
    }

    if (colunaOrdenacao == undefined || colunaOrdenacao == null) {
        colunaOrdenacao = [0, "asc"];
    }

    if (paginacaoSimples == undefined || paginacaoSimples == null)
        paginacaoSimples = "simple_numbers";

    if (colunaGrupo == undefined || colunaGrupo == null) {
        colunaGrupo = [false, 0, 0]
    }

    if (exportar == undefined || exportar == false) {
        botoesExportar = [];
    }

    if (footCols != undefined && footCols.length > 0 && $(idTabela + '> tfoot').length > 0) {
        useFooter = true;
    }

    $(idTabela).DataTable({
        "language": {
            "sEmptyTable": "Nenhum registro encontrado",
            "sInfo": "_START_ até _END_ de _TOTAL_ registros",
            "sInfoEmpty": "0 até 0 de 0 registros",
            "sInfoFiltered": "(Filtrados de _MAX_ registros)",
            "sInfoPostFix": "",
            "sInfoThousands": ".",
            "sLengthMenu": "_MENU_  por página",
            "sLoadingRecords": "Carregando...",
            "sProcessing": "Processando...",
            "sZeroRecords": "Nenhum registro encontrado",
            "sSearch": "Pesquisar",
            "oPaginate": {
                "sNext": "Próximo",
                "sPrevious": "Anterior",
                "sFirst": "Primeiro",
                "sLast": "Último"
            },
            "oAria": {
                "sSortAscending": ": Ordenar colunas de forma ascendente",
                "sSortDescending": ": Ordenar colunas de forma descendente"
            }
        },
        "dom": 'B<"clear">lfrtip',//(exportar ? 'Bfrtip' : 'B<"clear">lfrtip'),
        "buttons": botoesExportar,
        "paging": paginacao,
        "ordering": ordenacaoGeral,
        "info": informacao,
        "bFilter": pesquisa,
        "lengthMenu": opcaoPaginacao,
        "order": [colunaOrdenacao],
        "responsive": true,
        "pagingType": paginacaoSimples,
        "columnDefs": (colunaGrupo[0] ? [
            { "visible": false, "targets": colunaGrupo[1] },
            { orderable: false, targets: ordenacaoColuna },
            { type: 'date-eu', targets: camposDatas },
            { responsivePriority: 1, targets: colunaResponsiva }] : [
                { orderable: false, targets: ordenacaoColuna },
                { type: 'date-eu', targets: camposDatas },
                { responsivePriority: 1, targets: colunaResponsiva }]),
        "drawCallback": function (settings) {
            if (colunaGrupo[0] == false)
                return;

            var api = this.api();
            var rows = api.rows({ page: 'current' }).nodes();
            var last = null;

            api.column(colunaGrupo[1], { page: 'current' }).data().each(function (group, i) {
                if (last !== group) {
                    $(rows).eq(i).before(
                        '<tr class="group"><td colspan="' + colunaGrupo[2] + '">' + group + '</td></tr>'
                    );

                    last = group;
                }
            });
        },
        "footerCallback": function (row, data, start, end, display) {
            if (!useFooter) return;

            var api = this.api(), data;

            footCols.forEach(function (e, i) {
                var intVal = function (i) {
                    return typeof i === 'string' ?
                        i.replace(/[\$,]/g, '.') * 1 :
                        typeof i === 'number' ?
                            i : 0;
                };

                total = api
                    .column(e)
                    .data()
                    .reduce(function (a, b) {
                        return intVal(a) + intVal(b);
                    }, 0);

                $(api.column(e).footer()).html(total.toFixed(2).replace('.', ','));
            });
        }
    });

    if (colunaGrupo[0]) {
        $(idTabela + ' tbody').on('click', 'tr.group', function () {
            var coluna = colunaGrupo[1];
            var currentOrder = table.order()[0];
            if (currentOrder[0] === 1 && currentOrder[1] === 'asc') {
                table.order([coluna, 'desc']).draw();
            }
            else {
                table.order([coluna, 'asc']).draw();
            }
        });
    }
}

//CarregaDataTablesBodyScroll('#tbEvento', "200px");
function CarregaDataTablesBodyScroll(idTabela, bodySize) {
    $(idTabela).DataTable({
        "language": {
            "sEmptyTable": "Nenhum registro encontrado",
            "sInfo": "_START_ até _END_ de _TOTAL_ registros",
            "sInfoEmpty": "0 até 0 de 0 registros",
            "sInfoFiltered": "(Filtrados de _MAX_ registros)",
            "sInfoPostFix": "",
            "sInfoThousands": ".",
            "sLengthMenu": "_MENU_  por página",
            "sLoadingRecords": "Carregando...",
            "sProcessing": "Processando...",
            "sZeroRecords": "Nenhum registro encontrado",
            "sSearch": "Pesquisar",
            "oPaginate": {
                "sNext": "Próximo",
                "sPrevious": "Anterior",
                "sFirst": "Primeiro",
                "sLast": "Último"
            },
            "oAria": {
                "sSortAscending": ": Ordenar colunas de forma ascendente",
                "sSortDescending": ": Ordenar colunas de forma descendente"
            }
        },
        "scrollY": bodySize,
        "scrollCollapse": true,
        "paging": false,
        "ordering": false,
        "info": false,
        "bFilter": false,
        "paging": false,
        "responsive": true
    });
}

//ajaxPostFn('Configuracoes/Empresa/HistoricoEmpresa', { idempresa: idempresa }, "", function (dados) { });
function ajaxPostFn(url, parameters, divbefore, sucessCallback) {
    $.ajax({
        type: "POST",
        datatype: "json",
        url: root() + url,
        data: parameters,
        beforeSend: function () {
            if (divbefore != "")
                $("#" + divbefore).html("");
            PageLoading("show");
        },
        success: sucessCallback,
        error: function () { PaginaErro(); }
    }).always(function () { PageLoading("hide"); });
}

function ajaxGetFn(url, parameters, divbefore, sucessCallback, showloading) {
    $.ajax({
        type: "GET",
        datatype: "json",
        url: root() + url,
        data: parameters,
        beforeSend: function () {
            if (divbefore != "")
                $("#" + divbefore).empty("");
            if (showloading == undefined || showloading) PageLoading("show");
        },
        success: sucessCallback,
        error: function () { PaginaErro(); }
    }).always(function () { PageLoading("hide"); });
}

function Parar(e) {
    $(".dropup").removeClass("open");
    e.stopPropagation();
}

function root() {
    return $("#localsite").attr("url");
}

function NumbersOnly(evt) {
    try {
        var e = window.event || evt;
        e.srcElement;
        var key = e.which || e.event;

        return -1 !== $.inArray(key, [46, 8, 9, 27, 13, 110, 190, 188]) || /65|67|86|88/.test(key) && (!0 === e.ctrlKey || !0 === e.metaKey) || 35 <= key && 40 >= key || (e.shiftKey || 48 > key || 57 < key) && (96 > key || 105 < key) && e.preventDefault();
    }
    catch (err) {
        console.log(err)
    }
}

function FormatarMesPorExtenso(mes) {
    var mesExtenso = new Array("", "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro");

    return mesExtenso[mes];
}

function CalcularTamanhoModal(_idModal) {

    var idModal = '#' + _idModal;

    if ($(idModal).length > 0) {

        var ModalTopBottom = $(idModal).css('margin-top').replace('px', '') * 4;
        var ModalFooter = $(idModal + " .modal-footer").height();
        var ModalHeader = $(idModal + " .modal-header").height();

        if (ModalFooter < 0)
            ModalFooter = ModalFooter * -1;

        if (ModalHeader < 0)
            ModalHeader = ModalHeader * -1;

        if (ModalTopBottom == 0)
            ModalTopBottom = 100;

        var TamanhoModal = $(window).height() - (ModalTopBottom + ModalFooter + ModalHeader);

        $(idModal + " .modal-body").css("overflow-y", "auto");
        $(idModal + " .modal-body").css("max-height", TamanhoModal + "px");

        if ($("#ToolBar-sticky-wrapper").hasClass("is-sticky")) {
            $("#ToolBar").css("position", "absolute");
        }
    }
}

function PegarIdsCheckboxSelecionados(idtabela) {
    if (idtabela.indexOf("#") == -1)
        idtabela = "#" + idtabela;

    var arrIds = new Array();

    var rows = $(idtabela).DataTable().rows({ 'search': 'applied' }).nodes();

    $('input[type="checkbox"]', rows).each(function (i, e) {
        if ($(e)[0].checked)
            arrIds.push($(e)[0].id.replace('chk_', ''));
    });

    return arrIds;
}

function CheckUncheckTudo(idtabela, e) {
    if (idtabela.indexOf("#") == -1)
        idtabela = "#" + idtabela;

    var checado = e.srcElement.checked;
    var rows = $(idtabela).DataTable().rows({ 'search': 'applied' }).nodes();

    $('input[type="checkbox"]', rows).each(function (i, e) {
        if ($(e).prop('disabled') == false)
            $(e).prop('checked', checado);
    });
}

function InicializarDatePicker(id) {
    if (id.indexOf('#') == -1)
        id = '#' + id;

    $(id).datepicker({
        todayBtn: "linked",
        forceParse: false,
        autoclose: true,
        language: 'pt'
    });
}

function InicializarDatePickerAno(id) {
    if (id.indexOf('#') == -1)
        id = '#' + id;

    $(id).datepicker({
        forceParse: false,
        autoclose: true,
        language: 'pt',
        startView: 1,
        format: 'yyyy',
        minViewMode: "years"
    });
}

function InicializarDatePickerMesAno(id) {
    if (id.indexOf('#') == -1)
        id = '#' + id;

    $(id).datepicker({
        forceParse: false,
        autoclose: true,
        language: 'pt',
        startView: 1,
        format: 'MM/yyyy',
        minViewMode: "months"
    });
}

function AbrirModalConfirmacao(titulo, temCertezaQueDeseja, funcaoJSAcao, nomeAcao) {

    //Por ser uma função específica, comentado para usar a ideia nos projetos

    //var HTMLtitulo = '<h4 class="modal-title">' + titulo + '</h4>';
    //var HTMLpergunta = '<small class="font-bold">Tem certeza que deseja ' + temCertezaQueDeseja + '?</small>';
    //var HTMLacao = '<button type="button" class="btn btn-primary" style="margin-right: 20px; margin-left: 20px" onclick="' + funcaoJSAcao + '">' + nomeAcao + '</button>';
    //HTMLacao += '<button type="button" class="btn btn-white" data-dismiss="modal">Cancelar</button>'

    //$('#tituloConfirmacao').html(HTMLtitulo);
    //$('#perguntaConfirmacao').html(HTMLpergunta);
    //$('#acaoPrincipal').html(HTMLacao);

    //$('#modalConfirmacao').modal('toggle');
    //$('#modalConfirmacao').modal('show');
}

function Redirecionar(URL, e) {
    PageLoading("show");

    window.location.href = URL;

    if (e != null && e != undefined)
        Parar(e);
}


function isNullEmptyUndefined(valor) {
    if (valor === null || valor === "" || valor === undefined)
        return true;
    else
        return false;
}