/* =========================================
   SAFESCHOOL
   PAINEL DA PSICOLOGIA
========================================= */

(function () {

    "use strict";


    /* =========================================
       ELEMENTOS
    ========================================== */

    const numeroNovas =
        document.getElementById("numeroNovas");

    const numeroRapidos =
        document.getElementById("numeroRapidos");

    const numeroAgendados =
        document.getElementById("numeroAgendados");

    const numeroAcolhimentos =
        document.getElementById("numeroAcolhimentos");

    const numeroConcluidos =
        document.getElementById("numeroConcluidos");

    const contadorSolicitacoes =
        document.getElementById("contadorSolicitacoes");

    const listaSolicitacoes =
        document.getElementById("listaSolicitacoes");

    const estadoVazio =
        document.getElementById("estadoVazio");

    const contadorEncaminhamentos =
        document.getElementById("contadorEncaminhamentos");

    const listaEncaminhamentos =
        document.getElementById("listaEncaminhamentos");

    const estadoEncaminhamentos =
        document.getElementById("estadoEncaminhamentos");


    /* =========================================
       ESTADO REAL
    ========================================== */

    let supabase = null;
    let usuarioAtual = null;
    let perfilAtual = null;
    let escolaAtual = null;

    let solicitacoesReais = [];
    let encaminhamentosReais = [];


    /* =========================================
       INTERFACE GLOBAL
    ========================================== */

    async function prepararInterface() {

        if (window.SafeSchoolInterfaceReady) {

            try {

                await window.SafeSchoolInterfaceReady;

            } catch (erro) {

                console.warn(
                    "SafeSchool: interface global indisponível.",
                    erro
                );

            }

        }

    }


    function mostrarErro(
        mensagem,
        titulo = "Não foi possível concluir"
    ) {

        if (
            window.SafeSchoolUI &&
            typeof window.SafeSchoolUI.erro === "function"
        ) {

            window.SafeSchoolUI.erro(
                mensagem,
                titulo
            );

            return;

        }

        alert(
            titulo +
            "\n\n" +
            mensagem
        );

    }


    function mostrarSucesso(
        mensagem,
        titulo = "Tudo certo"
    ) {

        if (
            window.SafeSchoolUI &&
            typeof window.SafeSchoolUI.sucesso === "function"
        ) {

            window.SafeSchoolUI.sucesso(
                mensagem,
                titulo
            );

            return;

        }

        alert(
            titulo +
            "\n\n" +
            mensagem
        );

    }


    async function solicitarConfirmacao(
        opcoes
    ) {

        if (
            window.SafeSchoolUI &&
            typeof window.SafeSchoolUI.confirmar === "function"
        ) {

            return await window.SafeSchoolUI.confirmar(
                opcoes
            );

        }

        return confirm(
            opcoes.mensagem ||
            "Deseja continuar?"
        );

    }


    /* =========================================
       ESTILOS COMPLEMENTARES
    ========================================== */

    function injetarEstilosPsicologia() {

        if (
            document.getElementById(
                "estilosEncaminhamentoPsicologia"
            )
        ) {

            return;

        }


        const estilo =
            document.createElement("style");


        estilo.id =
            "estilosEncaminhamentoPsicologia";


        estilo.textContent = `

            #estadoVazio,
            #estadoEncaminhamentos {
                border: 1px solid #e1dbea !important;
                border-style: solid !important;
            }

            .protocolo-solicitacao {
                font-size: 14px !important;
                line-height: 1.45 !important;
                letter-spacing: 0.02em;
            }

            .solicitacao-topo h3 {
                font-size: 19px !important;
                line-height: 1.4 !important;
            }

            .status-solicitacao {
                font-size: 14px !important;
                line-height: 1.35 !important;
            }

            .solicitacao-info,
            .solicitacao-info span {
                font-size: 15px !important;
                line-height: 1.55 !important;
            }

            .mensagem-aluno strong {
                font-size: 16px !important;
                line-height: 1.45 !important;
            }

            .mensagem-aluno p {
                font-size: 16px !important;
                line-height: 1.65 !important;
            }

            .solicitacao-aviso {
                font-size: 15px !important;
                line-height: 1.6 !important;
            }

            .acolhimento-finalizado {
                font-size: 15px !important;
                line-height: 1.45 !important;
            }

            .identidade-encaminhamento {
                margin: 14px 0 18px;
                padding: 15px 17px;
                border-radius: 12px;
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                gap: 10px 18px;
            }

            .identidade-encaminhamento.identificado {
                background: #f0f6ff;
                border: 1px solid #d6e5f8;
            }

            .identidade-encaminhamento.anonimo {
                background: #f7f7fb;
                border: 1px solid #e5e5ee;
            }

            .identidade-encaminhamento strong {
                color: #20205f;
                font-size: 16px;
                line-height: 1.45;
            }

            .identidade-encaminhamento span {
                color: #6f6f8d;
                font-size: 15px;
                line-height: 1.55;
            }

            .aviso-anonimato-psicologia,
            .aviso-identificado-psicologia {
                margin-bottom: 16px;
                padding: 13px;
                border-radius: 10px;
                font-size: 15px;
                line-height: 1.6;
            }

            .aviso-anonimato-psicologia {
                background: #f8f8fb;
                color: #77738e;
            }

            .aviso-identificado-psicologia {
                background: #f2efff;
                color: #655d82;
            }

            .motivo-encaminhamento-real {
                margin: 16px 0;
                padding: 15px;
                border: 1px solid #e4ddf3;
                border-radius: 12px;
                background: #faf8ff;
            }

            .motivo-encaminhamento-real strong {
                display: block;
                margin-bottom: 7px;
                color: #4f35b8;
                font-size: 16px;
                line-height: 1.45;
            }

            .motivo-encaminhamento-real p {
                margin: 0;
                color: #625d72;
                font-size: 16px;
                line-height: 1.65;
            }

            .aluno-solicitacao-real {
                margin: 14px 0 18px;
                padding: 15px 17px;
                border: 1px solid #e2dcf3;
                border-radius: 12px;
                background: #f8f6ff;
            }

            .aluno-solicitacao-real strong {
                display: block;
                margin-bottom: 6px;
                color: #3e2d85;
                font-size: 16px;
                line-height: 1.45;
            }

            .aluno-solicitacao-real span {
                color: #706986;
                font-size: 15px;
                line-height: 1.55;
            }

            .botao-assumir-psicologia-real,
            .botao-concluir-psicologia-real {
                min-height: 46px;
                padding: 12px 20px;
                border: 0;
                border-radius: 10px;
                font-family: inherit;
                font-size: 15px;
                font-weight: 600;
                line-height: 1.3;
                cursor: pointer;
            }

            .botao-assumir-psicologia-real {
                background: #4f35b8;
                color: #ffffff;
            }

            .botao-assumir-psicologia-real:hover:not(:disabled) {
                background: #402c98;
            }

            .botao-concluir-psicologia-real {
                background: #f0ecfb;
                color: #4f35b8;
                border: 1px solid #d7cff0;
            }

            .botao-concluir-psicologia-real:hover:not(:disabled) {
                background: #e6e0f8;
            }

            .botao-assumir-psicologia-real:disabled,
            .botao-concluir-psicologia-real:disabled {
                opacity: 0.55;
                cursor: not-allowed;
            }

            .situacao-psicologia-real {
                display: inline-flex;
                align-items: center;
                min-height: 40px;
                padding: 9px 13px;
                border-radius: 10px;
                background: #f2efff;
                color: #5e4994;
                font-size: 15px;
                font-weight: 600;
                line-height: 1.45;
            }

            .destaque-busca-enter {
                outline: 3px solid rgba(79, 53, 184, 0.22);
                outline-offset: 4px;
                box-shadow: 0 12px 30px rgba(79, 53, 184, 0.16) !important;
                transition: outline 0.2s ease, box-shadow 0.2s ease;
            }

            @media (max-width: 600px) {

                .solicitacao-topo h3 {
                    font-size: 18px !important;
                }

                .mensagem-aluno p {
                    font-size: 16px !important;
                }

                .botao-assumir-psicologia-real,
                .botao-concluir-psicologia-real {
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
       UTILIDADES
    ========================================== */

    function escaparHTML(
        texto
    ) {

        const elemento =
            document.createElement("div");

        elemento.textContent =
            texto || "";

        return elemento.innerHTML;

    }


    function normalizar(
        valor
    ) {

        return String(
            valor || ""
        )
            .trim()
            .toLowerCase();

    }


    function formatarTextoGenerico(
        texto
    ) {

        if (!texto) {

            return "Não informado";

        }


        const textoLimpo =
            String(texto)
                .replace(
                    /[-_]/g,
                    " "
                );


        return (
            textoLimpo.charAt(0).toUpperCase()
            +
            textoLimpo.slice(1)
        );

    }


    function normalizarBusca(
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


    function prepararBuscaComEnterPsicologia() {

        const camposBusca =
            Array.from(
                document.querySelectorAll(
                    'input[type="search"]'
                )
            );


        camposBusca.forEach(

            function (
                campo
            ) {

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
                            normalizarBusca(
                                campo.value
                            );


                        if (!termo) {

                            return;

                        }


                        const botaoMostrarTodos =
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
                                            normalizarBusca(
                                                botao.textContent
                                            )
                                            ===
                                            "mostrar todos"
                                        );

                                    }

                                );


                        if (
                            botaoMostrarTodos
                        ) {

                            botaoMostrarTodos.click();

                        }


                        window.setTimeout(

                            function () {

                                const cards =
                                    Array.from(
                                        document.querySelectorAll(
                                            "#listaSolicitacoes .card-solicitacao, #listaEncaminhamentos .card-solicitacao"
                                        )
                                    );


                                const encontrados =
                                    cards.filter(

                                        function (
                                            card
                                        ) {

                                            return normalizarBusca(
                                                card.textContent
                                            ).includes(
                                                termo
                                            );

                                        }

                                    );


                                if (
                                    encontrados.length === 0
                                ) {

                                    campo.focus();
                                    return;

                                }


                                const primeiroVisivel =
                                    encontrados.find(

                                        function (
                                            card
                                        ) {

                                            return (
                                                window.getComputedStyle(
                                                    card
                                                ).display !==
                                                "none"
                                            );

                                        }

                                    )
                                    ||
                                    encontrados[0];


                                rolarParaCard(
                                    primeiroVisivel
                                );


                                primeiroVisivel.classList.add(
                                    "destaque-busca-enter"
                                );


                                window.setTimeout(

                                    function () {

                                        primeiroVisivel.classList.remove(
                                            "destaque-busca-enter"
                                        );

                                    },

                                    1800

                                );

                            },

                            100

                        );

                    }

                );

            }

        );

    }


    /* =========================================
       ESTADO VISUAL DE CARREGAMENTO
    ========================================== */

    function mostrarEstadoCarregando() {

        const indicadores = [

            numeroNovas,
            numeroRapidos,
            numeroAgendados,
            numeroAcolhimentos,
            numeroConcluidos

        ];


        indicadores.forEach(

            function (
                indicador
            ) {

                if (indicador) {

                    indicador.textContent =
                        "—";

                }

            }

        );


        if (contadorSolicitacoes) {

            contadorSolicitacoes.textContent =
                "Carregando...";

        }


        if (contadorEncaminhamentos) {

            contadorEncaminhamentos.textContent =
                "Carregando...";

        }


        if (listaSolicitacoes) {

            listaSolicitacoes.innerHTML =
                "";

            listaSolicitacoes.style.display =
                "none";

        }


        if (listaEncaminhamentos) {

            listaEncaminhamentos.innerHTML =
                "";

            listaEncaminhamentos.style.display =
                "none";

        }


        if (estadoVazio) {

            estadoVazio.style.display =
                "none";

        }


        if (estadoEncaminhamentos) {

            estadoEncaminhamentos.style.display =
                "none";

        }

    }


    /* =========================================
       SESSÃO REAL
    ========================================== */

    async function carregarSessaoPsicologia() {

        if (!window.SafeSchoolSupabaseReady) {

            console.error(
                "SafeSchool: Supabase não foi carregado."
            );

            return false;

        }


        try {

            supabase =
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

                return false;

            }


            usuarioAtual =
                dadosUsuario.user;


            const {
                data: perfil,
                error: erroPerfil
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
                erroPerfil ||
                !perfil ||
                !perfil.ativo ||
                perfil.perfil !== "psicologia"
            ) {

                console.error(
                    "SafeSchool: perfil de Psicologia inválido.",
                    erroPerfil
                );

                return false;

            }


            perfilAtual =
                perfil;


            const {
                data: escola,
                error: erroEscola
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
                erroEscola ||
                !escola ||
                !escola.ativo
            ) {

                console.error(
                    "SafeSchool: escola da Psicologia não encontrada.",
                    erroEscola
                );

                return false;

            }


            escolaAtual =
                escola;


            return true;


        } catch (erro) {

            console.error(
                "SafeSchool: erro ao validar sessão da Psicologia.",
                erro
            );

            return false;

        }

    }


    /* =========================================
       SOLICITAÇÕES REAIS DOS ALUNOS
    ========================================== */

    async function buscarSolicitacoesReais() {

        const {
            data,
            error
        } =
            await supabase
                .from("solicitacoes_psicologia")
                .select(
                    "id,escola_id,aluno_id,tipo_apoio,periodo_preferido,assunto,mensagem,psicologo_id,status,atualizado_em,criado_em"
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

            console.error(
                "SafeSchool: erro ao carregar solicitações de Psicologia.",
                error
            );

            throw new Error(
                "Não foi possível carregar os pedidos de apoio."
            );

        }


        const solicitacoes =
            Array.isArray(data)
                ? data
                : [];


        if (solicitacoes.length === 0) {

            return [];

        }


        const idsAlunos =
            [
                ...new Set(
                    solicitacoes
                        .map(
                            item => item.aluno_id
                        )
                        .filter(Boolean)
                )
            ];


        const nomesAlunos =
            new Map();


        if (idsAlunos.length > 0) {

            const {
                data: alunos,
                error: erroAlunos
            } =
                await supabase
                    .from("perfis")
                    .select(
                        "id,nome"
                    )
                    .in(
                        "id",
                        idsAlunos
                    );


            if (erroAlunos) {

                console.warn(
                    "SafeSchool: nomes dos alunos não puderam ser carregados.",
                    erroAlunos
                );

            } else {

                (
                    Array.isArray(alunos)
                        ? alunos
                        : []
                )
                    .forEach(

                        function (
                            aluno
                        ) {

                            nomesAlunos.set(
                                aluno.id,
                                aluno.nome
                            );

                        }

                    );

            }

        }


        return solicitacoes.map(

            function (
                solicitacao
            ) {

                return {

                    ...solicitacao,

                    tipo_apoio:
                        normalizar(
                            solicitacao.tipo_apoio
                        ),

                    periodo_preferido:
                        normalizar(
                            solicitacao.periodo_preferido
                        ),

                    status:
                        normalizar(
                            solicitacao.status
                        ),

                    aluno_nome:
                        nomesAlunos.get(
                            solicitacao.aluno_id
                        )
                        ||
                        "Aluno identificado"

                };

            }

        );

    }


    /* =========================================
       ENCAMINHAMENTOS REAIS
    ========================================== */

    async function buscarEncaminhamentosReais() {

        const {
            data,
            error
        } =
            await supabase
                .from("encaminhamentos_psicologia")
                .select(
                    "id,relato_id,encaminhado_por_id,psicologo_id,motivo,status,criado_em,atualizado_em"
                )
                .order(
                    "criado_em",
                    {
                        ascending: false
                    }
                );


        if (error) {

            console.error(
                "SafeSchool: não foi possível carregar os encaminhamentos reais.",
                error
            );

            throw new Error(
                "Não foi possível carregar os encaminhamentos."
            );

        }


        const encaminhamentos =
            Array.isArray(data)
                ? data
                : [];


        if (encaminhamentos.length === 0) {

            return [];

        }


        const idsRelatos =
            [
                ...new Set(
                    encaminhamentos
                        .map(
                            item => item.relato_id
                        )
                        .filter(Boolean)
                )
            ];


        const {
            data: relatos,
            error: erroRelatos
        } =
            await supabase
                .from("relatos")
                .select(
                    "id,protocolo,anonimo,autor_id,envolvimento,tipo,descricao,local,quando_ocorreu,frequencia,status,urgencia,criado_em"
                )
                .in(
                    "id",
                    idsRelatos
                );


        if (erroRelatos) {

            console.error(
                "SafeSchool: não foi possível carregar os relatos encaminhados.",
                erroRelatos
            );

            throw new Error(
                "Não foi possível carregar os casos encaminhados."
            );

        }


        const mapaRelatos =
            new Map();


        (
            Array.isArray(relatos)
                ? relatos
                : []
        )
            .forEach(

                function (
                    relato
                ) {

                    mapaRelatos.set(
                        relato.id,
                        relato
                    );

                }

            );


        return encaminhamentos
            .map(

                function (
                    encaminhamento
                ) {

                    const relato =
                        mapaRelatos.get(
                            encaminhamento.relato_id
                        );


                    if (!relato) {

                        return null;

                    }


                    return {

                        ...encaminhamento,

                        status:
                            normalizar(
                                encaminhamento.status
                            ),

                        relato:
                            relato

                    };

                }

            )
            .filter(Boolean);

    }


    /* =========================================
       CLASSIFICAÇÃO REAL DO PEDIDO
    ========================================== */

    function solicitacaoEhRapida(
        solicitacao
    ) {

        return (
            solicitacao.tipo_apoio ===
            "rapido"
        );

    }


    function solicitacaoEhAgendamento(
        solicitacao
    ) {

        return (
            solicitacao.tipo_apoio ===
            "agendamento"
        );

    }


    /* =========================================
       RESUMO
    ========================================== */

    function atualizarResumo(
        solicitacoes,
        encaminhamentos
    ) {

        const novasSolicitacoes =
            solicitacoes.filter(
                item =>
                    item.status === "pendente"
            ).length;


        const novosEncaminhamentos =
            encaminhamentos.filter(
                item =>
                    item.status === "pendente"
            ).length;


        const rapidos =
            solicitacoes.filter(
                item =>
                    solicitacaoEhRapida(item)
                    &&
                    item.status !== "concluido"
            ).length;


        const agendados =
            solicitacoes.filter(
                item =>
                    solicitacaoEhAgendamento(item)
                    &&
                    item.status !== "concluido"
            ).length;


        const acolhimentosSolicitacoes =
            solicitacoes.filter(
                item =>
                    item.status === "em_acompanhamento"
            ).length;


        const acolhimentosEncaminhados =
            encaminhamentos.filter(
                item =>
                    item.status === "em_acompanhamento"
            ).length;


        const concluidosSolicitacoes =
            solicitacoes.filter(
                item =>
                    item.status === "concluido"
            ).length;


        const concluidosEncaminhados =
            encaminhamentos.filter(
                item =>
                    item.status === "concluido"
            ).length;


        if (numeroNovas) {

            numeroNovas.textContent =
                novasSolicitacoes +
                novosEncaminhamentos;

        }


        if (numeroRapidos) {

            numeroRapidos.textContent =
                rapidos;

        }


        if (numeroAgendados) {

            numeroAgendados.textContent =
                agendados;

        }


        if (numeroAcolhimentos) {

            numeroAcolhimentos.textContent =
                acolhimentosSolicitacoes +
                acolhimentosEncaminhados;

        }


        if (numeroConcluidos) {

            numeroConcluidos.textContent =
                concluidosSolicitacoes +
                concluidosEncaminhados;

        }

    }


    /* =========================================
       MOSTRAR SOLICITAÇÕES
    ========================================== */

    function mostrarSolicitacoes(
        solicitacoes
    ) {

        if (
            !listaSolicitacoes ||
            !contadorSolicitacoes ||
            !estadoVazio
        ) {

            return;

        }


        listaSolicitacoes.innerHTML =
            "";


        contadorSolicitacoes.textContent =

            solicitacoes.length === 1
                ? "1 solicitação"
                : solicitacoes.length +
                  " solicitações";


        if (solicitacoes.length === 0) {

            listaSolicitacoes.style.display =
                "none";

            estadoVazio.style.display =
                "block";

            return;

        }


        estadoVazio.style.display =
            "none";

        listaSolicitacoes.style.display =
            "grid";


        solicitacoes.forEach(

            function (
                solicitacao
            ) {

                listaSolicitacoes.appendChild(

                    criarCardSolicitacaoReal(
                        solicitacao
                    )

                );

            }

        );

    }


    /* =========================================
       CARD SOLICITAÇÃO REAL
    ========================================== */

    function criarCardSolicitacaoReal(
        solicitacao
    ) {

        const card =
            document.createElement("article");


        card.className =
            "card-solicitacao";


        card.dataset.solicitacaoReal =
            solicitacao.id;


        const assunto =
            escaparHTML(
                solicitacao.assunto ||
                "Solicitação de acompanhamento"
            );


        const aluno =
            escaparHTML(
                solicitacao.aluno_nome ||
                "Aluno identificado"
            );


        const mensagem =
            escaparHTML(
                solicitacao.mensagem ||
                "Nenhuma mensagem adicional."
            );


        const status =
            escaparHTML(
                formatarStatusPsicologia(
                    solicitacao.status
                )
            );


        const data =
            escaparHTML(
                formatarDataHora(
                    solicitacao.criado_em
                )
            );


        const referencia =
            "APOIO-"
            +
            String(
                solicitacao.id || ""
            )
                .replaceAll(
                    "-",
                    ""
                )
                .substring(
                    0,
                    8
                )
                .toUpperCase();


        card.innerHTML = `

            <div class="solicitacao-topo">

                <div>

                    <span class="protocolo-solicitacao">
                        ${referencia}
                    </span>

                    <h3>
                        ${assunto}
                    </h3>

                </div>


                <span
                    class="
                        status-solicitacao
                        ${obterClasseStatus(
                            solicitacao.status
                        )}
                    "
                >
                    ${status}
                </span>

            </div>


            <div class="aluno-solicitacao-real">

                <strong>
                    👤 ${aluno}
                </strong>

                <span>
                    Solicitação realizada pela conta do aluno.
                </span>

            </div>


            <div class="solicitacao-info">

                <span>
                    📅 Enviado em: ${data}
                </span>

            </div>


            <div class="mensagem-aluno">

                <strong>
                    Mensagem do aluno
                </strong>

                <p>
                    ${mensagem}
                </p>

            </div>


            <div class="solicitacao-aviso">

                🔐 Este pedido pertence ao fluxo reservado
                de acompanhamento da equipe de Psicologia.

            </div>


            <div class="acoes-solicitacao">

                ${criarAcaoSolicitacaoReal(
                    solicitacao
                )}

            </div>

        `;


        const botaoAssumir =
            card.querySelector(
                "[data-assumir-solicitacao-real]"
            );


        if (botaoAssumir) {

            botaoAssumir.addEventListener(

                "click",

                async function () {

                    await assumirSolicitacao(
                        solicitacao,
                        botaoAssumir
                    );

                }

            );

        }


        const botaoConcluir =
            card.querySelector(
                "[data-concluir-solicitacao-real]"
            );


        if (botaoConcluir) {

            botaoConcluir.addEventListener(

                "click",

                async function () {

                    await concluirSolicitacao(
                        solicitacao,
                        botaoConcluir
                    );

                }

            );

        }


        return card;

    }


    /* =========================================
       AÇÕES DA SOLICITAÇÃO
    ========================================== */

    function criarAcaoSolicitacaoReal(
        solicitacao
    ) {

        if (solicitacao.status === "pendente") {

            return `

                <button
                    type="button"
                    class="botao-assumir-psicologia-real"
                    data-assumir-solicitacao-real
                >
                    Assumir acompanhamento
                </button>

            `;

        }


        if (
            solicitacao.status ===
            "em_acompanhamento"
        ) {

            if (
                solicitacao.psicologo_id ===
                usuarioAtual.id
            ) {

                return `

                    <span class="situacao-psicologia-real">
                        ✓ Em acompanhamento com você
                    </span>

                    <button
                        type="button"
                        class="botao-concluir-psicologia-real"
                        data-concluir-solicitacao-real
                    >
                        Concluir acompanhamento
                    </button>

                `;

            }


            return `

                <span class="situacao-psicologia-real">
                    Em acompanhamento pela equipe de Psicologia
                </span>

            `;

        }


        if (
            solicitacao.status ===
            "concluido"
        ) {

            return `

                <span class="acolhimento-finalizado">
                    ✓ Acompanhamento concluído
                </span>

            `;

        }


        return "";

    }


    /* =========================================
       ASSUMIR SOLICITAÇÃO
       RPC + HISTÓRICO
    ========================================== */

    async function assumirSolicitacao(
        solicitacao,
        botao
    ) {

        if (
            !solicitacao ||
            !solicitacao.id
        ) {

            return;

        }


        if (
            solicitacao.status !==
            "pendente"
        ) {

            mostrarErro(
                "Este pedido de apoio não está mais pendente.",
                "Status atualizado"
            );

            await carregarPainelPsicologia();

            return;

        }


        const confirmou =
            await solicitarConfirmacao({

                titulo:
                    "Assumir acompanhamento",

                mensagem:
                    "Deseja assumir este pedido de apoio?\n\nO pedido passará para Em acompanhamento, ficará atribuído à sua conta da Psicologia e a ação será registrada no histórico administrativo.",

                textoConfirmar:
                    "Assumir acompanhamento",

                textoCancelar:
                    "Cancelar"

            });


        if (!confirmou) {

            return;

        }


        const textoOriginal =
            botao
                ? botao.textContent
                : "";


        if (botao) {

            botao.disabled =
                true;

            botao.textContent =
                "Assumindo...";

        }


        try {

            const {
                data,
                error
            } =
                await supabase.rpc(

                    "assumir_solicitacao_psicologia",

                    {

                        p_solicitacao_id:
                            solicitacao.id

                    }

                );


            if (error) {

                console.error(
                    "SafeSchool: erro ao assumir solicitação.",
                    error
                );

                throw error;

            }


            const resultado =
                Array.isArray(data)
                    ? data[0]
                    : data;


            if (
                !resultado ||
                resultado.status !==
                "em_acompanhamento" ||
                resultado.psicologo_id !==
                usuarioAtual.id
            ) {

                throw new Error(
                    "O Supabase não confirmou o início do acompanhamento."
                );

            }


            await carregarPainelPsicologia();


            reposicionarSolicitacao(
                solicitacao.id
            );


            mostrarSucesso(
                "O pedido agora está em acompanhamento pela equipe de Psicologia e a ação foi registrada no histórico administrativo.",
                "Acompanhamento iniciado"
            );


        } catch (erro) {

            console.error(
                "SafeSchool: falha ao assumir solicitação.",
                erro
            );


            mostrarErro(
                "Não foi possível assumir este pedido de apoio. Nenhuma alteração parcial foi registrada.",
                "Acompanhamento não iniciado"
            );


            if (
                botao &&
                document.body.contains(
                    botao
                )
            ) {

                botao.disabled =
                    false;

                botao.textContent =
                    textoOriginal;

            }

        }

    }


    /* =========================================
       CONCLUIR SOLICITAÇÃO
       RPC + HISTÓRICO
    ========================================== */

    async function concluirSolicitacao(
        solicitacao,
        botao
    ) {

        if (
            !solicitacao ||
            !solicitacao.id
        ) {

            return;

        }


        if (
            solicitacao.status !==
            "em_acompanhamento"
        ) {

            mostrarErro(
                "Este acompanhamento não está mais ativo.",
                "Status atualizado"
            );

            await carregarPainelPsicologia();

            return;

        }


        if (
            solicitacao.psicologo_id !==
            usuarioAtual.id
        ) {

            mostrarErro(
                "Somente o profissional responsável por este acompanhamento pode concluir o fluxo.",
                "Ação não permitida"
            );

            return;

        }


        const confirmou =
            await solicitarConfirmacao({

                titulo:
                    "Concluir acompanhamento",

                mensagem:
                    "Deseja concluir o fluxo administrativo deste acompanhamento?\n\nEssa ação indica que o acompanhamento foi encerrado no SafeSchool. Ela não representa diagnóstico, alta clínica ou avaliação sobre o estado emocional do aluno. A conclusão será registrada no histórico administrativo.",

                textoConfirmar:
                    "Concluir acompanhamento",

                textoCancelar:
                    "Cancelar"

            });


        if (!confirmou) {

            return;

        }


        const textoOriginal =
            botao
                ? botao.textContent
                : "";


        if (botao) {

            botao.disabled =
                true;

            botao.textContent =
                "Concluindo...";

        }


        try {

            const {
                data,
                error
            } =
                await supabase.rpc(

                    "concluir_solicitacao_psicologia",

                    {

                        p_solicitacao_id:
                            solicitacao.id

                    }

                );


            if (error) {

                console.error(
                    "SafeSchool: erro ao concluir solicitação.",
                    error
                );

                throw error;

            }


            const resultado =
                Array.isArray(data)
                    ? data[0]
                    : data;


            if (
                !resultado ||
                resultado.status !==
                "concluido" ||
                resultado.psicologo_id !==
                usuarioAtual.id
            ) {

                throw new Error(
                    "O Supabase não confirmou a conclusão do acompanhamento."
                );

            }


            await carregarPainelPsicologia();


            reposicionarSolicitacao(
                solicitacao.id
            );


            mostrarSucesso(
                "O fluxo administrativo deste acompanhamento foi concluído e a ação foi registrada no histórico administrativo.",
                "Acompanhamento concluído"
            );


        } catch (erro) {

            console.error(
                "SafeSchool: falha ao concluir solicitação.",
                erro
            );


            mostrarErro(
                "Não foi possível concluir este acompanhamento. Nenhuma alteração parcial foi registrada.",
                "Acompanhamento não concluído"
            );


            if (
                botao &&
                document.body.contains(
                    botao
                )
            ) {

                botao.disabled =
                    false;

                botao.textContent =
                    textoOriginal;

            }

        }

    }


    /* =========================================
       MOSTRAR ENCAMINHAMENTOS
    ========================================== */

    function mostrarEncaminhamentos(
        encaminhamentos
    ) {

        if (
            !listaEncaminhamentos ||
            !contadorEncaminhamentos ||
            !estadoEncaminhamentos
        ) {

            return;

        }


        listaEncaminhamentos.innerHTML =
            "";


        contadorEncaminhamentos.textContent =

            encaminhamentos.length === 1
                ? "1 encaminhamento"
                : encaminhamentos.length +
                  " encaminhamentos";


        if (
            encaminhamentos.length === 0
        ) {

            listaEncaminhamentos.style.display =
                "none";

            estadoEncaminhamentos.style.display =
                "flex";

            return;

        }


        estadoEncaminhamentos.style.display =
            "none";

        listaEncaminhamentos.style.display =
            "grid";


        encaminhamentos.forEach(

            function (
                encaminhamento
            ) {

                listaEncaminhamentos.appendChild(

                    criarCardEncaminhamentoReal(
                        encaminhamento
                    )

                );

            }

        );

    }


    /* =========================================
       CARD ENCAMINHAMENTO REAL
    ========================================== */

    function criarCardEncaminhamentoReal(
        encaminhamento
    ) {

        const card =
            document.createElement("article");


        card.className =
            "card-solicitacao";


        card.dataset.encaminhamentoReal =
            encaminhamento.id;


        const relato =
            encaminhamento.relato;


        const protocolo =
            escaparHTML(
                relato.protocolo ||
                "Protocolo não informado"
            );


        const status =
            escaparHTML(
                formatarStatusPsicologia(
                    encaminhamento.status
                )
            );


        const tipoCaso =
            escaparHTML(
                formatarTipoCaso(
                    relato.tipo
                )
            );


        const local =
            escaparHTML(
                formatarLocal(
                    relato.local
                )
            );


        const urgencia =
            escaparHTML(
                formatarUrgencia(
                    relato.urgencia
                )
            );


        const dataOcorrencia =
            escaparHTML(
                formatarData(
                    relato.quando_ocorreu
                )
            );


        const textoRelato =
            escaparHTML(
                relato.descricao ||
                "Relato não informado."
            );


        const motivo =
            escaparHTML(
                encaminhamento.motivo ||
                "Motivo não informado."
            );


        const criadoEm =
            escaparHTML(
                formatarDataHora(
                    encaminhamento.criado_em
                )
            );


        let blocoIdentidade =
            "";

        let avisoPrivacidade =
            "";


        if (
            relato.anonimo === true
        ) {

            blocoIdentidade = `

                <div class="identidade-encaminhamento anonimo">

                    <strong>
                        🔒 Relato anônimo
                    </strong>

                    <span>
                        A identidade de quem realizou
                        o relato não está disponível.
                    </span>

                </div>

            `;


            avisoPrivacidade = `

                <div class="aviso-anonimato-psicologia">

                    🔒 Este caso veio de um relato anônimo.
                    O encaminhamento não revela a identidade
                    de quem realizou o relato. A equipe de
                    Psicologia poderá analisar a situação
                    e apoiar a escola sem quebrar o anonimato.

                </div>

            `;


        } else {

            blocoIdentidade = `

                <div class="identidade-encaminhamento identificado">

                    <strong>
                        👤 Relato identificado
                    </strong>

                    <span>
                        Situação:
                        ${escaparHTML(
                            formatarEnvolvimento(
                                relato.envolvimento
                            )
                        )}
                    </span>

                </div>

            `;


            avisoPrivacidade = `

                <div class="aviso-identificado-psicologia">

                    💜 Este caso veio de um relato identificado.
                    As informações relacionadas ao acompanhamento
                    psicológico permanecem reservadas à equipe
                    autorizada e não são disponibilizadas
                    automaticamente à equipe pedagógica.

                </div>

            `;

        }


        card.innerHTML = `

            <div class="solicitacao-topo">

                <div>

                    <span class="protocolo-solicitacao">
                        ${protocolo}
                    </span>

                    <h3>
                        🛡️ Caso encaminhado pela equipe escolar
                    </h3>

                </div>


                <span
                    class="
                        status-solicitacao
                        ${obterClasseStatus(
                            encaminhamento.status
                        )}
                    "
                >
                    ${status}
                </span>

            </div>


            ${blocoIdentidade}


            <div class="solicitacao-info">

                <span>
                    🔗 Caso: ${protocolo}
                </span>

                <span>
                    📅 Encaminhado em: ${criadoEm}
                </span>

            </div>


            <div class="motivo-encaminhamento-real">

                <strong>
                    Motivo do encaminhamento
                </strong>

                <p>
                    ${motivo}
                </p>

            </div>


            <div class="mensagem-aluno">

                <strong>
                    Informações do caso
                </strong>

                <p>

                    <b>Tipo:</b>
                    ${tipoCaso}

                    <br>

                    <b>Local:</b>
                    ${local}

                    <br>

                    <b>Quando ocorreu:</b>
                    ${dataOcorrencia}

                    <br>

                    <b>Prioridade informada:</b>
                    ${urgencia}

                </p>

            </div>


            <div class="mensagem-aluno">

                <strong>
                    Relato encaminhado
                </strong>

                <p>
                    ${textoRelato}
                </p>

            </div>


            ${avisoPrivacidade}


            <div class="acoes-solicitacao">

                ${criarAcaoEncaminhamentoReal(
                    encaminhamento
                )}

            </div>

        `;


        const botaoAssumir =
            card.querySelector(
                "[data-assumir-encaminhamento-real]"
            );


        if (botaoAssumir) {

            botaoAssumir.addEventListener(

                "click",

                async function () {

                    await assumirEncaminhamento(
                        encaminhamento,
                        botaoAssumir
                    );

                }

            );

        }


        const botaoConcluir =
            card.querySelector(
                "[data-concluir-encaminhamento-real]"
            );


        if (botaoConcluir) {

            botaoConcluir.addEventListener(

                "click",

                async function () {

                    await concluirEncaminhamento(
                        encaminhamento,
                        botaoConcluir
                    );

                }

            );

        }


        return card;

    }


    /* =========================================
       AÇÃO ENCAMINHAMENTO
    ========================================== */

    function criarAcaoEncaminhamentoReal(
        encaminhamento
    ) {

        if (
            encaminhamento.status === "pendente"
        ) {

            return `

                <button
                    type="button"
                    class="botao-assumir-psicologia-real"
                    data-assumir-encaminhamento-real
                >
                    Assumir acompanhamento
                </button>

            `;

        }


        if (
            encaminhamento.status ===
            "em_acompanhamento"
        ) {

            if (
                encaminhamento.psicologo_id ===
                usuarioAtual.id
            ) {

                return `

                    <span class="situacao-psicologia-real">
                        ✓ Em acompanhamento com você
                    </span>

                    <button
                        type="button"
                        class="botao-concluir-psicologia-real"
                        data-concluir-encaminhamento-real
                    >
                        Concluir acompanhamento
                    </button>

                `;

            }


            return `

                <span class="situacao-psicologia-real">
                    Em acompanhamento pela equipe de Psicologia
                </span>

            `;

        }


        if (
            encaminhamento.status ===
            "concluido"
        ) {

            return `

                <span class="acolhimento-finalizado">
                    ✓ Acompanhamento concluído
                </span>

            `;

        }


        return "";

    }


    /* =========================================
       ASSUMIR ENCAMINHAMENTO
    ========================================== */

    async function assumirEncaminhamento(
        encaminhamento,
        botao
    ) {

        if (
            !encaminhamento ||
            !encaminhamento.id
        ) {

            return;

        }


        if (
            encaminhamento.status !==
            "pendente"
        ) {

            mostrarErro(
                "Este encaminhamento não está mais pendente.",
                "Status atualizado"
            );

            await carregarPainelPsicologia();

            return;

        }


        const confirmou =
            await solicitarConfirmacao({

                titulo:
                    "Assumir acompanhamento",

                mensagem:
                    "Deseja assumir este encaminhamento?\n\nO SafeSchool registrará que este caso passou para acompanhamento da equipe de Psicologia.",

                textoConfirmar:
                    "Assumir acompanhamento",

                textoCancelar:
                    "Cancelar"

            });


        if (!confirmou) {

            return;

        }


        const textoOriginal =
            botao
                ? botao.textContent
                : "";


        if (botao) {

            botao.disabled =
                true;

            botao.textContent =
                "Assumindo...";

        }


        try {

            const {
                data,
                error
            } =
                await supabase.rpc(

                    "assumir_encaminhamento_psicologia",

                    {

                        p_encaminhamento_id:
                            encaminhamento.id

                    }

                );


            if (error) {

                console.error(
                    "SafeSchool: erro ao assumir encaminhamento.",
                    error
                );

                throw error;

            }


            const resultado =
                Array.isArray(data)
                    ? data[0]
                    : data;


            if (
                !resultado ||
                resultado.status !==
                "em_acompanhamento" ||
                resultado.psicologo_id !==
                usuarioAtual.id
            ) {

                throw new Error(
                    "O Supabase não confirmou o início do acompanhamento."
                );

            }


            await carregarPainelPsicologia();


            reposicionarEncaminhamento(
                encaminhamento.id
            );


            mostrarSucesso(
                "O encaminhamento agora está em acompanhamento pela equipe de Psicologia e a ação foi registrada no histórico.",
                "Acompanhamento iniciado"
            );


        } catch (erro) {

            console.error(
                "SafeSchool: falha ao assumir encaminhamento.",
                erro
            );


            mostrarErro(
                "Não foi possível assumir este encaminhamento. Nenhuma alteração parcial foi registrada.",
                "Acompanhamento não iniciado"
            );


            if (
                botao &&
                document.body.contains(
                    botao
                )
            ) {

                botao.disabled =
                    false;

                botao.textContent =
                    textoOriginal;

            }

        }

    }


    /* =========================================
       CONCLUIR ENCAMINHAMENTO
    ========================================== */

    async function concluirEncaminhamento(
        encaminhamento,
        botao
    ) {

        if (
            !encaminhamento ||
            !encaminhamento.id
        ) {

            return;

        }


        if (
            encaminhamento.status !==
            "em_acompanhamento"
        ) {

            mostrarErro(
                "Este encaminhamento não está mais em acompanhamento.",
                "Status atualizado"
            );

            await carregarPainelPsicologia();

            return;

        }


        if (
            encaminhamento.psicologo_id !==
            usuarioAtual.id
        ) {

            mostrarErro(
                "Somente o profissional responsável por este acompanhamento pode concluir o fluxo.",
                "Ação não permitida"
            );

            return;

        }


        const confirmou =
            await solicitarConfirmacao({

                titulo:
                    "Concluir acompanhamento",

                mensagem:
                    "Deseja concluir o fluxo administrativo deste encaminhamento?\n\nEssa ação registra apenas o encerramento do acompanhamento no SafeSchool. Ela não representa alta clínica, diagnóstico ou avaliação sobre o estado emocional do aluno.",

                textoConfirmar:
                    "Concluir acompanhamento",

                textoCancelar:
                    "Cancelar"

            });


        if (!confirmou) {

            return;

        }


        const textoOriginal =
            botao
                ? botao.textContent
                : "";


        if (botao) {

            botao.disabled =
                true;

            botao.textContent =
                "Concluindo...";

        }


        try {

            const {
                data,
                error
            } =
                await supabase.rpc(

                    "concluir_encaminhamento_psicologia",

                    {

                        p_encaminhamento_id:
                            encaminhamento.id

                    }

                );


            if (error) {

                console.error(
                    "SafeSchool: erro ao concluir encaminhamento.",
                    error
                );

                throw error;

            }


            const resultado =
                Array.isArray(data)
                    ? data[0]
                    : data;


            if (
                !resultado ||
                resultado.status !==
                "concluido" ||
                resultado.psicologo_id !==
                usuarioAtual.id
            ) {

                throw new Error(
                    "O Supabase não confirmou a conclusão do acompanhamento."
                );

            }


            await carregarPainelPsicologia();


            reposicionarEncaminhamento(
                encaminhamento.id
            );


            mostrarSucesso(
                "O fluxo administrativo deste encaminhamento foi concluído e a ação foi registrada no histórico.",
                "Acompanhamento concluído"
            );


        } catch (erro) {

            console.error(
                "SafeSchool: falha ao concluir encaminhamento.",
                erro
            );


            mostrarErro(
                "Não foi possível concluir este encaminhamento. Nenhuma alteração parcial foi registrada.",
                "Acompanhamento não concluído"
            );


            if (
                botao &&
                document.body.contains(
                    botao
                )
            ) {

                botao.disabled =
                    false;

                botao.textContent =
                    textoOriginal;

            }

        }

    }


    /* =========================================
       REPOSICIONAMENTO
    ========================================== */

    function reposicionarSolicitacao(
        id
    ) {

        window.requestAnimationFrame(

            function () {

                window.requestAnimationFrame(

                    function () {

                        const card =
                            document.querySelector(
                                '[data-solicitacao-real="' +
                                id +
                                '"]'
                            );

                        rolarParaCard(
                            card
                        );

                    }

                );

            }

        );

    }


    function reposicionarEncaminhamento(
        id
    ) {

        window.requestAnimationFrame(

            function () {

                window.requestAnimationFrame(

                    function () {

                        const card =
                            document.querySelector(
                                '[data-encaminhamento-real="' +
                                id +
                                '"]'
                            );

                        rolarParaCard(
                            card
                        );

                    }

                );

            }

        );

    }


    function rolarParaCard(
        card
    ) {

        if (!card) {

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
            card
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


    /* =========================================
       STATUS VISUAL
    ========================================== */

    function obterClasseStatus(
        status
    ) {

        if (
            status ===
            "em_acompanhamento"
        ) {

            return "solicitacao-acolhimento";

        }


        if (
            status ===
            "concluido"
        ) {

            return "solicitacao-concluida";

        }


        return "solicitacao-nova";

    }


    function formatarStatusPsicologia(
        status
    ) {

        const opcoes = {

            pendente:
                "Pendente",

            em_acompanhamento:
                "Em acompanhamento",

            concluido:
                "Concluído"

        };


        return (
            opcoes[status] ||
            formatarTextoGenerico(
                status
            )
        );

    }


    /* =========================================
       FORMATAÇÃO DOS RELATOS
    ========================================== */

    function formatarEnvolvimento(
        envolvimento
    ) {

        const opcoes = {

            comigo:
                "Aconteceu comigo",

            testemunha:
                "Presenciei a situação",

            presenciei:
                "Presenciei a situação",

            colega:
                "Aconteceu com outra pessoa",

            outro:
                "Outra situação"

        };


        return (
            opcoes[envolvimento] ||
            "Não informado"
        );

    }


    function formatarTipoCaso(
        tipo
    ) {

        const tipos = {

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
            tipos[tipo] ||
            formatarTextoGenerico(
                tipo
            )
        );

    }


    function formatarLocal(
        local
    ) {

        const locais = {

            sala:
                "Sala de aula",

            patio:
                "Pátio",

            corredor:
                "Corredor",

            banheiro:
                "Banheiro",

            transporte:
                "Transporte escolar",

            internet:
                "Internet / redes sociais",

            online:
                "Internet / redes sociais",

            outro:
                "Outro local"

        };


        return (
            locais[local] ||
            formatarTextoGenerico(
                local
            )
        );

    }


    function formatarUrgencia(
        urgencia
    ) {

        const opcoes = {

            baixa:
                "Baixa",

            media:
                "Média",

            alta:
                "Alta"

        };


        return (
            opcoes[urgencia] ||
            formatarTextoGenerico(
                urgencia
            )
        );

    }


    /* =========================================
       DATAS
    ========================================== */

    function formatarData(
        data
    ) {

        if (!data) {

            return "Não informada";

        }


        const partes =
            String(data)
                .split("-");


        if (
            partes.length === 3
        ) {

            return (
                partes[2] +
                "/" +
                partes[1] +
                "/" +
                partes[0]
            );

        }


        return data;

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
       PAINEL VAZIO
    ========================================== */

    function mostrarPainelVazio() {

        if (listaSolicitacoes) {

            listaSolicitacoes.innerHTML =
                "";

            listaSolicitacoes.style.display =
                "none";

        }


        if (listaEncaminhamentos) {

            listaEncaminhamentos.innerHTML =
                "";

            listaEncaminhamentos.style.display =
                "none";

        }


        if (estadoVazio) {

            estadoVazio.style.display =
                "block";

        }


        if (estadoEncaminhamentos) {

            estadoEncaminhamentos.style.display =
                "flex";

        }


        if (numeroNovas) {

            numeroNovas.textContent =
                "0";

        }


        if (numeroRapidos) {

            numeroRapidos.textContent =
                "0";

        }


        if (numeroAgendados) {

            numeroAgendados.textContent =
                "0";

        }


        if (numeroAcolhimentos) {

            numeroAcolhimentos.textContent =
                "0";

        }


        if (numeroConcluidos) {

            numeroConcluidos.textContent =
                "0";

        }


        if (contadorSolicitacoes) {

            contadorSolicitacoes.textContent =
                "0 solicitações";

        }


        if (contadorEncaminhamentos) {

            contadorEncaminhamentos.textContent =
                "0 encaminhamentos";

        }

    }


    /* =========================================
       CARREGAR PAINEL
    ========================================== */

    async function carregarPainelPsicologia() {

        try {

            const resultados =
                await Promise.all([

                    buscarSolicitacoesReais(),

                    buscarEncaminhamentosReais()

                ]);


            solicitacoesReais =
                resultados[0];


            encaminhamentosReais =
                resultados[1];


            atualizarResumo(
                solicitacoesReais,
                encaminhamentosReais
            );


            mostrarSolicitacoes(
                solicitacoesReais
            );


            mostrarEncaminhamentos(
                encaminhamentosReais
            );


        } catch (erro) {

            console.error(
                "SafeSchool: falha ao carregar o painel da Psicologia.",
                erro
            );


            mostrarErro(
                "Não foi possível carregar os dados da área de Psicologia.",
                "Painel indisponível"
            );

        }

    }


    /* =========================================
       INICIAR
    ========================================== */

    async function iniciar() {

        injetarEstilosPsicologia();


        mostrarEstadoCarregando();


        await prepararInterface();


        const sessaoValida =
            await carregarSessaoPsicologia();


        if (!sessaoValida) {

            mostrarPainelVazio();


            window.location.href =
                "login.html?acesso=restrito";


            return;

        }


        await carregarPainelPsicologia();


        prepararBuscaComEnterPsicologia();


        window.setTimeout(
            prepararBuscaComEnterPsicologia,
            300
        );


        console.log(
            "SafeSchool: painel real da Psicologia carregado."
        );

    }


    /* =========================================
       API
    ========================================== */

    window.SafeSchoolPsicologia =
        Object.freeze({

            recarregar:
                carregarPainelPsicologia

        });


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

    } else {

        iniciar();

    }

})();