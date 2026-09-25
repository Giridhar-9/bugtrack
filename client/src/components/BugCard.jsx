import { useState } from "react";
import API_BASE_URL from "../api";

function BugCard({ bug, onBugDeleted, onBugUpdated }) {
    const [isEditing, setIsEditing] = useState(false);

    const [title, setTitle] = useState(bug.title);
    const [description, setDescription] = useState(bug.description || "");
    const [status, setStatus] = useState(bug.status);
    const [priority, setPriority] = useState(bug.priority);
    const [severity, setSeverity] = useState(bug.severity);

    const getStatusClass = (status) => {
        switch (status) {
            case "OPEN":
                return "bg-primary";

            case "IN PROGRESS":
                return "bg-warning text-dark";

            case "RESOLVED":
                return "bg-success";

            case "CLOSED":
                return "bg-secondary";

            default:
                return "bg-dark";
        }
    };

    const getPriorityClass = (priority) => {
        switch (priority) {
            case "LOW":
                return "bg-success";

            case "MEDIUM":
                return "bg-warning text-dark";

            case "HIGH":
                return "bg-danger";

            default:
                return "bg-secondary";
        }
    };

    const getSeverityClass = (severity) => {
        switch (severity) {
            case "MINOR":
                return "bg-success";

            case "MAJOR":
                return "bg-warning text-dark";

            case "CRITICAL":
                return "bg-danger";

            default:
                return "bg-secondary";
        }
    };

    const handleDelete = () => {
        const confirmed = window.confirm(
            `Are you sure you want to delete Bug #${bug.id}?`
        );

        if (!confirmed) {
            return;
        }

        fetch(`${API_BASE_URL}/api/bugs/${bug.id}`, {
            method: "DELETE"
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                onBugDeleted();
            })
            .catch((error) => {
                console.error("Error deleting bug:", error);
            });
    };

    const handleUpdate = (event) => {
        event.preventDefault();

        const updatedBug = {
            title: title,
            description: description,
            status: status,
            priority: priority,
            severity: severity
        };

        fetch(`${API_BASE_URL}/api/bugs/${bug.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedBug)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);

                setIsEditing(false);
                onBugUpdated();
            })
            .catch((error) => {
                console.error("Error updating bug:", error);
            });
    };

    if (isEditing) {
        return (
            <div className="card shadow-sm mb-4">
                <div className="card-body">

                    <h4 className="card-title mb-4">
                        Edit Bug #{bug.id}
                    </h4>

                    <form onSubmit={handleUpdate}>

                        <div className="mb-3">
                            <label className="form-label">
                                Title
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                value={title}
                                onChange={(event) =>
                                    setTitle(event.target.value)
                                }
                                required
                            />
                        </div>

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
                                required
                            />
                        </div>

                        <div className="row">

                            <div className="col-md-4 mb-3">
                                <label className="form-label">
                                    Status
                                </label>

                                <select
                                    className="form-select"
                                    value={status}
                                    onChange={(event) =>
                                        setStatus(event.target.value)
                                    }
                                >
                                    <option value="OPEN">OPEN</option>
                                    <option value="IN PROGRESS">
                                        IN PROGRESS
                                    </option>
                                    <option value="RESOLVED">
                                        RESOLVED
                                    </option>
                                    <option value="CLOSED">
                                        CLOSED
                                    </option>
                                </select>
                            </div>

                            <div className="col-md-4 mb-3">
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

                            <div className="col-md-4 mb-3">
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
                                    <option value="CRITICAL">
                                        CRITICAL
                                    </option>
                                </select>
                            </div>

                        </div>

                        <button
                            type="submit"
                            className="btn btn-success me-2"
                        >
                            Update Bug
                        </button>

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setIsEditing(false)}
                        >
                            Cancel
                        </button>

                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="card shadow-sm mb-4">

            <div className="card-body">

                <div className="d-flex justify-content-between align-items-start mb-3">

                    <div>
                        <h4 className="card-title mb-1">
                            #{bug.id} - {bug.title}
                        </h4>

                        <small className="text-muted">
                            Bug ID: {bug.id}
                        </small>
                    </div>

                    <span className={`badge ${getStatusClass(bug.status)}`}>
                        {bug.status}
                    </span>

                </div>

                <p className="card-text text-muted">
                    {bug.description}
                </p>

                <small className="text-muted d-block mb-3">
                    Created: {new Date(bug.created_at).toLocaleString()}
                </small>

                <div className="d-flex flex-wrap gap-2 mb-4">

                    <span>
                        Priority:
                        <span className={`badge ${getPriorityClass(bug.priority)} ms-1`}>
                            {bug.priority}
                        </span>
                    </span>

                    <span>
                        Severity:
                        <span className={`badge ${getSeverityClass(bug.severity)} ms-1`}>
                            {bug.severity}
                        </span>
                    </span>

                </div>

                <div className="d-flex gap-2">
                    <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => setIsEditing(true)}
                    >
                        Edit
                    </button>

                    <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BugCard;