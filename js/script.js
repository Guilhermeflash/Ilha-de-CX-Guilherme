/* =========================================================================
   PORTAL - AUTOMAÇÕES ILHA DE ATENDIMENTO GUILHERME
   =========================================================================
   COMO ADICIONAR UMA NOVA FERRAMENTA:
   1. Coloque o arquivo .html dentro da pasta /automacoes
   2. Adicione um novo objeto no array FERRAMENTAS abaixo, com o caminho
      do arquivo em "arquivo".
   O card e o botão de menu são gerados automaticamente.

   COMO ADICIONAR UM NOVO CLIENTE:
   1. Crie uma pasta dentro de /clientes (ex: /clientes/novo-banco)
   2. Coloque os arquivos .html das automações desse cliente lá dentro
   3. Adicione um novo objeto no array CLIENTES, com suas ferramentas
      dentro da propriedade "ferramentas".
   ========================================================================= */

// Link de download da base DNE (hospedada em GitHub Releases - arquivo grande
// demais para ficar dentro do repositório do site / GitHub Pages)
const DNE_DOWNLOAD_URL = "https://github.com/Guilhermeflash/Ilha-de-CX-Guilherme/releases/download/DNE/dne.sqlite";

// -------------------- REGISTRO DE FERRAMENTAS GERAIS --------------------
const FERRAMENTAS = [
  {
    id: "analise-tickets",
    nome: "Análise de Tickets",
    icone: "🎫",
    descricao: "Motor de regras (sem IA) para classificação automática de chamados.",
    arquivo: "automacoes/analise-tickets.html"
  },
  {
    id: "validador-abrangencia-cep",
    nome: "Validador de Abrangência por CEP",
    icone: "📍",
    descricao: "Checagem de cobertura de CEP entre planilhas (.xlsx, .xls, .csv).",
    arquivo: "automacoes/validador-abrangencia-cep.html"
  },
  {
    id: "validador-entregas-carrefour",
    nome: "Validador de Entregas Carrefour",
    icone: "📦",
    descricao: "Validação de entregas e efetividade para a conta Carrefour.",
    arquivo: "automacoes/validador-entregas-carrefour.html"
  },
  {
    id: "validador-pendencias",
    nome: "Validador de Pendências",
    icone: "⏳",
    descricao: "Identificação e acompanhamento de pendências em aberto.",
    arquivo: "automacoes/validador-pendencias.html"
  },
  {
    id: "malha-de-transporte",
    nome: "Busca de Malha de Transporte",
    icone: "🚚",
    descricao: "Consulta de malha de transporte por região/rota.",
    arquivo: "automacoes/malha-de-transporte.html"
  },
  {
    id: "entregas-dedicadas",
    nome: "Validador de Entregas Dedicadas",
    icone: "🎯",
    descricao: "Validação de entregas dedicadas (fora do fluxo padrão).",
    arquivo: "automacoes/entregas-dedicadas.html"
  },
  // Ferramenta aguardando o arquivo .html ser enviado. Quando chegar:
  // 1. Salve o arquivo em /automacoes/validador-enderecos.html
  // 2. Remova o comentário do bloco abaixo
  {
    id: "validador-enderecos",
    nome: "Validador de Endereços",
    icone: "🗺️",
    descricao: "Validação de CEP, logradouro e numeração contra a base DNE dos Correios.",
    arquivo: "automacoes/validador-enderecos.html",
    requerDNE: true   // ativa o aviso e botão de download da base DNE
  },
];

// -------------------- REGISTRO DE CLIENTES --------------------
// Cada cliente tem duas categorias de ferramentas:
//   rotina  -> ferramentas de "Rotina e Tarefas"
//   painel  -> ferramentas de "Painel de Resultados"
const CLIENTES = [
  {
    id: "banco-carrefour",
    nome: "Banco Carrefour",
    logo: "img/logo-carrefour.png",
    rotina: [
      {
        id: "rotina-tarefas-carrefour",
        nome: "Rotina e Tarefas",
        icone: "📋",
        descricao: "Contatos, contratos, rotina operacional e informações do cliente.",
        arquivo: "clientes/banco-carrefour/rotina-tarefas.html"
      },
    ],
    painel: [
      {
        id: "painel-resultados-carrefour",
        nome: "Painel de Resultados",
        icone: "📊",
        descricao: "Dashboard executivo Flash × Carrefour — referente a Junho.",
        arquivo: "clientes/banco-carrefour/painel-resultados.html"
      },
    ]
  },
  {
    id: "banco-bmg",
    nome: "Banco BMG",
    logo: "img/logo-bmg.png",
    rotina: [
      // {
      //   id: "rotina-bmg-1",
      //   nome: "Nome da ferramenta",
      //   icone: "📋",
      //   descricao: "Descrição curta.",
      //   arquivo: "clientes/banco-bmg/arquivo.html"
      // },
    ],
    painel: [
      {
        id: "painel-resultados-bmg",
        nome: "Painel de Resultados",
        icone: "📊",
        descricao: "Dashboard executivo Flash × BMG — referente a Junho.",
        arquivo: "clientes/banco-bmg/painel-resultados.html"
      },
    ]
  },
];

// =========================================================================
// ROTEADOR (hash-based, funciona 100% local e no GitHub Pages)
// =========================================================================
const Router = {
  routes: {
    home: renderHome,
    automacoes: renderAutomacoes,
    clientes: renderClientes,
    cliente: renderClienteDetalhe,
    "cliente-rotina": (param) => renderClienteCategoria(param, 'rotina'),
    "cliente-painel": (param) => renderClienteCategoria(param, 'painel'),
    ferramenta: renderFerramenta,
  },

  go(route, param) {
    const hash = param ? `#/${route}/${param}` : `#/${route}`;
    if (location.hash === hash) {
      this.render();
    } else {
      location.hash = hash;
    }
  },

  parse() {
    const raw = location.hash.replace(/^#\//, '');
    const [route, param] = raw.split('/');
    return { route: route || 'home', param };
  },

  render() {
    const { route, param } = this.parse();
    showLoading();

    // pequeno atraso simulado para transição suave (loading state)
    setTimeout(() => {
      const fn = this.routes[route] || renderHome;
      fn(param);
      updateNavActive(route);
      hideLoading();
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 180);
  }
};

window.addEventListener('hashchange', () => Router.render());
window.addEventListener('DOMContentLoaded', () => {
  Router.render();
  setupNavToggle();
});

// =========================================================================
// HELPERS DE UI
// =========================================================================
function showLoading() {
  document.getElementById('loadingOverlay').classList.add('active');
}
function hideLoading() {
  document.getElementById('loadingOverlay').classList.remove('active');
}

function setupNavToggle() {
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('mainNav');
  toggle.addEventListener('click', () => nav.classList.toggle('open'));
}

function updateNavActive(route) {
  document.querySelectorAll('.main-nav a').forEach(a => {
    a.classList.toggle('active', a.dataset.route === route);
  });
  document.getElementById('mainNav').classList.remove('open');
}

function setBreadcrumb(items) {
  // items: [{label, route, param}] - o último item é sempre o atual (sem link)
  const el = document.getElementById('breadcrumb');
  el.innerHTML = items.map((item, i) => {
    const isLast = i === items.length - 1;
    if (isLast) return `<span class="current">${item.label}</span>`;
    return `<a href="#" onclick="Router.go('${item.route}'${item.param ? `,'${item.param}'` : ''}); return false;">${item.label}</a><span class="sep">/</span>`;
  }).join('');
}

function iconSvg(name) {
  const icons = {
    automacoes: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>',
    clientes: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21V8l9-5 9 5v13"/><path d="M9 21v-8h6v8"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>',
  };
  return icons[name] || '';
}

// =========================================================================
// VIEW: HOME
// =========================================================================
function renderHome() {
  setBreadcrumb([{ label: 'Home' }]);
  document.getElementById('app').innerHTML = `
    <section class="hero">
      <div class="hero-eyebrow">Flash Courier</div>
      <h1>Automações Ilha de Atendimento Guilherme</h1>
      <p>Central única de ferramentas operacionais e painéis por cliente, tudo em um só lugar.</p>

      <div class="home-buttons">
        <a class="home-btn" href="#/automacoes" onclick="Router.go('automacoes')">
          <span class="icon">${iconSvg('automacoes')}</span>
          <h3>Automações</h3>
          <p>Ferramentas gerais de gestão e atendimento</p>
        </a>
        <a class="home-btn" href="#/clientes" onclick="Router.go('clientes')">
          <span class="icon">${iconSvg('clientes')}</span>
          <h3>Painel Cliente</h3>
          <p>Automações organizadas por conta/cliente</p>
        </a>
      </div>
    </section>
  `;
}

// =========================================================================
// VIEW: CATÁLOGO DE AUTOMAÇÕES
// =========================================================================
function renderAutomacoes() {
  setBreadcrumb([{ label: 'Home', route: 'home' }, { label: 'Automações' }]);

  document.getElementById('app').innerHTML = `
    <div class="toolbar">
      <h2>Automações</h2>
      <div class="search-box">
        ${iconSvg('search')}
        <input type="text" id="searchFerramentas" placeholder="Pesquisar ferramenta...">
      </div>
    </div>
    <div class="card-grid" id="gridFerramentas"></div>
  `;

  renderFerramentasGrid(FERRAMENTAS);

  document.getElementById('searchFerramentas').addEventListener('input', (e) => {
    const termo = e.target.value.toLowerCase();
    const filtradas = FERRAMENTAS.filter(f =>
      f.nome.toLowerCase().includes(termo) || f.descricao.toLowerCase().includes(termo)
    );
    renderFerramentasGrid(filtradas);
  });
}

function renderFerramentasGrid(lista) {
  const grid = document.getElementById('gridFerramentas');
  if (!lista.length) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        <strong>Nenhuma ferramenta cadastrada ainda</strong>
        Assim que novas automações forem adicionadas à pasta /automacoes, elas aparecerão aqui automaticamente.
      </div>`;
    return;
  }
  grid.innerHTML = lista.map(f => `
    <div class="card">
      <span class="card-icon">${f.icone || '⚙️'}</span>
      <h3>${f.nome}</h3>
      <p>${f.descricao}</p>
      ${f.requerDNE ? `<a class="dne-download" href="${DNE_DOWNLOAD_URL}" onclick="event.stopPropagation()">⬇ Baixar base DNE (234MB)</a>` : ''}
      <a class="card-open" href="#/ferramenta/${f.id}" onclick="Router.go('ferramenta','${f.id}')">Abrir</a>
    </div>
  `).join('');
}

// =========================================================================
// VIEW: PAINEL CLIENTE (lista de clientes)
// =========================================================================
function renderClientes() {
  setBreadcrumb([{ label: 'Home', route: 'home' }, { label: 'Painel Cliente' }]);

  document.getElementById('app').innerHTML = `
    <div class="toolbar">
      <h2>Painel Cliente</h2>
      <div class="search-box">
        ${iconSvg('search')}
        <input type="text" id="searchClientes" placeholder="Pesquisar cliente...">
      </div>
    </div>
    <div class="card-grid" id="gridClientes"></div>
  `;

  renderClientesGrid(CLIENTES);

  document.getElementById('searchClientes').addEventListener('input', (e) => {
    const termo = e.target.value.toLowerCase();
    const filtrados = CLIENTES.filter(c => c.nome.toLowerCase().includes(termo));
    renderClientesGrid(filtrados);
  });
}

function renderClientesGrid(lista) {
  const grid = document.getElementById('gridClientes');
  if (!lista.length) {
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><strong>Nenhum cliente encontrado</strong></div>`;
    return;
  }
  grid.innerHTML = lista.map(c => `
    <div class="card client-card">
      <img src="${c.logo}" alt="${c.nome}" onerror="this.style.display='none'">
      <h3>${c.nome}</h3>
      <p>${c.rotina.length + c.painel.length} ferramenta(s) cadastrada(s)</p>
      <a class="card-open" href="#/cliente/${c.id}" onclick="Router.go('cliente','${c.id}')">Entrar</a>
    </div>
  `).join('');
}

// =========================================================================
// VIEW: DETALHE DO CLIENTE (ferramentas daquele cliente)
// =========================================================================
function renderClienteDetalhe(clienteId) {
  const cliente = CLIENTES.find(c => c.id === clienteId);
  if (!cliente) { Router.go('clientes'); return; }

  setBreadcrumb([
    { label: 'Home', route: 'home' },
    { label: 'Painel Cliente', route: 'clientes' },
    { label: cliente.nome }
  ]);

  document.getElementById('app').innerHTML = `
    <section class="hero" style="padding:24px 20px 40px;">
      <img src="${cliente.logo}" alt="${cliente.nome}" style="height:56px;object-fit:contain;margin-bottom:18px;">
      <h1 style="font-size:clamp(24px,3.5vw,34px);">${cliente.nome}</h1>

      <div class="home-buttons">
        <a class="home-btn" href="#/cliente-rotina/${cliente.id}" onclick="Router.go('cliente-rotina','${cliente.id}')">
          <span class="icon">📋</span>
          <h3>Rotina e Tarefas</h3>
          <p>Ferramentas do dia a dia operacional</p>
        </a>
        <a class="home-btn" href="#/cliente-painel/${cliente.id}" onclick="Router.go('cliente-painel','${cliente.id}')">
          <span class="icon">📊</span>
          <h3>Painel de Resultados</h3>
          <p>Dashboards executivos e indicadores</p>
        </a>
      </div>
    </section>
  `;
}

// =========================================================================
// VIEW: CATEGORIA DO CLIENTE (Rotina e Tarefas OU Painel de Resultados)
// =========================================================================
function renderClienteCategoria(clienteId, categoria) {
  const cliente = CLIENTES.find(c => c.id === clienteId);
  if (!cliente) { Router.go('clientes'); return; }

  const label = categoria === 'rotina' ? 'Rotina e Tarefas' : 'Painel de Resultados';
  const lista = cliente[categoria] || [];

  setBreadcrumb([
    { label: 'Home', route: 'home' },
    { label: 'Painel Cliente', route: 'clientes' },
    { label: cliente.nome, route: 'cliente', param: cliente.id },
    { label: label }
  ]);

  document.getElementById('app').innerHTML = `
    <div class="toolbar">
      <h2>${cliente.nome} · ${label}</h2>
    </div>
    <div class="card-grid" id="gridCategoriaCliente"></div>
  `;

  const grid = document.getElementById('gridCategoriaCliente');
  if (!lista.length) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        <strong>Nenhuma ferramenta cadastrada em "${label}" ainda</strong>
        Assim que forem adicionadas, aparecerão aqui automaticamente.
      </div>`;
    return;
  }
  grid.innerHTML = lista.map(f => `
    <div class="card">
      <span class="card-icon">${f.icone || '⚙️'}</span>
      <h3>${f.nome}</h3>
      <p>${f.descricao}</p>
      ${f.requerDNE ? `<a class="dne-download" href="${DNE_DOWNLOAD_URL}" onclick="event.stopPropagation()">⬇ Baixar base DNE (234MB)</a>` : ''}
      <a class="card-open" href="#/ferramenta/${f.id}" onclick="Router.go('ferramenta','${f.id}')">Abrir</a>
    </div>
  `).join('');
}

// =========================================================================
// VIEW: VISUALIZADOR DE FERRAMENTA (carrega o HTML dentro do próprio site)
// =========================================================================
function renderFerramenta(ferramentaId) {
  // procura primeiro nas ferramentas gerais, depois nas de clientes
  let ferramenta = FERRAMENTAS.find(f => f.id === ferramentaId);
  let origem = { label: 'Automações', route: 'automacoes' };

  if (!ferramenta) {
    for (const cliente of CLIENTES) {
      const todasFerramentas = [...(cliente.rotina || []), ...(cliente.painel || [])];
      const achada = todasFerramentas.find(f => f.id === ferramentaId);
      if (achada) {
        ferramenta = achada;
        const categoria = (cliente.rotina || []).includes(achada) ? 'cliente-rotina' : 'cliente-painel';
        origem = { label: cliente.nome, route: categoria, param: cliente.id };
        break;
      }
    }
  }

  if (!ferramenta) { Router.go('automacoes'); return; }

  setBreadcrumb([
    { label: 'Home', route: 'home' },
    origem,
    { label: ferramenta.nome }
  ]);

  document.getElementById('app').innerHTML = `
    <div class="tool-header">
      <h2>${ferramenta.nome}</h2>
      <a class="back-btn" href="#" onclick="history.back(); return false;">← Voltar</a>
    </div>
    ${ferramenta.requerDNE ? `
      <div class="dne-banner">
        <span>Esta ferramenta precisa da base DNE (Correios) para validar os endereços. Baixe o arquivo e anexe no campo indicado dentro da ferramenta.</span>
        <a href="${DNE_DOWNLOAD_URL}" class="dne-download-btn">⬇ Baixar base DNE (234MB)</a>
      </div>
    ` : ''}
    <div class="tool-frame-wrap">
      <iframe src="${ferramenta.arquivo}" title="${ferramenta.nome}"></iframe>
    </div>
  `;
}
