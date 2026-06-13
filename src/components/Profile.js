import React, { useEffect, useState } from "react";
import UserSidebar from "./UserSidebar";

function Profile() {

    const storedUser = JSON.parse(
        localStorage.getItem("user")
    );

    const [profile, setProfile] = useState({
        username: "",
        email: "",
        phone: "",
        address: ""
    });

    useEffect(() => {

        if (storedUser) {

            setProfile({
                username:
                    storedUser.username || "",

                email:
                    storedUser.email || "",

                phone:
                    storedUser.phone || "",

                address:
                    storedUser.address || ""
            });
        }

    }, []);

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;

        setProfile({
            ...profile,
            [name]: value
        });
    };

    const updateProfile = () => {

        const updatedUser = {
            ...storedUser,
            ...profile
        };

        localStorage.setItem(
            "user",
            JSON.stringify(updatedUser)
        );

        alert(
            "✅ Profile Updated!"
        );
    };

    return (

        <div
            style={{
                display: "flex",
                background: "#ececf2",
                minHeight: "100vh"
            }}
        >

            <UserSidebar />

            <div
                style={{
                    marginLeft: "300px",
                    width: "100%",
                    padding: "40px"
                }}
            >

                <h1
                    style={{
                        color: "#1e2088",
                        fontSize: "55px",
                        marginBottom: "35px"
                    }}
                >
                    👤 My Profile
                </h1>

                <div
                    style={{
                        background: "white",
                        borderRadius: "30px",
                        padding: "40px",
                        maxWidth: "1100px",
                        boxShadow:
                            "0 6px 18px rgba(0,0,0,0.1)"
                    }}
                >

                    <input
                        type="text"
                        name="username"
                        value={profile.username}
                        onChange={handleChange}
                        placeholder="Username"
                        style={inputStyle}
                    />

                    <input
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                        placeholder="Email"
                        style={inputStyle}
                    />

                    <input
                        type="text"
                        name="phone"
                        value={profile.phone}
                        onChange={handleChange}
                        placeholder="Phone"
                        style={inputStyle}
                    />

                    <textarea
                        name="address"
                        value={profile.address}
                        onChange={handleChange}
                        placeholder="Address"
                        style={{
                            ...inputStyle,
                            minHeight: "180px",
                            resize: "vertical"
                        }}
                    />

                    <button
                        onClick={updateProfile}
                        style={{
                            width: "100%",
                            padding: "18px",
                            border: "none",
                            borderRadius: "16px",
                            background: "#1e2088",
                            color: "white",
                            fontSize: "22px",
                            fontWeight: "bold",
                            cursor: "pointer",
                            marginTop: "10px"
                        }}
                    >
                        Update Profile
                    </button>

                </div>

            </div>

        </div>
    );
}

const inputStyle = {
    width: "100%",
    padding: "18px",
    marginBottom: "25px",
    borderRadius: "18px",
    border: "1px solid #ddd",
    fontSize: "20px",
    outline: "none",
    boxSizing: "border-box"
};

export default Profile;