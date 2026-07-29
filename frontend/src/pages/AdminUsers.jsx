import { useEffect, useState } from "react";
import authService from "../services/authService";

function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const loadUsers = async () => {
        try {
            const data = await authService.getUsers();
            setUsers(data);
        } catch (error) {
            setError("Não foi possível carregar os usuários.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Deseja realmente excluir este usuário?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            await authService.deleteUser(id);

            setUsers(
                users.filter(user => user.id !== id)
            );

        } catch (error) {
            setError("Não foi possível excluir o usuário.");
        }
    };

    if (loading) {
        return (
            <div className="page">
                <h2>Carregando usuários...</h2>
            </div>
        );
    }

    return (
        <div className="page">
            <h1>Administração de usuários</h1>

            <p>
                Gerencie os usuários cadastrados no sistema.
            </p>

            {error && (
                <div className="message error">
                    {error}
                </div>
            )}

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>E-mail</th>
                            <th>CPF</th>
                            <th>Perfil</th>
                            <th>Ação</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.cpf}</td>
                                <td>{user.role}</td>

                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(user.id)}
                                    >
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminUsers;