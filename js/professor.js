/* =========================================
   SAFESCHOOL
   PAINEL DO PROFESSOR
========================================= */


/* =========================================
   ELEMENTOS PRINCIPAIS
========================================= */

const numeroNovos =
    document.getElementById(
        "numeroNovos"
    );

const numeroAltaPrioridade =
    document.getElementById(
        "numeroAltaPrioridade"
    );

const numeroAcompanhamento =
    document.getElementById(
        "numeroAcompanhamento"
    );

const numeroConcluidos =
    document.getElementById(
        "numeroConcluidos"
    );

const listaRelatos =
    document.getElementById(
        "listaRelatos"
    );

const semRelatos =
    document.getElementById(
        "semRelatos"
    );

const totalRelatos =
    document.getElementById(
        "totalRelatos"
    );


/* =========================================
   ESTADO DO PAINEL
========================================= */

let filtroAtual =
    "todos";

let buscaAtual =
    "";

let denunciasPainel =
    [];


/* =========================================
   ESTILOS COMPLEMENTARES
========================================= */

function injetarEstilosComplementares() {

    if (
        document.getElementById(
            "estilosProfessorSafeSchool"
        )
    ) {

        return;

    }


    const estilo =
        document.createElement(
            "style"
        );


    estilo.id =
        "estilosProfessorSafeSchool";


    estilo.textContent = `

        /* =====================================
           TRIAGEM ASSISTIDA
        ====================================== */

        .painel-triagem {

            margin-bottom: 24px;

            padding: 22px;

            border-radius: 18px;

            background:
                linear-gradient(
                    135deg,
                    #ffffff,
                    #f5f2ff
                );

            border:
                1px solid
                #e7e1fb;

        }


        .painel-triagem-topo {

            display: flex;

            justify-content: space-between;

            align-items: flex-start;

            gap: 24px;

            margin-bottom: 18px;

        }


        .painel-triagem-topo span {

            display: block;

            margin-bottom: 5px;

            color: #6c4ce5;

            font-size: 9px;

            font-weight: bold;

            letter-spacing: 1px;

        }


        .painel-triagem-topo h3 {

            margin: 0;

            color: #20205f;

            font-size: 19px;

        }


        .painel-triagem-topo p {

            max-width: 500px;

            margin: 0;

            color: #77738e;

            font-size: 10px;

            line-height: 1.6;

        }


        .cards-triagem {

            display: grid;

            grid-template-columns:
                repeat(3, minmax(0, 1fr));

            gap: 12px;

        }


        .card-triagem {

            padding: 17px;

            border-radius: 14px;

            text-align: left;

            cursor: pointer;

            transition: 0.15s;

        }


        .card-triagem:hover {

            transform:
                translateY(-2px);

        }


        .card-triagem strong {

            display: block;

            margin-bottom: 5px;

            font-size: 28px;

        }


        .card-triagem b {

            display: block;

            margin-bottom: 6px;

            color: #20205f;

            font-size: 11px;

        }


        .card-triagem small {

            color: #77738e;

            font-size: 9px;

            line-height: 1.45;

        }


        .card-triagem.forte {

            background: #fff0f2;

            border: 1px solid #efccd3;

            color: #c8445a;

        }


        .card-triagem.moderada {

            background: #fff8df;

            border: 1px solid #eadca6;

            color: #9a721a;

        }


        .card-triagem.regular {

            background: #ecf9f1;

            border: 1px solid #ccebd9;

            color: #31825b;

        }


        .aviso-triagem {

            margin-top: 14px;

            padding: 12px;

            border-radius: 10px;

            background:
                rgba(
                    108,
                    76,
                    229,
                    0.06
                );

            color: #68637b;

            font-size: 9px;

            line-height: 1.55;

        }


        /* =====================================
           TRIAGEM DENTRO DO ACOMPANHAMENTO
        ====================================== */

        .triagem-caso {

            margin: 15px 0;

            padding: 15px 17px;

            border-radius: 13px;

        }


        .triagem-caso.forte {

            background: #fff0f2;

            border: 1px solid #efccd3;

        }


        .triagem-caso.moderada {

            background: #fff8df;

            border: 1px solid #eadca6;

        }


        .triagem-caso.regular {

            background: #ecf9f1;

            border: 1px solid #ccebd9;

        }


        .triagem-caso.encerrada {

            background: #f5f5f8;

            border: 1px solid #e4e4e9;

        }


        .triagem-caso-topo {

            display: flex;

            align-items: center;

            justify-content: space-between;

            gap: 12px;

            margin-bottom: 7px;

        }


        .triagem-caso-topo strong {

            color: #20205f;

            font-size: 11px;

        }


        .triagem-etiqueta {

            padding: 5px 9px;

            border-radius: 20px;

            background: #ffffff;

            font-size: 9px;

            font-weight: bold;

        }


        .triagem-caso p {

            margin: 0;

            color: #68637b;

            font-size: 9px;

            line-height: 1.55;

        }


        .triagem-motivos {

            margin-top: 8px !important;

            font-weight: bold;

        }


        /* =====================================
           PRAZOS
        ====================================== */

        .painel-prazos {

            margin-bottom: 24px;

            padding: 22px;

            border-radius: 18px;

            background: #ffffff;

            border: 1px solid #eceaf4;

        }


        .painel-prazos-topo {

            display: flex;

            justify-content: space-between;

            align-items: flex-start;

            gap: 20px;

            margin-bottom: 17px;

        }


        .painel-prazos-topo span {

            display: block;

            margin-bottom: 4px;

            color: #6c4ce5;

            font-size: 9px;

            font-weight: bold;

            letter-spacing: 1px;

        }


        .painel-prazos-topo h3 {

            margin: 0;

            color: #20205f;

            font-size: 18px;

        }


        .painel-prazos-topo p {

            max-width: 470px;

            margin: 0;

            color: #77738e;

            font-size: 10px;

            line-height: 1.5;

        }


        .cards-prazos {

            display: grid;

            grid-template-columns:
                repeat(4, minmax(0, 1fr));

            gap: 12px;

        }


        .card-prazo-alerta {

            padding: 16px;

            border-radius: 13px;

            text-align: left;

            cursor: pointer;

            transition: 0.15s;

        }


        .card-prazo-alerta:hover {

            transform:
                translateY(-2px);

        }


        .card-prazo-alerta strong {

            display: block;

            margin-bottom: 4px;

            font-size: 27px;

        }


        .card-prazo-alerta b {

            display: block;

            margin-bottom: 5px;

            color: #20205f;

            font-size: 11px;

        }


        .card-prazo-alerta small {

            color: #77738e;

            font-size: 9px;

            line-height: 1.4;

        }


        .card-prazo-alerta.vencido {

            border: 1px solid #f0cbd2;

            background: #fff0f2;

            color: #c8445a;

        }


        .card-prazo-alerta.hoje {

            border: 1px solid #f0d9bb;

            background: #fff5e8;

            color: #bc6a18;

        }


        .card-prazo-alerta.proximo {

            border: 1px solid #ecdfae;

            background: #fff9e2;

            color: #9a721a;

        }


        .card-prazo-alerta.sem-prazo {

            border: 1px solid #e2e2e9;

            background: #f7f7fa;

            color: #77738e;

        }


        /* =====================================
           FILTROS
        ====================================== */

        .area-filtros-relatos {

            margin-bottom: 24px;

            padding: 20px;

            border-radius: 16px;

            background: #ffffff;

            border: 1px solid #eceaf4;

        }


        .topo-filtros-relatos {

            display: flex;

            align-items: center;

            justify-content: space-between;

            gap: 15px;

            margin-bottom: 15px;

        }


        .topo-filtros-relatos h3 {

            margin: 0;

            color: #20205f;

            font-size: 15px;

        }


        .resultado-filtros {

            color: #77738e;

            font-size: 10px;

        }


        .busca-relatos {

            display: flex;

            gap: 9px;

            margin-bottom: 14px;

        }


        .busca-relatos input {

            flex: 1;

            padding: 12px 14px;

            border: 1px solid #dedbea;

            border-radius: 10px;

            outline: none;

            font-size: 11px;

        }


        .busca-relatos input:focus {

            border-color: #6c4ce5;

        }


        .botao-limpar-busca {

            padding: 10px 14px;

            border: 1px solid #dcd7ef;

            border-radius: 9px;

            background: #ffffff;

            color: #6c4ce5;

            font-size: 10px;

            font-weight: bold;

            cursor: pointer;

        }


        .filtros-botoes {

            display: flex;

            flex-wrap: wrap;

            gap: 8px;

        }


        .filtro-relato {

            padding: 9px 12px;

            border: 1px solid #e1ddef;

            border-radius: 20px;

            background: #ffffff;

            color: #625e78;

            font-size: 10px;

            font-weight: bold;

            cursor: pointer;

        }


        .filtro-relato:hover {

            border-color: #6c4ce5;

            color: #6c4ce5;

        }


        .filtro-relato.ativo {

            background: #6c4ce5;

            border-color: #6c4ce5;

            color: #ffffff;

        }


        .sem-resultados-filtro {

            display: none;

            margin-bottom: 20px;

            padding: 25px;

            border-radius: 14px;

            background: #ffffff;

            border: 1px dashed #d9d5e8;

            text-align: center;

            color: #77738e;

        }


        .sem-resultados-filtro strong {

            display: block;

            margin-bottom: 6px;

            color: #20205f;

            font-size: 13px;

        }


        .sem-resultados-filtro p {

            font-size: 10px;

            line-height: 1.5;

        }


        /* =====================================
           IDENTIFICAÇÃO
        ====================================== */

        .identificacao-relato {

            margin: 14px 0;

            padding: 14px 16px;

            border-radius: 12px;

            display: flex;

            flex-wrap: wrap;

            gap: 10px 20px;

            align-items: center;

        }


        .identificacao-relato.identificado {

            background: #f0f6ff;

            border: 1px solid #d6e5f8;

        }


        .identificacao-relato.anonimo {

            background: #f7f7fb;

            border: 1px solid #e7e7ef;

        }


        .tipo-identificacao {

            font-size: 11px;

            font-weight: bold;

            color: #20205f;

        }


        .dado-identificacao {

            font-size: 10px;

            color: #6f6f8d;

        }


        /* =====================================
           GESTÃO
        ====================================== */

        .gestao-caso {

            margin: 16px 0;

            padding: 18px;

            border-radius: 14px;

            background: #faf9ff;

            border: 1px solid #ebe7fa;

        }


        .gestao-caso-topo {

            display: flex;

            align-items: center;

            justify-content: space-between;

            gap: 12px;

            margin-bottom: 15px;

        }


        .gestao-caso-topo h4 {

            margin: 0;

            color: #20205f;

            font-size: 13px;

        }


        .situacao-prazo {

            padding: 6px 10px;

            border-radius: 20px;

            font-size: 9px;

            font-weight: bold;

        }


        .situacao-prazo.sem-prazo {

            background: #f1f1f5;

            color: #77738e;

        }


        .situacao-prazo.normal {

            background: #ecf9f1;

            color: #31825b;

        }


        .situacao-prazo.proximo {

            background: #fff8df;

            color: #9a721a;

        }


        .situacao-prazo.hoje {

            background: #fff0df;

            color: #bb6b19;

        }


        .situacao-prazo.vencido {

            background: #fff0f2;

            color: #c8445a;

        }


        .situacao-prazo.encerrado {

            background: #ecf9f1;

            color: #31825b;

        }


        .gestao-resumo {

            display: grid;

            grid-template-columns:
                repeat(2, minmax(0, 1fr));

            gap: 12px;

            margin-bottom: 15px;

        }


        .gestao-info {

            padding: 12px;

            border-radius: 10px;

            background: #ffffff;

            border: 1px solid #ece9f5;

        }


        .gestao-info small {

            display: block;

            margin-bottom: 5px;

            color: #88839a;

            font-size: 9px;

        }


        .gestao-info strong {

            color: #20205f;

            font-size: 11px;

        }


        .gestao-edicao {

            display: grid;

            grid-template-columns:
                1fr
                1fr
                auto;

            gap: 10px;

            align-items: end;

        }


        .campo-gestao {

            display: flex;

            flex-direction: column;

            gap: 6px;

        }


        .campo-gestao label {

            color: #59556e;

            font-size: 9px;

            font-weight: bold;

        }


        .campo-gestao select,
        .campo-gestao input {

            width: 100%;

            padding: 10px;

            border: 1px solid #dad6e9;

            border-radius: 9px;

            background: #ffffff;

            font-size: 10px;

        }


        .botao-salvar-gestao {

            height: 37px;

            padding: 0 15px;

            border: none;

            border-radius: 9px;

            background: #6c4ce5;

            color: #ffffff;

            font-size: 10px;

            font-weight: bold;

            cursor: pointer;

        }


        .gestao-encerrada {

            padding: 11px;

            border-radius: 9px;

            background: #f3f3f7;

            color: #77738e;

            font-size: 9px;

        }


        /* =====================================
           HISTÓRICO
        ====================================== */

        .historico-caso {

            margin-top: 20px;

            padding-top: 18px;

            border-top: 1px solid #e6e3f0;

        }


        .historico-caso h4 {

            margin-bottom: 5px;

            color: #20205f;

            font-size: 14px;

        }


        .historico-subtitulo {

            color: #77738e;

            font-size: 11px;

            margin-bottom: 16px;

        }


        .linha-tempo {

            display: flex;

            flex-direction: column;

            gap: 12px;

            margin-bottom: 18px;

        }


        .evento-historico {

            position: relative;

            padding: 14px 16px 14px 42px;

            border-radius: 12px;

            background: #faf9ff;

            border: 1px solid #eeeaff;

        }


        .evento-historico::before {

            content: "";

            position: absolute;

            left: 17px;

            top: 19px;

            width: 10px;

            height: 10px;

            border-radius: 50%;

            background: #6c4ce5;

        }


        .evento-historico strong {

            display: block;

            color: #20205f;

            font-size: 12px;

        }


        .evento-historico p {

            margin-top: 4px;

            color: #6f6f8d;

            font-size: 11px;

            line-height: 1.55;

        }


        .evento-historico small {

            display: block;

            margin-top: 6px;

            color: #9995aa;

            font-size: 9px;

        }


        .registro-acao {

            margin-top: 18px;

            padding: 18px;

            border-radius: 14px;

            background: #f5f2ff;

        }


        .registro-acao strong {

            display: block;

            margin-bottom: 12px;

            color: #4f35b8;

            font-size: 12px;

        }


        .campos-acao {

            display: grid;

            grid-template-columns:
                minmax(180px, 0.7fr)
                1.3fr;

            gap: 10px;

        }


        .campos-acao select,
        .campos-acao input {

            width: 100%;

            padding: 11px;

            border: 1px solid #dcd7ef;

            border-radius: 9px;

            background: #ffffff;

            font-size: 11px;

        }


        .registro-acao-aviso {

            margin-top: 8px;

            color: #77738e;

            font-size: 9px;

        }


        .botao-registrar-acao {

            margin-top: 12px;

            padding: 10px 14px;

            border: none;

            border-radius: 9px;

            background: #6c4ce5;

            color: #ffffff;

            font-size: 11px;

            font-weight: bold;

            cursor: pointer;

        }


        .historico-bloqueado {

            margin-top: 15px;

            padding: 12px;

            border-radius: 10px;

            background: #f8f8fb;

            color: #77738e;

            font-size: 10px;

        }


        .registro-encerramento {

            margin-top: 15px;

            padding: 14px;

            border-radius: 11px;

            background: #ecf9f1;

            border: 1px solid #ccebd9;

        }


        .registro-encerramento strong {

            color: #31825b;

            font-size: 11px;

        }


        .registro-encerramento p {

            margin-top: 5px;

            color: #557262;

            font-size: 10px;

        }


        @media (max-width: 950px) {

            .cards-triagem {

                grid-template-columns: 1fr;

            }


            .cards-prazos {

                grid-template-columns:
                    repeat(2, 1fr);

            }

        }


        @media (max-width: 800px) {

            .gestao-edicao {

                grid-template-columns: 1fr;

            }

        }


        @media (max-width: 650px) {

            .painel-triagem-topo,
            .painel-prazos-topo {

                flex-direction: column;

            }


            .cards-prazos {

                grid-template-columns: 1fr;

            }


            .gestao-resumo {

                grid-template-columns: 1fr;

            }


            .campos-acao {

                grid-template-columns: 1fr;

            }


            .busca-relatos {

                flex-direction: column;

            }

        }

    `;


    document.head.appendChild(
        estilo
    );
}


/* =========================================
   ÁREA DE FILTROS
========================================= */

function criarAreaFiltros() {

    if (
        document.getElementById(
            "areaFiltrosProfessor"
        )
    ) {

        return;

    }


    if (!listaRelatos) {

        return;

    }


    const area =
        document.createElement(
            "div"
        );


    area.id =
        "areaFiltrosProfessor";


    area.className =
        "area-filtros-relatos";


    area.innerHTML = `

        <div class="topo-filtros-relatos">

            <h3>
                🔎 Localizar e filtrar casos
            </h3>

            <span
                class="resultado-filtros"
                id="resultadoFiltrosProfessor"
            >
                0 relatos
            </span>

        </div>


        <div class="busca-relatos">

            <input
                type="search"
                id="buscaRelatosProfessor"
                placeholder="Buscar protocolo, tipo, relato, responsável ou aluno..."
                autocomplete="off"
            >

            <button
                type="button"
                class="botao-limpar-busca"
                id="limparBuscaProfessor"
            >
                Limpar
            </button>

        </div>


        <div class="filtros-botoes">

            <button
                type="button"
                class="filtro-relato ativo"
                data-filtro-relato="todos"
            >
                Todos
            </button>

            <button
                type="button"
                class="filtro-relato"
                data-filtro-relato="novos"
            >
                Novos
            </button>

            <button
                type="button"
                class="filtro-relato"
                data-filtro-relato="acompanhamento"
            >
                Em acompanhamento
            </button>

            <button
                type="button"
                class="filtro-relato"
                data-filtro-relato="concluidos"
            >
                Concluídos
            </button>

            <button
                type="button"
                class="filtro-relato"
                data-filtro-relato="alta"
            >
                ⚠️ Alta prioridade
            </button>

            <button
                type="button"
                class="filtro-relato"
                data-filtro-relato="anonimos"
            >
                🔒 Anônimos
            </button>

            <button
                type="button"
                class="filtro-relato"
                data-filtro-relato="identificados"
            >
                👤 Identificados
            </button>

            <button
                type="button"
                class="filtro-relato"
                data-filtro-relato="triagemforte"
            >
                🔴 Sinais fortes
            </button>

            <button
                type="button"
                class="filtro-relato"
                data-filtro-relato="triagemmoderada"
            >
                🟡 Sinais moderados
            </button>

            <button
                type="button"
                class="filtro-relato"
                data-filtro-relato="prazovencido"
            >
                🔴 Prazo vencido
            </button>

            <button
                type="button"
                class="filtro-relato"
                data-filtro-relato="prazohoje"
            >
                🟠 Vence hoje
            </button>

            <button
                type="button"
                class="filtro-relato"
                data-filtro-relato="prazoproximo"
            >
                🟡 Prazo próximo
            </button>

            <button
                type="button"
                class="filtro-relato"
                data-filtro-relato="semprazo"
            >
                ⚪ Sem prazo
            </button>

        </div>

    `;


    listaRelatos.parentNode.insertBefore(
        area,
        listaRelatos
    );


    const vazio =
        document.createElement(
            "div"
        );


    vazio.id =
        "semResultadosFiltroProfessor";


    vazio.className =
        "sem-resultados-filtro";


    vazio.innerHTML = `

        <strong>
            Nenhum relato encontrado
        </strong>

        <p>

            Não existem casos que correspondam
            aos filtros ou à busca informada.

        </p>

    `;


    listaRelatos.parentNode.insertBefore(
        vazio,
        listaRelatos
    );


    configurarEventosFiltros();
}


/* =========================================
   PAINEL DE PRAZOS
========================================= */

function criarPainelPrazos() {

    if (
        document.getElementById(
            "painelPrazosProfessor"
        )
    ) {

        return;

    }


    const filtros =
        document.getElementById(
            "areaFiltrosProfessor"
        );


    if (!filtros) {

        return;

    }


    const painel =
        document.createElement(
            "div"
        );


    painel.id =
        "painelPrazosProfessor";


    painel.className =
        "painel-prazos";


    painel.innerHTML = `

        <div class="painel-prazos-topo">

            <div>

                <span>
                    ACOMPANHAMENTO
                </span>

                <h3>
                    ⏰ Atenção aos prazos
                </h3>

            </div>


            <p>

                Os alertas consideram somente acompanhamentos
                que ainda não foram concluídos.
                Clique em um indicador para localizar
                os registros correspondentes.

            </p>

        </div>


        <div class="cards-prazos">

            <button
                type="button"
                class="card-prazo-alerta vencido"
                data-alerta-filtro="prazovencido"
            >

                <strong id="numeroPrazosVencidos">
                    0
                </strong>

                <b>
                    🔴 Prazos vencidos
                </b>

                <small>
                    Acompanhamentos que ultrapassaram
                    a data da próxima ação.
                </small>

            </button>


            <button
                type="button"
                class="card-prazo-alerta hoje"
                data-alerta-filtro="prazohoje"
            >

                <strong id="numeroPrazosHoje">
                    0
                </strong>

                <b>
                    🟠 Vencem hoje
                </b>

                <small>
                    Acompanhamentos cuja próxima ação
                    está prevista para hoje.
                </small>

            </button>


            <button
                type="button"
                class="card-prazo-alerta proximo"
                data-alerta-filtro="prazoproximo"
            >

                <strong id="numeroPrazosProximos">
                    0
                </strong>

                <b>
                    🟡 Próximos 3 dias
                </b>

                <small>
                    Acompanhamentos que exigirão
                    atenção em breve.
                </small>

            </button>


            <button
                type="button"
                class="card-prazo-alerta sem-prazo"
                data-alerta-filtro="semprazo"
            >

                <strong id="numeroSemPrazo">
                    0
                </strong>

                <b>
                    ⚪ Sem prazo definido
                </b>

                <small>
                    Acompanhamentos ativos ainda
                    sem próxima ação prevista.
                </small>

            </button>

        </div>

    `;


    filtros.parentNode.insertBefore(
        painel,
        filtros
    );


    painel
        .querySelectorAll(
            "[data-alerta-filtro]"
        )
        .forEach(

            function (botao) {

                botao.addEventListener(

                    "click",

                    function () {

                        selecionarFiltro(

                            botao.getAttribute(
                                "data-alerta-filtro"
                            )

                        );


                        filtros.scrollIntoView({

                            behavior:
                                "smooth",

                            block:
                                "start"

                        });

                    }

                );

            }

        );
}


/* =========================================
   PAINEL DE TRIAGEM
========================================= */

function criarPainelTriagem() {

    if (
        document.getElementById(
            "painelTriagemProfessor"
        )
    ) {

        return;

    }


    const painelPrazos =
        document.getElementById(
            "painelPrazosProfessor"
        );


    const filtros =
        document.getElementById(
            "areaFiltrosProfessor"
        );


    if (!filtros) {

        return;

    }


    const painel =
        document.createElement(
            "div"
        );


    painel.id =
        "painelTriagemProfessor";


    painel.className =
        "painel-triagem";


    painel.innerHTML = `

        <div class="painel-triagem-topo">

            <div>

                <span>
                    TRIAGEM ASSISTIDA
                </span>

                <h3>
                    ✨ Priorização de situações
                </h3>

            </div>


            <p>

                Nesta demonstração, o SafeSchool utiliza
                regras transparentes para organizar e destacar
                relatos que podem merecer análise mais rápida.
                A triagem não realiza diagnóstico e não substitui
                a avaliação da equipe escolar.

            </p>

        </div>


        <div class="cards-triagem">

            <button
                type="button"
                class="card-triagem forte"
                data-alerta-filtro="triagemforte"
            >

                <strong id="numeroTriagemForte">
                    0
                </strong>

                <b>
                    🔴 Sinais fortes de atenção
                </b>

                <small>

                    Relatos que reúnem indicadores
                    que sugerem análise prioritária.

                </small>

            </button>


            <button
                type="button"
                class="card-triagem moderada"
                data-alerta-filtro="triagemmoderada"
            >

                <strong id="numeroTriagemModerada">
                    0
                </strong>

                <b>
                    🟡 Sinais moderados
                </b>

                <small>

                    Relatos com alguns elementos
                    que merecem acompanhamento atento.

                </small>

            </button>


            <button
                type="button"
                class="card-triagem regular"
                data-alerta-filtro="triagemregular"
            >

                <strong id="numeroTriagemRegular">
                    0
                </strong>

                <b>
                    🟢 Sem sinal adicional
                </b>

                <small>

                    Relatos que continuam exigindo análise,
                    mas sem indicador adicional nesta triagem.

                </small>

            </button>

        </div>


        <div class="aviso-triagem">

            ⚠️ A triagem demonstrativa não confirma que uma ocorrência
            aconteceu, não realiza diagnóstico e não toma decisões.
            A prioridade final e todas as providências continuam
            sob responsabilidade da equipe escolar.

        </div>

    `;


    const referencia =
        painelPrazos ||
        filtros;


    referencia.parentNode.insertBefore(
        painel,
        referencia
    );


    painel
        .querySelectorAll(
            "[data-alerta-filtro]"
        )
        .forEach(

            function (botao) {

                botao.addEventListener(

                    "click",

                    function () {

                        selecionarFiltro(

                            botao.getAttribute(
                                "data-alerta-filtro"
                            )

                        );


                        filtros.scrollIntoView({

                            behavior:
                                "smooth",

                            block:
                                "start"

                        });

                    }

                );

            }

        );
}


/* =========================================
   EVENTOS DOS FILTROS
========================================= */

function configurarEventosFiltros() {

    document
        .querySelectorAll(
            "[data-filtro-relato]"
        )
        .forEach(

            function (botao) {

                botao.addEventListener(

                    "click",

                    function () {

                        selecionarFiltro(

                            botao.getAttribute(
                                "data-filtro-relato"
                            )

                        );

                    }

                );

            }

        );


    const campoBusca =
        document.getElementById(
            "buscaRelatosProfessor"
        );


    if (campoBusca) {

        campoBusca.addEventListener(

            "input",

            function () {

                buscaAtual =
                    campoBusca.value
                        .trim()
                        .toLowerCase();


                aplicarFiltrosERenderizar();

            }

        );

    }


    const limpar =
        document.getElementById(
            "limparBuscaProfessor"
        );


    if (limpar) {

        limpar.addEventListener(

            "click",

            function () {

                buscaAtual =
                    "";


                if (campoBusca) {

                    campoBusca.value =
                        "";

                }


                selecionarFiltro(
                    "todos"
                );

            }

        );

    }
}


function selecionarFiltro(
    filtro
) {

    filtroAtual =
        filtro;


    document
        .querySelectorAll(
            "[data-filtro-relato]"
        )
        .forEach(

            function (botao) {

                botao.classList.remove(
                    "ativo"
                );


                if (
                    botao.getAttribute(
                        "data-filtro-relato"
                    ) === filtro
                ) {

                    botao.classList.add(
                        "ativo"
                    );

                }

            }

        );


    aplicarFiltrosERenderizar();
}


/* =========================================
   DENÚNCIAS
========================================= */

function obterDenuncias() {

    const dados =
        sessionStorage.getItem(
            "denunciasSafeSchool"
        );


    if (!dados) {

        return [];

    }


    try {

        const resultado =
            JSON.parse(
                dados
            );


        return Array.isArray(
            resultado
        )
            ? resultado
            : [];

    }

    catch (erro) {

        return [];

    }
}


function salvarDenuncias(
    denuncias
) {

    sessionStorage.setItem(

        "denunciasSafeSchool",

        JSON.stringify(
            denuncias
        )

    );
}


/* =========================================
   PSICOLOGIA
========================================= */

function obterSolicitacoesPsicologia() {

    const dados =
        sessionStorage.getItem(
            "solicitacoesPsicologicasSafeSchool"
        );


    if (!dados) {

        return [];

    }


    try {

        const resultado =
            JSON.parse(
                dados
            );


        return Array.isArray(
            resultado
        )
            ? resultado
            : [];

    }

    catch (erro) {

        return [];

    }
}


function salvarSolicitacoesPsicologia(
    solicitacoes
) {

    sessionStorage.setItem(

        "solicitacoesPsicologicasSafeSchool",

        JSON.stringify(
            solicitacoes
        )

    );
}


function localizarEncaminhamento(
    protocolo,
    codigoEscola
) {

    return (

        obterSolicitacoesPsicologia()
            .find(

                function (item) {

                    return (

                        item.origem ===
                        "encaminhamento-professor"

                        &&

                        item.protocoloOrigem ===
                        protocolo

                        &&

                        item.escolaCodigo ===
                        codigoEscola

                    );

                }

            )

        || null

    );
}


/* =========================================
   CARREGAR PAINEL
========================================= */

function carregarPainel() {

    const escola =
        window.SafeSchoolEscola.obter();


    if (!escola) {

        return;

    }


    denunciasPainel =
        obterDenuncias()
            .filter(

                function (denuncia) {

                    return (
                        denuncia.escolaCodigo ===
                        escola.codigo
                    );

                }

            );


    denunciasPainel.sort(

        function (a, b) {

            return (

                new Date(
                    b.criadoEm
                )

                -

                new Date(
                    a.criadoEm
                )

            );

        }

    );


    atualizarResumo(
        denunciasPainel
    );


    atualizarPainelTriagem(
        denunciasPainel
    );


    atualizarPainelPrazos(
        denunciasPainel
    );


    aplicarFiltrosERenderizar();
}


/* =========================================
   RESUMO
========================================= */

function atualizarResumo(
    denuncias
) {

    const novos =
        denuncias.filter(

            item =>
                item.status ===
                "novo"

        ).length;


    const prioridade =
        denuncias.filter(

            item =>
                item.urgencia ===
                "alta"

        ).length;


    const acompanhamento =
        denuncias.filter(

            item =>
                item.status ===
                "acompanhamento"

        ).length;


    const concluidos =
        denuncias.filter(

            item =>
                item.status ===
                "concluido"

        ).length;


    if (numeroNovos) {

        numeroNovos.textContent =
            novos;

    }


    if (numeroAltaPrioridade) {

        numeroAltaPrioridade.textContent =
            prioridade;

    }


    if (numeroAcompanhamento) {

        numeroAcompanhamento.textContent =
            acompanhamento;

    }


    if (numeroConcluidos) {

        numeroConcluidos.textContent =
            concluidos;

    }


    if (totalRelatos) {

        totalRelatos.textContent =

            denuncias.length === 1
                ? "1 relato"
                : denuncias.length +
                  " relatos";

    }
}


/* =========================================
   TRIAGEM ASSISTIDA
========================================= */

function avaliarTriagem(
    denuncia
) {

    if (
        denuncia.status ===
        "concluido"
    ) {

        return {

            nivel:
                "encerrada",

            texto:
                "Acompanhamento encerrado",

            motivos:
                []

        };

    }


    let pontos =
        0;


    const motivos =
        [];


    /* =========================================
       URGÊNCIA INFORMADA
    ========================================== */

    if (
        denuncia.urgencia ===
        "alta"
    ) {

        pontos +=
            4;


        motivos.push(
            "urgência alta informada"
        );

    }

    else if (
        denuncia.urgencia ===
        "media"
    ) {

        pontos +=
            1;

    }


    /* =========================================
       TIPO DE OCORRÊNCIA
    ========================================== */

    if (
        denuncia.tipo ===
        "fisico"
    ) {

        pontos +=
            2;


        motivos.push(
            "ocorrência física informada"
        );

    }


    if (
        denuncia.tipo ===
        "discriminacao"
    ) {

        pontos +=
            1;


        motivos.push(
            "situação de discriminação informada"
        );

    }


    /* =========================================
       PRAZO DO ACOMPANHAMENTO
    ========================================== */

    const diasPrazo =
        calcularDiferencaPrazo(
            denuncia
        );


    if (
        diasPrazo !== null &&
        diasPrazo < 0
    ) {

        pontos +=
            2;


        motivos.push(
            "prazo de acompanhamento vencido"
        );

    }

    else if (
        diasPrazo === 0
    ) {

        pontos +=
            1;


        motivos.push(
            "próxima ação vence hoje"
        );

    }


    /* =========================================
       TERMOS DO RELATO
       REGRA DEMONSTRATIVA
    ========================================== */

    const texto =
        normalizarTexto(
            denuncia.relato ||
            ""
        );


    const termosAtencao = [

        "ameaca",
        "ameacou",
        "agressao",
        "agrediu",
        "bater",
        "bateu",
        "soco",
        "chute",
        "perseguicao",
        "persegue",
        "medo",
        "machucar"

    ];


    const encontrouTermo =
        termosAtencao.some(

            function (termo) {

                return texto.includes(
                    termo
                );

            }

        );


    if (encontrouTermo) {

        pontos +=
            2;


        motivos.push(
            "relato contém termos que merecem atenção"
        );

    }


    /* =========================================
       RESULTADO
    ========================================== */

    if (
        pontos >= 4
    ) {

        return {

            nivel:
                "forte",

            texto:
                "🔴 Sinais fortes de atenção",

            motivos:
                motivos

        };

    }


    if (
        pontos >= 2
    ) {

        return {

            nivel:
                "moderada",

            texto:
                "🟡 Sinais moderados",

            motivos:
                motivos

        };

    }


    return {

        nivel:
            "regular",

        texto:
            "🟢 Sem sinal adicional",

        motivos:
            motivos

    };
}


/* =========================================
   ATUALIZAR PAINEL DE TRIAGEM
========================================= */

function atualizarPainelTriagem(
    denuncias
) {

    const ativos =
        denuncias.filter(

            function (item) {

                return (
                    item.status !==
                    "concluido"
                );

            }

        );


    const forte =
        ativos.filter(

            function (item) {

                return (
                    avaliarTriagem(
                        item
                    ).nivel ===
                    "forte"
                );

            }

        ).length;


    const moderada =
        ativos.filter(

            function (item) {

                return (
                    avaliarTriagem(
                        item
                    ).nivel ===
                    "moderada"
                );

            }

        ).length;


    const regular =
        ativos.filter(

            function (item) {

                return (
                    avaliarTriagem(
                        item
                    ).nivel ===
                    "regular"
                );

            }

        ).length;


    atualizarNumero(
        "numeroTriagemForte",
        forte
    );


    atualizarNumero(
        "numeroTriagemModerada",
        moderada
    );


    atualizarNumero(
        "numeroTriagemRegular",
        regular
    );
}


/* =========================================
   PRAZOS
========================================= */

function atualizarPainelPrazos(
    denuncias
) {

    const ativos =
        denuncias.filter(

            function (item) {

                return (
                    item.status !==
                    "concluido"
                );

            }

        );


    const vencidos =
        ativos.filter(

            function (item) {

                const dias =
                    calcularDiferencaPrazo(
                        item
                    );


                return (
                    dias !== null &&
                    dias < 0
                );

            }

        ).length;


    const hoje =
        ativos.filter(

            function (item) {

                return (
                    calcularDiferencaPrazo(
                        item
                    ) === 0
                );

            }

        ).length;


    const proximos =
        ativos.filter(

            function (item) {

                const dias =
                    calcularDiferencaPrazo(
                        item
                    );


                return (

                    dias !== null

                    &&

                    dias >= 1

                    &&

                    dias <= 3

                );

            }

        ).length;


    const semPrazo =
        ativos.filter(

            function (item) {

                return (
                    !item.prazoProximaAcao
                );

            }

        ).length;


    atualizarNumero(
        "numeroPrazosVencidos",
        vencidos
    );


    atualizarNumero(
        "numeroPrazosHoje",
        hoje
    );


    atualizarNumero(
        "numeroPrazosProximos",
        proximos
    );


    atualizarNumero(
        "numeroSemPrazo",
        semPrazo
    );
}


function atualizarNumero(
    id,
    valor
) {

    const elemento =
        document.getElementById(
            id
        );


    if (elemento) {

        elemento.textContent =
            valor;

    }
}


/* =========================================
   FILTROS
========================================= */

function aplicarFiltrosERenderizar() {

    let resultado =
        denunciasPainel.filter(

            function (denuncia) {

                return correspondeAoFiltro(
                    denuncia
                );

            }

        );


    if (buscaAtual) {

        resultado =
            resultado.filter(

                function (denuncia) {

                    return correspondeABusca(
                        denuncia
                    );

                }

            );

    }


    atualizarContadorFiltro(

        resultado.length,

        denunciasPainel.length

    );


    mostrarRelatos(

        resultado,

        denunciasPainel.length

    );
}


function correspondeAoFiltro(
    denuncia
) {

    if (
        filtroAtual ===
        "todos"
    ) {

        return true;

    }


    if (
        filtroAtual ===
        "novos"
    ) {

        return (
            denuncia.status ===
            "novo"
        );

    }


    if (
        filtroAtual ===
        "acompanhamento"
    ) {

        return (
            denuncia.status ===
            "acompanhamento"
        );

    }


    if (
        filtroAtual ===
        "concluidos"
    ) {

        return (
            denuncia.status ===
            "concluido"
        );

    }


    if (
        filtroAtual ===
        "alta"
    ) {

        return (
            denuncia.urgencia ===
            "alta"
        );

    }


    if (
        filtroAtual ===
        "anonimos"
    ) {

        return !relatoEhIdentificado(
            denuncia
        );

    }


    if (
        filtroAtual ===
        "identificados"
    ) {

        return relatoEhIdentificado(
            denuncia
        );

    }


    if (
        filtroAtual ===
        "triagemforte"
    ) {

        return (

            avaliarTriagem(
                denuncia
            ).nivel ===
            "forte"

        );

    }


    if (
        filtroAtual ===
        "triagemmoderada"
    ) {

        return (

            avaliarTriagem(
                denuncia
            ).nivel ===
            "moderada"

        );

    }


    if (
        filtroAtual ===
        "triagemregular"
    ) {

        return (

            avaliarTriagem(
                denuncia
            ).nivel ===
            "regular"

        );

    }


    if (
        filtroAtual ===
        "prazovencido"
    ) {

        const dias =
            calcularDiferencaPrazo(
                denuncia
            );


        return (

            denuncia.status !==
            "concluido"

            &&

            dias !== null

            &&

            dias < 0

        );

    }


    if (
        filtroAtual ===
        "prazohoje"
    ) {

        return (

            denuncia.status !==
            "concluido"

            &&

            calcularDiferencaPrazo(
                denuncia
            ) === 0

        );

    }


    if (
        filtroAtual ===
        "prazoproximo"
    ) {

        const dias =
            calcularDiferencaPrazo(
                denuncia
            );


        return (

            denuncia.status !==
            "concluido"

            &&

            dias !== null

            &&

            dias >= 1

            &&

            dias <= 3

        );

    }


    if (
        filtroAtual ===
        "semprazo"
    ) {

        return (

            denuncia.status !==
            "concluido"

            &&

            !denuncia.prazoProximaAcao

        );

    }


    return true;
}


function correspondeABusca(
    denuncia
) {

    const texto = [

        denuncia.protocolo,

        denuncia.relato,

        denuncia.autorEmail,

        formatarTipo(
            denuncia.tipo
        ),

        formatarLocal(
            denuncia.local
        ),

        formatarUrgencia(
            denuncia.urgencia
        ),

        formatarStatus(
            denuncia.status
        ),

        formatarEnvolvimento(
            denuncia.envolvimento
        ),

        formatarResponsavelCaso(
            denuncia.responsavelCaso
        ),

        denuncia.prazoProximaAcao

    ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();


    return texto.includes(
        buscaAtual
    );
}


function atualizarContadorFiltro(
    exibidos,
    total
) {

    const elemento =
        document.getElementById(
            "resultadoFiltrosProfessor"
        );


    if (!elemento) {

        return;

    }


    if (
        exibidos === total
    ) {

        elemento.textContent =

            total === 1
                ? "1 relato"
                : total +
                  " relatos";

    }

    else {

        elemento.textContent =

            "Exibindo " +
            exibidos +
            " de " +
            total +
            " relatos";

    }
}


/* =========================================
   MOSTRAR RELATOS
========================================= */

function mostrarRelatos(
    denuncias,
    totalGeral
) {

    listaRelatos.innerHTML =
        "";


    const semResultados =
        document.getElementById(
            "semResultadosFiltroProfessor"
        );


    if (
        totalGeral === 0
    ) {

        if (semRelatos) {

            semRelatos.style.display =
                "block";

        }


        if (semResultados) {

            semResultados.style.display =
                "none";

        }


        return;

    }


    if (semRelatos) {

        semRelatos.style.display =
            "none";

    }


    if (
        denuncias.length === 0
    ) {

        if (semResultados) {

            semResultados.style.display =
                "block";

        }


        return;

    }


    if (semResultados) {

        semResultados.style.display =
            "none";

    }


    denuncias.forEach(

        function (denuncia) {

            listaRelatos.appendChild(

                criarCardRelato(
                    denuncia
                )

            );

        }

    );
}


/* =========================================
   IDENTIFICAÇÃO
========================================= */

function relatoEhIdentificado(
    denuncia
) {

    return (

        denuncia.anonimo === false

        ||

        denuncia.origem ===
        "relato-identificado"

    );
}


function criarBlocoIdentificacao(
    denuncia
) {

    if (
        relatoEhIdentificado(
            denuncia
        )
    ) {

        return `

            <div class="identificacao-relato identificado">

                <span class="tipo-identificacao">
                    👤 Relato identificado
                </span>

                <span class="dado-identificacao">

                    Conta:

                    ${escaparHTML(
                        denuncia.autorEmail ||
                        "Conta não informada"
                    )}

                </span>

                <span class="dado-identificacao">

                    Situação:

                    ${escaparHTML(
                        formatarEnvolvimento(
                            denuncia.envolvimento
                        )
                    )}

                </span>

            </div>

        `;

    }


    return `

        <div class="identificacao-relato anonimo">

            <span class="tipo-identificacao">
                🔒 Relato anônimo
            </span>

            <span class="dado-identificacao">
                Identidade não disponível
            </span>

        </div>

    `;
}


/* =========================================
   BLOCO DA TRIAGEM
========================================= */

function criarBlocoTriagem(
    denuncia
) {

    const resultado =
        avaliarTriagem(
            denuncia
        );


    if (
        resultado.nivel ===
        "encerrada"
    ) {

        return `

            <div class="triagem-caso encerrada">

                <div class="triagem-caso-topo">

                    <strong>
                        ✨ Triagem assistida
                    </strong>

                    <span class="triagem-etiqueta">
                        Acompanhamento encerrado
                    </span>

                </div>

                <p>

                    A triagem assistida deixa de gerar
                    alertas após o encerramento
                    do acompanhamento escolar.

                </p>

            </div>

        `;

    }


    let motivos =
        "";


    if (
        resultado.motivos.length > 0
    ) {

        motivos = `

            <p class="triagem-motivos">

                Sinais considerados:

                ${escaparHTML(
                    resultado.motivos.join(
                        " • "
                    )
                )}

            </p>

        `;

    }


    return `

        <div class="triagem-caso ${resultado.nivel}">

            <div class="triagem-caso-topo">

                <strong>
                    ✨ Triagem assistida
                </strong>

                <span class="triagem-etiqueta">

                    ${resultado.texto}

                </span>

            </div>


            <p>

                Classificação demonstrativa criada
                para auxiliar a organização e priorização
                da análise. A decisão permanece
                com a equipe escolar.

            </p>


            ${motivos}

        </div>

    `;
}


/* =========================================
   GESTÃO DO CASO
========================================= */

function criarBlocoGestao(
    denuncia
) {

    const situacao =
        obterSituacaoPrazo(
            denuncia
        );


    const responsavel =
        formatarResponsavelCaso(
            denuncia.responsavelCaso
        );


    const prazo =
        denuncia.prazoProximaAcao

            ? formatarData(
                  denuncia.prazoProximaAcao
              )

            : "Não definido";


    let edicao =
        "";


    if (
        denuncia.status !==
        "concluido"
    ) {

        edicao = `

            <div class="gestao-edicao">

                <div class="campo-gestao">

                    <label>
                        Responsável pelo acompanhamento
                    </label>

                    <select data-responsavel-caso>

                        <option value="">
                            Selecione
                        </option>

                        <option
                            value="coordenacao"
                            ${selecionado(
                                denuncia.responsavelCaso,
                                "coordenacao"
                            )}
                        >
                            Coordenação Pedagógica
                        </option>

                        <option
                            value="orientacao"
                            ${selecionado(
                                denuncia.responsavelCaso,
                                "orientacao"
                            )}
                        >
                            Orientação Educacional
                        </option>

                        <option
                            value="direcao"
                            ${selecionado(
                                denuncia.responsavelCaso,
                                "direcao"
                            )}
                        >
                            Direção
                        </option>

                        <option
                            value="professor"
                            ${selecionado(
                                denuncia.responsavelCaso,
                                "professor"
                            )}
                        >
                            Professor responsável
                        </option>

                        <option
                            value="equipe"
                            ${selecionado(
                                denuncia.responsavelCaso,
                                "equipe"
                            )}
                        >
                            Equipe multidisciplinar
                        </option>

                    </select>

                </div>


                <div class="campo-gestao">

                    <label>
                        Próxima ação até
                    </label>

                    <input
                        type="date"
                        data-prazo-caso
                        min="${obterDataHojeISO()}"
                        value="${escaparHTML(
                            denuncia.prazoProximaAcao ||
                            ""
                        )}"
                    >

                </div>


                <button
                    type="button"
                    class="botao-salvar-gestao"
                    data-salvar-gestao
                >
                    Salvar gestão
                </button>

            </div>

        `;

    }

    else {

        edicao = `

            <div class="gestao-encerrada">

                🔒 Este acompanhamento escolar está encerrado.
                Os dados de gestão permanecem
                somente para consulta.

            </div>

        `;

    }


    return `

        <div class="gestao-caso">

            <div class="gestao-caso-topo">

                <h4>
                    📌 Gestão do acompanhamento
                </h4>

                <span
                    class="situacao-prazo ${situacao.classe}"
                >
                    ${situacao.texto}
                </span>

            </div>


            <div class="gestao-resumo">

                <div class="gestao-info">

                    <small>
                        Responsável pelo acompanhamento
                    </small>

                    <strong>
                        ${escaparHTML(
                            responsavel
                        )}
                    </strong>

                </div>


                <div class="gestao-info">

                    <small>
                        Próxima ação prevista
                    </small>

                    <strong>
                        ${escaparHTML(
                            prazo
                        )}
                    </strong>

                </div>

            </div>


            ${edicao}

        </div>

    `;
}


/* =========================================
   CRIAR CARD DO RELATO
========================================= */

function criarCardRelato(
    denuncia
) {

    const escola =
        window.SafeSchoolEscola.obter();


    const card =
        document.createElement(
            "article"
        );


    card.className =
        "card-relato";


    const encaminhamento =
        escola

            ? localizarEncaminhamento(
                  denuncia.protocolo,
                  escola.codigo
              )

            : null;


    let blocoPsicologia =
        "";


    if (encaminhamento) {

        blocoPsicologia = `

            <div class="status-acompanhamento">

                🧠 Apoio psicológico:

                ${escaparHTML(
                    formatarStatusPsicologia(
                        encaminhamento.status
                    )
                )}

            </div>

        `;

    }


    let botaoStatus =
        "";


    if (
        denuncia.status ===
        "novo"
    ) {

        botaoStatus = `

            <button
                type="button"
                class="botao-status"
                data-status="acompanhamento"
            >
                Iniciar acompanhamento
            </button>

        `;

    }

    else if (
        denuncia.status ===
        "acompanhamento"
    ) {

        botaoStatus = `

            <button
                type="button"
                class="botao-status"
                data-status="concluido"
            >
                Concluir acompanhamento
            </button>

        `;

    }

    else {

        botaoStatus = `

            <button
                type="button"
                class="botao-status desativado"
                disabled
            >
                Acompanhamento concluído
            </button>

        `;

    }


    let botaoPsicologia =
        "";


    if (!encaminhamento) {

        botaoPsicologia = `

            <button
                type="button"
                class="botao-status"
                data-encaminhar-psicologia
            >
                🧠 Encaminhar à Psicologia
            </button>

        `;

    }

    else {

        botaoPsicologia = `

            <button
                type="button"
                class="botao-status desativado"
                disabled
            >
                ✓ Encaminhado à Psicologia
            </button>

        `;

    }


    card.innerHTML = `

        <div class="relato-topo">

            <div>

                <span class="protocolo-relato">

                    ${escaparHTML(
                        denuncia.protocolo
                    )}

                </span>


                <h3>

                    ${escaparHTML(
                        formatarTipo(
                            denuncia.tipo
                        )
                    )}

                </h3>

            </div>


            <span
                class="status-relato status-${escaparHTML(
                    denuncia.status
                )}"
            >

                ${escaparHTML(
                    formatarStatus(
                        denuncia.status
                    )
                )}

            </span>

        </div>


        ${criarBlocoIdentificacao(
            denuncia
        )}


        <div class="relato-informacoes">

            <span>

                📍 ${escaparHTML(
                    formatarLocal(
                        denuncia.local
                    )
                )}

            </span>

            <span>

                📅 ${escaparHTML(
                    formatarData(
                        denuncia.dataOcorrencia
                    )
                )}

            </span>

            <span>

                ⚠️ ${escaparHTML(
                    formatarUrgencia(
                        denuncia.urgencia
                    )
                )}

            </span>

        </div>


        ${blocoPsicologia}


        ${criarBlocoTriagem(
            denuncia
        )}


        ${criarBlocoGestao(
            denuncia
        )}


        <div class="relato-resumo">

            <p>

                ${escaparHTML(
                    limitarTexto(
                        denuncia.relato,
                        180
                    )
                )}

            </p>

        </div>


        <div
            class="relato-detalhes"
            hidden
        >

            <strong>
                Relato completo
            </strong>

            <p>

                ${escaparHTML(
                    denuncia.relato
                )}

            </p>


            ${criarHistoricoHTML(
                denuncia
            )}

        </div>


        <div class="acoes-relato">

            <button
                type="button"
                class="botao-status"
                data-detalhes
            >
                Ver detalhes e histórico
            </button>


            ${botaoStatus}

            ${botaoPsicologia}

        </div>

    `;


    /* =========================================
       SALVAR GESTÃO
    ========================================== */

    const salvarGestao =
        card.querySelector(
            "[data-salvar-gestao]"
        );


    if (salvarGestao) {

        salvarGestao.addEventListener(

            "click",

            function () {

                salvarGestaoCaso(

                    denuncia.protocolo,

                    card.querySelector(
                        "[data-responsavel-caso]"
                    ).value,

                    card.querySelector(
                        "[data-prazo-caso]"
                    ).value

                );

            }

        );

    }


    /* =========================================
       DETALHES
    ========================================== */

    const botaoDetalhes =
        card.querySelector(
            "[data-detalhes]"
        );


    const detalhes =
        card.querySelector(
            ".relato-detalhes"
        );


    botaoDetalhes.addEventListener(

        "click",

        function () {

            detalhes.hidden =
                !detalhes.hidden;


            botaoDetalhes.textContent =

                detalhes.hidden
                    ? "Ver detalhes e histórico"
                    : "Ocultar detalhes e histórico";

        }

    );


    /* =========================================
       STATUS
    ========================================== */

    const status =
        card.querySelector(
            "[data-status]"
        );


    if (status) {

        status.addEventListener(

            "click",

            function () {

                alterarStatus(

                    denuncia.protocolo,

                    status.getAttribute(
                        "data-status"
                    )

                );

            }

        );

    }


    /* =========================================
       PSICOLOGIA
    ========================================== */

    const psicologia =
        card.querySelector(
            "[data-encaminhar-psicologia]"
        );


    if (psicologia) {

        psicologia.addEventListener(

            "click",

            function () {

                encaminharParaPsicologia(
                    denuncia.protocolo
                );

            }

        );

    }


    /* =========================================
       REGISTRAR AÇÃO
    ========================================== */

    const registrar =
        card.querySelector(
            "[data-registrar-acao]"
        );


    if (registrar) {

        registrar.addEventListener(

            "click",

            function () {

                registrarAcao(

                    denuncia.protocolo,

                    card.querySelector(
                        "[data-tipo-acao]"
                    ).value,

                    card.querySelector(
                        "[data-observacao-acao]"
                    ).value.trim()

                );

            }

        );

    }


    return card;
}


/* =========================================
   SALVAR GESTÃO
========================================= */

function salvarGestaoCaso(
    protocolo,
    responsavel,
    prazo
) {

    const escola =
        window.SafeSchoolEscola.obter();


    if (!escola) {

        alert(
            "Não foi possível identificar a escola."
        );

        return;

    }


    const denuncias =
        obterDenuncias();


    const denuncia =
        denuncias.find(

            function (item) {

                return (

                    item.protocolo ===
                    protocolo

                    &&

                    item.escolaCodigo ===
                    escola.codigo

                );

            }

        );


    if (!denuncia) {

        alert(
            "Acompanhamento não localizado."
        );

        return;

    }


    if (
        denuncia.status ===
        "concluido"
    ) {

        alert(
            "Acompanhamentos concluídos não podem ter a gestão alterada."
        );

        return;

    }


    if (!responsavel) {

        alert(
            "Selecione o responsável pelo acompanhamento."
        );

        return;

    }


    if (!prazo) {

        alert(
            "Defina a data da próxima ação."
        );

        return;

    }


    if (
        prazo <
        obterDataHojeISO()
    ) {

        alert(
            "Não é possível cadastrar um novo prazo em uma data que já passou."
        );

        return;

    }


    const responsavelAnterior =
        denuncia.responsavelCaso ||
        "";


    const prazoAnterior =
        denuncia.prazoProximaAcao ||
        "";


    if (
        responsavelAnterior ===
        responsavel

        &&

        prazoAnterior ===
        prazo
    ) {

        alert(
            "Nenhuma alteração foi realizada."
        );

        return;

    }


    garantirHistorico(
        denuncia
    );


    const agora =
        new Date().toISOString();


    if (
        responsavelAnterior !==
        responsavel
    ) {

        denuncia.historico.push({

            tipo:
                "gestao",

            titulo:
                responsavelAnterior
                    ? "Responsável pelo acompanhamento alterado"
                    : "Responsável pelo acompanhamento definido",

            descricao:
                responsavelAnterior

                    ? (
                        "Responsável alterado de " +
                        formatarResponsavelCaso(
                            responsavelAnterior
                        ) +
                        " para " +
                        formatarResponsavelCaso(
                            responsavel
                        ) +
                        "."
                    )

                    : (
                        "Responsável definido: " +
                        formatarResponsavelCaso(
                            responsavel
                        ) +
                        "."
                    ),

            registradoPor:
                "Equipe escolar",

            criadoEm:
                agora

        });

    }


    if (
        prazoAnterior !==
        prazo
    ) {

        denuncia.historico.push({

            tipo:
                "gestao",

            titulo:
                prazoAnterior
                    ? "Prazo da próxima ação alterado"
                    : "Prazo da próxima ação definido",

            descricao:
                prazoAnterior

                    ? (
                        "Prazo alterado de " +
                        formatarData(
                            prazoAnterior
                        ) +
                        " para " +
                        formatarData(
                            prazo
                        ) +
                        "."
                    )

                    : (
                        "Próxima ação prevista até " +
                        formatarData(
                            prazo
                        ) +
                        "."
                    ),

            registradoPor:
                "Equipe escolar",

            criadoEm:
                agora

        });

    }


    denuncia.responsavelCaso =
        responsavel;


    denuncia.prazoProximaAcao =
        prazo;


    denuncia.atualizadoEm =
        agora;


    salvarDenuncias(
        denuncias
    );


    alert(
        "Responsável e prazo atualizados."
    );


    carregarPainel();
}


/* =========================================
   PRAZO
========================================= */

function calcularDiferencaPrazo(
    denuncia
) {

    if (
        !denuncia.prazoProximaAcao
    ) {

        return null;

    }


    const hoje =
        criarDataLocal(
            obterDataHojeISO()
        );


    const prazo =
        criarDataLocal(
            denuncia.prazoProximaAcao
        );


    return Math.round(

        (
            prazo.getTime() -
            hoje.getTime()
        )

        /

        (
            1000 *
            60 *
            60 *
            24
        )

    );
}


function obterSituacaoPrazo(
    denuncia
) {

    if (
        denuncia.status ===
        "concluido"
    ) {

        return {

            texto:
                "✓ Acompanhamento encerrado",

            classe:
                "encerrado"

        };

    }


    const dias =
        calcularDiferencaPrazo(
            denuncia
        );


    if (
        dias === null
    ) {

        return {

            texto:
                "Sem prazo definido",

            classe:
                "sem-prazo"

        };

    }


    if (
        dias < 0
    ) {

        return {

            texto:
                "⚠️ Prazo vencido",

            classe:
                "vencido"

        };

    }


    if (
        dias === 0
    ) {

        return {

            texto:
                "⏰ Vence hoje",

            classe:
                "hoje"

        };

    }


    if (
        dias <= 3
    ) {

        return {

            texto:
                "⏳ Prazo próximo",

            classe:
                "proximo"

        };

    }


    return {

        texto:
            "✓ Dentro do prazo",

        classe:
            "normal"

    };
}


/* =========================================
   HISTÓRICO
========================================= */

function criarHistoricoHTML(
    denuncia
) {

    const historico =
        Array.isArray(
            denuncia.historico
        )
            ? denuncia.historico
            : [];


    let eventos = `

        <div class="evento-historico">

            <strong>
                Relato recebido
            </strong>

            <p>

                ${
                    relatoEhIdentificado(
                        denuncia
                    )

                        ? "O relato foi registrado pelo canal identificado do SafeSchool."

                        : "O relato foi registrado pelo canal anônimo do SafeSchool."
                }

            </p>

            <small>

                ${escaparHTML(
                    formatarDataHora(
                        denuncia.criadoEm
                    )
                )}

            </small>

        </div>

    `;


    historico.forEach(

        function (evento) {

            eventos += `

                <div class="evento-historico">

                    <strong>

                        ${escaparHTML(
                            evento.titulo
                        )}

                    </strong>


                    ${
                        evento.descricao

                            ? `

                                <p>

                                    ${escaparHTML(
                                        evento.descricao
                                    )}

                                </p>

                            `

                            : ""
                    }


                    <small>

                        ${escaparHTML(
                            formatarDataHora(
                                evento.criadoEm
                            )
                        )}

                        ${
                            evento.registradoPor

                                ? " • " +
                                  escaparHTML(
                                      evento.registradoPor
                                  )

                                : ""
                        }

                    </small>

                </div>

            `;

        }

    );


    let formulario =
        "";


    if (
        denuncia.status ===
        "acompanhamento"
    ) {

        formulario = `

            <div class="registro-acao">

                <strong>
                    Registrar ação realizada
                </strong>


                <div class="campos-acao">

                    <select data-tipo-acao>

                        <option value="">
                            Selecione a ação
                        </option>

                        <option value="acolhimento">
                            Acolhimento inicial
                        </option>

                        <option value="conversa">
                            Conversa com estudante
                        </option>

                        <option value="familia">
                            Família contatada
                        </option>

                        <option value="orientacao">
                            Orientação pedagógica
                        </option>

                        <option value="observacao">
                            Observação no ambiente escolar
                        </option>

                        <option value="encaminhamento">
                            Encaminhamento interno
                        </option>

                        <option value="outro">
                            Outra ação
                        </option>

                    </select>


                    <input
                        type="text"
                        maxlength="300"
                        data-observacao-acao
                        placeholder="Observação breve sobre a ação"
                    >

                </div>


                <p class="registro-acao-aviso">

                    Não registre informações clínicas
                    ou confidenciais da Psicologia.

                </p>


                <button
                    type="button"
                    class="botao-registrar-acao"
                    data-registrar-acao
                >
                    Registrar ação
                </button>

            </div>

        `;

    }

    else if (
        denuncia.status ===
        "novo"
    ) {

        formulario = `

            <div class="historico-bloqueado">

                Para registrar ações,
                primeiro inicie o acompanhamento.

            </div>

        `;

    }

    else {

        formulario = `

            <div class="historico-bloqueado">

                Acompanhamento escolar concluído.
                O histórico permanece disponível
                para consulta.

            </div>

        `;


        if (
            denuncia.encerramento &&
            denuncia.encerramento.resumo
        ) {

            formulario += `

                <div class="registro-encerramento">

                    <strong>
                        ✓ Registro final do acompanhamento
                    </strong>

                    <p>

                        ${escaparHTML(
                            denuncia.encerramento.resumo
                        )}

                    </p>

                </div>

            `;

        }

    }


    return `

        <div class="historico-caso">

            <h4>
                📋 Histórico do acompanhamento
            </h4>

            <p class="historico-subtitulo">

                Registro das principais ações
                realizadas pela equipe escolar.

            </p>

            <div class="linha-tempo">

                ${eventos}

            </div>

            ${formulario}

        </div>

    `;
}


/* =========================================
   REGISTRAR AÇÃO
========================================= */

function registrarAcao(
    protocolo,
    tipo,
    observacao
) {

    if (!tipo) {

        alert(
            "Selecione a ação realizada."
        );

        return;

    }


    const escola =
        window.SafeSchoolEscola.obter();


    if (!escola) {

        return;

    }


    const denuncias =
        obterDenuncias();


    const denuncia =
        denuncias.find(

            function (item) {

                return (

                    item.protocolo ===
                    protocolo

                    &&

                    item.escolaCodigo ===
                    escola.codigo

                );

            }

        );


    if (!denuncia) {

        return;

    }


    if (
        denuncia.status !==
        "acompanhamento"
    ) {

        alert(
            "Somente acompanhamentos em andamento podem receber novas ações."
        );

        return;

    }


    garantirHistorico(
        denuncia
    );


    denuncia.historico.push({

        tipo:
            "acao-equipe",

        titulo:
            formatarTipoAcao(
                tipo
            ),

        descricao:
            observacao,

        registradoPor:
            "Equipe escolar",

        criadoEm:
            new Date().toISOString()

    });


    denuncia.atualizadoEm =
        new Date().toISOString();


    salvarDenuncias(
        denuncias
    );


    alert(
        "Ação registrada no histórico."
    );


    carregarPainel();
}


/* =========================================
   ALTERAR STATUS
========================================= */

function alterarStatus(
    protocolo,
    novoStatus
) {

    const escola =
        window.SafeSchoolEscola.obter();


    if (!escola) {

        return;

    }


    const denuncias =
        obterDenuncias();


    const denuncia =
        denuncias.find(

            function (item) {

                return (

                    item.protocolo ===
                    protocolo

                    &&

                    item.escolaCodigo ===
                    escola.codigo

                );

            }

        );


    if (!denuncia) {

        return;

    }


    garantirHistorico(
        denuncia
    );


    if (
        novoStatus ===
        "acompanhamento"
    ) {

        if (
            !confirm(
                "Deseja iniciar o acompanhamento deste relato?"
            )
        ) {

            return;

        }


        denuncia.status =
            "acompanhamento";


        denuncia.atualizadoEm =
            new Date().toISOString();


        denuncia.historico.push({

            tipo:
                "status",

            titulo:
                "Acompanhamento iniciado",

            descricao:
                "A equipe escolar iniciou o acompanhamento da situação relatada.",

            registradoPor:
                "Equipe escolar",

            criadoEm:
                new Date().toISOString()

        });


        salvarDenuncias(
            denuncias
        );


        carregarPainel();


        return;

    }


    if (
        novoStatus ===
        "concluido"
    ) {

        const encaminhamento =
            localizarEncaminhamento(

                denuncia.protocolo,

                escola.codigo

            );


        if (
            encaminhamento

            &&

            encaminhamento.status !==
            "concluido"
        ) {

            if (
                !confirm(

                    "O acompanhamento psicológico ainda está ativo.\n\n" +

                    "Você estará encerrando apenas o acompanhamento escolar.\n\n" +

                    "Deseja continuar?"

                )
            ) {

                return;

            }

        }


        const resposta =
            prompt(

                "Registre resumidamente o motivo do encerramento do acompanhamento escolar."

            );


        if (
            resposta === null
        ) {

            return;

        }


        const resumo =
            resposta.trim();


        if (
            resumo.length < 15
        ) {

            alert(
                "O registro final precisa ter pelo menos 15 caracteres."
            );

            return;

        }


        if (
            !confirm(
                "Deseja realmente concluir este acompanhamento escolar?"
            )
        ) {

            return;

        }


        const agora =
            new Date().toISOString();


        denuncia.status =
            "concluido";


        denuncia.atualizadoEm =
            agora;


        denuncia.encerramento = {

            resumo:
                resumo,

            registradoPor:
                "Equipe escolar",

            criadoEm:
                agora

        };


        denuncia.historico.push({

            tipo:
                "status",

            titulo:
                "Acompanhamento escolar concluído",

            descricao:
                "O fluxo de acompanhamento escolar foi encerrado. Registro final: " +
                resumo,

            registradoPor:
                "Equipe escolar",

            criadoEm:
                agora

        });


        salvarDenuncias(
            denuncias
        );


        alert(
            "Acompanhamento escolar concluído."
        );


        carregarPainel();

    }
}


/* =========================================
   ENCAMINHAR À PSICOLOGIA
========================================= */

function encaminharParaPsicologia(
    protocolo
) {

    const escola =
        window.SafeSchoolEscola.obter();


    if (!escola) {

        return;

    }


    const denuncias =
        obterDenuncias();


    const denuncia =
        denuncias.find(

            function (item) {

                return (

                    item.protocolo ===
                    protocolo

                    &&

                    item.escolaCodigo ===
                    escola.codigo

                );

            }

        );


    if (!denuncia) {

        return;

    }


    if (
        localizarEncaminhamento(
            protocolo,
            escola.codigo
        )
    ) {

        alert(
            "Este relato já foi encaminhado à Psicologia."
        );

        return;

    }


    const identificado =
        relatoEhIdentificado(
            denuncia
        );


    const mensagem =
        identificado

            ? (
                "Deseja encaminhar este relato identificado à Psicologia?\n\n" +

                "O contato do aluno será disponibilizado para o acolhimento."
            )

            : (
                "Deseja encaminhar esta denúncia anônima à Psicologia?\n\n" +

                "A identidade continuará indisponível."
            );


    if (
        !confirm(
            mensagem
        )
    ) {

        return;

    }


    const protocoloEncaminhamento =
        gerarProtocoloEncaminhamento(
            escola.codigo
        );


    const registro = {

        protocolo:
            protocoloEncaminhamento,

        protocoloOrigem:
            denuncia.protocolo,

        escolaCodigo:
            escola.codigo,

        escolaNome:
            escola.nome,

        perfil:
            "professor",

        origem:
            "encaminhamento-professor",

        tipo:
            "encaminhamento",

        anonimo:
            !identificado,

        contatoAluno:
            identificado
                ? denuncia.autorEmail || null
                : null,

        envolvimento:
            identificado
                ? denuncia.envolvimento || null
                : null,

        status:
            "solicitado",

        dadosCaso: {

            tipo:
                denuncia.tipo,

            local:
                denuncia.local,

            dataOcorrencia:
                denuncia.dataOcorrencia,

            urgencia:
                denuncia.urgencia,

            relato:
                denuncia.relato

        },

        criadoEm:
            new Date().toISOString()

    };


    const solicitacoes =
        obterSolicitacoesPsicologia();


    solicitacoes.push(
        registro
    );


    salvarSolicitacoesPsicologia(
        solicitacoes
    );


    denuncia.encaminhamentoPsicologico = {

        protocolo:
            protocoloEncaminhamento,

        criadoEm:
            new Date().toISOString()

    };


    garantirHistorico(
        denuncia
    );


    denuncia.historico.push({

        tipo:
            "encaminhamento",

        titulo:
            "Encaminhamento à Psicologia",

        descricao:
            identificado

                ? "O relato identificado foi encaminhado à Psicologia."

                : "O relato foi encaminhado à Psicologia preservando o anonimato.",

        registradoPor:
            "Equipe escolar",

        criadoEm:
            new Date().toISOString()

    });


    salvarDenuncias(
        denuncias
    );


    alert(
        "Relato encaminhado à Psicologia."
    );


    carregarPainel();
}


/* =========================================
   UTILIDADES
========================================= */

function garantirHistorico(
    denuncia
) {

    if (
        !Array.isArray(
            denuncia.historico
        )
    ) {

        denuncia.historico =
            [];

    }
}


function gerarProtocoloEncaminhamento(
    codigo
) {

    const agora =
        new Date();


    const numeros =
        new Uint32Array(2);


    crypto.getRandomValues(
        numeros
    );


    const aleatorio =
        (
            numeros[0].toString(16) +
            numeros[1].toString(16)
        )
        .toUpperCase()
        .substring(
            0,
            6
        );


    return (

        "ENC-" +
        codigo +
        "-" +
        agora.getFullYear() +
        String(
            agora.getMonth() + 1
        ).padStart(
            2,
            "0"
        ) +
        String(
            agora.getDate()
        ).padStart(
            2,
            "0"
        ) +
        "-" +
        aleatorio

    );
}


function obterDataHojeISO() {

    const agora =
        new Date();


    return (

        agora.getFullYear() +
        "-" +
        String(
            agora.getMonth() + 1
        ).padStart(
            2,
            "0"
        ) +
        "-" +
        String(
            agora.getDate()
        ).padStart(
            2,
            "0"
        )

    );
}


function criarDataLocal(
    dataISO
) {

    const partes =
        String(
            dataISO
        ).split(
            "-"
        );


    return new Date(

        Number(
            partes[0]
        ),

        Number(
            partes[1]
        ) - 1,

        Number(
            partes[2]
        )

    );
}


function selecionado(
    atual,
    valor
) {

    return (
        atual === valor
            ? "selected"
            : ""
    );
}


/* =========================================
   NORMALIZAR TEXTO
========================================= */

function normalizarTexto(
    texto
) {

    return String(
        texto
    )
        .toLowerCase()
        .normalize(
            "NFD"
        )
        .replace(
            /[\u0300-\u036f]/g,
            ""
        );
}


/* =========================================
   FORMATADORES
========================================= */

function formatarResponsavelCaso(
    valor
) {

    const opcoes = {

        coordenacao:
            "Coordenação Pedagógica",

        orientacao:
            "Orientação Educacional",

        direcao:
            "Direção",

        professor:
            "Professor responsável",

        equipe:
            "Equipe multidisciplinar"

    };


    return (
        opcoes[valor] ||
        "Não definido"
    );
}


function formatarEnvolvimento(
    valor
) {

    const opcoes = {

        comigo:
            "Aconteceu comigo",

        presenciei:
            "Presenciei com outra pessoa"

    };


    return (
        opcoes[valor] ||
        "Não informado"
    );
}


function formatarTipoAcao(
    valor
) {

    const opcoes = {

        acolhimento:
            "Acolhimento inicial realizado",

        conversa:
            "Conversa com estudante",

        familia:
            "Família contatada",

        orientacao:
            "Orientação pedagógica",

        observacao:
            "Observação no ambiente escolar",

        encaminhamento:
            "Encaminhamento interno",

        outro:
            "Outra ação realizada"

    };


    return (
        opcoes[valor] ||
        "Ação registrada"
    );
}


function formatarStatusPsicologia(
    valor
) {

    const opcoes = {

        solicitado:
            "Encaminhado",

        contato:
            "Em análise",

        agendado:
            "Acolhimento organizado",

        acolhimento:
            "Em acompanhamento",

        concluido:
            "Fluxo encerrado"

    };


    return (
        opcoes[valor] ||
        "Encaminhado"
    );
}


function formatarTipo(
    valor
) {

    const opcoes = {

        verbal:
            "Bullying verbal",

        fisico:
            "Bullying físico",

        virtual:
            "Cyberbullying",

        cyberbullying:
            "Cyberbullying",

        social:
            "Exclusão social",

        exclusao:
            "Exclusão social",

        discriminacao:
            "Discriminação",

        ameaca:
            "Ameaça ou intimidação",

        outro:
            "Outra situação"

    };


    return (
        opcoes[valor] ||
        formatarTextoGenerico(
            valor
        )
    );
}


function formatarLocal(
    valor
) {

    const opcoes = {

        sala:
            "Sala de aula",

        patio:
            "Pátio",

        intervalo:
            "Pátio ou intervalo",

        corredor:
            "Corredor",

        banheiro:
            "Banheiro",

        entrada:
            "Entrada ou saída da escola",

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
        opcoes[valor] ||
        formatarTextoGenerico(
            valor
        )
    );
}


function formatarUrgencia(
    valor
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
        opcoes[valor] ||
        "Não informada"
    );
}


function formatarStatus(
    valor
) {

    const opcoes = {

        novo:
            "Novo",

        acompanhamento:
            "Em acompanhamento",

        concluido:
            "Encerrado"

    };


    return (
        opcoes[valor] ||
        "Novo"
    );
}


function formatarData(
    valor
) {

    if (!valor) {

        return "Data não informada";

    }


    const partes =
        String(
            valor
        ).split(
            "-"
        );


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


    return valor;
}


function formatarDataHora(
    valor
) {

    if (!valor) {

        return "Data não informada";

    }


    return new Date(
        valor
    ).toLocaleString(
        "pt-BR"
    );
}


function formatarTextoGenerico(
    valor
) {

    if (!valor) {

        return "Não informado";

    }


    const texto =
        String(
            valor
        ).replace(
            /[-_]/g,
            " "
        );


    return (

        texto
            .charAt(0)
            .toUpperCase()

        +

        texto.slice(1)

    );
}


function limitarTexto(
    texto,
    limite
) {

    if (!texto) {

        return "";

    }


    return (
        texto.length <= limite

            ? texto

            : texto.substring(
                  0,
                  limite
              ) +
              "..."
    );
}


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


/* =========================================
   EXECUTAR
========================================= */

injetarEstilosComplementares();

criarAreaFiltros();

criarPainelPrazos();

criarPainelTriagem();

carregarPainel();