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

                elemento.target.classList.add("visivel");

                observador.unobserve(
                    elemento.target
                );

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
