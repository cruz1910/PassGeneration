import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import * as Clipboard from "expo-clipboard";
import { listarSenhas, deletarSenha } from "../service/senhaService";

export default function HistoryScreen({ navigation }) {
  const [history, setHistory] = useState([]);
  const [visibleItems, setVisibleItems] = useState({});
  const isFocused = useIsFocused();

  const loadHistory = async () => {
    try {
      const res = await listarSenhas();
      setHistory(res.data);
      setVisibleItems({});
    } catch (e) {
      console.log(e);
      alert("Erro ao carregar senhas");
    }
  };

  useEffect(() => {
    if (isFocused) {
      loadHistory();
    }
  }, [isFocused]);

  const toggleVisibility = (id) => {
    setVisibleItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyPass = async (pass) => {
    await Clipboard.setStringAsync(pass);
    alert("Copiado!");
  };

  const deletePass = async (id) => {
    try {
      await deletarSenha(id);
      loadHistory();
    } catch (e) {
      console.log(e);
      alert("Erro ao deletar");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>HISTÓRICO DE SENHAS</Text>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.appName}>{item.name}</Text>
              <Text style={styles.passText}>
                {visibleItems[item.id] ? item.pass : "********"}
              </Text>
            </View>
            <View style={styles.actions}>
              <Pressable onPress={() => toggleVisibility(item.id)}>
                <Text style={styles.icon}>{visibleItems[item.id] ? "👁️" : "😑"}</Text>
              </Pressable>
              <Pressable onPress={() => copyPass(item.pass)}>
                <Text style={styles.icon}>✋</Text>
              </Pressable>
              <Pressable onPress={() => deletePass(item.id)}>
                <Text style={styles.icon}>🗑️</Text>
              </Pressable>
            </View>
          </View>
        )}
      />
      
      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>VOLTAR</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f2f2", padding: 15 },
  headerTitle: { fontSize: 22, fontWeight: "bold", textAlign: "center", color: "#3b82f6", marginBottom: 20 },
  card: { backgroundColor: "#fff", padding: 15, borderRadius: 8, borderWidth: 1, borderColor: "#000", flexDirection: "row", justifyContent: "space-between", marginBottom: 10, elevation: 2 },
  appName: { fontSize: 16, fontWeight: "bold", color: "#000" },
  passText: { fontSize: 16, marginTop: 4, letterSpacing: 2 },
  actions: { flexDirection: "row", alignItems: "center" },
  icon: { fontSize: 22, marginLeft: 15 },
  backButton: { backgroundColor: "#60a5fa", alignSelf: "center", paddingVertical: 10, paddingHorizontal: 30, borderRadius: 4, marginTop: 20 },
  backButtonText: { color: "#fff", fontWeight: "bold" }
});