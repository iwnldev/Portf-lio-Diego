// ========================================
// MENU MOBILE
// ========================================

const menu = document.querySelector(".menu-mobile");
const nav = document.querySelector("nav");

// Abre ou fecha o menu e atualiza o botão (ícone e acessibilidade)
function definirMenu(aberto) {

    nav.classList.toggle("ativo", aberto);

    menu.setAttribute("aria-expanded", String(aberto));

    menu.setAttribute(
        "aria-label",
        aberto
            ? "Fechar menu"
            : "Abrir menu"
    );

    menu.textContent = aberto
        ? "×"
        : "☰";

}

if (menu && nav) {

    menu.addEventListener("click", function () {

        definirMenu(!nav.classList.contains("ativo"));

    });


    // Fecha o menu ao clicar em um link
    const linksMenu = nav.querySelectorAll("a");

    linksMenu.forEach(function (link) {

        link.addEventListener("click", function () {

            definirMenu(false);

        });

    });


    // Fecha o menu ao apertar a tecla Esc
    document.addEventListener("keydown", function (evento) {

        if (evento.key === "Escape" && nav.classList.contains("ativo")) {

            definirMenu(false);
            menu.focus();

        }

    });

}


// ========================================
// BOTÃO VOLTAR AO TOPO
// ========================================

const voltarTopo = document.getElementById("voltarTopo");

if (voltarTopo) {

    window.addEventListener("scroll", function () {

        if (window.scrollY > 500) {

            voltarTopo.classList.add("visivel");

        } else {

            voltarTopo.classList.remove("visivel");

        }

    });


    voltarTopo.addEventListener("click", function () {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}


// ========================================
// ANIMAÇÕES AO ROLAR
// ========================================

const elementosAnimados = document.querySelectorAll(
    ".sobre-texto, " +
    ".sobre-destaque, " +
    ".habilidade, " +
    ".experiencia-card, " +
    ".curso-card, " +
    ".projeto-card, " +
    ".formacao-card, " +
    ".competencia, " +
    ".contato-card, " +
    ".foto-card"
);


elementosAnimados.forEach(function (elemento) {

    elemento.classList.add("animar");

});


const observador = new IntersectionObserver(

    function (elementos) {

        elementos.forEach(function (elemento) {

            if (elemento.isIntersecting) {

                const alvo = elemento.target;

                alvo.classList.add("visivel");

                observador.unobserve(alvo);

                // Depois que o elemento termina de aparecer, tira o atraso
                // para o efeito de hover responder na hora
                const atraso = parseFloat(alvo.style.transitionDelay) || 0;

                setTimeout(function () {

                    alvo.style.transitionDelay = "";

                }, (atraso + 0.8) * 1000);

            }

        });

    },

    {
        threshold: 0.15
    }

);


elementosAnimados.forEach(function (elemento) {

    observador.observe(elemento);

});


// ========================================
// ATRASO DAS ANIMAÇÕES
// ========================================

const grupos = [

    ".habilidade",
    ".curso-card",
    ".projeto-card",
    ".competencia",
    ".contato-card"

];


grupos.forEach(function (seletor) {

    const elementos =
        document.querySelectorAll(seletor);


    elementos.forEach(function (elemento, indice) {

        elemento.style.transitionDelay =
            `${indice * 0.08}s`;

    });

});

// ========================================
// FORMULÁRIO DE CONTATO
// ========================================

const formulario = document.getElementById("formContato");
const statusForm = document.getElementById("formStatus");

// Mostra uma mensagem de sucesso ou de erro para a pessoa
function mostrarStatus(tipo, mensagemHTML) {

    statusForm.className = "form-status visivel-status " + tipo;
    statusForm.innerHTML = mensagemHTML;

}

if (formulario && statusForm) {

    formulario.addEventListener("submit", async function (evento) {

        evento.preventDefault();

        const botao = formulario.querySelector("button[type='submit']");

        // Se o ID do Formspree ainda não foi colocado, avisa e oferece o e-mail
        if (formulario.action.includes("SEU_ID_FORMSPREE")) {

            mostrarStatus(
                "erro",
                "O envio por aqui ainda não está disponível. " +
                "Escreva para <a href=\"mailto:diegocerqueira19@outlook.com\">" +
                "diegocerqueira19@outlook.com</a>."
            );

            return;

        }

        botao.disabled = true;
        botao.textContent = "Enviando...";

        try {

            const resposta = await fetch(formulario.action, {
                method: "POST",
                body: new FormData(formulario),
                headers: { "Accept": "application/json" }
            });

            if (resposta.ok) {

                mostrarStatus(
                    "sucesso",
                    "Mensagem enviada! Obrigado pelo contato, respondo em breve."
                );

                formulario.reset();

            } else {

                throw new Error("Falha no envio");

            }

        } catch (erro) {

            mostrarStatus(
                "erro",
                "Não foi possível enviar agora. Tente novamente ou escreva para " +
                "<a href=\"mailto:diegocerqueira19@outlook.com\">" +
                "diegocerqueira19@outlook.com</a>."
            );

        } finally {

            botao.disabled = false;
            botao.textContent = "Enviar mensagem";

        }

    });

}


// ========================================
// FRASE DIGITADA NO TOPO
// ========================================

const cargoDigitado = document.getElementById("cargoDigitado");

const preferePouco = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

// Quem prefere menos movimento (ou está sem JavaScript) vê a primeira frase parada
if (cargoDigitado && !preferePouco) {

    const frases = [
        "desenvolvedor em formação",
        "estudante de ADS",
        "focado em desenvolvimento web",
        "em busca do primeiro estágio"
    ];

    let indiceFrase = 0;
    let quantidadeLetras = 0;
    let apagando = false;

    const digitar = function () {

        const frase = frases[indiceFrase];

        quantidadeLetras += apagando ? -1 : 1;

        cargoDigitado.textContent = frase.slice(0, quantidadeLetras);

        let espera = apagando ? 35 : 70;

        if (!apagando && quantidadeLetras === frase.length) {

            // Terminou de digitar: espera um pouco e começa a apagar
            apagando = true;
            espera = 1800;

        } else if (apagando && quantidadeLetras === 0) {

            // Terminou de apagar: passa para a próxima frase
            apagando = false;
            indiceFrase = (indiceFrase + 1) % frases.length;
            espera = 400;

        }

        setTimeout(digitar, espera);

    };

    cargoDigitado.textContent = "";
    setTimeout(digitar, 600);

}


// ========================================
// DESTACAR NO MENU A SEÇÃO ATUAL
// ========================================

const secoesMenu = document.querySelectorAll("main section[id]");
const linksNav = document.querySelectorAll("nav a[href^='#']");

if (secoesMenu.length && linksNav.length) {

    const observadorMenu = new IntersectionObserver(

        function (secoes) {

            secoes.forEach(function (secao) {

                if (!secao.isIntersecting) {
                    return;
                }

                linksNav.forEach(function (link) {

                    const ehAtual =
                        link.getAttribute("href") === "#" + secao.target.id;

                    link.classList.toggle("link-ativo", ehAtual);

                    if (ehAtual) {
                        link.setAttribute("aria-current", "true");
                    } else {
                        link.removeAttribute("aria-current");
                    }

                });

            });

        },

        // Considera "atual" a seção que cruza a faixa do meio da tela
        {
            rootMargin: "-45% 0px -50% 0px"
        }

    );

    secoesMenu.forEach(function (secao) {

        observadorMenu.observe(secao);

    });

    // ========================================
// FUNDO ANIMADO DE CÓDIGOS (MAIS SUTIL)
// ========================================

const canvas = document.getElementById("fundoCodigo");

if (canvas && !preferePouco) {
    const ctx = canvas.getContext("2d");

    let largura = canvas.width = window.innerWidth;
    let altura = canvas.height = window.innerHeight;

    window.addEventListener("resize", function() {
        largura = canvas.width = window.innerWidth;
        altura = canvas.height = window.innerHeight;
    });

    const letras = "01{}[]<>+-*/abcdef";
    const alfabeto = letras.split("");

    const tamanhoFonte = 14;
    let colunas = Math.floor(largura / tamanhoFonte);
    let quedas = [];

    for (let i = 0; i < colunas; i++) {
        quedas[i] = 1;
    }

    function desenharFundo() {
        // Fundo escuro com rastro forte para apagar rápido e não embolar
        ctx.fillStyle = "rgba(11, 11, 13, 0.25)";
        ctx.fillRect(0, 0, largura, altura);

        ctx.font = tamanhoFonte + "px monospace";

        for (let i = 0; i < quedas.length; i++) {
            const texto = alfabeto[Math.floor(Math.random() * alfabeto.length)];
            
            // Deixando a cor bem apagada e sutil (apenas um reflexo roxo escuro)
            ctx.fillStyle = "rgba(184, 41, 255, 0.12)";
            
            ctx.fillText(texto, i * tamanhoFonte, quedas[i] * tamanhoFonte);

            if (quedas[i] * tamanhoFonte > altura && Math.random() > 0.975) {
                quedas[i] = 0;
            }
            quedas[i]++;
        }
    }

    setInterval(desenharFundo, 70);
}

}
