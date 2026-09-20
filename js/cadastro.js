/* =========================================
   SAFESCHOOL
   CADASTRO
========================================= */

(function () {

    "use strict";


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


            const botaoCadastrar =
                formCadastro
                    ? formCadastro.querySelector(
                        ".botao-cadastrar"
                    )
                    : null;


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
               ESCOLA JÁ PRESENTE NA NAVEGAÇÃO
            ========================================= */

            function obterEscolaDaNavegacao() {

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


                const codigo =
                    (
                        sessionStorage.getItem(
                            "codigoEscolaSafeSchool"
                        ) || ""
                    )
                    .trim()
                    .toUpperCase();


                const nome =
                    (
                        sessionStorage.getItem(
                            "nomeEscolaSafeSchool"
                        ) || ""
                    )
                    .trim();


                if (!codigo) {

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
               PREENCHER ESCOLA AUTOMATICAMENTE
            ========================================= */

            function preencherEscola() {

                const escola =
                    obterEscolaDaNavegacao();


                if (
                    escola &&
                    escola.codigo
                ) {

                    codigoEscolaCadastro.value =
                        escola.codigo;

                }

            }


            /* =========================================
               PERFIL
            ========================================= */

            function selecionarPerfil(
                perfil
            ) {

                /*
                    Cadastro público permitido
                    somente para Aluno e Responsável.
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
               SENHA
            ========================================= */

            function senhaValida(
                senha
            ) {

                if (
                    typeof senha !== "string"
                ) {

                    return false;

                }


                const possuiTamanho =
                    senha.length >= 8;


                const possuiMinuscula =
                    /[a-z]/.test(
                        senha
                    );


                const possuiMaiuscula =
                    /[A-Z]/.test(
                        senha
                    );


                const possuiNumero =
                    /[0-9]/.test(
                        senha
                    );


                return (

                    possuiTamanho

                    &&

                    possuiMinuscula

                    &&

                    possuiMaiuscula

                    &&

                    possuiNumero

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
               VALIDAR FORMULÁRIO
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
                    codigoEscolaCadastro.value
                        .trim()
                        .length < 2
                ) {

                    if (
                        erroEscolaCadastro
                    ) {

                        erroEscolaCadastro.hidden =
                            false;

                    }


                    primeiraMensagem =
                        primeiraMensagem ||
                        "Digite o código da sua escola.";


                    valido =
                        false;

                }


                /* SENHA */

                if (
                    !senhaValida(
                        senhaCadastro.value
                    )
                ) {

                    if (
                        erroSenhaCadastro
                    ) {

                        erroSenhaCadastro.hidden =
                            false;

                    }


                    primeiraMensagem =
                        primeiraMensagem ||
                        "A senha deve ter pelo menos 8 caracteres, com letra maiúscula, letra minúscula e número.";


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
               OBTER CLIENTE SUPABASE
            ========================================= */

            async function obterSupabase() {

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


            /* =========================================
               VALIDAR ESCOLA NO BANCO
            ========================================= */

            async function buscarEscola(
                supabase,
                codigo
            ) {

                const codigoNormalizado =
                    (
                        codigo || ""
                    )
                    .trim()
                    .toUpperCase();


                const {
                    data,
                    error
                } =
                    await supabase.rpc(

                        "buscar_escola_por_codigo",

                        {

                            codigo_informado:
                                codigoNormalizado

                        }

                    );


                if (error) {

                    console.error(
                        "SafeSchool: erro ao validar escola.",
                        error
                    );


                    throw new Error(
                        "Não foi possível validar a escola."
                    );

                }


                if (
                    !Array.isArray(data)

                    ||

                    data.length === 0
                ) {

                    return null;

                }


                return data[0];

            }


            /* =========================================
               URL DE RETORNO DO E-MAIL
            ========================================= */

            function obterUrlRetornoEmail() {

                return new URL(

                    "login.html",

                    window.location.href

                ).href;

            }


            /* =========================================
               ESTADO DO BOTÃO
            ========================================= */

            function definirProcessando(
                processando
            ) {

                if (
                    !botaoCadastrar
                ) {

                    return;

                }


                botaoCadastrar.disabled =
                    processando;


                if (processando) {

                    botaoCadastrar.dataset.textoOriginal =
                        botaoCadastrar.innerHTML;


                    botaoCadastrar.textContent =
                        "Criando conta...";

                }

                else {

                    if (
                        botaoCadastrar.dataset.textoOriginal
                    ) {

                        botaoCadastrar.innerHTML =
                            botaoCadastrar.dataset.textoOriginal;

                    }


                    delete
                    botaoCadastrar.dataset.textoOriginal;

                }

            }


            /* =========================================
               MENSAGEM DE ERRO DO SUPABASE
            ========================================= */

            function mensagemErroCadastro(
                erro
            ) {

                const mensagem =
                    (
                        erro &&
                        erro.message
                            ? erro.message
                            : ""
                    )
                    .toLowerCase();


                if (
                    mensagem.includes(
                        "password"
                    )
                ) {

                    return (

                        "A senha não atende aos requisitos de segurança.\n\n" +

                        "Utilize pelo menos 8 caracteres, com letra maiúscula, letra minúscula e número."

                    );

                }


                if (
                    mensagem.includes(
                        "email"
                    )

                    &&

                    mensagem.includes(
                        "invalid"
                    )
                ) {

                    return (
                        "O endereço de e-mail informado não é válido."
                    );

                }


                if (
                    mensagem.includes(
                        "rate"
                    )

                    ||

                    mensagem.includes(
                        "too many"
                    )
                ) {

                    return (

                        "Foram realizadas muitas tentativas em pouco tempo.\n\n" +

                        "Aguarde alguns minutos e tente novamente."

                    );

                }


                if (
                    mensagem.includes(
                        "database"
                    )
                ) {

                    return (

                        "Não foi possível concluir o cadastro no momento.\n\n" +

                        "Verifique os dados informados e tente novamente."

                    );

                }


                return (

                    "Não foi possível criar a conta no momento.\n\n" +

                    "Verifique sua conexão e tente novamente."

                );

            }


            /* =========================================
               CADASTRAR NO SUPABASE
            ========================================= */

            async function cadastrarConta() {

                definirProcessando(
                    true
                );


                try {

                    const supabase =
                        await obterSupabase();


                    /* =================================
                       VALIDAR ESCOLA REAL
                    ================================= */

                    const escola =
                        await buscarEscola(

                            supabase,

                            codigoEscolaCadastro.value

                        );


                    if (!escola) {

                        if (
                            erroEscolaCadastro
                        ) {

                            erroEscolaCadastro.hidden =
                                false;

                        }


                        alert(

                            "Código de escola não reconhecido.\n\n" +

                            "Confira o código fornecido pela instituição."

                        );


                        return;

                    }


                    /* =================================
                       DADOS DO CADASTRO
                    ================================= */

                    const nome =
                        nomeCadastro.value
                            .trim();


                    const email =
                        emailCadastro.value
                            .trim()
                            .toLowerCase();


                    const perfil =
                        perfilCadastro.value;


                    const senha =
                        senhaCadastro.value;


                    const urlRetorno =
                        obterUrlRetornoEmail();


                    /* =================================
                       CRIAR USUÁRIO
                    ================================= */

                    const {
                        data,
                        error
                    } =
                        await supabase.auth.signUp(

                            {

                                email:
                                    email,

                                password:
                                    senha,

                                options: {

                                    emailRedirectTo:
                                        urlRetorno,

                                    data: {

                                        nome:
                                            nome,

                                        perfil:
                                            perfil,

                                        escola_id:
                                            escola.id

                                    }

                                }

                            }

                        );


                    if (error) {

                        console.error(
                            "SafeSchool: erro no cadastro.",
                            error
                        );


                        throw error;

                    }


                    if (
                        !data ||
                        !data.user
                    ) {

                        throw new Error(
                            "Usuário não retornado pelo serviço de autenticação."
                        );

                    }


                    /* =================================
                       GUARDAR ESCOLA NA SESSÃO
                    ================================= */

                    sessionStorage.setItem(

                        "codigoEscolaSafeSchool",

                        escola.codigo

                    );


                    sessionStorage.setItem(

                        "nomeEscolaSafeSchool",

                        escola.nome

                    );


                    /* =================================
                       SUCESSO
                    ================================= */

                    alert(

                        "Cadastro realizado! 🎉\n\n" +

                        "Enviamos uma mensagem para o seu e-mail.\n\n" +

                        "Abra o e-mail e confirme seu cadastro antes de entrar no SafeSchool.\n\n" +

                        "Se você já tiver uma conta com esse endereço, utilize a recuperação de senha na tela de login."

                    );


                    /* =================================
                       IR PARA O LOGIN
                    ================================= */

                    window.location.href =

                        "login.html?escola="

                        +

                        encodeURIComponent(
                            escola.codigo
                        );

                }

                catch (erro) {

                    console.error(
                        "SafeSchool: falha ao criar conta.",
                        erro
                    );


                    alert(
                        mensagemErroCadastro(
                            erro
                        )
                    );

                }

                finally {

                    definirProcessando(
                        false
                    );

                }

            }


            /* =========================================
               SUBMIT
            ========================================= */

            formCadastro.addEventListener(

                "submit",

                async function (evento) {

                    evento.preventDefault();


                    if (
                        !validarCadastro()
                    ) {

                        return;

                    }


                    await cadastrarConta();

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