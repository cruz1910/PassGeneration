# PassGeneration — Gerador de Senhas

Aplicativo mobile de **geração e gerenciamento de senhas** desenvolvido em **React Native com Expo**.

Permite criar senhas aleatórias, salvá-las com uma etiqueta (nome do aplicativo/finalidade) e consultar o histórico de senhas salvas com opções de visualizar, copiar e excluir.

---

## 📱 Telas do Aplicativo

| Tela | Descrição |
|---|---|
| **Sign In** | Tela inicial de login. Botão habilitado apenas com email e senha preenchidos. |
| **Sign Up** | Cadastro com Nome, Email, Senha e Confirmação. Botão habilitado somente com tudo preenchido e senhas iguais. |
| **Home (Gerador)** | Gera senha aleatória. Permite copiar e salvar com nome de finalidade via modal. |
| **Histórico** | Lista as senhas salvas em cards. Suporta ver/ocultar, copiar e deletar cada senha. |

---

## 🚀 Como rodar o projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão LTS recomendada)
- Aplicativo **Expo Go** no celular *(Android ou iOS)*, **ou** um emulador configurado (ex: Android Studio)

### Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git

# 2. Acesse a pasta do projeto
cd PassGeneration

# 3. Instale as dependências
npm install
```

### Execução

```bash
npx expo start
```

Após isso:
- **Emulador Android:** pressione `a` no terminal
- **Celular físico:** escaneie o QR Code com o app **Expo Go**

---

## 🗂 Estrutura do Projeto

```
PassGeneration/
├── App.js                  # Configuração de rotas (Navigation)
├── index.js                # Ponto de entrada
├── assets/                 # Imagens e ícones
├── screens/
│   ├── SignInScreen.js     # Tela de Login
│   ├── SignUpScreen.js     # Tela de Cadastro
│   ├── HomeScreen.js       # Gerador de Senha + Modal de Salvar
│   └── HistoryScreen.js    # Histórico de Senhas
└── service/
    └── passwordService.js  # Lógica de geração de senha
```

---

## 🛠 Tecnologias Utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [@react-navigation/native](https://reactnavigation.org/) — Navegação entre telas
- [@react-native-async-storage/async-storage](https://react-native-async-storage.github.io/async-storage/) — Persistência local
- [expo-clipboard](https://docs.expo.dev/versions/latest/sdk/clipboard/) — Cópia para área de transferência
