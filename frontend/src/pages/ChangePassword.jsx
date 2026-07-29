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




        if (
            formData.newPassword !==
            formData.confirmPassword
        ) {


            setError(
                "Las contraseñas nuevas no coinciden"
            );


            return;

        }






        setLoading(true);




        try {


            await authService.changePassword({

                oldPassword:
                    formData.oldPassword,


                newPassword:
                    formData.newPassword

            });





            setMessage(
                "Contraseña cambiada correctamente"
            );



            setFormData({

                oldPassword: "",

                newPassword: "",

                confirmPassword: ""

            });




        } catch (error) {


            setError(
                "No fue posible cambiar la contraseña"
            );


        } finally {


            setLoading(false);

        }


    };









    return (

        <div>


            <h1>
                Cambiar contraseña
            </h1>





            <form
                onSubmit={handleSubmit}
            >





                <div>

                    <label>
                        Contraseña actual
                    </label>


                    <input

                        type="password"

                        name="oldPassword"

                        value={formData.oldPassword}

                        onChange={handleChange}

                        required

                    />


                </div>








                <div>

                    <label>
                        Nueva contraseña
                    </label>


                    <input

                        type="password"

                        name="newPassword"

                        value={formData.newPassword}

                        onChange={handleChange}

                        required

                    />


                </div>








                <div>

                    <label>
                        Confirmar nueva contraseña
                    </label>


                    <input

                        type="password"

                        name="confirmPassword"

                        value={formData.confirmPassword}

                        onChange={handleChange}

                        required

                    />


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
                        ? "Guardando..."
                        : "Cambiar contraseña"
                    }


                </button>



            </form>


        </div>

    );

}



export default ChangePassword;