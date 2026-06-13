import React, {
    useEffect,
    useState
} from "react";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    Legend
} from "recharts";

function AnalyticsBoard() {

    const [
        analytics,
        setAnalytics
    ] = useState({

        monthlyBookings: {},
        bookingsByDestination: [],
        ratingsByDestination: []
    });

    useEffect(() => {

        fetch(
            "http://localhost:8080/analytics/dashboard"
        )
            .then(
                (res) =>
                    res.json()
            )
            .then(
                (data) =>
                    setAnalytics(data)
            )
            .catch(
                (err) =>
                    console.log(err)
            );

    }, []);

    const monthlyData =

        Object.entries(
            analytics.monthlyBookings
            || {}
        ).map(

            ([month, bookings]) => ({

                month,
                bookings
            })
        );

    const bookingsData =
        analytics
            .bookingsByDestination
        || [];

    const ratingsData =
        analytics
            .ratingsByDestination
        || [];

    const COLORS = [

        "#1e2088",
        "#3949ab",
        "#5c6bc0",
        "#7986cb",
        "#9fa8da"
    ];

    return (

        <div
            style={{
                marginTop: "20px"
            }}
        >

            <div style={cardStyle}>

                <h2 style={titleStyle}>
                    📈 Travel Trend by Month
                </h2>

                <ResponsiveContainer
                    width="100%"
                    height={300}
                >

                    <LineChart
                        data={monthlyData}
                    >

                        <CartesianGrid
                            strokeDasharray="3 3"
                        />

                        <XAxis
                            dataKey="month"
                        />

                        <YAxis />

                        <Tooltip />

                        <Line
                            type="monotone"
                            dataKey="bookings"
                            stroke="#1e2088"
                            strokeWidth={4}
                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

            <div style={cardStyle}>

                <h2 style={titleStyle}>
                    🔥 Most Booked Destinations
                </h2>

                <ResponsiveContainer
                    width="100%"
                    height={350}
                >

                    <BarChart
                        data={bookingsData}
                    >

                        <CartesianGrid
                            strokeDasharray="3 3"
                        />

                        <XAxis
                            dataKey="destination"
                        />

                        <YAxis />

                        <Tooltip />

                        <Bar
                            dataKey="count"
                            fill="#1e2088"
                            radius={[
                                10,
                                10,
                                0,
                                0
                            ]}
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

            <div style={cardStyle}>

                <h2 style={titleStyle}>
                    ⭐ Average Ratings by Destination
                </h2>

                <ResponsiveContainer
                    width="100%"
                    height={350}
                >

                    <PieChart>

                        <Pie
                            data={ratingsData}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={120}
                            label={({
                                        name,
                                        value
                                    }) =>
                                `${name}: ${value.toFixed(1)}⭐`
                            }
                        >

                            {
                                ratingsData.map(

                                    (
                                        entry,
                                        index
                                    ) => (

                                        <Cell
                                            key={index}
                                            fill={
                                                COLORS[
                                                index %
                                                COLORS.length
                                                    ]
                                            }
                                        />
                                    )
                                )
                            }

                        </Pie>

                        <Tooltip />

                        <Legend />

                    </PieChart>

                </ResponsiveContainer>

            </div>

        </div>
    );
}

const titleStyle = {

    color: "#1e2088",
    marginBottom: "20px"
};

const cardStyle = {

    background: "white",
    borderRadius: "20px",
    padding: "30px",
    marginBottom: "30px",
    boxShadow:
        "0 5px 15px rgba(0,0,0,0.08)"
};

export default AnalyticsBoard;