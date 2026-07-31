import axios from "axios";

const api = axios.create({
    headers: {
        "Content-Type": "application/json"
    }
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    console.log("TOKEN ENVIADO:", token);
    console.log(config.method?.toUpperCase(), config.url);

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                localStorage.removeItem("token");
                window.location.href = "/login";
            }

            if (error.response.status === 403) {
                console.log("Sem permissão para acessar este recurso");
            }
        }

        return Promise.reject(error);
    }
);

export default api;