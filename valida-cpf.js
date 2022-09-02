//Pega o elemento HTML
const inputCpf = document.querySelector('#inputCpf');
const campoMensagem = document.querySelector('#mensagem')
//Coloca um escutador de eventos do tipo "blur - perder o foco", que chama uma arrowFunction que chama a função validaCpf com o elemento HTML como parâmetro
inputCpf.addEventListener('blur', () => {
    if (tiverCampoEmBranco(inputCpf)) {
        inputCpf.classList.add('campo-invalido')
        inputCpf.placeholder = 'Digite o seu CPF'
        return
    }
    if (cpfForInvalido(inputCpf)) {
        inputCpf.classList.add('campo-invalido')
        inputCpf.value = '';
        inputCpf.placeholder = 'CPF inválido';
        return
    }
    inputCpf.classList.remove('campo-invalido')
})

function tiverCampoEmBranco(inputCpf) {
    if (inputCpf.value === '') {
        return true
    }
    return false
}

function cpfForInvalido(inputCpf) {
    const cpfFormatado = inputCpf.value.replace(/\D/g, '');

    if (cpfFormatado !== '') {
        if (cpfForRepetido(cpfFormatado) || !estruturaCpfForValida(cpfFormatado)) {
            return true
        }
    }
    return false
}

function cpfForRepetido(cpfFormatado) {

    const valoresRepetidos = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
    ]
    
    /*for (let i = 0; i<= valoresRepetidos.length; i++){
        if(cpfFormatado === valoresRepetidos[i]){
            return true
        }
    } */
    let retorno = false;
    valoresRepetidos.forEach(function(valor){
        if(valor === cpfFormatado){
            retorno = true;
        }
    })   
    
    return retorno
}

function estruturaCpfForValida(cpf) {
    const multiplicador = 10;

    return checaDigitoVerificador(cpf, multiplicador)
}

function checaDigitoVerificador(cpf, multiplicador) {
    if (multiplicador >= 12) {
        return true
    }

    let multiplicadorInicial = multiplicador
    let soma = 0;
    //função substring
    const cpfSemDigitos = cpf.substr(0, multiplicador - 1).split('');
    const digitoVerificador = cpf.charAt(multiplicador - 1);

    for (let i = 0; multiplicadorInicial > 1; multiplicadorInicial--) {
        soma = soma + cpfSemDigitos[i] * multiplicadorInicial;
        i++
    }

    if (digitoVerificador == confirmaDigito(soma)) {
        return checaDigitoVerificador(cpf, multiplicador + 1)
    }
    return false
}

function confirmaDigito(soma) {
    let resto = 11 - (soma % 11)
    if (resto === 10 || resto === 11) resto = 0
    return resto
}
/*
Função validaCpf

Verifica se o número de CPF é possivelmente válido por meio dos dígitos verificadores

* Como não é possível acessar os dados da Receita Federal do Brasil, não é possivel confirma com certeza se o número de CPF passado é válido ou se a identidade do titular está correta.
*/