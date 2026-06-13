import React, {
    useEffect,
    useState
} from "react";

import UserSidebar
    from "./UserSidebar";

function UserBookings() {

    const [
        bookings,
        setBookings
    ] = useState([]);

    const [
        feedbacks,
        setFeedbacks
    ] = useState({});

    const [
        submittedFeedbacks,
        setSubmittedFeedbacks
    ] = useState([]);

    const user =
        JSON.parse(
            localStorage.getItem(
                "user"
            )
        );

    useEffect(() => {

        fetchBookings();
        fetchFeedbacks();

    }, []);

    // =====================
    // FETCH BOOKINGS
    // =====================

    const fetchBookings =
        async () => {

            try {

                const res =
                    await fetch(

                        `http://localhost:8080/bookings/user/${user.id}`

                    );

                const data =
                    await res.json();

                setBookings(
                    Array.isArray(
                        data
                    )
                        ? data
                        : []
                );

            } catch (
                error
                ) {

                console.log(
                    error
                );
            }
        };

    // =====================
    // FETCH FEEDBACKS
    // =====================

    const fetchFeedbacks =
        async () => {

            try {

                const res =
                    await fetch(

                        "http://localhost:8080/feedback/all"
                    );

                const data =
                    await res.json();

                const ids =
                    data.map(

                        (
                            feedback
                        ) =>

                            feedback.bookingId
                    );

                setSubmittedFeedbacks(
                    ids
                );

            } catch {

                console.log(
                    "Feedback fetch failed"
                );
            }
        };

    // =====================
    // STATUS LOGIC
    // =====================

    const getTripStatus =
        (
            departureDate,
            returnDate
        ) => {

            const today =
                new Date();

            today.setHours(
                0,
                0,
                0,
                0
            );

            const depart =
                new Date(
                    departureDate
                );

            const ret =
                new Date(
                    returnDate
                );

            depart.setHours(
                0,
                0,
                0,
                0
            );

            ret.setHours(
                0,
                0,
                0,
                0
            );

            if (
                today <
                depart
            ) {

                return "UPCOMING";
            }

            if (
                today >=
                depart

                &&

                today <=
                ret
            ) {

                return "ONGOING";
            }

            return "COMPLETED";
        };

    // =====================
    // FEEDBACK LOGIC
    // =====================

    const canGiveFeedback =
        (
            booking
        ) => {

            const status =
                getTripStatus(

                    booking.departureDate,

                    booking.returnDate
                );

            return (

                status ===
                "COMPLETED"

                &&

                !submittedFeedbacks.includes(

                    booking.id
                )
            );
        };

    const handleFeedback =
        (
            bookingId,
            field,
            value
        ) => {

            setFeedbacks(
                prev => ({

                    ...prev,

                    [bookingId]: {

                        ...prev[
                            bookingId
                            ],

                        [field]:
                        value
                    }
                })
            );
        };

    // =====================
    // SUBMIT FEEDBACK
    // =====================

    const submitFeedback =
        async (
            booking
        ) => {

            const feedback =
                feedbacks[
                    booking.id
                    ];

            if (
                !feedback
                    ?.rating
            ) {

                alert(
                    "Please select rating"
                );

                return;
            }

            try {

                await fetch(

                    "http://localhost:8080/feedback/add",

                    {

                        method:
                            "POST",

                        headers: {

                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify({

                                userId:
                                booking.userId,

                                bookingId:
                                booking.id,

                                destination:
                                booking.destination,

                                rating:
                                    Number(
                                        feedback.rating
                                    ),

                                comment:
                                    feedback.comment
                                    || ""
                            })
                    }
                );

                alert(
                    "✅ Feedback Submitted"
                );

                fetchFeedbacks();

            } catch {

                alert(
                    "❌ Failed to submit feedback"
                );
            }
        };

    return (

        <div
            style={{
                display:
                    "flex",

                background:
                    "#ececf2",

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
                        "40px"
                }}
            >

                <h1
                    style={{
                        color:
                            "#1e2088",

                        fontSize:
                            "50px"
                    }}
                >
                    📖 My Bookings
                </h1>

                <div
                    style={{
                        display:
                            "grid",

                        gridTemplateColumns:
                            "repeat(auto-fit,minmax(370px,1fr))",

                        gap:
                            "25px"
                    }}
                >

                    {
                        bookings.map(

                            booking => {

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

                                        style={cardStyle}
                                    >

                                        <h2>
                                            Chennai →
                                            {
                                                booking.destination
                                            }
                                        </h2>

                                        <p>
                                            📅 Departure:
                                            {" "}
                                            {
                                                booking.departureDate
                                            }
                                        </p>

                                        <p>
                                            🔁 Return:
                                            {" "}
                                            {
                                                booking.returnDate
                                            }
                                        </p>

                                        <p>
                                            💰 ₹
                                            {
                                                booking.price
                                            }
                                        </p>

                                        <button
                                            style={{
                                                ...statusStyle,
                                                background:

                                                    status ===
                                                    "COMPLETED"

                                                        ? "#28a745"

                                                        :

                                                        status ===
                                                        "ONGOING"

                                                            ? "#2196f3"

                                                            : "#ff9800"
                                            }}
                                        >
                                            {
                                                status
                                            }
                                        </button>

                                        {

                                            canGiveFeedback(
                                                booking
                                            )

                                            &&

                                            <div
                                                style={{
                                                    marginTop:
                                                        "20px"
                                                }}
                                            >

                                                <h3>
                                                    ⭐ Give Feedback
                                                </h3>

                                                <select
                                                    onChange={
                                                        (e) =>
                                                            handleFeedback(

                                                                booking.id,

                                                                "rating",

                                                                e.target.value
                                                            )
                                                    }

                                                    style={
                                                        inputStyle
                                                    }
                                                >

                                                    <option>
                                                        Select Rating
                                                    </option>

                                                    <option value="5">
                                                        ⭐⭐⭐⭐⭐
                                                    </option>

                                                    <option value="4">
                                                        ⭐⭐⭐⭐
                                                    </option>

                                                    <option value="3">
                                                        ⭐⭐⭐
                                                    </option>

                                                    <option value="2">
                                                        ⭐⭐
                                                    </option>

                                                    <option value="1">
                                                        ⭐
                                                    </option>

                                                </select>

                                                <textarea

                                                    placeholder=
                                                        "Comment"

                                                    onChange={
                                                        (e) =>
                                                            handleFeedback(

                                                                booking.id,

                                                                "comment",

                                                                e.target.value
                                                            )
                                                    }

                                                    style={
                                                        inputStyle
                                                    }
                                                />

                                                <button
                                                    onClick={() =>
                                                        submitFeedback(
                                                            booking
                                                        )
                                                    }

                                                    style={submitBtn}
                                                >
                                                    Submit Feedback
                                                </button>

                                            </div>
                                        }

                                    </div>
                                );
                            }
                        )
                    }

                </div>

            </div>

        </div>
    );
}

const cardStyle = {
    background: "white",
    borderRadius: "20px",
    padding: "25px"
};

const statusStyle = {
    width: "100%",
    border: "none",
    padding: "12px",
    color: "white",
    borderRadius: "10px",
    fontWeight: "bold"
};

const inputStyle = {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    borderRadius: "10px"
};

const submitBtn = {
    width: "100%",
    marginTop: "15px",
    background: "#1e2088",
    color: "white",
    border: "none",
    padding: "15px",
    borderRadius: "12px"
};

export default UserBookings;