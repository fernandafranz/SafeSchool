/* =========================================
   SAFESCHOOL
   FORMULÁRIO DE DENÚNCIA ANÔNIMA
   INTEGRAÇÃO COM SUPABASE
========================================= */

(function () {

    "use strict";


    /* =========================================
       CONFIGURAÇÃO DOS ANEXOS
    ========================================== */

    const BUCKET_EVIDENCIAS =
        "relatos-anonimos-evidencias";


    const LIMITE_ARQUIVOS =
        3;


    const LIMITE_BYTES =
        5 * 1024 * 1024;


    const MAIOR_DIMENSAO_IMAGEM =
        4096;


    const TIPOS_IMAGEM_PERMITIDOS = [

        "image/jpeg",
        "image/png"

    ];


    /* =========================================
       ELEMENTOS
    ========================================== */

    const formulario =
        document.getElementById(
            "formularioDenuncia"
        );


    const campoTipo =
        document.getElementById(
            "tipo"
        );


    const campoLocal =
        document.getElementById(
            "local"
        );


    const campoData =
        document.getElementById(
            "data"
        );


    const campoRelato =
        document.getElementById(
            "relato"
        );


    const campoEvidencia =
        document.getElementById(
            "evidencia"
        );


    const orientacaoEvidencia =
        document.getElementById(
            "orientacaoEvidencia"
        );


    const campoUrgencia =
        document.getElementById(
            "urgencia"
        );


    const campoConfirmacao =
        document.getElementById(
            "confirmacao"
        );


    const botaoEnviar =
        formulario
            ? formulario.querySelector(
                ".botao-enviar"
            )
            : null;


    /* =========================================
       CLIENTE ANÔNIMO
    ========================================== */

    let supabaseAnonimo =
        null;


    /* =========================================
       VERIFICAÇÃO INICIAL
    ========================================== */

    if (
        !formulario ||
        !campoTipo ||
        !campoLocal ||
        !campoData ||
        !campoRelato ||
        !campoUrgencia ||
        !campoConfirmacao
    ) {

        console.error(
            "SafeSchool: não foi possível inicializar o formulário de denúncia anônima."
        );


        return;

    }


    /* =========================================
       SUPABASE PRINCIPAL
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
       SUPABASE ANÔNIMO ISOLADO
    ========================================== */

    async function obterSupabaseAnonimo() {

        if (
            !window.SafeSchoolSupabaseAnonReady
        ) {

            throw new Error(
                "Cliente anônimo do Supabase não inicializado."
            );

        }


        return await
            window.SafeSchoolSupabaseAnonReady;

    }


    /* =========================================
       RECUPERAR ESCOLA DA NAVEGAÇÃO
    ========================================== */

    function obterEscolaAtual() {

        if (
            window.SafeSchoolEscola &&
            typeof window.SafeSchoolEscola.obter ===
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
            (
                sessionStorage.getItem(
                    "codigoEscolaSafeSchool"
                ) || ""
            )
            .trim()
            .toUpperCase();


        const nome =
            (
                sessionStorage.getItem(
                    "nomeEscolaSafeSchool"
                ) || ""
            )
            .trim();


        if (
            !codigo
        ) {

            return null;

        }


        return {

            codigo:
                codigo,

            nome:
                nome

        };

    }


    /* =========================================
       VALIDAR ESCOLA NO BANCO
    ========================================== */

    async function buscarEscolaReal(
        supabase,
        codigo
    ) {

        const {
            data,
            error
        } =
            await supabase.rpc(

                "buscar_escola_por_codigo",

                {

                    codigo_informado:
                        codigo

                }

            );


        if (
            error
        ) {

            console.error(

                "SafeSchool: erro ao validar a escola da denúncia.",

                error

            );


            throw new Error(
                "Não foi possível validar a escola."
            );

        }


        const escola =

            Array.isArray(data)

                ? data[0]

                : data;


        if (
            !escola ||
            !escola.id ||
            !escola.codigo
        ) {

            throw new Error(
                "Escola inválida ou inativa."
            );

        }


        return escola;

    }


    /* =========================================
       ARQUIVOS SELECIONADOS
    ========================================== */

    function obterArquivosSelecionados() {

        if (
            !campoEvidencia ||
            !campoEvidencia.files
        ) {

            return [];

        }


        return Array.from(
            campoEvidencia.files
        );

    }


    /* =========================================
       VALIDAR EVIDÊNCIAS
    ========================================== */

    function validarEvidencias() {

        const arquivos =
            obterArquivosSelecionados();


        if (
            arquivos.length === 0
        ) {

            return true;

        }


        if (
            arquivos.length >
            LIMITE_ARQUIVOS
        ) {

            alert(
                "Você pode anexar no máximo 3 imagens."
            );


            campoEvidencia.focus();


            return false;

        }


        for (
            const arquivo
            of arquivos
        ) {

            if (
                !TIPOS_IMAGEM_PERMITIDOS.includes(
                    arquivo.type
                )
            ) {

                alert(
                    "Utilize apenas imagens nos formatos JPG ou PNG."
                );


                campoEvidencia.focus();


                return false;

            }


            if (
                arquivo.size <= 0
            ) {

                alert(
                    "Uma das imagens selecionadas está vazia ou inválida."
                );


                campoEvidencia.focus();


                return false;

            }


            if (
                arquivo.size >
                LIMITE_BYTES
            ) {

                alert(
                    "Cada imagem pode ter no máximo 5 MB."
                );


                campoEvidencia.focus();


                return false;

            }

        }


        return true;

    }


    /* =========================================
       VALIDAÇÃO DO FORMULÁRIO
    ========================================== */

    function validarFormulario() {

        const tipo =
            campoTipo.value;


        const local =
            campoLocal.value;


        const data =
            campoData.value;


        const relato =
            campoRelato.value
                .trim();


        const urgencia =
            campoUrgencia.value;


        const confirmacao =
            campoConfirmacao.checked;


        /* =====================================
           TIPO
        ====================================== */

        if (
            !tipo
        ) {

            alert(
                "Por favor, selecione o tipo de situação."
            );


            campoTipo.focus();


            return false;

        }


        /* =====================================
           LOCAL
        ====================================== */

        if (
            !local
        ) {

            alert(
                "Por favor, informe onde a situação aconteceu."
            );


            campoLocal.focus();


            return false;

        }


        /* =====================================
           DATA
        ====================================== */

        if (
            !data
        ) {

            alert(
                "Por favor, informe quando a situação aconteceu."
            );


            campoData.focus();


            return false;

        }


        /* =====================================
           RELATO
        ====================================== */

        if (
            relato.length < 20
        ) {

            alert(

                "Conte um pouco mais sobre o que aconteceu. O relato deve ter pelo menos 20 caracteres."

            );


            campoRelato.focus();


            return false;

        }


        if (
            relato.length > 1500
        ) {

            alert(
                "O relato deve ter no máximo 1500 caracteres."
            );


            campoRelato.focus();


            return false;

        }


        /* =====================================
           EVIDÊNCIAS
        ====================================== */

        if (
            !validarEvidencias()
        ) {

            return false;

        }


        /* =====================================
           URGÊNCIA
        ====================================== */

        if (
            ![
                "baixa",
                "media",
                "alta"
            ].includes(
                urgencia
            )
        ) {

            alert(
                "Por favor, indique como você considera essa situação."
            );


            campoUrgencia.focus();


            return false;

        }


        /* =====================================
           CONFIRMAÇÃO
        ====================================== */

        if (
            !confirmacao
        ) {

            alert(

                "Para continuar, confirme que as informações correspondem ao que você viveu ou presenciou."

            );


            campoConfirmacao.focus();


            return false;

        }


        return true;

    }


    /* =========================================
       BOTÃO EM PROCESSAMENTO
    ========================================== */

    function definirProcessando(
        processando,
        texto
    ) {

        if (
            !botaoEnviar
        ) {

            return;

        }


        botaoEnviar.disabled =
            processando;


        if (
            processando
        ) {

            if (
                !botaoEnviar.dataset.textoOriginal
            ) {

                botaoEnviar.dataset.textoOriginal =
                    botaoEnviar.innerHTML;

            }


            botaoEnviar.textContent =
                texto ||
                "Enviando denúncia...";

        }

        else {

            if (
                botaoEnviar.dataset.textoOriginal
            ) {

                botaoEnviar.innerHTML =
                    botaoEnviar.dataset.textoOriginal;


                delete
                botaoEnviar.dataset.textoOriginal;

            }

        }

    }


    /* =========================================
       REGISTRAR DENÚNCIA ANÔNIMA
    ========================================== */

    async function registrarDenuncia(
        supabase,
        escola
    ) {

        const {
            data,
            error
        } =
            await supabase.rpc(

                "registrar_denuncia_anonima",

                {

                    p_escola_id:
                        escola.id,

                    p_envolvimento:
                        null,

                    p_tipo:
                        campoTipo.value,

                    p_descricao:
                        campoRelato.value
                            .trim(),

                    p_local:
                        campoLocal.value,

                    p_quando_ocorreu:
                        campoData.value,

                    p_frequencia:
                        null,

                    p_urgencia:
                        campoUrgencia.value

                }

            );


        if (
            error
        ) {

            console.error(

                "SafeSchool: erro ao registrar a denúncia anônima.",

                error

            );


            throw new Error(
                "Não foi possível registrar a denúncia."
            );

        }


        const resultado =

            Array.isArray(data)

                ? data[0]

                : data;


        if (
            !resultado ||
            !resultado.relato_id ||
            !resultado.protocolo_gerado
        ) {

            throw new Error(
                "O banco não retornou os dados da denúncia."
            );

        }


        return resultado;

    }


    /* =========================================
       CARREGAR IMAGEM
    ========================================== */

    function carregarImagem(
        arquivo
    ) {

        return new Promise(

            function (
                resolver,
                rejeitar
            ) {

                const url =
                    URL.createObjectURL(
                        arquivo
                    );


                const imagem =
                    new Image();


                imagem.decoding =
                    "async";


                imagem.onload =
                    function () {

                        URL.revokeObjectURL(
                            url
                        );


                        resolver(
                            imagem
                        );

                    };


                imagem.onerror =
                    function () {

                        URL.revokeObjectURL(
                            url
                        );


                        rejeitar(
                            new Error(
                                "Não foi possível ler uma das imagens."
                            )
                        );

                    };


                imagem.src =
                    url;

            }

        );

    }


    /* =========================================
       CANVAS PARA BLOB
    ========================================== */

    function canvasParaBlob(
        canvas,
        tipo
    ) {

        return new Promise(

            function (
                resolver,
                rejeitar
            ) {

                const qualidade =

                    tipo ===
                    "image/jpeg"

                        ? 0.92

                        : undefined;


                canvas.toBlob(

                    function (
                        blob
                    ) {

                        if (
                            !blob
                        ) {

                            rejeitar(
                                new Error(
                                    "Não foi possível preparar uma das imagens."
                                )
                            );


                            return;

                        }


                        resolver(
                            blob
                        );

                    },

                    tipo,

                    qualidade

                );

            }

        );

    }


    /* =========================================
       REMOVER METADADOS DA IMAGEM
    ========================================== */

    async function prepararImagemSegura(
        arquivo
    ) {

        const imagem =
            await carregarImagem(
                arquivo
            );


        const larguraOriginal =
            imagem.naturalWidth;


        const alturaOriginal =
            imagem.naturalHeight;


        if (
            !larguraOriginal ||
            !alturaOriginal
        ) {

            throw new Error(
                "Uma das imagens selecionadas é inválida."
            );

        }


        const maiorDimensao =
            Math.max(
                larguraOriginal,
                alturaOriginal
            );


        const escala =

            maiorDimensao >
            MAIOR_DIMENSAO_IMAGEM

                ? (
                    MAIOR_DIMENSAO_IMAGEM
                    /
                    maiorDimensao
                )

                : 1;


        const larguraFinal =
            Math.max(

                1,

                Math.round(
                    larguraOriginal *
                    escala
                )

            );


        const alturaFinal =
            Math.max(

                1,

                Math.round(
                    alturaOriginal *
                    escala
                )

            );


        const canvas =
            document.createElement(
                "canvas"
            );


        canvas.width =
            larguraFinal;


        canvas.height =
            alturaFinal;


        const contexto =
            canvas.getContext(
                "2d",
                {
                    alpha:
                        arquivo.type ===
                        "image/png"
                }
            );


        if (
            !contexto
        ) {

            throw new Error(
                "Não foi possível preparar a imagem para envio."
            );

        }


        /*
            A imagem é decodificada e redesenhada.

            Dessa forma, os metadados do arquivo
            original não são copiados para o novo
            arquivo enviado ao Storage.
        */

        contexto.drawImage(

            imagem,

            0,
            0,

            larguraFinal,
            alturaFinal

        );


        const blob =
            await canvasParaBlob(

                canvas,

                arquivo.type

            );


        if (
            blob.size >
            LIMITE_BYTES
        ) {

            throw new Error(
                "Depois da preparação de segurança, uma das imagens ficou maior que 5 MB. Escolha uma imagem menor."
            );

        }


        return blob;

    }


    /* =========================================
       PREPARAR ANEXO NO BANCO
    ========================================== */

    async function prepararAnexoBanco(
        resultado,
        ordem,
        imagemPreparada
    ) {

        const {
            data,
            error
        } =
            await supabaseAnonimo.rpc(

                "preparar_anexo_relato_anonimo",

                {

                    p_relato_id:
                        resultado.relato_id,

                    p_protocolo:
                        resultado.protocolo_gerado,

                    p_ordem:
                        ordem,

                    p_tipo_mime:
                        imagemPreparada.type,

                    p_tamanho_bytes:
                        imagemPreparada.size

                }

            );


        if (
            error
        ) {

            console.error(
                "SafeSchool: erro ao preparar anexo.",
                error
            );


            throw new Error(
                "Não foi possível preparar uma das imagens."
            );

        }


        const anexo =

            Array.isArray(data)

                ? data[0]

                : data;


        if (
            !anexo ||
            !anexo.anexo_id ||
            !anexo.caminho_gerado
        ) {

            throw new Error(
                "O banco não retornou os dados do anexo."
            );

        }


        return anexo;

    }


    /* =========================================
       ENVIAR PARA STORAGE
    ========================================== */

    async function enviarImagemStorage(
        anexo,
        imagemPreparada
    ) {

        const {
            error
        } =
            await supabaseAnonimo
                .storage
                .from(
                    BUCKET_EVIDENCIAS
                )
                .upload(

                    anexo.caminho_gerado,

                    imagemPreparada,

                    {

                        cacheControl:
                            "3600",

                        contentType:
                            imagemPreparada.type,

                        upsert:
                            false

                    }

                );


        if (
            error
        ) {

            console.error(
                "SafeSchool: erro no upload da evidência.",
                error
            );


            throw new Error(
                "Não foi possível enviar uma das imagens."
            );

        }

    }


    /* =========================================
       CONFIRMAR ANEXO
    ========================================== */

    async function confirmarAnexo(
        anexo
    ) {

        const {
            data,
            error
        } =
            await supabaseAnonimo.rpc(

                "confirmar_anexo_relato_anonimo",

                {

                    p_anexo_id:
                        anexo.anexo_id,

                    p_caminho:
                        anexo.caminho_gerado

                }

            );


        if (
            error
        ) {

            console.error(
                "SafeSchool: erro ao confirmar anexo.",
                error
            );


            throw new Error(
                "Não foi possível confirmar uma das imagens."
            );

        }


        if (
            data !== true
        ) {

            throw new Error(
                "A imagem foi enviada, mas não pôde ser confirmada."
            );

        }

    }


    /* =========================================
       PROCESSAR UMA EVIDÊNCIA
    ========================================== */

    async function enviarUmaEvidencia(
        arquivo,
        resultado,
        ordem
    ) {

        const imagemPreparada =
            await prepararImagemSegura(
                arquivo
            );


        const anexo =
            await prepararAnexoBanco(

                resultado,

                ordem,

                imagemPreparada

            );


        await enviarImagemStorage(

            anexo,

            imagemPreparada

        );


        await confirmarAnexo(
            anexo
        );

    }


    /* =========================================
       PROCESSAR TODAS AS EVIDÊNCIAS
    ========================================== */

    async function enviarEvidencias(
        arquivos,
        resultado
    ) {

        const falhas =
            [];


        for (
            let indice = 0;
            indice < arquivos.length;
            indice++
        ) {

            definirProcessando(

                true,

                "Enviando imagem "
                +
                (indice + 1)
                +
                " de "
                +
                arquivos.length
                +
                "..."

            );


            try {

                await enviarUmaEvidencia(

                    arquivos[indice],

                    resultado,

                    indice + 1

                );

            }

            catch (
                erro
            ) {

                console.error(

                    "SafeSchool: uma evidência não pôde ser concluída.",

                    erro

                );


                falhas.push({

                    ordem:
                        indice + 1,

                    erro:
                        erro

                });

            }

        }


        return {

            total:
                arquivos.length,

            enviados:
                arquivos.length -
                falhas.length,

            falhas:
                falhas

        };

    }


    /* =========================================
       SALVAR DADOS PARA A TELA DE SUCESSO
    ========================================== */

    function prepararTelaSucesso(
        resultado,
        escola,
        resumoAnexos
    ) {

        sessionStorage.setItem(

            "protocoloSafeSchool",

            resultado.protocolo_gerado

        );


        sessionStorage.setItem(

            "codigoEscolaDenuncia",

            escola.codigo

        );


        sessionStorage.setItem(

            "nomeEscolaDenuncia",

            escola.nome || ""

        );


        if (
            resumoAnexos
        ) {

            sessionStorage.setItem(

                "anexosEnviadosSafeSchool",

                String(
                    resumoAnexos.enviados || 0
                )

            );


            sessionStorage.setItem(

                "anexosFalhosSafeSchool",

                String(
                    resumoAnexos.falhas
                        ? resumoAnexos.falhas.length
                        : 0
                )

            );

        }

        else {

            sessionStorage.setItem(
                "anexosEnviadosSafeSchool",
                "0"
            );


            sessionStorage.setItem(
                "anexosFalhosSafeSchool",
                "0"
            );

        }

    }


    /* =========================================
       TRATAR ERRO
    ========================================== */

    function mostrarErro(
        erro
    ) {

        const mensagem =
            (
                erro &&
                erro.message
                    ? erro.message
                    : ""
            );


        if (
            mensagem ===
            "Não foi possível validar a escola."

            ||

            mensagem ===
            "Escola inválida ou inativa."
        ) {

            alert(

                "Não foi possível validar a escola vinculada a esta denúncia.\n\n" +

                "Acesse o SafeSchool pelo link ou QR Code fornecido pela instituição."

            );


            return;

        }


        alert(

            "Não foi possível registrar a denúncia neste momento.\n\n" +

            "Nenhuma informação foi considerada enviada. Tente novamente."

        );

    }


    /* =========================================
       AVISO DE FALHA PARCIAL NOS ANEXOS
    ========================================== */

    function avisarFalhaParcialAnexos(
        resumo
    ) {

        if (
            !resumo ||
            !resumo.falhas ||
            resumo.falhas.length === 0
        ) {

            return;

        }


        const quantidadeFalhas =
            resumo.falhas.length;


        alert(

            "Sua denúncia foi registrada com sucesso.\n\n"

            +

            (
                quantidadeFalhas === 1

                    ? "Uma imagem não pôde ser enviada."
                    : quantidadeFalhas +
                      " imagens não puderam ser enviadas."
            )

            +

            "\n\nNão envie a denúncia novamente. O protocolo gerado continua válido."

        );

    }


    /* =========================================
       HABILITAR EVIDÊNCIAS
    ========================================== */

    async function habilitarEvidencias() {

        if (
            !campoEvidencia
        ) {

            return;

        }


        try {

            supabaseAnonimo =
                await obterSupabaseAnonimo();


            campoEvidencia.disabled =
                false;


            if (
                orientacaoEvidencia
            ) {

                orientacaoEvidencia.textContent =

                    "Você pode anexar até 3 imagens JPG ou PNG, com no máximo 5 MB cada. Antes do envio, o SafeSchool recria a imagem para reduzir metadados técnicos do arquivo.";

            }


            console.log(
                "SafeSchool: envio protegido de evidências disponível."
            );

        }

        catch (
            erro
        ) {

            console.error(

                "SafeSchool: evidências indisponíveis.",

                erro

            );


            campoEvidencia.disabled =
                true;


            if (
                orientacaoEvidencia
            ) {

                orientacaoEvidencia.textContent =

                    "O envio de imagens está temporariamente indisponível. A denúncia pode ser enviada normalmente sem anexos.";

            }

        }

    }


    /* =========================================
       ALTERAÇÃO DOS ARQUIVOS
    ========================================== */

    if (
        campoEvidencia
    ) {

        campoEvidencia.addEventListener(

            "change",

            function () {

                const arquivos =
                    obterArquivosSelecionados();


                if (
                    arquivos.length >
                    LIMITE_ARQUIVOS
                ) {

                    alert(
                        "Você pode selecionar no máximo 3 imagens."
                    );


                    campoEvidencia.value =
                        "";


                    return;

                }


                for (
                    const arquivo
                    of arquivos
                ) {

                    if (
                        !TIPOS_IMAGEM_PERMITIDOS.includes(
                            arquivo.type
                        )
                    ) {

                        alert(
                            "Utilize apenas imagens JPG ou PNG."
                        );


                        campoEvidencia.value =
                            "";


                        return;

                    }


                    if (
                        arquivo.size >
                        LIMITE_BYTES
                    ) {

                        alert(
                            "Cada imagem pode ter no máximo 5 MB."
                        );


                        campoEvidencia.value =
                            "";


                        return;

                    }

                }


                if (
                    orientacaoEvidencia
                ) {

                    if (
                        arquivos.length === 0
                    ) {

                        orientacaoEvidencia.textContent =

                            "Você pode anexar até 3 imagens JPG ou PNG, com no máximo 5 MB cada. Antes do envio, o SafeSchool recria a imagem para reduzir metadados técnicos do arquivo.";

                    }

                    else {

                        orientacaoEvidencia.textContent =

                            arquivos.length === 1

                                ? "1 imagem selecionada. Ela será preparada antes do envio para reduzir metadados técnicos."

                                : arquivos.length +
                                  " imagens selecionadas. Elas serão preparadas antes do envio para reduzir metadados técnicos.";

                    }

                }

            }

        );

    }


    /* =========================================
       ENVIO DO FORMULÁRIO
    ========================================== */

    formulario.addEventListener(

        "submit",

        async function (
            evento
        ) {

            evento.preventDefault();


            if (
                !validarFormulario()
            ) {

                return;

            }


            const escolaNavegacao =
                obterEscolaAtual();


            if (
                !escolaNavegacao ||
                !escolaNavegacao.codigo
            ) {

                alert(

                    "Não foi possível identificar a escola.\n\n" +

                    "Acesse o SafeSchool pelo link ou QR Code fornecido pela instituição."

                );


                return;

            }


            const arquivos =
                obterArquivosSelecionados();


            definirProcessando(

                true,

                "Enviando denúncia..."

            );


            let denunciaRegistrada =
                false;


            let resultado =
                null;


            let escolaReal =
                null;


            try {

                const supabase =
                    await obterSupabase();


                /* =====================================
                   GARANTIR CLIENTE ANÔNIMO
                ====================================== */

                if (
                    arquivos.length > 0 &&
                    !supabaseAnonimo
                ) {

                    supabaseAnonimo =
                        await obterSupabaseAnonimo();

                }


                /* =====================================
                   VALIDAR ESCOLA REAL
                ====================================== */

                escolaReal =
                    await buscarEscolaReal(

                        supabase,

                        escolaNavegacao.codigo

                    );


                /* =====================================
                   REGISTRAR DENÚNCIA
                ====================================== */

                resultado =
                    await registrarDenuncia(

                        supabase,

                        escolaReal

                    );


                denunciaRegistrada =
                    true;


                /*
                    O protocolo é guardado imediatamente.

                    A partir daqui a denúncia já existe,
                    independentemente do resultado
                    dos anexos.
                */

                prepararTelaSucesso(

                    resultado,

                    escolaReal,

                    null

                );


                /* =====================================
                   ENVIAR EVIDÊNCIAS
                ====================================== */

                let resumoAnexos = {

                    total:
                        0,

                    enviados:
                        0,

                    falhas:
                        []

                };


                if (
                    arquivos.length > 0
                ) {

                    resumoAnexos =
                        await enviarEvidencias(

                            arquivos,

                            resultado

                        );


                    prepararTelaSucesso(

                        resultado,

                        escolaReal,

                        resumoAnexos

                    );


                    avisarFalhaParcialAnexos(
                        resumoAnexos
                    );

                }


                /* =====================================
                   REDIRECIONAR
                ====================================== */

                window.location.href =

                    "sucesso-denuncia.html?escola="

                    +

                    encodeURIComponent(
                        escolaReal.codigo
                    );

            }

            catch (
                erro
            ) {

                console.error(

                    "SafeSchool: falha no envio da denúncia anônima.",

                    erro

                );


                /*
                    Se o relato já foi registrado,
                    nunca informamos que nada foi enviado.
                */

                if (
                    denunciaRegistrada &&
                    resultado &&
                    escolaReal
                ) {

                    prepararTelaSucesso(

                        resultado,

                        escolaReal,

                        null

                    );


                    alert(

                        "Sua denúncia foi registrada e o protocolo continua válido.\n\n" +

                        "Porém, houve um problema ao processar os anexos. Não envie a denúncia novamente."

                    );


                    window.location.href =

                        "sucesso-denuncia.html?escola="

                        +

                        encodeURIComponent(
                            escolaReal.codigo
                        );


                    return;

                }


                mostrarErro(
                    erro
                );

            }

            finally {

                definirProcessando(
                    false
                );

            }

        }

    );


    /* =========================================
       PREPARAR RECURSO DE EVIDÊNCIAS
    ========================================== */

    habilitarEvidencias();

})();