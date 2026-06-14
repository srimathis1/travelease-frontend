import API_BASE_URL from "../config";
import React, {
    useEffect,
    useState
} from "react";

import "./AdminRoutes.css";

function AdminRoutes() {

    const [vehicles,
        setVehicles] =
        useState([]);

    const [form,
        setForm] =
        useState({

            source: "",
            destination: "",
            vehicleType: "",
            departureTime: "",
            departureDate: "",
            price: ""
        });

    // =========================
    // LOAD VEHICLES
    // =========================

    const fetchVehicles = () => {

        fetch(
            `${API_BASE_URL}/vehicles`
        )
            .then((res) =>
                res.json()
            )

            .then((data) => {

                setVehicles(data);

            })

            .catch((err) =>
                console.log(err)
            );
    };

    useEffect(() => {

        fetchVehicles();

    }, []);

    // =========================
    // HANDLE INPUT
    // =========================

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]:
            e.target.value
        });
    };

    // =========================
    // ADD VEHICLE
    // =========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const res = await fetch(
                `${API_BASE_URL}/vehicles`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(form)
                }
            );

            if (!res.ok)
                throw new Error();

            alert(
                "✅ Trip Added Successfully"
            );

            fetchVehicles();

            setForm({

                source: "",

                destination: "",

                vehicleType: "",

                departureTime: "",

                departureDate: "",

                price: ""
            });

        } catch {

            alert(
                "❌ Failed to Add Trip"
            );
        }
    };

    // =========================
    // DELETE VEHICLE
    // =========================

    const deleteVehicle = async (id) => {

        try {

            await fetch(

                `${API_BASE_URL}/vehicles/${id}`,

                {
                    method: "DELETE"
                }
            );

            fetchVehicles();

        } catch {

            alert(
                "❌ Delete Failed"
            );
        }
    };

    return (

        <div className="routes-container">

            <h2>
                🚗 Manage Trips
            </h2>

            {/* FORM */}

            <form
                className="route-form"
                onSubmit={handleSubmit}
            >

                <input
                    name="source"
                    placeholder="Source"
                    value={form.source}
                    onChange={handleChange}
                />

                <input
                    name="destination"
                    placeholder="Destination"
                    value={form.destination}
                    onChange={handleChange}
                />

                <input
                    name="vehicleType"
                    placeholder="Car / Bus"
                    value={form.vehicleType}
                    onChange={handleChange}
                />

                <input
                    name="departureTime"
                    placeholder="Departure Time"
                    value={form.departureTime}
                    onChange={handleChange}
                />

                <input
                    type="date"
                    name="departureDate"
                    value={form.departureDate}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={form.price}
                    onChange={handleChange}
                />

                <button type="submit">
                    Add Trip
                </button>

            </form>

            {/* TABLE */}

            <table className="routes-table">

                <thead>

                <tr>
                    <th>ID</th>
                    <th>Source</th>
                    <th>Destination</th>
                    <th>Vehicle</th>
                    <th>Time</th>
                    <th>Date</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>

                </thead>

                <tbody>

                {vehicles.length === 0 ? (

                    <tr>
                        <td colSpan="9">
                            No Trips Available
                        </td>
                    </tr>

                ) : (

                    vehicles.map((v) => (

                        <tr key={v.id}>

                            <td>{v.id}</td>

                            <td>{v.source}</td>

                            <td>{v.destination}</td>

                            <td>{v.vehicleType}</td>

                            <td>{v.departureTime}</td>

                            <td>{v.departureDate}</td>

                            <td>₹{v.price}</td>

                            <td>
                                {v.booked
                                    ? "Booked"
                                    : "Available"}
                            </td>

                            <td>

                                <button
                                    className="delete-btn"
                                    onClick={() =>
                                        deleteVehicle(v.id)
                                    }
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>
                    ))
                )}

                </tbody>

            </table>

        </div>
    );
}

export default AdminRoutes;