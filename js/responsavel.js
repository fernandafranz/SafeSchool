/* =========================================
   SAFESCHOOL
   ÁREA DA FAMÍLIA
========================================= */


(function () {

    "use strict";


    /* =========================================
       CONSTANTES
    ========================================== */

    const CHAVE_SOLICITACOES =
        "solicitacoesResponsavelSafeSchool";


    /* =========================================
       PERFIL
    ========================================== */

    const perfilAtual =
        (
            sessionStorage.getItem(
                "perfilSafeSchool"
            ) || ""
        )
        .trim()
        .toLowerCase();


    const emailAtual =
        (
            sessionStorage.getItem(
                "usuarioEmailSafeSchool"
            ) || ""
        )
        .trim()
        .toLowerCase();


    /*
        A proteção principal da página também
        é realizada pelo escola.js.

        Esta verificação adicional evita que
        as funções específicas da família
        sejam executadas em outro perfil.
    */

    if (
        perfilAtual !==
        "responsavel"
    ) {

        return;

    }


    /* =========================================
       ESCOLA
    ========================================== */

    function obterEscola() {

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
            sessionStorage.getItem(
                "codigoEscolaSafeSchool"
            );


        const nome =
            sessionStorage.getItem(
                "nomeEscolaSafeSchool"
            );


        if (
            !codigo
        ) {

            return null;

        }


        return {

            codigo:
                codigo,

            nome:
                nome ||
                "Escola vinculada"

        };

    }


    const escola =
        obterEscola();


    /* =========================================
       ELEMENTOS
    ========================================== */

    const nomeEscola =
        document.getElementById(
            "nomeEscolaResponsavel"
        );


    const formulario =
        document.getElementById(
            "formularioApoioResponsavel"
        );


    const assunto =
        document.getElementById(
            "assuntoApoioResponsavel"
        );


    const mensagem =
        document.getElementById(
            "mensagemApoioResponsavel"
        );


    const confirmacao =
        document.getElementById(
            "confirmacaoApoioResponsavel"
        );


    const mensagemFormulario =
        document.getElementById(
            "mensagemFormularioResponsavel"
        );


    const listaSolicitacoes =
        document.getElementById(
            "listaSolicitacoesResponsavel"
        );


    const semSolicitacoes =
        document.getElementById(
            "semSolicitacoesResponsavel"
        );


    const contadorSolicitacoes =
        document.getElementById(
            "contadorSolicitacoesResponsavel"
        );


    const gradeConteudos =
        document.getElementById(
            "gradeConteudosResponsavel"
        );


    const leituraConteudo =
        document.getElementById(
            "leituraConteudoResponsavel"
        );


    const fecharConteudo =
        document.getElementById(
            "fecharConteudoResponsavel"
        );


    const iconeConteudo =
        document.getElementById(
            "iconeConteudoResponsavel"
        );


    const categoriaConteudo =
        document.getElementById(
            "categoriaConteudoResponsavel"
        );


    const tituloConteudo =
        document.getElementById(
            "tituloConteudoResponsavel"
        );


    const textoConteudo =
        document.getElementById(
            "textoConteudoResponsavel"
        );


    const reflexaoConteudo =
        document.getElementById(
            "reflexaoConteudoResponsavel"
        );


    const botaoSair =
        document.getElementById(
            "botaoSairResponsavel"
        );


    /* =========================================
       BIBLIOTECA
    ========================================== */

    const biblioteca =
        window.SafeSchoolBibliotecaConteudos;


    const conteudos =
        (
            biblioteca

            &&

            typeof biblioteca.listar ===
            "function"
        )

            ? biblioteca.listar()

            : [];


    /* =========================================
       IDENTIFICAR ESCOLA
    ========================================== */

    if (
        nomeEscola
    ) {

        nomeEscola.textContent =

            escola

                ? escola.nome

                : "Escola não identificada";

    }


    /* =========================================
       UTILIDADES
    ========================================== */

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


    function formatarDataHora(
        valor
    ) {

        if (
            !valor
        ) {

            return "";

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

            return "";

        }


        return data.toLocaleString(
            "pt-BR",
            {

                dateStyle:
                    "short",

                timeStyle:
                    "short"

            }
        );

    }


    function gerarCodigoAleatorio() {

        return Math.random()
            .toString(36)
            .substring(
                2,
                8
            )
            .toUpperCase();

    }


    function gerarProtocolo() {

        const codigoEscola =

            escola &&
            escola.codigo

                ? escola.codigo

                : "ESC";


        const data =
            new Date();


        const ano =
            data.getFullYear();


        const mes =
            String(
                data.getMonth() + 1
            )
            .padStart(
                2,
                "0"
            );


        const dia =
            String(
                data.getDate()
            )
            .padStart(
                2,
                "0"
            );


        return (

            "FAM-"

            +

            codigoEscola

            +

            "-"

            +

            ano

            +

            mes

            +

            dia

            +

            "-"

            +

            gerarCodigoAleatorio()

        );

    }


    /* =========================================
       ASSUNTOS
    ========================================== */

    const nomesAssuntos = {

        "orientacao":
            "Preciso de orientação",

        "relato-filho":
            "Recebi um relato de uma situação",

        "mudanca-comportamento":
            "Percebi mudanças de comportamento",

        "internet":
            "Situação relacionada à internet",

        "conversar-equipe":
            "Quero conversar com a equipe escolar",

        "outro":
            "Outro motivo"

    };


    function formatarAssunto(
        valor
    ) {

        return (
            nomesAssuntos[valor]
            ||
            "Solicitação de apoio"
        );

    }


    /* =========================================
       ARMAZENAMENTO
    ========================================== */

    function lerTodasSolicitacoes() {

        const dados =
            sessionStorage.getItem(
                CHAVE_SOLICITACOES
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


    function salvarTodasSolicitacoes(
        solicitacoes
    ) {

        sessionStorage.setItem(

            CHAVE_SOLICITACOES,

            JSON.stringify(
                solicitacoes
            )

        );

    }


    function obterSolicitacoesDaConta() {

        if (
            !escola ||
            !emailAtual
        ) {

            return [];

        }


        return lerTodasSolicitacoes()
            .filter(

                function (
                    solicitacao
                ) {

                    return (

                        solicitacao.escolaCodigo ===
                        escola.codigo

                        &&

                        String(
                            solicitacao.autorEmail ||
                            ""
                        )
                        .trim()
                        .toLowerCase()
                        ===
                        emailAtual

                    );

                }

            )
            .sort(

                function (
                    a,
                    b
                ) {

                    return (
                        new Date(
                            b.criadoEm
                        ).getTime()

                        -

                        new Date(
                            a.criadoEm
                        ).getTime()
                    );

                }

            );

    }


    /* =========================================
       REGISTRAR SOLICITAÇÃO
    ========================================== */

    function registrarSolicitacao(
        assuntoValor,
        mensagemValor
    ) {

        if (
            !escola ||
            !emailAtual
        ) {

            return null;

        }


        const novaSolicitacao = {

            protocolo:
                gerarProtocolo(),

            escolaCodigo:
                escola.codigo,

            escolaNome:
                escola.nome,

            perfil:
                "responsavel",

            origem:
                "solicitacao-responsavel",

            autorEmail:
                emailAtual,

            assunto:
                assuntoValor,

            mensagem:
                mensagemValor,

            status:
                "recebida",

            criadoEm:
                new Date().toISOString(),

            atualizadoEm:
                null

        };


        const todas =
            lerTodasSolicitacoes();


        todas.push(
            novaSolicitacao
        );


        salvarTodasSolicitacoes(
            todas
        );


        return novaSolicitacao;

    }


    /* =========================================
       RENDERIZAR SOLICITAÇÕES
    ========================================== */

    function renderizarSolicitacoes() {

        if (
            !listaSolicitacoes
        ) {

            return;

        }


        const solicitacoes =
            obterSolicitacoesDaConta();


        listaSolicitacoes.innerHTML =
            "";


        if (
            contadorSolicitacoes
        ) {

            contadorSolicitacoes.textContent =

                solicitacoes.length === 1

                    ? "1 solicitação"

                    : solicitacoes.length +
                      " solicitações";

        }


        if (
            solicitacoes.length === 0
        ) {

            if (
                semSolicitacoes
            ) {

                semSolicitacoes.hidden =
                    false;

            }


            return;

        }


        if (
            semSolicitacoes
        ) {

            semSolicitacoes.hidden =
                true;

        }


        solicitacoes.forEach(

            function (
                solicitacao
            ) {

                const card =
                    document.createElement(
                        "article"
                    );


                card.className =
                    "card-solicitacao";


                card.innerHTML = `

                    <div class="solicitacao-topo">

                        <span class="solicitacao-protocolo">

                            ${escaparHTML(
                                solicitacao.protocolo
                            )}

                        </span>


                        <span class="solicitacao-status">

                            Registrada

                        </span>

                    </div>


                    <h3>

                        ${escaparHTML(
                            formatarAssunto(
                                solicitacao.assunto
                            )
                        )}

                    </h3>


                    <p>

                        ${escaparHTML(
                            solicitacao.mensagem
                        )}

                    </p>


                    <span class="solicitacao-data">

                        Enviada em

                        ${escaparHTML(
                            formatarDataHora(
                                solicitacao.criadoEm
                            )
                        )}

                    </span>

                `;


                listaSolicitacoes.appendChild(
                    card
                );

            }

        );

    }


    /* =========================================
       FORMULÁRIO
    ========================================== */

    if (
        formulario
    ) {

        formulario.addEventListener(

            "submit",

            function (
                evento
            ) {

                evento.preventDefault();


                const assuntoValor =
                    assunto.value
                        .trim();


                const mensagemValor =
                    mensagem.value
                        .trim();


                if (
                    !assuntoValor
                ) {

                    alert(
                        "Selecione o motivo do contato."
                    );

                    assunto.focus();

                    return;

                }


                if (
                    mensagemValor.length <
                    15
                ) {

                    alert(

                        "Conte um pouco mais sobre como a escola pode ajudar."

                    );


                    mensagem.focus();


                    return;

                }


                if (
                    !confirmacao.checked
                ) {

                    alert(

                        "Confirme o envio da solicitação para continuar."

                    );


                    return;

                }


                const solicitacao =
                    registrarSolicitacao(

                        assuntoValor,

                        mensagemValor

                    );


                if (
                    !solicitacao
                ) {

                    alert(

                        "Não foi possível registrar a solicitação."

                    );


                    return;

                }


                formulario.reset();


                if (
                    mensagemFormulario
                ) {

                    mensagemFormulario.hidden =
                        false;


                    mensagemFormulario.innerHTML = `

                        <strong>
                            Solicitação registrada nesta demonstração. ✓
                        </strong>

                        <br>

                        Protocolo:

                        <strong>
                            ${escaparHTML(
                                solicitacao.protocolo
                            )}
                        </strong>

                    `;

                }


                renderizarSolicitacoes();


                setTimeout(

                    function () {

                        document
                            .getElementById(
                                "solicitacoes"
                            )
                            ?.scrollIntoView({

                                behavior:
                                    "smooth",

                                block:
                                    "start"

                            });

                    },

                    450

                );

            }

        );

    }


    /* =========================================
       CONFIGURAÇÃO PEDAGÓGICA
    ========================================== */

    function obterConfiguracaoPedagogica() {

        if (
            !escola
        ) {

            return {

                recomendados:
                    [],

                destaqueCampanha:
                    null

            };

        }


        const dados =
            sessionStorage.getItem(
                "recomendacoesConteudosSafeSchool"
            );


        if (
            !dados
        ) {

            return {

                recomendados:
                    [],

                destaqueCampanha:
                    null

            };

        }


        try {

            const todas =
                JSON.parse(
                    dados
                );


            const configuracao =
                todas &&
                todas[escola.codigo];


            if (
                !configuracao
            ) {

                return {

                    recomendados:
                        [],

                    destaqueCampanha:
                        null

                };

            }


            return {

                recomendados:
                    Array.isArray(
                        configuracao.recomendados
                    )
                        ? configuracao.recomendados
                        : [],

                destaqueCampanha:
                    configuracao.destaqueCampanha
                    || null

            };

        }

        catch (
            erro
        ) {

            return {

                recomendados:
                    [],

                destaqueCampanha:
                    null

            };

        }

    }


    /* =========================================
       CONTEÚDOS
    ========================================== */

    function abrirConteudo(
        id
    ) {

        const conteudo =
            conteudos.find(

                function (
                    item
                ) {

                    return (
                        item.id === id
                    );

                }

            );


        if (
            !conteudo
        ) {

            return;

        }


        iconeConteudo.textContent =
            conteudo.icone;


        categoriaConteudo.textContent =
            conteudo.categoria;


        tituloConteudo.textContent =
            conteudo.titulo;


        textoConteudo.innerHTML =
            conteudo.texto;


        reflexaoConteudo.textContent =
            conteudo.reflexao;


        leituraConteudo.hidden =
            false;


        leituraConteudo.scrollIntoView({

            behavior:
                "smooth",

            block:
                "start"

        });

    }


    function renderizarConteudos() {

        if (
            !gradeConteudos
        ) {

            return;

        }


        gradeConteudos.innerHTML =
            "";


        if (
            conteudos.length === 0
        ) {

            gradeConteudos.innerHTML = `

                <div class="sem-solicitacoes">

                    <div>
                        ⚠️
                    </div>

                    <h3>
                        Biblioteca indisponível
                    </h3>

                    <p>

                        Verifique se o arquivo
                        biblioteca-conteudos.js
                        foi carregado corretamente.

                    </p>

                </div>

            `;


            return;

        }


        const configuracao =
            obterConfiguracaoPedagogica();


        conteudos.forEach(

            function (
                conteudo
            ) {

                const recomendado =
                    configuracao.recomendados
                        .includes(
                            conteudo.id
                        );


                const campanha =
                    configuracao.destaqueCampanha ===
                    conteudo.id;


                const card =
                    document.createElement(
                        "article"
                    );


                card.className =

                    "card-conteudo-familia"

                    +

                    (
                        recomendado
                            ? " recomendado"
                            : ""
                    )

                    +

                    (
                        campanha
                            ? " campanha"
                            : ""
                    );


                let etiquetas =
                    "";


                if (
                    recomendado
                ) {

                    etiquetas += `

                        <span
                            class="etiqueta-conteudo-familia recomendado"
                        >

                            ⭐ Recomendado pela escola

                        </span>

                    `;

                }


                if (
                    campanha
                ) {

                    etiquetas += `

                        <span
                            class="etiqueta-conteudo-familia campanha"
                        >

                            📢 Tema em destaque

                        </span>

                    `;

                }


                card.innerHTML = `

                    <div class="conteudo-familia-icone">

                        ${conteudo.icone}

                    </div>


                    <div class="conteudo-familia-etiquetas">

                        ${etiquetas}

                    </div>


                    <span>

                        ${escaparHTML(
                            conteudo.categoria
                        )}

                    </span>


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
                        class="botao-ler-familia"
                        data-conteudo-responsavel="${conteudo.id}"
                    >

                        Ler conteúdo

                    </button>

                `;


                gradeConteudos.appendChild(
                    card
                );

            }

        );


        gradeConteudos
            .querySelectorAll(
                "[data-conteudo-responsavel]"
            )
            .forEach(

                function (
                    botao
                ) {

                    botao.addEventListener(

                        "click",

                        function () {

                            abrirConteudo(

                                botao.getAttribute(
                                    "data-conteudo-responsavel"
                                )

                            );

                        }

                    );

                }

            );

    }


    /* =========================================
       FECHAR CONTEÚDO
    ========================================== */

    if (
        fecharConteudo
    ) {

        fecharConteudo.addEventListener(

            "click",

            function () {

                leituraConteudo.hidden =
                    true;


                document
                    .getElementById(
                        "conteudos"
                    )
                    ?.scrollIntoView({

                        behavior:
                            "smooth",

                        block:
                            "start"

                    });

            }

        );

    }


    /* =========================================
       LOGOUT
    ========================================== */

    if (
        botaoSair
    ) {

        botaoSair.addEventListener(

            "click",

            function () {

                /*
                    O escola.js é responsável pelo
                    fluxo central de logout/proteção.

                    Aqui não apagamos os dados da escola,
                    das solicitações ou da demonstração.
                */

            }

        );

    }


    /* =========================================
       INICIAR
    ========================================== */

    renderizarSolicitacoes();

    renderizarConteudos();


})();