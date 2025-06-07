
$(document).ready(function () {


});


function SalvarArquivo(idArquivo) {
    if (isNullEmptyUndefined(idArquivo))
        ExibirBoxErro("Erro ao realizar download do arquivo.");
    else {
        ajaxPostFn("Downloads/SalvarArquivo", { id: idArquivo }, "", function (dados) {
            if (dados.id == "OK") {
                SaveToDisk(dados.caminhoarquivo);
            }
            else {
                ExibirBoxErro("Erro ao realizar download do arquivo.");
            }
        });
    }
}