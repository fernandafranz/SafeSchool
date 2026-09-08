/* =========================================
   SAFESCHOOL
   DADOS DE DEMONSTRAÇÃO
========================================= */


(function () {

    "use strict";


    /* =========================================
       CONSTANTES
    ========================================== */

    const CHAVE_DENUNCIAS =
        "denunciasSafeSchool";


    const CHAVE_PSICOLOGIA =
        "solicitacoesPsicologicasSafeSchool";


    const CHAVE_CONTROLE =
        "dadosDemonstrativosSafeSchool";


    const MARCADOR_DEMO =
        "cenario-demonstrativo-safeschool";


    const ESCOLA_DEMO = {

        codigo:
            "ESC001",

        nome:
            "Escola Demonstrativa SafeSchool"

    };


    /* =========================================
       ESCOLA ATUAL
    ========================================== */

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
            sessionStorage.getItem(
                "nomeEscolaSafeSchool"
            );


        /*
            O fallback aceita somente a escola
            demonstrativa conhecida pelo protótipo.
        */

        if (
            codigo !==
            ESCOLA_DEMO.codigo
        ) {

            return null;

        }


        return {

            codigo:
                ESCOLA_DEMO.codigo,

            nome:
                nome ||
                ESCOLA_DEMO.nome

        };

    }


    /* =========================================
       LER LISTAS
    ========================================== */

    function lerLista(
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


    /* =========================================
       SALVAR LISTA
    ========================================== */

    function salvarLista(
        chave,
        lista
    ) {

        sessionStorage.setItem(

            chave,

            JSON.stringify(
                lista
            )

        );

    }


    /* =========================================
       DATAS
    ========================================== */

    function formatarDataLocal(
        data
    ) {

        return (

            data.getFullYear()

            +

            "-"

            +

            String(
                data.getMonth() + 1
            ).padStart(
                2,
                "0"
            )

            +

            "-"

            +

            String(
                data.getDate()
            ).padStart(
                2,
                "0"
            )

        );

    }


    function dataComDeslocamentoDias(
        dias
    ) {

        const data =
            new Date();


        data.setHours(
            12,
            0,
            0,
            0
        );


        data.setDate(

            data.getDate()
            +
            dias

        );


        return formatarDataLocal(
            data
        );

    }


    function dataHoraComDeslocamentoDias(
        dias,
        hora
    ) {

        const data =
            new Date();


        data.setDate(

            data.getDate()
            +
            dias

        );


        data.setHours(

            typeof hora ===
            "number"
                ? hora
                : 10,

            0,
            0,
            0

        );


        return data.toISOString();

    }


    function dataMesesAtras(
        meses,
        deslocamentoDias
    ) {

        const data =
            new Date();


        data.setHours(
            12,
            0,
            0,
            0
        );


        data.setMonth(

            data.getMonth()
            -
            meses

        );


        data.setDate(

            data.getDate()

            +

            (
                deslocamentoDias
                || 0
            )

        );


        return formatarDataLocal(
            data
        );

    }


    function dataHoraMesesAtras(
        meses,
        deslocamentoDias,
        hora
    ) {

        const data =
            new Date();


        data.setMonth(

            data.getMonth()
            -
            meses

        );


        data.setDate(

            data.getDate()

            +

            (
                deslocamentoDias
                || 0
            )

        );


        data.setHours(

            typeof hora ===
            "number"
                ? hora
                : 10,

            0,
            0,
            0

        );


        return data.toISOString();

    }


    /* =========================================
       MARCADOR
    ========================================== */

    function marcarComoDemo(
        registro
    ) {

        registro.dadoDemonstrativo =
            true;


        registro.identificadorDemo =
            MARCADOR_DEMO;


        return registro;

    }


    function registroEhDemo(
        registro
    ) {

        return Boolean(

            registro

            &&

            (
                registro.identificadorDemo ===
                MARCADOR_DEMO

                ||

                registro.dadoDemonstrativo ===
                true
            )

        );

    }


    /* =========================================
       HISTÓRICO
    ========================================== */

    function eventoHistorico(
        tipo,
        titulo,
        descricao,
        criadoEm
    ) {

        return {

            tipo:
                tipo,

            titulo:
                titulo,

            descricao:
                descricao,

            registradoPor:
                "Equipe escolar",

            criadoEm:
                criadoEm

        };

    }


    /* =========================================
       PROTOCOLO
    ========================================== */

    function protocoloDemo(
        escola,
        numero
    ) {

        return (

            "DEMO-"

            +

            escola.codigo

            +

            "-"

            +

            String(
                numero
            ).padStart(
                3,
                "0"
            )

        );

    }


    function protocoloPsicologiaDemo(
        escola,
        numero
    ) {

        return (

            "ENC-DEMO-"

            +

            escola.codigo

            +

            "-"

            +

            String(
                numero
            ).padStart(
                3,
                "0"
            )

        );

    }


    /* =========================================
       CRIAR RELATOS DEMONSTRATIVOS
    ========================================== */

    function criarRelatosDemo(
        escola
    ) {

        const relatos =
            [];


        /* =====================================
           1 - CYBERBULLYING
           IDENTIFICADO
           ALTA PRIORIDADE
           NOVO
           PRAZO VENCIDO
        ====================================== */

        relatos.push(

            marcarComoDemo({

                protocolo:
                    protocoloDemo(
                        escola,
                        1
                    ),

                escolaCodigo:
                    escola.codigo,

                escolaNome:
                    escola.nome,

                origem:
                    "relato-identificado",

                anonimo:
                    false,

                autorEmail:
                    "aluno.demo1@safeschool.test",

                envolvimento:
                    "comigo",

                tipo:
                    "cyberbullying",

                local:
                    "internet",

                dataOcorrencia:
                    dataComDeslocamentoDias(
                        -4
                    ),

                urgencia:
                    "alta",

                relato:
                    "Um grupo começou a publicar montagens ofensivas e mensagens sobre mim. Um colega ameaçou continuar espalhando as imagens e eu estou com medo de ir para a escola.",

                status:
                    "novo",

                responsavelCaso:
                    "orientacao",

                prazoProximaAcao:
                    dataComDeslocamentoDias(
                        -1
                    ),

                criadoEm:
                    dataHoraComDeslocamentoDias(
                        -3,
                        9
                    ),

                atualizadoEm:
                    dataHoraComDeslocamentoDias(
                        -2,
                        14
                    ),

                historico:
                    [

                        eventoHistorico(

                            "gestao",

                            "Responsável pelo acompanhamento definido",

                            "A Orientação Educacional foi indicada para analisar inicialmente o relato.",

                            dataHoraComDeslocamentoDias(
                                -2,
                                14
                            )

                        )

                    ]

            })

        );


        /* =====================================
           2 - BULLYING VERBAL
           ANÔNIMO
           NOVO
           SEM PRAZO
        ====================================== */

        relatos.push(

            marcarComoDemo({

                protocolo:
                    protocoloDemo(
                        escola,
                        2
                    ),

                escolaCodigo:
                    escola.codigo,

                escolaNome:
                    escola.nome,

                origem:
                    "denuncia-anonima",

                anonimo:
                    true,

                autorEmail:
                    null,

                envolvimento:
                    null,

                tipo:
                    "verbal",

                local:
                    "sala",

                dataOcorrencia:
                    dataMesesAtras(
                        1,
                        -2
                    ),

                urgencia:
                    "media",

                relato:
                    "Um estudante recebe apelidos ofensivos durante as aulas e parte da turma costuma rir. A situação está acontecendo repetidamente.",

                status:
                    "novo",

                responsavelCaso:
                    null,

                prazoProximaAcao:
                    null,

                criadoEm:
                    dataHoraMesesAtras(
                        1,
                        -1,
                        11
                    ),

                atualizadoEm:
                    null,

                historico:
                    []

            })

        );


        /* =====================================
           3 - EXCLUSÃO
           ANÔNIMO
           NOVO
           PRAZO PRÓXIMO
        ====================================== */

        relatos.push(

            marcarComoDemo({

                protocolo:
                    protocoloDemo(
                        escola,
                        3
                    ),

                escolaCodigo:
                    escola.codigo,

                escolaNome:
                    escola.nome,

                origem:
                    "denuncia-anonima",

                anonimo:
                    true,

                autorEmail:
                    null,

                envolvimento:
                    null,

                tipo:
                    "exclusao",

                local:
                    "patio",

                dataOcorrencia:
                    dataMesesAtras(
                        2,
                        1
                    ),

                urgencia:
                    "baixa",

                relato:
                    "Um colega tem sido deixado sozinho no intervalo e alguns estudantes combinam de não deixá-lo participar das atividades do grupo.",

                status:
                    "novo",

                responsavelCaso:
                    "professor",

                prazoProximaAcao:
                    dataComDeslocamentoDias(
                        3
                    ),

                criadoEm:
                    dataHoraMesesAtras(
                        2,
                        2,
                        10
                    ),

                atualizadoEm:
                    dataHoraComDeslocamentoDias(
                        -1,
                        10
                    ),

                historico:
                    [

                        eventoHistorico(

                            "gestao",

                            "Observação inicial organizada",

                            "Um professor responsável acompanhará os momentos de convivência da turma.",

                            dataHoraComDeslocamentoDias(
                                -1,
                                10
                            )

                        )

                    ]

            })

        );


        /* =====================================
           4 - BULLYING FÍSICO
           IDENTIFICADO
           EM ACOMPANHAMENTO
           VENCE HOJE
           PSICOLOGIA
        ====================================== */

        relatos.push(

            marcarComoDemo({

                protocolo:
                    protocoloDemo(
                        escola,
                        4
                    ),

                escolaCodigo:
                    escola.codigo,

                escolaNome:
                    escola.nome,

                origem:
                    "relato-identificado",

                anonimo:
                    false,

                autorEmail:
                    "aluno.demo2@safeschool.test",

                envolvimento:
                    "comigo",

                tipo:
                    "fisico",

                local:
                    "corredor",

                dataOcorrencia:
                    dataMesesAtras(
                        2,
                        -4
                    ),

                urgencia:
                    "alta",

                relato:
                    "Durante a saída da aula um colega me empurrou contra a parede e disse que poderia me bater de novo. Tenho medo de encontrá-lo sozinho no corredor.",

                status:
                    "acompanhamento",

                responsavelCaso:
                    "coordenacao",

                prazoProximaAcao:
                    dataComDeslocamentoDias(
                        0
                    ),

                criadoEm:
                    dataHoraMesesAtras(
                        2,
                        -3,
                        9
                    ),

                atualizadoEm:
                    dataHoraComDeslocamentoDias(
                        -1,
                        16
                    ),

                historico:
                    [

                        eventoHistorico(

                            "status",

                            "Acompanhamento iniciado",

                            "A equipe escolar iniciou o acompanhamento da situação relatada.",

                            dataHoraMesesAtras(
                                1,
                                -20,
                                10
                            )

                        ),

                        eventoHistorico(

                            "acolhimento",

                            "Acolhimento inicial realizado",

                            "O estudante foi ouvido individualmente pela equipe escolar.",

                            dataHoraComDeslocamentoDias(
                                -5,
                                14
                            )

                        ),

                        eventoHistorico(

                            "encaminhamento",

                            "Encaminhamento à equipe de Psicologia",

                            "O relato identificado foi encaminhado à equipe de Psicologia.",

                            dataHoraComDeslocamentoDias(
                                -4,
                                15
                            )

                        )

                    ],

                encaminhamentoPsicologico:
                    {

                        protocolo:
                            protocoloPsicologiaDemo(
                                escola,
                                1
                            ),

                        criadoEm:
                            dataHoraComDeslocamentoDias(
                                -4,
                                15
                            )

                    }

            })

        );


        /* =====================================
           5 - DISCRIMINAÇÃO
           ANÔNIMO
           EM ACOMPANHAMENTO
           PRAZO PRÓXIMO
           PSICOLOGIA
        ====================================== */

        relatos.push(

            marcarComoDemo({

                protocolo:
                    protocoloDemo(
                        escola,
                        5
                    ),

                escolaCodigo:
                    escola.codigo,

                escolaNome:
                    escola.nome,

                origem:
                    "denuncia-anonima",

                anonimo:
                    true,

                autorEmail:
                    null,

                envolvimento:
                    null,

                tipo:
                    "discriminacao",

                local:
                    "sala",

                dataOcorrencia:
                    dataMesesAtras(
                        3,
                        2
                    ),

                urgencia:
                    "media",

                relato:
                    "Um estudante está sendo alvo de comentários discriminatórios e imitações ofensivas relacionadas às suas características pessoais.",

                status:
                    "acompanhamento",

                responsavelCaso:
                    "equipe",

                prazoProximaAcao:
                    dataComDeslocamentoDias(
                        2
                    ),

                criadoEm:
                    dataHoraMesesAtras(
                        3,
                        3,
                        13
                    ),

                atualizadoEm:
                    dataHoraComDeslocamentoDias(
                        -3,
                        11
                    ),

                historico:
                    [

                        eventoHistorico(

                            "status",

                            "Acompanhamento iniciado",

                            "A equipe escolar iniciou o acompanhamento da situação relatada.",

                            dataHoraMesesAtras(
                                2,
                                -10,
                                9
                            )

                        ),

                        eventoHistorico(

                            "orientacao",

                            "Orientação pedagógica",

                            "A equipe discutiu ações de convivência e respeito às diferenças.",

                            dataHoraComDeslocamentoDias(
                                -6,
                                10
                            )

                        ),

                        eventoHistorico(

                            "encaminhamento",

                            "Encaminhamento à equipe de Psicologia",

                            "O relato foi encaminhado à equipe de Psicologia, preservando o anonimato de quem realizou a denúncia.",

                            dataHoraComDeslocamentoDias(
                                -3,
                                11
                            )

                        )

                    ],

                encaminhamentoPsicologico:
                    {

                        protocolo:
                            protocoloPsicologiaDemo(
                                escola,
                                2
                            ),

                        criadoEm:
                            dataHoraComDeslocamentoDias(
                                -3,
                                11
                            )

                    }

            })

        );


        /* =====================================
           6 - CYBERBULLYING
           IDENTIFICADO
           EM ACOMPANHAMENTO
           DENTRO DO PRAZO
        ====================================== */

        relatos.push(

            marcarComoDemo({

                protocolo:
                    protocoloDemo(
                        escola,
                        6
                    ),

                escolaCodigo:
                    escola.codigo,

                escolaNome:
                    escola.nome,

                origem:
                    "relato-identificado",

                anonimo:
                    false,

                autorEmail:
                    "aluno.demo3@safeschool.test",

                envolvimento:
                    "presenciei",

                tipo:
                    "cyberbullying",

                local:
                    "internet",

                dataOcorrencia:
                    dataMesesAtras(
                        4,
                        1
                    ),

                urgencia:
                    "media",

                relato:
                    "Presenciei colegas criando um grupo de mensagens para fazer comentários ofensivos sobre uma estudante e compartilhar fotos dela sem autorização.",

                status:
                    "acompanhamento",

                responsavelCaso:
                    "orientacao",

                prazoProximaAcao:
                    dataComDeslocamentoDias(
                        6
                    ),

                criadoEm:
                    dataHoraMesesAtras(
                        4,
                        2,
                        15
                    ),

                atualizadoEm:
                    dataHoraComDeslocamentoDias(
                        -2,
                        9
                    ),

                historico:
                    [

                        eventoHistorico(

                            "status",

                            "Acompanhamento iniciado",

                            "A equipe escolar iniciou a análise do relato.",

                            dataHoraMesesAtras(
                                3,
                                -18,
                                10
                            )

                        ),

                        eventoHistorico(

                            "conversa",

                            "Conversa com estudantes",

                            "Foi realizada uma conversa inicial de orientação sobre convivência digital.",

                            dataHoraComDeslocamentoDias(
                                -2,
                                9
                            )

                        )

                    ]

            })

        );


        /* =====================================
           7 - BULLYING VERBAL
           IDENTIFICADO
           ACOMPANHAMENTO ENCERRADO
           PSICOLOGIA CONCLUÍDA
        ====================================== */

        relatos.push(

            marcarComoDemo({

                protocolo:
                    protocoloDemo(
                        escola,
                        7
                    ),

                escolaCodigo:
                    escola.codigo,

                escolaNome:
                    escola.nome,

                origem:
                    "relato-identificado",

                anonimo:
                    false,

                autorEmail:
                    "aluno.demo4@safeschool.test",

                envolvimento:
                    "comigo",

                tipo:
                    "verbal",

                local:
                    "sala",

                dataOcorrencia:
                    dataMesesAtras(
                        5,
                        -2
                    ),

                urgencia:
                    "baixa",

                relato:
                    "Durante algumas semanas recebi apelidos ofensivos na sala. Conversei com a equipe escolar porque a situação começou a me deixar desconfortável.",

                status:
                    "concluido",

                responsavelCaso:
                    "coordenacao",

                prazoProximaAcao:
                    null,

                criadoEm:
                    dataHoraMesesAtras(
                        5,
                        -1,
                        9
                    ),

                atualizadoEm:
                    dataHoraMesesAtras(
                        1,
                        -10,
                        15
                    ),

                historico:
                    [

                        eventoHistorico(

                            "status",

                            "Acompanhamento iniciado",

                            "A equipe escolar iniciou o acompanhamento da situação relatada.",

                            dataHoraMesesAtras(
                                4,
                                -20,
                                10
                            )

                        ),

                        eventoHistorico(

                            "familia",

                            "Família contatada",

                            "A família do estudante foi informada sobre o acompanhamento realizado pela escola.",

                            dataHoraMesesAtras(
                                3,
                                -12,
                                14
                            )

                        ),

                        eventoHistorico(

                            "encaminhamento",

                            "Encaminhamento à equipe de Psicologia",

                            "O relato identificado foi encaminhado à equipe de Psicologia.",

                            dataHoraMesesAtras(
                                3,
                                -8,
                                11
                            )

                        ),

                        eventoHistorico(

                            "status",

                            "Acompanhamento escolar concluído",

                            "O acompanhamento escolar foi encerrado após as ações planejadas e o período de observação.",

                            dataHoraMesesAtras(
                                1,
                                -10,
                                15
                            )

                        )

                    ],

                encerramento:
                    {

                        resumo:
                            "A equipe realizou acompanhamento, orientação e observação da convivência, encerrando o fluxo escolar registrado após as ações planejadas.",

                        registradoPor:
                            "Equipe escolar",

                        criadoEm:
                            dataHoraMesesAtras(
                                1,
                                -10,
                                15
                            )

                    },

                encaminhamentoPsicologico:
                    {

                        protocolo:
                            protocoloPsicologiaDemo(
                                escola,
                                3
                            ),

                        criadoEm:
                            dataHoraMesesAtras(
                                3,
                                -8,
                                11
                            )

                    }

            })

        );


        /* =====================================
           8 - EXCLUSÃO
           ANÔNIMO
           ACOMPANHAMENTO ENCERRADO
        ====================================== */

        relatos.push(

            marcarComoDemo({

                protocolo:
                    protocoloDemo(
                        escola,
                        8
                    ),

                escolaCodigo:
                    escola.codigo,

                escolaNome:
                    escola.nome,

                origem:
                    "denuncia-anonima",

                anonimo:
                    true,

                autorEmail:
                    null,

                envolvimento:
                    null,

                tipo:
                    "exclusao",

                local:
                    "patio",

                dataOcorrencia:
                    dataMesesAtras(
                        1,
                        -12
                    ),

                urgencia:
                    "media",

                relato:
                    "Foi relatado que um estudante estava sendo excluído repetidamente das atividades no intervalo e dos trabalhos em grupo.",

                status:
                    "concluido",

                responsavelCaso:
                    "professor",

                prazoProximaAcao:
                    null,

                criadoEm:
                    dataHoraMesesAtras(
                        1,
                        -11,
                        8
                    ),

                atualizadoEm:
                    dataHoraComDeslocamentoDias(
                        -8,
                        14
                    ),

                historico:
                    [

                        eventoHistorico(

                            "status",

                            "Acompanhamento iniciado",

                            "A equipe começou a observar a dinâmica de convivência do grupo.",

                            dataHoraComDeslocamentoDias(
                                -16,
                                9
                            )

                        ),

                        eventoHistorico(

                            "observacao",

                            "Observação no ambiente escolar",

                            "Foram acompanhados os momentos de intervalo e atividades coletivas.",

                            dataHoraComDeslocamentoDias(
                                -12,
                                10
                            )

                        ),

                        eventoHistorico(

                            "status",

                            "Acompanhamento escolar concluído",

                            "O acompanhamento escolar foi encerrado após ações de integração e observação.",

                            dataHoraComDeslocamentoDias(
                                -8,
                                14
                            )

                        )

                    ],

                encerramento:
                    {

                        resumo:
                            "Foram realizadas ações de integração e acompanhamento da convivência, com encerramento do fluxo registrado após o período de observação.",

                        registradoPor:
                            "Equipe escolar",

                        criadoEm:
                            dataHoraComDeslocamentoDias(
                                -8,
                                14
                            )

                    }

            })

        );


        /* =====================================
           9 - CYBERBULLYING
           ANÔNIMO
           ACOMPANHAMENTO ENCERRADO
        ====================================== */

        relatos.push(

            marcarComoDemo({

                protocolo:
                    protocoloDemo(
                        escola,
                        9
                    ),

                escolaCodigo:
                    escola.codigo,

                escolaNome:
                    escola.nome,

                origem:
                    "denuncia-anonima",

                anonimo:
                    true,

                autorEmail:
                    null,

                envolvimento:
                    null,

                tipo:
                    "cyberbullying",

                local:
                    "internet",

                dataOcorrencia:
                    dataMesesAtras(
                        3,
                        -10
                    ),

                urgencia:
                    "baixa",

                relato:
                    "Um perfil falso foi criado para publicar comentários constrangedores sobre estudantes da escola. A situação foi comunicada para acompanhamento.",

                status:
                    "concluido",

                responsavelCaso:
                    "orientacao",

                prazoProximaAcao:
                    null,

                criadoEm:
                    dataHoraMesesAtras(
                        3,
                        -9,
                        16
                    ),

                atualizadoEm:
                    dataHoraMesesAtras(
                        2,
                        -4,
                        10
                    ),

                historico:
                    [

                        eventoHistorico(

                            "status",

                            "Acompanhamento iniciado",

                            "A equipe escolar iniciou a análise da situação digital.",

                            dataHoraMesesAtras(
                                3,
                                -5,
                                9
                            )

                        ),

                        eventoHistorico(

                            "orientacao",

                            "Orientação pedagógica",

                            "Foram reforçadas orientações sobre segurança, respeito e responsabilidade no ambiente digital.",

                            dataHoraMesesAtras(
                                2,
                                -15,
                                11
                            )

                        ),

                        eventoHistorico(

                            "status",

                            "Acompanhamento escolar concluído",

                            "O fluxo escolar registrado foi encerrado após as ações educativas e o período de acompanhamento.",

                            dataHoraMesesAtras(
                                2,
                                -4,
                                10
                            )

                        )

                    ],

                encerramento:
                    {

                        resumo:
                            "O acompanhamento foi realizado pela equipe e o fluxo registrado foi encerrado após ações educativas e monitoramento da situação relatada.",

                        registradoPor:
                            "Equipe escolar",

                        criadoEm:
                            dataHoraMesesAtras(
                                2,
                                -4,
                                10
                            )

                    }

            })

        );


        return relatos;

    }


    /* =========================================
       CRIAR ENCAMINHAMENTO À PSICOLOGIA
    ========================================== */

    function criarEncaminhamentoPsicologia(
        escola,
        relato,
        numero,
        status,
        criadoEm
    ) {

        const identificado =

            relato.anonimo ===
            false

            ||

            relato.origem ===
            "relato-identificado";


        return marcarComoDemo({

            protocolo:
                protocoloPsicologiaDemo(
                    escola,
                    numero
                ),

            protocoloOrigem:
                relato.protocolo,

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

                    ? (
                        relato.autorEmail
                        || null
                    )

                    : null,

            envolvimento:
                identificado

                    ? (
                        relato.envolvimento
                        || null
                    )

                    : null,

            status:
                status,

            dadosCaso:
                {

                    tipo:
                        relato.tipo,

                    local:
                        relato.local,

                    dataOcorrencia:
                        relato.dataOcorrencia,

                    urgencia:
                        relato.urgencia,

                    relato:
                        relato.relato

                },

            criadoEm:
                criadoEm

        });

    }


    /* =========================================
       CRIAR PSICOLOGIA DEMO
    ========================================== */

    function criarSolicitacoesPsicologiaDemo(
        escola,
        relatos
    ) {

        const casoFisico =
            relatos.find(

                function (
                    relato
                ) {

                    return (
                        relato.protocolo ===
                        protocoloDemo(
                            escola,
                            4
                        )
                    );

                }

            );


        const casoDiscriminacao =
            relatos.find(

                function (
                    relato
                ) {

                    return (
                        relato.protocolo ===
                        protocoloDemo(
                            escola,
                            5
                        )
                    );

                }

            );


        const casoConcluido =
            relatos.find(

                function (
                    relato
                ) {

                    return (
                        relato.protocolo ===
                        protocoloDemo(
                            escola,
                            7
                        )
                    );

                }

            );


        const solicitacoes =
            [];


        if (
            casoFisico
        ) {

            solicitacoes.push(

                criarEncaminhamentoPsicologia(

                    escola,

                    casoFisico,

                    1,

                    "acolhimento",

                    dataHoraComDeslocamentoDias(
                        -4,
                        15
                    )

                )

            );

        }


        if (
            casoDiscriminacao
        ) {

            solicitacoes.push(

                criarEncaminhamentoPsicologia(

                    escola,

                    casoDiscriminacao,

                    2,

                    "solicitado",

                    dataHoraComDeslocamentoDias(
                        -3,
                        11
                    )

                )

            );

        }


        if (
            casoConcluido
        ) {

            solicitacoes.push(

                criarEncaminhamentoPsicologia(

                    escola,

                    casoConcluido,

                    3,

                    "concluido",

                    dataHoraMesesAtras(
                        3,
                        -8,
                        11
                    )

                )

            );

        }


        return solicitacoes;

    }


    /* =========================================
       REMOVER DEMOS DE UMA LISTA
    ========================================== */

    function removerRegistrosDemoDaEscola(
        lista,
        codigoEscola
    ) {

        return lista.filter(

            function (
                registro
            ) {

                const pertenceAEscola =
                    registro.escolaCodigo ===
                    codigoEscola;


                const demonstrativo =
                    registroEhDemo(
                        registro
                    );


                return !(
                    pertenceAEscola
                    &&
                    demonstrativo
                );

            }

        );

    }


    /* =========================================
       CARREGAR CENÁRIO
    ========================================== */

    function carregar() {

        const escola =
            obterEscolaAtual();


        if (
            !escola
        ) {

            return {

                sucesso:
                    false,

                mensagem:
                    "Nenhuma escola foi identificada."

            };

        }


        /* =====================================
           LIMPAR CARGA DEMO ANTERIOR
        ====================================== */

        let denuncias =
            lerLista(
                CHAVE_DENUNCIAS
            );


        denuncias =
            removerRegistrosDemoDaEscola(

                denuncias,

                escola.codigo

            );


        let psicologia =
            lerLista(
                CHAVE_PSICOLOGIA
            );


        psicologia =
            removerRegistrosDemoDaEscola(

                psicologia,

                escola.codigo

            );


        /* =====================================
           CRIAR NOVOS DADOS
        ====================================== */

        const relatosDemo =
            criarRelatosDemo(
                escola
            );


        const psicologiaDemo =
            criarSolicitacoesPsicologiaDemo(

                escola,

                relatosDemo

            );


        /* =====================================
           PRESERVAR DADOS MANUAIS
        ====================================== */

        denuncias =
            denuncias.concat(
                relatosDemo
            );


        psicologia =
            psicologia.concat(
                psicologiaDemo
            );


        salvarLista(

            CHAVE_DENUNCIAS,

            denuncias

        );


        salvarLista(

            CHAVE_PSICOLOGIA,

            psicologia

        );


        /* =====================================
           CONTROLE
        ====================================== */

        sessionStorage.setItem(

            CHAVE_CONTROLE,

            JSON.stringify({

                ativo:
                    true,

                escolaCodigo:
                    escola.codigo,

                escolaNome:
                    escola.nome,

                carregadoEm:
                    new Date().toISOString(),

                quantidadeRelatos:
                    relatosDemo.length,

                quantidadePsicologia:
                    psicologiaDemo.length

            })

        );


        return {

            sucesso:
                true,

            mensagem:
                "Cenário demonstrativo carregado.",

            relatos:
                relatosDemo.length,

            psicologia:
                psicologiaDemo.length

        };

    }


    /* =========================================
       REMOVER CENÁRIO
    ========================================== */

    function remover() {

        const escola =
            obterEscolaAtual();


        if (
            !escola
        ) {

            return {

                sucesso:
                    false,

                mensagem:
                    "Nenhuma escola foi identificada."

            };

        }


        const denunciasAtuais =
            lerLista(
                CHAVE_DENUNCIAS
            );


        const psicologiaAtual =
            lerLista(
                CHAVE_PSICOLOGIA
            );


        const denunciasLimpas =
            removerRegistrosDemoDaEscola(

                denunciasAtuais,

                escola.codigo

            );


        const psicologiaLimpa =
            removerRegistrosDemoDaEscola(

                psicologiaAtual,

                escola.codigo

            );


        const removidosDenuncias =

            denunciasAtuais.length
            -
            denunciasLimpas.length;


        const removidosPsicologia =

            psicologiaAtual.length
            -
            psicologiaLimpa.length;


        salvarLista(

            CHAVE_DENUNCIAS,

            denunciasLimpas

        );


        salvarLista(

            CHAVE_PSICOLOGIA,

            psicologiaLimpa

        );


        const controle =
            obterControle();


        if (
            controle

            &&

            controle.escolaCodigo ===
            escola.codigo
        ) {

            sessionStorage.removeItem(
                CHAVE_CONTROLE
            );

        }


        return {

            sucesso:
                true,

            mensagem:
                "Dados demonstrativos removidos.",

            relatos:
                removidosDenuncias,

            psicologia:
                removidosPsicologia

        };

    }


    /* =========================================
       CONTROLE
    ========================================== */

    function obterControle() {

        const dados =
            sessionStorage.getItem(
                CHAVE_CONTROLE
            );


        if (
            !dados
        ) {

            return null;

        }


        try {

            const controle =
                JSON.parse(
                    dados
                );


            return (
                controle

                &&

                typeof controle ===
                "object"
            )

                ? controle

                : null;

        }

        catch (
            erro
        ) {

            return null;

        }

    }


    /* =========================================
       CONTAR DADOS DEMO
    ========================================== */

    function contar() {

        const escola =
            obterEscolaAtual();


        if (
            !escola
        ) {

            return {

                relatos:
                    0,

                psicologia:
                    0

            };

        }


        const relatos =
            lerLista(
                CHAVE_DENUNCIAS
            )
            .filter(

                function (
                    registro
                ) {

                    return (

                        registro.escolaCodigo ===
                        escola.codigo

                        &&

                        registroEhDemo(
                            registro
                        )

                    );

                }

            );


        const psicologia =
            lerLista(
                CHAVE_PSICOLOGIA
            )
            .filter(

                function (
                    registro
                ) {

                    return (

                        registro.escolaCodigo ===
                        escola.codigo

                        &&

                        registroEhDemo(
                            registro
                        )

                    );

                }

            );


        return {

            relatos:
                relatos.length,

            psicologia:
                psicologia.length

        };

    }


    /* =========================================
       VERIFICAR SE ESTÁ ATIVO
    ========================================== */

    function estaAtivo() {

        const contagem =
            contar();


        return (
            contagem.relatos > 0

            ||

            contagem.psicologia > 0
        );

    }


    /* =========================================
       API PÚBLICA
    ========================================== */

    window.SafeSchoolDadosDemo = {

        carregar:
            carregar,

        remover:
            remover,

        contar:
            contar,

        estaAtivo:
            estaAtivo,

        obterControle:
            obterControle

    };


})();