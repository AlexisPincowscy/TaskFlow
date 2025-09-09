# TaskFlow - Instruções de Execução

## 🚀 Como Executar o Projeto

### Opção 1: Abertura Direta (Mais Simples)
1. Navegue até a pasta `taskflow-app`
2. Clique duas vezes no arquivo `index.html`
3. O sistema abrirá no seu navegador padrão

### Opção 2: Servidor Local (Recomendado)
```bash
# Navegue até a pasta do projeto
cd taskflow-app

# Opção A: Python (se instalado)
python -m http.server 8080

# Opção B: Node.js (se instalado)
npx http-server -p 8080 -o

# Opção C: Live Server (para desenvolvimento)
npx live-server --port=8080
```

Depois acesse: http://localhost:8080

### Opção 3: Páginas Separadas
1. Vá para a pasta `pages/`
2. Abra `login.html` para começar
3. Navegue pelas páginas independentes

## 📁 Estrutura de Arquivos

```
taskflow-app/
├── index.html              # 🏠 Aplicação completa (SPA)
├── README.md               # 📖 Documentação principal
├── package.json            # ⚙️ Configurações do projeto
├── SETUP.md                # 🛠️ Este arquivo
├── css/
│   └── styles.css          # 🎨 Todos os estilos CSS
├── js/
│   └── app.js              # ⚡ JavaScript principal
└── pages/                  # 📄 Páginas separadas
    ├── login.html          # 🔐 Tela de login
    ├── signup.html         # 📝 Tela de cadastro
    ├── dashboard.html      # 📊 Dashboard principal
    └── create-task.html    # ➕ Criar/editar tarefas
```

## 🔧 Funcionalidades Principais

### ✅ Sistema de Autenticação
- **Cadastro**: Registrar novos usuários
- **Login**: Entrar no sistema
- **Logout**: Sair com segurança

### ✅ Gerenciamento de Tarefas
- **Criar**: Adicionar novas tarefas
- **Editar**: Modificar tarefas existentes
- **Excluir**: Remover tarefas
- **Concluir**: Marcar como concluída/pendente

### ✅ Organização e Filtros
- **Prioridades**: Alta, Média, Baixa
- **Categorias**: Trabalho, Pessoal, Saúde, Estudos, Casa
- **Status**: Pendente, Concluída
- **Filtros**: Buscar por qualquer combinação

### ✅ Dashboard e Estatísticas
- **Contadores**: Total, pendentes, concluídas, atrasadas
- **Progresso**: Barra visual de conclusão
- **Alertas**: Tarefas com prazo vencido

## 💾 Persistência de Dados

Os dados são salvos automaticamente no LocalStorage do navegador:
- **Usuários**: Informações de cadastro
- **Tarefas**: Todas as tarefas criadas
- **Sessão**: Estado de login

⚠️ **Importante**: Os dados ficam salvos apenas no navegador atual.

## 🎯 Teste Rápido

### Dados de Exemplo
O sistema inclui tarefas de exemplo para demonstração:
1. "Comprar mantimentos" (Prioridade Alta, Casa)
2. "Responder e-mails" (Prioridade Média, Trabalho)
3. "Ir à academia" (Prioridade Baixa, Saúde) - Concluída

### Fluxo de Teste
1. **Cadastre-se** com qualquer email e senha
2. **Faça login** com as credenciais criadas
3. **Explore** as tarefas de exemplo no dashboard
4. **Crie** uma nova tarefa
5. **Edite** ou **exclua** tarefas existentes
6. **Use os filtros** para organizar visualização

## 🛠️ Desenvolvimento

### Tecnologias Utilizadas
- **HTML5**: Estrutura semântica
- **CSS3**: Design responsivo moderno
- **JavaScript ES6+**: Funcionalidades interativas
- **Font Awesome**: Ícones profissionais
- **LocalStorage API**: Persistência local

### Arquitetura
- **SPA (Single Page Application)**: Uma página com múltiplas telas
- **Multi-Page**: Páginas separadas para cada funcionalidade
- **Class-based JS**: Código orientado a objetos
- **Responsive Design**: Mobile-first approach

## 🔍 Resolução de Problemas

### Problema: "Não carrega no navegador"
**Solução**: Use um servidor local (Python/Node.js) em vez de abrir diretamente

### Problema: "Dados não salvam"
**Solução**: Verifique se o navegador permite LocalStorage

### Problema: "Layout quebrado no mobile"
**Solução**: O design é responsivo - teste em diferentes resoluções

### Problema: "JavaScript não funciona"
**Solução**: Verifique o console do navegador (F12) para erros

## 📱 Teste Responsivo

### Desktop (1200px+)
- Layout completo com sidebar
- Todas as funcionalidades visíveis
- Grid de estatísticas em 4 colunas

### Tablet (768px - 1199px)
- Layout adaptado
- Grid de estatísticas em 2 colunas
- Navegação otimizada

### Mobile (< 768px)
- Layout verticalizado
- Grid de estatísticas em 1 coluna
- Interface touch-friendly

## 🚀 Deploy e Hospedagem

### GitHub Pages
1. Faça upload da pasta para um repositório GitHub
2. Ative o GitHub Pages nas configurações
3. Acesse via `username.github.io/taskflow-app`

### Netlify
1. Arraste a pasta para o Netlify Drop
2. Site ficará disponível imediatamente

### Servidor Próprio
1. Faça upload de todos os arquivos
2. Configure servidor para servir arquivos estáticos
3. Aponte domínio para a pasta

---

**Pronto para usar! 🎉**

Para dúvidas, consulte o README.md ou abra uma issue no repositório.
