
$(document).ready(function () {
    SetarImagemBreadcrumb();
});

function SetarImagemBreadcrumb() {
    var URLimagem = $('#ImagemBG').val();
    if (!isNullEmptyUndefined(URLimagem)) {
        $('.bread-bg-1').css({ 'background-image': 'url(' + URLimagem + ')' });
        $('.bread-bg-1').css({ 'background-position': 'center' });
    }
}

function EnviarMensagem(validarMensagem) {
    PageLoading('show');

    var nome = $('#Nome').val();
    var email = $('#Email').val();
    var mensagem = $('#Mensagem').val();
    var telefone = $('#Telefone').val();
    var codigoImovel = $('#CodigoImovel').val();

    var hasMessage = true;

    if (validarMensagem)
        hasMessage = !isNullEmptyUndefined(mensagem);

    if (!isNullEmptyUndefined(nome) && !isNullEmptyUndefined(email) && hasMessage && !isNullEmptyUndefined(telefone)) {

        if (validarMensagem && mensagem.indexOf("http") > -1) {
            ExibirBoxErro("Erro ao enviar mensagem. Link não permitido no conteúdo.");
            PageLoading('hide')
            return;
        }

        ajaxGetFn("Detalhe/EnviarMensagem", { Nome: nome, Telefone: telefone, Email: email, Mensagem: mensagem, CodigoImovel: codigoImovel }, "", function (data) {
            if (data.Message == "OK") {
                ExibirBoxSucesso("Mensagem enviada com sucesso.");
                $('#Nome').val("");
                $('#Email').val("");
                $('#Mensagem').val("");
                $('#Telefone').val("");
            }
            else
                ExibirBoxErro("Erro ao enviar mensagem");
        });
    }
    else
        ExibirBoxErro("Preencha todos os campos para enviar.");

    PageLoading('hide');
}