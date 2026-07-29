import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import authService from "../services/authService";
import useAuth from "../hooks/useAuth";



function Login() {


    const navigate = useNavigate();


    const { login } = useAuth();



    const [formData, setFormData] = useState({

        email: "",

        password: ""

    });



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


        setError("");

        setLoading(true);



        try {


            const response =
                await authService.login(formData);



            login(
                response.token
            );



            navigate("/home");



        } catch (error) {


            setError(
                "Credenciales incorrectas"
            );


        } finally {


            setLoading(false);


        }


    };







    return (

        <div>


            <h1>
                Login
            </h1>



            <form
                onSubmit={handleSubmit}
            >


                <div>

                    <label>
                        Email
                    </label>


                    <input

                        type="email"

                        name="email"

                        value={formData.email}

                        onChange={handleChange}

                        required

                    />

                </div>





                <div>

                    <label>
                        Contraseña
                    </label>


                    <input

                        type="password"

                        name="password"

                        value={formData.password}

                        onChange={handleChange}

                        required

                    />

                </div>





                {
                    error && (

                        <p>
                            {error}
                        </p>

                    )
                }






                <button
                    type="submit"
                    disabled={loading}
                >

                    {
                        loading
                        ? "Entrando..."
                        : "Iniciar sesión"
                    }


                </button>



            </form>





            <p>

                ¿No tienes cuenta?


                <Link to="/register">

                    Registrarse

                </Link>


            </p>



        </div>

    );

}



export default Login;