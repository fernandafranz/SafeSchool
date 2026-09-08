/* =========================================
   SAFESCHOOL
   PAINEL DE INDICADORES
========================================= */

(function () {

    "use strict";


    /* =========================================
       PROTEÇÃO DE ACESSO
    ========================================= */

    function verificarAcessoProfessor() {

        const perfil =
            (
                sessionStorage.getItem(
                    "perfilSafeSchool"
                ) || ""
            )
            .trim()
            .toLowerCase();


        if (
            perfil === "professor"
        ) {

            return true;

        }


        const codigoEscola =
            sessionStorage.getItem(
                "codigoEscolaSafeSchool"
            );


        let destino =
            "login.html?acesso=restrito";


        if (
            codigoEscola
        ) {

            destino +=

                "&escola="

                +

                encodeURIComponent(
                    codigoEscola
                );

        }


        window.location.href =
            destino;


        return false;

    }


    if (
        !verificarAcessoProfessor()
    ) {

        return;

    }


    /* =========================================
       INÍCIO
    ========================================= */

    document.addEventListener(

        "DOMContentLoaded",

        function () {


            /* =====================================
               ELEMENTOS
            ====================================== */

            const nomeEscola =
                document.getElementById(
                    "nomeEscolaIndicadores"
                );


            const dataAtualizacao =
                document.getElementById(
                    "dataAtualizacao"
                );


            const indicadorTotal =
                document.getElementById(
                    "indicadorTotalRelatos"
                );


            const indicadorAnonimos =
                document.getElementById(
                    "indicadorAnonimos"
                );


            const indicadorIdentificados =
                document.getElementById(
                    "indicadorIdentificados"
                );


            const indicadorAtencao =
                document.getElementById(
                    "indicadorAtencao"
                );


            const indicadorSolicitacoesPsico =
                document.getElementById(
                    "indicadorSolicitacoesPsico"
                );


            const indicadorEncaminhamentosPsico =
                document.getElementById(
                    "indicadorEncaminhamentosPsico"
                );


            const indicadorTotalApoioPsico =
                document.getElementById(
                    "indicadorTotalApoioPsico"
                );


            const graficoStatus =
                document.getElementById(
                    "graficoStatus"
                );


            const graficoTipos =
                document.getElementById(
                    "graficoTipos"
                );


            const graficoLocais =
                document.getElementById(
                    "graficoLocais"
                );


            const graficoMeses =
                document.getElementById(
                    "graficoMeses"
                );


            const taxaConcluidos =
                document.getElementById(
                    "taxaConcluidos"
                );


            const circuloTaxa =
                document.getElementById(
                    "circuloTaxa"
                );


            const mensagemLeitura =
                document.getElementById(
                    "mensagemLeituraPedagogica"
                );


            /* =====================================
               UTILIDADES
            ====================================== */

            function texto(
                valor
            ) {

                return String(
                    valor ?? ""
                )
                    .trim();

            }


            function normalizar(
                valor
            ) {

                return texto(
                    valor
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


            function escaparHTML(
                valor
            ) {

                const elemento =
                    document.createElement(
                        "div"
                    );


                elemento.textContent =
                    valor ?? "";


                return elemento.innerHTML;

            }


            /* =====================================
               LER SESSION STORAGE
            ====================================== */

            function lerListaSessao(
                chave
            ) {

                const dados =
                    sessionStorage.getItem(
                        chave
                    );


                if (
                    !dados
                ) {

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

                catch (
                    erro
                ) {

                    return [];

                }

            }


            /* =====================================
               ESCOLA ATUAL
            ====================================== */

            function obterEscolaAtual() {

                if (
                    window.SafeSchoolEscola

                    &&

                    typeof window.SafeSchoolEscola.obter
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
                    sessionStorage.getItem(
                        "codigoEscolaSafeSchool"
                    );


                const nome =
                    sessionStorage.getItem(
                        "nomeEscolaSafeSchool"
                    );


                return {

                    codigo:
                        codigo || "ESC001",

                    nome:
                        nome ||
                        "Escola Demonstrativa SafeSchool"

                };

            }


            const escola =
                obterEscolaAtual();


            /* =====================================
               DADOS DA DEMONSTRAÇÃO
            ====================================== */

            const relatos =
                lerListaSessao(
                    "denunciasSafeSchool"
                )
                    .filter(

                        function (
                            denuncia
                        ) {

                            return (

                                denuncia.escolaCodigo

                                ===

                                escola.codigo

                            );

                        }

                    );


            const solicitacoesPsicologia =
                lerListaSessao(
                    "solicitacoesPsicologicasSafeSchool"
                )
                    .filter(

                        function (
                            solicitacao
                        ) {

                            return (

                                solicitacao.escolaCodigo

                                ===

                                escola.codigo

                            );

                        }

                    );


            /* =====================================
               IDENTIFICAÇÃO
            ====================================== */

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


            /* =====================================
               TIPOS
            ====================================== */

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


                if (
                    opcoes[valor]
                ) {

                    return opcoes[valor];

                }


                if (
                    !valor
                ) {

                    return "Não informado";

                }


                return formatarTextoGenerico(
                    valor
                );

            }


            /* =====================================
               LOCAIS
            ====================================== */

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


                if (
                    opcoes[valor]
                ) {

                    return opcoes[valor];

                }


                if (
                    !valor
                ) {

                    return "Não informado";

                }


                return formatarTextoGenerico(
                    valor
                );

            }


            function formatarTextoGenerico(
                valor
            ) {

                const resultado =
                    texto(
                        valor
                    )
                        .replace(
                            /[-_]/g,
                            " "
                        );


                if (
                    !resultado
                ) {

                    return "Não informado";

                }


                return (

                    resultado
                        .charAt(0)
                        .toUpperCase()

                    +

                    resultado.slice(
                        1
                    )

                );

            }


            /* =====================================
               CONTAGEM
            ====================================== */

            function contarPor(
                lista,
                obterValor
            ) {

                const resultado =
                    {};


                lista.forEach(

                    function (
                        item
                    ) {

                        const chave =
                            obterValor(
                                item
                            );


                        resultado[chave] =
                            (
                                resultado[chave]
                                || 0
                            )
                            + 1;

                    }

                );


                return resultado;

            }


            /* =====================================
               BARRAS
            ====================================== */

            function renderizarBarras(
                elemento,
                dados,
                manterZeros
            ) {

                if (
                    !elemento
                ) {

                    return;

                }


                elemento.innerHTML =
                    "";


                let entradas =
                    Object.entries(
                        dados
                    );


                if (
                    !manterZeros
                ) {

                    entradas =
                        entradas.filter(

                            function (
                                item
                            ) {

                                return (
                                    item[1] > 0
                                );

                            }

                        );

                }


                entradas.sort(

                    function (
                        a,
                        b
                    ) {

                        return (
                            b[1] -
                            a[1]
                        );

                    }

                );


                if (
                    entradas.length === 0
                ) {

                    elemento.innerHTML = `

                        <div class="sem-dados">

                            Ainda não há dados suficientes
                            para esta visualização.

                        </div>

                    `;


                    return;

                }


                const maior =
                    Math.max(

                        ...entradas.map(

                            function (
                                item
                            ) {

                                return item[1];

                            }

                        ),

                        1

                    );


                entradas.forEach(

                    function (
                        entrada
                    ) {

                        const rotulo =
                            entrada[0];


                        const quantidade =
                            entrada[1];


                        const percentual =

                            quantidade === 0

                                ? 0

                                : (
                                    quantidade
                                    /
                                    maior
                                    *
                                    100
                                );


                        const linha =
                            document.createElement(
                                "div"
                            );


                        linha.className =
                            "item-barra";


                        linha.innerHTML = `

                            <div class="barra-cabecalho">

                                <span>

                                    ${escaparHTML(
                                        rotulo
                                    )}

                                </span>


                                <strong>

                                    ${quantidade}

                                </strong>

                            </div>


                            <div class="barra-fundo">

                                <div
                                    class="barra-preenchimento"
                                    style="width: ${percentual}%"
                                >
                                </div>

                            </div>

                        `;


                        elemento.appendChild(
                            linha
                        );

                    }

                );

            }


            /* =====================================
               PSICOLOGIA
            ====================================== */

            function ehEncaminhamentoProfessor(
                solicitacao
            ) {

                return (

                    solicitacao.origem ===
                    "encaminhamento-professor"

                );

            }


            const encaminhamentosPsicologia =
                solicitacoesPsicologia
                    .filter(
                        ehEncaminhamentoProfessor
                    );


            const solicitacoesDiretasPsicologia =
                solicitacoesPsicologia
                    .filter(

                        function (
                            solicitacao
                        ) {

                            return (
                                !ehEncaminhamentoProfessor(
                                    solicitacao
                                )
                            );

                        }

                    );


            /* =====================================
               DATAS
            ====================================== */

            function obterDataRegistro(
                denuncia
            ) {

                const valor =

                    denuncia.criadoEm

                    ||

                    denuncia.dataRegistro

                    ||

                    denuncia.dataEnvio

                    ||

                    null;


                if (
                    !valor
                ) {

                    return null;

                }


                const data =
                    new Date(
                        valor
                    );


                if (
                    Number.isNaN(
                        data.getTime()
                    )
                ) {

                    return null;

                }


                return data;

            }


            /* =====================================
               ÚLTIMOS 6 MESES
            ====================================== */

            function gerarUltimosMeses() {

                const agora =
                    new Date();


                const meses =
                    [];


                for (
                    let i = 5;
                    i >= 0;
                    i--
                ) {

                    const data =
                        new Date(

                            agora.getFullYear(),

                            agora.getMonth() - i,

                            1

                        );


                    meses.push({

                        ano:
                            data.getFullYear(),

                        mes:
                            data.getMonth(),

                        nome:
                            data
                                .toLocaleDateString(
                                    "pt-BR",
                                    {
                                        month:
                                            "short"
                                    }
                                )
                                .replace(
                                    ".",
                                    ""
                                )

                    });

                }


                return meses;

            }


            /* =====================================
               GRÁFICO DE EVOLUÇÃO
            ====================================== */

            function renderizarMeses() {

                if (
                    !graficoMeses
                ) {

                    return;

                }


                const meses =
                    gerarUltimosMeses();


                const dados =
                    meses.map(

                        function (
                            mes
                        ) {

                            const quantidade =
                                relatos.filter(

                                    function (
                                        denuncia
                                    ) {

                                        const data =
                                            obterDataRegistro(
                                                denuncia
                                            );


                                        if (
                                            !data
                                        ) {

                                            return false;

                                        }


                                        return (

                                            data.getFullYear()
                                            ===
                                            mes.ano

                                            &&

                                            data.getMonth()
                                            ===
                                            mes.mes

                                        );

                                    }

                                ).length;


                            return {

                                nome:
                                    mes.nome,

                                quantidade:
                                    quantidade

                            };

                        }

                    );


                const maior =
                    Math.max(

                        ...dados.map(

                            function (
                                item
                            ) {

                                return item.quantidade;

                            }

                        ),

                        1

                    );


                graficoMeses.innerHTML =
                    "";


                dados.forEach(

                    function (
                        item
                    ) {

                        const altura =

                            item.quantidade === 0

                                ? 4

                                : Math.max(

                                    15,

                                    (
                                        item.quantidade
                                        /
                                        maior
                                    )

                                    *

                                    150

                                );


                        const coluna =
                            document.createElement(
                                "div"
                            );


                        coluna.className =
                            "mes-item";


                        coluna.innerHTML = `

                            <div class="mes-valor">

                                ${item.quantidade}

                            </div>


                            <div class="mes-coluna-area">

                                <div
                                    class="mes-coluna"
                                    style="height: ${altura}px"
                                >
                                </div>

                            </div>


                            <div class="mes-nome">

                                ${escaparHTML(
                                    item.nome
                                )}

                            </div>

                        `;


                        graficoMeses.appendChild(
                            coluna
                        );

                    }

                );

            }


            /* =====================================
               LEITURA PEDAGÓGICA
            ====================================== */

            function atualizarLeituraPedagogica(
                tipos,
                locais
            ) {

                if (
                    !mensagemLeitura
                ) {

                    return;

                }


                if (
                    relatos.length === 0
                ) {

                    mensagemLeitura.textContent =

                        "Ainda não existem relatos nesta demonstração. Conforme novos registros forem realizados, o SafeSchool poderá ajudar a equipe a observar padrões e organizar prioridades.";


                    return;

                }


                const tiposOrdenados =
                    Object.entries(
                        tipos
                    )
                        .sort(

                            function (
                                a,
                                b
                            ) {

                                return (
                                    b[1] -
                                    a[1]
                                );

                            }

                        );


                const locaisOrdenados =
                    Object.entries(
                        locais
                    )
                        .sort(

                            function (
                                a,
                                b
                            ) {

                                return (
                                    b[1] -
                                    a[1]
                                );

                            }

                        );


                let mensagem =

                    "Até o momento, o SafeSchool registra "

                    +

                    relatos.length

                    +

                    (
                        relatos.length === 1

                            ? " relato para esta escola."

                            : " relatos para esta escola."
                    );


                if (
                    tiposOrdenados.length > 0
                ) {

                    mensagem +=

                        " A categoria mais registrada é "

                        +

                        tiposOrdenados[0][0]

                        +

                        ".";

                }


                if (
                    locaisOrdenados.length > 0

                    &&

                    locaisOrdenados[0][0] !==
                    "Não informado"
                ) {

                    mensagem +=

                        " O local que aparece com maior frequência é "

                        +

                        locaisOrdenados[0][0]

                        +

                        ".";

                }


                mensagem +=

                    " Esses dados apoiam a leitura da equipe, mas devem sempre ser interpretados junto ao contexto escolar e à escuta dos estudantes.";


                mensagemLeitura.textContent =
                    mensagem;

            }


            /* =====================================
               RENDERIZAÇÃO
            ====================================== */

            function renderizar() {


                /* =================================
                   ESCOLA
                ================================== */

                if (
                    nomeEscola
                ) {

                    nomeEscola.textContent =
                        escola.nome;

                }


                if (
                    dataAtualizacao
                ) {

                    dataAtualizacao.textContent =

                        new Date()
                            .toLocaleString(
                                "pt-BR",
                                {
                                    day:
                                        "2-digit",

                                    month:
                                        "2-digit",

                                    year:
                                        "numeric",

                                    hour:
                                        "2-digit",

                                    minute:
                                        "2-digit"
                                }
                            );

                }


                /* =================================
                   RESUMO
                ================================== */

                const identificados =
                    relatos.filter(
                        relatoEhIdentificado
                    ).length;


                const anonimos =

                    relatos.length

                    -

                    identificados;


                const altaPrioridade =
                    relatos.filter(

                        function (
                            denuncia
                        ) {

                            return (

                                denuncia.urgencia ===
                                "alta"

                            );

                        }

                    ).length;


                if (
                    indicadorTotal
                ) {

                    indicadorTotal.textContent =
                        relatos.length;

                }


                if (
                    indicadorAnonimos
                ) {

                    indicadorAnonimos.textContent =
                        anonimos;

                }


                if (
                    indicadorIdentificados
                ) {

                    indicadorIdentificados.textContent =
                        identificados;

                }


                if (
                    indicadorAtencao
                ) {

                    indicadorAtencao.textContent =
                        altaPrioridade;

                }


                /* =================================
                   ACOMPANHAMENTOS
                ================================== */

                const status = {

                    "Novos relatos":
                        relatos.filter(

                            function (
                                denuncia
                            ) {

                                return (
                                    denuncia.status ===
                                    "novo"
                                );

                            }

                        ).length,


                    "Em acompanhamento":
                        relatos.filter(

                            function (
                                denuncia
                            ) {

                                return (
                                    denuncia.status ===
                                    "acompanhamento"
                                );

                            }

                        ).length,


                    "Acompanhamentos encerrados":
                        relatos.filter(

                            function (
                                denuncia
                            ) {

                                return (
                                    denuncia.status ===
                                    "concluido"
                                );

                            }

                        ).length

                };


                renderizarBarras(

                    graficoStatus,

                    status,

                    true

                );


                /* =================================
                   TAXA OPERACIONAL
                ================================== */

                const concluidos =
                    status[
                        "Acompanhamentos encerrados"
                    ];


                const taxa =

                    relatos.length > 0

                        ? Math.round(

                            (
                                concluidos
                                /
                                relatos.length
                            )

                            *

                            100

                        )

                        : 0;


                if (
                    taxaConcluidos
                ) {

                    taxaConcluidos.textContent =
                        taxa + "%";

                }


                if (
                    circuloTaxa
                ) {

                    circuloTaxa.style.background =

                        `conic-gradient(
                            #7b5ad2 ${taxa * 3.6}deg,
                            #ece6f5 ${taxa * 3.6}deg
                        )`;

                }


                /* =================================
                   TIPOS
                ================================== */

                const tipos =
                    contarPor(

                        relatos,

                        function (
                            denuncia
                        ) {

                            return formatarTipo(
                                denuncia.tipo
                            );

                        }

                    );


                renderizarBarras(

                    graficoTipos,

                    tipos,

                    false

                );


                /* =================================
                   LOCAIS
                ================================== */

                const locais =
                    contarPor(

                        relatos,

                        function (
                            denuncia
                        ) {

                            return formatarLocal(
                                denuncia.local
                            );

                        }

                    );


                renderizarBarras(

                    graficoLocais,

                    locais,

                    false

                );


                /* =================================
                   PSICOLOGIA
                ================================== */

                if (
                    indicadorSolicitacoesPsico
                ) {

                    indicadorSolicitacoesPsico.textContent =

                        solicitacoesDiretasPsicologia.length;

                }


                if (
                    indicadorEncaminhamentosPsico
                ) {

                    indicadorEncaminhamentosPsico.textContent =

                        encaminhamentosPsicologia.length;

                }


                if (
                    indicadorTotalApoioPsico
                ) {

                    indicadorTotalApoioPsico.textContent =

                        solicitacoesPsicologia.length;

                }


                /* =================================
                   EVOLUÇÃO
                ================================== */

                renderizarMeses();


                /* =================================
                   LEITURA PEDAGÓGICA
                ================================== */

                atualizarLeituraPedagogica(

                    tipos,

                    locais

                );

            }


            /* =====================================
               EXECUTAR
            ====================================== */

            renderizar();

        }

    );

})();