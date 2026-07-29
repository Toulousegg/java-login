import { useEffect, useState } from "react";

import authService from "../services/authService";



function AdminUsers() {


    const [users, setUsers] = useState([]);

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(true);







    const loadUsers = async () => {


        try {


            const data =
                await authService.getUsers();



            setUsers(data);



        } catch (error) {


            setError(
                "No tienes permisos o ocurrió un error"
            );


        } finally {


            setLoading(false);

        }


    };








    useEffect(() => {


        loadUsers();


    }, []);









    const handleDelete = async (id) => {


        const confirmDelete =
            window.confirm(
                "¿Eliminar este usuario?"
            );



        if (!confirmDelete) {

            return;

        }






        try {


            await authService.deleteUser(id);



            setUsers(

                users.filter(
                    user => user.id !== id
                )

            );



        } catch (error) {


            setError(
                "No fue posible eliminar el usuario"
            );


        }


    };









    if (loading) {


        return (

            <h2>
                Cargando usuarios...
            </h2>

        );

    }









    return (

        <div>


            <h1>
                Administración de usuarios
            </h1>





            {
                error && (

                    <p>
                        {error}
                    </p>

                )
            }







            <table>


                <thead>

                    <tr>

                        <th>
                            ID
                        </th>


                        <th>
                            Nombre
                        </th>


                        <th>
                            Email
                        </th>


                        <th>
                            CPF
                        </th>


                        <th>
                            Rol
                        </th>


                        <th>
                            Acción
                        </th>


                    </tr>

                </thead>







                <tbody>


                    {
                        users.map(
                            (user) => (


                                <tr
                                    key={user.id}
                                >


                                    <td>
                                        {user.id}
                                    </td>


                                    <td>
                                        {user.name}
                                    </td>


                                    <td>
                                        {user.email}
                                    </td>


                                    <td>
                                        {user.cpf}
                                    </td>


                                    <td>
                                        {user.role}
                                    </td>


                                    <td>


                                        <button

                                            onClick={() =>
                                                handleDelete(
                                                    user.id
                                                )
                                            }

                                        >

                                            Eliminar

                                        </button>


                                    </td>


                                </tr>


                            )

                        )
                    }



                </tbody>



            </table>



        </div>

    );

}



export default AdminUsers;