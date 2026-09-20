/* =========================================
   SAFESCHOOL
   RELATO IDENTIFICADO
   INTEGRAÇÃO COM SUPABASE
========================================= */

(function () {

    "use strict";


    /* =========================================
       ELEMENTOS
    ========================================= */

    const formulario =
        document.getElementById(
            "formularioRelatoIdentificado"
        );


    const contaAluno =
        document.getElementById(
            "contaAluno"
        );


    const resultadoRelato =
        document.getElementById(
            "resultadoRelato"
        );


    const protocoloRelato =
        document.getElementById(
            "protocoloRelato"
        );


    const campoEnvolvimento =
        document.getElementById(
            "envolvimento"
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
            "dataOcorrencia"
        );


    const campoRelato =
        document.getElementById(
            "relato"
        );


    const campoUrgencia =
        document.getElementById(
            "urgencia"
        );


    const campoConfirmacao =
        document.getElementById(
            "confirmacao"
        );


    const campoEvidencia =
        document.getElementById(
            "evidencia"
        );


    const botaoEnviar =
        formulario
            ? formulario.querySelector(
                ".botao-enviar"
            )
            : null;


    /* =========================================
       VERIFICAÇÃO INICIAL
    ========================================= */

    if (
        !formulario ||
        !contaAluno ||
        !resultadoRelato ||
        !protocoloRelato
    ) {

        console.error(
            "SafeSchool: não foi possível inicializar o formulário de relato identificado."
        );


        return;

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
       ESCOLA DA SESSÃO
    ========================================= */

    function obterCodigoEscolaSessao() {

        const codigo =
            (
                sessionStorage.getItem(
                    "codigoEscolaSafeSchool"
                ) || ""
            )
            .trim()
            .toUpperCase();


        return codigo;

    }


    /* =========================================
       REDIRECIONAR PARA LOGIN
    ========================================= */

    function redirecionarParaLogin() {

        const codigoEscola =
            obterCodigoEscolaSessao();


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

    }


    /* =========================================
       USUÁRIO AUTENTICADO
    ========================================= */

    async function obterUsuarioAutenticado(
        supabase
    ) {

        const {
            data,
            error
        } =
            await supabase.auth
                .getUser();


        if (
            error ||
            !data ||
            !data.user
        ) {

            throw new Error(
                "Sessão autenticada não encontrada."
            );

        }


        return data.user;

    }


    /* =========================================
       PERFIL DO ALUNO
    ========================================= */

    async function obterPerfilAluno(
        supabase,
        usuario
    ) {

        const {
            data,
            error
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
                    usuario.id
                )

                .single();


        if (
            error
        ) {

            console.error(

                "SafeSchool: erro ao consultar o perfil do aluno.",

                error

            );


            throw new Error(
                "Perfil do aluno não localizado."
            );

        }


        if (
            !data ||
            !data.ativo ||
            data.perfil !== "aluno"
        ) {

            throw new Error(
                "Perfil de aluno inválido."
            );

        }


        return data;

    }


    /* =========================================
       ESCOLA REAL
    ========================================= */

    async function obterEscolaDoAluno(
        supabase,
        perfil
    ) {

        const {
            data,
            error
        } =
            await supabase

                .from(
                    "escolas"
                )

                .select(
                    "id,codigo,nome,ativo"
                )

                .eq(
                    "id",
                    perfil.escola_id
                )

                .single();


        if (
            error
        ) {

            console.error(

                "SafeSchool: erro ao consultar a escola do aluno.",

                error

            );


            throw new Error(
                "Escola do aluno não localizada."
            );

        }


        if (
            !data ||
            !data.ativo
        ) {

            throw new Error(
                "Escola do aluno indisponível."
            );

        }


        return data;

    }


    /* =========================================
       MOSTRAR CONTA IDENTIFICADA
    ========================================= */

    async function carregarContaAluno() {

        try {

            const supabase =
                await obterSupabase();


            const usuario =
                await obterUsuarioAutenticado(
                    supabase
                );


            const perfil =
                await obterPerfilAluno(

                    supabase,

                    usuario

                );


            if (
                perfil.nome
            ) {

                contaAluno.textContent =

                    perfil.nome

                    +

                    (
                        usuario.email
                            ? " — " + usuario.email
                            : ""
                    );

            }

            else {

                contaAluno.textContent =
                    usuario.email || "Aluno identificado";

            }

        }

        catch (
            erro
        ) {

            console.error(

                "SafeSchool: não foi possível carregar a conta identificada.",

                erro

            );


            contaAluno.textContent =
                "Conta não identificada";

        }

    }


    /* =========================================
       BOTÃO EM PROCESSAMENTO
    ========================================= */

    function definirProcessando(
        processando
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
                "Enviando relato...";

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
       VALIDAR FORMULÁRIO
    ========================================= */

    function validarFormulario() {

        const envolvimento =
            campoEnvolvimento.value;


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


        if (
            !envolvimento
        ) {

            alert(

                "Informe se a situação aconteceu com você ou se você a presenciou."

            );


            campoEnvolvimento.focus();


            return false;

        }


        if (
            !tipo
        ) {

            alert(
                "Selecione o tipo de situação."
            );


            campoTipo.focus();


            return false;

        }


        if (
            !local
        ) {

            alert(
                "Informe onde a situação aconteceu."
            );


            campoLocal.focus();


            return false;

        }


        if (
            !data
        ) {

            alert(
                "Informe a data aproximada da ocorrência."
            );


            campoData.focus();


            return false;

        }


        if (
            relato.length < 20
        ) {

            alert(

                "Descreva a situação com pelo menos 20 caracteres."

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


        if (
            !urgencia
        ) {

            alert(

                "Informe como você considera a urgência da situação."

            );


            campoUrgencia.focus();


            return false;

        }


        if (
            !confirmacao
        ) {

            alert(

                "Confirme que entende que este relato será identificado."

            );


            campoConfirmacao.focus();


            return false;

        }


        return true;

    }


    /* =========================================
       VALIDAR ARQUIVO
    ========================================= */

    function validarArquivo() {

        if (
            !campoEvidencia ||
            campoEvidencia.files.length === 0
        ) {

            return {

                valido:
                    true,

                arquivo:
                    null

            };

        }


        const arquivo =
            campoEvidencia.files[0];


        const tiposPermitidos = [

            "image/jpeg",
            "image/png",
            "application/pdf"

        ];


        const limiteBytes =
            10 * 1024 * 1024;


        if (
            !tiposPermitidos.includes(
                arquivo.type
            )
        ) {

            alert(

                "O arquivo precisa estar no formato JPG, PNG ou PDF."

            );


            campoEvidencia.value =
                "";


            return {

                valido:
                    false,

                arquivo:
                    null

            };

        }


        if (
            arquivo.size <= 0
        ) {

            alert(
                "O arquivo selecionado está vazio."
            );


            campoEvidencia.value =
                "";


            return {

                valido:
                    false,

                arquivo:
                    null

            };

        }


        if (
            arquivo.size > limiteBytes
        ) {

            alert(

                "O arquivo deve ter no máximo 10 MB."

            );


            campoEvidencia.value =
                "";


            return {

                valido:
                    false,

                arquivo:
                    null

            };

        }


        return {

            valido:
                true,

            arquivo:
                arquivo

        };

    }


    /* =========================================
       EXTENSÃO SEGURA
    ========================================= */

    function obterExtensaoSegura(
        arquivo
    ) {

        const extensoes = {

            "image/jpeg":
                "jpg",

            "image/png":
                "png",

            "application/pdf":
                "pdf"

        };


        return (
            extensoes[arquivo.type]
            || ""
        );

    }


    /* =========================================
       ENVIAR ANEXO AO STORAGE
    ========================================= */

    async function enviarAnexo(
        supabase,
        relatoId,
        usuarioId,
        arquivo
    ) {

        if (
            !arquivo
        ) {

            return {

                enviado:
                    false,

                erro:
                    null

            };

        }


        const extensao =
            obterExtensaoSegura(
                arquivo
            );


        if (
            !extensao
        ) {

            return {

                enviado:
                    false,

                erro:
                    new Error(
                        "Tipo de arquivo não permitido."
                    )

            };

        }


        const identificadorArquivo =

            typeof crypto.randomUUID ===
            "function"

                ? crypto.randomUUID()

                : (
                    Date.now().toString()

                    +

                    "-"

                    +

                    Math.random()
                        .toString(16)
                        .slice(2)
                );


        const caminhoStorage =

            "relatos/"

            +

            relatoId

            +

            "/"

            +

            identificadorArquivo

            +

            "."

            +

            extensao;


        /* =====================================
           STORAGE PRIVADO
        ====================================== */

        const {
            error: erroUpload
        } =
            await supabase.storage

                .from(
                    "anexos-relatos"
                )

                .upload(

                    caminhoStorage,

                    arquivo,

                    {

                        contentType:
                            arquivo.type,

                        upsert:
                            false

                    }

                );


        if (
            erroUpload
        ) {

            console.error(

                "SafeSchool: erro ao enviar o anexo.",

                erroUpload

            );


            return {

                enviado:
                    false,

                erro:
                    erroUpload

            };

        }


        /* =====================================
           METADADOS DO ANEXO
        ====================================== */

        const {
            error: erroRegistro
        } =
            await supabase

                .from(
                    "anexos_relatos"
                )

                .insert({

                    relato_id:
                        relatoId,

                    caminho_storage:
                        caminhoStorage,

                    nome_original:
                        arquivo.name,

                    tipo_mime:
                        arquivo.type,

                    tamanho_bytes:
                        arquivo.size,

                    enviado_por_id:
                        usuarioId

                });


        if (
            erroRegistro
        ) {

            console.error(

                "SafeSchool: arquivo enviado, mas não foi possível registrar seus metadados.",

                erroRegistro

            );


            return {

                enviado:
                    false,

                erro:
                    erroRegistro

            };

        }


        return {

            enviado:
                true,

            erro:
                null

        };

    }


    /* =========================================
       REGISTRAR RELATO NO BANCO
    ========================================= */

    async function registrarRelato(
        supabase,
        usuario,
        perfil,
        escola
    ) {

        const novoRelato = {

            escola_id:
                escola.id,

            autor_id:
                usuario.id,

            anonimo:
                false,

            origem:
                "relato-identificado",

            envolvimento:
                campoEnvolvimento.value,

            tipo:
                campoTipo.value,

            descricao:
                campoRelato.value
                    .trim(),

            local:
                campoLocal.value,

            quando_ocorreu:
                campoData.value,

            frequencia:
                null,

            status:
                "novo",

            urgencia:
                campoUrgencia.value

        };


        const {
            data,
            error
        } =
            await supabase

                .from(
                    "relatos"
                )

                .insert(
                    novoRelato
                )

                .select(
                    "id,protocolo"
                )

                .single();


        if (
            error
        ) {

            console.error(

                "SafeSchool: erro ao registrar o relato identificado.",

                error

            );


            throw new Error(
                "Não foi possível registrar o relato."
            );

        }


        if (
            !data ||
            !data.id ||
            !data.protocolo
        ) {

            throw new Error(
                "O banco não retornou os dados do relato."
            );

        }


        return data;

    }


    /* =========================================
       MENSAGEM DE ERRO
    ========================================= */

    function mostrarErroEnvio(
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
            "Sessão autenticada não encontrada."
        ) {

            alert(

                "Sua sessão não está mais disponível.\n\n" +

                "Faça login novamente para enviar o relato."

            );


            redirecionarParaLogin();


            return;

        }


        if (
            mensagem ===
            "Perfil do aluno não localizado."

            ||

            mensagem ===
            "Perfil de aluno inválido."
        ) {

            alert(

                "Não foi possível validar sua conta de Aluno.\n\n" +

                "Faça login novamente ou entre em contato com a instituição."

            );


            return;

        }


        if (
            mensagem ===
            "Escola do aluno não localizada."

            ||

            mensagem ===
            "Escola do aluno indisponível."
        ) {

            alert(

                "Não foi possível validar a escola vinculada à sua conta."

            );


            return;

        }


        alert(

            "Não foi possível registrar o relato neste momento.\n\n" +

            "Nenhuma informação foi considerada enviada. Tente novamente."

        );

    }


    /* =========================================
       ENVIAR FORMULÁRIO
    ========================================= */

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


            const validacaoArquivo =
                validarArquivo();


            if (
                !validacaoArquivo.valido
            ) {

                return;

            }


            definirProcessando(
                true
            );


            try {

                const supabase =
                    await obterSupabase();


                /* =====================================
                   AUTENTICAÇÃO
                ====================================== */

                const usuario =
                    await obterUsuarioAutenticado(
                        supabase
                    );


                /* =====================================
                   PERFIL
                ====================================== */

                const perfil =
                    await obterPerfilAluno(

                        supabase,

                        usuario

                    );


                /* =====================================
                   ESCOLA
                ====================================== */

                const escola =
                    await obterEscolaDoAluno(

                        supabase,

                        perfil

                    );


                /* =====================================
                   CONFERIR ESCOLA DA NAVEGAÇÃO
                ====================================== */

                const codigoSessao =
                    obterCodigoEscolaSessao();


                if (
                    codigoSessao &&
                    codigoSessao !== escola.codigo
                ) {

                    throw new Error(
                        "A escola da sessão não corresponde à conta."
                    );

                }


                /* =====================================
                   CRIAR RELATO REAL
                ====================================== */

                const relatoCriado =
                    await registrarRelato(

                        supabase,

                        usuario,

                        perfil,

                        escola

                    );


                /* =====================================
                   ANEXO OPCIONAL
                ====================================== */

                let anexoFoiEnviado =
                    false;


                let houveErroNoAnexo =
                    false;


                if (
                    validacaoArquivo.arquivo
                ) {

                    const resultadoAnexo =
                        await enviarAnexo(

                            supabase,

                            relatoCriado.id,

                            usuario.id,

                            validacaoArquivo.arquivo

                        );


                    anexoFoiEnviado =
                        resultadoAnexo.enviado;


                    houveErroNoAnexo =
                        Boolean(
                            resultadoAnexo.erro
                        );

                }


                /* =====================================
                   EXIBIR PROTOCOLO DO BANCO
                ====================================== */

                protocoloRelato.textContent =
                    relatoCriado.protocolo;


                resultadoRelato.hidden =
                    false;


                resultadoRelato.scrollIntoView({

                    behavior:
                        "smooth",

                    block:
                        "center"

                });


                formulario.reset();


                /* =====================================
                   AVISO SOBRE O ANEXO
                ====================================== */

                if (
                    houveErroNoAnexo
                ) {

                    alert(

                        "Seu relato foi registrado com sucesso e o protocolo já foi gerado.\n\n" +

                        "Porém, não foi possível concluir o envio do arquivo anexado. Guarde o protocolo exibido na tela."

                    );

                }

                else if (
                    anexoFoiEnviado
                ) {

                    console.log(
                        "SafeSchool: relato e anexo registrados com sucesso."
                    );

                }

            }

            catch (
                erro
            ) {

                console.error(

                    "SafeSchool: falha no envio do relato identificado.",

                    erro

                );


                mostrarErroEnvio(
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
       INICIAR IDENTIFICAÇÃO VISUAL
    ========================================= */

    carregarContaAluno();

})();