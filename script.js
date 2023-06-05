const texto = document.querySelector('#texto')
const entrada = document.querySelector("#entrada")
const reiniciar = document.querySelector("#reiniciar")
const resultado = document.querySelector("#resultado")
const historico = document.querySelector("#historico")
const alternarTemabtn = document.querySelector("#alternar_tema")

const textos = [
    "A chuva caiu incessantemente durante toda a noite.",
    "O sol brilhava intensamente no céu azul sem nuvens.",
    "A criança correu animada pelo parque, balançando seu balão colorido.",
    "O livro velho tinha páginas amareladas e um cheiro característico.",
    "O aroma delicioso do café fresco invadiu a sala pela manhã.",
    "Os pássaros cantavam alegremente nas árvores ao amanhecer.",
    "A estrada sinuosa levava a uma pequena vila no topo da montanha.",
    "O mar agitado quebrava as ondas com força contra as rochas.",
    "A bailarina graciosa dançou elegantemente no palco, hipnotizando a plateia.",

];

function novoTexto() {
    const index = Math.floor(Math.random() * textos.length);
    texto.textContent = textos[index];
}

function atualizarTeste() {
    iniciar();

    if (entrada.value === texto.textContent) {
        verificar()
    }

}

function iniciar() {
    const statusDoTeste = JSON.parse(localStorage.getItem("testeEmAndamento"));


    if (!statusDoTeste) {
        localStorage.setItem("tempoInicial", new Date().getTime());
        localStorage.setItem("testeEmAndamento", true);
    }
}
function verificar() {
    const tempoFinal = new Date().getTime();
    const tempoInicial = parseInt(localStorage.getItem("tempoInicial"));
    const tempoGasto = (tempoFinal - tempoInicial) / 1000;


    resultado.textContent = `Parabéns, você levou ${tempoGasto} segundos!`;

    adicionarAoHistorico(texto.textContent, tempoGasto);


        localStorage.setItem("testeEmAndamento", false);
    entrada.value = "";
    novoTexto();
}

function adicionarAoHistorico(textoDigitado, tempoGasto) {
    const itemHistorico = document.createElement("P")

    itemHistorico.textContent = `Texto "${textoDigitado}" - Tempo: ${tempoGasto} em segundos`
    historico.appendChild(itemHistorico);
}

function reiniciarTeste(){
    entrada.value = ""
    resultado.textContent = ""
    novoTexto()
    localStorage.setItem("testeEmAndamento", false)
    historico.innerHTML = ""
}
function alternarTema(){
    const body = document.body;
    body.classList.toggle("claro")
    body.classList.toggle("escuro")
}

alternarTemabtn.addEventListener("click", alternarTema)
entrada.addEventListener("keyup", atualizarTeste)
reiniciar.addEventListener("click", reiniciarTeste)

novoTexto();

