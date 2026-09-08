/* =========================================
   SAFESCHOOL
   CADASTRO
========================================= */

(function () {

    "use strict";


    /* =========================================
       ESCOLA DEMONSTRATIVA
    ========================================= */

    const ESCOLA_DEMO = {

        codigo:
            "ESC001",

        nome:
            "Escola Demonstrativa SafeSchool"

    };


    /* =========================================
       INICIAR APÓS CARREGAR A PÁGINA
    ========================================= */

    document.addEventListener(

        "DOMContentLoaded",

        function () {


            /* =========================================
               ELEMENTOS
            ========================================= */

            const formCadastro =
                document.getElementById(
                    "formCadastro"
                );


            const perfilCadastro =
                document.getElementById(
                    "perfilCadastro"
                );


            const botoesPerfil =
                document.querySelectorAll(
                    ".cartao-perfil"
                );


            const nomeCadastro =
                document.getElementById(
                    "nomeCadastro"
                );


            const emailCadastro =
                document.getElementById(
                    "emailCadastro"
                );


            const codigoEscolaCadastro =
                document.getElementById(
                    "codigoEscolaCadastro"
                );


            const senhaCadastro =
                document.getElementById(
                    "senhaCadastro"
                );


            const confirmarSenhaCadastro =
                document.getElementById(
                    "confirmarSenhaCadastro"
                );


            const confirmacaoCadastro =
                document.getElementById(
                    "confirmacaoCadastro"
                );


            const mostrarSenhaCadastro =
                document.getElementById(
                    "mostrarSenhaCadastro"
                );


            /* =========================================
               ERROS
            ========================================= */

            const erroPerfilCadastro =
                document.getElementById(
                    "erroPerfilCadastro"
                );


            const erroNomeCadastro =
                document.getElementById(
                    "erroNomeCadastro"
                );


            const erroEmailCadastro =
                document.getElementById(
                    "erroEmailCadastro"
                );


            const erroEscolaCadastro =
                document.getElementById(
                    "erroEscolaCadastro"
                );


            const erroSenhaCadastro =
                document.getElementById(
                    "erroSenhaCadastro"
                );


            const erroConfirmarSenha =
                document.getElementById(
                    "erroConfirmarSenha"
                );


            const erroConfirmacaoCadastro =
                document.getElementById(
                    "erroConfirmacaoCadastro"
                );


            /* =========================================
               VERIFICAÇÃO BÁSICA
            ========================================= */

            if (
                !formCadastro ||
                !perfilCadastro ||
                !nomeCadastro ||
                !emailCadastro ||
                !codigoEscolaCadastro ||
                !senhaCadastro ||
                !confirmarSenhaCadastro ||
                !confirmacaoCadastro
            ) {

                alert(

                    "Não foi possível carregar corretamente o formulário de cadastro.\n\n" +

                    "Atualize a página e tente novamente."

                );


                return;

            }


            /* =========================================
               ESCOLA VALIDADA
            ========================================= */

            function obterEscolaAtual() {

                /*
                    A prioridade é sempre a escola
                    já validada pelo escola.js.
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
                    Fallback apenas para a escola
                    demonstrativa já conhecida pelo
                    protótipo e salva na sessão.
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
               PREENCHER ESCOLA AUTOMATICAMENTE
            ========================================= */

            function preencherEscola() {

                const escola =
                    obterEscolaAtual();


                codigoEscolaCadastro.value =

                    escola

                        ? escola.codigo

                        : "";

            }


            /* =========================================
               PERFIL
            ========================================= */

            function selecionarPerfil(
                perfil
            ) {

                /*
                    O cadastro público do SafeSchool
                    é permitido apenas para Aluno
                    e Responsável.
                */

                if (
                    perfil !== "aluno"

                    &&

                    perfil !== "responsavel"
                ) {

                    return;

                }


                perfilCadastro.value =
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


                if (
                    erroPerfilCadastro
                ) {

                    erroPerfilCadastro.hidden =
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
               MOSTRAR / OCULTAR SENHA
            ========================================= */

            if (
                mostrarSenhaCadastro
            ) {

                mostrarSenhaCadastro.addEventListener(

                    "click",

                    function () {

                        const estaVisivel =

                            senhaCadastro.type

                            ===

                            "text";


                        senhaCadastro.type =

                            estaVisivel
                                ? "password"
                                : "text";


                        confirmarSenhaCadastro.type =

                            estaVisivel
                                ? "password"
                                : "text";


                        mostrarSenhaCadastro.textContent =

                            estaVisivel
                                ? "👁️"
                                : "🙈";


                        mostrarSenhaCadastro.setAttribute(

                            "aria-label",

                            estaVisivel
                                ? "Mostrar senha"
                                : "Ocultar senha"

                        );

                    }

                );

            }


            /* =========================================
               E-MAIL
            ========================================= */

            function emailValido(
                email
            ) {

                const valor =
                    (
                        email || ""
                    )
                    .trim();


                return (

                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/

                ).test(
                    valor
                );

            }


            /* =========================================
               ESCOLA
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
               ESCONDER ERROS
            ========================================= */

            function esconderErros() {

                const erros = [

                    erroPerfilCadastro,
                    erroNomeCadastro,
                    erroEmailCadastro,
                    erroEscolaCadastro,
                    erroSenhaCadastro,
                    erroConfirmarSenha,
                    erroConfirmacaoCadastro

                ];


                erros.forEach(

                    function (erro) {

                        if (erro) {

                            erro.hidden =
                                true;

                        }

                    }

                );

            }


            /* =========================================
               VALIDAR
            ========================================= */

            function validarCadastro() {

                esconderErros();


                let valido =
                    true;


                let primeiraMensagem =
                    "";


                /* PERFIL */

                if (
                    perfilCadastro.value !==
                    "aluno"

                    &&

                    perfilCadastro.value !==
                    "responsavel"
                ) {

                    if (
                        erroPerfilCadastro
                    ) {

                        erroPerfilCadastro.hidden =
                            false;

                    }


                    primeiraMensagem =
                        primeiraMensagem ||
                        "Selecione se você é Aluno ou Responsável.";


                    valido =
                        false;

                }


                /* NOME */

                if (
                    nomeCadastro.value
                        .trim()
                        .length < 2
                ) {

                    if (
                        erroNomeCadastro
                    ) {

                        erroNomeCadastro.hidden =
                            false;

                    }


                    primeiraMensagem =
                        primeiraMensagem ||
                        "Digite seu nome.";


                    valido =
                        false;

                }


                /* E-MAIL */

                if (
                    !emailValido(
                        emailCadastro.value
                    )
                ) {

                    if (
                        erroEmailCadastro
                    ) {

                        erroEmailCadastro.hidden =
                            false;

                    }


                    primeiraMensagem =
                        primeiraMensagem ||
                        "Digite um e-mail válido.";


                    valido =
                        false;

                }


                /* ESCOLA */

                if (
                    !escolaValida(
                        codigoEscolaCadastro.value
                    )
                ) {

                    if (
                        erroEscolaCadastro
                    ) {

                        erroEscolaCadastro.hidden =
                            false;

                    }


                    primeiraMensagem =
                        primeiraMensagem ||
                        "Este cadastro precisa estar vinculado a uma escola válida do SafeSchool.";


                    valido =
                        false;

                }


                /* SENHA */

                if (
                    senhaCadastro.value.length < 6
                ) {

                    if (
                        erroSenhaCadastro
                    ) {

                        erroSenhaCadastro.hidden =
                            false;

                    }


                    primeiraMensagem =
                        primeiraMensagem ||
                        "A senha precisa ter pelo menos 6 caracteres.";


                    valido =
                        false;

                }


                /* CONFIRMAR SENHA */

                if (

                    confirmarSenhaCadastro.value

                    !==

                    senhaCadastro.value

                ) {

                    if (
                        erroConfirmarSenha
                    ) {

                        erroConfirmarSenha.hidden =
                            false;

                    }


                    primeiraMensagem =
                        primeiraMensagem ||
                        "As duas senhas precisam ser iguais.";


                    valido =
                        false;

                }


                /* CONFIRMAÇÃO */

                if (
                    !confirmacaoCadastro.checked
                ) {

                    if (
                        erroConfirmacaoCadastro
                    ) {

                        erroConfirmacaoCadastro.hidden =
                            false;

                    }


                    primeiraMensagem =
                        primeiraMensagem ||
                        "Marque a confirmação antes de criar a conta.";


                    valido =
                        false;

                }


                if (
                    !valido &&
                    primeiraMensagem
                ) {

                    alert(
                        primeiraMensagem
                    );

                }


                return valido;

            }


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
               HASH DEMONSTRATIVO
            ========================================= */

            /*
                Esta função NÃO representa segurança
                adequada para uma aplicação real.

                Serve apenas para evitar armazenar
                diretamente a senha legível no protótipo.
            */

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
               CADASTRAR
            ========================================= */

            function cadastrarConta() {

                const escolaAtual =
                    obterEscolaAtual();


                if (
                    !escolaAtual ||
                    !escolaAtual.codigo
                ) {

                    alert(

                        "Não foi possível identificar uma escola válida para este cadastro."

                    );


                    return;

                }


                const contas =
                    obterContas();


                const email =

                    emailCadastro.value
                        .trim()
                        .toLowerCase();


                const perfil =
                    perfilCadastro.value;


                const codigoEscola =

                    codigoEscolaCadastro.value
                        .trim()
                        .toUpperCase();


                /* =====================================
                   VERIFICAR CONTA EXISTENTE
                ====================================== */

                const contaExistente =
                    contas.some(

                        function (conta) {

                            return (

                                conta.email ===
                                email

                                &&

                                conta.perfil ===
                                perfil

                                &&

                                conta.escolaCodigo ===
                                codigoEscola

                            );

                        }

                    );


                if (
                    contaExistente
                ) {

                    alert(

                        "Já existe uma conta com este e-mail e perfil nesta escola.\n\n" +

                        "Se não lembrar sua senha, utilize a opção de recuperação de acesso na tela de login."

                    );


                    return;

                }


                /* =====================================
                   NOVA CONTA
                ====================================== */

                const novaConta = {

                    nome:
                        nomeCadastro.value
                            .trim(),

                    email:
                        email,

                    perfil:
                        perfil,

                    escolaCodigo:
                        escolaAtual.codigo,

                    escolaNome:
                        escolaAtual.nome,

                    senhaHash:
                        gerarHashDemonstrativo(
                            senhaCadastro.value
                        ),

                    criadoEm:
                        new Date()
                            .toISOString()

                };


                contas.push(
                    novaConta
                );


                /* =====================================
                   SALVAR
                ====================================== */

                try {

                    localStorage.setItem(

                        "contasSafeSchool",

                        JSON.stringify(
                            contas
                        )

                    );

                }

                catch (erro) {

                    alert(

                        "Não foi possível salvar a conta neste navegador.\n\n" +

                        "Tente atualizar a página e realizar o cadastro novamente."

                    );


                    return;

                }


                /* =====================================
                   VINCULAR ESCOLA
                ====================================== */

                sessionStorage.setItem(

                    "codigoEscolaSafeSchool",

                    escolaAtual.codigo

                );


                sessionStorage.setItem(

                    "nomeEscolaSafeSchool",

                    escolaAtual.nome

                );


                /* =====================================
                   SUCESSO
                ====================================== */

                alert(

                    "Conta criada com sucesso! 🎉\n\n" +

                    "Agora você pode entrar no SafeSchool."

                );


                /* =====================================
                   VOLTAR AO LOGIN
                ====================================== */

                window.location.href =

                    "login.html?escola="

                    +

                    encodeURIComponent(
                        escolaAtual.codigo
                    );

            }


            /* =========================================
               SUBMIT
            ========================================= */

            formCadastro.addEventListener(

                "submit",

                function (evento) {

                    evento.preventDefault();


                    if (
                        !validarCadastro()
                    ) {

                        return;

                    }


                    cadastrarConta();

                }

            );


            /* =========================================
               LIMPAR ERROS AO DIGITAR
            ========================================= */

            nomeCadastro.addEventListener(

                "input",

                function () {

                    if (
                        erroNomeCadastro
                    ) {

                        erroNomeCadastro.hidden =
                            true;

                    }

                }

            );


            emailCadastro.addEventListener(

                "input",

                function () {

                    if (
                        erroEmailCadastro
                    ) {

                        erroEmailCadastro.hidden =
                            true;

                    }

                }

            );


            codigoEscolaCadastro.addEventListener(

                "input",

                function () {

                    codigoEscolaCadastro.value =

                        codigoEscolaCadastro.value
                            .toUpperCase();


                    if (
                        erroEscolaCadastro
                    ) {

                        erroEscolaCadastro.hidden =
                            true;

                    }

                }

            );


            senhaCadastro.addEventListener(

                "input",

                function () {

                    if (
                        erroSenhaCadastro
                    ) {

                        erroSenhaCadastro.hidden =
                            true;

                    }


                    if (
                        erroConfirmarSenha
                    ) {

                        erroConfirmarSenha.hidden =
                            true;

                    }

                }

            );


            confirmarSenhaCadastro.addEventListener(

                "input",

                function () {

                    if (
                        erroConfirmarSenha
                    ) {

                        erroConfirmarSenha.hidden =
                            true;

                    }

                }

            );


            confirmacaoCadastro.addEventListener(

                "change",

                function () {

                    if (
                        erroConfirmacaoCadastro
                    ) {

                        erroConfirmacaoCadastro.hidden =
                            true;

                    }

                }

            );


            /* =========================================
               COMEÇAR
            ========================================= */

            preencherEscola();

        }

    );

})();