import React, {
    useEffect,
    useState
} from "react";

import UserSidebar
    from "./UserSidebar";

import AnalyticsBoard
    from "./AnalyticsBoard";

function UserDashboard() {

    const storedUser =
        JSON.parse(
            localStorage.getItem(
                "user"
            )
        );

    const [
        vehicles,
        setVehicles
    ] = useState([]);

    const [
        search,
        setSearch
    ] = useState("");

    const [
        bookingDetails,
        setBookingDetails
    ] = useState({});

    useEffect(() => {

        fetchVehicles();

    }, []);

    // ==========================
    // FETCH VEHICLES
    // ==========================

    const fetchVehicles =
        async () => {

            try {

                const response =
                    await fetch(

                        "http://localhost:8080/vehicles"
                    );

                const data =
                    await response.json();

                const today =
                    new Date();

                today.setHours(
                    0,
                    0,
                    0,
                    0
                );

                // ONLY FRESH ROUTES
                const activeTrips =
                    data.filter(

                        (
                            v
                        ) => {

                            if (
                                !v.departureDate
                            ) {

                                return false;
                            }

                            const tripDate =
                                new Date(
                                    v.departureDate
                                );

                            tripDate.setHours(
                                0,
                                0,
                                0,
                                0
                            );

                            return (
                                tripDate >=
                                today
                            );
                        }
                    );

                setVehicles(
                    activeTrips
                );

            } catch {

                alert(
                    "Error loading trips"
                );
            }
        };

    // ==========================
    // HANDLE INPUT CHANGE
    // ==========================

    const handleInputChange =
        (
            vehicleId,
            field,
            value
        ) => {

            setBookingDetails(
                (
                    prev
                ) => ({

                    ...prev,

                    [vehicleId]: {

                        ...prev[
                            vehicleId
                            ],

                        [field]:
                        value
                    }
                })
            );
        };

    // ==========================
    // BOOK VEHICLE
    // ==========================

    const handleBooking =
        async (
            vehicleId
        ) => {

            const details =
                bookingDetails[
                    vehicleId
                    ];

            if (
                !details
                    ?.returnDate
            ) {

                alert(
                    "Please select return date"
                );

                return;
            }

            try {

                const response =
                    await fetch(

                        `http://localhost:8080/bookings/book?vehicleId=${vehicleId}&userId=${storedUser.id}&returnDate=${details.returnDate}&familyMembers=${details.familyMembers || 1}`,

                        {
                            method:
                                "POST"
                        }
                    );

                if (
                    response.ok
                ) {

                    alert(
                        "✅ Booking Successful"
                    );

                    fetchVehicles();

                } else {

                    alert(
                        "❌ Booking Failed"
                    );
                }

            } catch {

                alert(
                    "❌ Server Error"
                );
            }
        };

    // ==========================
    // SEARCH FILTER
    // ==========================

    const filteredVehicles =
        vehicles.filter(

            (
                vehicle
            ) =>

                vehicle.destination
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )

                ||

                vehicle.source
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )
        );

    return (

        <div
            style={{
                display:
                    "flex",

                background:
                    "#ececf1",

                minHeight:
                    "100vh"
            }}
        >

            <UserSidebar />

            <div
                style={{
                    marginLeft:
                        "280px",

                    width:
                        "100%",

                    padding:
                        "35px"
                }}
            >

                <h1
                    style={{
                        color:
                            "#1e2088",

                        fontSize:
                            "40px",

                        marginBottom:
                            "10px"
                    }}
                >
                    Welcome,
                    {" "}
                    {
                        storedUser
                            ?.username
                    } 👋
                </h1>

                <p
                    style={{
                        marginBottom:
                            "30px",

                        color:
                            "#666"
                    }}
                >
                    Explore the best travel routes
                </p>

                {/* ANALYTICS */}
                <AnalyticsBoard />

                {/* SEARCH */}

                <input
                    type="text"

                    placeholder=
                        "🔍 Search Source or Destination"

                    value={
                        search
                    }

                    onChange={
                        (
                            e
                        ) =>
                            setSearch(
                                e.target.value
                            )
                    }

                    style={{
                        width:
                            "100%",

                        padding:
                            "16px",

                        borderRadius:
                            "14px",

                        border:
                            "1px solid #ddd",

                        marginBottom:
                            "30px",

                        fontSize:
                            "16px"
                    }}
                />

                {/* ROUTES */}

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

                    {
                        filteredVehicles.map(

                            (
                                vehicle
                            ) => (

                                <div
                                    key={
                                        vehicle.id
                                    }

                                    style={{
                                        background:
                                            "white",

                                        borderRadius:
                                            "25px",

                                        padding:
                                            "25px",

                                        boxShadow:
                                            "0 5px 18px rgba(0,0,0,0.08)"
                                    }}
                                >

                                    <h2
                                        style={{
                                            color:
                                                "#1e2088"
                                        }}
                                    >
                                        {
                                            vehicle.source
                                        }
                                        →
                                        {
                                            vehicle.destination
                                        }
                                    </h2>

                                    <hr />

                                    <p>
                                        🚘 Vehicle:
                                        {" "}
                                        {
                                            vehicle.vehicleType
                                        }
                                    </p>

                                    <p>
                                        🕒 Time:
                                        {" "}
                                        {
                                            vehicle.departureTime
                                        }
                                    </p>

                                    <p>
                                        📅 Date:
                                        {" "}
                                        {
                                            vehicle.departureDate
                                        }
                                    </p>

                                    <p>
                                        💰 ₹
                                        {
                                            vehicle.price
                                        }
                                    </p>

                                    <input
                                        type="date"

                                        onChange={
                                            (
                                                e
                                            ) =>
                                                handleInputChange(

                                                    vehicle.id,

                                                    "returnDate",

                                                    e.target.value
                                                )
                                        }

                                        style={
                                            inputStyle
                                        }
                                    />

                                    <input
                                        type="number"

                                        placeholder=
                                            "Family Members"

                                        min="1"

                                        onChange={
                                            (
                                                e
                                            ) =>
                                                handleInputChange(

                                                    vehicle.id,

                                                    "familyMembers",

                                                    e.target.value
                                                )
                                        }

                                        style={
                                            inputStyle
                                        }
                                    />

                                    <button
                                        onClick={
                                            () =>
                                                handleBooking(
                                                    vehicle.id
                                                )
                                        }

                                        style={{
                                            width:
                                                "100%",

                                            padding:
                                                "15px",

                                            background:
                                                "#1e2088",

                                            color:
                                                "white",

                                            border:
                                                "none",

                                            borderRadius:
                                                "12px",

                                            marginTop:
                                                "15px",

                                            fontWeight:
                                                "bold",

                                            cursor:
                                                "pointer"
                                        }}
                                    >
                                        Book Now
                                    </button>

                                </div>
                            )
                        )
                    }

                </div>

            </div>

        </div>
    );
}

const inputStyle = {

    width:
        "100%",

    padding:
        "14px",

    marginTop:
        "12px",

    borderRadius:
        "10px",

    border:
        "1px solid #ddd"
};

export default UserDashboard;