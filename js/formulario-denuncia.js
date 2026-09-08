/* =========================================
   SAFESCHOOL
   FORMULÁRIO DE DENÚNCIA ANÔNIMA
========================================= */


const formulario =
    document.getElementById(
        "formularioDenuncia"
    );



/* =========================================
   ENVIO DO FORMULÁRIO
========================================= */

formulario.addEventListener(

    "submit",

    function (evento) {


        /* =========================================
           IMPEDIR RECARREGAMENTO
        ========================================== */

        evento.preventDefault();



        /* =========================================
           IDENTIFICAR A ESCOLA
        ========================================== */

        const escola =
            window.SafeSchoolEscola.obter();



        /*
           Toda denúncia precisa estar
           vinculada a uma instituição.

           Isso NÃO identifica o denunciante.
        */

        if (!escola) {


            alert(
                "Não foi possível identificar a escola. Acesse o SafeSchool pelo link ou QR Code fornecido pela instituição."
            );


            return;


        }



        /* =========================================
           RECUPERAR CAMPOS
        ========================================== */

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
                "data"
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


        const evidencia =
            document.getElementById(
                "evidencia"
            );



        /* =========================================
           VALIDAÇÃO DO TIPO
        ========================================== */

        if (tipo === "") {


            alert(
                "Por favor, selecione o tipo de situação."
            );


            document
                .getElementById(
                    "tipo"
                )
                .focus();


            return;


        }



        /* =========================================
           VALIDAÇÃO DO LOCAL
        ========================================== */

        if (local === "") {


            alert(
                "Por favor, informe onde a situação aconteceu."
            );


            document
                .getElementById(
                    "local"
                )
                .focus();


            return;


        }



        /* =========================================
           VALIDAÇÃO DA DATA
        ========================================== */

        if (data === "") {


            alert(
                "Por favor, informe quando a situação aconteceu."
            );


            document
                .getElementById(
                    "data"
                )
                .focus();


            return;


        }



        /* =========================================
           VALIDAÇÃO DO RELATO
        ========================================== */

        if (relato === "") {


            alert(
                "Por favor, escreva um breve relato sobre o que aconteceu."
            );


            document
                .getElementById(
                    "relato"
                )
                .focus();


            return;


        }



        /* =========================================
           TAMANHO MÍNIMO
        ========================================== */

        if (relato.length < 20) {


            alert(
                "Conte um pouco mais sobre o que aconteceu. O relato deve ter pelo menos 20 caracteres."
            );


            document
                .getElementById(
                    "relato"
                )
                .focus();


            return;


        }



        /* =========================================
           URGÊNCIA
        ========================================== */

        if (urgencia === "") {


            alert(
                "Por favor, indique como você considera essa situação."
            );


            document
                .getElementById(
                    "urgencia"
                )
                .focus();


            return;


        }



        /* =========================================
           CONFIRMAÇÃO
        ========================================== */

        if (!confirmacao) {


            alert(
                "Para continuar, confirme que as informações correspondem ao que você viveu ou presenciou."
            );


            return;


        }



        /* =========================================
           GERAR PROTOCOLO
        ========================================== */

        const protocolo =
            gerarProtocolo(
                escola.codigo
            );



        /* =========================================
           NOME DO ARQUIVO DE EVIDÊNCIA
        ========================================== */

        let nomeEvidencia =
            "";


        /*
           Nesta versão demonstrativa,
           o arquivo em si NÃO é armazenado.

           Guardamos apenas o nome,
           caso exista.
        */

        if (
            evidencia &&
            evidencia.files &&
            evidencia.files.length > 0
        ) {


            nomeEvidencia =
                evidencia.files[0].name;


        }



        /* =========================================
           CRIAR REGISTRO DA DENÚNCIA
        ========================================== */

        const novaDenuncia = {


            protocolo:
                protocolo,


            escolaCodigo:
                escola.codigo,


            escolaNome:
                escola.nome,


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


            autor:
                "Anônimo",


            status:
                "novo",


            criadoEm:
                new Date().toISOString()


        };



        /* =========================================
           SALVAR DENÚNCIA
        ========================================== */

        salvarDenuncia(
            novaDenuncia
        );



        /* =========================================
           DADOS DA TELA DE SUCESSO
        ========================================== */

        sessionStorage.setItem(

            "protocoloSafeSchool",

            protocolo

        );


        sessionStorage.setItem(

            "codigoEscolaDenuncia",

            escola.codigo

        );


        sessionStorage.setItem(

            "nomeEscolaDenuncia",

            escola.nome

        );



        /* =========================================
           REDIRECIONAR
        ========================================== */

        window.location.href =
            "sucesso-denuncia.html";


    }

);



/* =========================================
   SALVAR DENÚNCIA NA SESSÃO
========================================= */

function salvarDenuncia(
    denuncia
) {


    /*
       Recuperamos denúncias
       já existentes.
    */

    const dadosSalvos =
        sessionStorage.getItem(
            "denunciasSafeSchool"
        );



    let denuncias = [];



    if (dadosSalvos) {


        try {


            denuncias =
                JSON.parse(
                    dadosSalvos
                );


        } catch (erro) {


            denuncias = [];


        }


    }



    /*
       Garantimos que seja
       realmente uma lista.
    */

    if (
        !Array.isArray(
            denuncias
        )
    ) {


        denuncias = [];


    }



    /*
       Adicionamos a nova denúncia.
    */

    denuncias.push(
        denuncia
    );



    /*
       Salvamos novamente.
    */

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



    /* =========================================
       CÓDIGO ALEATÓRIO
    ========================================== */

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



    /* =========================================
       PROTOCOLO FINAL
    ========================================== */

    return (

        "SS-" +

        codigoEscola +

        "-" +

        ano +

        mes +

        dia +

        "-" +

        codigoAleatorio

    );

}