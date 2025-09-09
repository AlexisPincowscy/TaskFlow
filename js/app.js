// TaskFlow - Sistema de Gerenciamento de Tarefas
// JavaScript principal da aplicação

// Sistema de gerenciamento de dados
class TaskFlowApp {
  constructor() {
    this.currentUser = null;
    this.tasks = [];
    this.editingTaskId = null;
    this.init();
  }

  init() {
    this.loadData();
    this.attachEventListeners();
    this.checkAuth();
  }

  // Gerenciamento de dados LocalStorage
  loadData() {
    const users = localStorage.getItem("taskflow_users");
    this.users = users ? JSON.parse(users) : [];

    const currentUser = localStorage.getItem("taskflow_current_user");
    if (currentUser) {
      this.currentUser = JSON.parse(currentUser);
      this.loadUserTasks();
    }
  }

  saveUsers() {
    localStorage.setItem("taskflow_users", JSON.stringify(this.users));
  }

  saveCurrentUser() {
    localStorage.setItem(
      "taskflow_current_user",
      JSON.stringify(this.currentUser)
    );
  }

  saveTasks() {
    localStorage.setItem(
      `taskflow_tasks_${this.currentUser.id}`,
      JSON.stringify(this.tasks)
    );
  }

  loadUserTasks() {
    const tasks = localStorage.getItem(`taskflow_tasks_${this.currentUser.id}`);
    this.tasks = tasks ? JSON.parse(tasks) : [];
  }

  // Autenticação
  checkAuth() {
    if (this.currentUser) {
      this.showTaskList();
      this.updateUserInfo();
    } else {
      this.showLogin();
    }
  }

  register(name, email, password) {
    // Verificar se o email já existe
    const existingUser = this.users.find((user) => user.email === email);
    if (existingUser) {
      this.showAlert("Este email já está cadastrado!", "danger");
      return false;
    }

    // Criar novo usuário
    const newUser = {
      id: Date.now().toString(),
      name: name,
      email: email,
      password: password, // Em produção, deve ser hasheado
      createdAt: new Date().toISOString(),
    };

    this.users.push(newUser);
    this.saveUsers();
    this.showAlert(
      "Conta criada com sucesso! Faça login para continuar.",
      "success"
    );
    this.showLogin();
    return true;
  }

  login(email, password) {
    const user = this.users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      this.currentUser = user;
      this.saveCurrentUser();
      this.loadUserTasks();
      this.showTaskList();
      this.updateUserInfo();
      return true;
    } else {
      this.showAlert("Email ou senha incorretos!", "danger");
      return false;
    }
  }

  logout() {
    this.currentUser = null;
    this.tasks = [];
    localStorage.removeItem("taskflow_current_user");
    this.showLogin();
  }

  // Gerenciamento de tarefas
  createTask(taskData) {
    const newTask = {
      id: Date.now().toString(),
      title: taskData.title,
      description: taskData.description,
      dueDate: taskData.dueDate,
      priority: taskData.priority,
      category: taskData.category,
      status: "pendente",
      createdAt: new Date().toISOString(),
      userId: this.currentUser.id,
    };

    this.tasks.push(newTask);
    this.saveTasks();
    this.renderTasks();
    this.updateStats();
    this.showAlert("Tarefa criada com sucesso!", "success");
    this.showTaskList();
  }

  updateTask(taskId, taskData) {
    const taskIndex = this.tasks.findIndex((task) => task.id === taskId);
    if (taskIndex !== -1) {
      this.tasks[taskIndex] = {
        ...this.tasks[taskIndex],
        title: taskData.title,
        description: taskData.description,
        dueDate: taskData.dueDate,
        priority: taskData.priority,
        category: taskData.category,
        updatedAt: new Date().toISOString(),
      };
      this.saveTasks();
      this.renderTasks();
      this.updateStats();
      this.showAlert("Tarefa atualizada com sucesso!", "success");
      this.showTaskList();
    }
  }

  deleteTask(taskId) {
    if (confirm("Tem certeza que deseja excluir esta tarefa?")) {
      this.tasks = this.tasks.filter((task) => task.id !== taskId);
      this.saveTasks();
      this.renderTasks();
      this.updateStats();
      this.showAlert("Tarefa excluída com sucesso!", "success");
    }
  }

  toggleTaskStatus(taskId) {
    const task = this.tasks.find((task) => task.id === taskId);
    if (task) {
      task.status = task.status === "pendente" ? "concluida" : "pendente";
      task.completedAt =
        task.status === "concluida" ? new Date().toISOString() : null;
      this.saveTasks();
      this.renderTasks();
      this.updateStats();
    }
  }

  editTask(taskId) {
    const task = this.tasks.find((task) => task.id === taskId);
    if (task) {
      this.editingTaskId = taskId;
      document.getElementById("taskTitle").value = task.title;
      document.getElementById("taskDescription").value = task.description;
      document.getElementById("taskDate").value = task.dueDate;
      document.getElementById("taskPriority").value = task.priority;
      document.getElementById("taskCategory").value = task.category;
      document.getElementById("submitBtnText").textContent = "Atualizar Tarefa";
      document.querySelector("#createTaskScreen .subtitle").textContent =
        "Editar Tarefa";
      this.showCreateTask();
    }
  }

  // Filtros
  applyFilters() {
    const statusFilter = document.getElementById("filterStatus").value;
    const priorityFilter = document.getElementById("filterPriority").value;
    const categoryFilter = document.getElementById("filterCategory").value;

    let filteredTasks = this.tasks;

    if (statusFilter) {
      filteredTasks = filteredTasks.filter(
        (task) => task.status === statusFilter
      );
    }

    if (priorityFilter) {
      filteredTasks = filteredTasks.filter(
        (task) => task.priority === priorityFilter
      );
    }

    if (categoryFilter) {
      filteredTasks = filteredTasks.filter(
        (task) => task.category === categoryFilter
      );
    }

    this.renderFilteredTasks(filteredTasks);
  }

  clearFilters() {
    document.getElementById("filterStatus").value = "";
    document.getElementById("filterPriority").value = "";
    document.getElementById("filterCategory").value = "";
    this.renderTasks();
  }

  // Renderização
  renderTasks() {
    this.renderFilteredTasks(this.tasks);
  }

  renderFilteredTasks(tasks) {
    const tbody = document.getElementById("taskTableBody");
    tbody.innerHTML = "";

    if (tasks.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; padding: 40px; color: #7f8c8d;">
            <i class="fas fa-inbox" style="font-size: 48px; margin-bottom: 15px; display: block;"></i>
            Nenhuma tarefa encontrada
          </td>
        </tr>
      `;
      return;
    }

    tasks.forEach((task) => {
      const row = this.createTaskRow(task);
      tbody.appendChild(row);
    });
  }

  createTaskRow(task) {
    const tr = document.createElement("tr");
    tr.className = "task-row";

    if (task.status === "concluida") {
      tr.classList.add("task-completed");
    }

    if (this.isOverdue(task)) {
      tr.classList.add("task-overdue");
    }

    const dueDate = new Date(task.dueDate).toLocaleDateString("pt-BR");
    const categoryIcon = this.getCategoryIcon(task.category);
    const priorityClass = `priority-${task.priority}`;
    const statusClass = `status-${task.status}`;

    tr.innerHTML = `
      <td>
        <div class="task-info">
          <span class="task-name">${task.title}</span>
          <span class="task-description">${task.description || ""}</span>
        </div>
      </td>
      <td>${dueDate}</td>
      <td><span class="priority-badge ${priorityClass}">${this.capitalize(
      task.priority
    )}</span></td>
      <td>${categoryIcon} ${this.capitalize(task.category)}</td>
      <td><span class="status-badge ${statusClass}">${this.capitalize(
      task.status
    )}</span></td>
      <td>
        <div class="task-actions">
          <button class="action-btn complete-btn" onclick="app.toggleTaskStatus('${
            task.id
          }')" title="${task.status === "pendente" ? "Concluir" : "Reabrir"}">
            <i class="fas fa-${
              task.status === "pendente" ? "check" : "undo"
            }"></i>
          </button>
          <button class="action-btn edit-btn" onclick="app.editTask('${
            task.id
          }')" title="Editar">
            <i class="fas fa-edit"></i>
          </button>
          <button class="action-btn delete-btn" onclick="app.deleteTask('${
            task.id
          }')" title="Excluir">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </td>
    `;

    return tr;
  }

  getCategoryIcon(category) {
    const icons = {
      trabalho: '<i class="fas fa-briefcase" style="color: #e74c3c"></i>',
      pessoal: '<i class="fas fa-user" style="color: #3498db"></i>',
      saude: '<i class="fas fa-dumbbell" style="color: #27ae60"></i>',
      estudos: '<i class="fas fa-book" style="color: #f39c12"></i>',
      casa: '<i class="fas fa-home" style="color: #9b59b6"></i>',
    };
    return (
      icons[category] || '<i class="fas fa-tag" style="color: #95a5a6"></i>'
    );
  }

  updateStats() {
    const total = this.tasks.length;
    const pending = this.tasks.filter(
      (task) => task.status === "pendente"
    ).length;
    const completed = this.tasks.filter(
      (task) => task.status === "concluida"
    ).length;
    const overdue = this.tasks.filter(
      (task) => this.isOverdue(task) && task.status === "pendente"
    ).length;

    document.getElementById("totalTasks").textContent = total;
    document.getElementById("pendingTasks").textContent = pending;
    document.getElementById("completedTasks").textContent = completed;
    document.getElementById("overdueTasks").textContent = overdue;

    // Atualizar barra de progresso
    const progressPercentage = total > 0 ? (completed / total) * 100 : 0;
    document.querySelector(
      ".progress-fill"
    ).style.width = `${progressPercentage}%`;
  }

  updateUserInfo() {
    if (this.currentUser) {
      document.querySelector(".user-name").textContent = this.currentUser.name;
      document.querySelector(".avatar").textContent = this.currentUser.name
        .charAt(0)
        .toUpperCase();
    }
  }

  isOverdue(task) {
    if (task.status === "concluida") return false;
    const today = new Date();
    const dueDate = new Date(task.dueDate);
    return dueDate < today;
  }

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // Interface
  showLogin() {
    this.hideAllScreens();
    document.getElementById("loginScreen").classList.add("active");
  }

  showSignup() {
    this.hideAllScreens();
    document.getElementById("signupScreen").classList.add("active");
  }

  showTaskList() {
    this.hideAllScreens();
    document.getElementById("taskListScreen").classList.add("active");
    this.renderTasks();
    this.updateStats();
  }

  showCreateTask() {
    this.hideAllScreens();
    document.getElementById("createTaskScreen").classList.add("active");
  }

  hideAllScreens() {
    document.querySelectorAll(".screen").forEach((screen) => {
      screen.classList.remove("active");
    });
  }

  cancelTaskForm() {
    this.editingTaskId = null;
    document.getElementById("createTaskForm").reset();
    document.getElementById("submitBtnText").textContent = "Criar Tarefa";
    document.querySelector("#createTaskScreen .subtitle").textContent =
      "Criar Nova Tarefa";
    this.showTaskList();
  }

  showAlert(message, type) {
    // Remove alertas existentes
    const existingAlerts = document.querySelectorAll(".alert");
    existingAlerts.forEach((alert) => alert.remove());

    // Cria novo alerta
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;

    // Adiciona ao primeiro screen ativo
    const activeScreen = document.querySelector(
      ".screen.active .screen-content"
    );
    if (activeScreen) {
      activeScreen.insertBefore(alert, activeScreen.firstChild);

      // Remove após 5 segundos
      setTimeout(() => {
        alert.remove();
      }, 5000);
    }
  }

  // Event Listeners
  attachEventListeners() {
    // Login form
    document.getElementById("loginForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      this.login(email, password);
    });

    // Signup form
    document.getElementById("signupForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("signupName").value;
      const email = document.getElementById("signupEmail").value;
      const password = document.getElementById("signupPassword").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      if (password !== confirmPassword) {
        this.showAlert("As senhas não coincidem!", "danger");
        return;
      }

      this.register(name, email, password);
    });

    // Create/Edit task form
    document
      .getElementById("createTaskForm")
      .addEventListener("submit", (e) => {
        e.preventDefault();
        const taskData = {
          title: document.getElementById("taskTitle").value,
          description: document.getElementById("taskDescription").value,
          dueDate: document.getElementById("taskDate").value,
          priority: document.getElementById("taskPriority").value,
          category: document.getElementById("taskCategory").value,
        };

        if (this.editingTaskId) {
          this.updateTask(this.editingTaskId, taskData);
          this.editingTaskId = null;
        } else {
          this.createTask(taskData);
        }

        document.getElementById("createTaskForm").reset();
        document.getElementById("submitBtnText").textContent = "Criar Tarefa";
        document.querySelector("#createTaskScreen .subtitle").textContent =
          "Criar Nova Tarefa";
      });

    // Filtros
    document
      .getElementById("filterStatus")
      .addEventListener("change", () => this.applyFilters());
    document
      .getElementById("filterPriority")
      .addEventListener("change", () => this.applyFilters());
    document
      .getElementById("filterCategory")
      .addEventListener("change", () => this.applyFilters());
  }
}

// Funções globais para compatibilidade
function showLogin() {
  app.showLogin();
}

function showSignup() {
  app.showSignup();
}

function showTaskList() {
  app.showTaskList();
}

function showCreateTask() {
  app.showCreateTask();
}

function cancelTaskForm() {
  app.cancelTaskForm();
}

function clearFilters() {
  app.clearFilters();
}

// Inicializar aplicação
let app;
document.addEventListener("DOMContentLoaded", function () {
  app = new TaskFlowApp();

  // Adicionar algumas tarefas de exemplo se for o primeiro uso
  if (app.currentUser && app.tasks.length === 0) {
    const sampleTasks = [
      {
        id: "1",
        title: "Comprar mantimentos",
        description: "Ir ao supermercado comprar itens da lista",
        dueDate: "2025-12-31",
        priority: "alta",
        category: "casa",
        status: "pendente",
        createdAt: new Date().toISOString(),
        userId: app.currentUser.id,
      },
      {
        id: "2",
        title: "Responder e-mails",
        description: "Verificar caixa de entrada e responder pendências",
        dueDate: "2025-12-15",
        priority: "media",
        category: "trabalho",
        status: "pendente",
        createdAt: new Date().toISOString(),
        userId: app.currentUser.id,
      },
      {
        id: "3",
        title: "Ir à academia",
        description: "Treino de pernas - série completa",
        dueDate: "2025-12-10",
        priority: "baixa",
        category: "saude",
        status: "concluida",
        createdAt: new Date().toISOString(),
        userId: app.currentUser.id,
      },
    ];

    app.tasks = sampleTasks;
    app.saveTasks();
    app.renderTasks();
    app.updateStats();
  }
});
