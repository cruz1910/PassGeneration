# Documentação das Alterações — PassGeneration

Documento técnico descrevendo **tudo que foi implementado** no aplicativo, arquivo por arquivo, com as regras de negócio correspondentes ao exercício.

---

## 1. App.js — Configuração de Navegação

### O que era antes
O app tinha apenas 2 telas registradas: `Home` e `History`, e a tela inicial era `Home`.

### O que foi alterado
```js
// Antes: 2 rotas, tela inicial era Home
<Stack.Navigator>
  <Stack.Screen name="Home" ... />
  <Stack.Screen name="History" ... />
</Stack.Navigator>

// Depois: 4 rotas, tela inicial é SignIn
<Stack.Navigator initialRouteName="SignIn">
  <Stack.Screen name="SignIn" ... />
  <Stack.Screen name="SignUp" ... />
  <Stack.Screen name="Home" ... />
  <Stack.Screen name="History" ... />
</Stack.Navigator>
```

### Regras de negócio atendidas
- ✅ A tela de **Sign In deve ser a primeira a ser carregada** ao iniciar o aplicativo

---

## 2. SignInScreen.js — Tela de Login (NOVA)

### O que foi criado
Tela de login criada do zero com os seguintes elementos:

**Campos:**
- `Email` — campo de texto com teclado de e-mail e texto sem autocapitalização
- `Senha` — campo de texto com `secureTextEntry` (oculta os caracteres)

**Botão ENTRAR:**
```js
const canSignIn = email !== "" && pass !== "";

<Pressable
  style={[styles.button, !canSignIn && styles.buttonDisabled]}
  disabled={!canSignIn}
  onPress={() => navigation.navigate("Home")}
>
```
- Desabilitado (opacidade 0.7) quando qualquer campo estiver vazio
- Ao clicar navega para a tela `Home`

**Link "Não possui conta ainda? Crie agora.":**
```js
<Pressable onPress={() => navigation.navigate("SignUp")}>
```
- Redireciona para a tela de `SignUp`

**Recebimento de e-mail vindo do SignUp:**
```js
const initialEmail = route.params?.email || "";
const [email, setEmail] = useState(initialEmail);
```
- Se o usuário veio da tela de cadastro, o campo de e-mail já vem preenchido

### Regras de negócio atendidas
- ✅ Botão ENTRAR só disponível com email e senha preenchidos
- ✅ ENTRAR redireciona para Home
- ✅ Clicar em "Crie agora" redireciona para SignUp
- ✅ Campo e-mail preenchido automaticamente quando vindo do SignUp

---

## 3. SignUpScreen.js — Tela de Cadastro (NOVA)

### O que foi criado
Tela de cadastro com os seguintes campos e comportamentos:

**Campos:**
- `Nome` — campo de texto livre
- `Email` — campo com teclado de e-mail
- `Senha` — campo oculto (`secureTextEntry`)
- `Confirmar Senha` — campo oculto (`secureTextEntry`)

**Botão REGISTRAR:**
```js
const canRegister = nome !== "" && email !== "" && pass !== "" && pass === confirmPass;

<Pressable
  style={[styles.button, !canRegister && styles.buttonDisabled]}
  disabled={!canRegister}
  onPress={() => navigation.navigate("SignIn", { email })}
>
```
- Desabilitado até que **todos os 4 campos** estejam preenchidos E `Senha === Confirmar Senha`
- Ao clicar, navega de volta para `SignIn` **passando o e-mail como parâmetro**

**Link "Voltar":**
```js
<Pressable onPress={() => navigation.goBack()}>
```
- Volta para a tela de `SignIn`

### Regras de negócio atendidas
- ✅ Botão REGISTRAR só disponível com todos os campos preenchidos e senhas iguais
- ✅ REGISTRAR redireciona para SignIn com o e-mail já preenchido
- ✅ "Voltar" redireciona para SignIn
- ✅ Sem back-end: nenhuma informação é salva, apenas a navegação é executada

---

## 4. HomeScreen.js — Gerador de Senha (EVOLUÍDA)

### O que era antes
- Gerava senha e já salvava no `AsyncStorage` como **string simples** automaticamente ao clicar GERAR
- Tinha botão COPIAR
- **Não permitia** o usuário nomear a senha

### O que foi alterado/adicionado

**Estrutura de dados alterada:**
```js
// Antes: salvava string simples
parsed.unshift(newPass);

// Depois: salva objeto com ID, nome e senha
const newEntry = { id: Date.now().toString(), name: appName, pass: password };
```

**Botão SALVAR (novo):**
```js
<Pressable
  style={[styles.button, !password && { opacity: 0.5 }]}
  onPress={() => setModalVisible(true)}
  disabled={!password}
>
```
- Só fica habilitado após uma senha ser gerada
- Ao clicar, abre a modal de cadastro

**Modal "CADASTRO DE SENHA":**
```js
<Modal visible={modalVisible} animationType="fade" transparent>
  ...
  // Campo Nome do aplicativo (editável)
  <TextInput value={appName} onChangeText={setAppName} placeholder="Ex: Google" />

  // Campo Senha gerada (somente leitura)
  <TextInput value={password} editable={false} />

  // Botão CRIAR (desabilitado sem nome)
  <Pressable disabled={!appName} onPress={handleSave}>

  // Botão CANCELAR
  <Pressable onPress={() => setModalVisible(false)}>
</Modal>
```

**Função handleSave:**
```js
const handleSave = async () => {
  const newEntry = { id: Date.now().toString(), name: appName, pass: password };
  const stored = await AsyncStorage.getItem("@history");
  const parsed = stored ? JSON.parse(stored) : [];
  await AsyncStorage.setItem("@history", JSON.stringify([newEntry, ...parsed]));
  setModalVisible(false);
  setAppName("");
  navigation.navigate("History");
};
```
- Cria entrada com ID único (`Date.now()`), nome e senha
- Busca histórico existente no `AsyncStorage`
- Adiciona nova entrada no início da lista
- Fecha a modal e navega para o Histórico

### Regras de negócio atendidas
- ✅ Botão SALVAR só disponível após gerar senha
- ✅ Campo "Senha gerada" na modal não pode ser editado
- ✅ Botão CRIAR só disponível com o campo "Nome do aplicativo" preenchido
- ✅ CRIAR fecha a modal e salva na memória local
- ✅ As informações ficam salvas no `AsyncStorage`

---

## 5. HistoryScreen.js — Histórico de Senhas (EVOLUÍDA)

### O que era antes
- Exibia as senhas em texto simples (`<Text>`)
- Listava strings simples (não objetos)
- Tinha apenas botão de "LIMPAR" para apagar tudo
- Não recarregava ao voltar para a tela

### O que foi alterado/adicionado

**Recarregamento inteligente com `useIsFocused`:**
```js
const isFocused = useIsFocused();

useEffect(() => {
  if (isFocused) {
    loadHistory(); // carrega dados E reseta visibilidade
  }
}, [isFocused]);
```
- Toda vez que o usuário entra na tela, os dados são recarregados
- O estado de visibilidade (`visibleItems`) é resetado para `{}` → todas as senhas voltam a ser ofuscadas

**Cards com FlatList:**
```js
<FlatList
  data={history}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <View style={styles.card}>
      <Text>{item.name}</Text>                           // Nome do app
      <Text>{visibleItems[item.id] ? item.pass : "********"}</Text>  // Senha
      // Emojis de ação →
    </View>
  )}
/>
```

**Emoji 1 — Mostrar/Ocultar senha (👁️ / 😑):**
```js
const toggleVisibility = (id) => {
  setVisibleItems(prev => ({ ...prev, [id]: !prev[id] }));
};
```
- Estado individual por card — alternar um não afeta os outros
- Pressionando novamente, a senha volta a ser ocultada

**Emoji 2 — Copiar senha (✋):**
```js
const copyPass = async (pass) => {
  await Clipboard.setStringAsync(pass);
  alert("Copiado!");
};
```
- Copia para a área de transferência do dispositivo
- Exibe um alerta de confirmação

**Emoji 3 — Excluir senha (🗑️):**
```js
const deletePass = async (id) => {
  const updated = history.filter(item => item.id !== id);
  setHistory(updated);
  await AsyncStorage.setItem("@history", JSON.stringify(updated));
};
```
- Remove o item visualmente da lista **imediatamente**
- Persiste a remoção no `AsyncStorage` (a senha some definitivamente)

### Regras de negócio atendidas
- ✅ Cards exibidos ao carregar a tela
- ✅ Senha ofuscada por padrão (`********`)
- ✅ Emoji 1 alterna visibilidade da senha (individual por card)
- ✅ Emoji 2 copia a senha para o clipboard
- ✅ Emoji 3 remove visualmente e apaga da memória local
- ✅ Ao sair e voltar, o estado inicial é restaurado (senhas ofuscadas novamente)

---

## 6. service/passwordService.js — Geração de Senha

### Sem alterações
A função de geração de senha permaneceu a mesma:

```js
export function generatePassword() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%*";
  let pass = "";
  for (let i = 0; i < 8; i++) {
    pass += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pass;
}
```
- Gera senha de **8 caracteres aleatórios**
- Inclui letras maiúsculas, minúsculas, números e símbolos

---

## Resumo das Regras de Negócio Atendidas

| # | Requisito | Status |
|---|-----------|--------|
| 1 | Sign In é a primeira tela ao iniciar | ✅ |
| 2 | Botão ENTRAR desabilitado sem email e senha | ✅ |
| 3 | ENTRAR redireciona para Home | ✅ |
| 4 | "Crie agora" redireciona para SignUp | ✅ |
| 5 | REGISTRAR desabilitado sem todos os campos e senhas iguais | ✅ |
| 6 | REGISTRAR redireciona para SignIn com e-mail preenchido | ✅ |
| 7 | "Voltar" no SignUp redireciona para SignIn | ✅ |
| 8 | Botão SALVAR desabilitado sem senha gerada | ✅ |
| 9 | Campo "Senha gerada" na modal é somente leitura | ✅ |
| 10 | Botão CRIAR desabilitado sem "Nome do aplicativo" | ✅ |
| 11 | CRIAR fecha a modal e salva na memória local | ✅ |
| 12 | Cards exibidos no Histórico com senha ofuscada | ✅ |
| 13 | Emoji mostrar/ocultar funciona por toggle e por card | ✅ |
| 14 | Emoji copiar envia a senha para o clipboard | ✅ |
| 15 | Emoji excluir remove da tela e do AsyncStorage | ✅ |
| 16 | Ao sair e voltar ao Histórico, senhas voltam a ser ofuscadas | ✅ |
