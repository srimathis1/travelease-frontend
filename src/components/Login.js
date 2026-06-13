import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setUser }) {

    const navigate = useNavigate();

    const [role, setRole] = useState("");
    const [isRegister, setIsRegister] =
        useState(false);

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:
            e.target.value
        });
    };

    // ======================
    // ADMIN LOGIN
    // ======================

    const adminLogin = () => {

        if (
            form.password ===
            "admin123"
        ) {

            const adminUser = {
                username: "admin",
                role: "ADMIN"
            };

            localStorage.setItem(
                "user",
                JSON.stringify(adminUser)
            );

            setUser(adminUser);

            navigate("/admin");

        } else {

            alert("Wrong password");
        }
    };

    // ======================
    // USER LOGIN
    // ======================

    const userLogin =
        async () => {

            try {

                const res =
                    await fetch(
                        "http://localhost:8080/auth/login",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify({
                                    username:
                                    form.username,

                                    password:
                                    form.password
                                })
                        }
                    );

                if (!res.ok)
                    throw new Error();

                const data =
                    await res.json();

                const userData = {
                    ...data,
                    role:
                        "USER"
                };

                localStorage.setItem(
                    "user",
                    JSON.stringify(userData)
                );

                setUser(userData);

                navigate("/user");

            } catch {

                alert(
                    "Login Failed"
                );
            }
        };

    // ======================
    // REGISTER
    // ======================

    const registerUser =
        async () => {

            try {

                const res =
                    await fetch(
                        "http://localhost:8080/auth/register",
                        {
                            method:
                                "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(
                                    form
                                )
                        }
                    );

                if (!res.ok)
                    throw new Error();

                alert(
                    "Registered Successfully"
                );

                setIsRegister(
                    false
                );

            } catch {

                alert(
                    "Registration Failed"
                );
            }
        };

    return (

        <div
            style={{
                minHeight:
                    "100vh",

                display:
                    "flex",

                justifyContent:
                    "space-between",

                alignItems:
                    "center",

                flexWrap:
                    "wrap",

                padding:
                    "50px 8%",

                background:
                    "linear-gradient(135deg,#081F5C,#0B3EA8,#2563EB)",

                overflow:
                    "hidden",

                position:
                    "relative"
            }}
        >

            {/* FLOATING SHAPES */}

            <div
                style={{
                    position:
                        "absolute",

                    top:
                        "-120px",

                    right:
                        "-100px",

                    width:
                        "350px",

                    height:
                        "350px",

                    borderRadius:
                        "50%",

                    background:
                        "rgba(255,255,255,0.07)",

                    animation:
                        "float 7s ease-in-out infinite"
                }}
            />

            <div
                style={{
                    position:
                        "absolute",

                    bottom:
                        "-100px",

                    left:
                        "-80px",

                    width:
                        "250px",

                    height:
                        "250px",

                    borderRadius:
                        "50%",

                    background:
                        "rgba(255,255,255,0.05)",

                    animation:
                        "float 8s ease-in-out infinite"
                }}
            />

            {/* LEFT SECTION */}

            <div
                style={{
                    flex:
                        1,

                    minWidth:
                        "320px",

                    color:
                        "white",

                    zIndex:
                        2
                }}
            >

                <h1
                    style={{
                        fontSize:
                            "clamp(52px,7vw,88px)",

                        fontWeight:
                            "800",

                        marginBottom:
                            "25px"
                    }}
                >
                    TravelEase
                </h1>

                <h2
                    style={{
                        fontSize:
                            "clamp(36px,4vw,58px)",

                        lineHeight:
                            "1.3",

                        marginBottom:
                            "25px",

                        fontWeight:
                            "700"
                    }}
                >
                    Discover India With
                    Comfort &
                    Confidence
                </h2>

                <p
                    style={{
                        fontSize:
                            "22px",

                        color:
                            "#dbeafe",

                        maxWidth:
                            "700px",

                        lineHeight:
                            "1.8",

                        marginBottom:
                            "40px"
                    }}
                >
                    Explore beautiful
                    destinations,
                    manage trips,
                    discover travel analytics
                    and enjoy seamless
                    booking experiences.
                </p>

                <Feature
                    text="Smart Route Booking"
                />

                <Feature
                    text="Travel Analytics"
                />

                <Feature
                    text="Trip & Vehicle Management"
                />

                <Feature
                    text="Customer Reviews & Ratings"
                />

                <div
                    style={{
                        marginTop:
                            "50px",

                        padding:
                            "28px",

                        background:
                            "rgba(255,255,255,0.08)",

                        backdropFilter:
                            "blur(12px)",

                        borderRadius:
                            "24px",

                        maxWidth:
                            "580px",

                        border:
                            "1px solid rgba(255,255,255,0.1)"
                    }}
                >
                    <p
                        style={{
                            margin:
                                0,

                            fontSize:
                                "28px",

                            fontStyle:
                                "italic",

                            lineHeight:
                                "1.7",

                            color:
                                "#E0F2FE"
                        }}
                    >
                        "Journey beyond
                        destinations —
                        create memorable
                        experiences
                        with every trip."
                    </p>
                </div>
            </div>

            {/* LOGIN CARD */}

            <div
                style={{
                    width:
                        "100%",

                    maxWidth:
                        "430px",

                    background:
                        "rgba(255,255,255,0.12)",

                    backdropFilter:
                        "blur(20px)",

                    border:
                        "1px solid rgba(255,255,255,0.15)",

                    borderRadius:
                        "35px",

                    padding:
                        "45px",

                    boxShadow:
                        "0 20px 50px rgba(0,0,0,0.25)",

                    zIndex:
                        2
                }}
            >

                {!role && (
                    <>
                        <Title text="Welcome" />

                        <SubTitle
                            text="Choose your role to continue"
                        />

                        <Button
                            text="Continue as User"
                            onClick={() =>
                                setRole("USER")
                            }
                        />

                        <Button
                            text="Continue as Admin"
                            onClick={() =>
                                setRole("ADMIN")
                            }
                        />
                    </>
                )}

                {role === "ADMIN" && (
                    <>
                        <Title text="Admin Login" />

                        <Input
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            onChange={handleChange}
                        />

                        <Button
                            text="Login"
                            onClick={adminLogin}
                        />

                        <Back
                            onClick={() =>
                                setRole("")
                            }
                        />
                    </>
                )}

                {role === "USER" && (
                    <>
                        <Title
                            text={
                                isRegister
                                    ? "Create Account"
                                    : "User Login"
                            }
                        />

                        <Input
                            name="username"
                            placeholder="Username"
                            onChange={handleChange}
                        />

                        {isRegister && (
                            <Input
                                name="email"
                                placeholder="Email"
                                onChange={handleChange}
                            />
                        )}

                        <Input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                        />

                        <Button
                            text={
                                isRegister
                                    ? "Register"
                                    : "Login"
                            }
                            onClick={
                                isRegister
                                    ? registerUser
                                    : userLogin
                            }
                        />

                        <p
                            onClick={() =>
                                setIsRegister(
                                    !isRegister
                                )
                            }

                            style={{
                                textAlign:
                                    "center",

                                color:
                                    "white",

                                cursor:
                                    "pointer",

                                fontWeight:
                                    "600"
                            }}
                        >
                            {
                                isRegister
                                    ? "Already have account? Login"
                                    : "New user? Register"
                            }
                        </p>

                        <Back
                            onClick={() =>
                                setRole("")
                            }
                        />
                    </>
                )}
            </div>

            <style>{`
                @keyframes float {
                    0%{transform:translateY(0px);}
                    50%{transform:translateY(-20px);}
                    100%{transform:translateY(0px);}
                }

                input::placeholder{
                    color:#dbeafe;
                    opacity:1;
                    font-weight:700;
                    font-size:16px;
                }
            `}</style>

        </div>
    );
}

function Feature({ text }) {
    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            marginBottom: "22px",
            color: "white",
            fontSize: "22px"
        }}>
            <div style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: "#93C5FD"
            }} />
            {text}
        </div>
    );
}

function Button({ text, onClick }) {
    return (
        <button
            onClick={onClick}
            style={{
                width: "100%",
                padding: "18px",
                marginBottom: "18px",
                border: "none",
                borderRadius: "18px",
                background:
                    "linear-gradient(135deg,#2563EB,#3B82F6)",
                color: "white",
                fontWeight: "700",
                fontSize: "18px",
                cursor: "pointer"
            }}
        >
            {text}
        </button>
    );
}

function Input(props) {
    return (
        <input
            {...props}
            style={{
                width: "100%",
                padding: "18px",
                marginBottom: "18px",
                borderRadius: "18px",
                border:
                    "1px solid rgba(255,255,255,0.15)",
                background:
                    "rgba(255,255,255,0.12)",
                color: "white",
                fontWeight: "600",
                fontSize: "16px",
                outline: "none"
            }}
        />
    );
}

function Title({ text }) {
    return (
        <h1 style={{
            textAlign: "center",
            color: "white",
            marginBottom: "10px"
        }}>
            {text}
        </h1>
    );
}

function SubTitle({ text }) {
    return (
        <p style={{
            textAlign: "center",
            color: "#dbeafe",
            marginBottom: "30px"
        }}>
            {text}
        </p>
    );
}

function Back({ onClick }) {
    return (
        <p
            onClick={onClick}
            style={{
                textAlign: "center",
                color: "#dbeafe",
                cursor: "pointer"
            }}
        >
            ← Back
        </p>
    );
}

export default Login;