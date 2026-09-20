/* =========================================
   SAFESCHOOL
   JOGOS E DESAFIOS
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


let carregandoProgresso =
    false;


let registrandoConclusao =
    false;


/* =========================================
   DESAFIOS
========================================= */

const desafios = [

    {

        id:
            "brincadeira-limite",

        icone:
            "🤔",

        categoria:
            "Respeito",

        titulo:
            "Quando a brincadeira deixa de ser divertida",

        resumo:
            "Observe os sinais e pense sobre os limites de cada pessoa.",

        situacao: `

            <p>

                Durante o intervalo, alguns colegas começam
                a fazer piadas sobre o jeito de falar de um aluno.
                No começo ele tenta sorrir, porém, depois de alguns
                minutos, pede para que parem e fica mais quieto.

                <strong>
                    O que seria uma atitude mais respeitosa?
                </strong>

            </p>

        `,

        alternativas: [

            {
                texto:
                    "Continuar, porque ele sorriu no começo.",

                correta:
                    false,

                feedback:
                    "Mesmo que alguém tenha rido no início, quando demonstra desconforto ou pede para parar, esse limite precisa ser respeitado."
            },

            {
                texto:
                    "Parar a brincadeira e respeitar o pedido dele.",

                correta:
                    true,

                feedback:
                    "Isso mesmo. Uma brincadeira só continua saudável quando todas as pessoas envolvidas se sentem bem. Respeitar um pedido para parar é uma atitude de cuidado."
            },

            {
                texto:
                    "Dizer que ele precisa aprender a levar tudo na brincadeira.",

                correta:
                    false,

                feedback:
                    "Cada pessoa possui limites diferentes. Por isso, não cabe aos outros decidir o que alguém deve ou não achar engraçado."
            }

        ]

    },


    {

        id:
            "grupo-da-turma",

        icone:
            "📱",

        categoria:
            "Internet",

        titulo:
            "Uma mensagem no grupo da turma",

        resumo:
            "Pense antes de compartilhar algo que pode machucar outra pessoa.",

        situacao: `

            <p>

                Uma montagem constrangedora com a foto
                de uma colega começa a circular no grupo da turma.
                Algumas pessoas estão enviando emojis de risada
                e repassando a imagem para outros grupos.

                <strong>
                    O que você pode fazer?
                </strong>

            </p>

        `,

        alternativas: [

            {
                texto:
                    "Não compartilhar, avisar um adulto de confiança e, quando for seguro, guardar evidências.",

                correta:
                    true,

                feedback:
                    "Boa escolha. Não ampliar a exposição, preservar evidências quando for seguro e procurar ajuda são atitudes que podem contribuir para interromper a situação."
            },

            {
                texto:
                    "Compartilhar apenas com um amigo para mostrar o que aconteceu.",

                correta:
                    false,

                feedback:
                    "Mesmo com a intenção de mostrar o problema, encaminhar a imagem pode aumentar ainda mais a exposição. É melhor guardar a evidência sem continuar espalhando o conteúdo."
            },

            {
                texto:
                    "Responder no grupo com outra montagem para defender a colega.",

                correta:
                    false,

                feedback:
                    "Responder com uma nova humilhação tende a aumentar o conflito. Existem maneiras de ajudar sem repetir o mesmo comportamento."
            }

        ]

    },


    {

        id:
            "colega-sozinho",

        icone:
            "🧩",

        categoria:
            "Convivência",

        titulo:
            "Um colega está sempre ficando de fora",

        resumo:
            "Pequenas atitudes de acolhimento também fazem diferença.",

        situacao: `

            <p>

                Você percebe que um colega quase sempre
                fica sozinho nos trabalhos em grupo.
                Além disso, algumas pessoas combinam de propósito
                que ninguém deve chamá-lo para participar.

                <strong>
                    Qual atitude pode ajudar?
                </strong>

            </p>

        `,

        alternativas: [

            {
                texto:
                    "Ignorar, porque cada pessoa deve resolver seus próprios problemas.",

                correta:
                    false,

                feedback:
                    "Nem sempre quem está sendo excluído consegue resolver a situação sozinho. Uma atitude de acolhimento pode fazer diferença."
            },

            {
                texto:
                    "Convidá-lo para participar e, se a exclusão continuar, conversar com um adulto.",

                correta:
                    true,

                feedback:
                    "Muito bem. Incluir alguém e procurar ajuda quando uma exclusão é repetida são formas de contribuir para uma convivência mais respeitosa."
            },

            {
                texto:
                    "Perguntar na frente de todos por que ninguém gosta dele.",

                correta:
                    false,

                feedback:
                    "Essa abordagem pode expor ainda mais o colega. É melhor demonstrar acolhimento sem colocá-lo em uma situação constrangedora."
            }

        ]

    },


    {

        id:
            "presenciei-agressao",

        icone:
            "👀",

        categoria:
            "Atitude",

        titulo:
            "Você presencia uma agressão",

        resumo:
            "Ajudar não significa necessariamente enfrentar a situação sozinho.",

        situacao: `

            <p>

                Na saída da escola, você percebe
                que um colega está sendo ameaçado por outros alunos.
                Você fica preocupado, mas também tem medo
                de se aproximar.

                <strong>
                    O que seria mais seguro fazer?
                </strong>

            </p>

        `,

        alternativas: [

            {
                texto:
                    "Entrar sozinho no meio da situação, mesmo que exista risco.",

                correta:
                    false,

                feedback:
                    "Ajudar é importante, porém você também deve preservar sua segurança. Não é necessário enfrentar uma situação perigosa sozinho."
            },

            {
                texto:
                    "Procurar rapidamente um adulto ou responsável que possa intervir com segurança.",

                correta:
                    true,

                feedback:
                    "Correto. Procurar alguém que possa intervir com segurança é uma forma responsável de ajudar sem colocar você em perigo."
            },

            {
                texto:
                    "Filmar e publicar para que outras pessoas saibam o que aconteceu.",

                correta:
                    false,

                feedback:
                    "Publicar pode aumentar a exposição e o sofrimento de quem está envolvido. O mais importante é buscar ajuda e preservar a segurança."
            }

        ]

    },


    {

        id:
            "pedir-ajuda",

        icone:
            "💬",

        categoria:
            "Acolhimento",

        titulo:
            "Quando é difícil contar",

        resumo:
            "Você não precisa encontrar as palavras perfeitas para pedir ajuda.",

        situacao: `

            <p>

                Um aluno está passando por provocações
                há algumas semanas. Ele quer procurar ajuda,
                mas sente vergonha e não sabe como explicar
                tudo o que aconteceu.

                <strong>
                    Como ele pode começar?
                </strong>

            </p>

        `,

        alternativas: [

            {
                texto:
                    "Esperar até conseguir explicar tudo perfeitamente.",

                correta:
                    false,

                feedback:
                    "Não é necessário organizar toda a história antes de pedir ajuda. A conversa pode começar aos poucos."
            },

            {
                texto:
                    'Dizer algo simples, como: "Está acontecendo uma coisa comigo e eu preciso de ajuda."',

                correta:
                    true,

                feedback:
                    "Exatamente. Uma frase simples pode abrir espaço para a conversa. Depois, a pessoa pode contar o que conseguir, no seu tempo."
            },

            {
                texto:
                    "Não contar para ninguém para evitar preocupação.",

                correta:
                    false,

                feedback:
                    "Guardar tudo sozinho pode tornar a situação ainda mais difícil. Procurar alguém de confiança permite que outras pessoas possam ajudar."
            }

        ]

    },


    {

        id:
            "nao-incentivar",

        icone:
            "🤝",

        categoria:
            "Empatia",

        titulo:
            "Quando todo mundo está rindo",

        resumo:
            "Quem presencia também influencia o que acontece ao redor.",

        situacao: `

            <p>

                Durante a aula, um aluno responde
                uma pergunta de forma errada.
                Alguns colegas começam a rir e fazer comentários.
                Você percebe que ele fica constrangido.

                <strong>
                    Qual atitude contribui para melhorar a situação?
                </strong>

            </p>

        `,

        alternativas: [

            {
                texto:
                    "Rir também para não parecer diferente do grupo.",

                correta:
                    false,

                feedback:
                    "Quando outras pessoas acompanham as risadas, o constrangimento pode aumentar. Não incentivar já é uma forma de ajudar."
            },

            {
                texto:
                    "Não participar das provocações e tratar o colega normalmente.",

                correta:
                    true,

                feedback:
                    "Boa escolha. Às vezes, uma atitude simples de respeito já ajuda a interromper o clima de humilhação e mostra que aquela situação não precisa ser incentivada."
            },

            {
                texto:
                    "Repetir a resposta errada depois da aula para fazer graça.",

                correta:
                    false,

                feedback:
                    "Isso prolongaria o constrangimento. Errar faz parte do aprendizado e não deve ser usado para humilhar alguém."
            }

        ]

    }

];


/* =========================================
   ELEMENTOS
========================================= */

const gradeDesafios =
    document.getElementById(
        "gradeDesafios"
    );


const areaJogo =
    document.getElementById(
        "areaJogo"
    );


const fecharJogo =
    document.getElementById(
        "fecharJogo"
    );


const jogoIcone =
    document.getElementById(
        "jogoIcone"
    );


const jogoCategoria =
    document.getElementById(
        "jogoCategoria"
    );


const jogoTitulo =
    document.getElementById(
        "jogoTitulo"
    );


const jogoSituacao =
    document.getElementById(
        "jogoSituacao"
    );


const alternativas =
    document.getElementById(
        "alternativas"
    );


const feedback =
    document.getElementById(
        "feedback"
    );


const numeroDesafiosConcluidos =
    document.getElementById(
        "numeroDesafiosConcluidos"
    );


const numeroTotalDesafios =
    document.getElementById(
        "numeroTotalDesafios"
    );


let desafioAtual =
    null;


/* =========================================
   PROGRESSO ATUAL
========================================= */

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
   OBTER ESCOLA
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
   NORMALIZAR PROGRESSO
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
   COMPATIBILIDADE TEMPORÁRIA
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


    sessionStorage.setItem(
        "perfilSafeSchool",
        "aluno"
    );


    if (
        usuarioAtual &&
        usuarioAtual.email
    ) {

        sessionStorage.setItem(
            "usuarioEmailSafeSchool",
            usuarioAtual.email
        );

    }


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

            const convertido =
                JSON.parse(
                    dadosAtuais
                );


            if (
                convertido &&
                typeof convertido === "object"
            ) {

                todos =
                    convertido;

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
   PROGRESSO REAL
========================================= */

async function carregarProgressoAluno() {

    if (
        !alunoEstaLogado()
    ) {

        progressoAlunoAtual =
            criarProgressoVazio();


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

    finally {

        carregandoProgresso =
            false;

    }

}


function obterProgressoAluno() {

    return progressoAlunoAtual;

}


/* =========================================
   RENDERIZAR CARDS
========================================= */

function renderizarDesafios() {

    if (
        !gradeDesafios
    ) {

        return;

    }


    const progresso =
        obterProgressoAluno();


    gradeDesafios.innerHTML =
        "";


    desafios.forEach(

        function (desafio) {

            const concluido =
                progresso
                    .desafiosConcluidos
                    .includes(
                        desafio.id
                    );


            const card =
                document.createElement(
                    "article"
                );


            card.className =
                concluido
                    ? "card-desafio concluido"
                    : "card-desafio";


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


                <div class="card-icone">
                    ${desafio.icone}
                </div>


                <span class="card-categoria">

                    ${escaparHTML(
                        desafio.categoria
                    )}

                </span>


                <h3>

                    ${escaparHTML(
                        desafio.titulo
                    )}

                </h3>


                <p>

                    ${escaparHTML(
                        desafio.resumo
                    )}

                </p>


                <button
                    type="button"
                    class="botao-desafio"
                    data-desafio-id="${desafio.id}"
                >

                    ${
                        concluido
                            ? "Jogar novamente"
                            : "Começar desafio"
                    }

                </button>

            `;


            gradeDesafios.appendChild(
                card
            );

        }

    );


    gradeDesafios
        .querySelectorAll(
            "[data-desafio-id]"
        )
        .forEach(

            function (botao) {

                botao.addEventListener(

                    "click",

                    function () {

                        abrirDesafio(

                            botao.getAttribute(
                                "data-desafio-id"
                            )

                        );

                    }

                );

            }

        );


    atualizarResumo();

}


/* =========================================
   ABRIR DESAFIO
========================================= */

function abrirDesafio(
    id
) {

    if (
        carregandoProgresso ||
        registrandoConclusao
    ) {

        return;

    }


    desafioAtual =
        desafios.find(

            function (desafio) {

                return (
                    desafio.id === id
                );

            }

        );


    if (
        !desafioAtual
    ) {

        return;

    }


    jogoIcone.textContent =
        desafioAtual.icone;


    jogoCategoria.textContent =
        desafioAtual.categoria;


    jogoTitulo.textContent =
        desafioAtual.titulo;


    jogoSituacao.innerHTML =
        desafioAtual.situacao;


    feedback.hidden =
        true;


    feedback.className =
        "feedback";


    feedback.innerHTML =
        "";


    renderizarAlternativas();


    areaJogo.hidden =
        false;


    areaJogo.scrollIntoView({

        behavior:
            "smooth",

        block:
            "start"

    });

}


/* =========================================
   ALTERNATIVAS
========================================= */

function renderizarAlternativas() {

    alternativas.innerHTML =
        "";


    desafioAtual.alternativas.forEach(

        function (
            alternativa,
            indice
        ) {

            const botao =
                document.createElement(
                    "button"
                );


            botao.type =
                "button";


            botao.className =
                "botao-alternativa";


            botao.textContent =
                alternativa.texto;


            botao.addEventListener(

                "click",

                function () {

                    responderDesafio(
                        indice
                    );

                }

            );


            alternativas.appendChild(
                botao
            );

        }

    );

}


/* =========================================
   DESABILITAR ALTERNATIVAS
========================================= */

function definirAlternativasDesabilitadas(
    desabilitar
) {

    if (
        !alternativas
    ) {

        return;

    }


    alternativas
        .querySelectorAll(
            ".botao-alternativa"
        )
        .forEach(

            function (botao) {

                botao.disabled =
                    desabilitar;

            }

        );

}


/* =========================================
   RESPONDER
========================================= */

async function responderDesafio(
    indice
) {

    if (
        registrandoConclusao
    ) {

        return;

    }


    const alternativa =
        desafioAtual
            .alternativas[indice];


    if (
        !alternativa
    ) {

        return;

    }


    if (
        alternativa.correta
    ) {

        feedback.className =
            "feedback acerto";


        feedback.innerHTML = `

            <strong>
                🌟 Boa escolha!
            </strong>

            ${escaparHTML(
                alternativa.feedback
            )}

        `;


        feedback.hidden =
            false;


        definirAlternativasDesabilitadas(
            true
        );


        const registrado =
            await concluirDesafio();


        if (
            !registrado
        ) {

            definirAlternativasDesabilitadas(
                false
            );

        }


        return;

    }


    feedback.className =
        "feedback tentar";


    feedback.innerHTML = `

        <strong>
            💭 Vale pensar mais um pouco.
        </strong>

        ${escaparHTML(
            alternativa.feedback
        )}

        <br><br>

        Você pode escolher outra opção.

    `;


    feedback.hidden =
        false;

}


/* =========================================
   CONCLUIR DESAFIO
========================================= */

async function concluirDesafio() {

    if (
        !desafioAtual ||
        !alunoEstaLogado() ||
        registrandoConclusao
    ) {

        return false;

    }


    const progresso =
        obterProgressoAluno();


    const jaConcluido =
        progresso
            .desafiosConcluidos
            .includes(
                desafioAtual.id
            );


    /*
        O aluno pode jogar novamente.
        Se já concluiu, não recebe
        pontos novamente.
    */

    if (
        jaConcluido
    ) {

        feedback.innerHTML += `

            <br><br>

            <span>
                ✓ Você já havia concluído este desafio.
                Seus pontos foram mantidos.
            </span>

        `;


        renderizarDesafios();


        return true;

    }


    registrandoConclusao =
        true;


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
                "registrar_conclusao_desafio",
                {
                    p_desafio_id:
                        desafioAtual.id
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

            feedback.innerHTML += `

                <br><br>

                <strong>
                    🎉 Desafio concluído!
                    Você conquistou 20 pontos.
                </strong>

            `;

        }

        else {

            feedback.innerHTML += `

                <br><br>

                <span>
                    ✓ Este desafio já estava concluído.
                    Seus pontos foram mantidos.
                </span>

            `;

        }


        renderizarDesafios();


        return true;

    }

    catch (erro) {

        console.error(
            "SafeSchool: não foi possível registrar a conclusão do desafio.",
            erro
        );


        feedback.className =
            "feedback tentar";


        feedback.innerHTML = `

            <strong>
                Não foi possível salvar seu progresso agora.
            </strong>

            <br><br>

            Tente novamente em alguns instantes.

        `;


        feedback.hidden =
            false;


        return false;

    }

    finally {

        registrandoConclusao =
            false;

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
            .desafiosConcluidos
            .filter(

                function (id) {

                    return desafios.some(

                        function (desafio) {

                            return (
                                desafio.id === id
                            );

                        }

                    );

                }

            );


    if (
        numeroDesafiosConcluidos
    ) {

        numeroDesafiosConcluidos.textContent =
            concluidosValidos.length;

    }


    if (
        numeroTotalDesafios
    ) {

        numeroTotalDesafios.textContent =
            desafios.length;

    }

}


/* =========================================
   FECHAR JOGO
========================================= */

if (
    fecharJogo
) {

    fecharJogo.addEventListener(

        "click",

        function () {

            if (
                registrandoConclusao
            ) {

                return;

            }


            areaJogo.hidden =
                true;


            desafioAtual =
                null;

        }

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
   REDIRECIONAR PARA LOGIN
========================================= */

function redirecionarLoginRestrito() {

    let codigoEscola =
        sessionStorage.getItem(
            "codigoEscolaSafeSchool"
        );


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

async function inicializarDesafios() {

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


        renderizarDesafios();


        console.log(
            "SafeSchool: desafios integrados ao progresso real."
        );

    }

    catch (erro) {

        autenticacaoVerificada =
            true;


        console.error(
            "SafeSchool: falha ao inicializar os desafios.",
            erro
        );


        alert(
            "Não foi possível carregar seus desafios agora."
        );

    }

}


/* =========================================
   INICIAR
========================================= */

inicializarDesafios();