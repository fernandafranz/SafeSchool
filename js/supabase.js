/* =========================================
   SAFESCHOOL — CONEXÃO COM O SUPABASE
========================================= */

(() => {

    "use strict";


    const SUPABASE_URL =
        "https://tcoemjmpoiwomfibpcvc.supabase.co";


    const SUPABASE_PUBLISHABLE_KEY =
        "sb_publishable_gMajkTfr7WYihWCo6OPQEw_SJo-Z_hN";


    /* =========================================
       CONFIGURAÇÃO PÚBLICA
    ========================================= */

    window.SafeSchoolSupabaseConfig =
        Object.freeze({

            url:
                SUPABASE_URL

        });


    /* =========================================
       CARREGAR BIBLIOTECA SUPABASE
    ========================================= */

    const bibliotecaSupabaseReady =
        import(
            "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm"
        );


    /* =========================================
       CLIENTE PRINCIPAL
       COM SESSÃO AUTENTICADA
    ========================================= */

    window.SafeSchoolSupabaseReady =
        (async () => {

            const {
                createClient
            } =
                await bibliotecaSupabaseReady;


            const supabase =
                createClient(

                    SUPABASE_URL,

                    SUPABASE_PUBLISHABLE_KEY,

                    {

                        auth: {

                            persistSession:
                                true,

                            autoRefreshToken:
                                true,

                            detectSessionInUrl:
                                true,

                            storageKey:
                                "safeschool-auth-session"

                        }

                    }

                );


            /* =========================================
               CLIENTE GLOBAL PRINCIPAL
            ========================================= */

            window.SafeSchoolSupabase =
                supabase;


            console.log(
                "SafeSchool: conexão principal com Supabase preparada."
            );


            return supabase;

        })()
        .catch(

            (erro) => {

                console.error(
                    "SafeSchool: não foi possível carregar o Supabase.",
                    erro
                );


                throw erro;

            }

        );


    /* =========================================
       CLIENTE ANÔNIMO ISOLADO

       Este cliente não reutiliza a sessão
       autenticada do aluno.

       Deve ser utilizado somente em fluxos
       realmente anônimos do SafeSchool.
    ========================================= */

    window.SafeSchoolSupabaseAnonReady =
        (async () => {

            const {
                createClient
            } =
                await bibliotecaSupabaseReady;


            const supabaseAnonimo =
                createClient(

                    SUPABASE_URL,

                    SUPABASE_PUBLISHABLE_KEY,

                    {

                        auth: {

                            persistSession:
                                false,

                            autoRefreshToken:
                                false,

                            detectSessionInUrl:
                                false

                        }

                    }

                );


            /* =========================================
               CLIENTE GLOBAL ANÔNIMO
            ========================================= */

            window.SafeSchoolSupabaseAnon =
                supabaseAnonimo;


            console.log(
                "SafeSchool: cliente anônimo isolado preparado."
            );


            return supabaseAnonimo;

        })()
        .catch(

            (erro) => {

                console.error(
                    "SafeSchool: não foi possível preparar o cliente anônimo.",
                    erro
                );


                throw erro;

            }

        );

})();