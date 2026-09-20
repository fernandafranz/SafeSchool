/* =========================================
   SAFESCHOOL
   ÁREA DO ALUNO
========================================= */

(function () {

    "use strict";


    /* =========================================
       ELEMENTOS
    ========================================== */

    const numeroDesafiosAluno =
        document.getElementById(
            "numeroDesafiosAluno"
        );


    const numeroPontosAluno =
        document.getElementById(
            "numeroPontosAluno"
        );


    const numeroSelosAluno =
        document.getElementById(
            "numeroSelosAluno"
        );


    const tituloBoasVindas =
        document.querySelector(
            ".boas-vindas-texto h2"
        );


    const contadorRelatosAluno =
        document.getElementById(
            "contadorRelatosAluno"
        );


    const listaRelatosAluno =
        document.getElementById(
            "listaRelatosAluno"
        );


    const estadoVazioRelatosAluno =
        document.getElementById(
            "estadoVazioRelatosAluno"
        );


    const contadorApoiosAluno =
        document.getElementById(
            "contadorApoiosAluno"
        );


    const listaApoiosAluno =
        document.getElementById(
            "listaApoiosAluno"
        );


    const estadoVazioApoiosAluno =
        document.getElementById(
            "estadoVazioApoiosAluno"
        );


    const resumoRelatosAluno =
        document.getElementById(
            "resumoRelatosAluno"
        );


    const resumoApoiosAluno =
        document.getElementById(
            "resumoApoiosAluno"
        );


    const resumoJornadaAluno =
        document.getElementById(
            "resumoJornadaAluno"
        );


    /* =========================================
       ESTADO REAL
    ========================================== */

    let supabase = null;

    let usuarioAtual = null;

    let perfilAtual = null;

    let escolaAtual = null;


    /* =========================================
       IDS DAS ATIVIDADES
    ========================================== */

    const idsConteudosAluno = [

        "o-que-e-bullying",
        "bullying-ou-brincadeira",
        "cyberbullying",
        "exclusao-social",
        "quando-acontece-comigo",
        "quando-eu-presencio",
        "respeito-e-empatia",
        "como-pedir-ajuda"

    ];


    const idsDesafiosAluno = [

        "brincadeira-limite",
        "grupo-da-turma",
        "colega-sozinho",
        "presenciei-agressao",
        "pedir-ajuda",
        "nao-incentivar"

    ];


    /* =========================================
       ESTILOS COMPLEMENTARES
    ========================================== */

    function injetarEstilosAluno() {

        if (
            document.getElementById(
                "estilosPainelAluno"
            )
        ) {

            return;

        }


        const estilo =
            document.createElement(
                "style"
            );


        estilo.id =
            "estilosPainelAluno";


        estilo.textContent = `

            #contadorRelatosAluno,
            #contadorApoiosAluno {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                min-height: 34px;
                padding: 7px 12px;
                border: 1px solid #ddd6f0;
                border-radius: 999px;
                background: #f8f6ff;
                color: #5c4a88;
                font-size: 14px;
                font-weight: 600;
                white-space: nowrap;
            }

            .resumo-card-aluno {
                display: inline-flex;
                align-items: center;
                min-height: 30px;
                margin: 4px 0 8px;
                padding: 5px 10px;
                border-radius: 999px;
                background: #f5f1ff;
                color: #5b43a3;
                font-size: 14px;
                font-weight: 700;
                line-height: 1.35;
            }


            /* RELATOS */

            .lista-relatos-aluno {
                display: grid;
                gap: 16px;
                margin-top: 20px;
            }

            .relato-aluno-card {
                padding: 20px;
                border: 1px solid #e2dced;
                border-radius: 16px;
                background: #ffffff;
            }

            .relato-aluno-topo {
                display: flex;
                align-items: flex-start;
                justify-content: space-between;
                gap: 16px;
                margin-bottom: 16px;
            }

            .relato-aluno-protocolo {
                display: block;
                margin-bottom: 6px;
                color: #6b5d86;
                font-size: 13px;
                font-weight: 700;
                letter-spacing: 0.04em;
            }

            .relato-aluno-card h3 {
                margin: 0;
                color: #262238;
                font-size: 18px;
                line-height: 1.4;
            }

            .relato-aluno-status {
                flex-shrink: 0;
                display: inline-flex;
                align-items: center;
                min-height: 34px;
                padding: 7px 11px;
                border-radius: 999px;
                font-size: 13px;
                font-weight: 700;
                line-height: 1.3;
            }

            .relato-aluno-status.novo {
                background: #f5f1ff;
                color: #5b43a3;
            }

            .relato-aluno-status.acompanhamento {
                background: #fff6df;
                color: #7b5b12;
            }

            .relato-aluno-status.concluido {
                background: #eef8f1;
                color: #3f704b;
            }

            .relato-aluno-dados {
                display: flex;
                flex-wrap: wrap;
                gap: 10px 22px;
                margin-bottom: 16px;
                color: #696276;
                font-size: 15px;
                line-height: 1.5;
            }

            .relato-aluno-mensagem-status {
                margin: 0;
                padding: 14px 16px;
                border-radius: 12px;
                background: #f8f7fb;
                color: #5f5969;
                font-size: 15px;
                line-height: 1.6;
            }


            /* APOIO PSICOLÓGICO */

            .lista-apoios-aluno {
                display: grid;
                gap: 16px;
                margin-top: 20px;
            }

            .apoio-aluno-card {
                padding: 20px;
                border: 1px solid #e2dced;
                border-radius: 16px;
                background: #ffffff;
            }

            .apoio-aluno-topo {
                display: flex;
                align-items: flex-start;
                justify-content: space-between;
                gap: 16px;
                margin-bottom: 16px;
            }

            .apoio-aluno-referencia {
                display: block;
                margin-bottom: 6px;
                color: #6b5d86;
                font-size: 13px;
                font-weight: 700;
                letter-spacing: 0.04em;
            }

            .apoio-aluno-card h3 {
                margin: 0;
                color: #262238;
                font-size: 18px;
                line-height: 1.4;
            }

            .apoio-aluno-status {
                flex-shrink: 0;
                display: inline-flex;
                align-items: center;
                min-height: 34px;
                padding: 7px 11px;
                border-radius: 999px;
                font-size: 13px;
                font-weight: 700;
                line-height: 1.3;
            }

            .apoio-aluno-status.pendente {
                background: #f5f1ff;
                color: #5b43a3;
            }

            .apoio-aluno-status.acompanhamento {
                background: #fff6df;
                color: #7b5b12;
            }

            .apoio-aluno-status.concluido {
                background: #eef8f1;
                color: #3f704b;
            }

            .apoio-aluno-dados {
                display: grid;
                gap: 7px;
                margin-bottom: 16px;
                color: #696276;
                font-size: 15px;
                line-height: 1.55;
            }

            .apoio-aluno-dados span {
                display: block;
            }

            .apoio-aluno-mensagem-status {
                margin: 0;
                padding: 14px 16px;
                border-radius: 12px;
                background: #f8f7fb;
                color: #5f5969;
                font-size: 15px;
                line-height: 1.6;
            }


            /* ESTADOS VAZIOS */

            .estado-vazio-relatos-aluno,
            .estado-vazio-apoios-aluno {
                margin-top: 20px;
                padding: 24px;
                border: 1px solid #e2dced;
                border-radius: 16px;
                text-align: center;
                background: #ffffff;
            }

            .estado-vazio-relatos-aluno h3,
            .estado-vazio-apoios-aluno h3 {
                margin: 0 0 8px;
                color: #2e2940;
                font-size: 18px;
            }

            .estado-vazio-relatos-aluno p,
            .estado-vazio-apoios-aluno p {
                margin: 0;
                color: #6e6878;
                font-size: 15px;
                line-height: 1.6;
            }


            /* BOTÃO NOVO PEDIDO */

            .botao-novo-apoio-aluno {
                display: inline-flex !important;
                align-items: center;
                justify-content: center;
                min-height: 46px;
                padding: 12px 20px;
                border-radius: 11px;
                background: #4f35b8;
                color: #ffffff !important;
                font-family: inherit;
                font-size: 15px;
                font-weight: 700;
                line-height: 1.3;
                text-decoration: none !important;
            }

            .botao-novo-apoio-aluno:hover {
                background: #402c98;
            }

            .botao-novo-apoio-aluno:focus-visible {
                outline: 3px solid #cfc5f3;
                outline-offset: 3px;
            }

            .destaque-busca-enter-aluno {
                outline: 3px solid rgba(79, 53, 184, 0.22);
                outline-offset: 4px;
                box-shadow: 0 12px 30px rgba(79, 53, 184, 0.16) !important;
                transition: outline 0.2s ease, box-shadow 0.2s ease;
            }


            @media (max-width: 700px) {

                .relato-aluno-topo,
                .apoio-aluno-topo {
                    flex-direction: column;
                }

                .relato-aluno-status,
                .apoio-aluno-status {
                    align-self: flex-start;
                }

                .botao-novo-apoio-aluno {
                    width: 100%;
                    min-height: 48px;
                    font-size: 16px;
                }

            }

        `;


        document.head.appendChild(
            estilo
        );

    }


    /* =========================================
       PREPARAR BOTÃO
    ========================================== */

    function prepararBotaoNovoApoio() {

        const botao =
            document.querySelector(
                '#meu-apoio a[href^="apoio-psicologico.html"]'
            );


        if (!botao) {

            return;

        }


        botao.classList.remove(
            "card-link"
        );


        botao.classList.add(
            "botao-novo-apoio-aluno"
        );


        botao.textContent =
            "Fazer novo pedido de apoio →";

    }


    /* =========================================
       BUSCA COM ENTER
    ========================================== */

    function normalizarBuscaAluno(
        valor
    ) {

        return String(
            valor || ""
        )
            .normalize("NFD")
            .replace(
                /[\u0300-\u036f]/g,
                ""
            )
            .toLowerCase()
            .trim();

    }


    function rolarParaResultadoAluno(
        elemento
    ) {

        if (!elemento) {

            return;

        }


        const cabecalho =
            document.querySelector(
                ".cabecalho"
            );


        const alturaCabecalho =
            cabecalho
                ? cabecalho.offsetHeight
                : 0;


        const topo =
            elemento
                .getBoundingClientRect()
                .top
            +
            window.scrollY
            -
            alturaCabecalho
            -
            18;


        window.scrollTo({

            top:
                Math.max(
                    0,
                    topo
                ),

            behavior:
                "smooth"

        });

    }


    function prepararBuscaComEnterAluno() {

        const campo =
            document.getElementById(
                "buscaCentralAluno"
            );


        if (!campo) {

            return;

        }


        if (
            campo.dataset.buscaEnterSafeSchool ===
            "true"
        ) {

            return;

        }


        campo.dataset.buscaEnterSafeSchool =
            "true";


        campo.addEventListener(
            "keydown",

            function (
                evento
            ) {

                if (
                    evento.key !==
                    "Enter"
                ) {

                    return;

                }


                evento.preventDefault();


                const termo =
                    normalizarBuscaAluno(
                        campo.value
                    );


                if (!termo) {

                    return;

                }


                const botaoMostrarTodos =
                    document.querySelector(
                        '[data-filtro-central-aluno="todos"]'
                    )
                    ||
                    Array.from(
                        document.querySelectorAll(
                            "button"
                        )
                    )
                        .find(

                            function (
                                botao
                            ) {

                                return (
                                    normalizarBuscaAluno(
                                        botao.textContent
                                    )
                                    ===
                                    "mostrar todos"
                                );

                            }

                        );


                if (botaoMostrarTodos) {

                    botaoMostrarTodos.click();

                }


                campo.dispatchEvent(
                    new Event(
                        "input",
                        {
                            bubbles: true
                        }
                    )
                );


                window.setTimeout(

                    function () {

                        const resultados =
                            Array.from(
                                document.querySelectorAll(
                                    ".relato-aluno-card, .apoio-aluno-card"
                                )
                            )
                                .filter(

                                    function (
                                        card
                                    ) {

                                        return normalizarBuscaAluno(
                                            card.textContent
                                        ).includes(
                                            termo
                                        );

                                    }

                                );


                        if (
                            resultados.length === 0
                        ) {

                            campo.focus();
                            return;

                        }


                        const primeiroVisivel =
                            resultados.find(

                                function (
                                    card
                                ) {

                                    const estilo =
                                        window.getComputedStyle(
                                            card
                                        );

                                    return (
                                        estilo.display !==
                                        "none"
                                        &&
                                        estilo.visibility !==
                                        "hidden"
                                    );

                                }

                            )
                            ||
                            resultados[0];


                        rolarParaResultadoAluno(
                            primeiroVisivel
                        );


                        primeiroVisivel.classList.add(
                            "destaque-busca-enter-aluno"
                        );


                        window.setTimeout(

                            function () {

                                primeiroVisivel.classList.remove(
                                    "destaque-busca-enter-aluno"
                                );

                            },

                            1800

                        );

                    },

                    120

                );

            }

        );

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
       USUÁRIO
    ========================================== */

    async function obterUsuarioAutenticado() {

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
       PERFIL
    ========================================== */

    async function obterPerfilAluno() {

        const {
            data,
            error
        } =
            await supabase
                .from("perfis")
                .select(
                    "id,nome,perfil,escola_id,ativo"
                )
                .eq(
                    "id",
                    usuarioAtual.id
                )
                .single();


        if (
            error ||
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
       ESCOLA
    ========================================== */

    async function obterEscolaAluno() {

        const {
            data,
            error
        } =
            await supabase
                .from("escolas")
                .select(
                    "id,codigo,nome,ativo"
                )
                .eq(
                    "id",
                    perfilAtual.escola_id
                )
                .single();


        if (
            error ||
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
       DADOS DA SESSÃO
    ========================================== */

    function atualizarDadosDaSessao() {

        if (
            usuarioAtual &&
            usuarioAtual.email
        ) {

            sessionStorage.setItem(
                "usuarioEmailSafeSchool",
                usuarioAtual.email
            );

        }


        if (
            perfilAtual &&
            perfilAtual.perfil
        ) {

            sessionStorage.setItem(
                "perfilSafeSchool",
                perfilAtual.perfil
            );

        }


        if (
            escolaAtual &&
            escolaAtual.codigo
        ) {

            sessionStorage.setItem(
                "codigoEscolaSafeSchool",
                escolaAtual.codigo
            );

        }

    }


    /* =========================================
       SAUDAÇÃO
    ========================================== */

    function atualizarSaudacao() {

        if (
            !tituloBoasVindas ||
            !perfilAtual ||
            !perfilAtual.nome
        ) {

            return;

        }


        const nome =
            String(
                perfilAtual.nome
            )
            .trim()
            .split(/\s+/)[0];


        if (
            nome
        ) {

            tituloBoasVindas.textContent =
                "Olá, " +
                nome +
                "! Que bom ter você aqui.";

        }

    }


    /* =========================================
       CHAVE DO PROGRESSO
    ========================================== */

    function obterChaveAluno() {

        const perfil =
            (
                sessionStorage.getItem(
                    "perfilSafeSchool"
                ) || ""
            )
            .trim()
            .toLowerCase();


        const email =
            sessionStorage.getItem(
                "usuarioEmailSafeSchool"
            );


        if (
            perfil !== "aluno" ||
            !email
        ) {

            return null;

        }


        let codigoEscola =
            sessionStorage.getItem(
                "codigoEscolaSafeSchool"
            );


        return (

            (
                codigoEscola ||
                "SEM-ESCOLA"
            )

            +

            "::"

            +

            email
                .trim()
                .toLowerCase()

        );

    }


    /* =========================================
       PROGRESSOS
    ========================================== */

    function obterTodosProgressos() {

        const dados =
            sessionStorage.getItem(
                "progressoAlunoSafeSchool"
            );


        if (!dados) {

            return {};

        }


        try {

            return (
                JSON.parse(
                    dados
                ) || {}
            );

        }

        catch (
            erro
        ) {

            return {};

        }

    }


    function obterProgressoAluno() {

        const chave =
            obterChaveAluno();


        const vazio = {

            conteudosConcluidos:
                [],

            desafiosConcluidos:
                [],

            pontos:
                0,

            selos:
                []

        };


        if (!chave) {

            return vazio;

        }


        const todos =
            obterTodosProgressos();


        const progresso =
            todos[chave];


        if (!progresso) {

            return vazio;

        }


        return {

            conteudosConcluidos:
                Array.isArray(
                    progresso.conteudosConcluidos
                )
                    ? progresso.conteudosConcluidos
                    : [],

            desafiosConcluidos:
                Array.isArray(
                    progresso.desafiosConcluidos
                )
                    ? progresso.desafiosConcluidos
                    : [],

            pontos:
                Number(
                    progresso.pontos || 0
                ),

            selos:
                Array.isArray(
                    progresso.selos
                )
                    ? progresso.selos
                    : []

        };

    }


    function salvarProgressoAluno(
        progresso
    ) {

        const chave =
            obterChaveAluno();


        if (!chave) {

            return false;

        }


        const todos =
            obterTodosProgressos();


        todos[chave] =
            progresso;


        sessionStorage.setItem(
            "progressoAlunoSafeSchool",
            JSON.stringify(
                todos
            )
        );


        return true;

    }


    function contarValidos(
        concluidos,
        validos
    ) {

        const unicos =
            new Set(
                concluidos
            );


        return validos.filter(
            id => unicos.has(id)
        ).length;

    }


    /* =========================================
       SELOS
    ========================================== */

    function atualizarSelosAutomaticos(
        progresso
    ) {

        const conteudos =
            contarValidos(
                progresso.conteudosConcluidos,
                idsConteudosAluno
            );


        const desafios =
            contarValidos(
                progresso.desafiosConcluidos,
                idsDesafiosAluno
            );


        const atividades =
            conteudos +
            desafios;


        const pontos =
            Number(
                progresso.pontos || 0
            );


        const selosAutomaticos =
            [];


        if (atividades >= 1) {

            selosAutomaticos.push(
                "primeiro-passo"
            );

        }


        if (conteudos >= 4) {

            selosAutomaticos.push(
                "aprender-para-proteger"
            );

        }


        if (desafios >= 3) {

            selosAutomaticos.push(
                "parceiro-da-empatia"
            );

        }


        if (pontos >= 100) {

            selosAutomaticos.push(
                "em-movimento"
            );

        }


        if (desafios >= 6) {

            selosAutomaticos.push(
                "guardiao-do-respeito"
            );

        }


        if (
            conteudos >= 8 &&
            desafios >= 6
        ) {

            selosAutomaticos.push(
                "jornada-safeschool"
            );

        }


        const idsConhecidos = [

            "primeiro-passo",
            "aprender-para-proteger",
            "parceiro-da-empatia",
            "em-movimento",
            "guardiao-do-respeito",
            "jornada-safeschool"

        ];


        const outros =
            progresso.selos.filter(
                id =>
                    !idsConhecidos.includes(id)
            );


        progresso.selos =
            Array.from(
                new Set(
                    [
                        ...outros,
                        ...selosAutomaticos
                    ]
                )
            );


        salvarProgressoAluno(
            progresso
        );


        return progresso;

    }


    /* =========================================
       PROGRESSO
    ========================================== */

    function atualizarProgressoPainel() {

        let progresso =
            obterProgressoAluno();


        progresso =
            atualizarSelosAutomaticos(
                progresso
            );


        const desafios =
            contarValidos(
                progresso.desafiosConcluidos,
                idsDesafiosAluno
            );


        const pontos =
            progresso.pontos;


        const selos =
            progresso.selos.length;


        if (numeroDesafiosAluno) {

            numeroDesafiosAluno.textContent =
                desafios;

        }


        if (numeroPontosAluno) {

            numeroPontosAluno.textContent =
                pontos;

        }


        if (numeroSelosAluno) {

            numeroSelosAluno.textContent =
                selos;

        }


        if (resumoJornadaAluno) {

            resumoJornadaAluno.textContent =

                desafios +
                (
                    desafios === 1
                        ? " desafio"
                        : " desafios"
                )

                +

                " • "

                +

                pontos +
                (
                    pontos === 1
                        ? " ponto"
                        : " pontos"
                )

                +

                " • "

                +

                selos +
                (
                    selos === 1
                        ? " selo"
                        : " selos"
                );

        }


        return progresso;

    }


    /* =========================================
       RELATOS
    ========================================== */

    async function buscarRelatosAluno() {

        const {
            data,
            error
        } =
            await supabase
                .from("relatos")
                .select(
                    "id,protocolo,tipo,status,criado_em"
                )
                .eq(
                    "autor_id",
                    usuarioAtual.id
                )
                .eq(
                    "escola_id",
                    escolaAtual.id
                )
                .eq(
                    "anonimo",
                    false
                )
                .order(
                    "criado_em",
                    {
                        ascending: false
                    }
                );


        if (error) {

            throw error;

        }


        return Array.isArray(data)
            ? data
            : [];

    }


    /* =========================================
       APOIOS
    ========================================== */

    async function buscarApoiosAluno() {

        const {
            data,
            error
        } =
            await supabase
                .from(
                    "solicitacoes_psicologia"
                )
                .select(
                    "id,tipo_apoio,periodo_preferido,assunto,status,criado_em"
                )
                .eq(
                    "aluno_id",
                    usuarioAtual.id
                )
                .eq(
                    "escola_id",
                    escolaAtual.id
                )
                .order(
                    "criado_em",
                    {
                        ascending: false
                    }
                );


        if (error) {

            throw error;

        }


        return Array.isArray(data)
            ? data
            : [];

    }


    /* =========================================
       UTILIDADES
    ========================================== */

    function escaparHTML(
        texto
    ) {

        const elemento =
            document.createElement(
                "div"
            );


        elemento.textContent =
            texto || "";


        return elemento.innerHTML;

    }


    function formatarDataHora(
        dataISO
    ) {

        if (!dataISO) {

            return "Data não informada";

        }


        const data =
            new Date(
                dataISO
            );


        if (
            Number.isNaN(
                data.getTime()
            )
        ) {

            return "Data não informada";

        }


        return data.toLocaleString(
            "pt-BR",
            {
                dateStyle:
                    "short",
                timeStyle:
                    "short"
            }
        );

    }


    /* =========================================
       RELATOS - FORMATAÇÃO
    ========================================== */

    function formatarStatusRelato(
        status
    ) {

        const opcoes = {

            novo:
                "Novo",

            acompanhamento:
                "Em acompanhamento",

            em_acompanhamento:
                "Em acompanhamento",

            concluido:
                "Concluído"

        };


        return (
            opcoes[status] ||
            "Em análise"
        );

    }


    function obterClasseStatusRelato(
        status
    ) {

        if (
            status === "acompanhamento" ||
            status === "em_acompanhamento"
        ) {

            return "acompanhamento";

        }


        if (
            status === "concluido"
        ) {

            return "concluido";

        }


        return "novo";

    }


    function formatarTipoRelato(
        tipo
    ) {

        const opcoes = {

            verbal:
                "Bullying verbal",

            fisico:
                "Bullying físico",

            social:
                "Bullying social",

            psicologico:
                "Bullying psicológico",

            virtual:
                "Cyberbullying",

            cyberbullying:
                "Cyberbullying",

            exclusao:
                "Exclusão social",

            discriminacao:
                "Discriminação",

            outro:
                "Outra situação"

        };


        return (
            opcoes[tipo] ||
            "Situação relatada"
        );

    }


    function obterMensagemStatusRelato(
        status
    ) {

        if (status === "novo") {

            return (
                "Seu relato foi recebido e aguarda análise da equipe escolar."
            );

        }


        if (
            status === "acompanhamento" ||
            status === "em_acompanhamento"
        ) {

            return (
                "A equipe escolar está acompanhando este relato."
            );

        }


        if (status === "concluido") {

            return (
                "A equipe encerrou o acompanhamento deste relato no SafeSchool. Isso indica o encerramento do fluxo administrativo no sistema."
            );

        }


        return (
            "Seu relato está registrado no SafeSchool."
        );

    }


    /* =========================================
       APOIO - FORMATAÇÃO
    ========================================== */

    function formatarStatusApoio(
        status
    ) {

        const opcoes = {

            pendente:
                "Pendente",

            acompanhamento:
                "Em acompanhamento",

            em_acompanhamento:
                "Em acompanhamento",

            concluido:
                "Concluído"

        };


        return (
            opcoes[status] ||
            "Em análise"
        );

    }


    function obterClasseStatusApoio(
        status
    ) {

        if (
            status === "acompanhamento" ||
            status === "em_acompanhamento"
        ) {

            return "acompanhamento";

        }


        if (
            status === "concluido"
        ) {

            return "concluido";

        }


        return "pendente";

    }


    function formatarTipoApoio(
        solicitacao
    ) {

        const opcoes = {

            rapido:
                "Conversa assim que possível",

            agendamento:
                "Pedido de agendamento",

            orientacao:
                "Orientação"

        };


        if (
            solicitacao.tipo_apoio &&
            opcoes[
                solicitacao.tipo_apoio
            ]
        ) {

            return opcoes[
                solicitacao.tipo_apoio
            ];

        }


        return (
            solicitacao.assunto ||
            "Pedido de apoio"
        );

    }


    function formatarPeriodoApoio(
        periodo
    ) {

        const opcoes = {

            manha:
                "Manhã",

            tarde:
                "Tarde",

            qualquer:
                "Qualquer horário disponível"

        };


        return (
            opcoes[periodo] ||
            "Não informado"
        );

    }


    function gerarReferenciaApoio(
        id
    ) {

        if (!id) {

            return "APOIO";

        }


        return (

            "APOIO-"

            +

            String(id)
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


    function obterMensagemStatusApoio(
        status
    ) {

        if (status === "pendente") {

            return (
                "Seu pedido foi recebido e aguarda acompanhamento da equipe de Psicologia."
            );

        }


        if (
            status === "acompanhamento" ||
            status === "em_acompanhamento"
        ) {

            return (
                "Seu pedido está em acompanhamento pela equipe de Psicologia."
            );

        }


        if (status === "concluido") {

            return (
                "O fluxo deste pedido foi concluído no SafeSchool. Se você precisar de apoio novamente, pode fazer uma nova solicitação."
            );

        }


        return (
            "Seu pedido de apoio está registrado no SafeSchool."
        );

    }


    /* =========================================
       CARD RELATO
    ========================================== */

    function criarCardRelatoAluno(
        relato
    ) {

        const card =
            document.createElement(
                "article"
            );


        card.className =
            "relato-aluno-card";


        card.innerHTML = `

            <div class="relato-aluno-topo">

                <div>

                    <span class="relato-aluno-protocolo">
                        ${escaparHTML(
                            relato.protocolo ||
                            "Protocolo não informado"
                        )}
                    </span>

                    <h3>
                        ${escaparHTML(
                            formatarTipoRelato(
                                relato.tipo
                            )
                        )}
                    </h3>

                </div>


                <span
                    class="
                        relato-aluno-status
                        ${obterClasseStatusRelato(
                            relato.status
                        )}
                    "
                >
                    ${escaparHTML(
                        formatarStatusRelato(
                            relato.status
                        )
                    )}
                </span>

            </div>


            <div class="relato-aluno-dados">

                <span>
                    📅 Enviado em:
                    ${escaparHTML(
                        formatarDataHora(
                            relato.criado_em
                        )
                    )}
                </span>

            </div>


            <p class="relato-aluno-mensagem-status">
                ${escaparHTML(
                    obterMensagemStatusRelato(
                        relato.status
                    )
                )}
            </p>

        `;


        return card;

    }


    /* =========================================
       CARD APOIO
    ========================================== */

    function criarCardApoioAluno(
        solicitacao
    ) {

        const card =
            document.createElement(
                "article"
            );


        card.className =
            "apoio-aluno-card";


        card.innerHTML = `

            <div class="apoio-aluno-topo">

                <div>

                    <span class="apoio-aluno-referencia">
                        ${escaparHTML(
                            gerarReferenciaApoio(
                                solicitacao.id
                            )
                        )}
                    </span>

                    <h3>
                        ${escaparHTML(
                            formatarTipoApoio(
                                solicitacao
                            )
                        )}
                    </h3>

                </div>


                <span
                    class="
                        apoio-aluno-status
                        ${obterClasseStatusApoio(
                            solicitacao.status
                        )}
                    "
                >
                    ${escaparHTML(
                        formatarStatusApoio(
                            solicitacao.status
                        )
                    )}
                </span>

            </div>


            <div class="apoio-aluno-dados">

                <span>
                    🕒 Período preferido:
                    ${escaparHTML(
                        formatarPeriodoApoio(
                            solicitacao.periodo_preferido
                        )
                    )}
                </span>

                <span>
                    📅 Enviado em:
                    ${escaparHTML(
                        formatarDataHora(
                            solicitacao.criado_em
                        )
                    )}
                </span>

            </div>


            <p class="apoio-aluno-mensagem-status">
                ${escaparHTML(
                    obterMensagemStatusApoio(
                        solicitacao.status
                    )
                )}
            </p>

        `;


        return card;

    }


    /* =========================================
       EXIBIR RELATOS
    ========================================== */

    function mostrarRelatosAluno(
        relatos
    ) {

        const quantidade =
            relatos.length;


        if (
            contadorRelatosAluno
        ) {

            contadorRelatosAluno.textContent =

                quantidade === 1
                    ? "1 relato"
                    : quantidade +
                      " relatos";

        }


        if (
            resumoRelatosAluno
        ) {

            resumoRelatosAluno.textContent =

                quantidade === 1
                    ? "1 relato"
                    : quantidade +
                      " relatos";

        }


        if (
            !listaRelatosAluno ||
            !estadoVazioRelatosAluno
        ) {

            return;

        }


        listaRelatosAluno.innerHTML =
            "";


        if (
            quantidade === 0
        ) {

            listaRelatosAluno.hidden =
                true;


            estadoVazioRelatosAluno.hidden =
                false;


            return;

        }


        estadoVazioRelatosAluno.hidden =
            true;


        relatos.forEach(
            relato =>
                listaRelatosAluno
                    .appendChild(
                        criarCardRelatoAluno(
                            relato
                        )
                    )
        );


        listaRelatosAluno.hidden =
            false;

    }


    /* =========================================
       EXIBIR APOIOS
    ========================================== */

    function mostrarApoiosAluno(
        solicitacoes
    ) {

        const quantidade =
            solicitacoes.length;


        if (
            contadorApoiosAluno
        ) {

            contadorApoiosAluno.textContent =

                quantidade === 1
                    ? "1 pedido"
                    : quantidade +
                      " pedidos";

        }


        if (
            resumoApoiosAluno
        ) {

            resumoApoiosAluno.textContent =

                quantidade === 1
                    ? "1 pedido"
                    : quantidade +
                      " pedidos";

        }


        if (
            !listaApoiosAluno ||
            !estadoVazioApoiosAluno
        ) {

            return;

        }


        listaApoiosAluno.innerHTML =
            "";


        if (
            quantidade === 0
        ) {

            listaApoiosAluno.hidden =
                true;


            estadoVazioApoiosAluno.hidden =
                false;


            return;

        }


        estadoVazioApoiosAluno.hidden =
            true;


        solicitacoes.forEach(
            solicitacao =>
                listaApoiosAluno
                    .appendChild(
                        criarCardApoioAluno(
                            solicitacao
                        )
                    )
        );


        listaApoiosAluno.hidden =
            false;

    }


    /* =========================================
       CARREGAR DADOS
    ========================================== */

    async function carregarRelatosAluno() {

        try {

            const relatos =
                await buscarRelatosAluno();


            mostrarRelatosAluno(
                relatos
            );

        }

        catch (
            erro
        ) {

            console.error(
                "SafeSchool: erro ao carregar relatos.",
                erro
            );


            if (
                contadorRelatosAluno
            ) {

                contadorRelatosAluno.textContent =
                    "Indisponível";

            }


            if (
                resumoRelatosAluno
            ) {

                resumoRelatosAluno.textContent =
                    "Indisponível";

            }

        }

    }


    async function carregarApoiosAluno() {

        try {

            const solicitacoes =
                await buscarApoiosAluno();


            mostrarApoiosAluno(
                solicitacoes
            );

        }

        catch (
            erro
        ) {

            console.error(
                "SafeSchool: erro ao carregar apoios.",
                erro
            );


            if (
                contadorApoiosAluno
            ) {

                contadorApoiosAluno.textContent =
                    "Indisponível";

            }


            if (
                resumoApoiosAluno
            ) {

                resumoApoiosAluno.textContent =
                    "Indisponível";

            }

        }

    }


    /* =========================================
       INICIAR
    ========================================== */

    async function iniciar() {

        injetarEstilosAluno();


        prepararBotaoNovoApoio();


        if (
            resumoRelatosAluno
        ) {

            resumoRelatosAluno.textContent =
                "Carregando...";

        }


        if (
            resumoApoiosAluno
        ) {

            resumoApoiosAluno.textContent =
                "Carregando...";

        }


        if (
            resumoJornadaAluno
        ) {

            resumoJornadaAluno.textContent =
                "Carregando...";

        }


        try {

            supabase =
                await obterSupabase();


            usuarioAtual =
                await obterUsuarioAutenticado();


            perfilAtual =
                await obterPerfilAluno();


            escolaAtual =
                await obterEscolaAluno();


            atualizarDadosDaSessao();


            atualizarSaudacao();


            atualizarProgressoPainel();


            await Promise.all([

                carregarRelatosAluno(),

                carregarApoiosAluno()

            ]);


            prepararBuscaComEnterAluno();


            window.setTimeout(
                prepararBuscaComEnterAluno,
                300
            );


            console.log(
                "SafeSchool: área do Aluno carregada."
            );

        }

        catch (
            erro
        ) {

            console.error(
                "SafeSchool: falha ao iniciar.",
                erro
            );


            window.location.href =
                "login.html?acesso=restrito";

        }

    }


    /* =========================================
       EXECUTAR
    ========================================== */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            iniciar
        );

    }

    else {

        iniciar();

    }

})();