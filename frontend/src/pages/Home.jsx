import { useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";



function Home() {


    const navigate = useNavigate();


    const { logout } = useAuth();





    const handleLogout = () => {


        logout();


        navigate("/login");


    };







    return (

        <div>


            <h1>
                Hola Mundo
            </h1>



            <p>
                Bienvenido al sistema de autenticación.
            </p>





            <button
                onClick={handleLogout}
            >

                Cerrar sesión

            </button>



        </div>

    );

}



export default Home;