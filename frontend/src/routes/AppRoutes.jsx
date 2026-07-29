import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import ChangePassword from "../pages/ChangePassword";
import AdminUsers from "../pages/AdminUsers";


import ProtectedRoute from "../components/ProtectedRoute";



function AppRoutes() {


    return (

        <BrowserRouter>


            <Routes>


                {/* Públicas */}

                <Route
                    path="/login"
                    element={<Login />}
                />


                <Route
                    path="/register"
                    element={<Register />}
                />





                {/* Privadas */}

                <Route
                    element={<ProtectedRoute />}
                >


                    <Route
                        path="/home"
                        element={<Home />}
                    />


                    <Route
                        path="/change-password"
                        element={<ChangePassword />}
                    />


                    <Route
                        path="/admin/users"
                        element={<AdminUsers />}
                    />


                </Route>





                {/* Redirección inicial */}

                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/login"
                        />
                    }
                />


            </Routes>


        </BrowserRouter>

    );

}



export default AppRoutes;