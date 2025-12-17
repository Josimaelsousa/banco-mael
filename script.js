let saldo = 1000;
let historico = [];

/* ===== FORMATAÇÃO EM REAL ===== */
function formatarReal(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

/* ===== ATUALIZAÇÕES ===== */
function atualizarSaldo() {
  document.getElementById("saldo").innerText = formatarReal(saldo);
}

function atualizarHistorico() {
  let lista = document.getElementById("historico");
  lista.innerHTML = "";

  historico.forEach(item => {
    let li = document.createElement("li");
    li.innerText = item;
    lista.appendChild(li);
  });
}

/* ===== DEPÓSITO / SAQUE ===== */
function depositar() {
  let valor = Number(document.getElementById("valor").value);
  if (valor > 0) {
    saldo += valor;
    historico.push(`Depósito: ${formatarReal(valor)}`);
    atualizarSaldo();
    salvarDados();
    document.getElementById("valor").value = "";
  } else {
    alert("Digite um valor válido");
  }
}

function sacar() {
  let valor = Number(document.getElementById("valor").value);
  if (valor > 0 && valor <= saldo) {
    saldo -= valor;
    historico.push(`Saque: ${formatarReal(valor)}`);
    atualizarSaldo();
    salvarDados();
    document.getElementById("valor").value = "";
  } else {
    alert("Saldo insuficiente ou valor inválido");
  }
}

/* ===== HISTÓRICO ===== */
function abrirHistorico() {
  document.getElementById("tela-conta").style.display = "none";
  document.getElementById("tela-historico").style.display = "block";
  atualizarHistorico();
}

function voltarConta() {
  document.getElementById("tela-historico").style.display = "none";
  document.getElementById("tela-pix").style.display = "none";
  document.getElementById("tela-conta").style.display = "block";
}

/* ===== LOCAL STORAGE ===== */
function salvarDados() {
  localStorage.setItem("saldo", saldo);
  localStorage.setItem("historico", JSON.stringify(historico));
}

let saldoSalvo = localStorage.getItem("saldo");
let historicoSalvo = localStorage.getItem("historico");

if (saldoSalvo !== null) saldo = Number(saldoSalvo);
if (historicoSalvo !== null) historico = JSON.parse(historicoSalvo);

atualizarSaldo();
atualizarHistorico();

/* ===== PIX ===== */
function abrirPix() {
  document.getElementById("tela-conta").style.display = "none";
  document.getElementById("tela-historico").style.display = "none";
  document.getElementById("tela-pix").style.display = "block";
}

function enviarPix() {
  let valor = Number(document.getElementById("valorPix").value);
  if (valor > 0 && valor <= saldo) {
    saldo -= valor;
    historico.push(`PIX enviado: ${formatarReal(valor)}`);
    atualizarSaldo();
    salvarDados();
    document.getElementById("valorPix").value = "";
    alert("PIX enviado com sucesso");
  } else {
    alert("Valor inválido ou saldo insuficiente");
  }
}

function depositarPix() {
  let valor = Number(document.getElementById("valorPix").value);
  if (valor > 0) {
    saldo += valor;
    historico.push(`PIX recebido: ${formatarReal(valor)}`);
    atualizarSaldo();
    salvarDados();
    document.getElementById("valorPix").value = "";
    alert("PIX depositado com sucesso");
  } else {
    alert("Digite um valor válido");
  }
}

/* ===== LOGIN ===== */
function login() {
  let usuario = document.getElementById("usuario").value;
  let senha = document.getElementById("senha").value;

  if (usuario === "mael" && senha === "1234") {
    document.getElementById("tela-login").style.display = "none";
    document.getElementById("tela-conta").style.display = "block";
    atualizarSaldo();
  } else {
    alert("Usuário ou senha incorretos");
  }
}

function sair() {
  document.getElementById("usuario").value = "";
  document.getElementById("senha").value = "";
  document.getElementById("tela-conta").style.display = "none";
  document.getElementById("tela-historico").style.display = "none";
  document.getElementById("tela-pix").style.display = "none";
  document.getElementById("tela-login").style.display = "block";
}
