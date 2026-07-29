import { useState } from "react";
import authService from "../services/authService";

function ChangePassword() {
    const [formData, setFormData] = useState({
        oldPassword: "",
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
            setError("As novas senhas não coincidem.");
            return;
        }

        setLoading(true);

        try {
            await authService.changePassword({
                oldPassword: formData.oldPassword,
                newPassword: formData.newPassword
            });

            setMessage("Senha alterada com sucesso!");

            setFormData({
                oldPassword: "",
                newPassword: "",
                confirmPassword: ""
            });

        } catch (error) {
            setError("Não foi possível alterar a senha.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="card">
                <h1>Alterar senha</h1>

                <p className="subtitle">
                    Atualize sua senha de acesso.
                </p>

                {message && <div className="message success">{message}</div>}
                {error && <div className="message error">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Senha atual</label>
                        <input
                            type="password"
                            name="oldPassword"
                            placeholder="Digite sua senha atual"
                            value={formData.oldPassword}
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

                    <button className="btn" type="submit" disabled={loading}>
                        {loading ? "Salvando..." : "Alterar senha"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ChangePassword;