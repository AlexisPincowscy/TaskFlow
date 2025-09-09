# TaskFlow - Sistema de Gerenciamento de Tarefas

## 📋 Sobre o Projeto

TaskFlow é um sistema completo de gerenciamento de tarefas desenvolvido em HTML5, CSS3 e JavaScript vanilla. O sistema oferece funcionalidades completas de CRUD (Create, Read, Update, Delete) para tarefas, sistema de autenticação, filtros avançados e interface responsiva.

## 🚀 Funcionalidades Implementadas

### ✅ Autenticação de Usuários

- **Cadastro**: Registro de novos usuários com validação de campos
- **Login**: Autenticação segura com verificação de credenciais
- **Logout**: Encerramento seguro da sessão
- **Persistência**: Dados salvos no LocalStorage do navegador

### ✅ Gerenciamento Completo de Tarefas

- **Criação**: Adicionar novas tarefas com todos os campos
- **Edição**: Modificar tarefas existentes
- **Exclusão**: Remover tarefas com confirmação
- **Conclusão**: Marcar tarefas como concluídas/pendentes
- **Campos**: Título, descrição, prazo, prioridade, categoria, status

### ✅ Sistema de Filtros

- **Por Status**: Filtrar por pendente/concluída
- **Por Prioridade**: Filtrar por alta/média/baixa
- **Por Categoria**: Filtrar por trabalho/pessoal/saúde/estudos/casa
- **Limpar Filtros**: Reset rápido de todos os filtros

### ✅ Dashboard e Estatísticas

- **Contadores**: Total, pendentes, concluídas, atrasadas
- **Barra de Progresso**: Visualização do percentual de conclusão
- **Indicadores Visuais**: Tarefas atrasadas destacadas
- **Interface Responsiva**: Adaptável a diferentes tamanhos de tela

## 📁 Estrutura do Projeto

### Estrutura da Aplicação

```
taskflow-app/
├── index.html          # Página de login (entrada da aplicação)
├── css/
│   └── styles.css      # Estilos CSS organizados
├── js/
│   └── app.js          # JavaScript completo da aplicação (SPA original)
└── pages/              # Páginas separadas
    ├── login.html      # Página de login (versão alternativa)
    ├── signup.html     # Página de cadastro
    ├── dashboard.html  # Painel principal de tarefas
    └── create-task.html # Criação/edição de tarefas
    ├── login.html      # Página de login
    ├── signup.html     # Página de cadastro
    ├── dashboard.html  # Dashboard principal
    └── create-task.html # Criação/edição de tarefas
```

## 🛠️ Como Usar

### Executar o Projeto

1. **Iniciar a Aplicação**:

   - Abra o arquivo `index.html` no navegador
   - Esta é a página de login principal da aplicação
   - A partir daí você pode acessar o cadastro ou fazer login

2. **Navegação**:
   - **index.html**: Página de login (entrada principal)
   - **pages/signup.html**: Cadastro de novos usuários
   - **pages/dashboard.html**: Painel de tarefas (após login)
   - **pages/create-task.html**: Criação/edição de tarefas

### Primeiro Uso

1. **Cadastro**:

   - Na página de login, clique em "Criar conta"
   - Preencha: nome, email, senha e confirmação
   - Clique em "Criar conta"
   - Você será redirecionado para o login

2. **Login**:

   - Na página inicial (index.html), use o email e senha cadastrados
   - Clique em "Entrar"
   - Você será direcionado para o dashboard

3. **Usar o Sistema**:
   - **Dashboard**: Visualize todas as suas tarefas, filtre por status/prioridade
   - **Nova Tarefa**: Clique no botão "+" para criar tarefas
   - **Editar**: Clique no ícone de edição na lista de tarefas
   - **Logout**: Use o botão "Sair" para retornar ao login

## 🎨 Características Técnicas

### Arquitetura da Aplicação

O TaskFlow foi desenvolvido utilizando uma arquitetura **client-side** pura, executando completamente no navegador sem necessidade de servidor. Esta abordagem garante simplicidade de implantação, facilidade de uso e funcionamento offline.

### Descrição da Arquitetura

• **Frontend**: Interface completa construída com HTML5, CSS3 e JavaScript vanilla (ES6+). Responsável por toda a lógica de apresentação, validação e interação do usuário.

• **Armazenamento**: Utilização do **LocalStorage** do navegador para persistência local dos dados de usuários e tarefas, garantindo funcionamento offline.

• **Navegação**: Sistema multi-página com `index.html` como ponto de entrada (login) e páginas separadas para cada funcionalidade.

### Linguagens e Ferramentas Utilizadas

• **Linguagens**: HTML5, CSS3, JavaScript (ES6+)

• **Bibliotecas**: Font Awesome (ícones)

• **Armazenamento**: LocalStorage API (navegador)

• **Ferramentas de Desenvolvimento**: Visual Studio Code

### Frontend

- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Design moderno com gradientes e animações
- **JavaScript ES6+**: Funcionalidades avançadas e orientação a objetos

### Funcionalidades JavaScript

- **Classe Principal**: `TaskFlowApp` gerencia todo o estado da aplicação
- **LocalStorage**: Persistência de dados no navegador
- **Event Listeners**: Interações responsivas
- **Validação**: Verificação de formulários e dados
- **Filtros Dinâmicos**: Sistema de busca e organização

### Design e UX

- **Responsivo**: Adapta-se a desktop, tablet e mobile
- **Animações**: Transições suaves e feedback visual
- **Ícones**: Font Awesome para interface profissional
- **Cores**: Paleta moderna e acessível
- **Tipografia**: Fonte legível e hierarquia clara

## 🔧 Personalização

### Modificar Categorias

No arquivo `js/app.js`, localize o método `getCategoryIcon()` para adicionar/modificar categorias:

```javascript
getCategoryIcon(category) {
  const icons = {
    trabalho: '<i class="fas fa-briefcase" style="color: #e74c3c"></i>',
    pessoal: '<i class="fas fa-user" style="color: #3498db"></i>',
    // Adicione mais categorias aqui
  };
}
```

### Modificar Estilos

Edite o arquivo `css/styles.css` para personalizar:

- Cores da paleta
- Tamanhos e espaçamentos
- Animações e transições
- Layout responsivo

## 🌟 Funcionalidades Destacadas

### Sistema de Prioridades

- **Alta**: Destacado em vermelho
- **Média**: Destacado em amarelo
- **Baixa**: Destacado em verde

### Indicadores Visuais

- **Tarefas Concluídas**: Riscadas e com opacidade reduzida
- **Tarefas Atrasadas**: Fundo destacado em vermelho claro
- **Progress Bar**: Mostra percentual de conclusão

### Validações

- **Formulários**: Campos obrigatórios verificados
- **Senhas**: Confirmação de senha no cadastro
- **Datas**: Verificação de prazos vencidos
- **Email**: Validação de formato

## 📱 Compatibilidade

- **Navegadores**: Chrome, Firefox, Safari, Edge (versões modernas)
- **Dispositivos**: Desktop, tablet, smartphone
- **Resolução**: Responsivo a partir de 320px
- **Requisitos**: Apenas um navegador moderno com suporte ao ES6+ e LocalStorage

## 🔒 Segurança

⚠️ **Importante**: Este é um projeto de demonstração que utiliza LocalStorage para persistência client-side. Para uso em produção, recomenda-se implementar:

- Backend com API RESTful (Node.js/Express, PHP, Python, etc.)
- Banco de dados robusto (PostgreSQL, MySQL, MongoDB)
- Criptografia de senhas (bcrypt, Argon2)
- Autenticação JWT ou sessões seguras
- Validação server-side
- Proteção contra XSS e CSRF

## 📈 Possíveis Melhorias

### Para Produção
- [ ] Backend com API RESTful (Node.js/Express, Django, Laravel)
- [ ] Banco de dados relacional (PostgreSQL, MySQL) ou NoSQL (MongoDB)
- [ ] Sistema de autenticação robusto (JWT, OAuth)
- [ ] Criptografia e hash de senhas
- [ ] Validação server-side

### Funcionalidades Adicionais
- [ ] Sistema de notificações push
- [ ] Colaboração em tarefas (múltiplos usuários)
- [ ] Anexos de arquivos
- [ ] Comentários em tarefas
- [ ] Relatórios e analytics
- [ ] Integração com calendários
- [ ] Modo escuro/claro
- [ ] Aplicativo mobile (PWA)
- [ ] Sincronização em nuvem
- [ ] Exportação de dados (CSV, PDF)

## 📞 Suporte

Para dúvidas ou sugestões sobre o TaskFlow, abra uma issue no repositório ou entre em contato com a equipe de desenvolvimento.

---

**TaskFlow** - Organize suas tarefas com eficiência! 🚀
