import api from "./api";

const authService = {
    register: async (userData) => {
        const response = await api.post("/auth/register", userData);
        return response.data;
    },

    login: async (credentials) => {
        const response = await api.post("/auth/login", credentials);
        return response.data;
    },

    changePassword: async (passwordData) => {
        const response = await api.post("/users/change-password", passwordData);
        return response.data;
    },

    getUsers: async () => {
        const response = await api.get("/admin/users");
        return response.data;
    },

    deleteUser: async (id) => {
        const response = await api.delete(`/admin/users/${id}`);
        return response.data;
    }
};

export default authService;