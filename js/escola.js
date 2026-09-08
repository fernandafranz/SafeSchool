/* =========================================
   SAFESCHOOL
   ESCOLA, SESSÃO E PROTEÇÃO DE ACESSO
========================================= */


/* =========================================
   ESCOLAS DO PROTÓTIPO
========================================= */

const escolasSafeSchool = {

    ESC001: {

        codigo:
            "ESC001",

        nome:
            "Escola Demonstrativa SafeSchool"

    }

};


/* =========================================
   SALVAR ESCOLA
========================================= */

function salvarEscolaSafeSchool(
    escola
) {

    if (
        !escola
    ) {

        return;

    }


    sessionStorage.setItem(

        "codigoEscolaSafeSchool",

        escola.codigo

    );


    sessionStorage.setItem(

        "nomeEscolaSafeSchool",

        escola.nome

    );

}


/* =========================================
   LIMPAR ESCOLA
========================================= */

function limparEscolaSafeSchool() {

    sessionStorage.removeItem(
        "codigoEscolaSafeSchool"
    );


    sessionStorage.removeItem(
        "nomeEscolaSafeSchool"
    );

}


/* =========================================
   ESCOLA PADRÃO DA PÁGINA
========================================= */

function obterEscolaPadraoDaPagina() {

    if (
        !document.body
    ) {

        return null;

    }


    const codigoPadrao =
        document.body.dataset
            .escolaPadrao;


    if (
        !codigoPadrao
    ) {

        return null;

    }


    const codigo =
        codigoPadrao
            .trim()
            .toUpperCase();


    return (
        escolasSafeSchool[codigo]
        || null
    );

}


/* =========================================
   IDENTIFICAR ESCOLA
========================================= */

function identificarEscolaPelaURL() {

    const parametros =
        new URLSearchParams(
            window.location.search
        );


    const codigoRecebido =
        parametros.get(
            "escola"
        );


    /* =====================================
       1. ESCOLA INFORMADA NA URL
    ====================================== */

    if (
        codigoRecebido
    ) {

        const codigo =

            codigoRecebido
                .trim()
                .toUpperCase();


        const escola =
            escolasSafeSchool[
                codigo
            ];


        /*
            Se foi informado um código
            válido na URL, ele tem prioridade.
        */

        if (
            escola
        ) {

            salvarEscolaSafeSchool(
                escola
            );


            return escola;

        }


        /*
            Se alguém informar explicitamente
            um código inválido, não usamos
            silenciosamente outra escola.
        */

        limparEscolaSafeSchool();


        return null;

    }


    /* =====================================
       2. ESCOLA JÁ SALVA NA SESSÃO
    ====================================== */

    const escolaSalva =
        obterEscolaSalva();


    if (
        escolaSalva
    ) {

        return escolaSalva;

    }


    /* =====================================
       3. ESCOLA PADRÃO DA PÁGINA
    ====================================== */

    const escolaPadrao =
        obterEscolaPadraoDaPagina();


    if (
        escolaPadrao
    ) {

        salvarEscolaSafeSchool(
            escolaPadrao
        );


        return escolaPadrao;

    }


    /* =====================================
       NENHUMA ESCOLA IDENTIFICADA
    ====================================== */

    return null;

}


/* =========================================
   RECUPERAR ESCOLA
========================================= */

function obterEscolaSalva() {

    const codigo =
        sessionStorage.getItem(
            "codigoEscolaSafeSchool"
        );


    const nome =
        sessionStorage.getItem(
            "nomeEscolaSafeSchool"
        );


    if (
        !codigo ||
        !nome
    ) {

        return null;

    }


    return {

        codigo:
            codigo,

        nome:
            nome

    };

}


/* =========================================
   VERIFICAR ACESSO
========================================= */

function verificarAcessoProtegido() {

    const caminho =

        window.location.pathname
            .toLowerCase();


    const perfil =

        (
            sessionStorage.getItem(
                "perfilSafeSchool"
            ) || ""
        )
        .trim()
        .toLowerCase();


    /* =========================================
       ALUNO
    ========================================== */

    if (
        caminho.endsWith(
            "/aluno.html"
        )
    ) {

        if (
            perfil !== "aluno"
        ) {

            redirecionarParaLogin();

            return false;

        }

    }


    /* =========================================
       APOIO PSICOLÓGICO DO ALUNO
    ========================================== */

    if (
        caminho.endsWith(
            "/apoio-psicologico.html"
        )
    ) {

        if (
            perfil !== "aluno"
        ) {

            redirecionarParaLogin();

            return false;

        }

    }


    /* =========================================
       RELATO IDENTIFICADO DO ALUNO
    ========================================== */

    if (
        caminho.endsWith(
            "/relato-identificado.html"
        )
    ) {

        if (
            perfil !== "aluno"
        ) {

            redirecionarParaLogin();

            return false;

        }

    }


    /* =========================================
       PROFESSOR
    ========================================== */

    if (
        caminho.endsWith(
            "/professor.html"
        )
    ) {

        if (
            perfil !== "professor"
        ) {

            redirecionarParaLogin();

            return false;

        }

    }


    /* =========================================
       INDICADORES DO PROFESSOR
    ========================================== */

    if (
        caminho.endsWith(
            "/indicadores.html"
        )
    ) {

        if (
            perfil !== "professor"
        ) {

            redirecionarParaLogin();

            return false;

        }

    }


    /* =========================================
       MATERIAIS DO PROFESSOR
    ========================================== */

    if (
        caminho.endsWith(
            "/materiais-professor.html"
        )
    ) {

        if (
            perfil !== "professor"
        ) {

            redirecionarParaLogin();

            return false;

        }

    }


    /* =========================================
       RESPONSÁVEL
    ========================================== */

    if (
        caminho.endsWith(
            "/responsavel.html"
        )
    ) {

        if (
            perfil !== "responsavel"
        ) {

            redirecionarParaLogin();

            return false;

        }

    }


    /* =========================================
       PSICOLOGIA
    ========================================== */

    if (
        caminho.endsWith(
            "/psicologia.html"
        )
    ) {

        if (
            perfil !== "psicologia"
        ) {

            redirecionarParaLogin();

            return false;

        }

    }


    return true;

}


/* =========================================
   REDIRECIONAR PARA LOGIN
========================================= */

function redirecionarParaLogin() {

    const escola =
        obterEscolaSalva();


    let destino =
        "login.html?acesso=restrito";


    if (
        escola
    ) {

        destino +=

            "&escola="

            +

            encodeURIComponent(
                escola.codigo
            );

    }


    window.location.href =
        destino;

}


/* =========================================
   MOSTRAR ESCOLA
========================================= */

function mostrarEscolaVinculada(
    escola
) {

    if (
        !escola
    ) {

        return;

    }


    const existente =

        document.getElementById(
            "escolaVinculadaSafeSchool"
        );


    if (
        existente
    ) {

        return;

    }


    const indicador =
        document.createElement(
            "div"
        );


    indicador.id =
        "escolaVinculadaSafeSchool";


    indicador.innerHTML =

        "🏫 <strong>Escola vinculada:</strong> "

        +

        escola.nome;


    indicador.style.position =
        "fixed";


    indicador.style.bottom =
        "20px";


    indicador.style.right =
        "20px";


    indicador.style.zIndex =
        "9999";


    indicador.style.maxWidth =
        "320px";


    indicador.style.background =
        "#ffffff";


    indicador.style.color =
        "#20205f";


    indicador.style.padding =
        "12px 18px";


    indicador.style.borderRadius =
        "12px";


    indicador.style.fontFamily =
        "Arial, Helvetica, sans-serif";


    indicador.style.fontSize =
        "13px";


    indicador.style.lineHeight =
        "1.4";


    indicador.style.boxShadow =
        "0 8px 25px rgba(50, 40, 100, 0.16)";


    indicador.style.border =
        "1px solid #eeeaff";


    document.body.appendChild(
        indicador
    );

}


/* =========================================
   PROPAGAR ESCOLA NOS LINKS
========================================= */

function propagarEscolaNosLinks(
    escola
) {

    if (
        !escola
    ) {

        return;

    }


    const links =
        document.querySelectorAll(
            "a[href]"
        );


    links.forEach(

        function (
            link
        ) {

            const href =
                link.getAttribute(
                    "href"
                );


            /*
                Links locais da própria página
                permanecem exatamente como estão.
            */

            if (
                !href ||
                href === "#" ||
                href.startsWith("#") ||
                href.startsWith("mailto:") ||
                href.startsWith("tel:")
            ) {

                return;

            }


            try {

                const destino =
                    new URL(

                        href,

                        window.location.href

                    );


                /*
                    Não alteramos links externos.
                */

                if (
                    destino.origin !==
                    window.location.origin
                ) {

                    return;

                }


                /*
                    Acrescentamos a escola sem
                    apagar outros parâmetros
                    já existentes no endereço.
                */

                destino.searchParams.set(

                    "escola",

                    escola.codigo

                );


                const caminhoAtual =
                    window.location.pathname;


                const estaEmPages =
                    caminhoAtual.includes(
                        "/pages/"
                    );


                let novoHref;


                /* =====================================
                   DESTINO DENTRO DE /pages
                ====================================== */

                if (
                    destino.pathname.includes(
                        "/pages/"
                    )
                ) {

                    const nomeArquivo =

                        destino.pathname
                            .split("/")
                            .pop();


                    if (
                        estaEmPages
                    ) {

                        novoHref =
                            nomeArquivo;

                    }

                    else {

                        novoHref =

                            "pages/"

                            +

                            nomeArquivo;

                    }

                }


                /* =====================================
                   DESTINO INDEX
                ====================================== */

                else {

                    if (
                        estaEmPages
                    ) {

                        novoHref =
                            "../index.html";

                    }

                    else {

                        novoHref =
                            "index.html";

                    }

                }


                /*
                    Mantém todos os parâmetros
                    existentes no link, inclusive
                    origem, acesso e escola.
                */

                novoHref +=
                    destino.search;


                if (
                    destino.hash
                ) {

                    novoHref +=
                        destino.hash;

                }


                link.setAttribute(

                    "href",

                    novoHref

                );

            }

            catch (
                erro
            ) {

                /*
                    Se houver algum link fora
                    do padrão esperado,
                    mantemos o endereço original.
                */

            }

        }

    );

}


/* =========================================
   LOGOUT
========================================= */

function configurarLogout() {

    const links =
        document.querySelectorAll(
            "a"
        );


    links.forEach(

        function (
            link
        ) {

            const texto =

                link.textContent
                    .trim()
                    .toLowerCase();


            if (
                texto !== "sair"
            ) {

                return;

            }


            link.addEventListener(

                "click",

                function () {


                    /*
                        Encerrar somente
                        o usuário atual.
                    */

                    sessionStorage.removeItem(
                        "perfilSafeSchool"
                    );


                    sessionStorage.removeItem(
                        "usuarioEmailSafeSchool"
                    );


                    /*
                        A escola NÃO é removida.

                        Assim, depois do logout,
                        o usuário continua navegando
                        dentro da mesma instituição.
                    */

                }

            );

        }

    );

}


/* =========================================
   FUNÇÕES PÚBLICAS
========================================= */

window.SafeSchoolEscola = {

    identificar:
        identificarEscolaPelaURL,

    obter:
        obterEscolaSalva

};


/* =========================================
   INICIAR
========================================= */

function iniciarSafeSchool() {

    const escolaAtual =
        identificarEscolaPelaURL();


    const acessoPermitido =
        verificarAcessoProtegido();


    if (
        !acessoPermitido
    ) {

        return;

    }


    mostrarEscolaVinculada(
        escolaAtual
    );


    propagarEscolaNosLinks(
        escolaAtual
    );


    configurarLogout();

}


/* =========================================
   IDENTIFICAÇÃO IMEDIATA
========================================= */

identificarEscolaPelaURL();


/* =========================================
   EXECUTAR
========================================= */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(

        "DOMContentLoaded",

        iniciarSafeSchool

    );

}

else {

    iniciarSafeSchool();

}