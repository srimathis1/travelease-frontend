import React,
{
    useEffect,
    useState
}
    from "react";

function AdminBookings() {

    const [bookings,
        setBookings] =
        useState([]);

    // =========================
    // LOAD BOOKINGS
    // =========================

    useEffect(() => {

        fetch(
            "http://localhost:8080/bookings"
        )

            .then((res) =>
                res.json()
            )

            .then((data) =>
                setBookings(data)
            )

            .catch((err) =>
                console.log(err));

    }, []);

    // =========================
    // TRIP STATUS LOGIC
    // =========================

    const getTripStatus =
        (
            departureDate,
            returnDate
        ) => {

            const today =
                new Date();

            const depart =
                new Date(
                    departureDate
                );

            const returnTrip =
                new Date(
                    returnDate
                );

            // BEFORE TRIP

            if (
                today < depart
            ) {

                return {
                    text:
                        "UPCOMING",

                    color:
                        "#ff9800"
                };
            }

            // DURING TRIP

            if (

                today >= depart
                &&

                today <=
                returnTrip

            ) {

                return {
                    text:
                        "ONGOING",

                    color:
                        "#2196f3"
                };
            }

            // AFTER RETURN

            return {

                text:
                    "COMPLETED",

                color:
                    "#28a745"
            };
        };

    return (

        <div
            style={{
                padding:
                    "40px",

                background:
                    "#ececf1",

                minHeight:
                    "100vh"
            }}
        >

            <h1
                style={{
                    color:
                        "#1b1b78",

                    marginBottom:
                        "30px"
                }}
            >
                📖 All Bookings
            </h1>

            <div
                style={{
                    display:
                        "grid",

                    gridTemplateColumns:
                        "repeat(auto-fit,minmax(380px,1fr))",

                    gap:
                        "25px"
                }}
            >

                {bookings.map(

                    (
                        booking
                    ) => {

                        const status =
                            getTripStatus(

                                booking.departureDate,

                                booking.returnDate
                            );

                        return (

                            <div
                                key={
                                    booking.id
                                }

                                style={
                                    cardStyle
                                }
                            >

                                {/* ROUTE */}

                                <h2
                                    style={{
                                        color:
                                            "#1b1b78"
                                    }}
                                >
                                    Chennai
                                    →
                                    {
                                        booking.destination
                                    }
                                </h2>

                                <hr />

                                {/* USER */}

                                <p>
                                    👤{" "}
                                    {
                                        booking.username
                                    }
                                </p>

                                <p>
                                    📞{" "}
                                    {
                                        booking.phone
                                    }
                                </p>

                                <p>
                                    📍{" "}
                                    {
                                        booking.address
                                    }
                                </p>

                                <p>
                                    🚘{" "}
                                    {
                                        booking.vehicleType
                                    }
                                </p>

                                <p>
                                    🕒{" "}
                                    {
                                        booking.departureTime
                                    }
                                </p>

                                <p>
                                    📅
                                    Departure:
                                    {" "}
                                    {
                                        booking.departureDate
                                    }
                                </p>

                                <p>
                                    🔁
                                    Return:
                                    {" "}
                                    {
                                        booking.returnDate
                                    }
                                </p>

                                <p>
                                    👨‍👩‍👧‍👦
                                    Family:
                                    {" "}
                                    {
                                        booking.familyMembers
                                    }
                                </p>

                                <p>
                                    💰 ₹
                                    {
                                        booking.price
                                    }
                                </p>

                                {/* STATUS */}

                                <div
                                    style={{

                                        background:
                                        status.color,

                                        color:
                                            "white",

                                        padding:
                                            "12px",

                                        borderRadius:
                                            "12px",

                                        textAlign:
                                            "center",

                                        fontWeight:
                                            "bold",

                                        marginTop:
                                            "15px"
                                    }}
                                >
                                    {
                                        status.text
                                    }
                                </div>

                                {/* BUTTON */}

                                <button
                                    style={{

                                        marginTop:
                                            "18px",

                                        width:
                                            "100%",

                                        padding:
                                            "14px",

                                        border:
                                            "none",

                                        borderRadius:
                                            "12px",

                                        background:
                                        status.color,

                                        color:
                                            "white",

                                        fontSize:
                                            "16px",

                                        cursor:
                                            "default"
                                    }}
                                >

                                    {
                                        status.text ===
                                        "UPCOMING"

                                            ?

                                            "Trip Not Started"

                                            :

                                            status.text ===
                                            "ONGOING"

                                                ?

                                                "Trip Running"

                                                :

                                                "Completed ✔"
                                    }

                                </button>

                            </div>
                        );
                    }
                )}

            </div>

        </div>
    );
}

const cardStyle = {

    background:
        "white",

    padding:
        "25px",

    borderRadius:
        "20px",

    boxShadow:
        "0px 4px 15px rgba(0,0,0,0.1)"
};

export default AdminBookings;