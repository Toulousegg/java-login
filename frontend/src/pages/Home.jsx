import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Home() {
    const navigate = useNavigate();
    const { logout, isAdmin } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="page">
            <div className="card">
                <h1>Hello World!</h1>

                <p className="subtitle">
                    Sistema de autenticação funcionando corretamente.
                </p>

                <div className="actions">
                    {isAdmin() && (
                        <button
                            className="btn"
                            onClick={() => navigate("/admin/users")}
                        >
                            Administração
                        </button>
                    )}

                    <button
                        className="btn btn-danger"
                        onClick={handleLogout}
                    >
                        Sair
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Home;