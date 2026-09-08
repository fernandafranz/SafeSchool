/* =========================================
   SAFESCHOOL
   MINHAS CONQUISTAS
========================================= */


/* =========================================
   IDS VÁLIDOS
========================================= */

const idsConteudosSafeSchool = [

    "o-que-e-bullying",
    "bullying-ou-brincadeira",
    "cyberbullying",
    "exclusao-social",
    "quando-acontece-comigo",
    "quando-eu-presencio",
    "respeito-e-empatia",
    "como-pedir-ajuda"

];


const idsDesafiosSafeSchool = [

    "brincadeira-limite",
    "grupo-da-turma",
    "colega-sozinho",
    "presenciei-agressao",
    "pedir-ajuda",
    "nao-incentivar"

];


/* =========================================
   ELEMENTOS
========================================= */

const numeroPontosConquistas =
    document.getElementById(
        "numeroPontosConquistas"
    );


const numeroAtividadesConquistas =
    document.getElementById(
        "numeroAtividadesConquistas"
    );


const numeroSelosConquistas =
    document.getElementById(
        "numeroSelosConquistas"
    );


const gradeConquistas =
    document.getElementById(
        "gradeConquistas"
    );


const mensagemProximaConquista =
    document.getElementById(
        "mensagemProximaConquista"
    );


/* =========================================
   LOGIN
========================================= */

function alunoEstaLogado() {

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


    return (
        perfil === "aluno" &&
        Boolean(email)
    );

}


/* =========================================
   CHAVE DO ALUNO
========================================= */

function obterChaveAluno() {

    if (
        !alunoEstaLogado()
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


    const email =
        sessionStorage.getItem(
            "usuarioEmailSafeSchool"
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
   PROGRESSO
========================================= */

function criarProgressoVazio() {

    return {

        conteudosConcluidos:
            [],

        desafiosConcluidos:
            [],

        pontos:
            0,

        selos:
            []

    };

}


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


function obterProgressoAluno() {

    const chave =
        obterChaveAluno();


    if (!chave) {

        return criarProgressoVazio();

    }


    const todos =
        obterTodosProgressos();


    const progresso =
        todos[chave] ||
        criarProgressoVazio();


    if (
        !Array.isArray(
            progresso.conteudosConcluidos
        )
    ) {

        progresso.conteudosConcluidos =
            [];

    }


    if (
        !Array.isArray(
            progresso.desafiosConcluidos
        )
    ) {

        progresso.desafiosConcluidos =
            [];

    }


    if (
        !Array.isArray(
            progresso.selos
        )
    ) {

        progresso.selos =
            [];

    }


    progresso.pontos =
        Number(
            progresso.pontos || 0
        );


    return progresso;

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
   MÉTRICAS
========================================= */

function obterMetricas(
    progresso
) {

    const conteudos =
        contarValidos(

            progresso.conteudosConcluidos,

            idsConteudosSafeSchool

        );


    const desafios =
        contarValidos(

            progresso.desafiosConcluidos,

            idsDesafiosSafeSchool

        );


    return {

        conteudos:
            conteudos,

        desafios:
            desafios,

        atividades:
            conteudos + desafios,

        pontos:
            Number(
                progresso.pontos || 0
            )

    };

}


/* =========================================
   DEFINIÇÃO DOS SELOS
========================================= */

const conquistas = [

    {

        id:
            "primeiro-passo",

        icone:
            "🌱",

        titulo:
            "Primeiro Passo",

        descricao:
            "Toda jornada começa com uma escolha. Este selo reconhece sua primeira participação nas atividades do SafeSchool.",

        criterio:
            "Concluir pelo menos 1 conteúdo ou desafio.",

        verificar:
            function (metricas) {

                return (
                    metricas.atividades >= 1
                );

            },

        progresso:
            function (metricas) {

                return {

                    atual:
                        Math.min(
                            metricas.atividades,
                            1
                        ),

                    meta:
                        1

                };

            }

    },


    {

        id:
            "aprender-para-proteger",

        icone:
            "📚",

        titulo:
            "Aprender para Proteger",

        descricao:
            "Conhecer melhor o bullying, a empatia e a convivência ajuda a perceber situações e fazer escolhas mais conscientes.",

        criterio:
            "Concluir 4 conteúdos de Aprender e refletir.",

        verificar:
            function (metricas) {

                return (
                    metricas.conteudos >= 4
                );

            },

        progresso:
            function (metricas) {

                return {

                    atual:
                        Math.min(
                            metricas.conteudos,
                            4
                        ),

                    meta:
                        4

                };

            }

    },


    {

        id:
            "parceiro-da-empatia",

        icone:
            "🤝",

        titulo:
            "Parceiro da Empatia",

        descricao:
            "Refletir sobre situações do cotidiano ajuda a perceber como pequenas atitudes podem transformar a convivência.",

        criterio:
            "Concluir 3 jogos e desafios.",

        verificar:
            function (metricas) {

                return (
                    metricas.desafios >= 3
                );

            },

        progresso:
            function (metricas) {

                return {

                    atual:
                        Math.min(
                            metricas.desafios,
                            3
                        ),

                    meta:
                        3

                };

            }

    },


    {

        id:
            "em-movimento",

        icone:
            "⭐",

        titulo:
            "Em Movimento",

        descricao:
            "Sua participação está crescendo. Este selo reconhece quem continua aprendendo e avançando pela jornada SafeSchool.",

        criterio:
            "Alcançar 100 pontos.",

        verificar:
            function (metricas) {

                return (
                    metricas.pontos >= 100
                );

            },

        progresso:
            function (metricas) {

                return {

                    atual:
                        Math.min(
                            metricas.pontos,
                            100
                        ),

                    meta:
                        100

                };

            }

    },


    {

        id:
            "guardiao-do-respeito",

        icone:
            "🛡️",

        titulo:
            "Guardião do Respeito",

        descricao:
            "Você refletiu sobre diferentes situações e completou todos os desafios disponíveis nesta etapa do SafeSchool.",

        criterio:
            "Concluir os 6 jogos e desafios.",

        verificar:
            function (metricas) {

                return (
                    metricas.desafios >= 6
                );

            },

        progresso:
            function (metricas) {

                return {

                    atual:
                        Math.min(
                            metricas.desafios,
                            6
                        ),

                    meta:
                        6

                };

            }

    },


    {

        id:
            "jornada-safeschool",

        icone:
            "💜",

        titulo:
            "Jornada SafeSchool",

        descricao:
            "Uma conquista especial para quem completou todos os conteúdos e desafios disponíveis nesta jornada.",

        criterio:
            "Concluir os 8 conteúdos e os 6 desafios.",

        verificar:
            function (metricas) {

                return (

                    metricas.conteudos >= 8

                    &&

                    metricas.desafios >= 6

                );

            },

        progresso:
            function (metricas) {

                return {

                    atual:
                        Math.min(
                            metricas.atividades,
                            14
                        ),

                    meta:
                        14

                };

            }

    }

];


/* =========================================
   ATUALIZAR SELOS
========================================= */

function atualizarSelos(
    progresso,
    metricas
) {

    const idsConhecidos =
        conquistas.map(

            function (conquista) {

                return conquista.id;

            }

        );


    const desbloqueados =
        conquistas
            .filter(

                function (conquista) {

                    return conquista.verificar(
                        metricas
                    );

                }

            )
            .map(

                function (conquista) {

                    return conquista.id;

                }

            );


    /*
        Preserva eventuais selos futuros
        que ainda não pertençam a esta coleção.
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
                    ...desbloqueados
                ]

            )

        );


    salvarProgressoAluno(
        progresso
    );


    return desbloqueados;

}


/* =========================================
   RENDERIZAR
========================================= */

function renderizarConquistas() {

    const progresso =
        obterProgressoAluno();


    const metricas =
        obterMetricas(
            progresso
        );


    const desbloqueados =
        atualizarSelos(
            progresso,
            metricas
        );


    numeroPontosConquistas.textContent =
        metricas.pontos;


    numeroAtividadesConquistas.textContent =
        metricas.atividades;


    numeroSelosConquistas.textContent =
        desbloqueados.length;


    gradeConquistas.innerHTML =
        "";


    conquistas.forEach(

        function (conquista) {

            const desbloqueado =
                desbloqueados.includes(
                    conquista.id
                );


            const dadosProgresso =
                conquista.progresso(
                    metricas
                );


            const percentual =
                Math.min(

                    100,

                    Math.round(

                        (
                            dadosProgresso.atual
                            /
                            dadosProgresso.meta
                        )

                        *

                        100

                    )

                );


            const card =
                document.createElement(
                    "article"
                );


            card.className =

                desbloqueado
                    ? "card-conquista desbloqueado"
                    : "card-conquista bloqueado";


            card.innerHTML = `

                <span
                    class="status-selo ${
                        desbloqueado
                            ? "conquistado"
                            : "bloqueado"
                    }"
                >

                    ${
                        desbloqueado
                            ? "✓ Conquistado"
                            : "🔒 Bloqueado"
                    }

                </span>


                <div class="selo-icone">

                    ${conquista.icone}

                </div>


                <h3>

                    ${escaparHTML(
                        conquista.titulo
                    )}

                </h3>


                <p>

                    ${escaparHTML(
                        conquista.descricao
                    )}

                </p>


                <div class="criterio">

                    <strong>
                        Como conquistar:
                    </strong>

                    ${escaparHTML(
                        conquista.criterio
                    )}

                </div>


                <div class="progresso-selo">


                    <div class="progresso-cabecalho">

                        <span>
                            Progresso
                        </span>

                        <strong>

                            ${dadosProgresso.atual}
                            /
                            ${dadosProgresso.meta}

                        </strong>

                    </div>


                    <div class="barra">

                        <div
                            class="barra-preenchimento"
                            style="width: ${percentual}%"
                        >
                        </div>

                    </div>


                </div>

            `;


            gradeConquistas.appendChild(
                card
            );

        }

    );


    atualizarProximaConquista(

        desbloqueados,

        metricas

    );

}


/* =========================================
   PRÓXIMA CONQUISTA
========================================= */

function atualizarProximaConquista(
    desbloqueados,
    metricas
) {

    const proxima =
        conquistas.find(

            function (conquista) {

                return (
                    !desbloqueados.includes(
                        conquista.id
                    )
                );

            }

        );


    if (!proxima) {

        mensagemProximaConquista.textContent =

            "Você conquistou todos os selos disponíveis nesta etapa do SafeSchool. Continue colocando respeito e empatia em prática no dia a dia.";


        return;

    }


    const progresso =
        proxima.progresso(
            metricas
        );


    mensagemProximaConquista.textContent =

        "Próxima conquista: "

        +

        proxima.titulo

        +

        ". Seu progresso está em "

        +

        progresso.atual

        +

        " de "

        +

        progresso.meta

        +

        ".";

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
   VERIFICAR ACESSO
========================================= */

function verificarAcessoAluno() {

    if (
        alunoEstaLogado()
    ) {

        return true;

    }


    let codigoEscola =
        sessionStorage.getItem(
            "codigoEscolaSafeSchool"
        );


    if (!codigoEscola) {

        const parametros =
            new URLSearchParams(
                window.location.search
            );


        codigoEscola =
            parametros.get(
                "escola"
            );

    }


    window.location.href =

        "login.html?acesso=restrito"

        +

        (
            codigoEscola

                ? (
                    "&escola=" +
                    encodeURIComponent(
                        codigoEscola
                    )
                )

                : ""
        );


    return false;

}


/* =========================================
   INICIAR
========================================= */

if (
    verificarAcessoAluno()
) {

    renderizarConquistas();

}