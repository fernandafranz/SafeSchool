/* =========================================
   SAFESCHOOL
   MINHAS CONQUISTAS
========================================= */


/* =========================================
   ESTADO REAL
========================================= */

let supabase =
    null;


let usuarioAtual =
    null;


let perfilAtual =
    null;


let autenticacaoVerificada =
    false;


let progressoAlunoAtual = {

    conteudosConcluidos:
        [],

    desafiosConcluidos:
        [],

    pontos:
        0,

    selos:
        []

};


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
   PROGRESSO VAZIO
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


/* =========================================
   NORMALIZAR PROGRESSO DO BANCO
========================================= */

function normalizarProgressoBanco(
    progresso
) {

    if (
        !progresso ||
        typeof progresso !== "object"
    ) {

        return criarProgressoVazio();

    }


    return {

        conteudosConcluidos:

            Array.isArray(
                progresso.conteudos_concluidos
            )

                ? progresso.conteudos_concluidos

                : [],


        desafiosConcluidos:

            Array.isArray(
                progresso.desafios_concluidos
            )

                ? progresso.desafios_concluidos

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
   ESCOLA ATUAL
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

        return (
            window.SafeSchoolEscola.obter()
            || null
        );

    }


    return null;

}


/* =========================================
   LOGIN REAL
========================================= */

function alunoEstaLogado() {

    return (

        autenticacaoVerificada === true

        &&

        usuarioAtual !== null

        &&

        perfilAtual !== null

        &&

        perfilAtual.perfil === "aluno"

        &&

        perfilAtual.ativo === true

    );

}


/* =========================================
   SUPABASE
========================================= */

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
   CARREGAR USUÁRIO
========================================= */

async function carregarUsuarioAtual() {

    const {
        data,
        error
    } =
        await supabase.auth
            .getUser();


    if (
        error
    ) {

        throw error;

    }


    usuarioAtual =
        data &&
        data.user

            ? data.user

            : null;


    if (
        !usuarioAtual
    ) {

        perfilAtual =
            null;


        return;

    }


    const {
        data: perfil,
        error: erroPerfil
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
                usuarioAtual.id
            )

            .maybeSingle();


    if (
        erroPerfil
    ) {

        throw erroPerfil;

    }


    perfilAtual =
        perfil || null;

}


/* =========================================
   CARREGAR PROGRESSO REAL
========================================= */

async function carregarProgressoAluno() {

    if (
        !alunoEstaLogado()
    ) {

        progressoAlunoAtual =
            criarProgressoVazio();


        return;

    }


    const {
        data,
        error
    } =
        await supabase.rpc(
            "garantir_progresso_aluno"
        );


    if (
        error
    ) {

        throw error;

    }


    progressoAlunoAtual =
        normalizarProgressoBanco(
            data
        );

}


/* =========================================
   OBTER PROGRESSO
========================================= */

function obterProgressoAluno() {

    return progressoAlunoAtual;

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
   SELOS OFICIAIS DO BANCO
========================================= */

function obterSelosOficiais(
    progresso
) {

    const idsConhecidos =
        conquistas.map(

            function (conquista) {

                return conquista.id;

            }

        );


    const selosUnicos =
        Array.from(

            new Set(
                progresso.selos
            )

        );


    return selosUnicos.filter(

        function (id) {

            return idsConhecidos.includes(
                id
            );

        }

    );

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


    /*
        Os selos desbloqueados agora vêm
        diretamente do Supabase.

        O navegador não concede nem remove
        selos por conta própria.
    */

    const desbloqueados =
        obterSelosOficiais(
            progresso
        );


    if (
        numeroPontosConquistas
    ) {

        numeroPontosConquistas.textContent =
            metricas.pontos;

    }


    if (
        numeroAtividadesConquistas
    ) {

        numeroAtividadesConquistas.textContent =
            metricas.atividades;

    }


    if (
        numeroSelosConquistas
    ) {

        numeroSelosConquistas.textContent =
            desbloqueados.length;

    }


    if (
        !gradeConquistas
    ) {

        return;

    }


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

                dadosProgresso.meta > 0

                    ? Math.min(

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

                    )

                    : 0;


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

    if (
        !mensagemProximaConquista
    ) {

        return;

    }


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


    if (
        !proxima
    ) {

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
   REDIRECIONAR PARA LOGIN
========================================= */

function redirecionarLoginRestrito() {

    let codigoEscola =
        null;


    const escola =
        obterEscolaAtual();


    if (
        escola &&
        escola.codigo
    ) {

        codigoEscola =
            escola.codigo;

    }


    if (
        !codigoEscola
    ) {

        codigoEscola =
            sessionStorage.getItem(
                "codigoEscolaSafeSchool"
            );

    }


    if (
        !codigoEscola
    ) {

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

}


/* =========================================
   INICIALIZAR
========================================= */

async function inicializarConquistas() {

    try {

        supabase =
            await obterSupabase();


        await carregarUsuarioAtual();


        autenticacaoVerificada =
            true;


        if (
            !alunoEstaLogado()
        ) {

            redirecionarLoginRestrito();

            return;

        }


        await carregarProgressoAluno();


        renderizarConquistas();


        console.log(
            "SafeSchool: conquistas integradas ao progresso real."
        );

    }

    catch (erro) {

        autenticacaoVerificada =
            true;


        console.error(
            "SafeSchool: falha ao carregar as conquistas.",
            erro
        );


        alert(
            "Não foi possível carregar suas conquistas agora."
        );

    }

}


/* =========================================
   INICIAR
========================================= */

inicializarConquistas();