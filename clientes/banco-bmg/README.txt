COMO ADICIONAR AUTOMAÇÕES DO BANCO CARREFOUR
==============================================

1. Coloque o arquivo .html dentro desta pasta.
   Exemplo: /clientes/banco-bmg/efetividade.html

2. Abra /js/script.js, encontre o cliente "banco-bmg" dentro do
   array CLIENTES e adicione um item no array "ferramentas":

   {
     id: "efetividade-bmg",
     nome: "Efetividade de Entregas",
     icone: "📦",
     descricao: "Indicadores de efetividade por região.",
     arquivo: "clientes/banco-bmg/efetividade.html"
   }

3. Salve e recarregue. A ferramenta aparece automaticamente na página
   do cliente.
