import React, { useState } from "react";
import {
    useNavigate,
    useLocation
} from "react-router-dom";

function UserSidebar() {

    const navigate = useNavigate();
    const location = useLocation();

    const [collapsed, setCollapsed] =
        useState(false);

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const logout = () => {

        localStorage.removeItem(
            "user"
        );

        window.location.href = "/";
    };

    const isActive = (path) =>
        location.pathname === path;

    return (

        <>

            {/* MENU BUTTON */}

            <button
                onClick={() =>
                    setCollapsed(
                        !collapsed
                    )
                }
                style={{
                    position: "fixed",
                    top: "20px",
                    left: collapsed
                        ? "20px"
                        : "230px",
                    zIndex: 9999,
                    border: "none",
                    background:
                        "rgba(255,255,255,0.15)",
                    backdropFilter:
                        "blur(20px)",
                    color: "white",
                    width: "50px",
                    height: "50px",
                    borderRadius: "16px",
                    cursor: "pointer",
                    fontSize: "22px",
                    transition: "0.4s",
                    boxShadow:
                        "0 8px 20px rgba(0,0,0,0.2)"
                }}
            >
                ☰
            </button>

            {/* SIDEBAR */}

            <div
                style={{
                    width: collapsed
                        ? "0px"
                        : "250px",

                    background:
                        "linear-gradient(180deg,#071952,#0B57D0)",

                    color: "white",

                    minHeight: "100vh",

                    padding:
                        collapsed
                            ? "0"
                            : "30px 20px",

                    position: "fixed",

                    left: 0,

                    top: 0,

                    overflow: "hidden",

                    transition:
                        "0.4s ease",

                    boxShadow:
                        "8px 0 25px rgba(0,0,0,0.15)",

                    zIndex: 999
                }}
            >

                {/* LOGO */}

                <div
                    style={{
                        marginBottom:
                            "40px"
                    }}
                >
                    <h1
                        style={{
                            margin: 0,
                            fontSize:
                                "38px",
                            fontWeight:
                                "800",
                            letterSpacing:
                                "1px"
                        }}
                    >
                        TravelEase
                    </h1>

                    <p
                        style={{
                            color:
                                "#d8e6ff",
                            marginTop:
                                "8px"
                        }}
                    >
                        User Panel
                    </p>
                </div>

                {/* USER CARD */}

                <div
                    style={{
                        background:
                            "rgba(255,255,255,0.08)",

                        border:
                            "1px solid rgba(255,255,255,0.1)",

                        borderRadius:
                            "22px",

                        padding:
                            "18px",

                        marginBottom:
                            "30px",

                        backdropFilter:
                            "blur(20px)"
                    }}
                >
                    <p
                        style={{
                            margin: 0,
                            opacity: 0.8
                        }}
                    >
                        Welcome
                    </p>

                    <h2
                        style={{
                            marginTop:
                                "8px",
                            fontSize:
                                "28px"
                        }}
                    >
                        {
                            user?.username
                        }
                    </h2>
                </div>

                {/* BUTTONS */}

                <SidebarButton
                    active={
                        isActive(
                            "/user"
                        )
                    }
                    text="🏠 Dashboard"
                    onClick={() =>
                        navigate(
                            "/user"
                        )
                    }
                />

                <SidebarButton
                    active={
                        isActive(
                            "/profile"
                        )
                    }
                    text="👤 Profile"
                    onClick={() =>
                        navigate(
                            "/profile"
                        )
                    }
                />

                <SidebarButton
                    active={
                        isActive(
                            "/my-bookings"
                        )
                    }
                    text="📖 My Bookings"
                    onClick={() =>
                        navigate(
                            "/my-bookings"
                        )
                    }
                />

                <button
                    onClick={
                        logout
                    }
                    style={{
                        width:
                            "100%",

                        marginTop:
                            "40px",

                        padding:
                            "16px",

                        border:
                            "none",

                        borderRadius:
                            "18px",

                        background:
                            "linear-gradient(135deg,#ff3d3d,#ff1f1f)",

                        color:
                            "white",

                        fontWeight:
                            "700",

                        fontSize:
                            "17px",

                        cursor:
                            "pointer",

                        transition:
                            "0.3s",

                        boxShadow:
                            "0 8px 20px rgba(255,0,0,0.25)"
                    }}
                >
                    🚪 Logout
                </button>

            </div>
        </>
    );
}

/* BUTTON COMPONENT */

function SidebarButton({
                           text,
                           onClick,
                           active
                       }) {

    return (

        <button
            onClick={
                onClick
            }
            style={{
                width:
                    "100%",

                padding:
                    "18px",

                border:
                    "none",

                borderRadius:
                    "18px",

                marginBottom:
                    "18px",

                cursor:
                    "pointer",

                color:
                    "white",

                fontSize:
                    "18px",

                fontWeight:
                    "600",

                background:
                    active
                        ? "linear-gradient(135deg,#3B82F6,#2563EB)"
                        : "rgba(255,255,255,0.08)",

                backdropFilter:
                    "blur(20px)",

                boxShadow:
                    active
                        ? "0 10px 30px rgba(59,130,246,0.35)"
                        : "none",

                transition:
                    "0.35s ease"
            }}
        >
            {text}
        </button>
    );
}

export default UserSidebar;