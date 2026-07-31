import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        newPassword: "",
        confirmPassword: ""
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

        if (formData.newPassword !== formData.confirmPassword) {
            setError("As senhas não coincidem.");
            return;
        }

        setLoading(true);

        try {

            await axios.post(
                "http://localhost:8080/auth/forgot-password",
                formData
            );

            setMessage("Senha alterada com sucesso!");

            setFormData({
                email: "",
                newPassword: "",
                confirmPassword: ""
            });

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (error) {
            console.log(error);
            setError("Não foi possível alterar a senha.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="card">

                <h1>Redefinir senha</h1>

                <p className="subtitle">
                    Informe seu e-mail e defina uma nova senha.
                </p>

                {message && (
                    <div className="message success">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="message error">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

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
                        <label>Nova senha</label>
                        <input
                            type="password"
                            name="newPassword"
                            placeholder="Digite a nova senha"
                            value={formData.newPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Confirmar nova senha</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirme a nova senha"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button
                        className="btn"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Salvando..." : "Alterar senha"}
                    </button>

                </form>

            </div>
        </div>
    );
}

export default ForgotPassword;