import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { signup } from "../service/authService";


export default function SignUpScreen({ navigation }) {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    const canRegister = nome !== "" && email !== "" && pass !== "" && pass === confirmPass;


    const handleSignup = async () => {
        try {
            await signup({
                nome,
                email,
                password: pass,
                confirmPassword: confirmPass
            });
            
            alert("Cadastro realizado!");
            navigation.navigate("SignIn", { email });
        } catch (e) {
            let errorMessage = "Erro no cadastro";
            
            if (e.response?.data) {
                const errorData = e.response.data;
                
                if (errorData.includes("Senhas não coincidem")) {
                    errorMessage = "As senhas não coincidem!";
                } else if (errorData.includes("Email inválido")) {
                    errorMessage = "Email inválido!";
                } else if (errorData.includes("Email já cadastrado")) {
                    errorMessage = "Email já cadastrado!";
                } else if (errorData.includes("Usuário não encontrado")) {
                    errorMessage = "Usuário não encontrado!";
                } else if (errorData.includes("Senha inválida")) {
                    errorMessage = "Senha inválida!";
                } else {
                    errorMessage = errorData;
                }
            }
            
            alert(errorMessage);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>SIGN UP</Text>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Nome</Text>
                <TextInput style={styles.input} value={nome} onChangeText={setNome} />
            </View>

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
                <TextInput style={styles.input} secureTextEntry value={pass} onChangeText={setPass} />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Confirmar Senha</Text>
                <TextInput style={styles.input} secureTextEntry value={confirmPass} onChangeText={setConfirmPass} />
            </View>

            <Pressable
                style={[styles.button, !canRegister && styles.buttonDisabled]}
                disabled={!canRegister}
                onPress={handleSignup}
            >
                <Text style={styles.buttonText}>REGISTRAR</Text>
            </Pressable>

            <Pressable onPress={() => navigation.goBack()}>
                <Text style={styles.linkText}>Voltar</Text>
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