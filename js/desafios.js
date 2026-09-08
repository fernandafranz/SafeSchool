/* =========================================
   SAFESCHOOL
   JOGOS E DESAFIOS
========================================= */


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
   VERIFICAR LOGIN
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
   RENDERIZAR CARDS
========================================= */

function renderizarDesafios() {

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

    desafioAtual =
        desafios.find(

            function (desafio) {

                return (
                    desafio.id === id
                );

            }

        );


    if (!desafioAtual) {

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
   RESPONDER
========================================= */

function responderDesafio(
    indice
) {

    const alternativa =
        desafioAtual
            .alternativas[indice];


    if (!alternativa) {

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


        concluirDesafio();


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

function concluirDesafio() {

    if (
        !desafioAtual
    ) {

        return;

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
        Se já foi concluído antes,
        permitimos jogar novamente,
        mas não duplicamos os pontos.
    */

    if (jaConcluido) {

        renderizarDesafios();

        atualizarResumo();

        return;

    }


    progresso
        .desafiosConcluidos
        .push(
            desafioAtual.id
        );


    progresso.pontos =
        Number(
            progresso.pontos || 0
        )
        +
        20;


    salvarProgressoAluno(
        progresso
    );


    feedback.innerHTML += `

        <br><br>

        <strong>
            🎉 Desafio concluído!
            Você conquistou 20 pontos.
        </strong>

    `;


    renderizarDesafios();

    atualizarResumo();

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


    numeroDesafiosConcluidos.textContent =
        concluidosValidos.length;


    numeroTotalDesafios.textContent =
        desafios.length;

}


/* =========================================
   FECHAR JOGO
========================================= */

if (fecharJogo) {

    fecharJogo.addEventListener(

        "click",

        function () {

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


    return false;
}


/* =========================================
   INICIAR
========================================= */

if (
    verificarAcessoAluno()
) {

    renderizarDesafios();

}