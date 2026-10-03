import { useState } from "react";
import API_BASE_URL from "../api";

function BugForm({ onBugCreated }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("MEDIUM");
    const [severity, setSeverity] = useState("MEDIUM");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [assignedTo, setAssignedTo] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        setMessage("");
        setError("");

        const newBug = {
            title,
            description,
            priority,
            severity,
            assignedTo: assignedTo ? Number(assignedTo) : null
        };

        fetch(`${API_BASE_URL}/api/bugs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newBug)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to create bug");
                }

                return response.json();
            })
            .then((data) => {
                console.log(data);

                setMessage("Bug created successfully!");

                setTitle("");
                setDescription("");
                setPriority("MEDIUM");
                setSeverity("MEDIUM");

                onBugCreated();
            })
            .catch((error) => {
                console.error("Error creating bug:", error);
                setError("Failed to create bug. Please try again.");
            });
    };

    return (
        <div className="card shadow-sm mt-4">
            <div className="card-body">

                <h3 className="card-title mb-4">
                    Create New Bug
                </h3>

                {message && (
                    <div className="alert alert-success">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    {/* Title */}
                    <div className="mb-3">
                        <label className="form-label">
                            Bug Title
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            value={title}
                            onChange={(event) =>
                                setTitle(event.target.value)
                            }
                            placeholder="Enter bug title"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="mb-3">
                        <label className="form-label">
                            Description
                        </label>

                        <textarea
                            className="form-control"
                            rows="4"
                            value={description}
                            onChange={(event) =>
                                setDescription(event.target.value)
                            }
                            placeholder="Describe the bug..."
                            required
                        />
                    </div>

                    {/* Priority + Severity */}
                    <div className="row">

                        <div className="col-md-6 mb-3">
                            <label className="form-label">
                                Priority
                            </label>

                            <select
                                className="form-select"
                                value={priority}
                                onChange={(event) =>
                                    setPriority(event.target.value)
                                }
                            >
                                <option value="LOW">LOW</option>
                                <option value="MEDIUM">MEDIUM</option>
                                <option value="HIGH">HIGH</option>
                            </select>
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">
                                Severity
                            </label>

                            <select
                                className="form-select"
                                value={severity}
                                onChange={(event) =>
                                    setSeverity(event.target.value)
                                }
                            >
                                <option value="MINOR">MINOR</option>
                                <option value="MAJOR">MAJOR</option>
                                <option value="CRITICAL">CRITICAL</option>
                            </select>
                        </div>

                    </div>
                    
                    {/*Assigned to field*/}
                    <div className="mb-3">
                        <label className="form-label">Assigned Developer ID</label>
                        <input
                            type="number"
                            className="form-control"
                            value={assignedTo}
                            onChange={(e) => setAssignedTo(e.target.value)}
                            placeholder="Enter developer ID"
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        Create Bug
                    </button>

                </form>

            </div>
        </div>
    );
}

export default BugForm;