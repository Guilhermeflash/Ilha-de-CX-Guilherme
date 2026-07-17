COMO ADICIONAR AUTOMAÇÕES DO BANCO CARREFOUR
==============================================

1. Coloque o arquivo .html dentro desta pasta.
   Exemplo: /clientes/banco-carrefour/efetividade.html

2. Abra /js/script.js, encontre o cliente "banco-carrefour" dentro do
   array CLIENTES e adicione um item no array "ferramentas":

   {
     id: "efetividade-carrefour",
     nome: "Efetividade de Entregas",
     icone: "📦",
     descricao: "Indicadores de efetividade por região.",
     arquivo: "clientes/banco-carrefour/efetividade.html"
   }

3. Salve e recarregue. A ferramenta aparece automaticamente na página
   do cliente.
