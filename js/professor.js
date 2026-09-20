/* =========================================
SAFESCHOOL
RELATOS REAIS — PAINEL DO PROFESSOR
========================================= */
(function () {
"use strict";
/* =========================================
ELEMENTOS PRINCIPAIS
========================================== */
const listaRelatos =
document.getElementById("listaRelatos");
const semRelatos =
document.getElementById("semRelatos");
const totalRelatos =
document.getElementById("totalRelatos");
const numeroNovos =
document.getElementById("numeroNovos");
const numeroAltaPrioridade =
document.getElementById("numeroAltaPrioridade");
const numeroAcompanhamento =
document.getElementById("numeroAcompanhamento");
const numeroConcluidos =
document.getElementById("numeroConcluidos");
/* =========================================
ESTADO
========================================== */
let supabase = null;
let usuarioAtual = null;
let perfilAtual = null;
let escolaAtual = null;
let relatosReais = [];
let filtroAtual = "todos";
let buscaAtual = "";
/* =========================================
INTERFACE
========================================== */
async function prepararInterface() {
if (window.SafeSchoolInterfaceReady) {
try {
await window.SafeSchoolInterfaceReady;
} catch (erro) {
console.warn(
"SafeSchool: interface global indisponível.",
erro
);
}
}
}
function mostrarErro(
mensagem,
titulo = "Não foi possível concluir"
) {
if (
window.SafeSchoolUI &&
typeof window.SafeSchoolUI.erro === "function"
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
function mostrarSucesso(
mensagem,
titulo = "Tudo certo"
) {
if (
window.SafeSchoolUI &&
typeof window.SafeSchoolUI.sucesso === "function"
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
function mostrarAviso(
mensagem,
titulo = "Atenção"
) {
if (
window.SafeSchoolUI &&
typeof window.SafeSchoolUI.aviso === "function"
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
async function solicitarConfirmacao(
opcoes
) {
if (
window.SafeSchoolUI &&
typeof window.SafeSchoolUI.confirmar === "function"
) {
return await window.SafeSchoolUI.confirmar(
opcoes
);
}
return window.confirm(
opcoes.mensagem ||
"Deseja continuar?"
);
}
/* =========================================
ESTILOS
========================================== */
function configurarEstilosAcompanhamentoReal() {
if (
document.getElementById(
"estilosAcompanhamentoRealSafeSchool"
)
) {
return;
}
const estilo =
document.createElement("style");
estilo.id =
"estilosAcompanhamentoRealSafeSchool";
estilo.textContent = `
.registro-acao-real,
.conclusao-acompanhamento-real,
.encaminhamento-psicologia-real {
margin-top: 20px;
padding: 18px;
border: 1px solid #e5def7;
border-radius: 14px;
background:
linear-gradient(
135deg,
#f8f5ff,
#ffffff
);
}
.registro-acao-real strong,
.conclusao-acompanhamento-real strong,
.encaminhamento-psicologia-real strong {
display: block;
margin-bottom: 7px;
color: #4f35b8;
font-size: 15px;
line-height: 1.4;
}
.registro-acao-real > p,
.conclusao-acompanhamento-real > p,
.encaminhamento-psicologia-real > p {
margin: 0 0 13px;
color: #625d72;
font-size: 14px;
line-height: 1.6;
}
.registro-acao-real textarea,
.conclusao-acompanhamento-real textarea,
.encaminhamento-psicologia-real textarea {
width: 100%;
min-height: 100px;
padding: 12px 13px;
resize: vertical;
border: 1px solid #dcd7ef;
border-radius: 10px;
background: #ffffff;
color: #433b55;
font-family: inherit;
font-size: 15px;
line-height: 1.55;
outline: none;
box-sizing: border-box;
}
.registro-acao-real textarea:focus,
.conclusao-acompanhamento-real textarea:focus,
.encaminhamento-psicologia-real textarea:focus {
border-color: #6c4ce5;
box-shadow:
0 0 0 3px
rgba(108, 76, 229, 0.08);
}
.registro-acao-contador,
.conclusao-acompanhamento-contador,
.encaminhamento-psicologia-contador {
display: block;
margin-top: 6px;
color: #777185;
font-size: 13px;
line-height: 1.5;
text-align: right;
}
.botao-registrar-acao-real {
margin-top: 12px;
min-height: 46px;
padding: 12px 20px;
border: none;
border-radius: 10px;
background: #4f35b8;
color: #ffffff;
font-family: inherit;
font-size: 15px;
font-weight: 600;
line-height: 1.3;
cursor: pointer;
}
.botao-registrar-acao-real:hover:not(:disabled) {
background: #402c98;
}
.botao-concluir-acompanhamento-real,
.botao-encaminhar-psicologia-real {
margin-top: 12px;
min-height: 46px;
padding: 12px 20px;
border: 1px solid #d6ccec;
border-radius: 10px;
background: #ffffff;
color: #4f35b8;
font-family: inherit;
font-size: 15px !important;
font-weight: 600 !important;
line-height: 1.3;
cursor: pointer;
transition:
background-color 0.15s ease,
border-color 0.15s ease,
color 0.15s ease;
}
.botao-concluir-acompanhamento-real:hover:not(:disabled),
.botao-encaminhar-psicologia-real:hover:not(:disabled) {
background: #f5f1ff;
border-color: #bcaee0;
color: #402c98;
}
.botao-registrar-acao-real:disabled,
.botao-concluir-acompanhamento-real:disabled,
.botao-encaminhar-psicologia-real:disabled {
opacity: 0.55;
cursor: not-allowed;
}
.aviso-conclusao-real,
.aviso-anonimato-psicologia-real {
margin-top: 12px !important;
padding: 11px 12px;
border-radius: 9px;
background: #f5f2fa;
color: #625d72 !important;
font-size: 13px !important;
line-height: 1.55 !important;
}
.encaminhamento-psicologia-existente {
margin-top: 20px;
padding: 18px;
border: 1px solid #ded5f3;
border-radius: 14px;
background: #faf8ff;
}
.encaminhamento-psicologia-existente strong {
display: block;
margin-bottom: 9px;
color: #4f35b8;
font-size: 15px;
}
.encaminhamento-psicologia-status {
display: inline-flex;
align-items: center;
margin-bottom: 10px;
padding: 6px 10px;
border-radius: 999px;
background: #ede8fb;
color: #4f35b8;
font-size: 13px;
font-weight: 600;
}
.encaminhamento-psicologia-existente p {
margin: 5px 0;
color: #625d72;
font-size: 14px;
line-height: 1.55;
}
.destaque-busca-enter-professor {
outline:
3px solid
rgba(79, 53, 184, 0.22);
outline-offset:
4px;
box-shadow:
0 12px 30px
rgba(79, 53, 184, 0.16) !important;
transition:
outline 0.2s ease,
box-shadow 0.2s ease;
}
@media (max-width: 600px) {
.botao-registrar-acao-real,
.botao-concluir-acompanhamento-real,
.botao-encaminhar-psicologia-real {
width: 100%;
min-height: 48px;
}
}
`;
document.head.appendChild(
estilo
);
}
/* =========================================
ESTRUTURA VISUAL AUTOSSUFICIENTE
========================================== */
function injetarEstilosComplementares() {
if (
document.getElementById(
"estilosProfessorSafeSchool"
)
) {
return;
}
const estilo =
document.createElement(
"style"
);
estilo.id =
"estilosProfessorSafeSchool";
estilo.textContent = `
/* =====================================
TRIAGEM ASSISTIDA
====================================== */
.painel-triagem {
margin-bottom: 24px;
padding: 22px;
border-radius: 18px;
background:
linear-gradient(
135deg,
#ffffff,
#f5f2ff
);
border:
1px solid
#e7e1fb;
}
.painel-triagem-topo {
display: flex;
justify-content: space-between;
align-items: flex-start;
gap: 24px;
margin-bottom: 18px;
}
.painel-triagem-topo span {
display: block;
margin-bottom: 5px;
color: #6c4ce5;
font-size: 9px;
font-weight: bold;
letter-spacing: 1px;
}
.painel-triagem-topo h3 {
margin: 0;
color: #20205f;
font-size: 19px;
}
.painel-triagem-topo p {
max-width: 500px;
margin: 0;
color: #77738e;
font-size: 10px;
line-height: 1.6;
}
.cards-triagem {
display: grid;
grid-template-columns:
repeat(3, minmax(0, 1fr));
gap: 12px;
}
.card-triagem {
padding: 17px;
border-radius: 14px;
text-align: left;
cursor: pointer;
transition: 0.15s;
}
.card-triagem:hover {
transform:
translateY(-2px);
}
.card-triagem strong {
display: block;
margin-bottom: 5px;
font-size: 28px;
}
.card-triagem b {
display: block;
margin-bottom: 6px;
color: #20205f;
font-size: 11px;
}
.card-triagem small {
color: #77738e;
font-size: 9px;
line-height: 1.45;
}
.card-triagem.forte {
background: #fff0f2;
border: 1px solid #efccd3;
color: #c8445a;
}
.card-triagem.moderada {
background: #fff8df;
border: 1px solid #eadca6;
color: #9a721a;
}
.card-triagem.regular {
background: #ecf9f1;
border: 1px solid #ccebd9;
color: #31825b;
}
.aviso-triagem {
margin-top: 14px;
padding: 12px;
border-radius: 10px;
background:
rgba(
108,
76,
229,
0.06
);
color: #68637b;
font-size: 9px;
line-height: 1.55;
}
/* =====================================
TRIAGEM DENTRO DO ACOMPANHAMENTO
====================================== */
.triagem-caso {
margin: 15px 0;
padding: 15px 17px;
border-radius: 13px;
}
.triagem-caso.forte {
background: #fff0f2;
border: 1px solid #efccd3;
}
.triagem-caso.moderada {
background: #fff8df;
border: 1px solid #eadca6;
}
.triagem-caso.regular {
background: #ecf9f1;
border: 1px solid #ccebd9;
}
.triagem-caso.encerrada {
background: #f5f5f8;
border: 1px solid #e4e4e9;
}
.triagem-caso-topo {
display: flex;
align-items: center;
justify-content: space-between;
gap: 12px;
margin-bottom: 7px;
}
.triagem-caso-topo strong {
color: #20205f;
font-size: 11px;
}
.triagem-etiqueta {
padding: 5px 9px;
border-radius: 20px;
background: #ffffff;
font-size: 9px;
font-weight: bold;
}
.triagem-caso p {
margin: 0;
color: #68637b;
font-size: 9px;
line-height: 1.55;
}
.triagem-motivos {
margin-top: 8px !important;
font-weight: bold;
}
/* =====================================
PRAZOS
====================================== */
.painel-prazos {
margin-bottom: 24px;
padding: 22px;
border-radius: 18px;
background: #ffffff;
border: 1px solid #eceaf4;
}
.painel-prazos-topo {
display: flex;
justify-content: space-between;
align-items: flex-start;
gap: 20px;
margin-bottom: 17px;
}
.painel-prazos-topo span {
display: block;
margin-bottom: 4px;
color: #6c4ce5;
font-size: 9px;
font-weight: bold;
letter-spacing: 1px;
}
.painel-prazos-topo h3 {
margin: 0;
color: #20205f;
font-size: 18px;
}
.painel-prazos-topo p {
max-width: 470px;
margin: 0;
color: #77738e;
font-size: 10px;
line-height: 1.5;
}
.cards-prazos {
display: grid;
grid-template-columns:
repeat(4, minmax(0, 1fr));
gap: 12px;
}
.card-prazo-alerta {
padding: 16px;
border-radius: 13px;
text-align: left;
cursor: pointer;
transition: 0.15s;
}
.card-prazo-alerta:hover {
transform:
translateY(-2px);
}
.card-prazo-alerta strong {
display: block;
margin-bottom: 4px;
font-size: 27px;
}
.card-prazo-alerta b {
display: block;
margin-bottom: 5px;
color: #20205f;
font-size: 11px;
}
.card-prazo-alerta small {
color: #77738e;
font-size: 9px;
line-height: 1.4;
}
.card-prazo-alerta.vencido {
border: 1px solid #f0cbd2;
background: #fff0f2;
color: #c8445a;
}
.card-prazo-alerta.hoje {
border: 1px solid #f0d9bb;
background: #fff5e8;
color: #bc6a18;
}
.card-prazo-alerta.proximo {
border: 1px solid #ecdfae;
background: #fff9e2;
color: #9a721a;
}
.card-prazo-alerta.sem-prazo {
border: 1px solid #e2e2e9;
background: #f7f7fa;
color: #77738e;
}
/* =====================================
FILTROS
====================================== */
.area-filtros-relatos {
margin-bottom: 24px;
padding: 20px;
border-radius: 16px;
background: #ffffff;
border: 1px solid #eceaf4;
}
.topo-filtros-relatos {
display: flex;
align-items: center;
justify-content: space-between;
gap: 15px;
margin-bottom: 15px;
}
.topo-filtros-relatos h3 {
margin: 0;
color: #20205f;
font-size: 15px;
}
.resultado-filtros {
color: #77738e;
font-size: 10px;
}
.busca-relatos {
display: flex;
gap: 9px;
margin-bottom: 14px;
}
.busca-relatos input {
flex: 1;
padding: 12px 14px;
border: 1px solid #dedbea;
border-radius: 10px;
outline: none;
font-size: 11px;
}
.busca-relatos input:focus {
border-color: #6c4ce5;
}
.botao-limpar-busca {
padding: 10px 14px;
border: 1px solid #dcd7ef;
border-radius: 9px;
background: #ffffff;
color: #6c4ce5;
font-size: 10px;
font-weight: bold;
cursor: pointer;
}
.filtros-botoes {
display: flex;
flex-wrap: wrap;
gap: 8px;
}
.filtro-relato {
padding: 9px 12px;
border: 1px solid #e1ddef;
border-radius: 20px;
background: #ffffff;
color: #625e78;
font-size: 10px;
font-weight: bold;
cursor: pointer;
}
.filtro-relato:hover {
border-color: #6c4ce5;
color: #6c4ce5;
}
.filtro-relato.ativo {
background: #6c4ce5;
border-color: #6c4ce5;
color: #ffffff;
}
.sem-resultados-filtro {
display: none;
margin-bottom: 20px;
padding: 25px;
border-radius: 14px;
background: #ffffff;
border: 1px dashed #d9d5e8;
text-align: center;
color: #77738e;
}
.sem-resultados-filtro strong {
display: block;
margin-bottom: 6px;
color: #20205f;
font-size: 13px;
}
.sem-resultados-filtro p {
font-size: 10px;
line-height: 1.5;
}
/* =====================================
IDENTIFICAÇÃO
====================================== */
.identificacao-relato {
margin: 14px 0;
padding: 14px 16px;
border-radius: 12px;
display: flex;
flex-wrap: wrap;
gap: 10px 20px;
align-items: center;
}
.identificacao-relato.identificado {
background: #f0f6ff;
border: 1px solid #d6e5f8;
}
.identificacao-relato.anonimo {
background: #f7f7fb;
border: 1px solid #e7e7ef;
}
.tipo-identificacao {
font-size: 11px;
font-weight: bold;
color: #20205f;
}
.dado-identificacao {
font-size: 10px;
color: #6f6f8d;
}
/* =====================================
GESTÃO
====================================== */
.gestao-caso {
margin: 16px 0;
padding: 18px;
border-radius: 14px;
background: #faf9ff;
border: 1px solid #ebe7fa;
}
.gestao-caso-topo {
display: flex;
align-items: center;
justify-content: space-between;
gap: 12px;
margin-bottom: 15px;
}
.gestao-caso-topo h4 {
margin: 0;
color: #20205f;
font-size: 13px;
}
.situacao-prazo {
padding: 6px 10px;
border-radius: 20px;
font-size: 9px;
font-weight: bold;
}
.situacao-prazo.sem-prazo {
background: #f1f1f5;
color: #77738e;
}
.situacao-prazo.normal {
background: #ecf9f1;
color: #31825b;
}
.situacao-prazo.proximo {
background: #fff8df;
color: #9a721a;
}
.situacao-prazo.hoje {
background: #fff0df;
color: #bb6b19;
}
.situacao-prazo.vencido {
background: #fff0f2;
color: #c8445a;
}
.situacao-prazo.encerrado {
background: #ecf9f1;
color: #31825b;
}
.gestao-resumo {
display: grid;
grid-template-columns:
repeat(2, minmax(0, 1fr));
gap: 12px;
margin-bottom: 15px;
}
.gestao-info {
padding: 12px;
border-radius: 10px;
background: #ffffff;
border: 1px solid #ece9f5;
}
.gestao-info small {
display: block;
margin-bottom: 5px;
color: #88839a;
font-size: 9px;
}
.gestao-info strong {
color: #20205f;
font-size: 11px;
}
.gestao-edicao {
display: grid;
grid-template-columns:
1fr
1fr
auto;
gap: 10px;
align-items: end;
}
.campo-gestao {
display: flex;
flex-direction: column;
gap: 6px;
}
.campo-gestao label {
color: #59556e;
font-size: 9px;
font-weight: bold;
}
.campo-gestao select,
.campo-gestao input {
width: 100%;
padding: 10px;
border: 1px solid #dad6e9;
border-radius: 9px;
background: #ffffff;
font-size: 10px;
}
.botao-salvar-gestao {
height: 37px;
padding: 0 15px;
border: none;
border-radius: 9px;
background: #6c4ce5;
color: #ffffff;
font-size: 10px;
font-weight: bold;
cursor: pointer;
}
.gestao-encerrada {
padding: 11px;
border-radius: 9px;
background: #f3f3f7;
color: #77738e;
font-size: 9px;
}
/* =====================================
HISTÓRICO
====================================== */
.historico-caso {
margin-top: 20px;
padding-top: 18px;
border-top: 1px solid #e6e3f0;
}
.historico-caso h4 {
margin-bottom: 5px;
color: #20205f;
font-size: 14px;
}
.historico-subtitulo {
color: #77738e;
font-size: 11px;
margin-bottom: 16px;
}
.linha-tempo {
display: flex;
flex-direction: column;
gap: 12px;
margin-bottom: 18px;
}
.evento-historico {
position: relative;
padding: 14px 16px 14px 42px;
border-radius: 12px;
background: #faf9ff;
border: 1px solid #eeeaff;
}
.evento-historico::before {
content: "";
position: absolute;
left: 17px;
top: 19px;
width: 10px;
height: 10px;
border-radius: 50%;
background: #6c4ce5;
}
.evento-historico strong {
display: block;
color: #20205f;
font-size: 12px;
}
.evento-historico p {
margin-top: 4px;
color: #6f6f8d;
font-size: 11px;
line-height: 1.55;
}
.evento-historico small {
display: block;
margin-top: 6px;
color: #9995aa;
font-size: 9px;
}
.registro-acao {
margin-top: 18px;
padding: 18px;
border-radius: 14px;
background: #f5f2ff;
}
.registro-acao strong {
display: block;
margin-bottom: 12px;
color: #4f35b8;
font-size: 12px;
}
.campos-acao {
display: grid;
grid-template-columns:
minmax(180px, 0.7fr)
1.3fr;
gap: 10px;
}
.campos-acao select,
.campos-acao input {
width: 100%;
padding: 11px;
border: 1px solid #dcd7ef;
border-radius: 9px;
background: #ffffff;
font-size: 11px;
}
.registro-acao-aviso {
margin-top: 8px;
color: #77738e;
font-size: 9px;
}
.botao-registrar-acao {
margin-top: 12px;
padding: 10px 14px;
border: none;
border-radius: 9px;
background: #6c4ce5;
color: #ffffff;
font-size: 11px;
font-weight: bold;
cursor: pointer;
}
.historico-bloqueado {
margin-top: 15px;
padding: 12px;
border-radius: 10px;
background: #f8f8fb;
color: #77738e;
font-size: 10px;
}
.registro-encerramento {
margin-top: 15px;
padding: 14px;
border-radius: 11px;
background: #ecf9f1;
border: 1px solid #ccebd9;
}
.registro-encerramento strong {
color: #31825b;
font-size: 11px;
}
.registro-encerramento p {
margin-top: 5px;
color: #557262;
font-size: 10px;
}
/* =====================================
RESPONSIVIDADE
====================================== */
@media (max-width: 950px) {
.cards-triagem {
grid-template-columns: 1fr;
}
.cards-prazos {
grid-template-columns:
repeat(2, 1fr);
}
}
@media (max-width: 800px) {
.gestao-edicao {
grid-template-columns: 1fr;
}
}
@media (max-width: 650px) {
.painel-triagem-topo,
.painel-prazos-topo {
flex-direction: column;
}
.cards-prazos {
grid-template-columns: 1fr;
}
.gestao-resumo {
grid-template-columns: 1fr;
}
.campos-acao {
grid-template-columns: 1fr;
}
.busca-relatos {
flex-direction: column;
}
}
`;
document.head.appendChild(
estilo
);
}
/* =========================================
ÁREA DE FILTROS
========================================= */
function criarAreaFiltros() {
if (
document.getElementById(
"areaFiltrosProfessor"
)
) {
return;
}
if (
!listaRelatos
) {
return;
}
const area =
document.createElement(
"div"
);
area.id =
"areaFiltrosProfessor";
area.className =
"area-filtros-relatos";
area.innerHTML = `
<div class="topo-filtros-relatos">
<h3>
🔎 Localizar e filtrar casos
</h3>
<span
class="resultado-filtros"
id="resultadoFiltrosProfessor"
>
0 relatos
</span>
</div>
<div class="busca-relatos">
<input
type="search"
id="buscaRelatosProfessor"
placeholder="Buscar protocolo, tipo, relato, responsável ou aluno..."
autocomplete="off"
>
<button
type="button"
class="botao-limpar-busca"
id="limparBuscaProfessor"
>
Limpar
</button>
</div>
<div class="filtros-botoes">
<button
type="button"
class="filtro-relato ativo"
data-filtro-relato="todos"
>
Todos
</button>
<button
type="button"
class="filtro-relato"
data-filtro-relato="novos"
>
Novos
</button>
<button
type="button"
class="filtro-relato"
data-filtro-relato="acompanhamento"
>
Em acompanhamento
</button>
<button
type="button"
class="filtro-relato"
data-filtro-relato="concluidos"
>
Concluídos
</button>
<button
type="button"
class="filtro-relato"
data-filtro-relato="alta"
>
⚠️ Alta prioridade
</button>
<button
type="button"
class="filtro-relato"
data-filtro-relato="anonimos"
>
🔒 Anônimos
</button>
<button
type="button"
class="filtro-relato"
data-filtro-relato="identificados"
>
👤 Identificados
</button>
<button
type="button"
class="filtro-relato"
data-filtro-relato="triagemforte"
>
🔴 Sinais fortes
</button>
<button
type="button"
class="filtro-relato"
data-filtro-relato="triagemmoderada"
>
🟡 Sinais moderados
</button>
<button
type="button"
class="filtro-relato"
data-filtro-relato="prazovencido"
>
🔴 Prazo vencido
</button>
<button
type="button"
class="filtro-relato"
data-filtro-relato="prazohoje"
>
🟠 Vence hoje
</button>
<button
type="button"
class="filtro-relato"
data-filtro-relato="prazoproximo"
>
🟡 Prazo próximo
</button>
<button
type="button"
class="filtro-relato"
data-filtro-relato="semprazo"
>
⚪ Sem prazo
</button>
</div>
`;
listaRelatos.parentNode.insertBefore(
area,
listaRelatos
);
const vazio =
document.createElement(
"div"
);
vazio.id =
"semResultadosFiltroProfessor";
vazio.className =
"sem-resultados-filtro";
vazio.innerHTML = `
<strong>
Nenhum relato encontrado
</strong>
<p>
Não existem casos que correspondam
aos filtros ou à busca informada.
</p>
`;
listaRelatos.parentNode.insertBefore(
vazio,
listaRelatos
);
}
/* =========================================
PAINEL DE PRAZOS
========================================= */
function criarPainelPrazos() {
if (
document.getElementById(
"painelPrazosProfessor"
)
) {
return;
}
const filtros =
document.getElementById(
"areaFiltrosProfessor"
);
if (
!filtros
) {
return;
}
const painel =
document.createElement(
"div"
);
painel.id =
"painelPrazosProfessor";
painel.className =
"painel-prazos";
painel.innerHTML = `
<div class="painel-prazos-topo">
<div>
<span>
ACOMPANHAMENTO
</span>
<h3>
⏰ Atenção aos prazos
</h3>
</div>
<p>
Os prazos serão conectados ao banco de dados
na próxima etapa da integração dos acompanhamentos
reais do SafeSchool.
</p>
</div>
<div class="cards-prazos">
<button
type="button"
class="card-prazo-alerta vencido"
data-alerta-filtro="prazovencido"
>
<strong id="numeroPrazosVencidos">
0
</strong>
<b>
🔴 Prazos vencidos
</b>
<small>
Acompanhamentos que ultrapassaram
a data da próxima ação.
</small>
</button>
<button
type="button"
class="card-prazo-alerta hoje"
data-alerta-filtro="prazohoje"
>
<strong id="numeroPrazosHoje">
0
</strong>
<b>
🟠 Vencem hoje
</b>
<small>
Acompanhamentos cuja próxima ação
está prevista para hoje.
</small>
</button>
<button
type="button"
class="card-prazo-alerta proximo"
data-alerta-filtro="prazoproximo"
>
<strong id="numeroPrazosProximos">
0
</strong>
<b>
🟡 Próximos 3 dias
</b>
<small>
Acompanhamentos que exigirão
atenção em breve.
</small>
</button>
<button
type="button"
class="card-prazo-alerta sem-prazo"
data-alerta-filtro="semprazo"
>
<strong id="numeroSemPrazo">
0
</strong>
<b>
⚪ Sem prazo definido
</b>
<small>
Acompanhamentos ativos ainda
sem próxima ação prevista.
</small>
</button>
</div>
`;
filtros.parentNode.insertBefore(
painel,
filtros
);
}
/* =========================================
PAINEL DE TRIAGEM
========================================= */
function criarPainelTriagem() {
if (
document.getElementById(
"painelTriagemProfessor"
)
) {
return;
}
const painelPrazos =
document.getElementById(
"painelPrazosProfessor"
);
const filtros =
document.getElementById(
"areaFiltrosProfessor"
);
if (
!filtros
) {
return;
}
const painel =
document.createElement(
"div"
);
painel.id =
"painelTriagemProfessor";
painel.className =
"painel-triagem";
painel.innerHTML = `
<div class="painel-triagem-topo">
<div>
<span>
TRIAGEM ASSISTIDA
</span>
<h3>
✨ Priorização de situações
</h3>
</div>
<p>
O SafeSchool utiliza critérios transparentes
para organizar os relatos reais por nível de atenção.
A triagem não realiza diagnóstico e não substitui
a avaliação da equipe escolar.
</p>
</div>
<div class="cards-triagem">
<button
type="button"
class="card-triagem forte"
data-alerta-filtro="triagemforte"
>
<strong id="numeroTriagemForte">
0
</strong>
<b>
🔴 Sinais fortes de atenção
</b>
<small>
Relatos que reúnem indicadores
que sugerem análise prioritária.
</small>
</button>
<button
type="button"
class="card-triagem moderada"
data-alerta-filtro="triagemmoderada"
>
<strong id="numeroTriagemModerada">
0
</strong>
<b>
🟡 Sinais moderados
</b>
<small>
Relatos com alguns elementos
que merecem acompanhamento atento.
</small>
</button>
<button
type="button"
class="card-triagem regular"
data-alerta-filtro="triagemregular"
>
<strong id="numeroTriagemRegular">
0
</strong>
<b>
🟢 Sem sinal adicional
</b>
<small>
Relatos que continuam exigindo análise,
mas sem indicador adicional nesta triagem.
</small>
</button>
</div>
<div class="aviso-triagem">
⚠️ A triagem assistida não confirma que uma ocorrência
aconteceu, não realiza diagnóstico e não toma decisões.
A prioridade final e todas as providências permanecem
sob responsabilidade da equipe escolar.
</div>
`;
const referencia =
painelPrazos ||
filtros;
referencia.parentNode.insertBefore(
painel,
referencia
);
}
/* =========================================
UTILIDADES
========================================== */
function escaparHTML(valor) {
const elemento =
document.createElement("div");
elemento.textContent =
valor ?? "";
return elemento.innerHTML;
}
function textoSeguro(valor) {
return String(
valor ?? ""
).trim();
}
function normalizar(valor) {
return textoSeguro(valor)
.toLowerCase();
}
function limitarTexto(
texto,
limite = 190
) {
const valor =
textoSeguro(texto);
if (
valor.length <= limite
) {
return valor;
}
return (
valor
.substring(0, limite)
.trim()
+
"…"
);
}
function formatarDataHora(valor) {
if (!valor) {
return "Data não informada";
}
const data =
new Date(valor);
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
dateStyle: "short",
timeStyle: "short"
}
);
}
function humanizar(valor) {
const texto =
textoSeguro(valor);
if (!texto) {
return "Não informado";
}
const resultado =
texto
.replace(/[_-]+/g, " ")
.replace(/\s+/g, " ")
.trim();
return (
resultado.charAt(0).toUpperCase()
+
resultado.slice(1)
);
}
/* =========================================
FORMATAÇÕES
========================================== */
function formatarStatus(status) {
const mapa = {
novo:
"Novo",
acompanhamento:
"Em acompanhamento",
concluido:
"Concluído"
};
return (
mapa[normalizar(status)]
||
humanizar(status)
);
}
function formatarUrgencia(urgencia) {
const mapa = {
baixa:
"Baixa prioridade",
media:
"Média prioridade",
alta:
"Alta prioridade"
};
return (
mapa[normalizar(urgencia)]
||
humanizar(urgencia)
);
}
function formatarTipo(tipo) {
const mapa = {
verbal:
"Bullying verbal",
fisico:
"Bullying físico",
social:
"Bullying social",
psicologico:
"Bullying psicológico",
cyberbullying:
"Cyberbullying",
outro:
"Outra situação"
};
return (
mapa[normalizar(tipo)]
||
humanizar(tipo)
);
}
function formatarEnvolvimento(valor) {
if (!valor) {
return "Não informado";
}
const mapa = {
comigo:
"Aconteceu comigo",
testemunha:
"Presenciei a situação",
presenciei:
"Presenciei a situação",
colega:
"Aconteceu com outra pessoa",
outro:
"Outra situação"
};
return (
mapa[normalizar(valor)]
||
humanizar(valor)
);
}
function formatarAcaoHistorico(acao) {
const mapa = {
relato_criado:
"Relato registrado",
acompanhamento_iniciado:
"Acompanhamento iniciado",
acompanhamento_concluido:
"Acompanhamento concluído",
status_alterado:
"Status atualizado",
acao_registrada:
"Ação da equipe registrada",
encaminhamento_psicologia:
"Encaminhamento à Psicologia"
};
return (
mapa[normalizar(acao)]
||
humanizar(acao)
);
}
function formatarStatusPsicologia(status) {
const mapa = {
pendente:
"Pendente",
em_acompanhamento:
"Em acompanhamento pela Psicologia",
concluido:
"Concluído pela Psicologia"
};
return (
mapa[normalizar(status)]
||
humanizar(status)
);
}
function formatarResponsavelHistorico(item) {
if (
!item.realizado_por_id
) {
return "SafeSchool";
}
if (
!item.executor
) {
return "Equipe autorizada";
}
if (
item.executor.perfil ===
"professor"
) {
return (
item.executor.nome ||
"Equipe escolar"
);
}
if (
item.executor.perfil ===
"psicologia"
) {
return "Equipe de Psicologia";
}
if (
item.executor.perfil ===
"aluno"
) {
return "Estudante";
}
if (
item.executor.perfil ===
"responsavel"
) {
return "Responsável";
}
return "Equipe autorizada";
}
/* =========================================
TRIAGEM
========================================== */
function obterNivelTriagem(relato) {
const urgencia =
normalizar(
relato.urgencia
);
if (
relato.status ===
"concluido"
) {
return "encerrada";
}
if (
urgencia ===
"alta"
) {
return "forte";
}
if (
urgencia ===
"media"
) {
return "moderada";
}
return "regular";
}
function textoTriagem(relato) {
const nivel =
obterNivelTriagem(relato);
if (
nivel ===
"encerrada"
) {
return {
classe:
"encerrada",
etiqueta:
"Caso concluído",
texto:
"O acompanhamento deste relato está concluído."
};
}
if (
nivel ===
"forte"
) {
return {
classe:
"forte",
etiqueta:
"Sinal forte de atenção",
texto:
"O relato foi registrado com alta prioridade e deve receber análise atenta da equipe escolar."
};
}
if (
nivel ===
"moderada"
) {
return {
classe:
"moderada",
etiqueta:
"Sinal moderado",
texto:
"O relato apresenta prioridade média e permanece sujeito à avaliação da equipe escolar."
};
}
return {
classe:
"regular",
etiqueta:
"Sem sinal adicional",
texto:
"O relato permanece disponível para análise, sem indicador adicional de prioridade nesta triagem."
};
}
/* =========================================
SESSÃO
========================================== */
async function carregarSessao() {
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
return false;
}
usuarioAtual =
dadosUsuario.user;
const {
data: perfil,
error: erroPerfil
} =
await supabase
.from("perfis")
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
!perfil ||
!perfil.ativo ||
perfil.perfil !==
"professor"
) {
console.error(
"SafeSchool: perfil do Professor inválido.",
erroPerfil
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
.from("escolas")
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
"SafeSchool: instituição não localizada.",
erroEscola
);
return false;
}
escolaAtual =
escola;
return true;
} catch (erro) {
console.error(
"SafeSchool: erro ao validar sessão do Professor.",
erro
);
return false;
}
}
/* =========================================
PERFIS
========================================== */
async function buscarPerfisPorIds(ids) {
const unicos =
[
...new Set(
ids.filter(Boolean)
)
];
if (
unicos.length === 0
) {
return new Map();
}
const {
data,
error
} =
await supabase
.from("perfis")
.select(
"id,nome,perfil"
)
.in(
"id",
unicos
);
if (error) {
console.error(
"SafeSchool: não foi possível carregar os perfis relacionados.",
error
);
return new Map();
}
const mapa =
new Map();
(
Array.isArray(data)
? data
: []
)
.forEach(
function (perfil) {
mapa.set(
perfil.id,
perfil
);
}
);
return mapa;
}
async function buscarAutores(relatos) {
return await buscarPerfisPorIds(
relatos
.map(
relato =>
relato.autor_id
)
.filter(Boolean)
);
}
/* =========================================
HISTÓRICO
========================================== */
async function buscarHistoricos(relatos) {
const idsRelatos =
relatos
.map(
relato =>
relato.id
)
.filter(Boolean);
const mapa =
new Map();
idsRelatos.forEach(
function (id) {
mapa.set(
id,
[]
);
}
);
if (
idsRelatos.length === 0
) {
return mapa;
}
const {
data,
error
} =
await supabase
.from("historico_relatos")
.select(
"id,relato_id,acao,realizado_por_id,detalhes,criado_em"
)
.in(
"relato_id",
idsRelatos
)
.order(
"criado_em",
{
ascending: true
}
);
if (error) {
console.error(
"SafeSchool: não foi possível carregar o histórico dos relatos.",
error
);
return mapa;
}
const historicos =
Array.isArray(data)
? data
: [];
const executores =
await buscarPerfisPorIds(
historicos
.map(
item =>
item.realizado_por_id
)
.filter(Boolean)
);
historicos.forEach(
function (item) {
const registro = {
...item,
executor:
item.realizado_por_id
? (
executores.get(
item.realizado_por_id
)
||
null
)
: null
};
if (
!mapa.has(
item.relato_id
)
) {
mapa.set(
item.relato_id,
[]
);
}
mapa
.get(item.relato_id)
.push(registro);
}
);
return mapa;
}
/* =========================================
ENCAMINHAMENTOS À PSICOLOGIA
========================================== */
async function buscarEncaminhamentosPsicologia(
relatos
) {
const idsRelatos =
relatos
.map(
relato =>
relato.id
)
.filter(Boolean);
const mapa =
new Map();
idsRelatos.forEach(
function (id) {
mapa.set(
id,
[]
);
}
);
if (
idsRelatos.length === 0
) {
return mapa;
}
const {
data,
error
} =
await supabase
.from(
"encaminhamentos_psicologia"
)
.select(
"id,relato_id,encaminhado_por_id,psicologo_id,motivo,status,criado_em,atualizado_em"
)
.in(
"relato_id",
idsRelatos
)
.order(
"criado_em",
{
ascending: false
}
);
if (error) {
console.error(
"SafeSchool: não foi possível carregar os encaminhamentos à Psicologia.",
error
);
return mapa;
}
(
Array.isArray(data)
? data
: []
)
.forEach(
function (item) {
if (
!mapa.has(
item.relato_id
)
) {
mapa.set(
item.relato_id,
[]
);
}
mapa
.get(item.relato_id)
.push(item);
}
);
return mapa;
}
function obterEncaminhamentoAtivo(
relato
) {
const itens =
Array.isArray(
relato.encaminhamentosPsicologia
)
? relato.encaminhamentosPsicologia
: [];
return (
itens.find(
item =>
item.status === "pendente"
||
item.status === "em_acompanhamento"
)
||
null
);
}
/* =========================================
RELATOS
========================================== */
async function buscarRelatos() {
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
.from("relatos")
.select(
"id,escola_id,autor_id,anonimo,origem,envolvimento,tipo,descricao,local,quando_ocorreu,frequencia,status,urgencia,protocolo,criado_em,atualizado_em"
)
.eq(
"escola_id",
escolaAtual.id
)
.order(
"criado_em",
{
ascending: false
}
);
if (error) {
console.error(
"SafeSchool: erro ao carregar relatos reais.",
error
);
throw new Error(
"Não foi possível carregar os relatos."
);
}
const relatos =
Array.isArray(data)
? data
: [];
const [
autores,
historicos,
encaminhamentosPsicologia
] =
await Promise.all([
buscarAutores(
relatos
),
buscarHistoricos(
relatos
),
buscarEncaminhamentosPsicologia(
relatos
)
]);
return relatos.map(
function (relato) {
return {
...relato,
status:
normalizar(
relato.status
),
urgencia:
normalizar(
relato.urgencia
),
autor:
relato.autor_id
? (
autores.get(
relato.autor_id
)
||
null
)
: null,
historico:
historicos.get(
relato.id
)
||
[],
encaminhamentosPsicologia:
encaminhamentosPsicologia.get(
relato.id
)
||
[]
};
}
);
}
/* =========================================
INICIAR ACOMPANHAMENTO
========================================== */
async function iniciarAcompanhamento(
relato,
botao
) {
if (
!relato ||
!relato.id
) {
return;
}
if (
relato.status !==
"novo"
) {
mostrarErro(
"Este relato não está mais com status Novo.",
"Status atualizado"
);
await recarregar();
return;
}
const confirmou =
await solicitarConfirmacao({
titulo:
"Iniciar acompanhamento",
mensagem:
"Deseja iniciar o acompanhamento deste relato?\n\nO SafeSchool registrará esta ação no histórico do caso.",
textoConfirmar:
"Iniciar acompanhamento",
textoCancelar:
"Cancelar"
});
if (!confirmou) {
return;
}
const textoOriginal =
botao
? botao.textContent
: "";
if (botao) {
botao.disabled =
true;
botao.textContent =
"Iniciando...";
}
try {
const {
data,
error
} =
await supabase.rpc(
"iniciar_acompanhamento_relato",
{
p_relato_id:
relato.id
}
);
if (error) {
throw error;
}
const resultado =
Array.isArray(data)
? data[0]
: data;
if (
!resultado ||
resultado.status !==
"acompanhamento"
) {
throw new Error(
"O Supabase não confirmou a alteração."
);
}
await recarregar();
mostrarSucesso(
"O relato agora está em acompanhamento e a ação foi registrada no histórico.",
"Acompanhamento iniciado"
);
} catch (erro) {
console.error(
"SafeSchool: falha ao iniciar acompanhamento.",
erro
);
mostrarErro(
"Não foi possível iniciar o acompanhamento deste relato.",
"Acompanhamento não iniciado"
);
if (
botao &&
document.body.contains(botao)
) {
botao.disabled =
false;
botao.textContent =
textoOriginal;
}
}
}
/* =========================================
REGISTRAR AÇÃO
========================================== */
async function registrarAcaoAcompanhamento(
relato,
campo,
botao
) {
if (
!relato ||
!relato.id
) {
return;
}
if (
relato.status !==
"acompanhamento"
) {
mostrarAviso(
"Somente relatos em acompanhamento podem receber novas ações.",
"Acompanhamento necessário"
);
await recarregar();
return;
}
const observacao =
campo
? campo.value.trim()
: "";
if (
observacao.length < 5
) {
mostrarAviso(
"Descreva brevemente a ação realizada. Utilize pelo menos 5 caracteres.",
"Observação necessária"
);
if (campo) {
campo.focus();
}
return;
}
const textoOriginal =
botao
? botao.textContent
: "";
if (botao) {
botao.disabled =
true;
botao.textContent =
"Registrando...";
}
if (campo) {
campo.disabled =
true;
}
try {
const {
data,
error
} =
await supabase.rpc(
"registrar_acao_acompanhamento",
{
p_relato_id:
relato.id,
p_observacao:
observacao
}
);
if (error) {
throw error;
}
const resultado =
Array.isArray(data)
? data[0]
: data;
if (
!resultado ||
!resultado.acompanhamento_id
) {
throw new Error(
"O Supabase não confirmou o registro."
);
}
await recarregar();
mostrarSucesso(
"A ação foi registrada no acompanhamento e adicionada ao histórico do caso.",
"Ação registrada"
);
} catch (erro) {
console.error(
"SafeSchool: falha ao registrar ação.",
erro
);
mostrarErro(
"Não foi possível registrar esta ação.",
"Ação não registrada"
);
if (
campo &&
document.body.contains(campo)
) {
campo.disabled =
false;
}
if (
botao &&
document.body.contains(botao)
) {
botao.disabled =
false;
botao.textContent =
textoOriginal;
}
}
}
/* =========================================
ENCAMINHAR À PSICOLOGIA
========================================== */
async function encaminharRelatoPsicologia(
relato,
campo,
botao
) {
if (
!relato ||
!relato.id
) {
return;
}
if (
relato.status ===
"concluido"
) {
mostrarAviso(
"Relatos concluídos não podem receber um novo encaminhamento.",
"Relato concluído"
);
await recarregar();
return;
}
if (
obterEncaminhamentoAtivo(
relato
)
) {
mostrarAviso(
"Este relato já possui um encaminhamento ativo para a equipe de Psicologia.",
"Encaminhamento já existente"
);
await recarregar();
return;
}
const motivo =
campo
? campo.value.trim()
: "";
if (
motivo.length < 5
) {
mostrarAviso(
"Informe brevemente o motivo do encaminhamento. Utilize pelo menos 5 caracteres.",
"Motivo necessário"
);
if (campo) {
campo.focus();
}
return;
}
const mensagemAnonimato =
relato.anonimo
? "\n\nEste é um relato anônimo. A identidade de quem realizou o relato continuará preservada."
: "";
const confirmou =
await solicitarConfirmacao({
titulo:
"Encaminhar à Psicologia",
mensagem:
"Deseja encaminhar este relato à equipe de Psicologia?"
+
mensagemAnonimato
+
"\n\nO motivo informado será registrado no histórico do caso.",
textoConfirmar:
"Encaminhar",
textoCancelar:
"Cancelar"
});
if (!confirmou) {
return;
}
const textoOriginal =
botao
? botao.textContent
: "";
if (botao) {
botao.disabled =
true;
botao.textContent =
"Encaminhando...";
}
if (campo) {
campo.disabled =
true;
}
try {
const {
data,
error
} =
await supabase.rpc(
"encaminhar_relato_psicologia",
{
p_relato_id:
relato.id,
p_motivo:
motivo
}
);
if (error) {
console.error(
"SafeSchool: erro ao encaminhar à Psicologia.",
error
);
throw error;
}
const resultado =
Array.isArray(data)
? data[0]
: data;
if (
!resultado ||
!resultado.encaminhamento_id ||
resultado.status !==
"pendente"
) {
throw new Error(
"O Supabase não confirmou o encaminhamento."
);
}
await recarregar();
reabrirRelato(
relato.id
);
mostrarSucesso(
"O relato foi encaminhado à equipe de Psicologia e o encaminhamento foi registrado no histórico.",
"Encaminhamento realizado"
);
} catch (erro) {
console.error(
"SafeSchool: falha no encaminhamento à Psicologia.",
erro
);
mostrarErro(
"Não foi possível realizar o encaminhamento. Nenhuma informação parcial foi registrada.",
"Encaminhamento não realizado"
);
if (
campo &&
document.body.contains(campo)
) {
campo.disabled =
false;
}
if (
botao &&
document.body.contains(botao)
) {
botao.disabled =
false;
botao.textContent =
textoOriginal;
}
}
}
/* =========================================
CONCLUIR ACOMPANHAMENTO
========================================== */
async function concluirAcompanhamento(
relato,
campo,
botao
) {
if (
!relato ||
!relato.id
) {
return;
}
if (
relato.status !==
"acompanhamento"
) {
mostrarAviso(
"Este relato não está mais em acompanhamento.",
"Status atualizado"
);
await recarregar();
return;
}
const observacaoFinal =
campo
? campo.value.trim()
: "";
if (
observacaoFinal.length < 5
) {
mostrarAviso(
"Informe uma observação final sobre o encerramento do acompanhamento. Utilize pelo menos 5 caracteres.",
"Observação final necessária"
);
if (campo) {
campo.focus();
}
return;
}
const confirmou =
await solicitarConfirmacao({
titulo:
"Concluir acompanhamento",
mensagem:
"Deseja concluir este acompanhamento?\n\nA observação final será registrada no histórico. Concluir o acompanhamento significa encerrar este fluxo de atuação da equipe e não afirmar que todos os efeitos da situação desapareceram.",
textoConfirmar:
"Concluir acompanhamento",
textoCancelar:
"Continuar acompanhando"
});
if (!confirmou) {
return;
}
const textoOriginal =
botao
? botao.textContent
: "";
if (botao) {
botao.disabled =
true;
botao.textContent =
"Concluindo...";
}
if (campo) {
campo.disabled =
true;
}
try {
const {
data,
error
} =
await supabase.rpc(
"concluir_acompanhamento_relato",
{
p_relato_id:
relato.id,
p_observacao_final:
observacaoFinal
}
);
if (error) {
throw error;
}
const resultado =
Array.isArray(data)
? data[0]
: data;
if (
!resultado ||
resultado.novo_status !==
"concluido" ||
!resultado.acompanhamento_id
) {
throw new Error(
"O Supabase não confirmou a conclusão."
);
}
await recarregar();
window.requestAnimationFrame(
function () {
window.requestAnimationFrame(
function () {
rolarParaFiltros();
}
);
}
);
mostrarSucesso(
"O acompanhamento foi concluído e a observação final foi registrada no histórico do caso.",
"Acompanhamento concluído"
);
} catch (erro) {
console.error(
"SafeSchool: falha ao concluir acompanhamento.",
erro
);
mostrarErro(
"Não foi possível concluir este acompanhamento.",
"Acompanhamento não concluído"
);
if (
campo &&
document.body.contains(campo)
) {
campo.disabled =
false;
}
if (
botao &&
document.body.contains(botao)
) {
botao.disabled =
false;
botao.textContent =
textoOriginal;
}
}
}
/* =========================================
IDENTIFICAÇÃO
========================================== */
function criarBlocoIdentificacao(
relato
) {
if (
relato.anonimo
) {
return `
<div class="identificacao-relato anonimo">
<span class="tipo-identificacao">
🔒 Relato anônimo
</span>
<span class="dado-identificacao">
A identidade da pessoa que realizou
o relato não está disponível.
</span>
</div>
`;
}
const nome =
relato.autor &&
relato.autor.nome
? relato.autor.nome
: "Estudante identificado";
return `
<div class="identificacao-relato identificado">
<span class="tipo-identificacao">
👤 Relato identificado
</span>
<span class="dado-identificacao">
Estudante:
${escaparHTML(nome)}
</span>
<span class="dado-identificacao">
Situação:
${escaparHTML(
formatarEnvolvimento(
relato.envolvimento
)
)}
</span>
</div>
`;
}
/* =========================================
TRIAGEM
========================================== */
function criarBlocoTriagem(
relato
) {
const triagem =
textoTriagem(
relato
);
return `
<div
class="
triagem-caso
${escaparHTML(
triagem.classe
)}
"
>
<div class="triagem-caso-topo">
<strong>
✨ Apoio à triagem
</strong>
<span class="triagem-etiqueta">
${escaparHTML(
triagem.etiqueta
)}
</span>
</div>
<p>
${escaparHTML(
triagem.texto
)}
</p>
<p class="triagem-motivos">
Critério considerado:
prioridade informada no registro.
</p>
</div>
`;
}
/* =========================================
HISTÓRICO
========================================== */
function criarHistoricoHTML(
relato
) {
const historico =
Array.isArray(
relato.historico
)
? relato.historico
: [];
if (
historico.length === 0
) {
return `
<div class="historico-caso">
<h4>
📋 Histórico do acompanhamento
</h4>
<p class="historico-subtitulo">
Ainda não há eventos disponíveis
no histórico deste relato.
</p>
</div>
`;
}
const eventos =
historico
.map(
function (item) {
return `
<div class="evento-historico">
<strong>
${escaparHTML(
formatarAcaoHistorico(
item.acao
)
)}
</strong>
${
item.detalhes
? `
<p>
${escaparHTML(
item.detalhes
)}
</p>
`
: ""
}
<small>
${escaparHTML(
formatarDataHora(
item.criado_em
)
)}
•
${escaparHTML(
formatarResponsavelHistorico(
item
)
)}
</small>
</div>
`;
}
)
.join("");
return `
<div class="historico-caso">
<h4>
📋 Histórico do acompanhamento
</h4>
<p class="historico-subtitulo">
Registro das principais movimentações
realizadas neste caso.
</p>
<div class="linha-tempo">
${eventos}
</div>
</div>
`;
}
/* =========================================
PSICOLOGIA — BLOCO
========================================== */
function criarBlocoPsicologia(
relato
) {
const ativo =
obterEncaminhamentoAtivo(
relato
);
if (ativo) {
return `
<div class="encaminhamento-psicologia-existente">
<strong>
🧠 Encaminhamento à equipe de Psicologia
</strong>
<span class="encaminhamento-psicologia-status">
${escaparHTML(
formatarStatusPsicologia(
ativo.status
)
)}
</span>
<p>
<strong>Motivo:</strong>
${escaparHTML(
ativo.motivo
)}
</p>
<p>
Encaminhado em
${escaparHTML(
formatarDataHora(
ativo.criado_em
)
)}.
</p>
${
relato.anonimo
? `
<p class="aviso-anonimato-psicologia-real">
🔒 Este relato permanece anônimo.
O encaminhamento não revela a identidade
de quem realizou o relato.
</p>
`
: ""
}
</div>
`;
}
if (
relato.status ===
"concluido"
) {
return "";
}
return `
<div class="encaminhamento-psicologia-real">
<strong>
🧠 Encaminhar à equipe de Psicologia
</strong>
<p>
Utilize este encaminhamento quando a equipe escolar
considerar importante solicitar acompanhamento
da equipe de Psicologia.
</p>
<textarea
maxlength="500"
data-motivo-psicologia-real
placeholder="Ex.: Recomenda-se acompanhamento pela equipe de Psicologia diante dos impactos relatados pelo estudante."
></textarea>
<small
class="encaminhamento-psicologia-contador"
data-contador-psicologia-real
>
0 / 500
</small>
${
relato.anonimo
? `
<p class="aviso-anonimato-psicologia-real">
🔒 Este relato é anônimo.
O encaminhamento preservará o anonimato
e não revelará a identidade de quem
realizou o relato.
</p>
`
: ""
}
<button
type="button"
class="botao-encaminhar-psicologia-real"
data-encaminhar-psicologia-real
>
Encaminhar à Psicologia
</button>
</div>
`;
}
/* =========================================
FORMULÁRIO DE AÇÃO
========================================== */
function criarFormularioAcao(
relato
) {
if (
relato.status !==
"acompanhamento"
) {
return "";
}
return `
<div class="registro-acao-real">
<strong>
📝 Registrar ação realizada
</strong>
<p>
Registre de forma breve uma providência,
contato, orientação ou outra ação realizada
pela equipe escolar neste acompanhamento.
</p>
<textarea
maxlength="500"
data-observacao-acompanhamento-real
placeholder="Ex.: Foi realizada uma conversa de acompanhamento com o estudante e foram combinadas novas observações durante os intervalos."
></textarea>
<small
class="registro-acao-contador"
data-contador-observacao-real
>
0 / 500
</small>
<button
type="button"
class="botao-registrar-acao-real"
data-registrar-acao-real
>
Registrar ação
</button>
</div>
`;
}
/* =========================================
FORMULÁRIO DE CONCLUSÃO
========================================== */
function criarFormularioConclusao(
relato
) {
if (
relato.status !==
"acompanhamento"
) {
return "";
}
return `
<div class="conclusao-acompanhamento-real">
<strong>
✅ Concluir acompanhamento
</strong>
<p>
Quando a equipe considerar que este fluxo
de acompanhamento pode ser encerrado,
registre uma observação final antes da conclusão.
</p>
<textarea
maxlength="500"
data-observacao-final-real
placeholder="Ex.: Após as ações realizadas e as orientações definidas pela equipe, este acompanhamento foi encerrado."
></textarea>
<small
class="conclusao-acompanhamento-contador"
data-contador-observacao-final-real
>
0 / 500
</small>
<p class="aviso-conclusao-real">
A conclusão registra o encerramento deste
acompanhamento pela equipe escolar. Ela não
significa, por si só, que todos os efeitos da
situação deixaram de existir.
</p>
<button
type="button"
class="botao-concluir-acompanhamento-real"
data-concluir-acompanhamento-real
>
Concluir acompanhamento
</button>
</div>
`;
}
/* =========================================
BOTÃO DE STATUS
========================================== */
function criarBotaoAcompanhamento(
relato
) {
if (
relato.status ===
"novo"
) {
return `
<button
type="button"
class="botao-status"
data-iniciar-acompanhamento-real
>
Iniciar acompanhamento
</button>`;
}
if (
relato.status ===
"acompanhamento"
) {
return `
<button
type="button"
class="botao-status desativado"
disabled
>
Em acompanhamento
</button>
`;
}
return `
<button
type="button"
class="botao-status desativado"
disabled
>
Acompanhamento concluído
</button>
`;
}
/* =========================================
CARD
========================================== */
function criarCardRelato(
relato
) {
const card =
document.createElement(
"article"
);
card.className =
"card-relato";
card.dataset.relatoReal =
relato.id;
card.innerHTML = `
<div class="relato-topo">
<div>
<span class="protocolo-relato">
${escaparHTML(
relato.protocolo
)}
</span>
<h3>
${escaparHTML(
formatarTipo(
relato.tipo
)
)}
</h3>
</div>
<span
class="
status-relato
status-${escaparHTML(
relato.status
)}
"
>
${escaparHTML(
formatarStatus(
relato.status
)
)}
</span>
</div>
${criarBlocoIdentificacao(
relato
)}
<div class="relato-informacoes">
<span>
📍 ${escaparHTML(
humanizar(
relato.local
)
)}
</span>
<span>
📅 Recebido em
${escaparHTML(
formatarDataHora(
relato.criado_em
)
)}
</span>
<span>
⚠️ ${escaparHTML(
formatarUrgencia(
relato.urgencia
)
)}
</span>
</div>
${criarBlocoTriagem(
relato
)}
<div class="relato-resumo">
<p>
${escaparHTML(
limitarTexto(
relato.descricao
)
)}
</p>
</div>
<div
class="relato-detalhes"
hidden
>
<strong>
Relato completo
</strong>
<p>
${escaparHTML(
relato.descricao
)}
</p>
<div class="relato-informacoes">
<span>
Quando ocorreu:
${escaparHTML(
relato.quando_ocorreu
||
"Não informado"
)}
</span>
<span>
Frequência:
${escaparHTML(
humanizar(
relato.frequencia
)
)}
</span>
<span>
Envolvimento:
${escaparHTML(
formatarEnvolvimento(
relato.envolvimento
)
)}
</span>
</div>
${criarHistoricoHTML(
relato
)}
${criarBlocoPsicologia(
relato
)}
${criarFormularioAcao(
relato
)}
${criarFormularioConclusao(
relato
)}
</div>
<div class="acoes-relato">
<button
type="button"
class="botao-status"
data-ver-relato-real
>
Ver relato completo e histórico
</button>
${criarBotaoAcompanhamento(
relato
)}
</div>
`;
const botaoDetalhes =
card.querySelector(
"[data-ver-relato-real]"
);
const detalhes =
card.querySelector(
".relato-detalhes"
);
if (
botaoDetalhes &&
detalhes
) {
botaoDetalhes.addEventListener(
"click",
function () {
const vaiAbrir =
detalhes.hidden;
detalhes.hidden =
!vaiAbrir;
botaoDetalhes.textContent =
vaiAbrir
? "Ocultar detalhes e histórico"
: "Ver relato completo e histórico";
}
);
}
const botaoAcompanhamento =
card.querySelector(
"[data-iniciar-acompanhamento-real]"
);
if (
botaoAcompanhamento
) {
botaoAcompanhamento.addEventListener(
"click",
async function () {
await iniciarAcompanhamento(
relato,
botaoAcompanhamento
);
}
);
}
const campoPsicologia =
card.querySelector(
"[data-motivo-psicologia-real]"
);
const contadorPsicologia =
card.querySelector(
"[data-contador-psicologia-real]"
);
const botaoPsicologia =
card.querySelector(
"[data-encaminhar-psicologia-real]"
);
if (
campoPsicologia &&
contadorPsicologia
) {
campoPsicologia.addEventListener(
"input",
function () {
contadorPsicologia.textContent =
campoPsicologia.value.length
+
" / 500";
}
);
}
if (
campoPsicologia &&
botaoPsicologia
) {
botaoPsicologia.addEventListener(
"click",
async function () {
await encaminharRelatoPsicologia(
relato,
campoPsicologia,
botaoPsicologia
);
}
);
}
const campoObservacao =
card.querySelector(
"[data-observacao-acompanhamento-real]"
);
const botaoRegistrar =
card.querySelector(
"[data-registrar-acao-real]"
);
const contadorObservacao =
card.querySelector(
"[data-contador-observacao-real]"
);
if (
campoObservacao &&
contadorObservacao
) {
campoObservacao.addEventListener(
"input",
function () {
contadorObservacao.textContent =
campoObservacao.value.length
+
" / 500";
}
);
}
if (
campoObservacao &&
botaoRegistrar
) {
botaoRegistrar.addEventListener(
"click",
async function () {
await registrarAcaoAcompanhamento(
relato,
campoObservacao,
botaoRegistrar
);
}
);
}
const campoObservacaoFinal =
card.querySelector(
"[data-observacao-final-real]"
);
const contadorObservacaoFinal =
card.querySelector(
"[data-contador-observacao-final-real]"
);
const botaoConcluir =
card.querySelector(
"[data-concluir-acompanhamento-real]"
);
if (
campoObservacaoFinal &&
contadorObservacaoFinal
) {
campoObservacaoFinal.addEventListener(
"input",
function () {
contadorObservacaoFinal.textContent =
campoObservacaoFinal.value.length
+
" / 500";
}
);
}
if (
campoObservacaoFinal &&
botaoConcluir
) {
botaoConcluir.addEventListener(
"click",
async function () {
await concluirAcompanhamento(
relato,
campoObservacaoFinal,
botaoConcluir
);
}
);
}
return card;
}
/* =========================================
FILTROS
========================================== */
function relatoPassaFiltro(
relato
) {
const nivel =
obterNivelTriagem(
relato
);
if (
filtroAtual ===
"novos"
) {
return relato.status ===
"novo";
}
if (
filtroAtual ===
"acompanhamento"
) {
return relato.status ===
"acompanhamento";
}
if (
filtroAtual ===
"concluidos"
) {
return relato.status ===
"concluido";
}
if (
filtroAtual ===
"alta"
) {
return relato.urgencia ===
"alta";
}
if (
filtroAtual ===
"anonimos"
) {
return relato.anonimo ===
true;
}
if (
filtroAtual ===
"identificados"
) {
return relato.anonimo ===
false;
}
if (
filtroAtual ===
"triagemforte"
) {
return nivel ===
"forte";
}
if (
filtroAtual ===
"triagemmoderada"
) {
return nivel ===
"moderada";
}
if (
filtroAtual ===
"triagemregular"
) {
return nivel ===
"regular";
}
return true;
}
function relatoPassaBusca(
relato
) {
if (
!buscaAtual
) {
return true;
}
const texto =
[
relato.protocolo,
relato.descricao,
relato.tipo,
relato.local,
relato.urgencia,
relato.status,
relato.envolvimento,
relato.frequencia,
relato.autor
? relato.autor.nome
: ""
]
.filter(Boolean)
.join(" ")
.toLowerCase();
return texto.includes(
buscaAtual
);
}
/* =========================================
CONTADORES
========================================== */
function atualizarResumo() {
const novos =
relatosReais.filter(
item =>
item.status ===
"novo"
).length;
const alta =
relatosReais.filter(
item =>
item.urgencia ===
"alta"
&&
item.status !==
"concluido"
).length;
const acompanhamento =
relatosReais.filter(
item =>
item.status ===
"acompanhamento"
).length;
const concluidos =
relatosReais.filter(
item =>
item.status ===
"concluido"
).length;
if (numeroNovos) {
numeroNovos.textContent =
String(novos);
}
if (numeroAltaPrioridade) {
numeroAltaPrioridade.textContent =
String(alta);
}
if (numeroAcompanhamento) {
numeroAcompanhamento.textContent =
String(acompanhamento);
}
if (numeroConcluidos) {
numeroConcluidos.textContent =
String(concluidos);
}
if (totalRelatos) {
totalRelatos.textContent =
relatosReais.length === 1
? "1 relato"
: relatosReais.length +
" relatos";
}
const forte =
document.getElementById(
"numeroTriagemForte"
);
const moderada =
document.getElementById(
"numeroTriagemModerada"
);
const regular =
document.getElementById(
"numeroTriagemRegular"
);
if (forte) {
forte.textContent =
String(
relatosReais.filter(
item =>
obterNivelTriagem(item)
=== "forte"
).length
);
}
if (moderada) {
moderada.textContent =
String(
relatosReais.filter(
item =>
obterNivelTriagem(item)
=== "moderada"
).length
);
}
if (regular) {
regular.textContent =
String(
relatosReais.filter(
item =>
obterNivelTriagem(item)
=== "regular"
).length
);
}
}
/* =========================================
RENDERIZAR
========================================== */
function renderizar() {
if (
!listaRelatos
) {
return;
}
const filtrados =
relatosReais.filter(
function (relato) {
return (
relatoPassaFiltro(relato)
&&
relatoPassaBusca(relato)
);
}
);
listaRelatos.innerHTML =
"";
if (semRelatos) {
semRelatos.style.display =
relatosReais.length === 0
? "block"
: "none";
}
const semResultados =
document.getElementById(
"semResultadosFiltroProfessor"
);
if (semResultados) {
semResultados.style.display =
relatosReais.length > 0 &&
filtrados.length === 0
? "block"
: "none";
}
filtrados.forEach(
function (relato) {
listaRelatos.appendChild(
criarCardRelato(
relato
)
);
}
);
const resultado =
document.getElementById(
"resultadoFiltrosProfessor"
);
if (resultado) {
if (
filtrados.length ===
relatosReais.length
) {
resultado.textContent =
relatosReais.length === 1
? "1 relato"
: relatosReais.length +
" relatos";
} else {
resultado.textContent =
"Exibindo "
+
filtrados.length
+
" de "
+
relatosReais.length
+
" relatos";
}
}
}
/* =========================================
FILTRO
========================================== */
function selecionarFiltroReal(
filtro
) {
filtroAtual =
filtro ||
"todos";
document
.querySelectorAll(
"[data-filtro-relato]"
)
.forEach(
function (item) {
item.classList.remove(
"ativo"
);
if (
item.getAttribute(
"data-filtro-relato"
)
===
filtroAtual
) {
item.classList.add(
"ativo"
);
}
}
);
renderizar();
}
/* =========================================
NAVEGAÇÃO
========================================== */
function rolarParaFiltros() {
const filtros =
document.getElementById(
"areaFiltrosProfessor"
);
if (!filtros) {
return;
}
const cabecalho =
document.querySelector(
".cabecalho"
);
const alturaCabecalho =
cabecalho
? cabecalho.offsetHeight
: 0;
const topo =
filtros
.getBoundingClientRect()
.top
+
window.scrollY
-
alturaCabecalho
-
18;
window.scrollTo({
top:
Math.max(
0,
topo
),
behavior:
"smooth"
});
}
function reabrirRelato(
relatoId
) {
window.requestAnimationFrame(
function () {
window.requestAnimationFrame(
function () {
const cards =
document.querySelectorAll(
"[data-relato-real]"
);
let card =
null;
cards.forEach(
function (item) {
if (
item.dataset.relatoReal
=== relatoId
) {
card =
item;
}
}
);
if (!card) {
rolarParaFiltros();
return;
}
const detalhes =
card.querySelector(
".relato-detalhes"
);
const botao =
card.querySelector(
"[data-ver-relato-real]"
);
if (detalhes) {
detalhes.hidden =
false;
}
if (botao) {
botao.textContent =
"Ocultar detalhes e histórico";
}
const cabecalho =
document.querySelector(
".cabecalho"
);
const alturaCabecalho =
cabecalho
? cabecalho.offsetHeight
: 0;
const topo =
card
.getBoundingClientRect()
.top
+
window.scrollY
-
alturaCabecalho
-
18;
window.scrollTo({
top:
Math.max(
0,
topo
),
behavior:
"smooth"
});
}
);
}
);
}
function abrirFiltro(
filtro
) {
selecionarFiltroReal(
filtro
);
window.setTimeout(
function () {
rolarParaFiltros();
},
40
);
}
/* =========================================
CONFIGURAR FILTROS
========================================== */
function configurarFiltros() {
document
.querySelectorAll(
"[data-filtro-relato]"
)
.forEach(
function (botao) {
const filtro =
botao.getAttribute(
"data-filtro-relato"
);
if (
filtro === "prazovencido"
||
filtro === "prazohoje"
||
filtro === "prazoproximo"
||
filtro === "semprazo"
) {
botao.disabled =
true;
botao.title =
"Os prazos serão conectados na etapa de acompanhamento real.";
return;
}
botao.addEventListener(
"click",
function () {
selecionarFiltroReal(
filtro
);
}
);
}
);
document
.querySelectorAll(
"[data-alerta-filtro]"
)
.forEach(
function (botao) {
const filtro =
botao.getAttribute(
"data-alerta-filtro"
);
if (
filtro === "prazovencido"
||
filtro === "prazohoje"
||
filtro === "prazoproximo"
||
filtro === "semprazo"
) {
botao.disabled =
true;
botao.title =
"Os prazos serão conectados na etapa de acompanhamento real.";
return;
}
botao.addEventListener(
"click",
function () {
abrirFiltro(
filtro
);
}
);
}
);
const campoBusca =
document.getElementById(
"buscaRelatosProfessor"
);
if (campoBusca) {
campoBusca.addEventListener(
"input",
function () {
buscaAtual =
campoBusca.value
.trim()
.toLowerCase();
renderizar();
}
);
campoBusca.addEventListener(
"keydown",
function (evento) {
if (
evento.key !==
"Enter"
) {
return;
}
evento.preventDefault();
buscaAtual =
campoBusca.value
.trim()
.toLowerCase();
if (!buscaAtual) {
return;
}
selecionarFiltroReal(
"todos"
);
window.setTimeout(
function () {
const primeiroCard =
listaRelatos
? listaRelatos.querySelector(
".card-relato"
)
: null;
if (!primeiroCard) {
campoBusca.focus();
return;
}
const cabecalho =
document.querySelector(
".cabecalho"
);
const alturaCabecalho =
cabecalho
? cabecalho.offsetHeight
: 0;
const topo =
primeiroCard
.getBoundingClientRect()
.top
+
window.scrollY
-
alturaCabecalho
-
18;
window.scrollTo({
top:
Math.max(
0,
topo
),
behavior:
"smooth"
});
primeiroCard.classList.add(
"destaque-busca-enter-professor"
);
window.setTimeout(
function () {
primeiroCard.classList.remove(
"destaque-busca-enter-professor"
);
},
1800
);
},
120
);
}
);
}
const limpar =
document.getElementById(
"limparBuscaProfessor"
);
if (limpar) {
limpar.addEventListener(
"click",
function () {
filtroAtual =
"todos";
buscaAtual =
"";
if (campoBusca) {
campoBusca.value =
"";
}
document
.querySelectorAll(
"[data-filtro-relato]"
)
.forEach(
item =>
item.classList.remove(
"ativo"
)
);
const todos =
document.querySelector(
'[data-filtro-relato="todos"]'
);
if (todos) {
todos.classList.add(
"ativo"
);
}
renderizar();
}
);
}
}
/* =========================================
ATALHOS DO RESUMO
========================================== */
function configurarAtalhosResumo() {
const atalhos = [
{
numero:
numeroNovos,
filtro:
"novos",
titulo:
"Mostrar somente os relatos novos"
},
{
numero:
numeroAltaPrioridade,
filtro:
"alta",
titulo:
"Mostrar somente os relatos de alta prioridade"
},
{
numero:
numeroAcompanhamento,
filtro:
"acompanhamento",
titulo:
"Mostrar somente os relatos em acompanhamento"
},
{
numero:
numeroConcluidos,
filtro:
"concluidos",
titulo:
"Mostrar somente os acompanhamentos concluídos"
}
];
atalhos.forEach(
function (atalho) {
if (
!atalho.numero
) {
return;
}
const card =
atalho.numero.closest(
".card-resumo"
);
if (!card) {
return;
}
card.classList.add(
"atalho-resumo-relatos"
);
card.setAttribute(
"role",
"button"
);
card.setAttribute(
"tabindex",
"0"
);
card.setAttribute(
"title",
atalho.titulo
);
card.addEventListener(
"click",
function () {
abrirFiltro(
atalho.filtro
);
}
);
card.addEventListener(
"keydown",
function (evento) {
if (
evento.key !== "Enter"
&&
evento.key !== " "
) {
return;
}
evento.preventDefault();
abrirFiltro(
atalho.filtro
);
}
);
}
);
}
/* =========================================
MENU RELATOS
========================================== */
function configurarAtalhoMenuRelatos() {
const links =
document.querySelectorAll(
'.menu a[href="#relatos"]'
);
links.forEach(
function (link) {
if (
link.hasAttribute(
"data-abrir-acompanhamentos"
)
) {
return;
}
link.addEventListener(
"click",
function (evento) {
evento.preventDefault();
abrirFiltro(
"todos"
);
}
);
}
);
}
/* =========================================
ESTILO DOS ATALHOS
========================================== */
function configurarEstiloAtalhos() {
if (
document.getElementById(
"estiloAtalhosResumoProfessor"
)
) {
return;
}
const estilo =
document.createElement(
"style"
);
estilo.id =
"estiloAtalhosResumoProfessor";
estilo.textContent = `
.atalho-resumo-relatos {
cursor: pointer;
transition:
transform 0.16s ease,
box-shadow 0.16s ease,
border-color 0.16s ease;
}
.atalho-resumo-relatos:hover {
transform:
translateY(-3px);
box-shadow:
0 12px 30px
rgba(74, 54, 130, 0.10);
}
.atalho-resumo-relatos:focus-visible {
outline:
3px solid
rgba(108, 76, 229, 0.22);
outline-offset:
3px;
}
`;
document.head.appendChild(
estilo
);
}
/* =========================================
PAINÉIS
========================================== */
function ajustarPainelTriagem() {
const painel =
document.getElementById(
"painelTriagemProfessor"
);
if (!painel) {
return;
}
const texto =
painel.querySelector(
".painel-triagem-topo p"
);
if (texto) {
texto.textContent =
"O SafeSchool utiliza critérios transparentes para organizar os relatos reais por nível de atenção. A triagem não realiza diagnóstico e não substitui a avaliação da equipe escolar.";
}
const aviso =
painel.querySelector(
".aviso-triagem"
);
if (aviso) {
aviso.textContent =
"⚠️ A triagem assistida não confirma que uma ocorrência aconteceu, não realiza diagnóstico e não toma decisões. A prioridade final e todas as providências permanecem sob responsabilidade da equipe escolar.";
}
}
function ajustarPainelPrazos() {
const painel =
document.getElementById(
"painelPrazosProfessor"
);
if (!painel) {
return;
}
const texto =
painel.querySelector(
".painel-prazos-topo p"
);
if (texto) {
texto.textContent =
"Os prazos serão conectados ao banco de dados na próxima etapa da integração dos acompanhamentos.";
}
painel
.querySelectorAll(
"[data-alerta-filtro]"
)
.forEach(
function (botao) {
botao.disabled =
true;
botao.title =
"Disponível após a integração dos acompanhamentos reais.";
}
);
}
/* =========================================
RECARREGAR
========================================== */
async function recarregar() {
relatosReais =
await buscarRelatos();
atualizarResumo();
ajustarPainelTriagem();
ajustarPainelPrazos();
renderizar();
}
/* =========================================
INICIAR
========================================== */
async function iniciar() {
if (
!listaRelatos
) {
return;
}
await prepararInterface();
const sessaoValida =
await carregarSessao();
if (
!sessaoValida
) {
return;
}
try {
relatosReais =
await buscarRelatos();
injetarEstilosComplementares();
criarAreaFiltros();
criarPainelPrazos();
criarPainelTriagem();
configurarFiltros();
configurarEstiloAtalhos();
configurarEstilosAcompanhamentoReal();
configurarAtalhosResumo();
configurarAtalhoMenuRelatos();
ajustarPainelTriagem();
ajustarPainelPrazos();
atualizarResumo();
renderizar();
console.log(
"SafeSchool: relatos reais carregados no painel do Professor.",
relatosReais.length
);
} catch (erro) {
console.error(
"SafeSchool: falha ao carregar relatos reais.",
erro
);
mostrarErro(
"Não foi possível carregar os relatos da instituição.",
"Relatos indisponíveis"
);
}
}
/* =========================================
API
========================================== */
window.SafeSchoolRelatosProfessor =
Object.freeze({
recarregar:
recarregar,
abrirFiltro:
abrirFiltro
});
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
} else {
iniciar();
}
})();