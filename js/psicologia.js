/* =========================================
   SAFESCHOOL
   PAINEL DA PSICOLOGIA
========================================= */


/* =========================================
   ELEMENTOS
========================================= */

const numeroNovas =
    document.getElementById(
        "numeroNovas"
    );


const numeroRapidos =
    document.getElementById(
        "numeroRapidos"
    );


const numeroAgendados =
    document.getElementById(
        "numeroAgendados"
    );


const numeroAcolhimentos =
    document.getElementById(
        "numeroAcolhimentos"
    );


const numeroConcluidos =
    document.getElementById(
        "numeroConcluidos"
    );


const contadorSolicitacoes =
    document.getElementById(
        "contadorSolicitacoes"
    );


const listaSolicitacoes =
    document.getElementById(
        "listaSolicitacoes"
    );


const estadoVazio =
    document.getElementById(
        "estadoVazio"
    );


const contadorEncaminhamentos =
    document.getElementById(
        "contadorEncaminhamentos"
    );


const listaEncaminhamentos =
    document.getElementById(
        "listaEncaminhamentos"
    );


const estadoEncaminhamentos =
    document.getElementById(
        "estadoEncaminhamentos"
    );



/* =========================================
   ESTILOS COMPLEMENTARES
========================================= */

function injetarEstilosPsicologia() {


    if (
        document.getElementById(
            "estilosEncaminhamentoPsicologia"
        )
    ) {


        return;


    }



    const estilo =
        document.createElement(
            "style"
        );


    estilo.id =
        "estilosEncaminhamentoPsicologia";


    estilo.textContent = `

        .identidade-encaminhamento {

            margin:
                14px
                0
                18px;

            padding:
                15px
                17px;

            border-radius:
                12px;

            display:
                flex;

            flex-wrap:
                wrap;

            align-items:
                center;

            gap:
                10px
                18px;

        }


        .identidade-encaminhamento.identificado {

            background:
                #f0f6ff;

            border:
                1px
                solid
                #d6e5f8;

        }


        .identidade-encaminhamento.anonimo {

            background:
                #f7f7fb;

            border:
                1px
                solid
                #e5e5ee;

        }


        .identidade-encaminhamento strong {

            color:
                #20205f;

            font-size:
                11px;

        }


        .identidade-encaminhamento span {

            color:
                #6f6f8d;

            font-size:
                10px;

        }


        .aviso-anonimato-psicologia {

            margin-bottom:
                16px;

            padding:
                13px;

            border-radius:
                10px;

            background:
                #f8f8fb;

            color:
                #77738e;

            font-size:
                10px;

            line-height:
                1.55;

        }


        .aviso-identificado-psicologia {

            margin-bottom:
                16px;

            padding:
                13px;

            border-radius:
                10px;

            background:
                #f2efff;

            color:
                #655d82;

            font-size:
                10px;

            line-height:
                1.55;

        }

    `;


    document.head.appendChild(
        estilo
    );


}



/* =========================================
   CARREGAR PAINEL
========================================= */

function carregarPainelPsicologia() {


    const escola =
        window.SafeSchoolEscola.obter();



    if (!escola) {


        mostrarPainelVazio();

        return;


    }



    const registros =
        obterSolicitacoes();



    /* =========================================
       SOMENTE A ESCOLA ATUAL
    ========================================== */

    const registrosDaEscola =

        registros.filter(

            function (item) {


                return (

                    item.escolaCodigo ===
                    escola.codigo

                );


            }

        );



    /* =========================================
       MAIS RECENTES PRIMEIRO
    ========================================== */

    registrosDaEscola.sort(

        function (a, b) {


            return (

                new Date(b.criadoEm) -
                new Date(a.criadoEm)

            );


        }

    );



    /* =========================================
       SEPARAR ORIGENS
    ========================================== */

    const solicitacoesDosAlunos =

        registrosDaEscola.filter(

            function (item) {


                return (

                    item.origem ===
                    "solicitacao-aluno"

                );


            }

        );



    const encaminhamentos =

        registrosDaEscola.filter(

            function (item) {


                return (

                    item.origem ===
                    "encaminhamento-professor"

                );


            }

        );



    atualizarResumo(
        registrosDaEscola
    );


    mostrarSolicitacoes(
        solicitacoesDosAlunos
    );


    mostrarEncaminhamentos(
        encaminhamentos
    );


}



/* =========================================
   RECUPERAR REGISTROS
========================================= */

function obterSolicitacoes() {


    const dados =
        sessionStorage.getItem(
            "solicitacoesPsicologicasSafeSchool"
        );



    if (!dados) {


        return [];


    }



    try {


        const registros =
            JSON.parse(
                dados
            );


        return Array.isArray(
            registros
        )
            ? registros
            : [];


    } catch (erro) {


        return [];


    }


}



/* =========================================
   SALVAR REGISTROS
========================================= */

function salvarSolicitacoes(
    registros
) {


    sessionStorage.setItem(

        "solicitacoesPsicologicasSafeSchool",

        JSON.stringify(
            registros
        )

    );


}



/* =========================================
   ATUALIZAR RESUMO
========================================= */

function atualizarResumo(
    registros
) {


    const novas =

        registros.filter(

            function (item) {


                return (
                    item.status ===
                    "solicitado"
                );


            }

        ).length;



    const rapidos =

        registros.filter(

            function (item) {


                return (

                    item.origem ===
                    "solicitacao-aluno"

                    &&

                    item.tipo ===
                    "rapido"

                    &&

                    item.status !==
                    "concluido"

                );


            }

        ).length;



    const agendados =

        registros.filter(

            function (item) {


                return (
                    item.status ===
                    "agendado"
                );


            }

        ).length;



    const acolhimentos =

        registros.filter(

            function (item) {


                return (
                    item.status ===
                    "acolhimento"
                );


            }

        ).length;



    const concluidos =

        registros.filter(

            function (item) {


                return (
                    item.status ===
                    "concluido"
                );


            }

        ).length;



    numeroNovas.textContent =
        novas;


    numeroRapidos.textContent =
        rapidos;


    numeroAgendados.textContent =
        agendados;


    numeroAcolhimentos.textContent =
        acolhimentos;


    numeroConcluidos.textContent =
        concluidos;


}



/* =========================================
   SOLICITAÇÕES DIRETAS DOS ALUNOS
========================================= */

function mostrarSolicitacoes(
    solicitacoes
) {


    listaSolicitacoes.innerHTML =
        "";



    contadorSolicitacoes.textContent =

        solicitacoes.length === 1
            ? "1 solicitação"
            : solicitacoes.length +
              " solicitações";



    if (
        solicitacoes.length === 0
    ) {


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

        function (solicitacao) {


            listaSolicitacoes.appendChild(

                criarCardSolicitacaoAluno(
                    solicitacao
                )

            );


        }

    );


}



/* =========================================
   ENCAMINHAMENTOS DA EQUIPE
========================================= */

function mostrarEncaminhamentos(
    encaminhamentos
) {


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

        function (encaminhamento) {


            listaEncaminhamentos.appendChild(

                criarCardEncaminhamento(
                    encaminhamento
                )

            );


        }

    );


}



/* =========================================
   CARD DO PEDIDO DIRETO DO ALUNO
========================================= */

function criarCardSolicitacaoAluno(
    solicitacao
) {


    const card =
        document.createElement(
            "article"
        );


    card.className =
        "card-solicitacao";



    const tipo =
        escaparHTML(
            formatarTipo(
                solicitacao.tipo
            )
        );


    const periodo =
        escaparHTML(
            formatarPeriodo(
                solicitacao.periodo
            )
        );


    const status =
        escaparHTML(
            formatarStatus(
                solicitacao.status
            )
        );


    const contato =
        escaparHTML(
            solicitacao.contatoAluno ||
            "Conta não informada"
        );


    const mensagem =
        escaparHTML(
            solicitacao.mensagem ||
            ""
        );


    const protocolo =
        escaparHTML(
            solicitacao.protocolo
        );


    const data =
        escaparHTML(
            formatarDataHora(
                solicitacao.criadoEm
            )
        );



    card.innerHTML = `

        <div class="solicitacao-topo">

            <div>

                <span class="protocolo-solicitacao">

                    ${protocolo}

                </span>


                <h3>

                    ${tipo}

                </h3>

            </div>


            <span class="status-solicitacao ${obterClasseStatus(
                solicitacao.status
            )}">

                ${status}

            </span>

        </div>


        <div class="solicitacao-info">

            <span>
                👤 ${contato}
            </span>

            <span>
                🕐 Preferência: ${periodo}
            </span>

            <span>
                📅 ${data}
            </span>

        </div>


        ${
            mensagem
                ? `

                    <div class="mensagem-aluno">

                        <strong>
                            Mensagem do aluno
                        </strong>

                        <p>
                            ${mensagem}
                        </p>

                    </div>

                `
                : `

                    <div class="mensagem-aluno sem-mensagem">

                        <p>
                            O aluno não deixou mensagem adicional.
                        </p>

                    </div>

                `
        }


        <div class="solicitacao-aviso">

            🔐 Informações reservadas à área de Psicologia.

        </div>


        <div class="acoes-solicitacao">

            ${criarBotoesAluno(
                solicitacao
            )}

        </div>

    `;



    configurarBotoes(

        card,

        solicitacao.protocolo

    );



    return card;


}



/* =========================================
   CARD DE ENCAMINHAMENTO
========================================= */

function criarCardEncaminhamento(
    encaminhamento
) {


    const card =
        document.createElement(
            "article"
        );


    card.className =
        "card-solicitacao";



    const dadosCaso =
        encaminhamento.dadosCaso ||
        {};



    const protocolo =
        escaparHTML(
            encaminhamento.protocolo
        );


    const protocoloOrigem =
        escaparHTML(
            encaminhamento.protocoloOrigem ||
            "Não informado"
        );


    const status =
        escaparHTML(
            formatarStatusEncaminhamento(
                encaminhamento.status
            )
        );


    const tipoCaso =
        escaparHTML(
            formatarTipoCaso(
                dadosCaso.tipo
            )
        );


    const local =
        escaparHTML(
            formatarLocal(
                dadosCaso.local
            )
        );


    const urgencia =
        escaparHTML(
            formatarUrgencia(
                dadosCaso.urgencia
            )
        );


    const dataOcorrencia =
        escaparHTML(
            formatarData(
                dadosCaso.dataOcorrencia
            )
        );


    const relato =
        escaparHTML(
            dadosCaso.relato ||
            "Relato não informado."
        );


    const criadoEm =
        escaparHTML(
            formatarDataHora(
                encaminhamento.criadoEm
            )
        );



    /* =========================================
       IDENTIDADE
    ========================================== */

    const identificado =
        encaminhamento.anonimo === false;



    let blocoIdentidade =
        "";



    let avisoPrivacidade =
        "";



    if (identificado) {


        const contato =
            escaparHTML(
                encaminhamento.contatoAluno ||
                "Conta não informada"
            );


        const envolvimento =
            escaparHTML(
                formatarEnvolvimento(
                    encaminhamento.envolvimento
                )
            );


        blocoIdentidade = `

            <div class="identidade-encaminhamento identificado">

                <strong>

                    👤 Relato identificado

                </strong>


                <span>

                    Conta do aluno: ${contato}

                </span>


                <span>

                    Situação: ${envolvimento}

                </span>

            </div>

        `;



        avisoPrivacidade = `

            <div class="aviso-identificado-psicologia">

                💜 Este caso veio de um relato identificado.
                O contato do aluno pode ser utilizado para organizar
                acolhimento, mas as informações do atendimento
                psicológico não devem ser disponibilizadas
                automaticamente à equipe pedagógica.

            </div>

        `;


    } else {


        blocoIdentidade = `

            <div class="identidade-encaminhamento anonimo">

                <strong>

                    🔒 Relato anônimo

                </strong>


                <span>

                    Identidade do denunciante não disponível

                </span>

            </div>

        `;



        avisoPrivacidade = `

            <div class="aviso-anonimato-psicologia">

                🔒 Este caso veio do canal anônimo.
                O SafeSchool não possui a identidade do denunciante
                nem um contato para atendimento direto.
                A Psicologia poderá analisar a situação
                e apoiar a equipe escolar na condução do caso.

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


            <span class="status-solicitacao ${obterClasseStatus(
                encaminhamento.status
            )}">

                ${status}

            </span>

        </div>


        ${blocoIdentidade}


        <div class="solicitacao-info">

            <span>

                🔗 Caso original:
                ${protocoloOrigem}

            </span>


            <span>

                📅 Encaminhado em:
                ${criadoEm}

            </span>

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

                <b>Data da ocorrência:</b>
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

                ${relato}

            </p>

        </div>


        ${avisoPrivacidade}


        <div class="acoes-solicitacao">

            ${criarBotoesEncaminhamento(
                encaminhamento
            )}

        </div>

    `;



    configurarBotoes(

        card,

        encaminhamento.protocolo

    );



    return card;


}



/* =========================================
   BOTÕES DO PEDIDO DO ALUNO
========================================= */

function criarBotoesAluno(
    solicitacao
) {


    if (
        solicitacao.status ===
        "solicitado"
    ) {


        return `

            <button
                type="button"
                class="botao-acao principal"
                data-novo-status="contato"
            >

                Iniciar contato

            </button>

        `;


    }



    if (
        solicitacao.status ===
        "contato"
    ) {


        return `

            <button
                type="button"
                class="botao-acao"
                data-novo-status="agendado"
            >

                Marcar como agendado

            </button>


            <button
                type="button"
                class="botao-acao principal"
                data-novo-status="acolhimento"
            >

                Iniciar acolhimento

            </button>

        `;


    }



    if (
        solicitacao.status ===
        "agendado"
    ) {


        return `

            <button
                type="button"
                class="botao-acao principal"
                data-novo-status="acolhimento"
            >

                Iniciar acolhimento

            </button>

        `;


    }



    if (
        solicitacao.status ===
        "acolhimento"
    ) {


        return `

            <button
                type="button"
                class="botao-acao concluir"
                data-novo-status="concluido"
            >

                Concluir acolhimento

            </button>

        `;


    }



    return `

        <span class="acolhimento-finalizado">

            ✓ Acolhimento concluído

        </span>

    `;


}



/* =========================================
   BOTÕES DOS ENCAMINHAMENTOS
========================================= */

function criarBotoesEncaminhamento(
    encaminhamento
) {


    if (
        encaminhamento.status ===
        "solicitado"
    ) {


        return `

            <button
                type="button"
                class="botao-acao principal"
                data-novo-status="contato"
            >

                Iniciar análise

            </button>

        `;


    }



    if (
        encaminhamento.status ===
        "contato"
    ) {


        return `

            <button
                type="button"
                class="botao-acao principal"
                data-novo-status="acolhimento"
            >

                Iniciar acompanhamento

            </button>

        `;


    }



    if (
        encaminhamento.status ===
        "acolhimento"
    ) {


        return `

            <button
                type="button"
                class="botao-acao concluir"
                data-novo-status="concluido"
            >

                Concluir acompanhamento

            </button>

        `;


    }



    return `

        <span class="acolhimento-finalizado">

            ✓ Acompanhamento concluído

        </span>

    `;


}



/* =========================================
   CONFIGURAR BOTÕES
========================================= */

function configurarBotoes(
    card,
    protocolo
) {


    const botoes =
        card.querySelectorAll(
            "[data-novo-status]"
        );



    botoes.forEach(

        function (botao) {


            botao.addEventListener(

                "click",

                function () {


                    alterarStatus(

                        protocolo,

                        botao.getAttribute(
                            "data-novo-status"
                        )

                    );


                }

            );


        }

    );


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


        alert(
            "Não foi possível identificar a escola."
        );


        return;


    }



    const registros =
        obterSolicitacoes();



    const registro =

        registros.find(

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



    if (!registro) {


        alert(
            "Não foi possível localizar este registro."
        );


        return;


    }



    let mensagem =
        "Deseja atualizar este registro?";



    if (
        registro.origem ===
        "encaminhamento-professor"
    ) {


        if (
            novoStatus === "contato"
        ) {


            mensagem =
                "Deseja iniciar a análise deste encaminhamento?";


        }


        else if (
            novoStatus === "acolhimento"
        ) {


            mensagem =
                "Deseja iniciar o acompanhamento deste caso?";


        }


        else if (
            novoStatus === "concluido"
        ) {


            mensagem =
                "Deseja concluir o acompanhamento deste encaminhamento?";


        }


    } else {


        if (
            novoStatus === "contato"
        ) {


            mensagem =
                "Deseja registrar que o primeiro contato foi iniciado?";


        }


        else if (
            novoStatus === "agendado"
        ) {


            mensagem =
                "Deseja marcar esta solicitação como agendada?";


        }


        else if (
            novoStatus === "acolhimento"
        ) {


            mensagem =
                "Deseja iniciar o acolhimento desta solicitação?";


        }


        else if (
            novoStatus === "concluido"
        ) {


            mensagem =
                "Deseja encerrar o fluxo desta solicitação como concluído?";


        }


    }



    if (
        !confirm(
            mensagem
        )
    ) {


        return;


    }



    registro.status =
        novoStatus;


    registro.atualizadoEm =
        new Date().toISOString();



    salvarSolicitacoes(
        registros
    );


    carregarPainelPsicologia();


}



/* =========================================
   STATUS VISUAL
========================================= */

function obterClasseStatus(
    status
) {


    if (
        status === "contato"
    ) {


        return "solicitacao-contato";


    }



    if (
        status === "agendado"
    ) {


        return "solicitacao-agendada";


    }



    if (
        status === "acolhimento"
    ) {


        return "solicitacao-acolhimento";


    }



    if (
        status === "concluido"
    ) {


        return "solicitacao-concluida";


    }



    return "solicitacao-nova";


}



/* =========================================
   FORMATAR DADOS
========================================= */

function formatarTipo(
    tipo
) {


    const tipos = {

        rapido:
            "Contato assim que possível",

        agendamento:
            "Solicitação de agendamento",

        orientacao:
            "Pedido de orientação"

    };


    return (
        tipos[tipo] ||
        "Solicitação de apoio"
    );


}



function formatarEnvolvimento(
    envolvimento
) {


    const opcoes = {

        comigo:
            "Aconteceu comigo",

        presenciei:
            "Presenciei com outra pessoa"

    };


    return (
        opcoes[envolvimento] ||
        "Não informado"
    );


}



function formatarStatus(
    status
) {


    const opcoes = {

        solicitado:
            "Aguardando contato",

        contato:
            "Contato iniciado",

        agendado:
            "Agendado",

        acolhimento:
            "Em acolhimento",

        concluido:
            "Concluído"

    };


    return (
        opcoes[status] ||
        "Aguardando contato"
    );


}



function formatarStatusEncaminhamento(
    status
) {


    const opcoes = {

        solicitado:
            "Recebido",

        contato:
            "Em análise",

        acolhimento:
            "Em acompanhamento",

        concluido:
            "Concluído"

    };


    return (
        opcoes[status] ||
        "Recebido"
    );


}



function formatarPeriodo(
    periodo
) {


    const periodos = {

        manha:
            "Manhã",

        tarde:
            "Tarde",

        qualquer:
            "Qualquer horário"

    };


    return (
        periodos[periodo] ||
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
========================================= */

function formatarData(
    data
) {


    if (!data) {


        return "Não informada";


    }



    const partes =
        String(data).split("-");



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


    return data.toLocaleString(
        "pt-BR"
    );


}



/* =========================================
   TEXTO GENÉRICO
========================================= */

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

        textoLimpo
            .charAt(0)
            .toUpperCase()

        +

        textoLimpo.slice(1)

    );


}



/* =========================================
   PROTEGER TEXTO
========================================= */

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
   PAINEL VAZIO
========================================= */

function mostrarPainelVazio() {


    listaSolicitacoes.innerHTML =
        "";


    listaEncaminhamentos.innerHTML =
        "";


    listaSolicitacoes.style.display =
        "none";


    listaEncaminhamentos.style.display =
        "none";


    estadoVazio.style.display =
        "block";


    estadoEncaminhamentos.style.display =
        "flex";


    numeroNovas.textContent =
        "0";


    numeroRapidos.textContent =
        "0";


    numeroAgendados.textContent =
        "0";


    numeroAcolhimentos.textContent =
        "0";


    numeroConcluidos.textContent =
        "0";


    contadorSolicitacoes.textContent =
        "0 solicitações";


    contadorEncaminhamentos.textContent =
        "0 encaminhamentos";


}



/* =========================================
   EXECUTAR
========================================= */

injetarEstilosPsicologia();

carregarPainelPsicologia();