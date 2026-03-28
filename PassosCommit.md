# Guia de Commits e Histórico de Alterações — PassGeneration

---

## 📌 Parte 1 — Commits Necessários

Execute os comandos abaixo no terminal dentro da pasta do projeto.

### Primeiro: Configurar o repositório (apenas uma vez)

```bash
# Inicializa o git (se ainda não foi feito)
git init

# Conecta ao repositório remoto do GitHub
git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
```

---

### Commit 1 — Estrutura base do navegador e telas iniciais

```bash
git add App.js screens/SignInScreen.js screens/SignUpScreen.js
git commit -m "feat: adicionar telas de SignIn e SignUp com navegação"
```

**O que inclui:**
- `App.js` atualizado com 4 rotas: SignIn, SignUp, Home e History
- `SignInScreen.js`: tela de login com validação (botão ENTRAR desabilitado sem email/senha)
- `SignUpScreen.js`: tela de cadastro com validação (botão REGISTRAR desabilitado sem dados e senhas iguais)
- Após registrar, email é passado automaticamente para a tela de SignIn

---

### Commit 2 — Evolução da tela Home com modal de salvar senha

```bash
git add screens/HomeScreen.js
git commit -m "feat: adicionar botao Salvar e modal de cadastro de senha na Home"
```

**O que inclui:**
- Botão **SALVAR** adicionado (desabilitado até gerar senha)
- Modal "CADASTRO DE SENHA" com:
  - Campo "Nome do aplicativo" (editável)
  - Campo "Senha gerada" (somente leitura)
  - Botão **CRIAR** (desabilitado sem nome) — salva no AsyncStorage
  - Botão **CANCELAR** — fecha a modal
- Botão **COPIAR** mantido com funcionamento original
- Dados salvos no AsyncStorage como objeto `{ id, name, pass }`

---

### Commit 3 — Evolução da tela de Histórico com cards interativos

```bash
git add screens/HistoryScreen.js
git commit -m "feat: reescrever historico com cards, emojis e ofuscacao de senha"
```

**O que inclui:**
- Senhas exibidas em **cards** com nome do aplicativo
- Senha **ofuscada** por padrão (`********`)
- Emojis interativos:
  - 👁️ / 😑 — Mostrar/ocultar a senha
  - ✋ — Copiar a senha
  - 🗑️ — Excluir o item do histórico e do AsyncStorage
- Estado de visibilidade **resetado** ao sair e voltar para a tela

---

### Commit 4 — Documentação

```bash
git add README.md PassosCommit.md
git commit -m "docs: adicionar README e guia de commits"
```

---

### Commit final — Enviar tudo para o GitHub

```bash
git branch -M main
git push -u origin main
```

---

## 📋 Parte 2 — O que foi feito no sistema

### App.js — Configuração de Rotas

- Adicionadas as rotas `SignIn`, `SignUp`, `Home` e `History`
- A tela inicial agora é **SignIn** (`initialRouteName="SignIn"`)
- Todas as telas acessíveis pelo stack navigator

---

### SignInScreen.js — Tela de Login

- Campos de **Email** e **Senha** com labels acima de cada campo
- Botão **ENTRAR** desabilitado (opacidade reduzida) até ambos os campos serem preenchidos
- Ao clicar em ENTRAR → navega para `Home`
- Link "Não possui conta ainda? Crie agora." → navega para `SignUp`
- Quando vindo do SignUp, o campo de email já vem preenchido com o e-mail digitado no cadastro
- Visual: fundo branco, título azul, inputs com fundo ciano (`#5bc0eb`) e bordas pretas

---

### SignUpScreen.js — Tela de Cadastro

- Campos: **Nome**, **Email**, **Senha**, **Confirmar Senha**
- Botão **REGISTRAR** desabilitado até:
  - Todos os campos preenchidos, E
  - `Senha` === `Confirmar Senha`
- Ao clicar em REGISTRAR → navega para `SignIn` passando o e-mail como parâmetro
- Link "Voltar" → volta para a tela anterior (SignIn)
- Visual idêntico ao SignIn

---

### HomeScreen.js — Gerador de Senha

- Botão **GERAR SENHA** → gera senha aleatória de 8 caracteres
- Botão **SALVAR** → abre modal (desabilitado até gerar senha)
- Botão **COPIAR** → copia a senha gerada para área de transferência
- Link "Ver Senhas" → navega para Histórico
- **Modal "CADASTRO DE SENHA":**
  - Campo "Nome do aplicativo" (editável)
  - Campo "Senha gerada" (read-only com fundo cinza)
  - Botão CRIAR (desabilitado sem nome preenchido) → salva e navega para Histórico
  - Botão CANCELAR → fecha a modal

---

### HistoryScreen.js — Histórico de Senhas

- Carrega dados do `AsyncStorage` a cada vez que a tela recebe foco
- Exibe cards com: **nome do aplicativo** + **senha ofuscada**
- Emojis de ação por card:
  - 👁️ / 😑: alterna visibilidade da senha (estado individual por card)
  - ✋: copia a senha para o clipboard com alerta de confirmação
  - 🗑️: remove o item da lista e do AsyncStorage permanentemente
- Ao sair e voltar para a tela, **todas as senhas voltam a ser ofuscadas**

---

### service/passwordService.js — Geração de Senha

- Função `generatePassword()` gera uma senha de 8 caracteres aleatórios
- Usa letras maiúsculas, minúsculas, números e símbolos especiais

