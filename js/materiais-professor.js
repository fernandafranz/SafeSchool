/* =========================================
   SAFESCHOOL
   MATERIAIS EDUCATIVOS - PROFESSOR
========================================= */


(function () {

    "use strict";


    /* =========================================
       PROTEGER ACESSO
    ========================================== */

    function verificarAcessoProfessor() {

        const perfil =
            (
                sessionStorage.getItem(
                    "perfilSafeSchool"
                ) || ""
            )
            .trim()
            .toLowerCase();


        if (
            perfil === "professor"
        ) {

            return true;

        }


        const codigoEscola =
            sessionStorage.getItem(
                "codigoEscolaSafeSchool"
            );


        let destino =
            "login.html?acesso=restrito";


        if (
            codigoEscola
        ) {

            destino +=

                "&escola="

                +

                encodeURIComponent(
                    codigoEscola
                );

        }


        window.location.href =
            destino;


        return false;

    }


    if (
        !verificarAcessoProfessor()
    ) {

        return;

    }


    /* =========================================
       INICIAR
    ========================================== */

    document.addEventListener(

        "DOMContentLoaded",

        function () {


            /* =====================================
               BIBLIOTECA
            ====================================== */

            const biblioteca =
                window.SafeSchoolBibliotecaConteudos;


            const conteudos =
                (
                    biblioteca

                    &&

                    typeof biblioteca.listar
                    ===
                    "function"
                )

                    ? biblioteca.listar()

                    : [];


            /* =====================================
               ELEMENTOS
            ====================================== */

            const nomeEscola =
                document.getElementById(
                    "nomeEscolaMateriais"
                );


            const numeroTotal =
                document.getElementById(
                    "numeroTotalMateriais"
                );


            const numeroRecomendados =
                document.getElementById(
                    "numeroRecomendados"
                );


            const numeroCampanha =
                document.getElementById(
                    "numeroCampanha"
                );


            const textoSugestao =
                document.getElementById(
                    "textoSugestaoPedagogica"
                );


            const botaoAplicarSugestao =
                document.getElementById(
                    "botaoAplicarSugestao"
                );


            const busca =
                document.getElementById(
                    "buscaMateriais"
                );


            const limparBusca =
                document.getElementById(
                    "limparBuscaMateriais"
                );


            const resultadoMateriais =
                document.getElementById(
                    "resultadoMateriais"
                );


            const gradeMateriais =
                document.getElementById(
                    "gradeMateriais"
                );


            const semMateriais =
                document.getElementById(
                    "semMateriais"
                );


            const areaLeitura =
                document.getElementById(
                    "areaLeituraMaterial"
                );


            const fecharLeitura =
                document.getElementById(
                    "fecharLeituraMaterial"
                );


            const leituraIcone =
                document.getElementById(
                    "leituraMaterialIcone"
                );


            const leituraCategoria =
                document.getElementById(
                    "leituraMaterialCategoria"
                );


            const leituraTitulo =
                document.getElementById(
                    "leituraMaterialTitulo"
                );


            const leituraFinalidade =
                document.getElementById(
                    "leituraMaterialFinalidade"
                );


            const leituraTexto =
                document.getElementById(
                    "leituraMaterialTexto"
                );


            const leituraReflexao =
                document.getElementById(
                    "leituraMaterialReflexao"
                );


            const leituraUso =
                document.getElementById(
                    "leituraMaterialUso"
                );


            /* =====================================
               ESTADO
            ====================================== */

            let filtroAtual =
                "todos";


            let buscaAtual =
                "";


            let sugestaoAtual =
                null;


            /* =====================================
               ESCOLA
            ====================================== */

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


                return {

                    codigo:
                        sessionStorage.getItem(
                            "codigoEscolaSafeSchool"
                        )
                        ||
                        "ESC001",

                    nome:
                        sessionStorage.getItem(
                            "nomeEscolaSafeSchool"
                        )
                        ||
                        "Escola Demonstrativa SafeSchool"

                };

            }


            const escola =
                obterEscola();


            /* =====================================
               CONFIGURAÇÕES PEDAGÓGICAS
            ====================================== */

            function obterTodasConfiguracoes() {

                const dados =
                    sessionStorage.getItem(
                        "recomendacoesConteudosSafeSchool"
                    );


                if (
                    !dados
                ) {

                    return {};

                }


                try {

                    const resultado =
                        JSON.parse(
                            dados
                        );


                    return (

                        resultado

                        &&

                        typeof resultado ===
                        "object"

                    )

                        ? resultado

                        : {};

                }

                catch (
                    erro
                ) {

                    return {};

                }

            }


            function criarConfiguracaoVazia() {

                return {

                    recomendados:
                        [],

                    destaqueCampanha:
                        null,

                    atualizadoEm:
                        null

                };

            }


            function obterConfiguracao() {

                const todas =
                    obterTodasConfiguracoes();


                const configuracao =
                    todas[escola.codigo]
                    ||
                    criarConfiguracaoVazia();


                if (
                    !Array.isArray(
                        configuracao.recomendados
                    )
                ) {

                    configuracao.recomendados =
                        [];

                }


                configuracao.recomendados =
                    configuracao.recomendados
                        .filter(

                            function (
                                id
                            ) {

                                return conteudos.some(

                                    function (
                                        conteudo
                                    ) {

                                        return (
                                            conteudo.id ===
                                            id
                                        );

                                    }

                                );

                            }

                        );


                if (
                    configuracao.destaqueCampanha

                    &&

                    !conteudos.some(

                        function (
                            conteudo
                        ) {

                            return (
                                conteudo.id ===
                                configuracao.destaqueCampanha
                            );

                        }

                    )
                ) {

                    configuracao.destaqueCampanha =
                        null;

                }


                return configuracao;

            }


            function salvarConfiguracao(
                configuracao
            ) {

                const todas =
                    obterTodasConfiguracoes();


                configuracao.atualizadoEm =
                    new Date().toISOString();


                todas[escola.codigo] =
                    configuracao;


                sessionStorage.setItem(

                    "recomendacoesConteudosSafeSchool",

                    JSON.stringify(
                        todas
                    )

                );

            }


            /* =====================================
               UTILIDADES
            ====================================== */

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


            function normalizarTexto(
                valor
            ) {

                return String(
                    valor ?? ""
                )
                    .trim()
                    .toLowerCase()
                    .normalize(
                        "NFD"
                    )
                    .replace(
                        /[\u0300-\u036f]/g,
                        ""
                    );

            }


            /* =====================================
               RESUMO
            ====================================== */

            function atualizarResumo() {

                const configuracao =
                    obterConfiguracao();


                if (
                    numeroTotal
                ) {

                    numeroTotal.textContent =
                        conteudos.length;

                }


                if (
                    numeroRecomendados
                ) {

                    numeroRecomendados.textContent =
                        configuracao.recomendados.length;

                }


                if (
                    numeroCampanha
                ) {

                    numeroCampanha.textContent =
                        configuracao.destaqueCampanha
                            ? "1"
                            : "0";

                }

            }


            /* =====================================
               RECOMENDAÇÃO
            ====================================== */

            function alternarRecomendacao(
                id
            ) {

                const configuracao =
                    obterConfiguracao();


                const indice =
                    configuracao.recomendados
                        .indexOf(
                            id
                        );


                if (
                    indice >= 0
                ) {

                    configuracao.recomendados.splice(
                        indice,
                        1
                    );

                }

                else {

                    configuracao.recomendados.push(
                        id
                    );

                }


                salvarConfiguracao(
                    configuracao
                );


                renderizar();

            }


            /* =====================================
               CAMPANHA
            ====================================== */

            function alternarCampanha(
                id
            ) {

                const configuracao =
                    obterConfiguracao();


                if (
                    configuracao.destaqueCampanha ===
                    id
                ) {

                    configuracao.destaqueCampanha =
                        null;


                    salvarConfiguracao(
                        configuracao
                    );


                    renderizar();


                    return;

                }


                if (
                    configuracao.destaqueCampanha
                ) {

                    const atual =
                        conteudos.find(

                            function (
                                conteudo
                            ) {

                                return (
                                    conteudo.id ===
                                    configuracao.destaqueCampanha
                                );

                            }

                        );


                    const confirmar =
                        confirm(

                            "Já existe um conteúdo destacado na campanha atual.\n\n"

                            +

                            (
                                atual
                                    ? atual.titulo
                                    : "Conteúdo atual"
                            )

                            +

                            "\n\nDeseja substituir pelo novo tema?"

                        );


                    if (
                        !confirmar
                    ) {

                        return;

                    }

                }


                configuracao.destaqueCampanha =
                    id;


                if (
                    !configuracao.recomendados.includes(
                        id
                    )
                ) {

                    configuracao.recomendados.push(
                        id
                    );

                }


                salvarConfiguracao(
                    configuracao
                );


                renderizar();

            }


            /* =====================================
               ABRIR MATERIAL
            ====================================== */

            function abrirMaterial(
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


                leituraIcone.textContent =
                    conteudo.icone;


                leituraCategoria.textContent =
                    conteudo.categoria;


                leituraTitulo.textContent =
                    conteudo.titulo;


                leituraFinalidade.textContent =

                    "Finalidade pedagógica: "

                    +

                    (
                        conteudo.finalidade
                        ||
                        "Prevenção"
                    );


                leituraTexto.innerHTML =
                    conteudo.texto;


                leituraReflexao.textContent =
                    conteudo.reflexao;


                leituraUso.textContent =

                    conteudo.usoPedagogico

                    ||

                    "O material pode ser utilizado em ações de orientação e prevenção com os estudantes.";


                areaLeitura.hidden =
                    false;


                areaLeitura.scrollIntoView({

                    behavior:
                        "smooth",

                    block:
                        "start"

                });

            }


            /* =====================================
               FILTRAR
            ====================================== */

            function obterConteudosFiltrados() {

                const configuracao =
                    obterConfiguracao();


                return conteudos.filter(

                    function (
                        conteudo
                    ) {

                        if (
                            filtroAtual ===
                            "recomendados"

                            &&

                            !configuracao.recomendados.includes(
                                conteudo.id
                            )
                        ) {

                            return false;

                        }


                        if (
                            filtroAtual ===
                            "campanha"

                            &&

                            configuracao.destaqueCampanha !==
                            conteudo.id
                        ) {

                            return false;

                        }


                        if (
                            buscaAtual
                        ) {

                            const textoBusca =
                                normalizarTexto([

                                    conteudo.titulo,

                                    conteudo.categoria,

                                    conteudo.resumo,

                                    conteudo.finalidade,

                                    conteudo.usoPedagogico

                                ].join(
                                    " "
                                ));


                            if (
                                !textoBusca.includes(
                                    buscaAtual
                                )
                            ) {

                                return false;

                            }

                        }


                        return true;

                    }

                );

            }


            /* =====================================
               CARD
            ====================================== */

            function criarCard(
                conteudo
            ) {

                const configuracao =
                    obterConfiguracao();


                const recomendado =
                    configuracao.recomendados.includes(
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
                    "card-material"

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

                        <span class="etiqueta-card recomendado">
                            ⭐ Recomendado
                        </span>

                    `;

                }


                if (
                    campanha
                ) {

                    etiquetas += `

                        <span class="etiqueta-card campanha">
                            📢 Campanha atual
                        </span>

                    `;

                }


                card.innerHTML = `

                    <div class="etiquetas-card">

                        ${etiquetas}

                    </div>


                    <div class="material-topo">

                        <div class="material-icone">

                            ${conteudo.icone}

                        </div>


                        <div>

                            <span class="material-categoria">

                                ${escaparHTML(
                                    conteudo.categoria
                                )}

                            </span>


                            <h3>

                                ${escaparHTML(
                                    conteudo.titulo
                                )}

                            </h3>

                        </div>

                    </div>


                    <p class="material-resumo">

                        ${escaparHTML(
                            conteudo.resumo
                        )}

                    </p>


                    <div class="material-finalidade">

                        <strong>
                            Finalidade:
                        </strong>

                        ${escaparHTML(
                            conteudo.finalidade
                            ||
                            "Prevenção"
                        )}

                    </div>


                    <div class="material-acoes">

                        <button
                            type="button"
                            class="botao-visualizar"
                            data-visualizar-material="${conteudo.id}"
                        >
                            👁️ Visualizar
                        </button>


                        <button
                            type="button"
                            class="botao-recomendar ${recomendado ? "ativo" : ""}"
                            data-recomendar-material="${conteudo.id}"
                        >

                            ${
                                recomendado
                                    ? "✓ Recomendado"
                                    : "⭐ Recomendar"
                            }

                        </button>


                        <button
                            type="button"
                            class="botao-campanha ${campanha ? "ativo" : ""}"
                            data-campanha-material="${conteudo.id}"
                        >

                            ${
                                campanha
                                    ? "✓ Em campanha"
                                    : "📢 Destacar"
                            }

                        </button>

                    </div>

                `;


                return card;

            }


            /* =====================================
               RENDERIZAR
            ====================================== */

            function renderizar() {

                atualizarResumo();


                const filtrados =
                    obterConteudosFiltrados();


                gradeMateriais.innerHTML =
                    "";


                filtrados.forEach(

                    function (
                        conteudo
                    ) {

                        gradeMateriais.appendChild(

                            criarCard(
                                conteudo
                            )

                        );

                    }

                );


                if (
                    semMateriais
                ) {

                    semMateriais.hidden =
                        filtrados.length !== 0;

                }


                if (
                    resultadoMateriais
                ) {

                    resultadoMateriais.textContent =

                        filtrados.length === 1

                            ? "1 material"

                            : filtrados.length +
                              " materiais";

                }


                gradeMateriais
                    .querySelectorAll(
                        "[data-visualizar-material]"
                    )
                    .forEach(

                        function (
                            botao
                        ) {

                            botao.addEventListener(

                                "click",

                                function () {

                                    abrirMaterial(

                                        botao.getAttribute(
                                            "data-visualizar-material"
                                        )

                                    );

                                }

                            );

                        }

                    );


                gradeMateriais
                    .querySelectorAll(
                        "[data-recomendar-material]"
                    )
                    .forEach(

                        function (
                            botao
                        ) {

                            botao.addEventListener(

                                "click",

                                function () {

                                    alternarRecomendacao(

                                        botao.getAttribute(
                                            "data-recomendar-material"
                                        )

                                    );

                                }

                            );

                        }

                    );


                gradeMateriais
                    .querySelectorAll(
                        "[data-campanha-material]"
                    )
                    .forEach(

                        function (
                            botao
                        ) {

                            botao.addEventListener(

                                "click",

                                function () {

                                    alternarCampanha(

                                        botao.getAttribute(
                                            "data-campanha-material"
                                        )

                                    );

                                }

                            );

                        }

                    );

            }


            /* =====================================
               FILTROS
            ====================================== */

            document
                .querySelectorAll(
                    "[data-filtro-material]"
                )
                .forEach(

                    function (
                        botao
                    ) {

                        botao.addEventListener(

                            "click",

                            function () {

                                filtroAtual =
                                    botao.getAttribute(
                                        "data-filtro-material"
                                    );


                                document
                                    .querySelectorAll(
                                        "[data-filtro-material]"
                                    )
                                    .forEach(

                                        function (
                                            item
                                        ) {

                                            item.classList.remove(
                                                "ativo"
                                            );

                                        }

                                    );


                                botao.classList.add(
                                    "ativo"
                                );


                                renderizar();

                            }

                        );

                    }

                );


            /* =====================================
               BUSCA
            ====================================== */

            if (
                busca
            ) {

                busca.addEventListener(

                    "input",

                    function () {

                        buscaAtual =
                            normalizarTexto(
                                busca.value
                            );


                        renderizar();

                    }

                );

            }


            if (
                limparBusca
            ) {

                limparBusca.addEventListener(

                    "click",

                    function () {

                        buscaAtual =
                            "";


                        if (
                            busca
                        ) {

                            busca.value =
                                "";

                        }


                        filtroAtual =
                            "todos";


                        document
                            .querySelectorAll(
                                "[data-filtro-material]"
                            )
                            .forEach(

                                function (
                                    botao
                                ) {

                                    botao.classList.toggle(

                                        "ativo",

                                        botao.getAttribute(
                                            "data-filtro-material"
                                        )
                                        ===
                                        "todos"

                                    );

                                }

                            );


                        renderizar();

                    }

                );

            }


            /* =====================================
               FECHAR LEITURA
            ====================================== */

            if (
                fecharLeitura
            ) {

                fecharLeitura.addEventListener(

                    "click",

                    function () {

                        areaLeitura.hidden =
                            true;


                        document
                            .querySelector(
                                ".controle-materiais"
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


            /* =====================================
               DADOS DOS RELATOS
            ====================================== */

            function obterRelatosEscola() {

                const dados =
                    sessionStorage.getItem(
                        "denunciasSafeSchool"
                    );


                if (
                    !dados
                ) {

                    return [];

                }


                try {

                    const relatos =
                        JSON.parse(
                            dados
                        );


                    if (
                        !Array.isArray(
                            relatos
                        )
                    ) {

                        return [];

                    }


                    return relatos.filter(

                        function (
                            relato
                        ) {

                            return (
                                relato.escolaCodigo ===
                                escola.codigo
                            );

                        }

                    );

                }

                catch (
                    erro
                ) {

                    return [];

                }

            }


            /* =====================================
               SUGESTÃO PEDAGÓGICA
            ====================================== */

            function atualizarSugestaoPedagogica() {

                const relatos =
                    obterRelatosEscola();


                if (
                    relatos.length === 0
                ) {

                    textoSugestao.textContent =

                        "Ainda não existem relatos suficientes nesta demonstração para gerar uma sugestão relacionada aos registros. A equipe pode utilizar a biblioteca normalmente para ações preventivas.";


                    botaoAplicarSugestao.hidden =
                        true;


                    sugestaoAtual =
                        null;


                    return;

                }


                const contagem =
                    {};


                relatos.forEach(

                    function (
                        relato
                    ) {

                        const tipo =
                            relato.tipo ||
                            "outro";


                        contagem[tipo] =
                            (
                                contagem[tipo]
                                || 0
                            )
                            + 1;

                    }

                );


                const tipoMaisFrequente =
                    Object.entries(
                        contagem
                    )
                    .sort(

                        function (
                            a,
                            b
                        ) {

                            return (
                                b[1] -
                                a[1]
                            );

                        }

                    )[0][0];


                const mapaSugestoes = {

                    virtual: {

                        id:
                            "cyberbullying",

                        motivo:
                            "Os registros relacionados à internet aparecem com maior frequência."

                    },


                    cyberbullying: {

                        id:
                            "cyberbullying",

                        motivo:
                            "Os registros relacionados à internet aparecem com maior frequência."

                    },


                    exclusao: {

                        id:
                            "exclusao-social",

                        motivo:
                            "Situações relacionadas à exclusão aparecem com maior frequência."

                    },


                    discriminacao: {

                        id:
                            "respeito-e-empatia",

                        motivo:
                            "Situações relacionadas à discriminação aparecem com maior frequência."

                    },


                    verbal: {

                        id:
                            "bullying-ou-brincadeira",

                        motivo:
                            "Relatos de natureza verbal aparecem com maior frequência."

                    },


                    fisico: {

                        id:
                            "o-que-e-bullying",

                        motivo:
                            "Relatos envolvendo situações físicas aparecem com maior frequência."

                    },


                    outro: {

                        id:
                            "o-que-e-bullying",

                        motivo:
                            "Os registros atuais indicam a importância de reforçar a compreensão geral sobre bullying."

                    }

                };


                const sugestao =
                    mapaSugestoes[
                        tipoMaisFrequente
                    ]
                    ||
                    mapaSugestoes.outro;


                const conteudo =
                    conteudos.find(

                        function (
                            item
                        ) {

                            return (
                                item.id ===
                                sugestao.id
                            );

                        }

                    );


                if (
                    !conteudo
                ) {

                    botaoAplicarSugestao.hidden =
                        true;


                    return;

                }


                sugestaoAtual =
                    conteudo.id;


                textoSugestao.textContent =

                    sugestao.motivo

                    +

                    ' Como apoio preventivo, a equipe pode considerar o conteúdo "'

                    +

                    conteudo.titulo

                    +

                    '".';


                const configuracao =
                    obterConfiguracao();


                const jaRecomendado =
                    configuracao.recomendados.includes(
                        conteudo.id
                    );


                botaoAplicarSugestao.hidden =
                    jaRecomendado;


                botaoAplicarSugestao.textContent =
                    "⭐ Recomendar " +
                    conteudo.titulo;

            }


            if (
                botaoAplicarSugestao
            ) {

                botaoAplicarSugestao.addEventListener(

                    "click",

                    function () {

                        if (
                            !sugestaoAtual
                        ) {

                            return;

                        }


                        const configuracao =
                            obterConfiguracao();


                        if (
                            !configuracao.recomendados.includes(
                                sugestaoAtual
                            )
                        ) {

                            configuracao.recomendados.push(
                                sugestaoAtual
                            );


                            salvarConfiguracao(
                                configuracao
                            );

                        }


                        renderizar();


                        atualizarSugestaoPedagogica();

                    }

                );

            }


            /* =====================================
               IDENTIFICAÇÃO DA ESCOLA
            ====================================== */

            if (
                nomeEscola
            ) {

                nomeEscola.textContent =
                    escola.nome;

            }


            /* =====================================
               ERRO DE BIBLIOTECA
            ====================================== */

            if (
                conteudos.length === 0
            ) {

                gradeMateriais.innerHTML = `

                    <div class="sem-materiais">

                        <div>
                            ⚠️
                        </div>

                        <h3>
                            Biblioteca não carregada
                        </h3>

                        <p>

                            Verifique se o arquivo
                            biblioteca-conteudos.js
                            foi carregado antes do
                            materiais-professor.js.

                        </p>

                    </div>

                `;


                return;

            }


            /* =====================================
               EXECUTAR
            ====================================== */

            renderizar();

            atualizarSugestaoPedagogica();

        }

    );

})();