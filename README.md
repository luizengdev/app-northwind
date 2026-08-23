# 🧪 app-northwind | E2E QA Automation Suite 🚀

![Project Status](https://img.shields.io/badge/Status-Em_Desenvolvimento-yellow?style=for-the-badge&logo=git)
![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![GitHub Actions](https://img.shields.io/badge/CI%2FCD-GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

> 💡 **Nota:** Este é um **documento vivo**. À medida que novas suítes de testes, padrões de projeto (*Page Object Model*) e pipelines forem implementados, esta documentação será continuamente refinada e expandida.

---

## 📌 Sobre o Projeto

O **`app-northwind`** é um projeto prático de Engenharia de Qualidade (QA) focado no desenvolvimento de uma suíte robusta de testes ponta a ponta (**End-to-End - E2E**) aplicada a um sistema web real.

O objetivo principal é consolidar padrões de automação moderna com **Playwright** e **JavaScript puro**, simulando fluxos críticos de usuários, validações de regras de negócio, testes de regressão e garantia de qualidade contínua integrada via **CI/CD no GitHub Actions**.

---

## 🛠️ Tecnologias & Ferramentas

| Ferramenta | Finalidade |
| :--- | :--- |
| **[Playwright](https://playwright.dev/)** | Framework principal para automação de testes E2E modernos e rápidos. |
| **[JavaScript (ES6+)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)** | Linguagem base para escrita dos scripts de teste e utilitários. |
| **[Node.js](https://nodejs.org/)** | Ambiente de execução JavaScript (*runtime*). |
| **[Git & GitHub (SSH)](https://github.com/)** | Controle de versão seguro e hospedagem do repositório remoto. |
| **[GitHub Actions](https://github.com/features/actions)** | Pipeline de Integração Contínua (CI) para execução autônoma dos testes. |

---

## 🧭 Roadmap & Progresso

Acompanhamento das etapas de evolução da suíte de automação:

- [x] ⚙️ **Ambiente Base:** Node.js e ferramentas de desenvolvimento configuradas
- [x] 🔑 **Git & SSH:** Repositório inicializado e versionado com segurança
- [x] 🎭 **Playwright Core:** Framework instalado e configurações iniciais aplicadas
- [ ] 🏗️ **Arquitetura:** Implementação do padrão *Page Object Model (POM)*
- [ ] 🧪 **Smoke Tests:** Criação dos primeiros testes dos fluxos mais críticos
- [ ] 🔄 **CI/CD Pipeline:** Configuração do GitHub Actions para execução a cada *Push/PR*
- [ ] 📊 **Relatórios:** Configuração do gerador de relatórios e artefatos de teste (HTML Report / Traces)
- [ ] 📦 **Regressão Completa:** Cobertura de cenários alternativos e fluxos de exceção

---

## 📂 Estrutura de Pastas Sugerida

```plaintext
app-northwind/
├── .github/
│   └── workflows/
│       └── e2e-tests.yml        # Pipeline de CI/CD (GitHub Actions)
├── tests/
│   ├── e2e/                     # Cenários de testes E2E
│   │   ├── auth.spec.js
│   │   └── orders.spec.js
│   └── pages/                   # Mapeamento de telas (Page Objects)
│       ├── LoginPage.js
│       └── DashboardPage.js
├── utils/                       # Métodos auxiliares, fixtures e dados estáticos
│   └── helpers.js
├── .gitignore                   # Arquivos ignorados pelo Git
├── package.json                 # Dependências e scripts do projeto
├── playwright.config.js         # Configurações globais do Playwright
└── README.md                    # Documentação do projeto