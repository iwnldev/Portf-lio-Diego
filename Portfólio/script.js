console.log("Portfólio do Diego carregado!");


// MENU MOBILE

const menu = document.querySelector(".menu-mobile");

const nav = document.querySelector("nav");


if (menu && nav) {

    menu.addEventListener("click", function () {

        nav.classList.toggle("ativo");

    });


    const linksMenu = nav.querySelectorAll("a");


    linksMenu.forEach(function (link) {

        link.addEventListener("click", function () {

            nav.classList.remove("ativo");

        });

    });

}



// BOTÃO VOLTAR AO TOPO

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



// ANIMAÇÕES

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

    elemento.style.opacity = "0";

    elemento.style.transform = "translateY(25px)";

    elemento.style.transition =
        "opacity 0.6s ease, transform 0.6s ease";

});



const observador = new IntersectionObserver(

    function (elementos) {

        elementos.forEach(function (elemento) {

            if (elemento.isIntersecting) {

                elemento.target.style.opacity = "1";

                elemento.target.style.transform =
                    "translateY(0)";

                observador.unobserve(elemento.target);

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



// ATRASO DAS ANIMAÇÕES

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