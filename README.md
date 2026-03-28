# PassGeneration — Gerador de Senhas

Aplicativo mobile de **geração e gerenciamento de senhas** desenvolvido em **React Native com Expo**.

Permite criar senhas aleatórias, salvá-las com uma etiqueta (nome do aplicativo/finalidade) e consultar o histórico de senhas com opções de visualizar, copiar e excluir.

---

## 📱 Telas do Aplicativo

| Tela | Descrição |
|---|---|
| **Sign In** | Primeira tela. Login com email e senha. Botão ENTRAR habilitado apenas com ambos preenchidos. |
| **Sign Up** | Cadastro com Nome, Email, Senha e Confirmação. Botão REGISTRAR só ativa com tudo preenchido e senhas iguais. Após registrar, redireciona para Sign In com o e-mail já preenchido. |
| **Home** | Gera senha aleatória. Botões para Salvar (abre modal), Copiar e navegar para o Histórico. |
| **Histórico** | Lista as senhas salvas em cards. Cada card tem emojis para ver/ocultar (👁️), copiar (✋) e excluir (🗑️). |

---

## 🚀 Como rodar o projeto

### Pré-requisitos

Antes de começar, instale:

- **[Node.js](https://nodejs.org/)** — versão LTS recomendada
  - Verifique com: `node -v`
- **[Git](https://git-scm.com/)** — para clonar o repositório
  - Verifique com: `git -v`
- **Expo Go** no celular — disponível na [App Store](https://apps.apple.com/app/expo-go/id982107779) ou [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)
  - **OU** um emulador Android configurado via [Android Studio](https://developer.android.com/studio)

---

### 1. Clonar o repositório

Abra o terminal e execute:

```bash
git clone https://github.com/cruz1910/PassGeneration.git
```

Acesse a pasta do projeto:

```bash
cd PassGeneration
```

---

### 2. Instalar as dependências

```bash
npm install
```

> Isso irá baixar todas as bibliotecas necessárias para a pasta `node_modules/`.

---

### 3. Iniciar o servidor de desenvolvimento

```bash
npx expo start
```

O terminal exibirá um **QR Code** e as opções disponíveis.

---

### 4. Abrir o aplicativo

**Opção A — Celular físico (mais fácil):**
1. Abra o app **Expo Go** no celular
2. Escaneie o **QR Code** exibido no terminal
3. O app será carregado diretamente no seu celular

**Opção B — Emulador Android:**
1. Abra o **Android Studio** e inicie um emulador (AVD Manager)
2. Com o emulador aberto, pressione a tecla **`a`** no terminal onde o `expo start` está rodando
3. O app abrirá automaticamente no emulador

> ⚠️ O celular e o computador devem estar na **mesma rede Wi-Fi** para o Expo Go funcionar.

---

## 🗂 Estrutura do Projeto

```
PassGeneration/
├── App.js                  # Configuração de rotas e navegação
├── index.js                # Ponto de entrada do app
├── app.json                # Configurações do Expo
├── assets/                 # Imagens e ícones
├── screens/
│   ├── SignInScreen.js     # Tela de Login
│   ├── SignUpScreen.js     # Tela de Cadastro
│   ├── HomeScreen.js       # Gerador de Senha + Modal de Salvar
│   └── HistoryScreen.js    # Histórico de Senhas
└── service/
    └── passwordService.js  # Lógica de geração de senha aleatória
```

---

## 🛠 Tecnologias Utilizadas

| Biblioteca | Finalidade |
|---|---|
| [React Native](https://reactnative.dev/) | Framework mobile |
| [Expo](https://expo.dev/) | Plataforma de desenvolvimento |
| [@react-navigation/native](https://reactnavigation.org/) | Navegação entre telas |
| [@react-native-async-storage/async-storage](https://react-native-async-storage.github.io/async-storage/) | Persistência local de dados |
| [expo-clipboard](https://docs.expo.dev/versions/latest/sdk/clipboard/) | Copiar texto para o clipboard |

---

## ⚙️ Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npx expo start` | Inicia o servidor de desenvolvimento |
| `npx expo start --android` | Abre diretamente no emulador Android |
| `npx expo start --ios` | Abre no simulador iOS (apenas macOS) |
