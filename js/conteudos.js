/* =========================================
   SAFESCHOOL
   APRENDER E REFLETIR
========================================= */


/* =========================================
   ESTADO DA AUTENTICAÇÃO E PROGRESSO
========================================= */

let supabase =
    null;


let usuarioAtual =
    null;


let perfilAtual =
    null;


let autenticacaoVerificada =
    false;


let carregandoProgresso =
    false;


let registrandoConclusao =
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
            todas[
                escola.codigo
            ];


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

        console.warn(
            "SafeSchool: não foi possível ler as recomendações pedagógicas.",
            erro
        );


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
   ESTADO DO ALUNO
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
   NORMALIZAR PROGRESSO DO BANCO
========================================= */

function normalizarProgressoBanco(
    progresso
) {

    if (
        !progresso ||
        typeof progresso !== "object"
    ) {

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
   COMPATIBILIDADE TEMPORÁRIA
   COM AS PÁGINAS AINDA NÃO MIGRADAS
========================================= */

function obterChaveCompatibilidadeLocal() {

    if (
        !usuarioAtual ||
        !usuarioAtual.email
    ) {

        return null;

    }


    const escola =
        obterEscolaAtual();


    let codigoEscola =
        escola &&
        escola.codigo

            ? escola.codigo

            : sessionStorage.getItem(
                "codigoEscolaSafeSchool"
            );


    if (
        !codigoEscola
    ) {

        codigoEscola =
            "SEM-ESCOLA";

    }


    return (

        codigoEscola

        +

        "::"

        +

        usuarioAtual.email
            .trim()
            .toLowerCase()

    );

}


function sincronizarCompatibilidadeLocal() {

    if (
        !alunoEstaLogado()
    ) {

        return;

    }


    if (
        usuarioAtual &&
        usuarioAtual.email
    ) {

        sessionStorage.setItem(
            "usuarioEmailSafeSchool",
            usuarioAtual.email
        );

    }


    sessionStorage.setItem(
        "perfilSafeSchool",
        "aluno"
    );


    const escola =
        obterEscolaAtual();


    if (
        escola &&
        escola.codigo
    ) {

        sessionStorage.setItem(
            "codigoEscolaSafeSchool",
            escola.codigo
        );

    }


    const chave =
        obterChaveCompatibilidadeLocal();


    if (
        !chave
    ) {

        return;

    }


    let todos =
        {};


    const dadosAtuais =
        sessionStorage.getItem(
            "progressoAlunoSafeSchool"
        );


    if (
        dadosAtuais
    ) {

        try {

            const dadosConvertidos =
                JSON.parse(
                    dadosAtuais
                );


            if (
                dadosConvertidos &&
                typeof dadosConvertidos === "object"
            ) {

                todos =
                    dadosConvertidos;

            }

        }

        catch (erro) {

            todos =
                {};

        }

    }


    todos[chave] = {

        conteudosConcluidos:
            [
                ...progressoAlunoAtual
                    .conteudosConcluidos
            ],

        desafiosConcluidos:
            [
                ...progressoAlunoAtual
                    .desafiosConcluidos
            ],

        pontos:
            progressoAlunoAtual
                .pontos,

        selos:
            [
                ...progressoAlunoAtual
                    .selos
            ]

    };


    sessionStorage.setItem(

        "progressoAlunoSafeSchool",

        JSON.stringify(
            todos
        )

    );

}


/* =========================================
   OBTER SUPABASE
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
   AUTENTICAÇÃO
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

        console.warn(
            "SafeSchool: não foi possível verificar a sessão.",
            error
        );


        usuarioAtual =
            null;


        perfilAtual =
            null;


        return;

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

        console.warn(
            "SafeSchool: não foi possível carregar o perfil do usuário.",
            erroPerfil
        );


        perfilAtual =
            null;


        return;

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
            normalizarProgressoBanco(
                null
            );


        return;

    }


    carregandoProgresso =
        true;


    try {

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


        sincronizarCompatibilidadeLocal();

    }

    catch (erro) {

        console.error(
            "SafeSchool: não foi possível carregar o progresso real do aluno.",
            erro
        );


        progressoAlunoAtual =
            normalizarProgressoBanco(
                null
            );


        throw erro;

    }

    finally {

        carregandoProgresso =
            false;

    }

}


/* =========================================
   OBTER PROGRESSO
========================================= */

function obterProgressoAluno() {

    return progressoAlunoAtual;

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
                progresso
                    .conteudosConcluidos
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


    if (
        !conteudoAtual
    ) {

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
   IR PARA LOGIN
========================================= */

function irParaLoginAluno() {

    const escola =
        obterEscolaAtual();


    window.location.href =

        escola &&
        escola.codigo

            ? (
                "login.html?escola=" +
                encodeURIComponent(
                    escola.codigo
                )
            )

            : "login.html";

}


/* =========================================
   CONCLUIR CONTEÚDO
========================================= */

async function concluirConteudo() {

    if (
        !conteudoAtual
    ) {

        return;

    }


    if (
        !autenticacaoVerificada
    ) {

        alert(
            "Aguarde um instante enquanto o SafeSchool verifica seu acesso."
        );


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


        if (
            confirmar
        ) {

            irParaLoginAluno();

        }


        return;

    }


    if (
        carregandoProgresso ||
        registrandoConclusao
    ) {

        return;

    }


    const progresso =
        obterProgressoAluno();


    const jaConcluido =
        progresso
            .conteudosConcluidos
            .includes(
                conteudoAtual.id
            );


    if (
        jaConcluido
    ) {

        alert(
            "Este conteúdo já foi concluído anteriormente."
        );


        return;

    }


    registrandoConclusao =
        true;


    atualizarBotaoConclusao();


    const pontosAntes =
        Number(
            progresso.pontos || 0
        );


    try {

        const {
            data,
            error
        } =
            await supabase.rpc(
                "registrar_conclusao_conteudo",
                {
                    p_conteudo_id:
                        conteudoAtual.id
                }
            );


        if (
            error
        ) {

            throw error;

        }


        const novoProgresso =
            normalizarProgressoBanco(
                data
            );


        progressoAlunoAtual =
            novoProgresso;


        sincronizarCompatibilidadeLocal();


        const ganhouPontos =
            novoProgresso.pontos >
            pontosAntes;


        if (
            ganhouPontos
        ) {

            alert(

                "Conteúdo concluído! 🎉\n\n" +

                "Você conquistou 10 pontos."

            );

        }

        else {

            alert(
                "Este conteúdo já havia sido concluído anteriormente."
            );

        }


        renderizarConteudos();


        atualizarBotaoConclusao();

    }

    catch (erro) {

        console.error(
            "SafeSchool: não foi possível registrar a conclusão do conteúdo.",
            erro
        );


        alert(
            "Não foi possível registrar seu progresso agora. Tente novamente."
        );

    }

    finally {

        registrandoConclusao =
            false;


        atualizarBotaoConclusao();

    }

}


/* =========================================
   BOTÃO DE CONCLUSÃO
========================================= */

function atualizarBotaoConclusao() {

    if (
        !botaoConcluir ||
        !conteudoAtual
    ) {

        return;

    }


    if (
        !autenticacaoVerificada
    ) {

        botaoConcluir.textContent =
            "Carregando...";


        botaoConcluir.disabled =
            true;


        botaoConcluir.classList.remove(
            "concluido"
        );


        return;

    }


    if (
        !alunoEstaLogado()
    ) {

        botaoConcluir.textContent =
            "🔐 Entrar para registrar progresso";


        botaoConcluir.disabled =
            false;


        botaoConcluir.classList.remove(
            "concluido"
        );


        return;

    }


    if (
        carregandoProgresso
    ) {

        botaoConcluir.textContent =
            "Carregando seu progresso...";


        botaoConcluir.disabled =
            true;


        botaoConcluir.classList.remove(
            "concluido"
        );


        return;

    }


    if (
        registrandoConclusao
    ) {

        botaoConcluir.textContent =
            "Registrando...";


        botaoConcluir.disabled =
            true;


        return;

    }


    const progresso =
        obterProgressoAluno();


    const concluido =
        progresso
            .conteudosConcluidos
            .includes(
                conteudoAtual.id
            );


    botaoConcluir.disabled =
        false;


    if (
        concluido
    ) {

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
        progresso
            .conteudosConcluidos
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

if (
    fecharLeitura
) {

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

if (
    botaoConcluir
) {

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
   INICIALIZAR DADOS REAIS
========================================= */

async function inicializarDadosReais() {

    try {

        supabase =
            await obterSupabase();


        await carregarUsuarioAtual();


        autenticacaoVerificada =
            true;


        if (
            alunoEstaLogado()
        ) {

            await carregarProgressoAluno();

        }


        renderizarConteudos();


        if (
            conteudoAtual
        ) {

            atualizarBotaoConclusao();

        }


        console.log(
            "SafeSchool: conteúdos integrados ao progresso real."
        );

    }

    catch (erro) {

        autenticacaoVerificada =
            true;


        console.error(
            "SafeSchool: falha ao inicializar o progresso dos conteúdos.",
            erro
        );


        renderizarConteudos();


        if (
            conteudoAtual
        ) {

            atualizarBotaoConclusao();

        }

    }

}


/* =========================================
   INICIAR
========================================= */

criarAreaDestaqueEscola();

criarSinalizacaoLeitura();

renderizarConteudos();

atualizarDestaqueEscola();

inicializarDadosReais();