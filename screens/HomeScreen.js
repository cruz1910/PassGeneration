import React, { useState, useEffect } from "react";
import { View, Text, Pressable, StyleSheet, Image, Modal, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Clipboard from "expo-clipboard";
import { generatePassword } from "../service/passwordService";

export default function HomeScreen({ navigation, onLogout }) {
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [appName, setAppName] = useState("");


  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      console.log("TOKEN:", token);
    };

    checkToken();
  }, []);

  const handleGenerate = () => setPassword(generatePassword());

  const handleSave = async () => {
    if (!appName) return;

    const newEntry = { id: Date.now().toString(), name: appName, pass: password };
    const stored = await AsyncStorage.getItem("@history");
    const parsed = stored ? JSON.parse(stored) : [];

    await AsyncStorage.setItem("@history", JSON.stringify([newEntry, ...parsed]));

    setModalVisible(false);
    setAppName("");
    navigation.navigate("History");
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    onLogout();
    alert("Logout realizado");
  };

  const copyToClipboard = async () => {
    if (password) {
      await Clipboard.setStringAsync(password);
      alert("Copiado!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GERADOR DE SENHA</Text>
      <Image source={require("../assets/pass.png")} style={styles.logo} />

      <View style={styles.codeArea}>
        <Text style={styles.passwordText}>{password || "********"}</Text>
      </View>

      <Pressable style={styles.button} onPress={handleGenerate}>
        <Text style={styles.buttonText}>GERAR SENHA</Text>
      </Pressable>

      <Pressable
        style={[styles.button, !password && { opacity: 0.5 }]}
        onPress={() => setModalVisible(true)}
        disabled={!password}
      >
        <Text style={styles.buttonText}>SALVAR</Text>
      </Pressable>

      <Pressable
        style={[styles.button, !password && { opacity: 0.5 }]}
        onPress={copyToClipboard}
        disabled={!password}
      >
        <Text style={styles.buttonText}>COPIAR</Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate("History")}>
        <Text style={styles.link}>Ver Senhas</Text>
      </Pressable>

      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>SAIR</Text>
      </Pressable>

      {/* MODAL DE SALVAMENTO */}
      <Modal visible={modalVisible} animationType="fade" transparent>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>CADASTRO DE SENHA</Text>

            <Text style={styles.label}>Nome do aplicativo</Text>
            <TextInput style={styles.input} value={appName} onChangeText={setAppName} placeholder="Ex: Google" />

            <Text style={styles.label}>Senha gerada</Text>
            <TextInput style={[styles.input, { backgroundColor: '#eee' }]} value={password} editable={false} />



            <Pressable
              style={[styles.modalButton, !appName && styles.buttonDisabled]}
              onPress={handleSave}
              disabled={!appName}
            >
              <Text style={styles.modalButtonText}>CRIAR</Text>
            </Pressable>

            <Pressable
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>CANCELAR</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#f5f7fa" },
  logo: { width: 120, height: 120, marginBottom: 20 },
  title: { fontSize: 22, fontWeight: "bold", color: "#1e40af", marginBottom: 20 },
  codeArea: { backgroundColor: "#1e40af", width: "80%", padding: 15, borderRadius: 8, marginBottom: 20 },
  passwordText: { color: "#fff", textAlign: "center", fontSize: 20, fontWeight: "bold" },
  button: { backgroundColor: "#2563eb", width: "80%", padding: 15, borderRadius: 8, marginBottom: 10 },
  buttonSave: { backgroundColor: "#10b981", width: "80%", padding: 15, borderRadius: 8 },
  buttonDisabled: { backgroundColor: "#94a3b8" },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
  link: { color: "#1e40af", marginTop: 15 },
  logoutButton: { backgroundColor: "#dc2626", width: "80%", padding: 15, borderRadius: 8, marginTop: 20 },
  logoutButtonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '85%', backgroundColor: '#fff', padding: 25, borderRadius: 10 },
  modalTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 20, textAlign: "center", color: "#000" },
  label: { fontSize: 13, marginBottom: 2, color: '#333' },
  input: { borderWidth: 1, borderColor: '#000', borderRadius: 4, padding: 8, marginBottom: 15, color: "#000", backgroundColor: "#fff" },
  modalButton: { backgroundColor: "#3085d6", borderWidth: 1, borderColor: "#000", borderRadius: 4, paddingVertical: 10, alignItems: "center", marginBottom: 10 },
  modalButtonText: { color: "#fff", fontWeight: "bold" }
});