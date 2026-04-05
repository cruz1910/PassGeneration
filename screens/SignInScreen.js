import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signin } from "../service/authService";

export default function SignInScreen({ navigation, route, onLogin }) {
    const initialEmail = route.params?.email || "";
    const [email, setEmail] = useState(initialEmail);
    const [pass, setPass] = useState("");

    const canSignIn = email !== "" && pass !== "";

    const handleLogin = async () => {
        try {
            const response = await signin({ email: email, password: pass });

            const token = response.data.token;

            await AsyncStorage.setItem("token", token);

            alert("Login feito!");
            onLogin();
            navigation.navigate("Home");

        } catch (e) {
            let errorMessage = "Erro no login";
            
            if (e.response?.data) {
                const errorData = e.response.data;
                
                if (errorData.includes("Usuário não encontrado")) {
                    errorMessage = "Usuário não encontrado!";
                } else if (errorData.includes("Senha inválida")) {
                    errorMessage = "Senha inválida!";
                } else if (errorData.includes("Email inválido")) {
                    errorMessage = "Email inválido!";
                } else {
                    errorMessage = errorData;
                }
            }
            
            alert(errorMessage);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>SIGN IN</Text>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Senha</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry
                    value={pass}
                    onChangeText={setPass}
                />
            </View>

            <Pressable
                style={[styles.button, !canSignIn && styles.buttonDisabled]}
                disabled={!canSignIn}
                onPress={handleLogin}
            >
                <Text style={styles.buttonText}>ENTRAR</Text>
            </Pressable>

            <Pressable onPress={() => navigation.navigate("SignUp")}>
                <Text style={styles.linkText}>Não possui conta ainda? Crie agora.</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#fff" },
    title: { fontSize: 28, fontWeight: "bold", color: "#3085d6", marginBottom: 30 },
    formGroup: { width: "100%", marginBottom: 15 },
    label: { fontSize: 14, color: "#333", marginBottom: 5, marginLeft: 2 },
    input: { width: "100%", height: 50, backgroundColor: "#5bc0eb", borderWidth: 1, borderColor: "#000", borderRadius: 4, paddingHorizontal: 15, color: "#000" },
    button: { backgroundColor: "#cccccc", borderWidth: 1, borderColor: "#555", width: "40%", height: 45, borderRadius: 4, justifyContent: "center", alignItems: "center", marginTop: 20 },
    buttonDisabled: { opacity: 0.7 },
    buttonText: { color: "#555", fontWeight: "bold", fontSize: 16 },
    linkText: { marginTop: 20, color: "#333", fontSize: 12 }
});