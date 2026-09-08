/* =========================================
   SAFESCHOOL
   RELATO IDENTIFICADO
========================================= */


/* =========================================
   PROTEGER ACESSO
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



/* =========================================
   MOSTRAR CONTA
========================================= */

const emailAluno =
    sessionStorage.getItem(
        "usuarioEmailSafeSchool"
    );


if (emailAluno) {


    contaAluno.textContent =
        emailAluno;


} else {


    contaAluno.textContent =
        "Conta não identificada";


}



/* =========================================
   RECUPERAR ESCOLA
========================================= */

function recuperarEscola() {


    if (
        window.SafeSchoolEscola
    ) {


        const escola =
            window.SafeSchoolEscola.identificar();


        if (escola) {


            return escola;


        }


    }



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



    return null;

}



/* =========================================
   ENVIAR RELATO
========================================= */

formulario.addEventListener(

    "submit",

    function (evento) {


        evento.preventDefault();



        const escola =
            recuperarEscola();



        if (!escola) {


            alert(
                "Não foi possível identificar a escola."
            );


            return;


        }



        const email =
            sessionStorage.getItem(
                "usuarioEmailSafeSchool"
            );



        if (!email) {


            alert(
                "Não foi possível identificar sua conta. Faça login novamente."
            );


            return;


        }



        const envolvimento =
            document.getElementById(
                "envolvimento"
            ).value;


        const tipo =
            document.getElementById(
                "tipo"
            ).value;


        const local =
            document.getElementById(
                "local"
            ).value;


        const data =
            document.getElementById(
                "dataOcorrencia"
            ).value;


        const relato =
            document
                .getElementById(
                    "relato"
                )
                .value
                .trim();


        const urgencia =
            document.getElementById(
                "urgencia"
            ).value;


        const confirmacao =
            document.getElementById(
                "confirmacao"
            ).checked;


        const campoEvidencia =
            document.getElementById(
                "evidencia"
            );



        /* =========================================
           VALIDAÇÕES
        ========================================== */

        if (!envolvimento) {


            alert(
                "Informe se a situação aconteceu com você ou se você a presenciou."
            );


            return;


        }



        if (!tipo) {


            alert(
                "Selecione o tipo de situação."
            );


            return;


        }



        if (!local) {


            alert(
                "Informe onde a situação aconteceu."
            );


            return;


        }



        if (!data) {


            alert(
                "Informe a data aproximada da ocorrência."
            );


            return;


        }



        if (
            relato.length < 20
        ) {


            alert(
                "Descreva a situação com pelo menos 20 caracteres."
            );


            document
                .getElementById(
                    "relato"
                )
                .focus();


            return;


        }



        if (!urgencia) {


            alert(
                "Informe como você considera a urgência da situação."
            );


            return;


        }



        if (!confirmacao) {


            alert(
                "Confirme que entende que este relato será identificado."
            );


            return;


        }



        /* =========================================
           EVIDÊNCIA
        ========================================== */

        let nomeEvidencia =
            "";


        if (
            campoEvidencia.files.length > 0
        ) {


            nomeEvidencia =
                campoEvidencia
                    .files[0]
                    .name;


        }



        /* =========================================
           PROTOCOLO
        ========================================== */

        const protocolo =
            gerarProtocolo(
                escola.codigo
            );



        /* =========================================
           RELATO IDENTIFICADO
        ========================================== */

        const novoRelato = {


            protocolo:
                protocolo,


            escolaCodigo:
                escola.codigo,


            escolaNome:
                escola.nome,


            origem:
                "relato-identificado",


            anonimo:
                false,


            autor:
                "Identificado",


            autorEmail:
                email,


            perfilAutor:
                "aluno",


            envolvimento:
                envolvimento,


            tipo:
                tipo,


            local:
                local,


            dataOcorrencia:
                data,


            relato:
                relato,


            urgencia:
                urgencia,


            evidencia:
                nomeEvidencia,


            status:
                "novo",


            historico:
                [],


            criadoEm:
                new Date().toISOString()


        };



        salvarRelato(
            novoRelato
        );



        /* =========================================
           RESULTADO
        ========================================== */

        protocoloRelato.textContent =
            protocolo;


        resultadoRelato.hidden =
            false;



        resultadoRelato.scrollIntoView({

            behavior:
                "smooth",

            block:
                "center"

        });



        formulario.reset();


    }

);



/* =========================================
   SALVAR NA MESMA BASE DOS CASOS
========================================= */

function salvarRelato(
    novoRelato
) {


    const dados =
        sessionStorage.getItem(
            "denunciasSafeSchool"
        );



    let denuncias =
        [];



    if (dados) {


        try {


            denuncias =
                JSON.parse(
                    dados
                );


        } catch (erro) {


            denuncias =
                [];


        }


    }



    if (
        !Array.isArray(
            denuncias
        )
    ) {


        denuncias =
            [];


    }



    denuncias.push(
        novoRelato
    );



    sessionStorage.setItem(

        "denunciasSafeSchool",

        JSON.stringify(
            denuncias
        )

    );


}



/* =========================================
   GERAR PROTOCOLO
========================================= */

function gerarProtocolo(
    codigoEscola
) {


    const agora =
        new Date();


    const ano =
        agora.getFullYear();


    const mes =
        String(
            agora.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    const dia =
        String(
            agora.getDate()
        ).padStart(
            2,
            "0"
        );


    const numeros =
        new Uint32Array(2);


    crypto.getRandomValues(
        numeros
    );


    const aleatorio =

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

        "ID-" +
        codigoEscola +
        "-" +
        ano +
        mes +
        dia +
        "-" +
        aleatorio

    );


}