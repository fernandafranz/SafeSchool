/* =========================================
   SAFESCHOOL
   BIBLIOTECA CENTRAL DE CONTEÚDOS
========================================= */


/*
    Esta biblioteca concentra os conteúdos
    educativos utilizados pelo SafeSchool.

    Ela poderá ser utilizada por diferentes
    áreas do sistema, como:

    - Área do aluno
    - Área da equipe escolar
    - Recomendações pedagógicas
    - Indicadores e ações preventivas

    Os dados de progresso do aluno NÃO ficam
    armazenados neste arquivo.
*/


(function () {

    "use strict";


    /* =========================================
       CONTEÚDOS
    ========================================== */

    const conteudos = [


        /* =========================================
           1 - O QUE É BULLYING
        ========================================== */

        {

            id:
                "o-que-e-bullying",

            icone:
                "🛡️",

            categoria:
                "Entender",

            titulo:
                "O que é bullying?",

            resumo:
                "Entenda o que caracteriza o bullying e por que algumas situações precisam ser levadas a sério.",

            texto: `

                <p>
                    Às vezes, uma discussão ou um desentendimento
                    pode acontecer entre colegas. Entretanto,
                    <strong>bullying não é simplesmente qualquer conflito ou brincadeira que deu errado.</strong>
                    Ele acontece quando atitudes de intimidação,
                    humilhação, agressão ou exclusão acabam causando
                    sofrimento, medo ou insegurança.
                </p>

                <p>
                    Essas situações podem aparecer de diferentes formas.
                    Por exemplo, podem envolver apelidos ofensivos,
                    ameaças, empurrões, agressões, comentários humilhantes,
                    exclusão do grupo ou até atitudes praticadas
                    pela internet.
                </p>

                <p>
                    Além disso, nem sempre é fácil perceber
                    ou explicar exatamente o que está acontecendo.
                    Por isso, mesmo quando você não sabe dizer
                    se determinada situação é ou não bullying,
                    é importante conversar com alguém
                    se aquilo estiver fazendo você ou outra pessoa sofrer.
                </p>

                <p>
                    Dessa forma, pedir ajuda pode ser o primeiro passo
                    para que a situação seja compreendida
                    e acompanhada com mais cuidado.
                </p>

            `,

            reflexao:
                "Se alguma situação está fazendo você ou outra pessoa se sentir com medo, humilhada, isolada ou insegura, vale procurar um adulto de confiança e contar o que está acontecendo.",

            finalidade:
                "Compreensão",

            usoPedagogico:
                "Indicado para introduzir o tema e ajudar os estudantes a compreenderem o que pode caracterizar uma situação de bullying."

        },


        /* =========================================
           2 - BULLYING OU BRINCADEIRA
        ========================================== */

        {

            id:
                "bullying-ou-brincadeira",

            icone:
                "🤔",

            categoria:
                "Refletir",

            titulo:
                "Bullying ou brincadeira?",

            resumo:
                "Uma brincadeira só é realmente divertida quando todas as pessoas envolvidas também se sentem bem.",

            texto: `

                <p>
                    Entre amigos e colegas, brincar faz parte
                    da convivência. No entanto,
                    <strong>uma brincadeira saudável precisa ser divertida para todos os envolvidos</strong>,
                    e não apenas para quem está fazendo a piada.
                </p>

                <p>
                    Por isso, quando alguém pede para parar,
                    demonstra desconforto, fica triste,
                    sente vergonha ou passa a evitar determinado grupo,
                    é importante prestar atenção.
                    Nesses casos, dizer apenas
                    “foi só uma brincadeira”
                    não resolve o problema.
                </p>

                <p>
                    Além disso, cada pessoa possui limites diferentes.
                    Algo que parece engraçado para um colega
                    pode machucar profundamente outro.
                    Assim, respeitar quando alguém demonstra
                    que não gostou também é uma forma de cuidado.
                </p>

                <p>
                    Consequentemente, aprender a perceber
                    como nossas atitudes afetam outras pessoas
                    ajuda a construir relações mais respeitosas.
                </p>

            `,

            reflexao:
                "Antes de fazer uma brincadeira com alguém, pense: a outra pessoa também está se divertindo ou apenas está tentando disfarçar que ficou desconfortável?",

            finalidade:
                "Convivência",

            usoPedagogico:
                "Pode ser trabalhado em rodas de conversa sobre limites, respeito e diferenças entre brincadeiras saudáveis e atitudes que causam sofrimento."

        },


        /* =========================================
           3 - CYBERBULLYING
        ========================================== */

        {

            id:
                "cyberbullying",

            icone:
                "📱",

            categoria:
                "Internet",

            titulo:
                "Cyberbullying",

            resumo:
                "As agressões também podem acontecer pela internet e, por isso, precisam ser tratadas com a mesma atenção.",

            texto: `

                <p>
                    Hoje grande parte da convivência também acontece
                    pela internet. Por isso, conflitos e agressões
                    podem aparecer em redes sociais,
                    aplicativos de mensagens, jogos online
                    e grupos de conversa.
                </p>

                <p>
                    O cyberbullying pode envolver comentários ofensivos,
                    exposição de imagens sem autorização,
                    criação de perfis falsos, ameaças,
                    divulgação de boatos ou mensagens humilhantes.
                    Além disso, como uma publicação pode ser
                    compartilhada rapidamente, o sofrimento causado
                    pode atingir ainda mais pessoas.
                </p>

                <p>
                    Quando isso acontecer,
                    <strong>guardar evidências pode ser importante</strong>.
                    Capturas de tela, mensagens, links
                    ou registros da publicação podem ajudar
                    a escola e os responsáveis a compreenderem
                    melhor a situação.
                </p>

                <p>
                    Ao mesmo tempo, procure evitar responder
                    com novas ofensas ou ameaças.
                    Sempre que for possível, bloquear o perfil,
                    denunciar o conteúdo na própria plataforma
                    e conversar com um adulto de confiança
                    são atitudes mais seguras.
                </p>

            `,

            reflexao:
                "O fato de algo acontecer pela internet não significa que seja menos importante. Se uma situação online está causando medo, vergonha ou sofrimento, procure ajuda.",

            finalidade:
                "Prevenção digital",

            usoPedagogico:
                "Indicado para campanhas sobre convivência digital, redes sociais, grupos de mensagens e uso responsável da internet."

        },


        /* =========================================
           4 - EXCLUSÃO SOCIAL
        ========================================== */

        {

            id:
                "exclusao-social",

            icone:
                "🧩",

            categoria:
                "Convivência",

            titulo:
                "Exclusão também pode machucar",

            resumo:
                "Algumas formas de violência são silenciosas, mas isso não significa que causem menos sofrimento.",

            texto: `

                <p>
                    Quando pensamos em bullying,
                    muitas vezes imaginamos somente agressões físicas
                    ou xingamentos. Entretanto,
                    algumas situações acontecem de maneira mais silenciosa
                    e também podem machucar.
                </p>

                <p>
                    Espalhar boatos, convencer outras pessoas
                    a não conversar com determinado colega,
                    impedir repetidamente sua participação
                    ou deixá-lo de fora de propósito
                    são exemplos de atitudes que merecem atenção.
                </p>

                <p>
                    É claro que ninguém é obrigado
                    a ser amigo de todas as pessoas.
                    Porém, mesmo quando não existe amizade,
                    <strong>o respeito precisa continuar existindo</strong>.
                </p>

                <p>
                    Por isso, atitudes simples de acolhimento,
                    como chamar alguém para participar de uma atividade,
                    conversar com quem está sozinho
                    ou evitar incentivar uma exclusão,
                    podem fazer uma grande diferença.
                </p>

            `,

            reflexao:
                "Você já percebeu alguém sendo deixado de lado de propósito? Às vezes, uma pequena atitude de inclusão pode mudar completamente o dia dessa pessoa.",

            finalidade:
                "Inclusão",

            usoPedagogico:
                "Pode apoiar conversas sobre pertencimento, isolamento, formação de grupos, inclusão e respeito entre colegas."

        },


        /* =========================================
           5 - QUANDO ACONTECE COMIGO
        ========================================== */

        {

            id:
                "quando-acontece-comigo",

            icone:
                "💬",

            categoria:
                "Pedir ajuda",

            titulo:
                "Quando acontece comigo",

            resumo:
                "Se alguma situação estiver causando sofrimento, existem caminhos para pedir ajuda e receber acompanhamento.",

            texto: `

                <p>
                    Quando provocações, humilhações,
                    ameaças ou agressões começam a acontecer,
                    pode ser difícil saber o que fazer.
                    Algumas pessoas ficam com vergonha,
                    outras têm medo de que a situação piore
                    e outras simplesmente não sabem como explicar
                    o que estão sentindo.
                </p>

                <p>
                    Ainda assim,
                    <strong>você não precisa enfrentar tudo sozinho</strong>.
                    Conversar com um adulto de confiança,
                    como um responsável, professor,
                    orientador ou coordenador,
                    pode ajudar a encontrar uma forma mais segura
                    de lidar com a situação.
                </p>

                <p>
                    Além disso, você não precisa contar tudo
                    de maneira perfeita logo na primeira conversa.
                    Pode começar dizendo apenas que alguma coisa
                    está acontecendo e que você precisa de ajuda.
                </p>

                <p>
                    Se houver mensagens, imagens ou outras evidências,
                    elas podem ser guardadas quando isso for seguro.
                    No SafeSchool, você também poderá escolher
                    entre fazer um relato identificado,
                    utilizar o canal anônimo
                    ou procurar apoio psicológico.
                </p>

            `,

            reflexao:
                "Pedir ajuda é uma forma de cuidado. Contar o que está acontecendo permite que outras pessoas possam compreender a situação e ajudar você.",

            finalidade:
                "Acolhimento",

            usoPedagogico:
                "Indicado para reforçar os canais de ajuda da escola e mostrar aos estudantes que existem diferentes formas de procurar apoio."

        },


        /* =========================================
           6 - QUANDO EU PRESENCIO
        ========================================== */

        {

            id:
                "quando-eu-presencio",

            icone:
                "👀",

            categoria:
                "Atitude",

            titulo:
                "Quando eu presencio",

            resumo:
                "Quem presencia uma situação também pode contribuir para que ela não continue.",

            texto: `

                <p>
                    Às vezes, uma pessoa percebe
                    que um colega está sendo humilhado,
                    provocado ou agredido,
                    mas fica sem saber como agir.
                    Isso pode acontecer porque existe medo
                    de também se tornar alvo da situação.
                </p>

                <p>
                    Por isso, é importante lembrar
                    que ajudar não significa necessariamente
                    enfrentar diretamente quem está praticando a agressão.
                    <strong>Você não precisa se colocar em perigo.</strong>
                </p>

                <p>
                    É possível ajudar de outras maneiras.
                    Por exemplo, você pode procurar um adulto,
                    não rir ou incentivar a situação,
                    não compartilhar conteúdos ofensivos
                    e demonstrar apoio à pessoa que sofreu.
                </p>

                <p>
                    Além disso, o SafeSchool permite
                    que uma pessoa faça um relato
                    mesmo quando a situação não aconteceu diretamente com ela.
                    Dessa forma, quem presencia também pode colaborar
                    para que a escola saiba o que está acontecendo.
                </p>

            `,

            reflexao:
                "Nem sempre é preciso enfrentar uma situação diretamente para ajudar. Não incentivar a agressão e procurar um adulto já pode fazer diferença.",

            finalidade:
                "Participação",

            usoPedagogico:
                "Pode ser utilizado para discutir o papel de quem presencia situações de violência e maneiras seguras de ajudar."

        },


        /* =========================================
           7 - RESPEITO E EMPATIA
        ========================================== */

        {

            id:
                "respeito-e-empatia",

            icone:
                "🤝",

            categoria:
                "Convivência",

            titulo:
                "Respeito e empatia",

            resumo:
                "Um ambiente mais seguro é construído todos os dias por meio de pequenas atitudes de respeito e cuidado.",

            texto: `

                <p>
                    Conviver com outras pessoas significa
                    encontrar opiniões, gostos,
                    histórias e maneiras de ser diferentes das nossas.
                    Por isso, aprender a respeitar essas diferenças
                    é parte importante da vida em grupo.
                </p>

                <p>
                    A empatia aparece quando tentamos perceber
                    como uma atitude pode afetar outra pessoa.
                    Isso não significa que precisamos concordar com tudo,
                    mas significa reconhecer que nossas palavras
                    e ações possuem consequências.
                </p>

                <p>
                    Além disso, ouvir antes de julgar,
                    saber pedir desculpas,
                    reconhecer quando erramos
                    e respeitar os limites dos colegas
                    ajudam a tornar o ambiente mais seguro.
                </p>

                <p>
                    Principalmente, características físicas,
                    origem, jeito de falar, dificuldades,
                    gostos ou qualquer outra diferença
                    nunca devem ser transformadas
                    em motivo de humilhação.
                </p>

            `,

            reflexao:
                "Antes de falar, publicar ou compartilhar algo sobre alguém, tente pensar: como eu me sentiria se fizessem a mesma coisa comigo?",

            finalidade:
                "Prevenção",

            usoPedagogico:
                "Indicado para atividades preventivas, projetos de convivência e ações voltadas à empatia e ao respeito às diferenças."

        },


        /* =========================================
           8 - COMO PEDIR AJUDA
        ========================================== */

        {

            id:
                "como-pedir-ajuda",

            icone:
                "🆘",

            categoria:
                "Proteção",

            titulo:
                "Como pedir ajuda",

            resumo:
                "Você não precisa encontrar as palavras perfeitas para começar a contar que alguma coisa não está bem.",

            texto: `

                <p>
                    Falar sobre uma situação que está causando
                    medo, vergonha ou sofrimento
                    nem sempre é fácil.
                    Às vezes, a pessoa sabe que precisa de ajuda,
                    mas simplesmente não sabe como começar a conversa.
                </p>

                <p>
                    Nesse momento, você pode começar
                    de maneira simples.
                    Por exemplo:
                    <strong>“Está acontecendo uma coisa comigo e eu preciso de ajuda.”</strong>
                    Depois, aos poucos, você pode explicar
                    o que conseguir.
                </p>

                <p>
                    Caso falar seja difícil,
                    também é possível escrever.
                    Uma mensagem, um relato ou até algumas frases
                    podem ajudar a iniciar essa conversa.
                </p>

                <p>
                    Além disso, se a primeira pessoa procurada
                    não compreender a gravidade da situação,
                    procure outro adulto em quem confie.
                    Às vezes é necessário conversar novamente
                    até encontrar alguém que consiga ajudar.
                </p>

                <p>
                    O mais importante é não permanecer sozinho
                    com algo que está causando sofrimento.
                </p>

            `,

            reflexao:
                "Você merece ser ouvido com respeito. Mesmo que seja difícil começar, uma conversa pode ser o primeiro passo para receber o apoio de que precisa.",

            finalidade:
                "Proteção",

            usoPedagogico:
                "Indicado para apresentar caminhos de ajuda, canais de apoio e estratégias para iniciar uma conversa com um adulto de confiança."

        }

    ];


    /* =========================================
       LISTAR CONTEÚDOS
    ========================================== */

    function listar() {

        return conteudos.map(

            function (conteudo) {

                return {

                    ...conteudo

                };

            }

        );

    }


    /* =========================================
       BUSCAR POR ID
    ========================================== */

    function buscarPorId(
        id
    ) {

        const conteudo =
            conteudos.find(

                function (item) {

                    return (
                        item.id === id
                    );

                }

            );


        if (
            !conteudo
        ) {

            return null;

        }


        return {

            ...conteudo

        };

    }


    /* =========================================
       VERIFICAR EXISTÊNCIA
    ========================================== */

    function existe(
        id
    ) {

        return conteudos.some(

            function (conteudo) {

                return (
                    conteudo.id === id
                );

            }

        );

    }


    /* =========================================
       TOTAL
    ========================================== */

    function total() {

        return conteudos.length;

    }


    /* =========================================
       API PÚBLICA
    ========================================== */

    window.SafeSchoolBibliotecaConteudos = {

        listar:
            listar,

        buscarPorId:
            buscarPorId,

        existe:
            existe,

        total:
            total

    };


})();