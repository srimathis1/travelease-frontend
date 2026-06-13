import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import { useState } from "react";

import Login from "./components/Login";

import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./components/AdminDashboard";
import AdminRoutes from "./components/AdminRoutes";
import AdminBookings from "./components/AdminBookings";

import UserDashboard from "./components/UserDashboard";
import UserBookings from "./components/UserBookings";
import Profile from "./components/Profile";

function App() {

    const [user, setUser] = useState(
        JSON.parse(
            localStorage.getItem(
                "user"
            )
        )
    );

    const currentUser =
        user ||
        JSON.parse(
            localStorage.getItem(
                "user"
            )
        );

    return (
        <BrowserRouter>

            <Routes>

                {/* LOGIN */}
                <Route
                    path="/"
                    element={
                        <Login
                            setUser={
                                setUser
                            }
                        />
                    }
                />

                {/* ================= ADMIN ================= */}

                <Route
                    path="/admin"
                    element={
                        currentUser?.role ===
                        "ADMIN"

                            ?

                            <AdminLayout />

                            :

                            <Navigate
                                to="/"
                            />
                    }
                >
                    <Route
                        index
                        element={
                            <AdminDashboard />
                        }
                    />

                    <Route
                        path="routes"
                        element={
                            <AdminRoutes />
                        }
                    />

                    <Route
                        path="bookings"
                        element={
                            <AdminBookings />
                        }
                    />
                </Route>

                {/* ================= USER ================= */}

                <Route
                    path="/user"
                    element={
                        currentUser?.role ===
                        "USER"

                            ?

                            <UserDashboard />

                            :

                            <Navigate
                                to="/"
                            />
                    }
                />

                <Route
                    path="/profile"
                    element={
                        currentUser?.role ===
                        "USER"

                            ?

                            <Profile />

                            :

                            <Navigate
                                to="/"
                            />
                    }
                />

                <Route
                    path="/my-bookings"
                    element={
                        currentUser?.role ===
                        "USER"

                            ?

                            <UserBookings />

                            :

                            <Navigate
                                to="/"
                            />
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;