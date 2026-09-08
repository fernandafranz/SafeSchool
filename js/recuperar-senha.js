/* =========================================
   SAFESCHOOL
   RECUPERAÇÃO DE ACESSO
========================================= */

(function () {

    "use strict";


    const ESCOLA_DEMO = {

        codigo:
            "ESC001",

        nome:
            "Escola Demonstrativa SafeSchool"

    };


    document.addEventListener(

        "DOMContentLoaded",

        function () {


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
               DADOS TEMPORÁRIOS
            ========================================= */

            let solicitacaoAtual = {

                perfil:
                    "",

                email:
                    "",

                escola:
                    "",

                escolaNome:
                    ""

            };


            /* =========================================
               ESCOLA VALIDADA
            ========================================= */

            function obterEscolaAtual() {

                /*
                    A escola deve ser obtida
                    preferencialmente pelo escola.js,
                    responsável por validar o vínculo.
                */

                if (
                    window.SafeSchoolEscola

                    &&

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

                        return escola;

                    }

                }


                /*
                    Fallback somente para a escola
                    demonstrativa conhecida e já
                    registrada corretamente na sessão.
                */

                const codigo =
                    (
                        sessionStorage.getItem(
                            "codigoEscolaSafeSchool"
                        ) || ""
                    )
                    .trim()
                    .toUpperCase();


                const nome =
                    sessionStorage.getItem(
                        "nomeEscolaSafeSchool"
                    );


                if (
                    codigo ===
                    ESCOLA_DEMO.codigo
                ) {

                    return {

                        codigo:
                            ESCOLA_DEMO.codigo,

                        nome:
                            nome ||
                            ESCOLA_DEMO.nome

                    };

                }


                return null;

            }


            /* =========================================
               PERFIL
            ========================================= */

            function selecionarPerfil(
                perfil
            ) {

                /*
                    A recuperação pública é destinada
                    somente a Aluno e Responsável.
                */

                if (
                    perfil !== "aluno"

                    &&

                    perfil !== "responsavel"
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
                    ).trim()

                );

            }


            /* =========================================
               PREENCHER ESCOLA
            ========================================= */

            function preencherEscola() {

                const escola =
                    obterEscolaAtual();


                codigoEscolaRecuperacao.value =

                    escola

                        ? escola.codigo

                        : "";

            }


            /* =========================================
               VALIDAR ESCOLA
            ========================================= */

            function escolaValida(
                codigo
            ) {

                const escola =
                    obterEscolaAtual();


                if (
                    !escola ||
                    !escola.codigo
                ) {

                    return false;

                }


                return (

                    (
                        codigo || ""
                    )
                    .trim()
                    .toUpperCase()

                    ===

                    escola.codigo
                        .trim()
                        .toUpperCase()

                );

            }


            /* =========================================
               TROCAR ETAPA
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
               VALIDAR SOLICITAÇÃO
            ========================================= */

            function validarSolicitacao() {

                let valido =
                    true;


                erroPerfil.hidden =
                    true;


                erroEmail.hidden =
                    true;


                erroEscola.hidden =
                    true;


                /*
                    PERFIL
                */

                if (
                    perfilRecuperacao.value !==
                    "aluno"

                    &&

                    perfilRecuperacao.value !==
                    "responsavel"
                ) {

                    erroPerfil.hidden =
                        false;


                    valido =
                        false;

                }


                /*
                    E-MAIL
                */

                if (
                    !emailValido(
                        emailRecuperacao.value
                    )
                ) {

                    erroEmail.hidden =
                        false;


                    valido =
                        false;

                }


                /*
                    ESCOLA
                */

                if (
                    !escolaValida(
                        codigoEscolaRecuperacao.value
                    )
                ) {

                    erroEscola.hidden =
                        false;


                    valido =
                        false;

                }


                return valido;

            }


            /* =========================================
               SOLICITAR
            ========================================= */

            formRecuperacao.addEventListener(

                "submit",

                function (evento) {

                    evento.preventDefault();


                    if (
                        !validarSolicitacao()
                    ) {

                        return;

                    }


                    const escolaAtual =
                        obterEscolaAtual();


                    if (
                        !escolaAtual ||
                        !escolaAtual.codigo
                    ) {

                        erroEscola.hidden =
                            false;


                        return;

                    }


                    solicitacaoAtual = {

                        perfil:
                            perfilRecuperacao.value,

                        email:
                            emailRecuperacao.value
                                .trim()
                                .toLowerCase(),

                        escola:
                            escolaAtual.codigo,

                        escolaNome:
                            escolaAtual.nome

                    };


                    /*
                        IMPORTANTE:

                        Não verificamos publicamente
                        se a conta existe nesta etapa.

                        A mensagem apresentada será
                        sempre a mesma.
                    */


                    mostrarEtapa(
                        "mensagem"
                    );

                }

            );


            /* =========================================
               CONTINUAR DEMONSTRAÇÃO
            ========================================= */

            continuarDemonstracao.addEventListener(

                "click",

                function () {

                    mostrarEtapa(
                        "novaSenha"
                    );


                    novaSenha.focus();

                }

            );


            /* =========================================
               VOLTAR
            ========================================= */

            voltarSolicitacao.addEventListener(

                "click",

                function () {

                    mostrarEtapa(
                        "solicitacao"
                    );

                }

            );


            /* =========================================
               MOSTRAR SENHA
            ========================================= */

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

                }

            );


            /* =========================================
               CONTAS
            ========================================= */

            function obterContas() {

                const dados =
                    localStorage.getItem(
                        "contasSafeSchool"
                    );


                if (!dados) {

                    return [];

                }


                try {

                    const contas =
                        JSON.parse(
                            dados
                        );


                    return Array.isArray(
                        contas
                    )
                        ? contas
                        : [];

                }

                catch (erro) {

                    return [];

                }

            }


            /* =========================================
               HASH
               IGUAL AO CADASTRO E LOGIN
            ========================================= */

            function gerarHashDemonstrativo(
                senha
            ) {

                let hash =
                    2166136261;


                for (
                    let i = 0;
                    i < senha.length;
                    i++
                ) {

                    hash ^=
                        senha.charCodeAt(
                            i
                        );


                    hash +=

                        (hash << 1)

                        +

                        (hash << 4)

                        +

                        (hash << 7)

                        +

                        (hash << 8)

                        +

                        (hash << 24);

                }


                return (

                    "demo-"

                    +

                    (
                        hash >>> 0
                    )
                    .toString(16)

                );

            }


            /* =========================================
               VALIDAR NOVA SENHA
            ========================================= */

            function validarNovaSenha() {

                let valido =
                    true;


                erroNovaSenha.hidden =
                    true;


                erroConfirmarNovaSenha.hidden =
                    true;


                if (
                    novaSenha.value.length < 6
                ) {

                    erroNovaSenha.hidden =
                        false;


                    valido =
                        false;

                }


                if (

                    confirmarNovaSenha.value

                    !==

                    novaSenha.value

                ) {

                    erroConfirmarNovaSenha.hidden =
                        false;


                    valido =
                        false;

                }


                return valido;

            }


            /* =========================================
               REDEFINIR SENHA
            ========================================= */

            formNovaSenha.addEventListener(

                "submit",

                function (evento) {

                    evento.preventDefault();


                    if (
                        !validarNovaSenha()
                    ) {

                        return;

                    }


                    /*
                        Utilizamos somente a escola
                        que já foi validada durante
                        a solicitação.
                    */

                    const codigoEscola =
                        solicitacaoAtual.escola;


                    const nomeEscola =
                        solicitacaoAtual.escolaNome;


                    if (
                        !codigoEscola
                    ) {

                        return;

                    }


                    const contas =
                        obterContas();


                    const indice =
                        contas.findIndex(

                            function (conta) {

                                return (

                                    conta.email ===
                                    solicitacaoAtual.email

                                    &&

                                    conta.perfil ===
                                    solicitacaoAtual.perfil

                                    &&

                                    conta.escolaCodigo ===
                                    codigoEscola

                                );

                            }

                        );


                    /*
                        Se a conta existir no protótipo,
                        atualizamos a senha.

                        Se não existir, não revelamos isso.
                    */

                    if (
                        indice !== -1
                    ) {

                        contas[indice].senhaHash =

                            gerarHashDemonstrativo(
                                novaSenha.value
                            );


                        contas[indice].senhaAtualizadaEm =

                            new Date()
                                .toISOString();


                        localStorage.setItem(

                            "contasSafeSchool",

                            JSON.stringify(
                                contas
                            )

                        );

                    }


                    /* =====================================
                       PRESERVAR ESCOLA VALIDADA
                    ====================================== */

                    sessionStorage.setItem(

                        "codigoEscolaSafeSchool",

                        codigoEscola

                    );


                    sessionStorage.setItem(

                        "nomeEscolaSafeSchool",

                        nomeEscola ||
                        ESCOLA_DEMO.nome

                    );


                    /* =====================================
                       RETORNO AO LOGIN
                    ====================================== */

                    if (
                        irParaLogin
                    ) {

                        irParaLogin.href =

                            "login.html?escola="

                            +

                            encodeURIComponent(
                                codigoEscola
                            );

                    }


                    mostrarEtapa(
                        "sucesso"
                    );

                }

            );


            /* =========================================
               LIMPAR ERROS
            ========================================= */

            emailRecuperacao.addEventListener(

                "input",

                function () {

                    erroEmail.hidden =
                        true;

                }

            );


            codigoEscolaRecuperacao.addEventListener(

                "input",

                function () {

                    codigoEscolaRecuperacao.value =

                        codigoEscolaRecuperacao.value
                            .toUpperCase();


                    erroEscola.hidden =
                        true;

                }

            );


            novaSenha.addEventListener(

                "input",

                function () {

                    erroNovaSenha.hidden =
                        true;


                    erroConfirmarNovaSenha.hidden =
                        true;

                }

            );


            confirmarNovaSenha.addEventListener(

                "input",

                function () {

                    erroConfirmarNovaSenha.hidden =
                        true;

                }

            );


            /* =========================================
               INICIAR
            ========================================= */

            preencherEscola();

            mostrarEtapa(
                "solicitacao"
            );

        }

    );

})();