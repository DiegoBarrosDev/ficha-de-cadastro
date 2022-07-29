// seleciona todos os inputs da ficha de cadastro, criando uma NodeList chamada inputs
const inputs = document.querySelectorAll('.input');

// seleciona o botão cadastrar
const botao = document.querySelector('#botao');

// escuta o evento clique no botão que 
botao.addEventListener('click', function () {
    // percorre a NodeList e para cada input
    inputs.forEach(function (input) {
        // e valida os seus dados
        validar(input)
    })
})


// declara a função "validar"
function validar(input) {
    // cria uma constante que recebe o tipo do dado do input
    const tipoDado = input.dataset.tipo;
    // se o tipo do dado do input for igual a "idade"
    if (tipoDado == 'idade') {
        // e se o valor do input for menor que 18
        if (input.value < 18) {
            //retorne a mensagem
            return input.setCustomValidity("Você precisa ser maior de 18 anos para se cadastrar")
        }
    }
}
