import axios from "axios";


const api = axios.create({

    baseURL: "http://localhost:8080",

    headers: {
        "Content-Type": "application/json"
    }

});



// Interceptor para enviar JWT automáticamente
api.interceptors.request.use(

    (config) => {


        const token = localStorage.getItem("token");


        if (token) {

            config.headers.Authorization =
                `Bearer ${token}`;

        }


        return config;

    },


    (error) => {

        return Promise.reject(error);

    }

);



// Interceptor para manejar errores globales
api.interceptors.response.use(

    (response) => {

        return response;

    },


    (error) => {


        if (error.response) {


            if (error.response.status === 401) {

                console.log(
                    "Sesión expirada o token inválido"
                );

                localStorage.removeItem("token");

            }


            if (error.response.status === 403) {
                console.log(
                    "No tienes permisos para acceder"
                );
            }
        }
        return Promise.reject(error);

    }

);



export default api;