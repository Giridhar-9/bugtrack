function BugStats({ bugs }) {

    const totalBugs = bugs.length;

    const openBugs = bugs.filter(
        (bug) => bug.status === "OPEN"
    ).length;

    const inProgressBugs = bugs.filter(
        (bug) => bug.status === "IN PROGRESS"
    ).length;

    const resolvedBugs = bugs.filter(
        (bug) => bug.status === "RESOLVED"
    ).length;

    return (
        <div className="row g-3 mt-3">

            <div className="col-md-3">
                <div className="card shadow-sm border-0">
                    <div className="card-body">
                        <h6 className="text-muted">
                            Total Bugs
                        </h6>

                        <h2 className="fw-bold">
                            {totalBugs}
                        </h2>
                    </div>
                </div>
            </div>

            <div className="col-md-3">
                <div className="card shadow-sm border-0">
                    <div className="card-body">
                        <h6 className="text-muted">
                            Open
                        </h6>

                        <h2 className="fw-bold text-primary">
                            {openBugs}
                        </h2>
                    </div>
                </div>
            </div>

            <div className="col-md-3">
                <div className="card shadow-sm border-0">
                    <div className="card-body">
                        <h6 className="text-muted">
                            In Progress
                        </h6>

                        <h2 className="fw-bold text-warning">
                            {inProgressBugs}
                        </h2>
                    </div>
                </div>
            </div>

            <div className="col-md-3">
                <div className="card shadow-sm border-0">
                    <div className="card-body">
                        <h6 className="text-muted">
                            Resolved
                        </h6>

                        <h2 className="fw-bold text-success">
                            {resolvedBugs}
                        </h2>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default BugStats;