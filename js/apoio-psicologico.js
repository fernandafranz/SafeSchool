/* =========================================
   SAFESCHOOL
   APOIO PSICOLÓGICO
   INTEGRAÇÃO COM SUPABASE
========================================= */

(function () {

    "use strict";


    /* =========================================
       ELEMENTOS
    ========================================== */

    const opcoesApoio =
        document.querySelectorAll(
            ".opcao-apoio"
        );


    const tipoApoio =
        document.getElementById(
            "tipoApoio"
        );


    const formularioApoio =
        document.getElementById(
            "formularioApoio"
        );


    const resultadoApoio =
        document.getElementById(
            "resultadoApoio"
        );


    const protocoloApoio =
        document.getElementById(
            "protocoloApoio"
        );


    const campoPeriodo =
        document.getElementById(
            "periodo"
        );


    const campoMensagem =
        document.getElementById(
            "mensagem"
        );


    const campoConfirmacao =
        document.getElementById(
            "confirmacaoApoio"
        );


    const botaoSolicitar =
        formularioApoio
            ? formularioApoio.querySelector(
                ".botao-solicitar"
            )
            : null;


    /* =========================================
       VERIFICAÇÃO INICIAL
    ========================================== */

    if (
        !formularioApoio ||
        !tipoApoio ||
        !resultadoApoio ||
        !protocoloApoio ||
        !campoPeriodo ||
        !campoMensagem ||
        !campoConfirmacao
    ) {

        console.error(
            "SafeSchool: não foi possível inicializar o módulo de apoio psicológico."
        );


        return;

    }


    /* =========================================
       SUPABASE
    ========================================== */

    async function obterSupabase() {

        if (
            !window.SafeSchoolSupabaseReady
        ) {

            throw new Error(
                "Cliente Supabase não inicializado."
            );

        }


        return await
            window.SafeSchoolSupabaseReady;

    }


    /* =========================================
       USUÁRIO AUTENTICADO
    ========================================== */

    async function obterUsuarioAutenticado(
        supabase
    ) {

        const {
            data,
            error
        } =
            await supabase.auth
                .getUser();


        if (
            error ||
            !data ||
            !data.user
        ) {

            throw new Error(
                "Sessão autenticada não encontrada."
            );

        }


        return data.user;

    }


    /* =========================================
       PERFIL DO ALUNO
    ========================================== */

    async function obterPerfilAluno(
        supabase,
        usuario
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
                    usuario.id
                )

                .single();


        if (
            error
        ) {

            console.error(

                "SafeSchool: erro ao consultar o perfil do aluno.",

                error

            );


            throw new Error(
                "Perfil do aluno não localizado."
            );

        }


        if (
            !data ||
            !data.ativo ||
            data.perfil !== "aluno"
        ) {

            throw new Error(
                "Perfil de aluno inválido."
            );

        }


        return data;

    }


    /* =========================================
       ESCOLA DO ALUNO
    ========================================== */

    async function obterEscolaAluno(
        supabase,
        perfil
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
                    perfil.escola_id
                )

                .single();


        if (
            error
        ) {

            console.error(

                "SafeSchool: erro ao consultar a escola do aluno.",

                error

            );


            throw new Error(
                "Escola do aluno não localizada."
            );

        }


        if (
            !data ||
            !data.ativo
        ) {

            throw new Error(
                "Escola do aluno indisponível."
            );

        }


        return data;

    }


    /* =========================================
       SELECIONAR TIPO DE APOIO
    ========================================== */

    opcoesApoio.forEach(

        function (
            opcao
        ) {

            opcao.addEventListener(

                "click",

                function () {

                    opcoesApoio.forEach(

                        function (
                            item
                        ) {

                            item.classList.remove(
                                "ativo"
                            );

                        }

                    );


                    opcao.classList.add(
                        "ativo"
                    );


                    tipoApoio.value =
                        (
                            opcao.getAttribute(
                                "data-tipo"
                            ) || ""
                        )
                        .trim();

                }

            );

        }

    );


    /* =========================================
       VALIDAÇÃO
    ========================================== */

    function validarFormulario() {

        if (
            !tipoApoio.value
        ) {

            alert(

                "Escolha como você gostaria de receber apoio."

            );


            return false;

        }


        if (
            !campoPeriodo.value
        ) {

            alert(

                "Informe qual período seria melhor para você."

            );


            campoPeriodo.focus();


            return false;

        }


        if (
            campoMensagem.value.trim().length > 500
        ) {

            alert(

                "A mensagem deve ter no máximo 500 caracteres."

            );


            campoMensagem.focus();


            return false;

        }


        if (
            !campoConfirmacao.checked
        ) {

            alert(

                "Confirme que deseja solicitar contato da equipe de Psicologia."

            );


            campoConfirmacao.focus();


            return false;

        }


        return true;

    }


    /* =========================================
       TEXTOS DO ASSUNTO
    ========================================== */

    function obterDescricaoTipo(
        tipo
    ) {

        const tipos = {

            rapido:
                "Conversa assim que possível",

            agendamento:
                "Agendamento de conversa",

            orientacao:
                "Orientação"

        };


        return (
            tipos[tipo] ||
            "Solicitação de apoio"
        );

    }


    function obterDescricaoPeriodo(
        periodo
    ) {

        const periodos = {

            manha:
                "Manhã",

            tarde:
                "Tarde",

            qualquer:
                "Qualquer horário disponível"

        };


        return (
            periodos[periodo] ||
            "Período não informado"
        );

    }


    /* =========================================
       BOTÃO EM PROCESSAMENTO
    ========================================== */

    function definirProcessando(
        processando
    ) {

        if (
            !botaoSolicitar
        ) {

            return;

        }


        botaoSolicitar.disabled =
            processando;


        if (
            processando
        ) {

            if (
                !botaoSolicitar.dataset.textoOriginal
            ) {

                botaoSolicitar.dataset.textoOriginal =
                    botaoSolicitar.innerHTML;

            }


            botaoSolicitar.textContent =
                "Registrando solicitação...";

        }

        else {

            if (
                botaoSolicitar.dataset.textoOriginal
            ) {

                botaoSolicitar.innerHTML =
                    botaoSolicitar.dataset.textoOriginal;


                delete
                botaoSolicitar.dataset.textoOriginal;

            }

        }

    }


    /* =========================================
       CRIAR SOLICITAÇÃO
    ========================================== */

    async function registrarSolicitacao(
        supabase,
        usuario,
        perfil,
        escola
    ) {

        const tipoSelecionado =
            tipoApoio.value
                .trim();


        const periodoSelecionado =
            campoPeriodo.value
                .trim();


        const descricaoTipo =
            obterDescricaoTipo(
                tipoSelecionado
            );


        const descricaoPeriodo =
            obterDescricaoPeriodo(
                periodoSelecionado
            );


        const assunto =

            descricaoTipo

            +

            " — "

            +

            descricaoPeriodo;


        const mensagemDigitada =
            campoMensagem.value
                .trim();


        const mensagem =

            mensagemDigitada

                ? mensagemDigitada

                : "Nenhuma mensagem complementar foi adicionada pelo aluno.";


        const {
            data,
            error
        } =
            await supabase

                .from(
                    "solicitacoes_psicologia"
                )

                .insert({

                    escola_id:
                        escola.id,

                    aluno_id:
                        usuario.id,

                    tipo_apoio:
                        tipoSelecionado,

                    periodo_preferido:
                        periodoSelecionado,

                    assunto:
                        assunto,

                    mensagem:
                        mensagem

                })

                .select(
                    "id,status,tipo_apoio,periodo_preferido,criado_em"
                )

                .single();


        if (
            error
        ) {

            console.error(

                "SafeSchool: erro ao registrar solicitação de Psicologia.",

                error

            );


            throw new Error(
                "Não foi possível registrar a solicitação."
            );

        }


        if (
            !data ||
            !data.id
        ) {

            throw new Error(
                "O banco não retornou a solicitação registrada."
            );

        }


        return data;

    }


    /* =========================================
       REFERÊNCIA DA SOLICITAÇÃO
    ========================================== */

    function gerarReferencia(
        id
    ) {

        if (
            !id
        ) {

            return "-";

        }


        return (

            "APOIO-"

            +

            id
                .replaceAll(
                    "-",
                    ""
                )
                .substring(
                    0,
                    8
                )
                .toUpperCase()

        );

    }


    /* =========================================
       LIMPAR FORMULÁRIO
    ========================================== */

    function limparFormulario() {

        formularioApoio.reset();


        tipoApoio.value =
            "";


        opcoesApoio.forEach(

            function (
                item
            ) {

                item.classList.remove(
                    "ativo"
                );

            }

        );

    }


    /* =========================================
       REDIRECIONAR PARA LOGIN
    ========================================== */

    function redirecionarParaLogin() {

        const codigo =
            (
                sessionStorage.getItem(
                    "codigoEscolaSafeSchool"
                ) || ""
            )
            .trim();


        let destino =
            "login.html?acesso=restrito";


        if (
            codigo
        ) {

            destino +=

                "&escola="

                +

                encodeURIComponent(
                    codigo
                );

        }


        window.location.href =
            destino;

    }


    /* =========================================
       TRATAR ERRO
    ========================================== */

    function mostrarErro(
        erro
    ) {

        const mensagem =
            (
                erro &&
                erro.message
                    ? erro.message
                    : ""
            );


        if (
            mensagem ===
            "Sessão autenticada não encontrada."
        ) {

            alert(

                "Sua sessão não está mais disponível.\n\n" +

                "Faça login novamente para solicitar apoio."

            );


            redirecionarParaLogin();


            return;

        }


        if (
            mensagem ===
            "Perfil do aluno não localizado."

            ||

            mensagem ===
            "Perfil de aluno inválido."
        ) {

            alert(

                "Não foi possível validar sua conta de Aluno.\n\n" +

                "Faça login novamente ou entre em contato com a instituição."

            );


            return;

        }


        if (
            mensagem ===
            "Escola do aluno não localizada."

            ||

            mensagem ===
            "Escola do aluno indisponível."
        ) {

            alert(

                "Não foi possível validar a escola vinculada à sua conta."

            );


            return;

        }


        alert(

            "Não foi possível registrar sua solicitação neste momento.\n\n" +

            "Tente novamente em alguns instantes."

        );

    }


    /* =========================================
       ENVIO DO FORMULÁRIO
    ========================================== */

    formularioApoio.addEventListener(

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


            definirProcessando(
                true
            );


            try {

                const supabase =
                    await obterSupabase();


                const usuario =
                    await obterUsuarioAutenticado(
                        supabase
                    );


                const perfil =
                    await obterPerfilAluno(

                        supabase,

                        usuario

                    );


                const escola =
                    await obterEscolaAluno(

                        supabase,

                        perfil

                    );


                /*
                    Conferimos também se a escola
                    registrada na navegação corresponde
                    à escola real da conta.
                */

                const codigoSessao =
                    (
                        sessionStorage.getItem(
                            "codigoEscolaSafeSchool"
                        ) || ""
                    )
                    .trim()
                    .toUpperCase();


                if (
                    codigoSessao &&
                    codigoSessao !== escola.codigo
                ) {

                    throw new Error(
                        "A escola da sessão não corresponde à conta."
                    );

                }


                const solicitacao =
                    await registrarSolicitacao(

                        supabase,

                        usuario,

                        perfil,

                        escola

                    );


                protocoloApoio.textContent =
                    gerarReferencia(
                        solicitacao.id
                    );


                resultadoApoio.hidden =
                    false;


                resultadoApoio.scrollIntoView({

                    behavior:
                        "smooth",

                    block:
                        "center"

                });


                limparFormulario();

            }

            catch (
                erro
            ) {

                console.error(

                    "SafeSchool: falha ao registrar solicitação de Psicologia.",

                    erro

                );


                mostrarErro(
                    erro
                );

            }

            finally {

                definirProcessando(
                    false
                );

            }

        }

    );

})();