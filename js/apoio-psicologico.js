/* =========================================
   SAFESCHOOL
   APOIO PSICOLÓGICO
========================================= */


/* =========================================
   VERIFICAR PERFIL
========================================= */

const perfilAtual =
    sessionStorage.getItem(
        "perfilSafeSchool"
    );


if (
    perfilAtual !== "aluno"
) {


    window.location.href =
        "login.html?acesso=restrito";


}



/* =========================================
   ELEMENTOS
========================================= */

const opcoesApoio =
    document.querySelectorAll(
        ".opcao-apoio"
    );


const tipoApoio =
    document.getElementById(
        "tipoApoio"
    );


const formularioApoio =
    document.getElementById(
        "formularioApoio"
    );


const resultadoApoio =
    document.getElementById(
        "resultadoApoio"
    );


const protocoloApoio =
    document.getElementById(
        "protocoloApoio"
    );



/* =========================================
   RECUPERAR ESCOLA DE FORMA SEGURA
========================================= */

function recuperarEscolaAtual() {


    /*
       Primeira tentativa:
       usar o sistema central do SafeSchool.
    */

    if (
        window.SafeSchoolEscola
    ) {


        const escola =

            window.SafeSchoolEscola.identificar();



        if (escola) {


            return escola;


        }


    }



    /*
       Segunda tentativa:
       recuperar diretamente da sessão.
    */

    const codigo =

        sessionStorage.getItem(
            "codigoEscolaSafeSchool"
        );


    const nome =

        sessionStorage.getItem(
            "nomeEscolaSafeSchool"
        );



    if (
        codigo &&
        nome
    ) {


        return {

            codigo:
                codigo,

            nome:
                nome

        };


    }



    /*
       Nenhuma escola encontrada.
    */

    return null;

}



/* =========================================
   SELECIONAR TIPO
========================================= */

opcoesApoio.forEach(

    function (opcao) {


        opcao.addEventListener(

            "click",

            function () {


                opcoesApoio.forEach(

                    function (item) {


                        item.classList.remove(
                            "ativo"
                        );


                    }

                );



                opcao.classList.add(
                    "ativo"
                );



                tipoApoio.value =

                    opcao.getAttribute(
                        "data-tipo"
                    );


            }

        );


    }

);



/* =========================================
   ENVIAR SOLICITAÇÃO
========================================= */

formularioApoio.addEventListener(

    "submit",

    function (evento) {


        evento.preventDefault();



        /* =========================================
           ESCOLA
        ========================================== */

        const escola =
            recuperarEscolaAtual();



        if (!escola) {


            alert(
                "Não foi possível identificar a escola. Volte ao início e entre pelo link da instituição."
            );


            return;


        }



        /* =========================================
           ALUNO IDENTIFICADO
        ========================================== */

        const emailAluno =

            sessionStorage.getItem(
                "usuarioEmailSafeSchool"
            );



        /*
           O apoio psicológico é um recurso
           identificado.

           Ele é separado da denúncia anônima.
        */

        if (!emailAluno) {


            alert(
                "Não foi possível identificar sua conta. Faça login novamente para solicitar apoio."
            );


            return;


        }



        /* =========================================
           CAMPOS
        ========================================== */

        const tipo =
            tipoApoio.value;


        const periodo =
            document.getElementById(
                "periodo"
            ).value;


        const mensagem =
            document
                .getElementById(
                    "mensagem"
                )
                .value
                .trim();


        const confirmacao =
            document.getElementById(
                "confirmacaoApoio"
            ).checked;



        /* =========================================
           VALIDAÇÕES
        ========================================== */

        if (
            tipo === ""
        ) {


            alert(
                "Escolha como você gostaria de receber apoio."
            );


            return;


        }



        if (
            periodo === ""
        ) {


            alert(
                "Informe qual período seria melhor para você."
            );


            document
                .getElementById(
                    "periodo"
                )
                .focus();


            return;


        }



        if (
            !confirmacao
        ) {


            alert(
                "Confirme que deseja solicitar contato da equipe de apoio."
            );


            return;


        }



        /* =========================================
           PROTOCOLO
        ========================================== */

        const protocolo =
            gerarProtocoloApoio(
                escola.codigo
            );



        /* =========================================
           CRIAR SOLICITAÇÃO
        ========================================== */

        const solicitacao = {


            protocolo:
                protocolo,


            escolaCodigo:
                escola.codigo,


            escolaNome:
                escola.nome,


            perfil:
                "aluno",


            contatoAluno:
                emailAluno,


            tipo:
                tipo,


            periodo:
                periodo,


            mensagem:
                mensagem,


            status:
                "solicitado",


            origem:
                "solicitacao-aluno",


            criadoEm:
                new Date().toISOString()


        };



        /* =========================================
           SALVAR
        ========================================== */

        salvarSolicitacao(
            solicitacao
        );



        /* =========================================
           RESULTADO
        ========================================== */

        protocoloApoio.textContent =
            protocolo;


        resultadoApoio.hidden =
            false;



        resultadoApoio.scrollIntoView({

            behavior:
                "smooth",

            block:
                "center"

        });



        /* =========================================
           LIMPAR FORMULÁRIO
        ========================================== */

        formularioApoio.reset();


        tipoApoio.value =
            "";


        opcoesApoio.forEach(

            function (item) {


                item.classList.remove(
                    "ativo"
                );


            }

        );


    }

);



/* =========================================
   SALVAR SOLICITAÇÃO
========================================= */

function salvarSolicitacao(
    solicitacao
) {


    const dados =

        sessionStorage.getItem(
            "solicitacoesPsicologicasSafeSchool"
        );



    let solicitacoes =
        [];



    if (dados) {


        try {


            solicitacoes =
                JSON.parse(
                    dados
                );


        } catch (erro) {


            solicitacoes =
                [];


        }


    }



    if (
        !Array.isArray(
            solicitacoes
        )
    ) {


        solicitacoes =
            [];


    }



    solicitacoes.push(
        solicitacao
    );



    sessionStorage.setItem(

        "solicitacoesPsicologicasSafeSchool",

        JSON.stringify(
            solicitacoes
        )

    );


}



/* =========================================
   GERAR PROTOCOLO
========================================= */

function gerarProtocoloApoio(
    codigoEscola
) {


    const agora =
        new Date();



    const ano =
        agora.getFullYear();



    const mes =
        String(
            agora.getMonth() + 1
        )
        .padStart(
            2,
            "0"
        );



    const dia =
        String(
            agora.getDate()
        )
        .padStart(
            2,
            "0"
        );



    const numeros =
        new Uint32Array(2);


    crypto.getRandomValues(
        numeros
    );



    const codigoAleatorio =

        (
            numeros[0].toString(16) +
            numeros[1].toString(16)
        )

        .toUpperCase()

        .substring(
            0,
            6
        );



    return (

        "APOIO-" +

        codigoEscola +

        "-" +

        ano +

        mes +

        dia +

        "-" +

        codigoAleatorio

    );


}