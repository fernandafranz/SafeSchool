/* =========================================
   SAFESCHOOL
   INTERFACE GLOBAL
   ALERTAS, AVISOS, CONFIRMAÇÕES
   E PADRÃO VISUAL GERAL
========================================= */

(function () {

    "use strict";


    /* =========================================
       EVITAR DUPLICIDADE
    ========================================== */

    if (window.SafeSchoolUI) {
        return;
    }


    /* =========================================
       ESTILOS GLOBAIS
    ========================================== */

    function injetarEstilos() {

        if (
            document.getElementById(
                "safeschool-ui-estilos"
            )
        ) {
            return;
        }


        const estilo =
            document.createElement("style");


        estilo.id =
            "safeschool-ui-estilos";


        estilo.textContent = `

            /* =====================================
               VARIÁVEIS VISUAIS GERAIS
            ====================================== */

            :root {

                --safeschool-status-tamanho: 14px;
                --safeschool-contador-tamanho: 14px;
                --safeschool-botao-tamanho: 14px;
                --safeschool-texto-pequeno: 14px;
                --safeschool-rotulo-secao: 13px;

                --safeschool-peso-legivel: 700;

                --safeschool-roxo-texto: #4f3b94;
                --safeschool-texto-secundario: #625d72;
                --safeschool-titulo: #20205f;

                --safeschool-altura-cabecalho: 96px;

            }


            /* =====================================
               EVITAR ROLAGEM HORIZONTAL
            ====================================== */

            html,
            body {

                max-width: 100%;

                overflow-x: clip;

            }


            /* =====================================
               NAVEGAÇÃO GLOBAL
            ====================================== */

            html {

                scroll-behavior: smooth;

                scroll-padding-top:
                    var(
                        --safeschool-altura-cabecalho
                    );

            }


            main section[id] {

                scroll-margin-top:
                    var(
                        --safeschool-altura-cabecalho
                    );

            }


            /* =====================================
               CABEÇALHO
            ====================================== */

            .cabecalho,
            body > header {

                position: sticky !important;

                top: 0 !important;

                z-index: 10000 !important;

                background: #ffffff !important;
                background-color: #ffffff !important;

                opacity: 1 !important;

                overflow: visible !important;

                backdrop-filter: none !important;
                -webkit-backdrop-filter: none !important;

                border-bottom:
                    1px solid #eeeaf6;

                box-shadow:
                    0 4px 18px
                    rgba(67, 49, 120, 0.07);

                isolation: isolate;

            }


            /* =====================================
               FAIXA BRANCA DE PONTA A PONTA
            ====================================== */

            .cabecalho::before,
            body > header::before {

                content: "";

                position: absolute;

                top: 0;
                bottom: 0;
                left: 50%;

                width: 100vw;

                transform:
                    translateX(-50%);

                background: #ffffff;

                border-bottom:
                    1px solid #eeeaf6;

                z-index: -1;

                pointer-events: none;

            }


            /* =====================================
               ESTADOS VAZIOS
            ====================================== */

            .sem-relatos,
            .sem-vinculos-professor,
            .sem-solicitacoes-familia-professor,
            .sem-solicitacoes,
            .sem-resultados-filtro,
            #semRelatos,
            #semVinculosProfessor,
            #semSolicitacoesFamiliaProfessor,
            #semVinculosResponsavel,
            #semSolicitacoesResponsavel {

                border:
                    1px solid #e1dbea !important;

                border-style:
                    solid !important;

            }


            /* =====================================
               LEGIBILIDADE GLOBAL
            ====================================== */

            body {

                font-size: 16px;

                line-height: 1.55;

            }


            p,
            li,
            label,
            small,
            input,
            select,
            textarea,
            button {

                text-rendering:
                    optimizeLegibility;

                -webkit-font-smoothing:
                    antialiased;

                -moz-osx-font-smoothing:
                    grayscale;

            }


            main p,
            main li {

                font-size:
                    15px !important;

                line-height:
                    1.6 !important;

            }


            label {

                font-size:
                    14px !important;

                line-height:
                    1.5 !important;

            }


            small {

                font-size:
                    13px !important;

                line-height:
                    1.5 !important;

            }


            input,
            select,
            textarea {

                font-size:
                    15px !important;

                line-height:
                    1.5 !important;

            }


            button {

                font-size:
                    14px !important;

                line-height:
                    1.35 !important;

            }


            /* =====================================
               RELATOS
            ====================================== */

            .relato-informacoes span,
            .dado-identificacao,
            .historico-subtitulo,
            .evento-historico p,
            .evento-historico small,
            .triagem-motivos {

                font-size:
                    14px !important;

                line-height:
                    1.55 !important;

            }


            .protocolo-relato {

                font-size:
                    13px !important;

                line-height:
                    1.4 !important;

            }


            /* =====================================
               REGISTRO DE AÇÃO
            ====================================== */

            .registro-acao-real > strong {

                font-size:
                    15px !important;

                line-height:
                    1.4 !important;

            }


            .registro-acao-real > p {

                font-size:
                    14px !important;

                line-height:
                    1.6 !important;

            }


            .registro-acao-real textarea {

                font-size:
                    15px !important;

                line-height:
                    1.55 !important;

            }


            .registro-acao-contador {

                font-size:
                    13px !important;

                line-height:
                    1.5 !important;

            }


            .botao-registrar-acao-real {

                min-height:
                    46px !important;

                padding:
                    12px 20px !important;

                border-radius:
                    10px !important;

                background:
                    #4f35b8 !important;

                color:
                    #ffffff !important;

                font-family:
                    inherit !important;

                font-size:
                    15px !important;

                font-weight:
                    600 !important;

                line-height:
                    1.3 !important;

                letter-spacing:
                    0 !important;

                text-shadow:
                    none !important;

                -webkit-font-smoothing:
                    antialiased !important;

                -moz-osx-font-smoothing:
                    grayscale !important;

            }


            .botao-registrar-acao-real:hover:not(:disabled) {

                background:
                    #402c98 !important;

            }


            /* =====================================
               PADRÃO TIPOGRÁFICO
            ====================================== */

            .safeschool-status-text,
            .safeschool-contador-text,
            .safeschool-botao-acao,

            .status,
            .status-relato,
            .solicitacao-status,
            .vinculo-professor-status,
            .solicitacao-familia-professor-status,
            .modo-demo-status,
            .situacao-prazo,
            .triagem-etiqueta,
            .status-acompanhamento,

            #contadorSolicitacoesFamiliaProfessor,
            #contadorVinculosProfessor,
            #totalRelatos,

            .botao-atender-familia-professor,
            .botao-concluir-familia-professor,
            .botao-solicitacao-concluida-professor,
            .botao-aprovar-vinculo,
            .botao-inativar-vinculo,
            .botao-limpar-busca,
            .filtro-relato {

                font-family:
                    Arial,
                    Helvetica,
                    sans-serif !important;

                text-rendering: auto;

                -webkit-font-smoothing: auto;
                -moz-osx-font-smoothing: auto;

            }


            /* =====================================
               STATUS
            ====================================== */

            .safeschool-status-text,

            .status,
            .status-relato,
            .solicitacao-status,
            .vinculo-professor-status,
            .solicitacao-familia-professor-status,
            .modo-demo-status,
            .situacao-prazo,
            .triagem-etiqueta,
            .status-acompanhamento {

                font-size:
                    var(
                        --safeschool-status-tamanho
                    ) !important;

                font-weight:
                    var(
                        --safeschool-peso-legivel
                    ) !important;

                line-height:
                    1.35 !important;

                letter-spacing:
                    0 !important;

            }


            /* =====================================
               CONTADORES
            ====================================== */

            .safeschool-contador-text,
            #contadorSolicitacoesFamiliaProfessor,
            #contadorVinculosProfessor,
            #totalRelatos,
            .resultado-filtros {

                font-family:
                    Arial,
                    Helvetica,
                    sans-serif !important;

                font-size:
                    var(
                        --safeschool-contador-tamanho
                    ) !important;

                font-weight:
                    var(
                        --safeschool-peso-legivel
                    ) !important;

                line-height:
                    1.4 !important;

                letter-spacing:
                    0 !important;

                color:
                    var(
                        --safeschool-roxo-texto
                    ) !important;

            }


            /* =====================================
               BOTÕES DE AÇÃO
            ====================================== */

            .safeschool-botao-acao,

            .botao-atender-familia-professor,
            .botao-concluir-familia-professor,
            .botao-solicitacao-concluida-professor,

            .botao-aprovar-vinculo,
            .botao-inativar-vinculo,
            .botao-limpar-busca {

                font-size:
                    var(
                        --safeschool-botao-tamanho
                    ) !important;

                font-weight:
                    var(
                        --safeschool-peso-legivel
                    ) !important;

                line-height:
                    1.35 !important;

                letter-spacing:
                    0 !important;

            }


            /* =====================================
               TÍTULOS DE SEÇÃO
            ====================================== */

            .titulo-secao > span,
            .painel-triagem-topo span,
            .painel-prazos-topo span,
            .inteligencia-texto > span {

                font-family:
                    Arial,
                    Helvetica,
                    sans-serif !important;

                font-size:
                    var(
                        --safeschool-rotulo-secao
                    ) !important;

                font-weight:
                    700 !important;

                line-height:
                    1.4 !important;

                letter-spacing:
                    0.06em !important;

                text-rendering: auto;

                -webkit-font-smoothing: auto;

            }


            /* =====================================
               RELATOS RECENTES
            ====================================== */

            #totalRelatos {

                min-width:
                    max-content;

            }


            /* =====================================
               TRIAGEM ASSISTIDA
            ====================================== */

            .painel-triagem-topo h3 {

                font-size:
                    20px !important;

                font-weight:
                    700 !important;

                line-height:
                    1.35 !important;

                color:
                    var(
                        --safeschool-titulo
                    ) !important;

            }


            .painel-triagem-topo p {

                font-size:
                    var(
                        --safeschool-texto-pequeno
                    ) !important;

                line-height:
                    1.6 !important;

                color:
                    var(
                        --safeschool-texto-secundario
                    ) !important;

            }


            .card-triagem strong {

                font-size:
                    28px !important;

                font-weight:
                    700 !important;

                line-height:
                    1.15 !important;

            }


            .card-triagem b {

                font-family:
                    Arial,
                    Helvetica,
                    sans-serif !important;

                font-size:
                    14px !important;

                font-weight:
                    700 !important;

                line-height:
                    1.4 !important;

                color:
                    var(
                        --safeschool-titulo
                    ) !important;

            }


            .card-triagem small {

                font-family:
                    Arial,
                    Helvetica,
                    sans-serif !important;

                font-size:
                    14px !important;

                font-weight:
                    400 !important;

                line-height:
                    1.5 !important;

                color:
                    var(
                        --safeschool-texto-secundario
                    ) !important;

            }


            .aviso-triagem {

                font-size:
                    14px !important;

                font-weight:
                    400 !important;

                line-height:
                    1.6 !important;

                color:
                    var(
                        --safeschool-texto-secundario
                    ) !important;

            }


            /* =====================================
               BLOCO FIXO DE TRIAGEM
            ====================================== */

            .inteligencia-texto h2 {

                font-weight:
                    700 !important;

                line-height:
                    1.3 !important;

            }


            .inteligencia-texto p {

                font-size:
                    14px !important;

                line-height:
                    1.65 !important;

            }


            .inteligencia-texto small {

                font-size:
                    14px !important;

                line-height:
                    1.55 !important;

            }


            /* =====================================
               ACOMPANHAMENTO E PRAZOS
            ====================================== */

            .painel-prazos-topo h3 {

                font-size:
                    20px !important;

                font-weight:
                    700 !important;

                line-height:
                    1.35 !important;

                color:
                    var(
                        --safeschool-titulo
                    ) !important;

            }


            .painel-prazos-topo p {

                font-size:
                    var(
                        --safeschool-texto-pequeno
                    ) !important;

                line-height:
                    1.6 !important;

                color:
                    var(
                        --safeschool-texto-secundario
                    ) !important;

            }


            .card-prazo-alerta strong {

                font-size:
                    28px !important;

                font-weight:
                    700 !important;

                line-height:
                    1.15 !important;

            }


            .card-prazo-alerta b {

                font-family:
                    Arial,
                    Helvetica,
                    sans-serif !important;

                font-size:
                    14px !important;

                font-weight:
                    700 !important;

                line-height:
                    1.4 !important;

                color:
                    var(
                        --safeschool-titulo
                    ) !important;

            }


            .card-prazo-alerta small {

                font-family:
                    Arial,
                    Helvetica,
                    sans-serif !important;

                font-size:
                    14px !important;

                font-weight:
                    400 !important;

                line-height:
                    1.5 !important;

                color:
                    var(
                        --safeschool-texto-secundario
                    ) !important;

            }


            /* =====================================
               LOCALIZAR E FILTRAR CASOS
            ====================================== */

            .topo-filtros-relatos h3 {

                font-family:
                    Arial,
                    Helvetica,
                    sans-serif !important;

                font-size:
                    17px !important;

                font-weight:
                    700 !important;

                line-height:
                    1.4 !important;

                color:
                    var(
                        --safeschool-titulo
                    ) !important;

            }


            .resultado-filtros {

                font-size:
                    14px !important;

            }


            .busca-relatos input {

                font-family:
                    Arial,
                    Helvetica,
                    sans-serif !important;

                font-size:
                    15px !important;

                line-height:
                    1.5 !important;

            }


            .botao-limpar-busca {

                font-size:
                    14px !important;

                font-weight:
                    700 !important;

            }


            .filtro-relato {

                font-family:
                    Arial,
                    Helvetica,
                    sans-serif !important;

                font-size:
                    14px !important;

                font-weight:
                    700 !important;

                line-height:
                    1.35 !important;

                letter-spacing:
                    0 !important;

            }


            /* =====================================
               TRIAGEM DENTRO DOS CASOS
            ====================================== */

            .triagem-caso-topo strong {

                font-size:
                    14px !important;

                font-weight:
                    700 !important;

            }


            .triagem-caso p {

                font-size:
                    14px !important;

                line-height:
                    1.55 !important;

            }


            /* =====================================
               GESTÃO DOS CASOS
            ====================================== */

            .gestao-caso-topo h4 {

                font-size:
                    15px !important;

                font-weight:
                    700 !important;

            }


            .gestao-info small,
            .campo-gestao label {

                font-size:
                    13px !important;

                line-height:
                    1.5 !important;

            }


            .gestao-info strong {

                font-size:
                    14px !important;

            }


            .campo-gestao select,
            .campo-gestao input {

                font-size:
                    15px !important;

            }


            .botao-salvar-gestao {

                font-size:
                    14px !important;

                font-weight:
                    700 !important;

            }


            .gestao-encerrada {

                font-size:
                    14px !important;

                line-height:
                    1.5 !important;

            }


            /* =====================================
               TOASTS / MENSAGENS
            ====================================== */

            .safeschool-toast-container {

                position: fixed;

                top: 110px;
                right: 24px;

                width:
                    min(
                        410px,
                        calc(100vw - 32px)
                    );

                display: flex;
                flex-direction: column;

                gap: 12px;

                z-index: 99999;

                pointer-events: none;

            }


            .safeschool-toast {

                position: relative;

                width: 100%;

                padding:
                    17px 46px
                    17px 18px;

                display: flex;

                align-items:
                    flex-start;

                gap: 13px;

                border-radius:
                    16px;

                background:
                    rgba(
                        255,
                        255,
                        255,
                        0.98
                    );

                border:
                    1px solid #e4def2;

                box-shadow:
                    0 18px 45px
                    rgba(
                        50,
                        35,
                        100,
                        0.16
                    );

                animation:
                    safeSchoolToastEntrar
                    0.25s ease-out;

                pointer-events: auto;

                overflow: hidden;

            }


            .safeschool-toast.saindo {

                animation:
                    safeSchoolToastSair
                    0.22s ease-in forwards;

            }


            .safeschool-toast::after {

                content: "";

                position: absolute;

                left: 0;
                bottom: 0;

                width: 100%;
                height: 3px;

                background: #7253cf;

                transform-origin:
                    left center;

                animation:
                    safeSchoolToastTempo
                    var(
                        --toast-duration,
                        4s
                    )
                    linear forwards;

            }


            .safeschool-toast-icone {

                width: 40px;
                height: 40px;

                flex:
                    0 0 40px;

                display: flex;

                align-items: center;
                justify-content: center;

                border-radius: 12px;

                background: #eee8ff;

                color: #6c4ce5;

                font-size: 19px;

                font-weight: 900;

            }


            .safeschool-toast-conteudo {

                min-width: 0;

                flex: 1;

            }


            .safeschool-toast-conteudo strong {

                display: block;

                margin-bottom: 5px;

                color: #30244b;

                font-family:
                    Arial,
                    Helvetica,
                    sans-serif;

                font-size:
                    15px !important;

                font-weight:
                    700;

                line-height:
                    1.4;

            }


            .safeschool-toast-conteudo p {

                margin: 0;

                color: #625a6e;

                font-family:
                    Arial,
                    Helvetica,
                    sans-serif;

                font-size:
                    14px !important;

                font-weight: 400;

                line-height:
                    1.6 !important;

            }


            .safeschool-toast-fechar {

                position: absolute;

                top: 11px;
                right: 11px;

                width: 30px;
                height: 30px;

                border: 0;

                border-radius: 9px;

                display: flex;

                align-items: center;
                justify-content: center;

                background: transparent;

                color: #716879;

                font-size:
                    18px !important;

                cursor: pointer;

            }


            .safeschool-toast-fechar:hover {

                background: #f4f1fa;

                color: #493c59;

            }


            /* =====================================
               TOAST DE SUCESSO
            ====================================== */

            .safeschool-toast.sucesso {

                border-color: #cde6d4;

            }


            .safeschool-toast.sucesso
            .safeschool-toast-icone {

                background: #eaf7ee;

                color: #3e8154;

            }


            .safeschool-toast.sucesso::after {

                background: #55a76e;

            }


            /* =====================================
               TOAST DE ERRO
            ====================================== */

            .safeschool-toast.erro {

                border-color: #efd3d8;

            }


            .safeschool-toast.erro
            .safeschool-toast-icone {

                background: #fff0f2;

                color: #bd4458;

            }


            .safeschool-toast.erro::after {

                background: #c94c61;

            }


            /* =====================================
               TOAST DE AVISO
            ====================================== */

            .safeschool-toast.aviso {

                border-color: #ebdfb7;

            }


            .safeschool-toast.aviso
            .safeschool-toast-icone {

                background: #fff8df;

                color: #957019;

            }


            .safeschool-toast.aviso::after {

                background: #d1a637;

            }


            /* =====================================
               TOAST DE INFORMAÇÃO
            ====================================== */

            .safeschool-toast.info {

                border-color: #d8d2ee;

            }


            .safeschool-toast.info
            .safeschool-toast-icone {

                background: #eee8ff;

                color: #6749c4;

            }


            /* =====================================
               MODAL
            ====================================== */

            .safeschool-modal-fundo {

                position: fixed;

                inset: 0;

                z-index: 100000;

                padding: 22px;

                display: flex;

                align-items: center;
                justify-content: center;

                background:
                    rgba(
                        27,
                        20,
                        46,
                        0.48
                    );

                backdrop-filter:
                    blur(4px);

                animation:
                    safeSchoolFundoEntrar
                    0.18s ease-out;

            }


            .safeschool-modal {

                width:
                    min(
                        470px,
                        100%
                    );

                padding: 28px;

                border-radius: 22px;

                background: #ffffff;

                border:
                    1px solid #e4def2;

                box-shadow:
                    0 30px 75px
                    rgba(
                        35,
                        24,
                        75,
                        0.25
                    );

                animation:
                    safeSchoolModalEntrar
                    0.22s ease-out;

            }


            .safeschool-modal-icone {

                width: 56px;
                height: 56px;

                margin-bottom: 17px;

                display: flex;

                align-items: center;
                justify-content: center;

                border-radius: 17px;

                background:
                    linear-gradient(
                        135deg,
                        #eee8ff,
                        #f8f5ff
                    );

                color: #6c4ce5;

                font-size: 25px;

                font-weight: 900;

            }


            .safeschool-modal h2 {

                margin:
                    0 0 9px;

                color: #292044;

                font-family:
                    Arial,
                    Helvetica,
                    sans-serif;

                font-size: 21px;

                font-weight: 700;

                line-height: 1.3;

            }


            .safeschool-modal p {

                margin: 0;

                color: #625a6e;

                font-family:
                    Arial,
                    Helvetica,
                    sans-serif;

                font-size:
                    15px !important;

                line-height:
                    1.65 !important;

                white-space:
                    pre-line;

            }


            .safeschool-modal-acoes {

                margin-top: 24px;

                display: flex;

                justify-content:
                    flex-end;

                gap: 10px;

            }


            .safeschool-modal-acoes button {

                min-height: 44px;

                padding:
                    11px 18px;

                border-radius: 11px;

                font-family:
                    Arial,
                    Helvetica,
                    sans-serif;

                font-size:
                    15px !important;

                font-weight: 700;

                line-height: 1.35;

                letter-spacing: 0;

                cursor: pointer;

                transition:
                    transform 0.15s ease,
                    box-shadow 0.15s ease;

            }


            .safeschool-modal-acoes button:hover {

                transform:
                    translateY(-1px);

            }


            .safeschool-modal-cancelar {

                border:
                    1px solid #ddd7e8;

                background: #ffffff;

                color: #554c60;

            }


            .safeschool-modal-confirmar {

                border: 0;

                color: #ffffff;

                background:
                    linear-gradient(
                        135deg,
                        #6345c2,
                        #8058cc
                    );

                box-shadow:
                    0 8px 20px
                    rgba(
                        108,
                        76,
                        229,
                        0.18
                    );

            }


            .safeschool-modal-confirmar.perigo {

                background:
                    linear-gradient(
                        135deg,
                        #b84a5e,
                        #d36676
                    );

                box-shadow:
                    0 8px 20px
                    rgba(
                        184,
                        74,
                        94,
                        0.18
                    );

            }


            /* =====================================
               ANIMAÇÕES
            ====================================== */

            @keyframes safeSchoolToastEntrar {

                from {

                    opacity: 0;

                    transform:
                        translateX(25px);

                }

                to {

                    opacity: 1;

                    transform:
                        translateX(0);

                }

            }


            @keyframes safeSchoolToastSair {

                from {

                    opacity: 1;

                    transform:
                        translateX(0);

                }

                to {

                    opacity: 0;

                    transform:
                        translateX(28px);

                }

            }


            @keyframes safeSchoolToastTempo {

                from {

                    transform:
                        scaleX(1);

                }

                to {

                    transform:
                        scaleX(0);

                }

            }


            @keyframes safeSchoolFundoEntrar {

                from {
                    opacity: 0;
                }

                to {
                    opacity: 1;
                }

            }


            @keyframes safeSchoolModalEntrar {

                from {

                    opacity: 0;

                    transform:
                        translateY(8px)
                        scale(0.98);

                }

                to {

                    opacity: 1;

                    transform:
                        translateY(0)
                        scale(1);

                }

            }


            /* =====================================
               MOBILE
            ====================================== */

            @media (
                max-width: 600px
            ) {

                :root {

                    --safeschool-status-tamanho:
                        14px;

                    --safeschool-contador-tamanho:
                        14px;

                    --safeschool-botao-tamanho:
                        14px;

                    --safeschool-texto-pequeno:
                        14px;

                    --safeschool-rotulo-secao:
                        13px;

                    --safeschool-altura-cabecalho:
                        82px;

                }


                body {

                    font-size:
                        16px;

                }


                main p,
                main li {

                    font-size:
                        15px !important;

                }


                input,
                select,
                textarea {

                    font-size:
                        16px !important;

                }


                .painel-triagem-topo,
                .painel-prazos-topo {

                    flex-direction:
                        column;

                    gap: 10px;

                }


                .safeschool-toast-container {

                    top: 18px;

                    right: 16px;
                    left: 16px;

                    width: auto;

                }


                .safeschool-modal-fundo {

                    padding: 16px;

                }


                .safeschool-modal {

                    padding:
                        24px 20px;

                }


                .safeschool-modal-acoes {

                    flex-direction:
                        column-reverse;

                }


                .safeschool-modal-acoes button {

                    width: 100%;

                }


                .botao-registrar-acao-real {

                    width: 100%;

                    min-height:
                        48px !important;

                    font-size:
                        15px !important;

                    font-weight:
                        600 !important;

                }

            }

        `;


        document.head.appendChild(
            estilo
        );

    }


    /* =========================================
       CONTAINER DE NOTIFICAÇÕES
    ========================================== */

    function obterContainerToast() {

        let container =
            document.getElementById(
                "safeschool-toast-container"
            );


        if (container) {
            return container;
        }


        container =
            document.createElement("div");


        container.id =
            "safeschool-toast-container";


        container.className =
            "safeschool-toast-container";


        container.setAttribute(
            "aria-live",
            "polite"
        );


        container.setAttribute(
            "aria-atomic",
            "false"
        );


        document.body.appendChild(
            container
        );


        return container;

    }


    /* =========================================
       REMOVER TOAST
    ========================================== */

    function removerToast(toast) {

        if (
            !toast ||
            !toast.parentNode
        ) {
            return;
        }


        if (
            toast.dataset.removendo ===
            "true"
        ) {
            return;
        }


        toast.dataset.removendo =
            "true";


        toast.classList.add(
            "saindo"
        );


        window.setTimeout(
            function () {

                toast.remove();

            },
            230
        );

    }


    /* =========================================
       NOTIFICAÇÃO
    ========================================== */

    function notificar(
        opcoes = {}
    ) {

        injetarEstilos();


        const tiposPermitidos = [
            "sucesso",
            "erro",
            "aviso",
            "info"
        ];


        const tipo =
            tiposPermitidos.includes(
                opcoes.tipo
            )
                ? opcoes.tipo
                : "info";


        const configuracoes = {

            sucesso: {
                icone: "✓",
                titulo: "Tudo certo"
            },

            erro: {
                icone: "!",
                titulo:
                    "Não foi possível concluir"
            },

            aviso: {
                icone: "!",
                titulo: "Atenção"
            },

            info: {
                icone: "i",
                titulo: "SafeSchool"
            }

        };


        const configuracao =
            configuracoes[tipo];


        const titulo =
            String(
                opcoes.titulo ||
                configuracao.titulo
            );


        const mensagem =
            String(
                opcoes.mensagem ||
                ""
            );


        const duracao =
            Number.isFinite(
                Number(
                    opcoes.duracao
                )
            )
                ? Math.max(
                    1800,
                    Number(
                        opcoes.duracao
                    )
                )
                : 4200;


        const container =
            obterContainerToast();


        const toast =
            document.createElement("div");


        toast.className =
            "safeschool-toast " +
            tipo;


        toast.setAttribute(
            "role",
            tipo === "erro"
                ? "alert"
                : "status"
        );


        toast.style.setProperty(
            "--toast-duration",
            duracao + "ms"
        );


        const icone =
            document.createElement("div");


        icone.className =
            "safeschool-toast-icone";


        icone.textContent =
            configuracao.icone;


        const conteudo =
            document.createElement("div");


        conteudo.className =
            "safeschool-toast-conteudo";


        const tituloElemento =
            document.createElement("strong");


        tituloElemento.textContent =
            titulo;


        const mensagemElemento =
            document.createElement("p");


        mensagemElemento.textContent =
            mensagem;


        const fechar =
            document.createElement("button");


        fechar.type =
            "button";


        fechar.className =
            "safeschool-toast-fechar";


        fechar.setAttribute(
            "aria-label",
            "Fechar mensagem"
        );


        fechar.textContent =
            "×";


        conteudo.appendChild(
            tituloElemento
        );


        if (mensagem) {

            conteudo.appendChild(
                mensagemElemento
            );

        }


        toast.appendChild(
            icone
        );


        toast.appendChild(
            conteudo
        );


        toast.appendChild(
            fechar
        );


        container.appendChild(
            toast
        );


        fechar.addEventListener(
            "click",
            function () {

                removerToast(
                    toast
                );

            }
        );


        window.setTimeout(
            function () {

                removerToast(
                    toast
                );

            },
            duracao
        );


        return toast;

    }


    /* =========================================
       ATALHOS DE NOTIFICAÇÃO
    ========================================== */

    function sucesso(
        mensagem,
        titulo = "Tudo certo"
    ) {

        return notificar({

            tipo: "sucesso",
            titulo,
            mensagem

        });

    }


    function erro(
        mensagem,
        titulo =
            "Não foi possível concluir"
    ) {

        return notificar({

            tipo: "erro",
            titulo,
            mensagem,
            duracao: 5500

        });

    }


    function aviso(
        mensagem,
        titulo = "Atenção"
    ) {

        return notificar({

            tipo: "aviso",
            titulo,
            mensagem,
            duracao: 5000

        });

    }


    function info(
        mensagem,
        titulo = "SafeSchool"
    ) {

        return notificar({

            tipo: "info",
            titulo,
            mensagem

        });

    }


    /* =========================================
       CONFIRMAÇÃO
    ========================================== */

    function confirmar(
        opcoes = {}
    ) {

        injetarEstilos();


        return new Promise(
            function (resolver) {

                const titulo =
                    String(
                        opcoes.titulo ||
                        "Confirmar ação"
                    );


                const mensagem =
                    String(
                        opcoes.mensagem ||
                        "Deseja continuar?"
                    );


                const textoConfirmar =
                    String(
                        opcoes.textoConfirmar ||
                        "Confirmar"
                    );


                const textoCancelar =
                    String(
                        opcoes.textoCancelar ||
                        "Cancelar"
                    );


                const perigo =
                    opcoes.perigo === true;


                const fundo =
                    document.createElement("div");


                fundo.className =
                    "safeschool-modal-fundo";


                fundo.setAttribute(
                    "role",
                    "presentation"
                );


                const modal =
                    document.createElement("div");


                modal.className =
                    "safeschool-modal";


                modal.setAttribute(
                    "role",
                    "dialog"
                );


                modal.setAttribute(
                    "aria-modal",
                    "true"
                );


                const icone =
                    document.createElement("div");


                icone.className =
                    "safeschool-modal-icone";


                icone.textContent =
                    perigo
                        ? "!"
                        : "?";


                const tituloElemento =
                    document.createElement("h2");


                tituloElemento.textContent =
                    titulo;


                const mensagemElemento =
                    document.createElement("p");


                mensagemElemento.textContent =
                    mensagem;


                const acoes =
                    document.createElement("div");


                acoes.className =
                    "safeschool-modal-acoes";


                const cancelar =
                    document.createElement("button");


                cancelar.type =
                    "button";


                cancelar.className =
                    "safeschool-modal-cancelar";


                cancelar.textContent =
                    textoCancelar;


                const confirmarBotao =
                    document.createElement("button");


                confirmarBotao.type =
                    "button";


                confirmarBotao.className =
                    "safeschool-modal-confirmar";


                if (perigo) {

                    confirmarBotao
                        .classList
                        .add(
                            "perigo"
                        );

                }


                confirmarBotao.textContent =
                    textoConfirmar;


                acoes.appendChild(
                    cancelar
                );


                acoes.appendChild(
                    confirmarBotao
                );


                modal.appendChild(
                    icone
                );


                modal.appendChild(
                    tituloElemento
                );


                modal.appendChild(
                    mensagemElemento
                );


                modal.appendChild(
                    acoes
                );


                fundo.appendChild(
                    modal
                );


                document.body.appendChild(
                    fundo
                );


                const elementoAnterior =
                    document.activeElement;


                function finalizar(
                    resultado
                ) {

                    document.removeEventListener(
                        "keydown",
                        tratarTeclado
                    );


                    fundo.remove();


                    if (
                        elementoAnterior &&
                        typeof elementoAnterior.focus ===
                        "function"
                    ) {

                        elementoAnterior.focus();

                    }


                    resolver(
                        resultado
                    );

                }


                function tratarTeclado(
                    evento
                ) {

                    if (
                        evento.key ===
                        "Escape"
                    ) {

                        finalizar(
                            false
                        );

                    }

                }


                cancelar.addEventListener(
                    "click",
                    function () {

                        finalizar(
                            false
                        );

                    }
                );


                confirmarBotao.addEventListener(
                    "click",
                    function () {

                        finalizar(
                            true
                        );

                    }
                );


                fundo.addEventListener(
                    "click",
                    function (evento) {

                        if (
                            evento.target ===
                            fundo
                        ) {

                            finalizar(
                                false
                            );

                        }

                    }
                );


                document.addEventListener(
                    "keydown",
                    tratarTeclado
                );


                window.setTimeout(
                    function () {

                        confirmarBotao.focus();

                    },
                    20
                );

            }
        );

    }


    /* =========================================
       API GLOBAL
    ========================================== */

    window.SafeSchoolUI =
        Object.freeze({

            notificar,
            sucesso,
            erro,
            aviso,
            info,
            confirmar

        });


    /* =========================================
       PREPARAR
    ========================================== */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            injetarEstilos,
            {
                once: true
            }
        );

    }

    else {

        injetarEstilos();

    }


})();