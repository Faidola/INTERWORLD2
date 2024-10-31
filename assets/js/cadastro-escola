document.getElementById('form-cadastro').addEventListener('submit', function(event) {
    event.preventDefault();

    const numeroEscola = document.getElementById('numero-escola').value;
    const localizacao = document.getElementById('localizacao').value;
    const email = document.getElementById('email').value;
    const descricao = document.getElementById('descricao').value;

    const escola = {
        numeroEscola,
        localizacao,
        email,
        descricao
    };

    // Aqui você pode enviar os dados para um servidor ou armazená-los em um array (simulação)
    // Para simulação, apenas mostramos uma mensagem
    document.getElementById('mensagem').textContent = 'Escola cadastrada com sucesso!';
    
    // Limpar o formulário
    this.reset();
});
