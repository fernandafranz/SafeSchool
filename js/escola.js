/* =========================================
   SAFESCHOOL
   ESCOLA, SESSÃO E PROTEÇÃO DE ACESSO
========================================= */


/* =========================================
   INTERFACE GLOBAL DO SAFESCHOOL
========================================= */

const urlInterfaceSafeSchool =
    (function () {

        const scriptAtual =
            document.currentScript;


        if (
            scriptAtual &&
            scriptAtual.src
        ) {

            return new URL(
                "interface.js",
                scriptAtual.src
            ).href;

        }


        return window.location.pathname.includes(
            "/pages/"
        )

            ? "../js/interface.js"

            : "js/interface.js";

    })();


let promessaInterfaceSafeSchool =
    null;


/* =========================================
   CARREGAR INTERFACE GLOBAL
========================================= */

function carregarInterfaceSafeSchool() {

    if (
        window.SafeSchoolUI
    ) {

        return Promise.resolve(
            true
        );

    }


    if (
        promessaInterfaceSafeSchool
    ) {

        return promessaInterfaceSafeSchool;

    }


    promessaInterfaceSafeSchool =
        new Promise(

            function (
                resolver
            ) {

                const existente =
                    document.querySelector(
                        'script[data-safeschool-interface="true"]'
                    );


                if (
                    existente
                ) {

                    if (
                        window.SafeSchoolUI
                    ) {

                        resolver(
                            true
                        );

                        return;

                    }


                    existente.addEventListener(

                        "load",

                        function () {

                            resolver(
                                !!window.SafeSchoolUI
                            );

                        },

                        {
                            once:
                                true
                        }

                    );


                    existente.addEventListener(

                        "error",

                        function () {

                            resolver(
                                false
                            );

                        },

                        {
                            once:
                                true
                        }

                    );


                    return;

                }


                const script =
                    document.createElement(
                        "script"
                    );


                script.src =
                    urlInterfaceSafeSchool;


                script.async =
                    false;


                script.dataset
                    .safeschoolInterface =
                        "true";


                script.addEventListener(

                    "load",

                    function () {

                        if (
                            window.SafeSchoolUI
                        ) {

                            console.log(
                                "SafeSchool: interface global carregada."
                            );

                        }


                        resolver(
                            !!window.SafeSchoolUI
                        );

                    },

                    {
                        once:
                            true
                    }

                );


                script.addEventListener(

                    "error",

                    function (
                        erro
                    ) {

                        console.warn(

                            "SafeSchool: não foi possível carregar a interface global.",

                            erro

                        );


                        resolver(
                            false
                        );

                    },

                    {
                        once:
                            true
                    }

                );


                document.head.appendChild(
                    script
                );

            }

        );


    return promessaInterfaceSafeSchool;

}


/* =========================================
   PROMESSA GLOBAL DA INTERFACE
========================================= */

window.SafeSchoolInterfaceReady =
    carregarInterfaceSafeSchool();


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
   CHAVE DA SESSÃO SUPABASE
========================================= */

const chaveSessaoSupabaseSafeSchool =
    "safeschool-auth-session";


/* =========================================
   PÁGINAS JÁ MIGRADAS PARA AUTENTICAÇÃO REAL
========================================= */

const paginasComAutenticacaoReal = [

    "aluno.html",
    "relato-identificado.html",
    "apoio-psicologico.html",
    "responsavel.html",
    "professor.html",
    "psicologia.html"

];


/* =========================================
   SALVAR ESCOLA
========================================= */

function salvarEscolaSafeSchool(
    escola
) {

    if (
        !escola ||
        !escola.codigo
    ) {

        return;

    }


    sessionStorage.setItem(

        "codigoEscolaSafeSchool",

        escola.codigo

    );


    sessionStorage.setItem(

        "nomeEscolaSafeSchool",

        escola.nome || ""

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
   LIMPAR DADOS DO USUÁRIO
========================================= */

function limparUsuarioSafeSchool() {

    sessionStorage.removeItem(
        "perfilSafeSchool"
    );


    sessionStorage.removeItem(
        "usuarioEmailSafeSchool"
    );


    sessionStorage.removeItem(
        "usuarioIdSafeSchool"
    );


    sessionStorage.removeItem(
        "usuarioNomeSafeSchool"
    );

}


/* =========================================
   LIMPAR SESSÃO LOCAL DO SUPABASE
========================================= */

function limparSessaoSupabaseLocal() {

    try {

        const chavesParaRemover =
            [];


        for (
            let indice = 0;
            indice < localStorage.length;
            indice++
        ) {

            const chave =
                localStorage.key(
                    indice
                );


            if (
                chave &&
                chave.startsWith(
                    chaveSessaoSupabaseSafeSchool
                )
            ) {

                chavesParaRemover.push(
                    chave
                );

            }

        }


        chavesParaRemover.forEach(

            function (
                chave
            ) {

                localStorage.removeItem(
                    chave
                );

            }

        );

    }

    catch (
        erro
    ) {

        console.warn(

            "SafeSchool: não foi possível limpar completamente a sessão local do Supabase.",

            erro

        );

    }

}


/* =========================================
   ENCERRAR SESSÃO SUPABASE
========================================= */

async function encerrarSessaoSupabase() {

    try {

        if (
            window.SafeSchoolSupabaseReady
        ) {

            const supabase =
                await window.SafeSchoolSupabaseReady;


            const {
                error
            } =
                await supabase.auth.signOut({

                    scope:
                        "local"

                });


            if (
                error
            ) {

                console.warn(

                    "SafeSchool: o Supabase retornou um aviso durante o logout.",

                    error

                );

            }

        }

    }

    catch (
        erro
    ) {

        console.warn(

            "SafeSchool: não foi possível concluir o logout pelo cliente Supabase.",

            erro

        );

    }

    finally {

        limparSessaoSupabaseLocal();

    }

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
   RECUPERAR ESCOLA SALVA
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
        !codigo
    ) {

        return null;

    }


    return {

        codigo:
            codigo,

        nome:
            nome || ""

    };

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


        if (
            escola
        ) {

            salvarEscolaSafeSchool(
                escola
            );


            return escola;

        }


        limparEscolaSafeSchool();


        return null;

    }


    const escolaSalva =
        obterEscolaSalva();


    if (
        escolaSalva
    ) {

        return escolaSalva;

    }


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


    return null;

}


/* =========================================
   NOME DA PÁGINA ATUAL
========================================= */

function obterNomePaginaAtual() {

    const partes =
        window.location.pathname
            .toLowerCase()
            .split("/");


    return (
        partes.pop() || ""
    );

}


/* =========================================
   PERFIL EXIGIDO PELA PÁGINA
========================================= */

function obterPerfilNecessario() {

    const pagina =
        obterNomePaginaAtual();


    const paginasProtegidas = {

        "aluno.html":
            "aluno",

        "apoio-psicologico.html":
            "aluno",

        "relato-identificado.html":
            "aluno",

        "professor.html":
            "professor",

        "indicadores.html":
            "professor",

        "materiais-professor.html":
            "professor",

        "responsavel.html":
            "responsavel",

        "psicologia.html":
            "psicologia"

    };


    return (
        paginasProtegidas[pagina]
        || null
    );

}


/* =========================================
   SALVAR USUÁRIO VALIDADO
========================================= */

function salvarUsuarioValidado(
    usuario,
    perfil,
    escola
) {

    sessionStorage.setItem(

        "perfilSafeSchool",

        perfil.perfil

    );


    sessionStorage.setItem(

        "usuarioIdSafeSchool",

        usuario.id

    );


    sessionStorage.setItem(

        "usuarioEmailSafeSchool",

        usuario.email || ""

    );


    sessionStorage.setItem(

        "usuarioNomeSafeSchool",

        perfil.nome || ""

    );


    salvarEscolaSafeSchool(
        escola
    );

}


/* =========================================
   VALIDAR SESSÃO REAL DO SUPABASE
========================================= */

async function validarSessaoRealSupabase(
    perfilNecessario
) {

    if (
        !window.SafeSchoolSupabaseReady
    ) {

        console.warn(

            "SafeSchool: esta página exige autenticação real, mas o Supabase não foi carregado."

        );


        return false;

    }


    try {

        const supabase =
            await window.SafeSchoolSupabaseReady;


        const {
            data: dadosUsuario,
            error: erroUsuario
        } =
            await supabase.auth.getUser();


        if (
            erroUsuario ||
            !dadosUsuario ||
            !dadosUsuario.user
        ) {

            limparUsuarioSafeSchool();


            return false;

        }


        const usuario =
            dadosUsuario.user;


        const {
            data: perfil,
            error: erroPerfil
        } =
            await supabase

                .from(
                    "perfis"
                )

                .select(
                    "id,nome,perfil,escola_id,ativo"
                )

                .eq(
                    "id",
                    usuario.id
                )

                .single();


        if (
            erroPerfil ||
            !perfil
        ) {

            console.error(

                "SafeSchool: não foi possível validar o perfil autenticado.",

                erroPerfil

            );


            limparUsuarioSafeSchool();


            return false;

        }


        if (
            !perfil.ativo
        ) {

            limparUsuarioSafeSchool();


            return false;

        }


        if (
            perfil.perfil !==
            perfilNecessario
        ) {

            limparUsuarioSafeSchool();


            return false;

        }


        const {
            data: escola,
            error: erroEscola
        } =
            await supabase

                .from(
                    "escolas"
                )

                .select(
                    "id,codigo,nome,ativo"
                )

                .eq(
                    "id",
                    perfil.escola_id
                )

                .single();


        if (
            erroEscola ||
            !escola
        ) {

            console.error(

                "SafeSchool: não foi possível validar a escola do usuário.",

                erroEscola

            );


            limparUsuarioSafeSchool();


            return false;

        }


        if (
            !escola.ativo
        ) {

            limparUsuarioSafeSchool();


            return false;

        }


        const parametros =
            new URLSearchParams(
                window.location.search
            );


        const codigoURL =
            (
                parametros.get(
                    "escola"
                ) || ""
            )
            .trim()
            .toUpperCase();


        if (
            codigoURL &&
            codigoURL !== escola.codigo
        ) {

            salvarEscolaSafeSchool(
                escola
            );


            limparUsuarioSafeSchool();


            return false;

        }


        salvarUsuarioValidado(

            usuario,

            perfil,

            escola

        );


        return true;

    }

    catch (
        erro
    ) {

        console.error(

            "SafeSchool: erro ao validar a sessão autenticada.",

            erro

        );


        limparUsuarioSafeSchool();


        return false;

    }

}


/* =========================================
   VERIFICAR ACESSO
========================================= */

async function verificarAcessoProtegido() {

    const perfilNecessario =
        obterPerfilNecessario();


    if (
        !perfilNecessario
    ) {

        return true;

    }


    const pagina =
        obterNomePaginaAtual();


    if (
        paginasComAutenticacaoReal.includes(
            pagina
        )
    ) {

        const acessoRealValido =
            await validarSessaoRealSupabase(
                perfilNecessario
            );


        if (
            !acessoRealValido
        ) {

            redirecionarParaLogin();


            return false;

        }


        return true;

    }


    const perfilSessao =

        (
            sessionStorage.getItem(
                "perfilSafeSchool"
            ) || ""
        )
        .trim()
        .toLowerCase();


    if (
        perfilSessao !==
        perfilNecessario
    ) {

        redirecionarParaLogin();


        return false;

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
        escola &&
        escola.codigo
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
   ESTILO DA ESCOLA NO CABEÇALHO
========================================= */

function garantirEstiloEscolaVinculada() {

    const idEstilo =
        "estiloEscolaVinculadaSafeSchool";


    if (
        document.getElementById(
            idEstilo
        )
    ) {

        return;

    }


    const estilo =
        document.createElement(
            "style"
        );


    estilo.id =
        idEstilo;


    estilo.textContent = `

        #escolaVinculadaSafeSchool {

            display: inline-flex;
            align-items: center;

            gap: 8px;

            flex-shrink: 0;

            max-width: 255px;

            margin-left: 12px;
            margin-right: 12px;

            padding: 6px 10px;

            background: #f7f4ff;

            border: 1px solid #ddd4f7;

            border-radius: 11px;

            color: #4f3b94;

            font-family: inherit;

            line-height: 1.2;

            box-shadow:
                0 2px 7px
                rgba(
                    79,
                    59,
                    145,
                    0.06
                );

        }


        #escolaVinculadaSafeSchool
        .escola-vinculada-icone {

            flex-shrink: 0;

            width: 26px;
            height: 26px;

            display: flex;
            align-items: center;
            justify-content: center;

            background: #e9e2ff;

            border-radius: 8px;

            font-size: 14px;

        }


        #escolaVinculadaSafeSchool
        .escola-vinculada-texto {

            display: flex;
            flex-direction: column;

            min-width: 0;

        }


        #escolaVinculadaSafeSchool
        .escola-vinculada-rotulo {

            margin-bottom: 1px;

            color: #7865b4;

            font-size: 8.5px;

            font-weight: 600;

            line-height: 1.15;

            letter-spacing: 0.04em;

            text-transform: uppercase;

        }


        #escolaVinculadaSafeSchool
        .escola-vinculada-nome {

            display: block;

            max-width: 190px;

            overflow: hidden;

            color: #3f2d82;

            font-size: 11.5px;

            font-weight: 600;

            line-height: 1.25;

            text-overflow: ellipsis;

            white-space: nowrap;

        }


        @media (
            max-width: 1150px
        ) {

            #escolaVinculadaSafeSchool {

                max-width: 205px;

                margin-left: 10px;
                margin-right: 10px;

                padding:
                    5px 8px;

            }


            #escolaVinculadaSafeSchool
            .escola-vinculada-rotulo {

                display: none;

            }


            #escolaVinculadaSafeSchool
            .escola-vinculada-icone {

                width: 24px;
                height: 24px;

                font-size: 13px;

            }


            #escolaVinculadaSafeSchool
            .escola-vinculada-nome {

                max-width: 155px;

                font-size: 10.8px;

            }

        }


        @media (
            max-width: 900px
        ) {

            #escolaVinculadaSafeSchool {

                max-width: 150px;

                margin-left: 8px;
                margin-right: 8px;

                padding:
                    5px 7px;

            }


            #escolaVinculadaSafeSchool
            .escola-vinculada-icone {

                width: 22px;
                height: 22px;

                border-radius: 7px;

                font-size: 12px;

            }


            #escolaVinculadaSafeSchool
            .escola-vinculada-nome {

                max-width: 105px;

                font-size: 10.5px;

            }

        }


        @media (
            max-width: 700px
        ) {

            #escolaVinculadaSafeSchool {

                display: none;

            }

        }

    `;


    document.head.appendChild(
        estilo
    );

}


/* =========================================
   MOSTRAR ESCOLA ENTRE LOGO E MENU
========================================= */

function mostrarEscolaVinculada(
    escola
) {

    if (
        !escola ||
        !escola.nome
    ) {

        return;

    }


    garantirEstiloEscolaVinculada();


    const existente =
        document.getElementById(
            "escolaVinculadaSafeSchool"
        );


    if (
        existente
    ) {

        const nomeExistente =
            existente.querySelector(
                ".escola-vinculada-nome"
            );


        if (
            nomeExistente
        ) {

            nomeExistente.textContent =
                escola.nome;


            nomeExistente.title =
                escola.nome;

        }


        existente.setAttribute(

            "aria-label",

            "Instituição vinculada: " +
            escola.nome

        );


        return;

    }


    const cabecalho =

        document.querySelector(
            ".cabecalho"
        )

        ||

        document.querySelector(
            "header"
        );


    if (
        !cabecalho
    ) {

        return;

    }


    const menu =
        cabecalho.querySelector(
            "nav"
        );


    if (
        !menu
    ) {

        return;

    }


    const indicador =
        document.createElement(
            "div"
        );


    indicador.id =
        "escolaVinculadaSafeSchool";


    indicador.setAttribute(

        "aria-label",

        "Instituição vinculada: " +
        escola.nome

    );


    const icone =
        document.createElement(
            "span"
        );


    icone.className =
        "escola-vinculada-icone";


    icone.setAttribute(
        "aria-hidden",
        "true"
    );


    icone.textContent =
        "🏫";


    const blocoTexto =
        document.createElement(
            "span"
        );


    blocoTexto.className =
        "escola-vinculada-texto";


    const rotulo =
        document.createElement(
            "span"
        );


    rotulo.className =
        "escola-vinculada-rotulo";


    rotulo.textContent =
        "Instituição vinculada";


    const nome =
        document.createElement(
            "strong"
        );


    nome.className =
        "escola-vinculada-nome";


    nome.textContent =
        escola.nome;


    nome.title =
        escola.nome;


    blocoTexto.appendChild(
        rotulo
    );


    blocoTexto.appendChild(
        nome
    );


    indicador.appendChild(
        icone
    );


    indicador.appendChild(
        blocoTexto
    );


    cabecalho.insertBefore(

        indicador,

        menu

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


                if (
                    destino.origin !==
                    window.location.origin
                ) {

                    return;

                }


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


            if (
                link.dataset
                    .logoutSafeSchoolConfigurado
                ===
                "true"
            ) {

                return;

            }


            link.dataset
                .logoutSafeSchoolConfigurado =
                    "true";


            link.addEventListener(

                "click",

                async function (
                    evento
                ) {

                    evento.preventDefault();


                    const destino =
                        link.href;


                    limparUsuarioSafeSchool();


                    await encerrarSessaoSupabase();


                    if (
                        destino
                    ) {

                        window.location.href =
                            destino;


                        return;

                    }


                    redirecionarParaLogin();

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

async function iniciarSafeSchool() {

    await carregarInterfaceSafeSchool();


    identificarEscolaPelaURL();


    const acessoPermitido =
        await verificarAcessoProtegido();


    if (
        !acessoPermitido
    ) {

        return;

    }


    const escolaAtual =
        obterEscolaSalva();


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

        function () {

            iniciarSafeSchool();

        }

    );

}

else {

    iniciarSafeSchool();

}