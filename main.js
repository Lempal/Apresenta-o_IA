// Scroll suave ao clicar nos links do nav
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        const id = link.getAttribute("href");
        const target = document.querySelector(id);
        if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
});

// Ativa o item do menu conforme a rolagem
const sections = document.querySelectorAll("main section");
const navLinks = document.querySelectorAll("nav a");

function ativarMenu() {
    const pos = window.scrollY + window.innerHeight / 3;
    sections.forEach(sec => {
        const topo = sec.offsetTop;
        const fim = topo + sec.offsetHeight;
        const id = sec.getAttribute("id");
        if (pos >= topo && pos < fim) {
            navLinks.forEach(link => link.classList.remove("ativo"));
            const ativo = document.querySelector(`nav a[href="#${id}"]`);
            if (ativo) ativo.classList.add("ativo");
        }
    });
}
window.addEventListener("scroll", ativarMenu);
window.addEventListener("load", ativarMenu);

// Animações de entrada com IntersectionObserver
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("aparecer");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll("section, article, aside").forEach(el => {
    observer.observe(el);
});

// Botão voltar ao topo
const topoBtn = document.createElement("button");
topoBtn.type = "button";
topoBtn.className = "btn-topo";
topoBtn.textContent = "↑";
topoBtn.style.display = "none";
topoBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
document.body.appendChild(topoBtn);

window.addEventListener("scroll", () => {
    topoBtn.style.display = window.scrollY > 400 ? "block" : "none";
});

// Função para consumir API (com suporte a Bearer token)
async function carregarAPI() {
    if (!API_URL) return console.warn("API_URL não definido.");
    try {
        const headers = {};
        if (API_KEY) headers["Authorization"] = `Bearer ${API_KEY}`;

        const resposta = await fetch(API_URL, { headers });
        if (!resposta.ok) throw new Error("Erro ao acessar API: " + resposta.status);

        const dados = await resposta.json();
        mostrarDadosAPI(dados);

    } catch (err) {
        console.error("Falha ao carregar API:", err);
        mostrarErroAPI(err);
    }
}

function mostrarDadosAPI(dados) {
    const aside = document.querySelector("aside");
    if (!aside) return;

    const bloco = document.createElement("div");
    bloco.className = "api-retorno";

    const pre = document.createElement("pre");
    try {
        pre.textContent = JSON.stringify(dados, null, 2);
    } catch {
        pre.textContent = String(dados);
    }

    const titulo = document.createElement("h3");
    titulo.textContent = "Retorno da API";

    bloco.appendChild(titulo);
    bloco.appendChild(pre);
    aside.appendChild(bloco);
}

function mostrarErroAPI(err) {
    const aside = document.querySelector("aside");
    if (!aside) return;

    const erro = document.createElement("div");
    erro.className = "api-erro";
    erro.innerHTML = `<strong>Erro ao carregar API:</strong> ${err.message || err}`;

    aside.appendChild(erro);
}

// Inicializa a chamada da API
carregarAPI();

// Funções utilitárias
function formatarDataIso(iso) {
    try {
        const d = new Date(iso);
        return d.toLocaleString();
    } catch {
        return iso;
    }
}
const btnTema = document.getElementById("btnTema");

btnTema.addEventListener("click", () => {
  document.body.classList.toggle("tema-claro");

  if (document.body.classList.contains("tema-claro")) {
    btnTema.textContent = "Tema Escuro";
  } else {
    btnTema.textContent = "Tema Claro";
  }
});
