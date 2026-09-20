/* =========================================
   SAFESCHOOL
   LOGIN
========================================= */

(function () {

    "use strict";


    /* =========================================
       INICIAR
    ========================================= */

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


            const botaoEntrar =
                formLogin
                    ? formLogin.querySelector(
                        ".botao-entrar"
                    )
                    : null;


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


            /* =========================================
               VERIFICAÇÃO
            ========================================= */

            if (
                !formLogin ||
                !campoPerfil ||
                !campoEmail ||
                !campoSenha
            ) {

                alert(

                    "Não foi possível carregar corretamente a tela de login.\n\n" +

                    "Atualize a página e tente novamente."

                );


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
                   CADASTRO PÚBLICO
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
                   RECUPERAÇÃO DE SENHA

                   TODOS OS PERFIS PODEM RECUPERAR
                   A PRÓPRIA SENHA PELO E-MAIL.
                ====================================== */

                if (
                    blocoRecuperarSenha
                ) {

                    blocoRecuperarSenha.hidden =
                        false;

                }


                /*
                    A mensagem antiga informava que
                    a recuperação profissional dependia
                    da instituição.

                    Agora ela não é mais utilizada.
                */

                if (
                    avisoRecuperacaoProfissional
                ) {

                    avisoRecuperacaoProfissional.hidden =
                        true;

                }

            }


            /* =========================================
               SELECIONAR PERFIL
            ========================================= */

            function selecionarPerfil(
                perfil
            ) {

                const perfisPermitidos = [

                    "aluno",
                    "professor",
                    "responsavel",
                    "psicologia"

                ];


                if (
                    !perfisPermitidos.includes(
                        perfil
                    )
                ) {

                    return;

                }


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
               MOSTRAR / OCULTAR SENHA
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
               ESCOLA DA NAVEGAÇÃO
            ========================================= */

            function obterEscolaAtual() {

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


                if (
                    !codigo
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


                if (
                    erroPerfil
                ) {

                    erroPerfil.hidden =
                        true;

                }


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


                if (
                    !campoPerfil.value
                ) {

                    if (
                        erroPerfil
                    ) {

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

                    if (
                        erroEmail
                    ) {

                        erroEmail.hidden =
                            false;

                    }


                    valido =
                        false;

                }


                if (
                    !campoSenha.value
                ) {

                    if (
                        erroSenha
                    ) {

                        erroSenha.hidden =
                            false;

                    }


                    valido =
                        false;

                }


                return valido;

            }


            /* =========================================
               DESTINO
            ========================================= */

            function obterDestino(
                perfil
            ) {

                if (
                    perfil === "aluno"
                ) {

                    const parametros =
                        new URLSearchParams(
                            window.location.search
                        );


                    const origem =
                        (
                            parametros.get(
                                "origem"
                            ) || ""
                        )
                        .trim()
                        .toLowerCase();


                    if (
                        origem ===
                        "desafios"
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
               OBTÉM CLIENTE SUPABASE
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
               BOTÃO PROCESSANDO
            ========================================= */

            function definirProcessando(
                processando
            ) {

                if (
                    !botaoEntrar
                ) {

                    return;

                }


                botaoEntrar.disabled =
                    processando;


                if (
                    processando
                ) {

                    botaoEntrar.dataset.textoOriginal =
                        botaoEntrar.innerHTML;


                    botaoEntrar.textContent =
                        "Entrando...";

                }

                else {

                    if (
                        botaoEntrar.dataset.textoOriginal
                    ) {

                        botaoEntrar.innerHTML =
                            botaoEntrar.dataset.textoOriginal;

                    }


                    delete
                    botaoEntrar.dataset.textoOriginal;

                }

            }


            /* =========================================
               MENSAGEM DE ERRO
            ========================================= */

            function mensagemErroLogin(
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
                        "email not confirmed"
                    )
                ) {

                    return (

                        "Seu e-mail ainda não foi confirmado.\n\n" +

                        "Abra a mensagem enviada para o seu e-mail e confirme o cadastro antes de entrar."

                    );

                }


                if (
                    mensagem.includes(
                        "invalid login credentials"
                    )
                ) {

                    return (
                        "E-mail ou senha incorretos."
                    );

                }


                if (
                    mensagem.includes(
                        "too many"
                    )

                    ||

                    mensagem.includes(
                        "rate"
                    )
                ) {

                    return (

                        "Foram realizadas muitas tentativas em pouco tempo.\n\n" +

                        "Aguarde alguns minutos e tente novamente."

                    );

                }


                return (

                    "Não foi possível entrar no SafeSchool neste momento.\n\n" +

                    "Verifique sua conexão e tente novamente."

                );

            }


            /* =========================================
               SALVAR SESSÃO COMPATÍVEL
            ========================================= */

            function salvarSessaoSafeSchool(
                perfil,
                email,
                escola,
                usuarioId,
                nome
            ) {

                sessionStorage.setItem(

                    "perfilSafeSchool",

                    perfil

                );


                sessionStorage.setItem(

                    "usuarioEmailSafeSchool",

                    email

                );


                if (
                    usuarioId
                ) {

                    sessionStorage.setItem(

                        "usuarioIdSafeSchool",

                        usuarioId

                    );

                }


                if (
                    nome
                ) {

                    sessionStorage.setItem(

                        "usuarioNomeSafeSchool",

                        nome

                    );

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
               BUSCAR PERFIL REAL
            ========================================= */

            async function buscarPerfilReal(
                supabase,
                usuarioId
            ) {

                const {
                    data,
                    error
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
                            usuarioId
                        )

                        .single();


                if (
                    error
                ) {

                    console.error(
                        "SafeSchool: erro ao buscar perfil.",
                        error
                    );


                    throw new Error(
                        "Perfil SafeSchool não encontrado."
                    );

                }


                return data;

            }


            /* =========================================
               BUSCAR ESCOLA REAL
            ========================================= */

            async function buscarEscolaReal(
                supabase,
                escolaId
            ) {

                const {
                    data,
                    error
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
                            escolaId
                        )

                        .single();


                if (
                    error
                ) {

                    console.error(
                        "SafeSchool: erro ao buscar escola.",
                        error
                    );


                    throw new Error(
                        "Escola vinculada não encontrada."
                    );

                }


                return data;

            }


            /* =========================================
               LOGIN REAL NO SUPABASE

               ALUNO
               PROFESSOR
               RESPONSÁVEL
               PSICOLOGIA
            ========================================= */

            async function entrarComSupabase(
                perfilSelecionado,
                email,
                senha
            ) {

                const supabase =
                    await obterSupabase();


                /* =====================================
                   AUTENTICAR
                ====================================== */

                const {
                    data,
                    error
                } =
                    await supabase.auth
                        .signInWithPassword(

                            {

                                email:
                                    email,

                                password:
                                    senha

                            }

                        );


                if (
                    error
                ) {

                    throw error;

                }


                if (
                    !data ||
                    !data.user
                ) {

                    throw new Error(
                        "Usuário não retornado após autenticação."
                    );

                }


                const usuario =
                    data.user;


                /* =====================================
                   BUSCAR PERFIL
                ====================================== */

                let perfilReal;


                try {

                    perfilReal =
                        await buscarPerfilReal(

                            supabase,

                            usuario.id

                        );

                }

                catch (
                    erro
                ) {

                    await supabase.auth
                        .signOut();


                    throw erro;

                }


                /* =====================================
                   CONTA ATIVA
                ====================================== */

                if (
                    !perfilReal.ativo
                ) {

                    await supabase.auth
                        .signOut();


                    alert(

                        "Este acesso está inativo.\n\n" +

                        "Entre em contato com a instituição responsável pelo SafeSchool."

                    );


                    return;

                }


                /* =====================================
                   PERFIL SELECIONADO X PERFIL REAL
                ====================================== */

                if (
                    perfilReal.perfil

                    !==

                    perfilSelecionado
                ) {

                    await supabase.auth
                        .signOut();


                    alert(

                        "O perfil selecionado não corresponde à sua conta.\n\n" +

                        "Selecione o perfil correto e tente novamente."

                    );


                    return;

                }


                /* =====================================
                   BUSCAR ESCOLA
                ====================================== */

                let escola;


                try {

                    escola =
                        await buscarEscolaReal(

                            supabase,

                            perfilReal.escola_id

                        );

                }

                catch (
                    erro
                ) {

                    await supabase.auth
                        .signOut();


                    throw erro;

                }


                if (
                    !escola ||
                    !escola.ativo
                ) {

                    await supabase.auth
                        .signOut();


                    alert(

                        "A escola vinculada a esta conta não está disponível para acesso."

                    );


                    return;

                }


                /* =====================================
                   SALVAR COMPATIBILIDADE
                ====================================== */

                salvarSessaoSafeSchool(

                    perfilReal.perfil,

                    usuario.email || email,

                    escola,

                    usuario.id,

                    perfilReal.nome

                );


                /* =====================================
                   DESTINO
                ====================================== */

                const destino =
                    obterDestino(
                        perfilReal.perfil
                    );


                if (
                    !destino
                ) {

                    await supabase.auth
                        .signOut();


                    alert(
                        "Perfil de acesso não reconhecido."
                    );


                    return;

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
               REALIZAR LOGIN
            ========================================= */

            async function realizarLogin() {

                const perfil =
                    campoPerfil.value;


                const email =
                    campoEmail.value
                        .trim()
                        .toLowerCase();


                const senha =
                    campoSenha.value;


                definirProcessando(
                    true
                );


                try {

                    await entrarComSupabase(

                        perfil,

                        email,

                        senha

                    );

                }

                catch (
                    erro
                ) {

                    console.error(
                        "SafeSchool: falha no login.",
                        erro
                    );


                    if (
                        erro &&
                        erro.message ===
                        "Perfil SafeSchool não encontrado."
                    ) {

                        alert(

                            "Sua conta de autenticação existe, mas o perfil do SafeSchool não foi localizado.\n\n" +

                            "Entre em contato com a instituição."

                        );


                        return;

                    }


                    if (
                        erro &&
                        erro.message ===
                        "Escola vinculada não encontrada."
                    ) {

                        alert(

                            "Não foi possível localizar a escola vinculada à sua conta.\n\n" +

                            "Entre em contato com a instituição."

                        );


                        return;

                    }


                    alert(
                        mensagemErroLogin(
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
               FORMULÁRIO
            ========================================= */

            formLogin.addEventListener(

                "submit",

                async function (
                    evento
                ) {

                    evento.preventDefault();


                    if (
                        !validarFormulario()
                    ) {

                        return;

                    }


                    await realizarLogin();

                }

            );


            /* =========================================
               LIMPAR ERROS
            ========================================= */

            campoEmail.addEventListener(

                "input",

                function () {

                    if (
                        erroEmail
                    ) {

                        erroEmail.hidden =
                            true;

                    }

                }

            );


            campoSenha.addEventListener(

                "input",

                function () {

                    if (
                        erroSenha
                    ) {

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