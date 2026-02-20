const form = document.querySelector("#formMensagem");
const input = document.querySelector("#mensagem");
const erro = document.querySelector("#erro");
const listaMensagens = document.querySelector("#lista");

//"Banco de dados" em memória (array)
// carregar mensagens do localStorage (se houver)
let mensagens = JSON.parse(localStorage.getItem('mensagens') || '[]');

let editandoIndex = null;

function validarTexto(texto) {
  const txt = texto.trim();

  if (txt === "") {
    return "Digite algo antes de enviar";
  }

  if (txt.length < 3) {
    return "Mínimo de 3 caracteres";
  }

  return "";
}

//Renderizando/mostrando a lista na tela
function render() {
  listaMensagens.innerHTML = "";

  //<li> para cada mensagem
  for (let i = 0; i < mensagens.length; i++) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = mensagens[i];

    // captura o índice antes de criar os handlers (evita referência a variável indefinida)
    const indexAtual = i;

    span.addEventListener("click", () => {
      input.value = mensagens[indexAtual];
      input.focus();
      editandoIndex = indexAtual;

      erro.textContent =
        "Editando item " + (indexAtual + 1) + " (envie para salvar)";
    });

    const btnExcluir = document.createElement("button");
    btnExcluir.type = "button";
    btnExcluir.textContent = "Excluir";

    btnExcluir.addEventListener("click", () => {
      mensagens.splice(indexAtual, 1);
  // salvar e re-renderizar
  localStorage.setItem('mensagens', JSON.stringify(mensagens));
  render();
    });
    li.append(span, document.createTextNode(" "), btnExcluir);
    listaMensagens.append(li);
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const textoDigitado = input.value;
  const mensagemErro = validarTexto(textoDigitado);

  if (mensagemErro !== "") {
    erro.textContent = mensagemErro;
    return;
  }

  erro.textContent = "";

  const textoFinal = textoDigitado.trim();

  if (editandoIndex !== null) {
    mensagens[editandoIndex] = textoFinal;
    editandoIndex = null;
  } else {
    mensagens.push(textoDigitado.trim());
  }

  // salvar e re-renderizar
  localStorage.setItem('mensagens', JSON.stringify(mensagens));
  render();

  input.value = "";
  input.focus();
});

//exemplo de função
function falar() {
  alert("Olá! Eu sou um botão com Javascript");
  console.log("O botão foi clicado");
  console.log("Meu time me estressa toda semana");
}

//ligando botão com a função
const botao = document.getElementById("btnFala");
if (botao) {
  botao.addEventListener("click", falar);
}

//const botao2 = document.getElementById("btnFala2");
//botao2.addEventListener("click", falar);

// Modal 'Saiba mais'
const btnSaibaMais = document.getElementById('btnSaibaMais');
const modal = document.getElementById('modal');
if (btnSaibaMais && modal) {
  const fechar = modal.querySelector('.fechar');

  btnSaibaMais.addEventListener('click', () => {
    modal.style.display = 'block';
  });

  if (fechar) {
    fechar.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  // fechar ao clicar fora do conteúdo
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });

  // fechar com Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') modal.style.display = 'none';
  });
}
