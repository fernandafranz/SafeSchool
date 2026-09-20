/* =========================================
   SAFESCHOOL
   VÍNCULOS — PAINEL DO PROFESSOR
========================================= */

(function () {

    "use strict";


    /* =========================================
       ELEMENTOS
    ========================================== */

    const listaVinculos =
        document.getElementById(
            "listaVinculosProfessor"
        );

    const semVinculos =
        document.getElementById(
            "semVinculosProfessor"
        );

    const contadorVinculos =
        document.getElementById(
            "contadorVinculosProfessor"
        );


    /* =========================================
       ESTADO
    ========================================== */

    let supabase = null;
    let usuarioAtual = null;
    let perfilAtual = null;
    let escolaAtual = null;


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


        window.alert(
            mensagem
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


        window.alert(
            mensagem
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


        window.alert(
            mensagem
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
            "VIN-" +
            parte
        );

    }


    /* =========================================
       REDIRECIONAR PARA LOGIN
    ========================================== */

    function redirecionarLogin() {

        const parametros =
            new URLSearchParams(
                window.location.search
            );


        const codigo =
            (
                parametros.get(
                    "escola"
                )

                ||

                sessionStorage.getItem(
                    "codigoEscolaSafeSchool"
                )

                ||

                ""
            )
                .trim()
                .toUpperCase();


        const destino =
            codigo

                ? (
                    "login.html?escola="

                    +

                    encodeURIComponent(
                        codigo
                    )

                    +

                    "&acesso=restrito"
                )

                : "login.html?acesso=restrito";


        window.location.replace(
            destino
        );

    }


    /* =========================================
       CARREGAR SESSÃO REAL
    ========================================== */

    async function carregarSessaoProfessor() {

        if (
            !window.SafeSchoolSupabaseReady
        ) {

            console.error(
                "SafeSchool: Supabase não foi carregado."
            );


            redirecionarLogin();

            return false;

        }


        try {

            supabase =
                await window.SafeSchoolSupabaseReady;


            /* =====================================
               USUÁRIO
            ====================================== */

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
                    "SafeSchool: sessão do Professor não encontrada.",
                    erroUsuario
                );


                redirecionarLogin();

                return false;

            }


            usuarioAtual =
                dadosUsuario.user;


            /* =====================================
               PERFIL
            ====================================== */

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
                    "SafeSchool: perfil do Professor não localizado.",
                    erroPerfil
                );


                await supabase.auth.signOut();

                redirecionarLogin();

                return false;

            }


            if (
                !perfil.ativo ||
                perfil.perfil !==
                "professor"
            ) {

                console.error(
                    "SafeSchool: perfil sem autorização para o painel."
                );


                await supabase.auth.signOut();

                redirecionarLogin();

                return false;

            }


            perfilAtual =
                perfil;


            /* =====================================
               ESCOLA
            ====================================== */

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
                    "SafeSchool: instituição não localizada ou inativa.",
                    erroEscola
                );


                await supabase.auth.signOut();

                redirecionarLogin();

                return false;

            }


            escolaAtual =
                escola;


            /* =====================================
               SESSÃO COMPATÍVEL
            ====================================== */

            sessionStorage.setItem(
                "perfilSafeSchool",
                "professor"
            );

            sessionStorage.setItem(
                "usuarioEmailSafeSchool",
                usuarioAtual.email || ""
            );

            sessionStorage.setItem(
                "usuarioIdSafeSchool",
                usuarioAtual.id
            );

            sessionStorage.setItem(
                "usuarioNomeSafeSchool",
                perfilAtual.nome || ""
            );

            sessionStorage.setItem(
                "codigoEscolaSafeSchool",
                escolaAtual.codigo
            );

            sessionStorage.setItem(
                "nomeEscolaSafeSchool",
                escolaAtual.nome
            );


            /* =====================================
               CONFERIR ESCOLA DA URL
            ====================================== */

            const parametros =
                new URLSearchParams(
                    window.location.search
                );


            const codigoURL =
                (
                    parametros.get(
                        "escola"
                    ) || ""
                )
                    .trim()
                    .toUpperCase();


            if (
                codigoURL !==
                escolaAtual.codigo
            ) {

                window.location.replace(

                    "professor.html?escola="

                    +

                    encodeURIComponent(
                        escolaAtual.codigo
                    )

                );


                return false;

            }


            return true;

        }

        catch (
            erro
        ) {

            console.error(
                "SafeSchool: erro ao validar sessão do Professor.",
                erro
            );


            redirecionarLogin();

            return false;

        }

    }


    /* =========================================
       BUSCAR PERFIS
    ========================================== */

    async function buscarPerfis(
        vinculos
    ) {

        const ids =
            [
                ...new Set(

                    vinculos
                        .flatMap(

                            function (
                                vinculo
                            ) {

                                return [
                                    vinculo.responsavel_id,
                                    vinculo.aluno_id
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
                "SafeSchool: erro ao carregar perfis dos vínculos.",
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
       BUSCAR VÍNCULOS PENDENTES
    ========================================== */

    async function buscarVinculosPendentes() {

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
                    "vinculos_responsaveis"
                )

                .select(
                    "id,responsavel_id,aluno_id,parentesco,status,criado_em,atualizado_em"
                )

                .eq(
                    "status",
                    "pendente"
                )

                .order(
                    "criado_em",
                    {
                        ascending:
                            true
                    }
                );


        if (
            error
        ) {

            console.error(
                "SafeSchool: erro ao buscar vínculos.",
                error
            );


            throw new Error(
                "Não foi possível carregar as solicitações de vínculo."
            );

        }


        const vinculos =
            Array.isArray(
                data
            )
                ? data
                : [];


        const perfis =
            await buscarPerfis(
                vinculos
            );


        return vinculos.map(

            function (
                vinculo
            ) {

                return {

                    ...vinculo,

                    responsavel:
                        perfis.get(
                            vinculo.responsavel_id
                        )
                        ||
                        null,

                    aluno:
                        perfis.get(
                            vinculo.aluno_id
                        )
                        ||
                        null

                };

            }

        );

    }


    /* =========================================
       ALTERAR STATUS
    ========================================== */

    async function alterarStatus(
        vinculoId,
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


        if (
            novoStatus !==
            "aprovado"

            &&

            novoStatus !==
            "inativo"
        ) {

            return;

        }


        const aprovando =
            novoStatus ===
            "aprovado";


        const confirmou =
            await pedirConfirmacao({

                titulo:
                    aprovando
                        ? "Aprovar vínculo?"
                        : "Não aprovar vínculo?",

                mensagem:
                    aprovando

                        ? (
                            "Confirme somente após a instituição verificar a relação entre o responsável e o estudante.\n\n" +

                            "Após a aprovação, o SafeSchool reconhecerá oficialmente esse vínculo familiar."
                        )

                        : (
                            "Esta solicitação será marcada como inativa e não concederá vínculo com o estudante.\n\n" +

                            "Deseja continuar?"
                        ),

                textoConfirmar:
                    aprovando
                        ? "Aprovar vínculo"
                        : "Não aprovar",

                textoCancelar:
                    "Cancelar",

                perigo:
                    !aprovando

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
                        "vinculos_responsaveis"
                    )

                    .update({

                        status:
                            novoStatus

                    })

                    .eq(
                        "id",
                        vinculoId
                    )

                    .eq(
                        "status",
                        "pendente"
                    )

                    .select(
                        "id,status"
                    )

                    .maybeSingle();


            if (
                error
            ) {

                console.error(
                    "SafeSchool: erro ao atualizar vínculo.",
                    error
                );


                throw new Error(
                    "Não foi possível atualizar o vínculo."
                );

            }


            if (
                !data
            ) {

                mostrarAviso(

                    "Esta solicitação já foi alterada ou não está mais disponível. A lista será atualizada.",

                    "Solicitação atualizada"

                );


                await renderizarVinculos();

                return;

            }


            if (
                aprovando
            ) {

                mostrarSucesso(

                    "O vínculo entre o responsável e o estudante foi aprovado.",

                    "Vínculo aprovado"

                );

            }

            else {

                mostrarSucesso(

                    "A solicitação foi marcada como não aprovada.",

                    "Solicitação atualizada"

                );

            }


            await renderizarVinculos();

        }

        catch (
            erro
        ) {

            console.error(
                "SafeSchool: falha ao alterar vínculo.",
                erro
            );


            mostrarErro(

                "Não foi possível atualizar esta solicitação. Tente novamente.",

                "Erro ao atualizar vínculo"

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
       CRIAR CARD
    ========================================== */

    function criarCardVinculo(
        vinculo
    ) {

        const card =
            document.createElement(
                "article"
            );


        card.className =
            "card-vinculo-professor";


        const nomeResponsavel =
            vinculo.responsavel &&
            vinculo.responsavel.nome

                ? vinculo.responsavel.nome

                : "Responsável não identificado";


        const nomeAluno =
            vinculo.aluno &&
            vinculo.aluno.nome

                ? vinculo.aluno.nome

                : "Estudante não identificado";


        const parentesco =
            vinculo.parentesco ||
            "Não informado";


        card.innerHTML = `

            <div class="vinculo-professor-topo">

                <span class="vinculo-professor-referencia">

                    ${escaparHTML(
                        gerarReferencia(
                            vinculo.id
                        )
                    )}

                </span>


                <span class="vinculo-professor-status">

                    Pendente

                </span>

            </div>


            <div class="vinculo-professor-dados">


                <div class="vinculo-professor-dado">

                    <span>
                        Responsável
                    </span>

                    <strong>

                        ${escaparHTML(
                            nomeResponsavel
                        )}

                    </strong>

                </div>


                <div class="vinculo-professor-dado">

                    <span>
                        Estudante
                    </span>

                    <strong>

                        ${escaparHTML(
                            nomeAluno
                        )}

                    </strong>

                </div>


                <div class="vinculo-professor-dado">

                    <span>
                        Parentesco informado
                    </span>

                    <strong>

                        ${escaparHTML(
                            parentesco
                        )}

                    </strong>

                </div>


            </div>


            <span class="vinculo-professor-data">

                Solicitação registrada em

                ${escaparHTML(
                    formatarDataHora(
                        vinculo.criado_em
                    )
                )}

            </span>


            <div class="vinculo-professor-acoes">

                <button
                    type="button"
                    class="botao-inativar-vinculo"
                    data-nao-aprovar-vinculo
                >
                    Não aprovar
                </button>


                <button
                    type="button"
                    class="botao-aprovar-vinculo"
                    data-aprovar-vinculo
                >
                    ✓ Aprovar vínculo
                </button>

            </div>

        `;


        const botaoAprovar =
            card.querySelector(
                "[data-aprovar-vinculo]"
            );


        if (
            botaoAprovar
        ) {

            botaoAprovar.addEventListener(

                "click",

                function () {

                    alterarStatus(
                        vinculo.id,
                        "aprovado",
                        card
                    );

                }

            );

        }


        const botaoNaoAprovar =
            card.querySelector(
                "[data-nao-aprovar-vinculo]"
            );


        if (
            botaoNaoAprovar
        ) {

            botaoNaoAprovar.addEventListener(

                "click",

                function () {

                    alterarStatus(
                        vinculo.id,
                        "inativo",
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

    async function renderizarVinculos() {

        if (
            !listaVinculos
        ) {

            return;

        }


        try {

            const vinculos =
                await buscarVinculosPendentes();


            listaVinculos.innerHTML =
                "";


            if (
                contadorVinculos
            ) {

                contadorVinculos.textContent =
                    vinculos.length === 1

                        ? "1 pendente"

                        : (
                            vinculos.length +
                            " pendentes"
                        );

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

                    listaVinculos.appendChild(

                        criarCardVinculo(
                            vinculo
                        )

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


            mostrarErro(

                "Não foi possível carregar as solicitações de vínculo.",

                "Vínculos indisponíveis"

            );


            listaVinculos.innerHTML = `

                <div class="sem-vinculos-professor">

                    <div>
                        ⚠️
                    </div>

                    <h3>
                        Não foi possível carregar os vínculos
                    </h3>

                    <p>
                        Atualize a página e tente novamente.
                    </p>

                </div>

            `;


            if (
                contadorVinculos
            ) {

                contadorVinculos.textContent =
                    "Indisponível";

            }


            if (
                semVinculos
            ) {

                semVinculos.hidden =
                    true;

            }

        }

    }


    /* =========================================
       INICIAR
    ========================================== */

    async function iniciar() {

        if (
            !listaVinculos
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
            iniciar
        );

    }

    else {

        iniciar();

    }


})();