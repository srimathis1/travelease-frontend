import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

function AdminLayout() {

    return (

        <div
            style={{
                display: "flex",

                minHeight:
                    "100vh",

                background:
                    "#eef3ff"
            }}
        >

            {/* SIDEBAR */}

            <AdminSidebar />

            {/* MAIN CONTENT */}

            <div
                style={{
                    flex: 1,

                    padding:
                        "35px",

                    overflowY:
                        "auto",

                    background:
                        "linear-gradient(180deg,#f7f9ff,#edf3ff)"
                }}
            >

                {/* TOP HEADER */}

                <div
                    style={{
                        marginBottom:
                            "30px",

                        background:
                            "white",

                        borderRadius:
                            "24px",

                        padding:
                            "22px 30px",

                        boxShadow:
                            "0 6px 18px rgba(0,0,0,0.06)"
                    }}
                >

                    <h1
                        style={{
                            margin: 0,

                            color:
                                "#071952",

                            fontWeight:
                                "600"
                        }}
                    >
                        Admin Dashboard
                    </h1>

                    <p
                        style={{
                            marginTop:
                                "8px",

                            color:
                                "#667085"
                        }}
                    >
                        Manage routes,
                        bookings and
                        travel operations
                    </p>

                </div>

                {/* PAGE */}

                <Outlet />

            </div>

        </div>
    );
}

export default AdminLayout;