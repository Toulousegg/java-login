import { Link, useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";



function Navbar() {


    const navigate = useNavigate();


    const { logout } = useAuth();




    const handleLogout = () => {


        logout();


        navigate("/login");


    };





    return (

        <nav>


            <Link to="/home">

                Home

            </Link>





            <Link to="/change-password">

                Cambiar contraseña

            </Link>





            <Link to="/admin/users">

                Usuarios

            </Link>





            <button
                onClick={handleLogout}
            >

                Salir

            </button>



        </nav>

    );

}



export default Navbar;