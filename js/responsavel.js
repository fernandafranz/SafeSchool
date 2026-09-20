/* =========================================
   SAFESCHOOL
   ÁREA DA FAMÍLIA
========================================= */


(function () {

    "use strict";


    /* =========================================
       CONFIGURAÇÕES
    ========================================== */

    const TAMANHO_MINIMO_MENSAGEM =
        15;


    const TAMANHO_MAXIMO_MENSAGEM =
        1200;


    /* =========================================
       ELEMENTOS — ESCOLA
    ========================================== */

    const nomeEscola =
        document.getElementById(
            "nomeEscolaResponsavel"
        );


    /* =========================================
       ELEMENTOS — APOIO À FAMÍLIA
    ========================================== */

    const formulario =
        document.getElementById(
            "formApoioResponsavel"
        );


    const tipoApoio =
        document.getElementById(
            "tipoApoioResponsavel"
        );


    const mensagem =
        document.getElementById(
            "mensagemApoioResponsavel"
        );


    const contadorMensagem =
        document.getElementById(
            "contadorMensagemResponsavel"
        );


    const confirmacao =
        document.getElementById(
            "confirmacaoApoioResponsavel"
        );


    const erroTipo =
        document.getElementById(
            "erroTipoApoioResponsavel"
        );


    const erroMensagem =
        document.getElementById(
            "erroMensagemApoioResponsavel"
        );


    const erroConfirmacao =
        document.getElementById(
            "erroConfirmacaoApoioResponsavel"
        );


    const mensagemSucesso =
        document.getElementById(
            "mensagemSucessoApoioResponsavel"
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


    const botaoEnviar =
        formulario
            ? formulario.querySelector(
                'button[type="submit"]'
            )
            : null;


    /* =========================================
       ELEMENTOS — VÍNCULO COM ESTUDANTE
    ========================================== */

    const formularioVinculo =
        document.getElementById(
            "formVinculoResponsavel"
        );


    const emailAlunoVinculo =
        document.getElementById(
            "emailAlunoVinculoResponsavel"
        );


    const parentescoVinculo =
        document.getElementById(
            "parentescoVinculoResponsavel"
        );


    const erroEmailVinculo =
        document.getElementById(
            "erroEmailAlunoVinculoResponsavel"
        );


    const erroParentescoVinculo =
        document.getElementById(
            "erroParentescoVinculoResponsavel"
        );


    const mensagemVinculo =
        document.getElementById(
            "mensagemVinculoResponsavel"
        );


    const listaVinculos =
        document.getElementById(
            "listaVinculosResponsavel"
        );


    const semVinculos =
        document.getElementById(
            "semVinculosResponsavel"
        );


    const contadorVinculos =
        document.getElementById(
            "contadorVinculosResponsavel"
        );


    const botaoEnviarVinculo =
        formularioVinculo
            ? formularioVinculo.querySelector(
                'button[type="submit"]'
            )
            : null;


    /* =========================================
       ELEMENTOS — CONTEÚDOS
    ========================================== */

    const gradeConteudos =
        document.getElementById(
            "gradeConteudosResponsavel"
        );


    const leituraConteudo =
        document.getElementById(
            "leituraConteudoResponsavel"
        );


    const botaoVoltarConteudos =
        document.getElementById(
            "botaoVoltarConteudosResponsavel"
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


    /* =========================================
       DADOS DA SESSÃO REAL
    ========================================== */

    let supabase =
        null;


    let usuarioAtual =
        null;


    let perfilAtual =
        null;


    let escolaAtual =
        null;


    /* =========================================
       BIBLIOTECA DE CONTEÚDOS
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


    function gerarReferencia(
        id
    ) {

        if (
            !id
        ) {

            return "FAM";

        }


        const parte =
            String(
                id
            )
            .replace(
                /-/g,
                ""
            )
            .substring(
                0,
                8
            )
            .toUpperCase();


        return (
            "FAM-"
            +
            parte
        );

    }


    function gerarReferenciaVinculo(
        id
    ) {

        if (
            !id
        ) {

            return "VIN";

        }


        const parte =
            String(
                id
            )
            .replace(
                /-/g,
                ""
            )
            .substring(
                0,
                8
            )
            .toUpperCase();


        return (
            "VIN-"
            +
            parte
        );

    }


    function emailValido(
        valor
    ) {

        const email =
            String(
                valor || ""
            )
            .trim()
            .toLowerCase();


        if (
            !email ||
            email.length > 320
        ) {

            return false;

        }


        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            .test(
                email
            );

    }


    /* =========================================
       ASSUNTOS DO FORMULÁRIO
    ========================================== */

    const assuntos = {

        "orientacao":
            "Preciso de orientação",

        "relato-filho":
            "Recebi um relato de uma situação",

        "convivencia":
            "Tenho dúvidas sobre convivência",

        "internet":
            "Situação ocorrida na internet",

        "outro":
            "Outro assunto"

    };


    function obterDescricaoAssunto(
        valor
    ) {

        return (
            assuntos[valor]
            ||
            "Solicitação de orientação"
        );

    }


    /* =========================================
       STATUS — SOLICITAÇÕES
    ========================================== */

    function formatarStatus(
        status
    ) {

        const textos = {

            pendente:
                "Pendente",

            em_atendimento:
                "Em atendimento",

            concluido:
                "Concluída"

        };


        return (
            textos[status]
            ||
            "Pendente"
        );

    }


    /* =========================================
       STATUS — VÍNCULOS
    ========================================== */

    function formatarStatusVinculo(
        status
    ) {

        const textos = {

            pendente:
                "Pendente",

            aprovado:
                "Aprovado",

            inativo:
                "Inativo"

        };


        return (
            textos[status]
            ||
            "Pendente"
        );

    }


    function descricaoStatusVinculo(
        status
    ) {

        const textos = {

            pendente:
                "Aguardando análise e confirmação da equipe escolar.",

            aprovado:
                "O vínculo foi confirmado pela instituição.",

            inativo:
                "Este vínculo está atualmente inativo."

        };


        return (
            textos[status]
            ||
            "Aguardando análise da instituição."
        );

    }


    /* =========================================
       CONTADOR DA MENSAGEM
    ========================================== */

    function atualizarContadorMensagem() {

        if (
            !mensagem ||
            !contadorMensagem
        ) {

            return;

        }


        contadorMensagem.textContent =

            mensagem.value.length

            +

            " / "

            +

            TAMANHO_MAXIMO_MENSAGEM;

    }


    /* =========================================
       ERROS — APOIO
    ========================================== */

    function limparErros() {

        if (
            erroTipo
        ) {

            erroTipo.hidden =
                true;

        }


        if (
            erroMensagem
        ) {

            erroMensagem.hidden =
                true;

        }


        if (
            erroConfirmacao
        ) {

            erroConfirmacao.hidden =
                true;

        }

    }


    function esconderMensagemSucesso() {

        if (
            mensagemSucesso
        ) {

            mensagemSucesso.hidden =
                true;

        }

    }


    /* =========================================
       ERROS — VÍNCULO
    ========================================== */

    function limparErrosVinculo() {

        if (
            erroEmailVinculo
        ) {

            erroEmailVinculo.hidden =
                true;

        }


        if (
            erroParentescoVinculo
        ) {

            erroParentescoVinculo.hidden =
                true;

        }

    }


    function esconderMensagemVinculo() {

        if (
            mensagemVinculo
        ) {

            mensagemVinculo.hidden =
                true;

        }

    }


    /* =========================================
       VALIDAR FORMULÁRIO DE APOIO
    ========================================== */

    function validarFormulario() {

        limparErros();


        const tipoValor =

            tipoApoio

                ? tipoApoio.value.trim()

                : "";


        const mensagemValor =

            mensagem

                ? mensagem.value.trim()

                : "";


        let valido =
            true;


        if (
            !tipoValor ||
            !assuntos[tipoValor]
        ) {

            if (
                erroTipo
            ) {

                erroTipo.hidden =
                    false;

            }


            valido =
                false;

        }


        if (
            mensagemValor.length <
            TAMANHO_MINIMO_MENSAGEM

            ||

            mensagemValor.length >
            TAMANHO_MAXIMO_MENSAGEM
        ) {

            if (
                erroMensagem
            ) {

                erroMensagem.hidden =
                    false;


                erroMensagem.textContent =

                    "Escreva uma mensagem com pelo menos "

                    +

                    TAMANHO_MINIMO_MENSAGEM

                    +

                    " caracteres.";

            }


            valido =
                false;

        }


        if (
            !confirmacao ||
            !confirmacao.checked
        ) {

            if (
                erroConfirmacao
            ) {

                erroConfirmacao.hidden =
                    false;

            }


            valido =
                false;

        }


        return {

            valido:
                valido,

            tipo:
                tipoValor,

            mensagem:
                mensagemValor

        };

    }


    /* =========================================
       VALIDAR FORMULÁRIO DE VÍNCULO
    ========================================== */

    function validarFormularioVinculo() {

        limparErrosVinculo();


        const emailValor =

            emailAlunoVinculo

                ? emailAlunoVinculo
                    .value
                    .trim()
                    .toLowerCase()

                : "";


        const parentescoValor =

            parentescoVinculo

                ? parentescoVinculo
                    .value
                    .trim()

                : "";


        let valido =
            true;


        if (
            !emailValido(
                emailValor
            )
        ) {

            if (
                erroEmailVinculo
            ) {

                erroEmailVinculo.hidden =
                    false;

            }


            valido =
                false;

        }


        if (
            !parentescoValor
        ) {

            if (
                erroParentescoVinculo
            ) {

                erroParentescoVinculo.hidden =
                    false;

            }


            valido =
                false;

        }


        return {

            valido:
                valido,

            email:
                emailValor,

            parentesco:
                parentescoValor

        };

    }


    /* =========================================
       CARREGAR SESSÃO REAL
    ========================================== */

    async function carregarSessaoReal() {

        if (
            !window.SafeSchoolSupabaseReady
        ) {

            console.error(
                "SafeSchool: Supabase não foi carregado."
            );


            return false;

        }


        try {

            supabase =
                await window.SafeSchoolSupabaseReady;


            const {
                data: dadosUsuario,
                error: erroUsuario
            } =
                await supabase.auth.getUser();


            if (
                erroUsuario ||
                !dadosUsuario ||
                !dadosUsuario.user
            ) {

                console.error(

                    "SafeSchool: não foi possível identificar o responsável autenticado.",

                    erroUsuario

                );


                return false;

            }


            usuarioAtual =
                dadosUsuario.user;


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

                    .single();


            if (
                erroPerfil ||
                !perfil
            ) {

                console.error(

                    "SafeSchool: não foi possível carregar o perfil do responsável.",

                    erroPerfil

                );


                return false;

            }


            if (
                !perfil.ativo ||
                perfil.perfil !==
                "responsavel"
            ) {

                console.error(
                    "SafeSchool: perfil sem autorização para acessar a Área da Família."
                );


                return false;

            }


            perfilAtual =
                perfil;


            const {
                data: escola,
                error: erroEscola
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
                        perfilAtual.escola_id
                    )

                    .single();


            if (
                erroEscola ||
                !escola
            ) {

                console.error(

                    "SafeSchool: não foi possível carregar a instituição vinculada.",

                    erroEscola

                );


                return false;

            }


            if (
                !escola.ativo
            ) {

                console.error(
                    "SafeSchool: instituição inativa."
                );


                return false;

            }


            escolaAtual =
                escola;


            if (
                nomeEscola
            ) {

                nomeEscola.textContent =
                    escolaAtual.nome;

            }


            return true;

        }

        catch (
            erro
        ) {

            console.error(

                "SafeSchool: erro ao carregar a sessão da Área da Família.",

                erro

            );


            return false;

        }

    }


    /* =========================================
       REGISTRAR SOLICITAÇÃO DA FAMÍLIA
    ========================================== */

    async function registrarSolicitacao(
        tipoValor,
        mensagemValor
    ) {

        if (
            !supabase ||
            !usuarioAtual ||
            !perfilAtual ||
            !escolaAtual
        ) {

            throw new Error(
                "Sessão da família não está disponível."
            );

        }


        const assuntoValor =
            obterDescricaoAssunto(
                tipoValor
            );


        const {
            data,
            error
        } =
            await supabase

                .from(
                    "solicitacoes_familia"
                )

                .insert({

                    escola_id:
                        escolaAtual.id,

                    responsavel_id:
                        usuarioAtual.id,

                    aluno_id:
                        null,

                    assunto:
                        assuntoValor,

                    mensagem:
                        mensagemValor,

                    status:
                        "pendente"

                })

                .select(
                    "id,assunto,mensagem,status,criado_em,atualizado_em"
                )

                .single();


        if (
            error
        ) {

            console.error(

                "SafeSchool: erro ao registrar solicitação da família.",

                error

            );


            throw new Error(
                "Não foi possível registrar a solicitação."
            );

        }


        return data;

    }


    /* =========================================
       BUSCAR SOLICITAÇÕES
    ========================================== */

    async function buscarSolicitacoes() {

        if (
            !supabase ||
            !usuarioAtual ||
            !escolaAtual
        ) {

            return [];

        }


        const {
            data,
            error
        } =
            await supabase

                .from(
                    "solicitacoes_familia"
                )

                .select(
                    "id,aluno_id,assunto,mensagem,status,criado_em,atualizado_em"
                )

                .eq(
                    "responsavel_id",
                    usuarioAtual.id
                )

                .eq(
                    "escola_id",
                    escolaAtual.id
                )

                .order(
                    "criado_em",
                    {
                        ascending:
                            false
                    }
                );


        if (
            error
        ) {

            console.error(

                "SafeSchool: erro ao carregar as solicitações da família.",

                error

            );


            throw new Error(
                "Não foi possível carregar o histórico."
            );

        }


        return (
            Array.isArray(
                data
            )
                ? data
                : []
        );

    }


    /* =========================================
       RENDERIZAR SOLICITAÇÕES
    ========================================== */

    async function renderizarSolicitacoes() {

        if (
            !listaSolicitacoes
        ) {

            return;

        }


        try {

            const solicitacoes =
                await buscarSolicitacoes();


            listaSolicitacoes.innerHTML =
                "";


            if (
                contadorSolicitacoes
            ) {

                contadorSolicitacoes.textContent =

                    solicitacoes.length === 1

                        ? "1 solicitação"

                        : solicitacoes.length
                          +
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


                    const referencia =
                        gerarReferencia(
                            solicitacao.id
                        );


                    card.innerHTML = `

                        <div class="solicitacao-topo">

                            <span class="solicitacao-protocolo">

                                ${escaparHTML(
                                    referencia
                                )}

                            </span>


                            <span
                                class="solicitacao-status"
                                data-status="${escaparHTML(
                                    solicitacao.status
                                )}"
                            >

                                ${escaparHTML(
                                    formatarStatus(
                                        solicitacao.status
                                    )
                                )}

                            </span>

                        </div>


                        <h3>

                            ${escaparHTML(
                                solicitacao.assunto
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
                                    solicitacao.criado_em
                                )
                            )}

                        </span>

                    `;


                    listaSolicitacoes
                        .appendChild(
                            card
                        );

                }

            );

        }

        catch (
            erro
        ) {

            console.error(

                "SafeSchool: falha ao renderizar histórico da família.",

                erro

            );

        }

    }


    /* =========================================
       SOLICITAR VÍNCULO
    ========================================== */

    async function solicitarVinculo(
        emailAluno,
        parentesco
    ) {

        if (
            !supabase ||
            !usuarioAtual
        ) {

            throw new Error(
                "Sessão da família não está disponível."
            );

        }


        const {
            data,
            error
        } =
            await supabase.rpc(

                "solicitar_vinculo_responsavel",

                {

                    p_email_aluno:
                        emailAluno,

                    p_parentesco:
                        parentesco

                }

            );


        if (
            error
        ) {

            console.error(

                "SafeSchool: erro ao solicitar vínculo com estudante.",

                error

            );


            throw new Error(
                "Não foi possível solicitar o vínculo."
            );

        }


        if (
            !Array.isArray(
                data
            )

            ||

            data.length === 0
        ) {

            throw new Error(
                "O Supabase não retornou o vínculo solicitado."
            );

        }


        return data[0];

    }


    /* =========================================
       BUSCAR VÍNCULOS
    ========================================== */

    async function buscarVinculos() {

        if (
            !supabase ||
            !usuarioAtual
        ) {

            return [];

        }


        const {
            data,
            error
        } =
            await supabase

                .from(
                    "vinculos_responsaveis"
                )

                .select(
                    "id,aluno_id,parentesco,status,criado_em,atualizado_em"
                )

                .eq(
                    "responsavel_id",
                    usuarioAtual.id
                )

                .order(
                    "criado_em",
                    {
                        ascending:
                            false
                    }
                );


        if (
            error
        ) {

            console.error(

                "SafeSchool: erro ao carregar vínculos do responsável.",

                error

            );


            throw new Error(
                "Não foi possível carregar os vínculos."
            );

        }


        return (
            Array.isArray(
                data
            )
                ? data
                : []
        );

    }


    /* =========================================
       RENDERIZAR VÍNCULOS
    ========================================== */

    async function renderizarVinculos() {

        if (
            !listaVinculos
        ) {

            return;

        }


        try {

            const vinculos =
                await buscarVinculos();


            listaVinculos.innerHTML =
                "";


            if (
                contadorVinculos
            ) {

                contadorVinculos.textContent =

                    vinculos.length === 1

                        ? "1 vínculo"

                        : vinculos.length
                          +
                          " vínculos";

            }


            if (
                vinculos.length === 0
            ) {

                if (
                    semVinculos
                ) {

                    semVinculos.hidden =
                        false;

                }


                return;

            }


            if (
                semVinculos
            ) {

                semVinculos.hidden =
                    true;

            }


            vinculos.forEach(

                function (
                    vinculo
                ) {

                    const card =
                        document.createElement(
                            "article"
                        );


                    card.className =
                        "card-solicitacao";


                    const referencia =
                        gerarReferenciaVinculo(
                            vinculo.id
                        );


                    const parentesco =
                        vinculo.parentesco
                        ||
                        "Não informado";


                    card.innerHTML = `

                        <div class="solicitacao-topo">

                            <span class="solicitacao-protocolo">

                                ${escaparHTML(
                                    referencia
                                )}

                            </span>


                            <span
                                class="solicitacao-status"
                                data-status="${escaparHTML(
                                    vinculo.status
                                )}"
                            >

                                ${escaparHTML(
                                    formatarStatusVinculo(
                                        vinculo.status
                                    )
                                )}

                            </span>

                        </div>


                        <h3>
                            Vínculo com estudante
                        </h3>


                        <p>

                            <strong>
                                Parentesco:
                            </strong>

                            ${escaparHTML(
                                parentesco
                            )}

                        </p>


                        <p>

                            ${escaparHTML(
                                descricaoStatusVinculo(
                                    vinculo.status
                                )
                            )}

                        </p>


                        <span class="solicitacao-data">

                            Solicitado em

                            ${escaparHTML(
                                formatarDataHora(
                                    vinculo.criado_em
                                )
                            )}

                        </span>

                    `;


                    listaVinculos
                        .appendChild(
                            card
                        );

                }

            );

        }

        catch (
            erro
        ) {

            console.error(

                "SafeSchool: falha ao renderizar vínculos.",

                erro

            );

        }

    }


    /* =========================================
       CONFIGURAR FORMULÁRIO DE APOIO
    ========================================== */

    function configurarFormulario() {

        if (
            !formulario
        ) {

            return;

        }


        if (
            mensagem
        ) {

            atualizarContadorMensagem();


            mensagem.addEventListener(

                "input",

                function () {

                    atualizarContadorMensagem();

                    esconderMensagemSucesso();


                    if (
                        erroMensagem
                    ) {

                        erroMensagem.hidden =
                            true;

                    }

                }

            );

        }


        if (
            tipoApoio
        ) {

            tipoApoio.addEventListener(

                "change",

                function () {

                    esconderMensagemSucesso();


                    if (
                        erroTipo
                    ) {

                        erroTipo.hidden =
                            true;

                    }

                }

            );

        }


        if (
            confirmacao
        ) {

            confirmacao.addEventListener(

                "change",

                function () {

                    esconderMensagemSucesso();


                    if (
                        erroConfirmacao
                    ) {

                        erroConfirmacao.hidden =
                            true;

                    }

                }

            );

        }


        formulario.addEventListener(

            "submit",

            async function (
                evento
            ) {

                evento.preventDefault();


                esconderMensagemSucesso();


                const validacao =
                    validarFormulario();


                if (
                    !validacao.valido
                ) {

                    return;

                }


                const textoOriginalBotao =

                    botaoEnviar

                        ? botaoEnviar.textContent

                        : "";


                if (
                    botaoEnviar
                ) {

                    botaoEnviar.disabled =
                        true;


                    botaoEnviar.textContent =
                        "Registrando...";

                }


                try {

                    const solicitacao =
                        await registrarSolicitacao(

                            validacao.tipo,

                            validacao.mensagem

                        );


                    const referencia =
                        gerarReferencia(
                            solicitacao.id
                        );


                    formulario.reset();

                    atualizarContadorMensagem();

                    limparErros();


                    if (
                        mensagemSucesso
                    ) {

                        mensagemSucesso.hidden =
                            false;


                        mensagemSucesso.innerHTML = `

                            <strong>
                                Solicitação registrada com sucesso. ✓
                            </strong>

                            <br>

                            Referência:

                            <strong>
                                ${escaparHTML(
                                    referencia
                                )}
                            </strong>

                        `;

                    }


                    await renderizarSolicitacoes();

                }

                catch (
                    erro
                ) {

                    console.error(

                        "SafeSchool: falha ao registrar solicitação da família.",

                        erro

                    );


                    alert(
                        "Não foi possível registrar a solicitação. Tente novamente."
                    );

                }

                finally {

                    if (
                        botaoEnviar
                    ) {

                        botaoEnviar.disabled =
                            false;


                        botaoEnviar.textContent =
                            textoOriginalBotao;

                    }

                }

            }

        );

    }


    /* =========================================
       CONFIGURAR FORMULÁRIO DE VÍNCULO
    ========================================== */

    function configurarFormularioVinculo() {

        if (
            !formularioVinculo
        ) {

            return;

        }


        if (
            emailAlunoVinculo
        ) {

            emailAlunoVinculo.addEventListener(

                "input",

                function () {

                    esconderMensagemVinculo();


                    if (
                        erroEmailVinculo
                    ) {

                        erroEmailVinculo.hidden =
                            true;

                    }

                }

            );

        }


        if (
            parentescoVinculo
        ) {

            parentescoVinculo.addEventListener(

                "change",

                function () {

                    esconderMensagemVinculo();


                    if (
                        erroParentescoVinculo
                    ) {

                        erroParentescoVinculo.hidden =
                            true;

                    }

                }

            );

        }


        formularioVinculo.addEventListener(

            "submit",

            async function (
                evento
            ) {

                evento.preventDefault();


                esconderMensagemVinculo();


                const validacao =
                    validarFormularioVinculo();


                if (
                    !validacao.valido
                ) {

                    return;

                }


                const textoOriginalBotao =

                    botaoEnviarVinculo

                        ? botaoEnviarVinculo.textContent

                        : "";


                if (
                    botaoEnviarVinculo
                ) {

                    botaoEnviarVinculo.disabled =
                        true;


                    botaoEnviarVinculo.textContent =
                        "Solicitando...";

                }


                try {

                    const vinculo =
                        await solicitarVinculo(

                            validacao.email,

                            validacao.parentesco

                        );


                    const referencia =
                        gerarReferenciaVinculo(
                            vinculo.vinculo_id
                        );


                    formularioVinculo.reset();

                    limparErrosVinculo();


                    if (
                        mensagemVinculo
                    ) {

                        mensagemVinculo.hidden =
                            false;


                        mensagemVinculo.innerHTML = `

                            <strong>
                                Solicitação de vínculo registrada. ✓
                            </strong>

                            <br>

                            Referência:

                            <strong>
                                ${escaparHTML(
                                    referencia
                                )}
                            </strong>

                            <br>

                            Status:

                            <strong>
                                ${escaparHTML(
                                    formatarStatusVinculo(
                                        vinculo.vinculo_status
                                    )
                                )}
                            </strong>

                        `;

                    }


                    await renderizarVinculos();

                }

                catch (
                    erro
                ) {

                    console.error(

                        "SafeSchool: falha ao solicitar vínculo.",

                        erro

                    );


                    alert(

                        "Não foi possível solicitar o vínculo. Confira se o e-mail informado pertence a uma conta de Aluno ativa da mesma instituição."

                    );

                }

                finally {

                    if (
                        botaoEnviarVinculo
                    ) {

                        botaoEnviarVinculo.disabled =
                            false;


                        botaoEnviarVinculo.textContent =
                            textoOriginalBotao;

                    }

                }

            }

        );

    }


    /* =========================================
       CONFIGURAÇÃO PEDAGÓGICA
    ========================================== */

    function obterConfiguracaoPedagogica() {

        if (
            !escolaAtual
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
                todas[
                    escolaAtual.codigo
                ];


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
                    ||
                    null

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
       ABRIR CONTEÚDO
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
                        item.id ===
                        id
                    );

                }

            );


        if (
            !conteudo ||
            !leituraConteudo
        ) {

            return;

        }


        if (
            iconeConteudo
        ) {

            iconeConteudo.textContent =
                conteudo.icone;

        }


        if (
            categoriaConteudo
        ) {

            categoriaConteudo.textContent =
                conteudo.categoria;

        }


        if (
            tituloConteudo
        ) {

            tituloConteudo.textContent =
                conteudo.titulo;

        }


        if (
            textoConteudo
        ) {

            textoConteudo.innerHTML =
                conteudo.texto;

        }


        if (
            reflexaoConteudo
        ) {

            reflexaoConteudo.textContent =
                conteudo.reflexao;

        }


        leituraConteudo.hidden =
            false;


        leituraConteudo.scrollIntoView({

            behavior:
                "smooth",

            block:
                "start"

        });

    }


    /* =========================================
       RENDERIZAR CONTEÚDOS
    ========================================== */

    function renderizarConteudos() {

        if (
            !gradeConteudos
        ) {

            return;

        }


        gradeConteudos.innerHTML =
            "";


        if (
            conteudos.length ===
            0
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
                        Não foi possível carregar
                        os conteúdos educativos.
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
                    configuracao
                        .destaqueCampanha
                    ===
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

                        ${escaparHTML(
                            conteudo.icone
                        )}

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
                        data-conteudo-responsavel="${escaparHTML(
                            conteudo.id
                        )}"
                    >
                        Ler conteúdo
                    </button>

                `;


                gradeConteudos
                    .appendChild(
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
       VOLTAR AOS CONTEÚDOS
    ========================================== */

    function configurarVoltarConteudos() {

        if (
            !botaoVoltarConteudos ||
            !leituraConteudo
        ) {

            return;

        }


        botaoVoltarConteudos
            .addEventListener(

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
       INICIAR ÁREA DA FAMÍLIA
    ========================================== */

    async function iniciarAreaFamilia() {

        const sessaoValida =
            await carregarSessaoReal();


        if (
            !sessaoValida
        ) {

            return;

        }


        configurarFormulario();

        configurarFormularioVinculo();

        configurarVoltarConteudos();

        renderizarConteudos();


        await renderizarSolicitacoes();

        await renderizarVinculos();

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

            function () {

                iniciarAreaFamilia();

            }

        );

    }

    else {

        iniciarAreaFamilia();

    }


})();