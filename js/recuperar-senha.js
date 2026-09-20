/* =========================================
   SAFESCHOOL
   RECUPERAÇÃO REAL DE ACESSO
========================================= */

(function () {

    "use strict";


    document.addEventListener(

        "DOMContentLoaded",

        async function () {


            /* =========================================
               ELEMENTOS
            ========================================= */

            const etapaSolicitacao =
                document.getElementById(
                    "etapaSolicitacao"
                );


            const etapaMensagem =
                document.getElementById(
                    "etapaMensagem"
                );


            const etapaNovaSenha =
                document.getElementById(
                    "etapaNovaSenha"
                );


            const etapaSucesso =
                document.getElementById(
                    "etapaSucesso"
                );


            const formRecuperacao =
                document.getElementById(
                    "formRecuperacao"
                );


            const formNovaSenha =
                document.getElementById(
                    "formNovaSenha"
                );


            const perfilRecuperacao =
                document.getElementById(
                    "perfilRecuperacao"
                );


            const botoesPerfil =
                document.querySelectorAll(
                    ".cartao-perfil"
                );


            const emailRecuperacao =
                document.getElementById(
                    "emailRecuperacao"
                );


            const codigoEscolaRecuperacao =
                document.getElementById(
                    "codigoEscolaRecuperacao"
                );


            const continuarDemonstracao =
                document.getElementById(
                    "continuarDemonstracao"
                );


            const voltarSolicitacao =
                document.getElementById(
                    "voltarSolicitacao"
                );


            const novaSenha =
                document.getElementById(
                    "novaSenha"
                );


            const confirmarNovaSenha =
                document.getElementById(
                    "confirmarNovaSenha"
                );


            const mostrarNovaSenha =
                document.getElementById(
                    "mostrarNovaSenha"
                );


            const irParaLogin =
                document.getElementById(
                    "irParaLogin"
                );


            /* =========================================
               ERROS
            ========================================= */

            const erroPerfil =
                document.getElementById(
                    "erroPerfilRecuperacao"
                );


            const erroEmail =
                document.getElementById(
                    "erroEmailRecuperacao"
                );


            const erroEscola =
                document.getElementById(
                    "erroEscolaRecuperacao"
                );


            const erroNovaSenha =
                document.getElementById(
                    "erroNovaSenha"
                );


            const erroConfirmarNovaSenha =
                document.getElementById(
                    "erroConfirmarNovaSenha"
                );


            /* =========================================
               VERIFICAÇÃO BÁSICA
            ========================================= */

            if (
                !etapaSolicitacao ||
                !etapaMensagem ||
                !etapaNovaSenha ||
                !etapaSucesso ||
                !formRecuperacao ||
                !formNovaSenha ||
                !perfilRecuperacao ||
                !emailRecuperacao ||
                !codigoEscolaRecuperacao ||
                !novaSenha ||
                !confirmarNovaSenha
            ) {

                console.error(
                    "SafeSchool: a tela de recuperação não foi carregada corretamente."
                );

                return;

            }


            /* =========================================
               SUPABASE
            ========================================= */

            async function garantirSupabaseCarregado() {

                if (
                    window.SafeSchoolSupabaseReady
                ) {

                    return await
                        window.SafeSchoolSupabaseReady;

                }


                await new Promise(

                    function (
                        resolver,
                        rejeitar
                    ) {

                        const existente =
                            document.querySelector(
                                'script[src="../js/supabase.js"]'
                            );


                        if (existente) {

                            const verificar =
                                window.setInterval(

                                    function () {

                                        if (
                                            window.SafeSchoolSupabaseReady
                                        ) {

                                            window.clearInterval(
                                                verificar
                                            );

                                            resolver();

                                        }

                                    },

                                    50

                                );


                            window.setTimeout(

                                function () {

                                    window.clearInterval(
                                        verificar
                                    );

                                    if (
                                        window.SafeSchoolSupabaseReady
                                    ) {

                                        resolver();

                                    } else {

                                        rejeitar(
                                            new Error(
                                                "Supabase não foi inicializado."
                                            )
                                        );

                                    }

                                },

                                5000

                            );


                            return;

                        }


                        const script =
                            document.createElement(
                                "script"
                            );


                        script.src =
                            "../js/supabase.js";


                        script.onload =
                            resolver;


                        script.onerror =
                            function () {

                                rejeitar(
                                    new Error(
                                        "Não foi possível carregar o Supabase."
                                    )
                                );

                            };


                        document.head.appendChild(
                            script
                        );

                    }

                );


                if (
                    !window.SafeSchoolSupabaseReady
                ) {

                    throw new Error(
                        "Cliente Supabase não foi inicializado."
                    );

                }


                return await
                    window.SafeSchoolSupabaseReady;

            }


            let supabase = null;


            try {

                supabase =
                    await garantirSupabaseCarregado();

            } catch (erro) {

                console.error(
                    "SafeSchool: erro ao carregar Supabase na recuperação.",
                    erro
                );

            }


            /* =========================================
               PERFIS PERMITIDOS
            ========================================= */

            const perfisPermitidos = [

                "aluno",
                "professor",
                "responsavel",
                "psicologia"

            ];


            function selecionarPerfil(
                perfil
            ) {

                if (
                    !perfisPermitidos.includes(
                        perfil
                    )
                ) {

                    return;

                }


                perfilRecuperacao.value =
                    perfil;


                botoesPerfil.forEach(

                    function (botao) {

                        const selecionado =

                            botao.dataset.perfil

                            ===

                            perfil;


                        botao.classList.toggle(

                            "selecionado",

                            selecionado

                        );


                        botao.setAttribute(

                            "aria-pressed",

                            selecionado
                                ? "true"
                                : "false"

                        );

                    }

                );


                if (erroPerfil) {

                    erroPerfil.hidden =
                        true;

                }

            }


            botoesPerfil.forEach(

                function (botao) {

                    botao.addEventListener(

                        "click",

                        function () {

                            selecionarPerfil(
                                botao.dataset.perfil
                            );

                        }

                    );

                }

            );


            /* =========================================
               E-MAIL
            ========================================= */

            function emailValido(
                email
            ) {

                return (

                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/

                ).test(

                    (
                        email || ""
                    )
                    .trim()

                );

            }


            /* =========================================
               ESCOLA
            ========================================= */

            function obterCodigoEscola() {

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


                if (codigoURL) {

                    return codigoURL;

                }


                if (
                    window.SafeSchoolEscola &&
                    typeof
                    window.SafeSchoolEscola.obter
                    ===
                    "function"
                ) {

                    const escola =
                        window.SafeSchoolEscola.obter();


                    if (
                        escola &&
                        escola.codigo
                    ) {

                        return String(
                            escola.codigo
                        )
                        .trim()
                        .toUpperCase();

                    }

                }


                return (
                    sessionStorage.getItem(
                        "codigoEscolaSafeSchool"
                    ) || ""
                )
                .trim()
                .toUpperCase();

            }


            function preencherEscola() {

                const codigo =
                    obterCodigoEscola();


                if (codigo) {

                    codigoEscolaRecuperacao.value =
                        codigo;

                }

            }


            /* =========================================
               ETAPAS
            ========================================= */

            function mostrarEtapa(
                etapa
            ) {

                etapaSolicitacao.hidden =
                    etapa !== "solicitacao";


                etapaMensagem.hidden =
                    etapa !== "mensagem";


                etapaNovaSenha.hidden =
                    etapa !== "novaSenha";


                etapaSucesso.hidden =
                    etapa !== "sucesso";

            }


            /* =========================================
               VALIDAÇÃO DA SOLICITAÇÃO
            ========================================= */

            function validarSolicitacao() {

                let valido =
                    true;


                if (erroPerfil) {

                    erroPerfil.hidden =
                        true;

                }


                if (erroEmail) {

                    erroEmail.hidden =
                        true;

                }


                if (erroEscola) {

                    erroEscola.hidden =
                        true;

                }


                if (
                    !perfisPermitidos.includes(
                        perfilRecuperacao.value
                    )
                ) {

                    if (erroPerfil) {

                        erroPerfil.hidden =
                            false;

                    }

                    valido =
                        false;

                }


                if (
                    !emailValido(
                        emailRecuperacao.value
                    )
                ) {

                    if (erroEmail) {

                        erroEmail.hidden =
                            false;

                    }

                    valido =
                        false;

                }


                if (
                    !codigoEscolaRecuperacao.value
                        .trim()
                ) {

                    if (erroEscola) {

                        erroEscola.hidden =
                            false;

                    }

                    valido =
                        false;

                }


                return valido;

            }


            /* =========================================
               URL DE RETORNO
            ========================================= */

            function criarURLRetorno() {

                const codigo =
                    codigoEscolaRecuperacao.value
                        .trim()
                        .toUpperCase();


                const url =
                    new URL(
                        window.location.href
                    );


                url.search = "";


                url.hash = "";


                url.searchParams.set(
                    "modo",
                    "redefinir"
                );


                if (codigo) {

                    url.searchParams.set(
                        "escola",
                        codigo
                    );

                }


                return url.toString();

            }


            /* =========================================
               SOLICITAR RECUPERAÇÃO REAL
            ========================================= */

            formRecuperacao.addEventListener(

                "submit",

                async function (
                    evento
                ) {

                    evento.preventDefault();


                    if (
                        !validarSolicitacao()
                    ) {

                        return;

                    }


                    if (!supabase) {

                        alert(
                            "Não foi possível conectar ao serviço de recuperação. Atualize a página e tente novamente."
                        );

                        return;

                    }


                    const email =
                        emailRecuperacao.value
                            .trim()
                            .toLowerCase();


                    const codigoEscola =
                        codigoEscolaRecuperacao.value
                            .trim()
                            .toUpperCase();


                    sessionStorage.setItem(

                        "codigoEscolaSafeSchool",

                        codigoEscola

                    );


                    sessionStorage.setItem(

                        "perfilRecuperacaoSafeSchool",

                        perfilRecuperacao.value

                    );


                    try {

                        const {
                            error
                        } =
                            await supabase.auth
                                .resetPasswordForEmail(

                                    email,

                                    {

                                        redirectTo:
                                            criarURLRetorno()

                                    }

                                );


                        if (error) {

                            console.error(
                                "SafeSchool: falha ao solicitar recuperação.",
                                error
                            );


                            throw error;

                        }


                        /*
                            A mensagem é propositalmente
                            genérica para não revelar
                            se determinado e-mail possui
                            ou não uma conta cadastrada.
                        */

                        mostrarEtapa(
                            "mensagem"
                        );


                    } catch (erro) {

                        console.error(
                            "SafeSchool: erro na recuperação de senha.",
                            erro
                        );


                        alert(

                            "Não foi possível enviar as instruções de recuperação neste momento.\n\n" +

                            "Tente novamente em alguns instantes."

                        );

                    }

                }

            );


            /* =========================================
               BOTÃO ANTIGO DE DEMONSTRAÇÃO
               DESATIVADO
            ========================================= */

            if (
                continuarDemonstracao
            ) {

                continuarDemonstracao.hidden =
                    true;

            }


            /* =========================================
               VOLTAR
            ========================================= */

            if (
                voltarSolicitacao
            ) {

                voltarSolicitacao.addEventListener(

                    "click",

                    function () {

                        mostrarEtapa(
                            "solicitacao"
                        );

                    }

                );

            }


            /* =========================================
               MOSTRAR SENHA
            ========================================= */

            if (
                mostrarNovaSenha
            ) {

                mostrarNovaSenha.addEventListener(

                    "click",

                    function () {

                        const mostrando =
                            novaSenha.type ===
                            "text";


                        novaSenha.type =
                            mostrando
                                ? "password"
                                : "text";


                        confirmarNovaSenha.type =
                            mostrando
                                ? "password"
                                : "text";


                        mostrarNovaSenha.textContent =
                            mostrando
                                ? "👁️"
                                : "🙈";


                        mostrarNovaSenha.setAttribute(

                            "aria-label",

                            mostrando
                                ? "Mostrar senha"
                                : "Ocultar senha"

                        );

                    }

                );

            }


            /* =========================================
               SENHA SEGURA
            ========================================= */

            function senhaValida(
                senha
            ) {

                if (
                    typeof senha !==
                    "string"
                ) {

                    return false;

                }


                if (
                    senha.length < 8
                ) {

                    return false;

                }


                if (
                    !/[a-z]/.test(
                        senha
                    )
                ) {

                    return false;

                }


                if (
                    !/[A-Z]/.test(
                        senha
                    )
                ) {

                    return false;

                }


                if (
                    !/[0-9]/.test(
                        senha
                    )
                ) {

                    return false;

                }


                return true;

            }


            function validarNovaSenha() {

                let valido =
                    true;


                if (erroNovaSenha) {

                    erroNovaSenha.hidden =
                        true;

                }


                if (
                    erroConfirmarNovaSenha
                ) {

                    erroConfirmarNovaSenha.hidden =
                        true;

                }


                if (
                    !senhaValida(
                        novaSenha.value
                    )
                ) {

                    if (erroNovaSenha) {

                        erroNovaSenha.hidden =
                            false;

                    }

                    valido =
                        false;

                }


                if (
                    confirmarNovaSenha.value !==
                    novaSenha.value
                ) {

                    if (
                        erroConfirmarNovaSenha
                    ) {

                        erroConfirmarNovaSenha.hidden =
                            false;

                    }

                    valido =
                        false;

                }


                return valido;

            }


            /* =========================================
               REDEFINIR SENHA NO SUPABASE
            ========================================= */

            formNovaSenha.addEventListener(

                "submit",

                async function (
                    evento
                ) {

                    evento.preventDefault();


                    if (
                        !validarNovaSenha()
                    ) {

                        return;

                    }


                    if (!supabase) {

                        alert(
                            "Não foi possível conectar ao serviço de recuperação."
                        );

                        return;

                    }


                    try {

                        const {
                            data: dadosSessao,
                            error: erroSessao
                        } =
                            await supabase.auth
                                .getSession();


                        if (
                            erroSessao ||
                            !dadosSessao ||
                            !dadosSessao.session
                        ) {

                            throw new Error(
                                "Sessão de recuperação não encontrada."
                            );

                        }


                        const {
                            error
                        } =
                            await supabase.auth
                                .updateUser({

                                    password:
                                        novaSenha.value

                                });


                        if (error) {

                            throw error;

                        }


                        const codigoEscola =
                            obterCodigoEscola();


                        if (
                            irParaLogin
                        ) {

                            irParaLogin.href =

                                codigoEscola

                                    ? (
                                        "login.html?escola="

                                        +

                                        encodeURIComponent(
                                            codigoEscola
                                        )
                                    )

                                    : "login.html";

                        }


                        /*
                            Após redefinir a senha,
                            encerramos a sessão temporária
                            de recuperação.

                            O usuário deverá entrar
                            novamente com a nova senha.
                        */

                        await supabase.auth
                            .signOut();


                        mostrarEtapa(
                            "sucesso"
                        );


                    } catch (erro) {

                        console.error(
                            "SafeSchool: falha ao redefinir senha.",
                            erro
                        );


                        alert(

                            "O link de recuperação pode ter expirado ou não ser mais válido.\n\n" +

                            "Solicite um novo link e tente novamente."

                        );

                    }

                }

            );


            /* =========================================
               DETECTAR RETORNO DO E-MAIL
            ========================================= */

            async function verificarModoRecuperacao() {

                if (!supabase) {

                    return;

                }


                const parametros =
                    new URLSearchParams(
                        window.location.search
                    );


                const modo =
                    (
                        parametros.get(
                            "modo"
                        ) || ""
                    )
                    .trim()
                    .toLowerCase();


                let retornoRecuperacao =
                    modo ===
                    "redefinir";


                const hash =
                    window.location.hash ||
                    "";


                if (
                    hash.includes(
                        "type=recovery"
                    )
                ) {

                    retornoRecuperacao =
                        true;

                }


                supabase.auth
                    .onAuthStateChange(

                        function (
                            evento,
                            sessao
                        ) {

                            if (
                                evento ===
                                "PASSWORD_RECOVERY"
                                &&
                                sessao
                            ) {

                                mostrarEtapa(
                                    "novaSenha"
                                );


                                window.setTimeout(

                                    function () {

                                        novaSenha.focus();

                                    },

                                    100

                                );

                            }

                        }

                    );


                if (
                    !retornoRecuperacao
                ) {

                    return;

                }


                /*
                    O Supabase pode precisar de alguns
                    instantes para processar o código
                    recebido na URL.
                */

                for (
                    let tentativa = 0;
                    tentativa < 20;
                    tentativa++
                ) {

                    const {
                        data
                    } =
                        await supabase.auth
                            .getSession();


                    if (
                        data &&
                        data.session
                    ) {

                        mostrarEtapa(
                            "novaSenha"
                        );


                        window.setTimeout(

                            function () {

                                novaSenha.focus();

                            },

                            100

                        );


                        return;

                    }


                    await new Promise(

                        function (
                            resolver
                        ) {

                            window.setTimeout(
                                resolver,
                                150
                            );

                        }

                    );

                }

            }


            /* =========================================
               LIMPAR ERROS
            ========================================= */

            emailRecuperacao.addEventListener(

                "input",

                function () {

                    if (erroEmail) {

                        erroEmail.hidden =
                            true;

                    }

                }

            );


            codigoEscolaRecuperacao.addEventListener(

                "input",

                function () {

                    codigoEscolaRecuperacao.value =

                        codigoEscolaRecuperacao.value
                            .toUpperCase();


                    if (erroEscola) {

                        erroEscola.hidden =
                            true;

                    }

                }

            );


            novaSenha.addEventListener(

                "input",

                function () {

                    if (erroNovaSenha) {

                        erroNovaSenha.hidden =
                            true;

                    }


                    if (
                        erroConfirmarNovaSenha
                    ) {

                        erroConfirmarNovaSenha.hidden =
                            true;

                    }

                }

            );


            confirmarNovaSenha.addEventListener(

                "input",

                function () {

                    if (
                        erroConfirmarNovaSenha
                    ) {

                        erroConfirmarNovaSenha.hidden =
                            true;

                    }

                }

            );


            /* =========================================
               INICIAR
            ========================================= */

            preencherEscola();


            const parametros =
                new URLSearchParams(
                    window.location.search
                );


            if (
                (
                    parametros.get(
                        "modo"
                    ) || ""
                )
                .toLowerCase()
                !==
                "redefinir"
            ) {

                mostrarEtapa(
                    "solicitacao"
                );

            }


            await verificarModoRecuperacao();

        }

    );

})();