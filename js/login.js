/* =========================================
   SAFESCHOOL
   LOGIN
========================================= */

(function () {

    "use strict";


    /* =========================================
       CONTAS INSTITUCIONAIS DA DEMONSTRAÇÃO
    ========================================= */

    const contasInstitucionaisDemo = {

        professor: {

            email:
                "professor@safeschool.test",

            senha:
                "prof2026"

        },

        psicologia: {

            email:
                "psicologia@safeschool.test",

            senha:
                "psi2026"

        }

    };


    document.addEventListener(

        "DOMContentLoaded",

        function () {


            /* =========================================
               ELEMENTOS
            ========================================= */

            const formLogin =
                document.getElementById(
                    "formLogin"
                );


            const campoPerfil =
                document.getElementById(
                    "perfil"
                );


            const campoEmail =
                document.getElementById(
                    "email"
                );


            const campoSenha =
                document.getElementById(
                    "senha"
                );


            const botoesPerfil =
                document.querySelectorAll(
                    ".cartao-perfil"
                );


            const erroPerfil =
                document.getElementById(
                    "erroPerfil"
                );


            const erroEmail =
                document.getElementById(
                    "erroEmail"
                );


            const erroSenha =
                document.getElementById(
                    "erroSenha"
                );


            const botaoMostrarSenha =
                document.getElementById(
                    "botaoMostrarSenha"
                );


            const avisoRestrito =
                document.getElementById(
                    "avisoRestrito"
                );


            const linkCriarConta =
                document.getElementById(
                    "linkCriarConta"
                );


            const linkRecuperarSenha =
                document.getElementById(
                    "linkRecuperarSenha"
                );


            const blocoCadastroPublico =
                document.getElementById(
                    "blocoCadastroPublico"
                );


            const blocoContaProfissional =
                document.getElementById(
                    "blocoContaProfissional"
                );


            const blocoRecuperarSenha =
                document.getElementById(
                    "blocoRecuperarSenha"
                );


            const avisoRecuperacaoProfissional =
                document.getElementById(
                    "avisoRecuperacaoProfissional"
                );


            const acessoInstitucionalDemo =
                document.getElementById(
                    "acessoInstitucionalDemo"
                );


            const emailDemoProfissional =
                document.getElementById(
                    "emailDemoProfissional"
                );


            const senhaDemoProfissional =
                document.getElementById(
                    "senhaDemoProfissional"
                );


            const preencherAcessoDemo =
                document.getElementById(
                    "preencherAcessoDemo"
                );


            /* =========================================
               VERIFICAÇÃO
            ========================================= */

            if (
                !formLogin ||
                !campoPerfil ||
                !campoEmail ||
                !campoSenha
            ) {

                return;

            }


            /* =========================================
               PERFIL PROFISSIONAL?
            ========================================= */

            function perfilEhProfissional(
                perfil
            ) {

                return (

                    perfil === "professor"

                    ||

                    perfil === "psicologia"

                );

            }


            /* =========================================
               ATUALIZAR TELA PELO PERFIL
            ========================================= */

            function atualizarTelaPerfil(
                perfil
            ) {

                const profissional =
                    perfilEhProfissional(
                        perfil
                    );


                /* =====================================
                   CADASTRO
                ====================================== */

                if (
                    blocoCadastroPublico
                ) {

                    blocoCadastroPublico.hidden =
                        profissional;

                }


                if (
                    blocoContaProfissional
                ) {

                    blocoContaProfissional.hidden =
                        !profissional;

                }


                /* =====================================
                   RECUPERAÇÃO
                ====================================== */

                if (
                    blocoRecuperarSenha
                ) {

                    blocoRecuperarSenha.hidden =
                        profissional;

                }


                if (
                    avisoRecuperacaoProfissional
                ) {

                    avisoRecuperacaoProfissional.hidden =
                        !profissional;

                }


                /* =====================================
                   CREDENCIAIS DEMO
                ====================================== */

                if (
                    acessoInstitucionalDemo
                ) {

                    acessoInstitucionalDemo.hidden =
                        !profissional;

                }


                if (
                    profissional &&
                    contasInstitucionaisDemo[perfil]
                ) {

                    const conta =
                        contasInstitucionaisDemo[
                            perfil
                        ];


                    if (
                        emailDemoProfissional
                    ) {

                        emailDemoProfissional.textContent =
                            conta.email;

                    }


                    if (
                        senhaDemoProfissional
                    ) {

                        senhaDemoProfissional.textContent =
                            conta.senha;

                    }

                }

            }


            /* =========================================
               SELECIONAR PERFIL
            ========================================= */

            function selecionarPerfil(
                perfil
            ) {

                campoPerfil.value =
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
                    erroPerfil
                ) {

                    erroPerfil.hidden =
                        true;

                }


                atualizarTelaPerfil(
                    perfil
                );

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
               PREENCHER ACESSO DEMO
            ========================================= */

            if (
                preencherAcessoDemo
            ) {

                preencherAcessoDemo.addEventListener(

                    "click",

                    function () {

                        const perfil =
                            campoPerfil.value;


                        const conta =
                            contasInstitucionaisDemo[
                                perfil
                            ];


                        if (
                            !conta
                        ) {

                            return;

                        }


                        campoEmail.value =
                            conta.email;


                        campoSenha.value =
                            conta.senha;


                        if (
                            erroEmail
                        ) {

                            erroEmail.hidden =
                                true;

                        }


                        if (
                            erroSenha
                        ) {

                            erroSenha.hidden =
                                true;

                        }

                    }

                );

            }


            /* =========================================
               MOSTRAR SENHA
            ========================================= */

            if (
                botaoMostrarSenha
            ) {

                botaoMostrarSenha.addEventListener(

                    "click",

                    function () {

                        const mostrando =

                            campoSenha.type

                            ===

                            "text";


                        campoSenha.type =

                            mostrando
                                ? "password"
                                : "text";


                        botaoMostrarSenha.textContent =

                            mostrando
                                ? "👁️"
                                : "🙈";


                        botaoMostrarSenha.setAttribute(

                            "aria-label",

                            mostrando
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

            function obterEscolaAtual() {

                /*
                    A escola deve ter sido validada
                    pelo escola.js.

                    Não aceitamos diretamente qualquer
                    código recebido na URL.
                */

                if (
                    window.SafeSchoolEscola &&
                    typeof window.SafeSchoolEscola.obter === "function"
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
                    sessionStorage.getItem(
                        "codigoEscolaSafeSchool"
                    );


                const nome =
                    sessionStorage.getItem(
                        "nomeEscolaSafeSchool"
                    );


                if (
                    codigo
                ) {

                    return {

                        codigo:
                            codigo,

                        nome:
                            nome || ""

                    };

                }


                return null;

            }


            /* =========================================
               LINKS
            ========================================= */

            function atualizarLinksAcesso() {

                const escola =
                    obterEscolaAtual();


                if (
                    linkCriarConta
                ) {

                    linkCriarConta.href =

                        escola &&
                        escola.codigo

                            ? (
                                "cadastro.html?escola="

                                +

                                encodeURIComponent(
                                    escola.codigo
                                )
                            )

                            : "cadastro.html";

                }


                if (
                    linkRecuperarSenha
                ) {

                    linkRecuperarSenha.href =

                        escola &&
                        escola.codigo

                            ? (
                                "recuperar-senha.html?escola="

                                +

                                encodeURIComponent(
                                    escola.codigo
                                )
                            )

                            : "recuperar-senha.html";

                }

            }


            /* =========================================
               VALIDAÇÃO
            ========================================= */

            function validarFormulario() {

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


                if (erroSenha) {

                    erroSenha.hidden =
                        true;

                }


                if (
                    !campoPerfil.value
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
                        campoEmail.value
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
                    !campoSenha.value ||
                    campoSenha.value.length < 4
                ) {

                    if (erroSenha) {

                        erroSenha.hidden =
                            false;

                    }


                    valido =
                        false;

                }


                return valido;

            }


            /* =========================================
               CONTAS CADASTRADAS
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
               HASH DO PROTÓTIPO
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
               DESTINO
            ========================================= */

            function obterDestino(
                perfil
            ) {

                /*
                    Se o aluno chegou ao login
                    tentando acessar os desafios,
                    após a autenticação ele retorna
                    diretamente para essa área.
                */

                if (
                    perfil === "aluno"
                ) {

                    const parametros =
                        new URLSearchParams(
                            window.location.search
                        );


                    const origem =
                        parametros.get(
                            "origem"
                        );


                    if (
                        origem === "desafios"
                    ) {

                        return "desafios.html";

                    }

                }


                const destinos = {

                    aluno:
                        "aluno.html",

                    professor:
                        "professor.html",

                    responsavel:
                        "responsavel.html",

                    psicologia:
                        "psicologia.html"

                };


                return (
                    destinos[perfil] ||
                    null
                );

            }


            /* =========================================
               AUTENTICAR ALUNO / RESPONSÁVEL
            ========================================= */

            function autenticarContaPublica(
                perfil,
                email,
                senha,
                escola
            ) {

                const contas =
                    obterContas();


                const conta =
                    contas.find(

                        function (item) {

                            return (

                                item.email ===
                                email

                                &&

                                item.perfil ===
                                perfil

                                &&

                                item.escolaCodigo ===
                                escola.codigo

                            );

                        }

                    );


                if (
                    !conta
                ) {

                    alert(

                        "Não encontramos uma conta com este e-mail para o perfil selecionado.\n\n" +

                        "Se ainda não possui cadastro, utilize a opção “Criar minha conta”."

                    );


                    return false;

                }


                const hashDigitado =
                    gerarHashDemonstrativo(
                        senha
                    );


                if (
                    conta.senhaHash !==
                    hashDigitado
                ) {

                    alert(
                        "E-mail ou senha incorretos."
                    );


                    return false;

                }


                return true;

            }


            /* =========================================
               AUTENTICAR PROFISSIONAL
            ========================================= */

            function autenticarProfissional(
                perfil,
                email,
                senha
            ) {

                const conta =
                    contasInstitucionaisDemo[
                        perfil
                    ];


                if (!conta) {

                    return false;

                }


                if (

                    email.toLowerCase()

                    !==

                    conta.email.toLowerCase()

                    ||

                    senha !==
                    conta.senha

                ) {

                    alert(

                        "E-mail ou senha do acesso institucional estão incorretos."

                    );


                    return false;

                }


                return true;

            }


            /* =========================================
               REALIZAR LOGIN
            ========================================= */

            function realizarLogin() {

                const perfil =
                    campoPerfil.value;


                const email =
                    campoEmail.value
                        .trim()
                        .toLowerCase();


                const senha =
                    campoSenha.value;


                const escola =
                    obterEscolaAtual();


                if (
                    !escola ||
                    !escola.codigo
                ) {

                    alert(

                        "Este acesso precisa estar vinculado a uma escola.\n\n" +

                        "Abra o SafeSchool pelo link da instituição e tente novamente."

                    );


                    return;

                }


                let acessoPermitido =
                    false;


                /* =====================================
                   ALUNO / RESPONSÁVEL
                ====================================== */

                if (
                    perfil === "aluno" ||
                    perfil === "responsavel"
                ) {

                    acessoPermitido =
                        autenticarContaPublica(

                            perfil,

                            email,

                            senha,

                            escola

                        );

                }


                /* =====================================
                   PROFESSOR / PSICOLOGIA
                ====================================== */

                else if (
                    perfil === "professor" ||
                    perfil === "psicologia"
                ) {

                    acessoPermitido =
                        autenticarProfissional(

                            perfil,

                            email,

                            senha

                        );

                }


                if (
                    !acessoPermitido
                ) {

                    return;

                }


                const destino =
                    obterDestino(
                        perfil
                    );


                if (!destino) {

                    alert(
                        "Perfil não reconhecido."
                    );


                    return;

                }


                /* =====================================
                   CRIAR SESSÃO
                ====================================== */

                sessionStorage.setItem(

                    "perfilSafeSchool",

                    perfil

                );


                sessionStorage.setItem(

                    "usuarioEmailSafeSchool",

                    email

                );


                sessionStorage.setItem(

                    "codigoEscolaSafeSchool",

                    escola.codigo

                );


                if (
                    escola.nome
                ) {

                    sessionStorage.setItem(

                        "nomeEscolaSafeSchool",

                        escola.nome

                    );

                }


                /* =====================================
                   REDIRECIONAR
                ====================================== */

                window.location.href =

                    destino

                    +

                    "?escola="

                    +

                    encodeURIComponent(
                        escola.codigo
                    );

            }


            /* =========================================
               FORMULÁRIO
            ========================================= */

            formLogin.addEventListener(

                "submit",

                function (evento) {

                    evento.preventDefault();


                    if (
                        !validarFormulario()
                    ) {

                        return;

                    }


                    realizarLogin();

                }

            );


            /* =========================================
               LIMPAR ERROS
            ========================================= */

            campoEmail.addEventListener(

                "input",

                function () {

                    if (erroEmail) {

                        erroEmail.hidden =
                            true;

                    }

                }

            );


            campoSenha.addEventListener(

                "input",

                function () {

                    if (erroSenha) {

                        erroSenha.hidden =
                            true;

                    }

                }

            );


            /* =========================================
               ACESSO RESTRITO
            ========================================= */

            function verificarAcessoRestrito() {

                if (
                    !avisoRestrito
                ) {

                    return;

                }


                const parametros =
                    new URLSearchParams(
                        window.location.search
                    );


                avisoRestrito.hidden =

                    parametros.get(
                        "acesso"
                    )

                    !==

                    "restrito";

            }


            /* =========================================
               INICIAR
            ========================================= */

            verificarAcessoRestrito();

            atualizarLinksAcesso();

            atualizarTelaPerfil(
                ""
            );

        }

    );

})();