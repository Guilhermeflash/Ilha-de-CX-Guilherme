COMO ADICIONAR UMA NOVA FERRAMENTA GERAL
==========================================

1. Coloque o arquivo .html da ferramenta dentro desta pasta (/automacoes).
   Exemplo: /automacoes/dashboard-sla.html

2. Abra o arquivo /js/script.js e adicione um novo item no array FERRAMENTAS:

   {
     id: "dashboard-sla",              // identificador único, sem espaços
     nome: "Tickets & SLA",            // nome exibido no card
     icone: "📊",                       // emoji ou símbolo do card
     descricao: "Acompanhamento de prazos e produtividade do time.",
     arquivo: "automacoes/dashboard-sla.html"   // caminho do arquivo
   }

3. Salve e recarregue o site. O card aparece automaticamente na página
   "Automações", e a ferramenta abre dentro do próprio portal (iframe),
   sem sair do site.

Repita o processo para cada nova ferramenta.
