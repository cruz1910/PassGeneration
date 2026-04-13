import api from "./api";

export const criarSenha = (data) => {
  return api.post("/passwords", data);
};

export const listarSenhas = () => {
  return api.get("/passwords");
};

export const deletarSenha = (id) => {
  return api.delete(`/passwords/${id}`);
};