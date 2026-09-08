/* =========================================
   SAFESCHOOL
   APRENDER E REFLETIR
========================================= */


/* =========================================
   PERFIL ATUAL
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
   ELEMENTOS
========================================= */

const gradeConteudos =
    document.getElementById(
        "gradeConteudos"
    );


const areaLeitura =
    document.getElementById(
        "areaLeitura"
    );


const fecharLeitura =
    document.getElementById(
        "fecharLeitura"
    );


const leituraIcone =
    document.getElementById(
        "leituraIcone"
    );


const leituraCategoria =
    document.getElementById(
        "leituraCategoria"
    );


const leituraTitulo =
    document.getElementById(
        "leituraTitulo"
    );


const leituraTexto =
    document.getElementById(
        "leituraTexto"
    );


const leituraReflexao =
    document.getElementById(
        "leituraReflexao"
    );


const botaoConcluir =
    document.getElementById(
        "botaoConcluirConteudo"
    );


const numeroConcluidos =
    document.getElementById(
        "numeroConcluidosConteudos"
    );


const numeroTotal =
    document.getElementById(
        "numeroTotalConteudos"
    );


/* =========================================
   BIBLIOTECA CENTRAL
========================================= */

const conteudos =
    (
        window.SafeSchoolBibliotecaConteudos

        &&

        typeof
        window.SafeSchoolBibliotecaConteudos.listar
        ===
        "function"
    )

        ? window.SafeSchoolBibliotecaConteudos.listar()

        : [];


/* =========================================
   VERIFICAR BIBLIOTECA
========================================= */

if (
    conteudos.length === 0
) {

    console.error(

        "SafeSchool: a biblioteca de conteúdos não foi carregada."

    );

}


/* =========================================
   CONTEÚDO ATUAL
========================================= */

let conteudoAtual =
    null;


/* =========================================
   CONFIGURAÇÃO PEDAGÓGICA DA ESCOLA
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


function criarConfiguracaoPedagogicaVazia() {

    return {

        recomendados:
            [],

        destaqueCampanha:
            null

    };

}


function obterConfiguracaoPedagogica() {

    const escola =
        obterEscolaAtual();


    if (
        !escola ||
        !escola.codigo
    ) {

        return criarConfiguracaoPedagogicaVazia();

    }


    const dados =
        sessionStorage.getItem(
            "recomendacoesConteudosSafeSchool"
        );


    if (
        !dados
    ) {

        return criarConfiguracaoPedagogicaVazia();

    }


    try {

        const todas =
            JSON.parse(
                dados
            );


        if (
            !todas ||
            typeof todas !== "object"
        ) {

            return criarConfiguracaoPedagogicaVazia();

        }


        const configuracao =
            todas[escola.codigo];


        if (
            !configuracao ||
            typeof configuracao !== "object"
        ) {

            return criarConfiguracaoPedagogicaVazia();

        }


        const recomendados =
            Array.isArray(
                configuracao.recomendados
            )

                ? configuracao.recomendados.filter(

                    function (id) {

                        return conteudos.some(

                            function (conteudo) {

                                return (
                                    conteudo.id === id
                                );

                            }

                        );

                    }

                )

                : [];


        let destaqueCampanha =
            configuracao.destaqueCampanha
            || null;


        if (
            destaqueCampanha

            &&

            !conteudos.some(

                function (conteudo) {

                    return (
                        conteudo.id ===
                        destaqueCampanha
                    );

                }

            )
        ) {

            destaqueCampanha =
                null;

        }


        return {

            recomendados:
                recomendados,

            destaqueCampanha:
                destaqueCampanha

        };

    }

    catch (erro) {

        return criarConfiguracaoPedagogicaVazia();

    }

}


function conteudoEhRecomendado(
    id
) {

    const configuracao =
        obterConfiguracaoPedagogica();


    return configuracao
        .recomendados
        .includes(
            id
        );

}


function conteudoEhCampanha(
    id
) {

    const configuracao =
        obterConfiguracaoPedagogica();


    return (
        configuracao.destaqueCampanha ===
        id
    );

}


/* =========================================
   DESTAQUE DA ESCOLA
========================================= */

function criarAreaDestaqueEscola() {

    if (
        document.getElementById(
            "destaqueEscolaSafeSchool"
        )
    ) {

        return;

    }


    const hero =
        document.querySelector(
            ".hero-conteudos"
        );


    if (
        !hero
    ) {

        return;

    }


    const area =
        document.createElement(
            "section"
        );


    area.id =
        "destaqueEscolaSafeSchool";


    area.className =
        "destaque-escola";


    area.hidden =
        true;


    area.innerHTML = `

        <div class="destaque-escola-icone">

            📢

        </div>


        <div class="destaque-escola-conteudo">

            <span>
                DESTAQUE DA ESCOLA
            </span>


            <h2 id="destaqueEscolaTitulo">
            </h2>


            <p id="destaqueEscolaResumo">
            </p>


            <div class="destaque-escola-rodape">

                <small id="destaqueEscolaInstituicao">
                </small>


                <button
                    type="button"
                    id="botaoAbrirDestaqueEscola"
                >
                    Ler tema em destaque →
                </button>

            </div>

        </div>

    `;


    hero.insertAdjacentElement(

        "afterend",

        area

    );


    const botao =
        document.getElementById(
            "botaoAbrirDestaqueEscola"
        );


    if (
        botao
    ) {

        botao.addEventListener(

            "click",

            function () {

                const configuracao =
                    obterConfiguracaoPedagogica();


                if (
                    configuracao.destaqueCampanha
                ) {

                    abrirConteudo(

                        configuracao.destaqueCampanha

                    );

                }

            }

        );

    }

}


function atualizarDestaqueEscola() {

    const area =
        document.getElementById(
            "destaqueEscolaSafeSchool"
        );


    if (
        !area
    ) {

        return;

    }


    const configuracao =
        obterConfiguracaoPedagogica();


    if (
        !configuracao.destaqueCampanha
    ) {

        area.hidden =
            true;


        return;

    }


    const conteudo =
        conteudos.find(

            function (item) {

                return (
                    item.id ===
                    configuracao.destaqueCampanha
                );

            }

        );


    if (
        !conteudo
    ) {

        area.hidden =
            true;


        return;

    }


    const titulo =
        document.getElementById(
            "destaqueEscolaTitulo"
        );


    const resumo =
        document.getElementById(
            "destaqueEscolaResumo"
        );


    const instituicao =
        document.getElementById(
            "destaqueEscolaInstituicao"
        );


    const escola =
        obterEscolaAtual();


    if (
        titulo
    ) {

        titulo.textContent =
            conteudo.icone +
            " " +
            conteudo.titulo;

    }


    if (
        resumo
    ) {

        resumo.textContent =
            conteudo.resumo;

    }


    if (
        instituicao
    ) {

        instituicao.textContent =

            escola

                ? (
                    "Tema destacado por " +
                    escola.nome
                )

                : "Tema destacado pela escola";

    }


    area.hidden =
        false;

}


/* =========================================
   SINALIZAÇÃO NA LEITURA
========================================= */

function criarSinalizacaoLeitura() {

    if (
        document.getElementById(
            "sinalizacaoLeituraEscola"
        )
    ) {

        return;

    }


    if (
        !leituraIcone
    ) {

        return;

    }


    const sinalizacao =
        document.createElement(
            "div"
        );


    sinalizacao.id =
        "sinalizacaoLeituraEscola";


    sinalizacao.className =
        "sinalizacao-leitura";


    sinalizacao.hidden =
        true;


    leituraIcone.insertAdjacentElement(

        "afterend",

        sinalizacao

    );

}


function atualizarSinalizacaoLeitura() {

    const area =
        document.getElementById(
            "sinalizacaoLeituraEscola"
        );


    if (
        !area ||
        !conteudoAtual
    ) {

        return;

    }


    const recomendado =
        conteudoEhRecomendado(
            conteudoAtual.id
        );


    const campanha =
        conteudoEhCampanha(
            conteudoAtual.id
        );


    let html =
        "";


    if (
        recomendado
    ) {

        html += `

            <span class="marcador-escola recomendado">

                ⭐ Recomendado pela escola

            </span>

        `;

    }


    if (
        campanha
    ) {

        html += `

            <span class="marcador-escola campanha">

                📢 Tema em destaque

            </span>

        `;

    }


    area.innerHTML =
        html;


    area.hidden =
        !html;

}


/* =========================================
   MARCADORES DOS CARDS
========================================= */

function criarMarcadoresEscola(
    id
) {

    const recomendado =
        conteudoEhRecomendado(
            id
        );


    const campanha =
        conteudoEhCampanha(
            id
        );


    if (
        !recomendado &&
        !campanha
    ) {

        return "";

    }


    let html = `

        <div class="marcadores-escola">

    `;


    if (
        recomendado
    ) {

        html += `

            <span class="marcador-escola recomendado">

                ⭐ Recomendado pela escola

            </span>

        `;

    }


    if (
        campanha
    ) {

        html += `

            <span class="marcador-escola campanha">

                📢 Tema em destaque

            </span>

        `;

    }


    html += `

        </div>

    `;


    return html;

}


/* =========================================
   CHAVE DO ALUNO
========================================= */

function obterChaveAluno() {

    const escola =
        obterEscolaAtual();


    const email =
        sessionStorage.getItem(
            "usuarioEmailSafeSchool"
        );


    if (
        !alunoEstaLogado() ||
        !email
    ) {

        return null;

    }


    return (

        (
            escola
                ? escola.codigo
                : "SEM-ESCOLA"
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

        pontos:
            0,

        desafiosConcluidos:
            [],

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


    if (
        !todos[chave]
    ) {

        return criarProgressoVazio();

    }


    const progresso =
        todos[chave];


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
   RENDERIZAR CONTEÚDOS
========================================= */

function renderizarConteudos() {

    if (
        !gradeConteudos
    ) {

        return;

    }


    const progresso =
        obterProgressoAluno();


    gradeConteudos.innerHTML =
        "";


    conteudos.forEach(

        function (conteudo) {

            const concluido =
                progresso.conteudosConcluidos
                    .includes(
                        conteudo.id
                    );


            const recomendado =
                conteudoEhRecomendado(
                    conteudo.id
                );


            const campanha =
                conteudoEhCampanha(
                    conteudo.id
                );


            const card =
                document.createElement(
                    "article"
                );


            let classes =
                "card-conteudo";


            if (
                concluido
            ) {

                classes +=
                    " concluido";

            }


            if (
                recomendado
            ) {

                classes +=
                    " recomendado-escola";

            }


            if (
                campanha
            ) {

                classes +=
                    " campanha-escola";

            }


            card.className =
                classes;


            card.innerHTML = `

                ${
                    concluido

                        ? `
                            <span class="selo-concluido">
                                ✓ Concluído
                            </span>
                        `

                        : ""
                }


                <div class="card-conteudo-icone">

                    ${conteudo.icone}

                </div>


                <span>

                    ${escaparHTML(
                        conteudo.categoria
                    )}

                </span>


                ${criarMarcadoresEscola(
                    conteudo.id
                )}


                <h3>

                    ${escaparHTML(
                        conteudo.titulo
                    )}

                </h3>


                <p>

                    ${escaparHTML(
                        conteudo.resumo
                    )}

                </p>


                <button
                    type="button"
                    class="botao-abrir-conteudo"
                    data-conteudo-id="${conteudo.id}"
                >

                    ${
                        concluido
                            ? "Rever conteúdo"
                            : "Ler conteúdo"
                    }

                </button>

            `;


            gradeConteudos.appendChild(
                card
            );

        }

    );


    gradeConteudos
        .querySelectorAll(
            "[data-conteudo-id]"
        )
        .forEach(

            function (botao) {

                botao.addEventListener(

                    "click",

                    function () {

                        abrirConteudo(

                            botao.getAttribute(
                                "data-conteudo-id"
                            )

                        );

                    }

                );

            }

        );


    atualizarResumo();

}


/* =========================================
   ABRIR CONTEÚDO
========================================= */

function abrirConteudo(
    id
) {

    conteudoAtual =
        conteudos.find(

            function (item) {

                return (
                    item.id === id
                );

            }

        );


    if (!conteudoAtual) {

        return;

    }


    leituraIcone.textContent =
        conteudoAtual.icone;


    leituraCategoria.textContent =
        conteudoAtual.categoria;


    leituraTitulo.textContent =
        conteudoAtual.titulo;


    leituraTexto.innerHTML =
        conteudoAtual.texto;


    leituraReflexao.innerHTML = `

        <strong>
            💭 Para refletir
        </strong>

        <p>
            ${escaparHTML(
                conteudoAtual.reflexao
            )}
        </p>

    `;


    atualizarSinalizacaoLeitura();


    atualizarBotaoConclusao();


    areaLeitura.hidden =
        false;


    areaLeitura.scrollIntoView({

        behavior:
            "smooth",

        block:
            "start"

    });

}


/* =========================================
   CONCLUIR CONTEÚDO
========================================= */

function concluirConteudo() {

    if (!conteudoAtual) {

        return;

    }


    if (
        !alunoEstaLogado()
    ) {

        const confirmar =
            confirm(

                "Você pode acessar os conteúdos sem login.\n\n" +

                "Para registrar a conclusão e ganhar pontos, entre como Aluno.\n\n" +

                "Deseja ir para a tela de login?"

            );


        if (!confirmar) {

            return;

        }


        const escola =
            obterEscolaAtual();


        window.location.href =
            escola
                ? (
                    "login.html?escola=" +
                    encodeURIComponent(
                        escola.codigo
                    )
                )
                : "login.html";


        return;

    }


    const progresso =
        obterProgressoAluno();


    const jaConcluido =
        progresso.conteudosConcluidos
            .includes(
                conteudoAtual.id
            );


    if (jaConcluido) {

        alert(
            "Este conteúdo já foi concluído anteriormente."
        );

        return;

    }


    progresso.conteudosConcluidos.push(
        conteudoAtual.id
    );


    progresso.pontos =
        Number(
            progresso.pontos || 0
        )
        +
        10;


    const salvo =
        salvarProgressoAluno(
            progresso
        );


    if (!salvo) {

        alert(
            "Não foi possível registrar o progresso do aluno."
        );

        return;

    }


    alert(

        "Conteúdo concluído! 🎉\n\n" +

        "Você conquistou 10 pontos."

    );


    renderizarConteudos();


    atualizarBotaoConclusao();

}


/* =========================================
   BOTÃO DE CONCLUSÃO
========================================= */

function atualizarBotaoConclusao() {

    if (!conteudoAtual) {

        return;

    }


    if (
        !alunoEstaLogado()
    ) {

        botaoConcluir.textContent =
            "🔐 Entrar para registrar progresso";


        botaoConcluir.classList.remove(
            "concluido"
        );


        return;

    }


    const progresso =
        obterProgressoAluno();


    const concluido =
        progresso.conteudosConcluidos
            .includes(
                conteudoAtual.id
            );


    if (concluido) {

        botaoConcluir.textContent =
            "✓ Conteúdo concluído";


        botaoConcluir.classList.add(
            "concluido"
        );

    }

    else {

        botaoConcluir.textContent =
            "✓ Marcar como concluído";


        botaoConcluir.classList.remove(
            "concluido"
        );

    }

}


/* =========================================
   RESUMO
========================================= */

function atualizarResumo() {

    const progresso =
        obterProgressoAluno();


    const concluidosValidos =
        progresso.conteudosConcluidos
            .filter(

                function (id) {

                    return conteudos.some(

                        function (conteudo) {

                            return (
                                conteudo.id === id
                            );

                        }

                    );

                }

            );


    if (
        numeroConcluidos
    ) {

        numeroConcluidos.textContent =
            concluidosValidos.length;

    }


    if (
        numeroTotal
    ) {

        numeroTotal.textContent =
            conteudos.length;

    }

}


/* =========================================
   FECHAR LEITURA
========================================= */

if (fecharLeitura) {

    fecharLeitura.addEventListener(

        "click",

        function () {

            areaLeitura.hidden =
                true;


            conteudoAtual =
                null;


            const sinalizacao =
                document.getElementById(
                    "sinalizacaoLeituraEscola"
                );


            if (
                sinalizacao
            ) {

                sinalizacao.hidden =
                    true;


                sinalizacao.innerHTML =
                    "";

            }

        }

    );

}


/* =========================================
   CONCLUIR
========================================= */

if (botaoConcluir) {

    botaoConcluir.addEventListener(

        "click",

        concluirConteudo

    );

}


/* =========================================
   PROTEGER TEXTOS
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
   INICIAR
========================================= */

criarAreaDestaqueEscola();

criarSinalizacaoLeitura();

renderizarConteudos();

atualizarDestaqueEscola();