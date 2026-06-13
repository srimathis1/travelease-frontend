import React, {
    useState
} from "react";

import {
    useNavigate,
    useLocation
} from "react-router-dom";

function AdminSidebar() {

    const navigate =
        useNavigate();

    const location =
        useLocation();

    const [collapsed,
        setCollapsed
    ] = useState(false);

    const logout =
        () => {

            localStorage
                .removeItem(
                    "user"
                );

            window.location
                .href = "/";
        };

    const isActive =
        (path) =>
            location
                .pathname
            === path;

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
                    position:
                        "fixed",

                    top:
                        "20px",

                    left:
                        collapsed
                            ? "20px"
                            : "230px",

                    zIndex:
                        9999,

                    width:
                        "50px",

                    height:
                        "50px",

                    border:
                        "none",

                    borderRadius:
                        "16px",

                    background:
                        "rgba(255,255,255,0.15)",

                    backdropFilter:
                        "blur(20px)",

                    color:
                        "white",

                    fontSize:
                        "22px",

                    cursor:
                        "pointer",

                    transition:
                        "0.4s",

                    boxShadow:
                        "0 8px 20px rgba(0,0,0,0.2)"
                }}
            >
                ☰
            </button>

            {/* SIDEBAR */}

            <div
                style={{
                    width:
                        collapsed
                            ? "0"
                            : "250px",

                    background:
                        "linear-gradient(180deg,#071952,#0B57D0)",

                    minHeight:
                        "100vh",

                    color:
                        "white",

                    position:
                        "fixed",

                    left: 0,

                    top: 0,

                    overflow:
                        "hidden",

                    transition:
                        "0.4s ease",

                    padding:
                        collapsed
                            ? "0"
                            : "30px 20px",

                    boxShadow:
                        "8px 0 25px rgba(0,0,0,0.2)",

                    zIndex:
                        999
                }}
            >

                {/* TITLE */}

                <div
                    style={{
                        marginBottom:
                            "40px"
                    }}
                >
                    <h1
                        style={{
                            margin:
                                0,

                            fontSize:
                                "36px",

                            fontWeight:
                                "800"
                        }}
                    >
                        TravelEase
                    </h1>

                    <p
                        style={{
                            color:
                                "#dce7ff"
                        }}
                    >
                        Admin Panel
                    </p>
                </div>

                <SidebarButton
                    active={
                        isActive(
                            "/admin"
                        )
                    }

                    text="📊 Dashboard"

                    onClick={() =>
                        navigate(
                            "/admin"
                        )
                    }
                />

                <SidebarButton
                    active={
                        isActive(
                            "/admin/routes"
                        )
                    }

                    text="🚗 Trips"

                    onClick={() =>
                        navigate(
                            "/admin/routes"
                        )
                    }
                />

                <SidebarButton
                    active={
                        isActive(
                            "/admin/bookings"
                        )
                    }

                    text="📖 Bookings"

                    onClick={() =>
                        navigate(
                            "/admin/bookings"
                        )
                    }
                />

                {/* LOGOUT */}

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
                            "pointer"
                    }}
                >
                    🚪 Logout
                </button>

            </div>
        </>
    );
}

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
                    "17px",

                fontWeight:
                    "600",

                background:
                    active
                        ? "linear-gradient(135deg,#3B82F6,#2563EB)"
                        : "rgba(255,255,255,0.08)",

                backdropFilter:
                    "blur(20px)",

                transition:
                    "0.3s ease",

                boxShadow:
                    active
                        ? "0 8px 25px rgba(59,130,246,0.35)"
                        : "none"
            }}
        >
            {text}
        </button>
    );
}

export default AdminSidebar;