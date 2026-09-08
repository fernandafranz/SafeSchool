/* =========================================
   SAFESCHOOL
   ÁREA DO ALUNO
========================================= */


/* =========================================
   ELEMENTOS
========================================= */

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


/* =========================================
   IDS DAS ATIVIDADES
========================================= */

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
   IDENTIFICAR ALUNO
========================================= */

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
        null;


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

            codigoEscola =
                escola.codigo;

        }

    }


    if (!codigoEscola) {

        codigoEscola =
            sessionStorage.getItem(
                "codigoEscolaSafeSchool"
            );

    }


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
========================================= */

function obterTodosProgressos() {

    const dados =
        sessionStorage.getItem(
            "progressoAlunoSafeSchool"
        );


    if (!dados) {

        return {};

    }


    try {

        const resultado =
            JSON.parse(
                dados
            );


        return (
            resultado &&
            typeof resultado === "object"
        )
            ? resultado
            : {};

    }

    catch (erro) {

        return {};

    }

}


/* =========================================
   PROGRESSO DO ALUNO
========================================= */

function obterProgressoAluno() {

    const chave =
        obterChaveAluno();


    const progressoVazio = {

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

        return progressoVazio;

    }


    const todos =
        obterTodosProgressos();


    const progresso =
        todos[chave];


    if (!progresso) {

        return progressoVazio;

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


/* =========================================
   SALVAR
========================================= */

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


/* =========================================
   CONTAR ITENS VÁLIDOS
========================================= */

function contarValidos(
    concluidos,
    validos
) {

    const unicos =
        new Set(
            concluidos
        );


    return validos.filter(

        function (id) {

            return unicos.has(
                id
            );

        }

    ).length;

}


/* =========================================
   ATUALIZAR SELOS
========================================= */

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


    /*
        PRIMEIRO PASSO
    */

    if (
        atividades >= 1
    ) {

        selosAutomaticos.push(
            "primeiro-passo"
        );

    }


    /*
        APRENDER PARA PROTEGER
    */

    if (
        conteudos >= 4
    ) {

        selosAutomaticos.push(
            "aprender-para-proteger"
        );

    }


    /*
        PARCEIRO DA EMPATIA
    */

    if (
        desafios >= 3
    ) {

        selosAutomaticos.push(
            "parceiro-da-empatia"
        );

    }


    /*
        EM MOVIMENTO
    */

    if (
        pontos >= 100
    ) {

        selosAutomaticos.push(
            "em-movimento"
        );

    }


    /*
        GUARDIÃO DO RESPEITO
    */

    if (
        desafios >= 6
    ) {

        selosAutomaticos.push(
            "guardiao-do-respeito"
        );

    }


    /*
        JORNADA SAFESCHOOL
    */

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


    /*
        Mantemos qualquer selo futuro
        que não pertença a esta coleção.
    */

    const outrosSelos =
        progresso.selos.filter(

            function (id) {

                return (
                    !idsConhecidos.includes(
                        id
                    )
                );

            }

        );


    progresso.selos =
        Array.from(

            new Set(

                [
                    ...outrosSelos,
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
   ATUALIZAR PAINEL
========================================= */

function atualizarProgressoPainel() {

    let progresso =
        obterProgressoAluno();


    progresso =
        atualizarSelosAutomaticos(
            progresso
        );


    if (
        numeroDesafiosAluno
    ) {

        numeroDesafiosAluno.textContent =

            contarValidos(

                progresso.desafiosConcluidos,

                idsDesafiosAluno

            );

    }


    if (
        numeroPontosAluno
    ) {

        numeroPontosAluno.textContent =
            progresso.pontos;

    }


    if (
        numeroSelosAluno
    ) {

        numeroSelosAluno.textContent =
            progresso.selos.length;

    }

}


/* =========================================
   INICIAR
========================================= */

atualizarProgressoPainel();