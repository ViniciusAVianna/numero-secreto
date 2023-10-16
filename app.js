let numerosJaSorteados = [];
let tentativas = 0;
let numeroMaximo = 10;

function exibirTexto(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    //responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate:1.2});
}

function exibirTextoInicial(){
    exibirTexto("h1", "Jogo do número secreto");
    exibirTexto("p", "Escolha um número entre 1 e " + numeroMaximo);  
}
exibirTextoInicial();


function gerarNumeroAleatorio(){
    let numeroGerado = parseInt(Math.random() * numeroMaximo + 1);

    if (numerosJaSorteados.length == numeroMaximo){
        numerosJaSorteados = [];
    }

    if (numerosJaSorteados.includes(numeroGerado)){
        return gerarNumeroAleatorio();
    } else{
        numerosJaSorteados.push(numeroGerado);
        return numeroGerado;
    }   
}
let numSecreto = gerarNumeroAleatorio();


function limparCampo(){
    palpite = document.querySelector("input");
    palpite.value = "";
}


function verificarChute(){
    tentativas++;
    let palpite = document.querySelector("input").value;
    
    if (palpite < 1 || palpite > 10){
        exibirTexto("p", "Palpite inválido. Escolha um número entre 1 e " + numeroMaximo);
        tentativas--;
    } else if (palpite == numSecreto){
        exibirTexto("h1", "Acertou!");
        let palavraTentativa = tentativas == 1 ? "tentativa" : "tentativas";
        let msgAcerto = `Você descobriu o número secreto em ${tentativas} ${palavraTentativa}.`
        exibirTexto("p", msgAcerto);
        document.getElementById("reiniciar").removeAttribute("disabled");
    } else if (palpite > numSecreto){
        exibirTexto("p", "O número secreto é menor que " + palpite);
        limparCampo();
    } else {
        exibirTexto("p", "O número secreto é maior que " + palpite);
        limparCampo();
    }
}


function reiniciarJogo(){
    exibirTextoInicial();
    numSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 0;
    document.getElementById("reiniciar").setAttribute("disabled",true);
}