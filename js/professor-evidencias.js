/* =========================================
   SAFESCHOOL
   EVIDÊNCIAS DOS RELATOS — PROFESSOR
========================================= */

(function () {

    "use strict";


    /* =========================================
       CONFIGURAÇÃO
    ========================================== */

    const BUCKET_EVIDENCIAS =
        "relatos-anonimos-evidencias";


    const seletorListaRelatos =
        "#listaRelatos";


    const seletorCardRelato =
        "[data-relato-real]";


    /* =========================================
       ESTADO
    ========================================== */

    let supabase =
        null;


    let observadorRelatos =
        null;


    /* =========================================
       INTERFACE
    ========================================== */

    function mostrarErro(
        mensagem,
        titulo = "Evidência indisponível"
    ) {

        if (
            window.SafeSchoolUI &&
            typeof window.SafeSchoolUI.erro === "function"
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


    /* =========================================
       ESTILOS
    ========================================== */

    function injetarEstilosEvidencias() {

        if (
            document.getElementById(
                "estilosEvidenciasProfessor"
            )
        ) {

            return;

        }


        const estilo =
            document.createElement(
                "style"
            );


        estilo.id =
            "estilosEvidenciasProfessor";


        estilo.textContent = `

            .evidencias-resumo-relato-real {
                display: inline-flex;
                align-items: center;
                gap: 6px;
                padding: 6px 10px;
                border: 1px solid #ddd4f3;
                border-radius: 999px;
                background: #f3efff;
                color: #5b43a3;
                font-size: 13px;
                font-weight: 600;
                line-height: 1.3;
            }

            .evidencias-relato-real {
                margin-top: 20px;
                padding: 18px;
                border: 1px solid #ded5f3;
                border-radius: 14px;
                background:
                    linear-gradient(
                        135deg,
                        #faf8ff,
                        #ffffff
                    );
            }

            .evidencias-relato-real > strong {
                display: block;
                margin-bottom: 7px;
                color: #4f35b8;
                font-size: 15px;
                line-height: 1.4;
            }

            .evidencias-relato-real > p {
                margin: 0 0 13px;
                color: #625d72;
                font-size: 14px;
                line-height: 1.6;
            }

            .lista-evidencias-relato-real {
                display: grid;
                gap: 10px;
            }

            .item-evidencia-relato-real {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 14px;
                padding: 13px 14px;
                border: 1px solid #e6e0f0;
                border-radius: 11px;
                background: #ffffff;
            }

            .evidencia-relato-real-dados {
                min-width: 0;
                display: flex;
                align-items: center;
                gap: 10px;
            }

            .evidencia-relato-real-icone {
                width: 38px;
                height: 38px;
                flex: 0 0 38px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 10px;
                background: #f1ecff;
                font-size: 18px;
            }

            .evidencia-relato-real-texto {
                min-width: 0;
            }

            .evidencia-relato-real-texto strong {
                display: block;
                margin: 0;
                color: #433b55;
                font-size: 14px;
                line-height: 1.35;
            }

            .evidencia-relato-real-texto small {
                display: block;
                margin-top: 3px;
                color: #777185;
                font-size: 12px;
                line-height: 1.4;
            }

            .botao-abrir-evidencia-real {
                flex-shrink: 0;
                min-height: 40px;
                padding: 9px 14px;
                border: 1px solid #d6ccec;
                border-radius: 10px;
                background: #ffffff;
                color: #4f35b8;
                font-family: inherit;
                font-size: 13px;
                font-weight: 600;
                cursor: pointer;
            }

            .botao-abrir-evidencia-real:hover:not(:disabled) {
                background: #f5f1ff;
                border-color: #bcaee0;
                color: #402c98;
            }

            .botao-abrir-evidencia-real:disabled {
                opacity: 0.55;
                cursor: not-allowed;
            }

            .aviso-evidencias-relato-real {
                margin: 13px 0 0 !important;
                padding: 11px 12px;
                border-radius: 9px;
                background: #f5f2fa;
                color: #625d72 !important;
                font-size: 13px !important;
                line-height: 1.55 !important;
            }

            @media (max-width: 600px) {

                .item-evidencia-relato-real {
                    align-items: flex-start;
                    flex-direction: column;
                }

                .botao-abrir-evidencia-real {
                    width: 100%;
                    min-height: 44px;
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


    function textoSeguro(
        valor
    ) {

        return String(
            valor ?? ""
        ).trim();

    }


    function formatarDataHora(
        valor
    ) {

        if (
            !valor
        ) {

            return "Data não informada";

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

            return "Data não informada";

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


    function formatarTamanhoArquivo(
        tamanhoBytes
    ) {

        const tamanho =
            Number(
                tamanhoBytes || 0
            );


        if (
            !Number.isFinite(
                tamanho
            ) ||
            tamanho <= 0
        ) {

            return "Tamanho não informado";

        }


        const megabytes =
            tamanho /
            (1024 * 1024);


        if (
            megabytes >= 1
        ) {

            return (

                megabytes.toLocaleString(
                    "pt-BR",
                    {
                        minimumFractionDigits:
                            1,

                        maximumFractionDigits:
                            1
                    }
                )

                +

                " MB"

            );

        }


        const kilobytes =
            Math.max(

                1,

                Math.round(
                    tamanho / 1024
                )

            );


        return (
            kilobytes +
            " KB"
        );

    }


    function formatarTipoImagem(
        tipoMime
    ) {

        if (
            tipoMime ===
            "image/png"
        ) {

            return "PNG";

        }


        if (
            tipoMime ===
            "image/jpeg"
        ) {

            return "JPG";

        }


        return "Imagem";

    }


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
       IDENTIFICAR RELATO ANÔNIMO
    ========================================== */

    function cardEhRelatoAnonimo(
        card
    ) {

        return Boolean(

            card.querySelector(
                ".identificacao-relato.anonimo"
            )

        );

    }


    /* =========================================
       LISTAR ANEXOS
    ========================================== */

    async function listarAnexosRelato(
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
       RESUMO NO CARD
    ========================================== */

    function inserirResumoAnexos(
        card,
        anexos
    ) {

        if (
            anexos.length === 0
        ) {

            return;

        }


        if (
            card.querySelector(
                ".evidencias-resumo-relato-real"
            )
        ) {

            return;

        }


        const informacoes =
            card.querySelector(
                ".relato-informacoes"
            );


        if (
            !informacoes
        ) {

            return;

        }


        const resumo =
            document.createElement(
                "span"
            );


        resumo.className =
            "evidencias-resumo-relato-real";


        resumo.textContent =

            anexos.length === 1

                ? "📎 1 evidência anexada"

                : "📎 " +
                  anexos.length +
                  " evidências anexadas";


        informacoes.appendChild(
            resumo
        );

    }


    /* =========================================
       BLOCO DE EVIDÊNCIAS
    ========================================== */

    function criarItemEvidencia(
        anexo,
        indice
    ) {

        const item =
            document.createElement(
                "div"
            );


        item.className =
            "item-evidencia-relato-real";


        item.innerHTML = `

            <div class="evidencia-relato-real-dados">

                <div class="evidencia-relato-real-icone">
                    🖼️
                </div>


                <div class="evidencia-relato-real-texto">

                    <strong>
                        Imagem ${indice + 1}
                    </strong>


                    <small>

                        ${escaparHTML(
                            formatarTipoImagem(
                                anexo.tipo_mime
                            )
                        )}

                        •

                        ${escaparHTML(
                            formatarTamanhoArquivo(
                                anexo.tamanho_bytes
                            )
                        )}

                        •

                        ${escaparHTML(
                            formatarDataHora(
                                anexo.criado_em
                            )
                        )}

                    </small>

                </div>

            </div>


            <button
                type="button"
                class="botao-abrir-evidencia-real"
                data-abrir-evidencia-real
            >
                Ver imagem
            </button>

        `;


        const botao =
            item.querySelector(
                "[data-abrir-evidencia-real]"
            );


        if (
            botao
        ) {

            botao.addEventListener(

                "click",

                async function () {

                    await abrirEvidencia(

                        anexo.caminho,

                        botao

                    );

                }

            );

        }


        return item;

    }


    function inserirBlocoAnexos(
        card,
        anexos
    ) {

        if (
            anexos.length === 0
        ) {

            return;

        }


        if (
            card.querySelector(
                ".evidencias-relato-real"
            )
        ) {

            return;

        }


        const detalhes =
            card.querySelector(
                ".relato-detalhes"
            );


        if (
            !detalhes
        ) {

            return;

        }


        const bloco =
            document.createElement(
                "div"
            );


        bloco.className =
            "evidencias-relato-real";


        const titulo =
            document.createElement(
                "strong"
            );


        titulo.textContent =
            "📎 Evidências anexadas";


        const descricao =
            document.createElement(
                "p"
            );


        descricao.textContent =

            anexos.length === 1

                ? "Este relato possui 1 imagem enviada como evidência."

                : "Este relato possui " +
                  anexos.length +
                  " imagens enviadas como evidência.";


        const lista =
            document.createElement(
                "div"
            );


        lista.className =
            "lista-evidencias-relato-real";


        anexos.forEach(

            function (
                anexo,
                indice
            ) {

                lista.appendChild(

                    criarItemEvidencia(
                        anexo,
                        indice
                    )

                );

            }

        );


        const aviso =
            document.createElement(
                "p"
            );


        aviso.className =
            "aviso-evidencias-relato-real";


        aviso.textContent =
            "🔒 Os arquivos estão armazenados em área privada e devem ser consultados somente quando necessário para a análise e o acompanhamento do caso.";


        bloco.appendChild(
            titulo
        );


        bloco.appendChild(
            descricao
        );


        bloco.appendChild(
            lista
        );


        bloco.appendChild(
            aviso
        );


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

    }


    /* =========================================
       ABRIR IMAGEM PRIVADA
    ========================================== */

    async function abrirEvidencia(
        caminho,
        botao
    ) {

        const caminhoSeguro =
            textoSeguro(
                caminho
            );


        if (
            !caminhoSeguro
        ) {

            mostrarErro(
                "Não foi possível identificar o arquivo desta evidência."
            );


            return;

        }


        const textoOriginal =
            botao.textContent;


        botao.disabled =
            true;


        botao.textContent =
            "Abrindo...";


        /*
            A aba é criada imediatamente pelo clique.
            Isso evita que o navegador bloqueie a abertura
            depois que o download assíncrono terminar.
        */

        const novaAba =
            window.open(
                "",
                "_blank"
            );


        if (
            novaAba
        ) {

            try {

                novaAba.opener =
                    null;


                novaAba.document.title =
                    "Carregando evidência | SafeSchool";


                novaAba.document.body.innerHTML = `

                    <p
                        style="
                            font-family: Arial, sans-serif;
                            padding: 24px;
                            color: #4f4660;
                        "
                    >
                        Carregando evidência protegida...
                    </p>

                `;

            }

            catch (
                erro
            ) {

                console.warn(
                    "SafeSchool: não foi possível preparar a nova aba.",
                    erro
                );

            }

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
                        caminhoSeguro
                    );


            if (
                error ||
                !arquivo
            ) {

                throw (
                    error ||
                    new Error(
                        "Arquivo não retornado."
                    )
                );

            }


            const urlTemporaria =
                URL.createObjectURL(
                    arquivo
                );


            if (
                novaAba &&
                !novaAba.closed
            ) {

                novaAba.location.href =
                    urlTemporaria;

            }

            else {

                const link =
                    document.createElement(
                        "a"
                    );


                link.href =
                    urlTemporaria;


                link.target =
                    "_blank";


                link.rel =
                    "noopener noreferrer";


                document.body.appendChild(
                    link
                );


                link.click();


                link.remove();

            }


            window.setTimeout(

                function () {

                    URL.revokeObjectURL(
                        urlTemporaria
                    );

                },

                60000

            );

        }

        catch (
            erro
        ) {

            console.error(
                "SafeSchool: não foi possível abrir a evidência protegida.",
                erro
            );


            if (
                novaAba &&
                !novaAba.closed
            ) {

                novaAba.close();

            }


            mostrarErro(
                "Não foi possível abrir esta evidência. Verifique sua sessão e tente novamente."
            );

        }

        finally {

            if (
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
       PROCESSAR CARD
    ========================================== */

    async function processarCard(
        card
    ) {

        if (
            !card ||
            card.dataset.evidenciasProfessor ===
            "carregando" ||
            card.dataset.evidenciasProfessor ===
            "concluido"
        ) {

            return;

        }


        if (
            !cardEhRelatoAnonimo(
                card
            )
        ) {

            card.dataset.evidenciasProfessor =
                "concluido";


            return;

        }


        const relatoId =
            textoSeguro(
                card.dataset.relatoReal
            );


        if (
            !relatoId
        ) {

            card.dataset.evidenciasProfessor =
                "concluido";


            return;

        }


        card.dataset.evidenciasProfessor =
            "carregando";


        try {

            const anexos =
                await listarAnexosRelato(
                    relatoId
                );


            inserirResumoAnexos(
                card,
                anexos
            );


            inserirBlocoAnexos(
                card,
                anexos
            );


            card.dataset.evidenciasProfessor =
                "concluido";

        }

        catch (
            erro
        ) {

            /*
                O relato continua utilizável mesmo se
                o módulo de evidências falhar.
            */

            console.error(
                "SafeSchool: não foi possível carregar as evidências de um relato.",
                erro
            );


            card.dataset.evidenciasProfessor =
                "erro";

        }

    }


    /* =========================================
       PROCESSAR LISTA
    ========================================== */

    function processarCardsExistentes() {

        document
            .querySelectorAll(
                seletorCardRelato
            )
            .forEach(

                function (
                    card
                ) {

                    processarCard(
                        card
                    );

                }

            );

    }


    /* =========================================
       OBSERVAR NOVOS CARDS
    ========================================== */

    function observarListaRelatos() {

        const lista =
            document.querySelector(
                seletorListaRelatos
            );


        if (
            !lista
        ) {

            return false;

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

                    let houveAlteracao =
                        false;


                    mutacoes.forEach(

                        function (
                            mutacao
                        ) {

                            if (
                                mutacao.addedNodes.length > 0
                            ) {

                                houveAlteracao =
                                    true;

                            }

                        }

                    );


                    if (
                        houveAlteracao
                    ) {

                        processarCardsExistentes();

                    }

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


        return true;

    }


    /* =========================================
       INICIAR
    ========================================== */

    async function iniciar() {

        try {

            supabase =
                await obterSupabase();


            injetarEstilosEvidencias();


            const listaEncontrada =
                observarListaRelatos();


            if (
                !listaEncontrada
            ) {

                console.warn(
                    "SafeSchool: lista de relatos não localizada para o módulo de evidências."
                );


                return;

            }


            processarCardsExistentes();


            console.log(
                "SafeSchool: módulo de evidências do Professor preparado."
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