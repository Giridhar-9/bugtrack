import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import BugCard from "./components/BugCard";
import BugForm from "./components/BugForm";
import BugStats from "./components/BugStats";
import API_BASE_URL from "./api";

function App() {
  const [bugs, setBugs] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");
  const [severityFilter, setSeverityFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBugs = () => {
    setLoading(true);
    setError("");

    fetch(`${API_BASE_URL}/api/bugs`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch bugs");
        }

        return response.json();
      })
      .then((data) => {
        setBugs(data);
      })
      .catch((error) => {
        console.error("Error fetching bugs:", error);
        setError("Unable to load bugs. Please check the backend.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBugs();
  }, []);

  const filteredBugs = bugs.filter((bug) => {
    const title = bug.title || "";
    const description = bug.description || "";

    const matchesSearch =
      title.toLowerCase().includes(search.toLowerCase()) ||
      description.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" ||
      bug.status === statusFilter;

    const matchesPriority =
      priorityFilter === "ALL" ||
      bug.priority === priorityFilter;

    const matchesSeverity =
      severityFilter === "ALL" ||
      bug.severity === severityFilter;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority &&
      matchesSeverity
    );
  });

  return (
    <div>
      <Navbar />

      <main className="container py-4">

        {/* Page Heading */}
        <h1 className="fw-bold">
          Bug Tracking Dashboard
        </h1>

        <p className="text-muted">
          Manage, track and resolve software issues.
        </p>


        {/* Bug Statistics */}
        <BugStats bugs={bugs} />


        {/* Create Bug Form */}
        <BugForm onBugCreated={fetchBugs} />


        {/* Search and Filters */}
        <div className="card shadow-sm border-0 mt-4">
          <div className="card-body">

            <h5 className="mb-3">
              Search & Filter Bugs
            </h5>

            <div className="row g-3">

              {/* Search */}
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search bugs..."
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                />
              </div>


              {/* Status */}
              <div className="col-md-2">
                <select
                  className="form-select"
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(event.target.value)
                  }
                >
                  <option value="ALL">
                    All Status
                  </option>

                  <option value="OPEN">
                    Open
                  </option>

                  <option value="IN PROGRESS">
                    In Progress
                  </option>

                  <option value="RESOLVED">
                    Resolved
                  </option>

                  <option value="CLOSED">
                    Closed
                  </option>
                </select>
              </div>


              {/* Priority */}
              <div className="col-md-2">
                <select
                  className="form-select"
                  value={priorityFilter}
                  onChange={(event) =>
                    setPriorityFilter(event.target.value)
                  }
                >
                  <option value="ALL">
                    All Priorities
                  </option>

                  <option value="LOW">
                    Low
                  </option>

                  <option value="MEDIUM">
                    Medium
                  </option>

                  <option value="HIGH">
                    High
                  </option>
                </select>
              </div>


              {/* Severity */}
              <div className="col-md-2">
                <select
                  className="form-select"
                  value={severityFilter}
                  onChange={(event) =>
                    setSeverityFilter(event.target.value)
                  }
                >
                  <option value="ALL">
                    All Severities
                  </option>

                  <option value="MINOR">
                    Minor
                  </option>

                  <option value="MAJOR">
                    Major
                  </option>

                  <option value="CRITICAL">
                    Critical
                  </option>
                </select>
              </div>


              {/* Clear Filters */}
              <div className="col-md-2">
                <button
                  className="btn btn-outline-secondary w-100"
                  onClick={() => {
                    setSearch("");
                    setStatusFilter("ALL");
                    setPriorityFilter("ALL");
                    setSeverityFilter("ALL");
                  }}
                >
                  Clear Filters
                </button>
              </div>

            </div>
          </div>
        </div>


        {/* Bug List Heading */}
        <div className="d-flex justify-content-between align-items-center mt-5 mb-3">

          <h2 className="mb-0">
            Bug List
          </h2>

          <div className="d-flex align-items-center gap-3">

            <span className="text-muted">
              Showing {filteredBugs.length} of {bugs.length}
            </span>

            <button
              className="btn btn-sm btn-outline-primary"
              onClick={fetchBugs}
              disabled={loading}
            >
              {loading ? "Refreshing..." : "Refresh"}
            </button>

          </div>

        </div>

        {/* Bug List */}
        {loading ? (

          <div className="alert alert-info">
            Loading bugs...
          </div>

        ) : error ? (

          <div className="alert alert-danger">
            {error}
          </div>

        ) : filteredBugs.length === 0 ? (

          <div className="alert alert-info">
            Loading bugs...
          </div>

        ) : filteredBugs.length === 0 ? (

          <div className="alert alert-info">
            No bugs match your search or filters.
          </div>

        ) : (

          <div className="row">

            {filteredBugs.map((bug) => (

              <div
                className="col-md-6"
                key={bug.id}
              >
                <BugCard
                  bug={bug}
                  onBugDeleted={fetchBugs}
                  onBugUpdated={fetchBugs}
                />
              </div>

            ))}

          </div>

        )}
      </main>
    </div>
  );
}

export default App;