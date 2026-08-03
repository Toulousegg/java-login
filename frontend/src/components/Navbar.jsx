import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Navbar() {
    const navigate = useNavigate();
    const { logout, isAdmin } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };
    console.log("isAdmin:", isAdmin());
    return (
        <nav>
            <Link to="/home">
                Home
            </Link>

            {isAdmin() && (
                <Link to="/admin/users">
                    Usuarios
                </Link>
            )}
            <button onClick={handleLogout}>
                Salir
            </button>
        </nav>
    );
}

export default Navbar;