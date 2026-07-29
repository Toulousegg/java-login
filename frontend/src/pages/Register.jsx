import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

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


            await authService.register(
                formData
            );



            setMessage(
                "Usuario creado correctamente"
            );



            setTimeout(() => {

                navigate("/login");

            }, 1500);




        } catch (error) {


            setError(
                "No fue posible crear el usuario. Verifica los datos."
            );


        } finally {


            setLoading(false);


        }


    };









    return (

        <div>


            <h1>
                Registro de usuario
            </h1>



            <form
                onSubmit={handleSubmit}
            >





                <div>

                    <label>
                        Nombre
                    </label>


                    <input

                        type="text"

                        name="name"

                        value={formData.name}

                        onChange={handleChange}

                        required

                    />

                </div>








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
                        CPF
                    </label>


                    <input

                        type="text"

                        name="cpf"

                        value={formData.cpf}

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








                <div>

                    <label>
                        Perfil
                    </label>


                    <select

                        name="role"

                        value={formData.role}

                        onChange={handleChange}

                    >


                        <option value="USER">
                            Usuario
                        </option>


                        <option value="ADMIN">
                            Administrador
                        </option>


                    </select>


                </div>








                {
                    message && (

                        <p>
                            {message}
                        </p>

                    )
                }






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
                        ? "Creando..."
                        : "Registrar"
                    }


                </button>



            </form>








            <p>

                ¿Ya tienes cuenta?


                <Link to="/login">

                    Iniciar sesión

                </Link>


            </p>



        </div>

    );

}



export default Register;