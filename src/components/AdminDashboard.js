import API_BASE_URL from "../config";
import React, {
    useEffect,
    useState
} from "react";

function AdminDashboard() {

    const [stats,
        setStats] =
        useState({

            users: 0,
            vehicles: 0,
            bookings: 0,
            revenue: 0,
            activeTrips: 0,
            completedTrips: 0,

            vehicleBreakdown: {
                cars: 0,
                buses: 0,
                others: 0
            }
        });

    // =========================
    // LOAD DASHBOARD
    // =========================

    useEffect(() => {

        fetch(
            `${API_BASE_URL}/dashboard/stats`
        )
            .then((res) => res.json())

            .then((data) => {

                setStats({

                    users:
                        data.users || 0,

                    vehicles:
                        data.vehicles || 0,

                    bookings:
                        data.bookings || 0,

                    revenue:
                        data.revenue || 0,

                    activeTrips:
                        data.activeTrips || 0,

                    completedTrips:
                        data.completedTrips || 0,

                    vehicleBreakdown:
                        data.vehicleBreakdown || {
                            cars: 0,
                            buses: 0,
                            others: 0
                        }
                });

            })

            .catch((err) =>
                console.log(err)
            );

    }, []);

    return (

        <div>

            {/* TITLE */}

            <h1
                style={{
                    color: "#1b1b78",
                    marginBottom: "35px",
                    fontSize: "42px",
                    fontWeight: "bold"
                }}
            >
                Dashboard Overview
            </h1>

            {/* ========================= */}
            {/* STATS */}
            {/* ========================= */}

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit,minmax(240px,1fr))",
                    gap: "25px"
                }}
            >

                <Card
                    number={stats.users}
                    title="Users"
                />

                <Card
                    number={stats.vehicles}
                    title="Agency Vehicles"
                />

                <Card
                    number={stats.bookings}
                    title="Bookings"
                />

                <Card
                    number={`₹${stats.revenue}`}
                    title="Revenue"
                />

                <Card
                    number={stats.activeTrips}
                    title="Active Trips"
                />

                <Card
                    number={stats.completedTrips}
                    title="Completed Trips"
                />

            </div>

            {/* ========================= */}
            {/* VEHICLE BREAKDOWN */}
            {/* ========================= */}

            <div
                style={{
                    background: "white",
                    marginTop: "35px",
                    padding: "30px",
                    borderRadius: "20px",
                    boxShadow:
                        "0 4px 15px rgba(0,0,0,0.08)"
                }}
            >

                <h2
                    style={{
                        color: "#1b1b78",
                        marginBottom: "20px"
                    }}
                >
                    Vehicle Breakdown
                </h2>

                <div
                    style={{
                        display: "flex",
                        gap: "30px",
                        flexWrap: "wrap"
                    }}
                >

                    <BreakdownCard
                        emoji="🚗"
                        title="Cars"
                        value={
                            stats?.vehicleBreakdown?.cars || 0
                        }
                    />

                    <BreakdownCard
                        emoji="🚌"
                        title="Bus"
                        value={
                            stats?.vehicleBreakdown?.buses || 0
                        }
                    />

                    <BreakdownCard
                        emoji="🚐"
                        title="Others"
                        value={
                            stats?.vehicleBreakdown?.others || 0
                        }
                    />

                </div>

            </div>

        </div>
    );
}

// =========================
// MAIN CARD
// =========================

function Card({
                  number,
                  title
              }) {

    return (

        <div
            style={cardStyle}
        >
            <h1
                style={{
                    color: "#1b1b78",
                    fontSize: "48px",
                    marginBottom: "10px"
                }}
            >
                {number}
            </h1>

            <h3
                style={{
                    color: "#555"
                }}
            >
                {title}
            </h3>

        </div>
    );
}

// =========================
// BREAKDOWN CARD
// =========================

function BreakdownCard({
                           emoji,
                           title,
                           value
                       }) {

    return (
        <div
            style={{
                flex: 1,
                minWidth: "200px",
                background: "#f4f5fa",
                borderRadius: "16px",
                padding: "25px",
                textAlign: "center"
            }}
        >

            <h1>{emoji}</h1>

            <h2>{title}</h2>

            <h1
                style={{
                    color: "#1b1b78"
                }}
            >
                {value}
            </h1>

        </div>
    );
}

// =========================
// STYLES
// =========================

const cardStyle = {

    background: "white",

    padding: "30px",

    borderRadius: "20px",

    textAlign: "center",

    boxShadow:
        "0 4px 15px rgba(0,0,0,0.08)"
};

export default AdminDashboard;