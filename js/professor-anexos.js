/* =========================================
   SAFESCHOOL
   EVIDÊNCIAS DOS RELATOS ANÔNIMOS
   PAINEL DA EQUIPE ESCOLAR
========================================= */

(function () {

    "use strict";


    /* =========================================
       CONFIGURAÇÃO
    ========================================== */

    const BUCKET_EVIDENCIAS =
        "relatos-anonimos-evidencias";


    const SELETOR_LISTA_RELATOS =
        "#listaRelatos";


    const SELETOR_CARD_RELATO =
        "[data-relato-real]";


    /* =========================================
       ESTADO
    ========================================== */

    let supabase =
        null;


    let observadorRelatos =
        null;


    /* =========================================
       SUPABASE
    ========================================== */

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
       INTERFACE
    ========================================== */

    function mostrarErro(
        mensagem,
        titulo = "Evidência indisponível"
    ) {

        if (
            window.SafeSchoolUI &&
            typeof window.SafeSchoolUI.erro ===
            "function"
        ) {

            window.SafeSchoolUI.erro(
                mensagem,
                titulo
            );


            return;

        }


        console.error(
            titulo + ": " + mensagem
        );

    }


    function mostrarAviso(
        mensagem,
        titulo = "Atenção"
    ) {

        if (
            window.SafeSchoolUI &&
            typeof window.SafeSchoolUI.aviso ===
            "function"
        ) {

            window.SafeSchoolUI.aviso(
                mensagem,
                titulo
            );


            return;

        }


        console.warn(
            titulo + ": " + mensagem
        );

    }


    /* =========================================
       ESTILOS
    ========================================== */

    function injetarEstilosAnexos() {

        if (
            document.getElementById(
                "estilosAnexosProfessorSafeSchool"
            )
        ) {

            return;

        }


        const estilo =
            document.createElement(
                "style"
            );


        estilo.id =
            "estilosAnexosProfessorSafeSchool";


        estilo.textContent = `

            .evidencias-relato-professor {

                margin-top: 20px;
                padding: 18px;

                border:
                    1px solid
                    #ded5f3;

                border-radius: 14px;

                background:
                    linear-gradient(
                        135deg,
                        #faf8ff,
                        #ffffff
                    );

            }


            .evidencias-relato-professor-topo {

                display: flex;
                align-items: flex-start;
                justify-content: space-between;

                gap: 14px;

            }


            .evidencias-relato-professor-titulo {

                display: block;

                color: #4f35b8;

                font-size: 15px;
                font-weight: 700;

                line-height: 1.4;

            }


            .evidencias-relato-professor-contador {

                flex-shrink: 0;

                display: inline-flex;
                align-items: center;
                justify-content: center;

                min-height: 30px;

                padding: 6px 10px;

                border-radius: 999px;

                background: #ede8fb;
                color: #4f35b8;

                font-size: 12px;
                font-weight: 700;

                line-height: 1.2;

            }


            .evidencias-relato-professor-descricao {

                margin:
                    9px
                    0
                    0;

                color: #625d72;

                font-size: 14px;
                line-height: 1.6;

            }


            .evidencias-relato-professor-lista {

                display: flex;
                flex-wrap: wrap;

                gap: 10px;

                margin-top: 15px;

            }


            .botao-evidencia-relato-professor {

                min-height: 43px;

                padding:
                    10px
                    15px;

                display: inline-flex;
                align-items: center;
                justify-content: center;

                gap: 6px;

                border:
                    1px solid
                    #d6ccec;

                border-radius: 10px;

                background: #ffffff;
                color: #4f35b8;

                font-family: inherit;
                font-size: 14px;
                font-weight: 600;

                line-height: 1.3;

                cursor: pointer;

                transition:
                    background-color
                    0.15s ease,
                    border-color
                    0.15s ease,
                    color
                    0.15s ease,
                    transform
                    0.15s ease;

            }


            .botao-evidencia-relato-professor:hover:not(
                :disabled
            ) {

                background: #f5f1ff;

                border-color: #bcaee0;

                color: #402c98;

                transform:
                    translateY(-1px);

            }


            .botao-evidencia-relato-professor:focus-visible {

                outline:
                    3px solid
                    rgba(
                        108,
                        76,
                        229,
                        0.18
                    );

                outline-offset: 3px;

            }


            .botao-evidencia-relato-professor:disabled {

                opacity: 0.58;

                cursor: wait;

                transform: none;

            }


            .aviso-evidencia-relato-professor {

                margin:
                    14px
                    0
                    0;

                padding:
                    11px
                    12px;

                border-radius: 9px;

                background: #f5f2fa;
                color: #625d72;

                font-size: 13px;
                line-height: 1.55;

            }


            .evidencias-relato-professor.erro {

                border-color: #ead8d8;

                background:
                    linear-gradient(
                        135deg,
                        #fffafa,
                        #ffffff
                    );

            }


            .evidencias-relato-professor.erro
            .evidencias-relato-professor-titulo {

                color: #875353;

            }


            .botao-recarregar-evidencias-professor {

                margin-top: 13px;

                min-height: 40px;

                padding:
                    9px
                    14px;

                border:
                    1px solid
                    #dfd5e8;

                border-radius: 9px;

                background: #ffffff;
                color: #655675;

                font-family: inherit;
                font-size: 13px;
                font-weight: 600;

                cursor: pointer;

            }


            .botao-recarregar-evidencias-professor:hover {

                background: #faf8fd;

            }


            @media (
                max-width: 600px
            ) {

                .evidencias-relato-professor-topo {

                    flex-direction: column;

                }


                .evidencias-relato-professor-contador {

                    align-self: flex-start;

                }


                .evidencias-relato-professor-lista {

                    flex-direction: column;

                }


                .botao-evidencia-relato-professor {

                    width: 100%;

                    min-height: 48px;

                }

            }

        `;


        document.head.appendChild(
            estilo
        );

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


    function obterIdRelato(
        card
    ) {

        if (
            !card ||
            !card.dataset
        ) {

            return null;

        }


        return (
            card.dataset.relatoReal ||
            null
        );

    }


    function cardEhRelatoAnonimo(
        card
    ) {

        if (
            !card
        ) {

            return false;

        }


        return Boolean(

            card.querySelector(
                ".identificacao-relato.anonimo"
            )

        );

    }


    /* =========================================
       LISTAR EVIDÊNCIAS
    ========================================== */

    async function listarEvidencias(
        relatoId
    ) {

        const {
            data,
            error
        } =
            await supabase.rpc(

                "listar_anexos_relato_anonimo",

                {

                    p_relato_id:
                        relatoId

                }

            );


        if (
            error
        ) {

            throw error;

        }


        return Array.isArray(
            data
        )
            ? data
            : [];

    }


    /* =========================================
       ABRIR IMAGEM PRIVADA
    ========================================== */

    async function abrirEvidencia(
        anexo,
        botao
    ) {

        if (
            !anexo ||
            !anexo.caminho
        ) {

            mostrarErro(
                "Não foi possível identificar o arquivo selecionado."
            );


            return;

        }


        /*
            A nova aba é aberta imediatamente
            pelo clique do usuário.

            Isso evita que o navegador bloqueie
            a abertura depois que o download
            assíncrono terminar.
        */

        const novaAba =
            window.open(
                "about:blank",
                "_blank"
            );


        if (
            !novaAba
        ) {

            mostrarAviso(

                "O navegador bloqueou a abertura da imagem. Permita pop-ups para este site e tente novamente.",

                "Nova aba bloqueada"

            );


            return;

        }


        try {

            novaAba.opener =
                null;


            novaAba.document.title =
                "Carregando evidência | SafeSchool";


            novaAba.document.body.style.margin =
                "0";


            novaAba.document.body.innerHTML = `

                <div
                    style="
                        min-height: 100vh;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: #f8f6ff;
                        color: #4f35b8;
                        font-family: Arial, Helvetica, sans-serif;
                        font-size: 16px;
                    "
                >

                    Carregando evidência protegida...

                </div>

            `;

        }

        catch (
            erro
        ) {

            /*
                Se o navegador não permitir
                personalizar a aba temporária,
                o download ainda continuará.
            */

        }


        const textoOriginal =
            botao
                ? botao.textContent
                : "";


        if (
            botao
        ) {

            botao.disabled =
                true;


            botao.textContent =
                "Abrindo...";

        }


        try {

            const {
                data: arquivo,
                error
            } =
                await supabase
                    .storage
                    .from(
                        BUCKET_EVIDENCIAS
                    )
                    .download(
                        anexo.caminho
                    );


            if (
                error
            ) {

                throw error;

            }


            if (
                !arquivo
            ) {

                throw new Error(
                    "O Storage não retornou o arquivo."
                );

            }


            const urlTemporaria =
                URL.createObjectURL(
                    arquivo
                );


            novaAba.location.href =
                urlTemporaria;


            /*
                O endereço blob existe somente
                no navegador atual.

                Ele é descartado automaticamente
                depois de um período curto.
            */

            window.setTimeout(

                function () {

                    URL.revokeObjectURL(
                        urlTemporaria
                    );

                },

                120000

            );

        }

        catch (
            erro
        ) {

            console.error(

                "SafeSchool: não foi possível abrir a evidência protegida.",

                erro

            );


            try {

                novaAba.close();

            }

            catch (
                erroFechamento
            ) {

            }


            mostrarErro(

                "Não foi possível abrir esta imagem. Confirme sua sessão e tente novamente.",

                "Evidência indisponível"

            );

        }

        finally {

            if (
                botao &&
                document.body.contains(
                    botao
                )
            ) {

                botao.disabled =
                    false;


                botao.textContent =
                    textoOriginal;

            }

        }

    }


    /* =========================================
       CRIAR BLOCO DE EVIDÊNCIAS
    ========================================== */

    function criarBlocoEvidencias(
        anexos
    ) {

        const bloco =
            document.createElement(
                "div"
            );


        bloco.className =
            "evidencias-relato-professor";


        const quantidade =
            anexos.length;


        const descricaoQuantidade =

            quantidade === 1

                ? "1 imagem"

                : quantidade +
                  " imagens";


        bloco.innerHTML = `

            <div
                class="
                    evidencias-relato-professor-topo
                "
            >

                <strong
                    class="
                        evidencias-relato-professor-titulo
                    "
                >

                    📎 Evidências anexadas

                </strong>


                <span
                    class="
                        evidencias-relato-professor-contador
                    "
                >

                    ${escaparHTML(
                        descricaoQuantidade
                    )}

                </span>

            </div>


            <p
                class="
                    evidencias-relato-professor-descricao
                "
            >

                ${
                    quantidade === 1

                        ? "Uma imagem foi anexada a este relato."

                        : quantidade +
                          " imagens foram anexadas a este relato."
                }

            </p>


            <div
                class="
                    evidencias-relato-professor-lista
                "
            >
            </div>


            <p
                class="
                    aviso-evidencia-relato-professor
                "
            >

                🔒 Os arquivos estão armazenados
                em uma área privada do SafeSchool.
                A visualização é restrita à equipe
                autorizada da instituição e não revela
                a identidade de quem realizou
                o relato.

            </p>

        `;


        const lista =
            bloco.querySelector(
                ".evidencias-relato-professor-lista"
            );


        anexos.forEach(

            function (
                anexo,
                indice
            ) {

                const botao =
                    document.createElement(
                        "button"
                    );


                botao.type =
                    "button";


                botao.className =
                    "botao-evidencia-relato-professor";


                botao.textContent =

                    quantidade === 1

                        ? "🖼️ Ver imagem"

                        : "🖼️ Ver imagem " +
                          (indice + 1);


                botao.addEventListener(

                    "click",

                    async function () {

                        await abrirEvidencia(

                            anexo,

                            botao

                        );

                    }

                );


                lista.appendChild(
                    botao
                );

            }

        );


        return bloco;

    }


    /* =========================================
       BLOCO DE ERRO
    ========================================== */

    function criarBlocoErro(
        card
    ) {

        const bloco =
            document.createElement(
                "div"
            );


        bloco.className =
            "evidencias-relato-professor erro";


        bloco.innerHTML = `

            <strong
                class="
                    evidencias-relato-professor-titulo
                "
            >

                📎 Evidências temporariamente indisponíveis

            </strong>


            <p
                class="
                    evidencias-relato-professor-descricao
                "
            >

                Não foi possível verificar os anexos
                deste relato neste momento.

            </p>


            <button
                type="button"
                class="
                    botao-recarregar-evidencias-professor
                "
            >

                Tentar novamente

            </button>

        `;


        const botao =
            bloco.querySelector(
                ".botao-recarregar-evidencias-professor"
            );


        if (
            botao
        ) {

            botao.addEventListener(

                "click",

                async function () {

                    bloco.remove();


                    card.dataset
                        .anexosProfessorProcessados =
                            "false";


                    await processarCardRelato(
                        card
                    );

                }

            );

        }


        return bloco;

    }


    /* =========================================
       INSERIR BLOCO NO RELATO
    ========================================== */

    function inserirBlocoNoRelato(
        card,
        bloco
    ) {

        const detalhes =
            card.querySelector(
                ".relato-detalhes"
            );


        if (
            !detalhes
        ) {

            return false;

        }


        const historico =
            detalhes.querySelector(
                ".historico-caso"
            );


        if (
            historico
        ) {

            detalhes.insertBefore(

                bloco,

                historico

            );

        }

        else {

            detalhes.appendChild(
                bloco
            );

        }


        return true;

    }


    /* =========================================
       PROCESSAR CARD
    ========================================== */

    async function processarCardRelato(
        card
    ) {

        if (
            !card
        ) {

            return;

        }


        if (
            card.dataset
                .anexosProfessorProcessando ===
                "true"
        ) {

            return;

        }


        if (
            card.dataset
                .anexosProfessorProcessados ===
                "true"
        ) {

            return;

        }


        /*
            A função de anexos criada no banco
            aceita apenas relatos anônimos.

            Por isso, nem fazemos a consulta
            para relatos identificados.
        */

        if (
            !cardEhRelatoAnonimo(
                card
            )
        ) {

            card.dataset
                .anexosProfessorProcessados =
                    "true";


            return;

        }


        const relatoId =
            obterIdRelato(
                card
            );


        if (
            !relatoId
        ) {

            return;

        }


        card.dataset
            .anexosProfessorProcessando =
                "true";


        try {

            const anexos =
                await listarEvidencias(
                    relatoId
                );


            /*
                Se não houver anexos,
                não acrescentamos um bloco vazio.
            */

            if (
                anexos.length > 0
            ) {

                const bloco =
                    criarBlocoEvidencias(
                        anexos
                    );


                inserirBlocoNoRelato(

                    card,

                    bloco

                );

            }


            card.dataset
                .anexosProfessorProcessados =
                    "true";

        }

        catch (
            erro
        ) {

            console.error(

                "SafeSchool: não foi possível carregar as evidências do relato.",

                erro

            );


            const blocoErro =
                criarBlocoErro(
                    card
                );


            inserirBlocoNoRelato(

                card,

                blocoErro

            );


            card.dataset
                .anexosProfessorProcessados =
                    "true";

        }

        finally {

            delete card.dataset
                .anexosProfessorProcessando;

        }

    }


    /* =========================================
       PROCESSAR TODOS OS CARDS
    ========================================== */

    function processarCardsAtuais() {

        const lista =
            document.querySelector(
                SELETOR_LISTA_RELATOS
            );


        if (
            !lista
        ) {

            return;

        }


        lista
            .querySelectorAll(
                SELETOR_CARD_RELATO
            )
            .forEach(

                function (
                    card
                ) {

                    processarCardRelato(
                        card
                    );

                }

            );

    }


    /* =========================================
       OBSERVAR ATUALIZAÇÕES DOS RELATOS
    ========================================== */

    function observarRelatos() {

        const lista =
            document.querySelector(
                SELETOR_LISTA_RELATOS
            );


        if (
            !lista
        ) {

            return;

        }


        if (
            observadorRelatos
        ) {

            observadorRelatos.disconnect();

        }


        observadorRelatos =
            new MutationObserver(

                function (
                    mutacoes
                ) {

                    const houveAlteracao =
                        mutacoes.some(

                            function (
                                mutacao
                            ) {

                                return (
                                    mutacao.type ===
                                    "childList"
                                );

                            }

                        );


                    if (
                        !houveAlteracao
                    ) {

                        return;

                    }


                    processarCardsAtuais();

                }

            );


        observadorRelatos.observe(

            lista,

            {

                childList:
                    true,

                subtree:
                    true

            }

        );

    }


    /* =========================================
       INICIAR
    ========================================== */

    async function iniciar() {

        const lista =
            document.querySelector(
                SELETOR_LISTA_RELATOS
            );


        if (
            !lista
        ) {

            return;

        }


        injetarEstilosAnexos();


        try {

            supabase =
                await obterSupabase();


            /*
                professor-relatos.js pode ainda
                estar carregando os relatos.

                O MutationObserver cuidará tanto
                dos cards já existentes quanto
                dos que forem recriados depois.
            */

            observarRelatos();


            processarCardsAtuais();


            console.log(
                "SafeSchool: módulo protegido de evidências do Professor preparado."
            );

        }

        catch (
            erro
        ) {

            console.error(

                "SafeSchool: não foi possível iniciar o módulo de evidências do Professor.",

                erro

            );

        }

    }


    /* =========================================
       EXECUTAR
    ========================================== */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(

            "DOMContentLoaded",

            iniciar

        );

    }

    else {

        iniciar();

    }

})();