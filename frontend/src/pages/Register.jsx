import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        cpf: "",
        password: "",
        role: "USER"
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");
        setLoading(true);

        try {
            await authService.register(formData);

            setMessage("Usuário criado com sucesso!");

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (error) {
            setError("Não foi possível criar o usuário. Verifique os dados.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="card">
                <h1>Criar conta</h1>
                <p className="subtitle">Cadastre um novo usuário</p>

                {message && <div className="message success">{message}</div>}
                {error && <div className="message error">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nome</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Digite seu nome"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>E-mail</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Digite seu e-mail"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>CPF</label>
                        <input
                            type="text"
                            name="cpf"
                            placeholder="Digite seu CPF"
                            value={formData.cpf}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Senha</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Digite sua senha"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Perfil</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                        >
                            <option value="USER">
                                Usuário
                            </option>

                            <option value="ADMIN">
                                Administrador
                            </option>
                        </select>
                    </div>

                    <button className="btn" type="submit" disabled={loading}>
                        {loading ? "Criando..." : "Cadastrar"}
                    </button>
                </form>

                <div className="footer">
                    Já possui uma conta? <Link to="/login">Entrar</Link>
                </div>
            </div>
        </div>
    );
}

export default Register;