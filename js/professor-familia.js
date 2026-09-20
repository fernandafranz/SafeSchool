/* =========================================
   SAFESCHOOL
   SOLICITAÇÕES DA FAMÍLIA
   PAINEL DA EQUIPE ESCOLAR
========================================= */

(function () {

    "use strict";


    /* =========================================
       ELEMENTOS
    ========================================== */

    const listaSolicitacoes =
        document.getElementById(
            "listaSolicitacoesFamiliaProfessor"
        );


    const semSolicitacoes =
        document.getElementById(
            "semSolicitacoesFamiliaProfessor"
        );


    const contadorSolicitacoes =
        document.getElementById(
            "contadorSolicitacoesFamiliaProfessor"
        );


    /* =========================================
       ESTADO
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
       INTERFACE GLOBAL
    ========================================== */

    async function carregarInterface() {

        if (
            window.SafeSchoolUI
        ) {

            return true;

        }


        try {

            const urlInterface =
                new URL(
                    "../js/interface.js",
                    window.location.href
                ).href;


            await import(
                urlInterface
            );


            return !!window.SafeSchoolUI;

        }

        catch (
            erro
        ) {

            console.error(
                "SafeSchool: não foi possível carregar a interface global.",
                erro
            );


            return false;

        }

    }


    function mostrarSucesso(
        mensagem,
        titulo = "Tudo certo"
    ) {

        if (
            window.SafeSchoolUI &&
            typeof window.SafeSchoolUI.sucesso ===
            "function"
        ) {

            window.SafeSchoolUI.sucesso(
                mensagem,
                titulo
            );


            return;

        }


        console.log(
            titulo + ": " + mensagem
        );

    }


    function mostrarErro(
        mensagem,
        titulo = "Não foi possível concluir"
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


    async function pedirConfirmacao(
        opcoes
    ) {

        if (
            window.SafeSchoolUI &&
            typeof window.SafeSchoolUI.confirmar ===
            "function"
        ) {

            return await
                window.SafeSchoolUI.confirmar(
                    opcoes
                );

        }


        return window.confirm(
            opcoes.mensagem ||
            "Deseja continuar?"
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
            "FAM-" +
            parte
        );

    }


    /* =========================================
       NORMALIZAR STATUS
    ========================================== */

    function normalizarStatus(
        status
    ) {

        return String(
            status || ""
        )
            .trim()
            .toLowerCase();

    }


    function formatarStatus(
        status
    ) {

        const valor =
            normalizarStatus(
                status
            );


        const textos = {

            pendente:
                "Pendente",

            em_atendimento:
                "Em atendimento",

            concluido:
                "Concluída"

        };


        return (
            textos[valor] ||
            "Pendente"
        );

    }


    /* =========================================
       SESSÃO REAL
    ========================================== */

    async function carregarSessaoProfessor() {

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
                    "SafeSchool: sessão da equipe escolar não encontrada.",
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
                    "SafeSchool: perfil da equipe escolar não localizado.",
                    erroPerfil
                );


                return false;

            }


            if (
                !perfil.ativo ||
                perfil.perfil !==
                "professor"
            ) {

                console.error(
                    "SafeSchool: usuário sem autorização para gerenciar solicitações da família."
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
                !escola ||
                !escola.ativo
            ) {

                console.error(
                    "SafeSchool: instituição da equipe escolar não localizada ou inativa.",
                    erroEscola
                );


                return false;

            }


            escolaAtual =
                escola;


            return true;

        }

        catch (
            erro
        ) {

            console.error(
                "SafeSchool: erro ao validar sessão da equipe escolar.",
                erro
            );


            return false;

        }

    }


    /* =========================================
       BUSCAR PERFIS
    ========================================== */

    async function buscarPerfis(
        solicitacoes
    ) {

        const ids =
            [
                ...new Set(

                    solicitacoes
                        .flatMap(

                            function (
                                solicitacao
                            ) {

                                return [

                                    solicitacao.responsavel_id,

                                    solicitacao.aluno_id

                                ];

                            }

                        )
                        .filter(
                            Boolean
                        )

                )
            ];


        if (
            ids.length === 0
        ) {

            return new Map();

        }


        const {
            data,
            error
        } =
            await supabase

                .from(
                    "perfis"
                )

                .select(
                    "id,nome,perfil"
                )

                .in(
                    "id",
                    ids
                );


        if (
            error
        ) {

            console.error(
                "SafeSchool: erro ao carregar perfis das solicitações.",
                error
            );


            throw new Error(
                "Não foi possível carregar os participantes."
            );

        }


        const mapa =
            new Map();


        (
            Array.isArray(
                data
            )
                ? data
                : []
        )
            .forEach(

                function (
                    perfil
                ) {

                    mapa.set(
                        perfil.id,
                        perfil
                    );

                }

            );


        return mapa;

    }


    /* =========================================
       BUSCAR SOLICITAÇÕES
    ========================================== */

    async function buscarSolicitacoes() {

        if (
            !supabase ||
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
                    "id,escola_id,responsavel_id,aluno_id,assunto,mensagem,status,criado_em,atualizado_em"
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
                "SafeSchool: erro ao carregar solicitações da família.",
                error
            );


            throw new Error(
                "Não foi possível carregar as solicitações."
            );

        }


        const solicitacoes =
            Array.isArray(
                data
            )
                ? data
                : [];


        const perfis =
            await buscarPerfis(
                solicitacoes
            );


        return solicitacoes.map(

            function (
                solicitacao
            ) {

                return {

                    ...solicitacao,

                    status:
                        normalizarStatus(
                            solicitacao.status
                        ),

                    responsavel:
                        perfis.get(
                            solicitacao.responsavel_id
                        )
                        ||
                        null,

                    aluno:
                        solicitacao.aluno_id

                            ? (
                                perfis.get(
                                    solicitacao.aluno_id
                                )
                                ||
                                null
                            )

                            : null

                };

            }

        );

    }


    /* =========================================
       ALTERAR STATUS
    ========================================== */

    async function alterarStatus(
        solicitacao,
        novoStatus,
        card
    ) {

        if (
            !supabase
        ) {

            mostrarErro(
                "A sessão da equipe escolar não está disponível."
            );


            return;

        }


        const statusAnterior =
            normalizarStatus(
                solicitacao.status
            );


        const statusNovo =
            normalizarStatus(
                novoStatus
            );


        if (
            statusNovo !==
            "em_atendimento"

            &&

            statusNovo !==
            "concluido"
        ) {

            return;

        }


        const iniciando =
            statusNovo ===
            "em_atendimento";


        const confirmou =
            await pedirConfirmacao({

                titulo:
                    iniciando

                        ? "Iniciar atendimento?"

                        : "Concluir solicitação?",


                mensagem:
                    iniciando

                        ? (
                            "A solicitação será marcada como Em atendimento.\n\n" +

                            "O Responsável poderá acompanhar essa atualização pela Área da Família."
                        )

                        : (
                            "Confirme apenas quando a solicitação já tiver recebido o encaminhamento necessário pela equipe escolar.\n\n" +

                            "O status será alterado para Concluída."
                        ),


                textoConfirmar:
                    iniciando

                        ? "Iniciar atendimento"

                        : "Concluir solicitação",


                textoCancelar:
                    "Cancelar",


                perigo:
                    false

            });


        if (
            !confirmou
        ) {

            return;

        }


        const botoes =
            card

                ? card.querySelectorAll(
                    "button"
                )

                : [];


        botoes.forEach(

            function (
                botao
            ) {

                botao.disabled =
                    true;

            }

        );


        try {

            const {
                data,
                error
            } =
                await supabase

                    .from(
                        "solicitacoes_familia"
                    )

                    .update({

                        status:
                            statusNovo

                    })

                    .eq(
                        "id",
                        solicitacao.id
                    )

                    .eq(
                        "status",
                        statusAnterior
                    )

                    .select(
                        "id,status,atualizado_em"
                    )

                    .maybeSingle();


            if (
                error
            ) {

                console.error(
                    "SafeSchool: erro ao atualizar solicitação da família.",
                    error
                );


                throw new Error(
                    "Não foi possível atualizar a solicitação."
                );

            }


            if (
                !data
            ) {

                mostrarAviso(

                    "Esta solicitação já foi atualizada ou não está mais disponível. A lista será recarregada.",

                    "Solicitação atualizada"

                );


                await renderizarSolicitacoes();

                return;

            }


            if (
                iniciando
            ) {

                mostrarSucesso(

                    "A solicitação agora está em atendimento pela equipe escolar.",

                    "Atendimento iniciado"

                );

            }

            else {

                mostrarSucesso(

                    "A solicitação foi concluída e o Responsável verá o novo status.",

                    "Solicitação concluída"

                );

            }


            await renderizarSolicitacoes();

        }

        catch (
            erro
        ) {

            console.error(
                "SafeSchool: falha ao atualizar solicitação.",
                erro
            );


            mostrarErro(

                "Não foi possível atualizar esta solicitação. Tente novamente.",

                "Erro ao atualizar"

            );


            botoes.forEach(

                function (
                    botao
                ) {

                    botao.disabled =
                        false;

                }

            );

        }

    }


    /* =========================================
       CRIAR AÇÕES
    ========================================== */

    function criarAcoes(
        status
    ) {

        const valor =
            normalizarStatus(
                status
            );


        if (
            valor ===
            "pendente"
        ) {

            return `

                <button
                    type="button"
                    class="botao-atender-familia-professor"
                    data-iniciar-atendimento
                >
                    ▶ Iniciar atendimento
                </button>

            `;

        }


        if (
            valor ===
            "em_atendimento"
        ) {

            return `

                <button
                    type="button"
                    class="botao-concluir-familia-professor"
                    data-concluir-solicitacao
                >
                    ✓ Concluir solicitação
                </button>

            `;

        }


        return `

            <button
                type="button"
                class="botao-solicitacao-concluida-professor"
                disabled
            >
                ✓ Solicitação concluída
            </button>

        `;

    }


    /* =========================================
       CRIAR CARD
    ========================================== */

    function criarCardSolicitacao(
        solicitacao
    ) {

        const card =
            document.createElement(
                "article"
            );


        card.className =
            "card-solicitacao-familia-professor";


        const nomeResponsavel =

            solicitacao.responsavel &&
            solicitacao.responsavel.nome

                ? solicitacao.responsavel.nome

                : "Responsável não identificado";


        const nomeAluno =

            solicitacao.aluno &&
            solicitacao.aluno.nome

                ? solicitacao.aluno.nome

                : "Não informado nesta solicitação";


        const status =
            normalizarStatus(
                solicitacao.status
            );


        const acoes =
            criarAcoes(
                status
            );


        card.innerHTML = `

            <div class="solicitacao-familia-professor-topo">


                <div>

                    <span class="solicitacao-familia-professor-referencia">

                        ${escaparHTML(
                            gerarReferencia(
                                solicitacao.id
                            )
                        )}

                    </span>


                    <h3>

                        ${escaparHTML(
                            solicitacao.assunto
                        )}

                    </h3>

                </div>


                <span
                    class="
                        solicitacao-familia-professor-status
                        ${escaparHTML(
                            status
                        )}
                    "
                >

                    ${escaparHTML(
                        formatarStatus(
                            status
                        )
                    )}

                </span>


            </div>


            <div class="solicitacao-familia-professor-dados">


                <div>

                    <span>
                        Responsável
                    </span>

                    <strong>

                        ${escaparHTML(
                            nomeResponsavel
                        )}

                    </strong>

                </div>


                <div>

                    <span>
                        Estudante
                    </span>

                    <strong>

                        ${escaparHTML(
                            nomeAluno
                        )}

                    </strong>

                </div>


            </div>


            <div class="solicitacao-familia-professor-mensagem">

                <span>
                    Mensagem enviada pela família
                </span>


                <p>

                    ${escaparHTML(
                        solicitacao.mensagem
                    )}

                </p>

            </div>


            <span class="solicitacao-familia-professor-data">

                Recebida em

                ${escaparHTML(
                    formatarDataHora(
                        solicitacao.criado_em
                    )
                )}

            </span>


            <div class="solicitacao-familia-professor-acoes">

                ${acoes}

            </div>

        `;


        const botaoIniciar =
            card.querySelector(
                "[data-iniciar-atendimento]"
            );


        if (
            botaoIniciar
        ) {

            botaoIniciar.addEventListener(

                "click",

                function () {

                    alterarStatus(

                        solicitacao,

                        "em_atendimento",

                        card

                    );

                }

            );

        }


        const botaoConcluir =
            card.querySelector(
                "[data-concluir-solicitacao]"
            );


        if (
            botaoConcluir
        ) {

            botaoConcluir.addEventListener(

                "click",

                function () {

                    alterarStatus(

                        solicitacao,

                        "concluido",

                        card

                    );

                }

            );

        }


        return card;

    }


    /* =========================================
       RENDERIZAR
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


            const pendentes =
                solicitacoes.filter(

                    function (
                        solicitacao
                    ) {

                        return (
                            normalizarStatus(
                                solicitacao.status
                            )
                            ===
                            "pendente"
                        );

                    }

                ).length;


            if (
                contadorSolicitacoes
            ) {

                contadorSolicitacoes.textContent =

                    pendentes === 1

                        ? "1 pendente"

                        : pendentes +
                          " pendentes";

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

                    listaSolicitacoes
                        .appendChild(

                            criarCardSolicitacao(
                                solicitacao
                            )

                        );

                }

            );

        }

        catch (
            erro
        ) {

            console.error(
                "SafeSchool: falha ao renderizar solicitações da família.",
                erro
            );


            mostrarErro(

                "Não foi possível carregar as solicitações enviadas pelas famílias.",

                "Solicitações indisponíveis"

            );


            listaSolicitacoes.innerHTML =
                "";

        }

    }


    /* =========================================
       INICIAR
    ========================================== */

    async function iniciar() {

        if (
            !listaSolicitacoes
        ) {

            return;

        }


        await carregarInterface();


        const sessaoValida =
            await carregarSessaoProfessor();


        if (
            !sessaoValida
        ) {

            return;

        }


        await renderizarSolicitacoes();

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