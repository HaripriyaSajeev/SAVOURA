
import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

function Admin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch registered users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/user/users"
        );

        const data = Array.isArray(response.data)
          ? response.data
          : response.data.users || [];

        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Unable to load dashboard analytics.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Get registration date
  const getRegistrationDate = (user) => {
    const value =
      user.createdAt ||
      user.created_at ||
      user.registrationDate;

    if (value) {
      const date = new Date(value);

      if (!Number.isNaN(date.getTime())) {
        return date;
      }
    }

    // Fallback: approximate creation time from MongoDB ObjectId
    if (user._id && /^[a-fA-F0-9]{24}$/.test(user._id)) {
      const timestamp = parseInt(user._id.substring(0, 8), 16);
      return new Date(timestamp * 1000);
    }

    return null;
  };

  const now = new Date();

  // Total registered users
  const totalUsers = users.length;

  // Users registered during the current month
  const newThisMonth = users.filter((user) => {
    const date = getRegistrationDate(user);

    return (
      date &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    );
  }).length;

  // Registration data for the last six months
  const monthlyData = [];

  for (let i = 5; i >= 0; i--) {
    const date = new Date(
      now.getFullYear(),
      now.getMonth() - i,
      1
    );

    const month = date.toLocaleString("en-US", {
      month: "short",
      year: "numeric",
    });

    const count = users.filter((user) => {
      const registered = getRegistrationDate(user);

      return (
        registered &&
        registered.getMonth() === date.getMonth() &&
        registered.getFullYear() === date.getFullYear()
      );
    }).length;

    monthlyData.push({
      month,
      registrations: count,
    });
  }

  // Check whether registration dates are available
  const hasRegistrationDates = users.some((user) =>
    getRegistrationDate(user)
  );

  return (
    <div className="container">
      <div className="page-inner">
        {/* Dashboard heading - Logout button removed */}
        <div className="d-flex align-items-center justify-content-between flex-wrap pt-2 pb-4">
          <div>
            <h3 className="fw-bold mb-2">Dashboard</h3>
            <h6 className="op-7 mb-0">
              SAVOURA - Admin Dashboard
            </h6>
          </div>
        </div>

        {/* Loading message */}
        {loading && (
          <div className="alert alert-info">
            Loading dashboard analytics...
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Summary cards */}
            <div className="row">
              {/* Total registered users */}
              <div className="col-sm-6 col-md-3">
                <div className="card card-stats card-round">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-icon">
                        <div className="icon-big text-center icon-primary bubble-shadow-small">
                          <i className="fas fa-users"></i>
                        </div>
                      </div>

                      <div className="col col-stats ms-3 ms-sm-0">
                        <p className="card-category">
                          Registered Users
                        </p>
                        <h4 className="card-title">
                          {totalUsers}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* New users this month */}
              <div className="col-sm-6 col-md-3">
                <div className="card card-stats card-round">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-icon">
                        <div className="icon-big text-center icon-success bubble-shadow-small">
                          <i className="fas fa-user-plus"></i>
                        </div>
                      </div>

                      <div className="col col-stats ms-3 ms-sm-0">
                        <p className="card-category">
                          New This Month
                        </p>
                        <h4 className="card-title">
                          {newThisMonth}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* User Registration Growth line graph */}
            <div className="row">
              <div className="col-md-12">
                <div className="card card-round">
                  <div className="card-header">
                    <div className="card-title">
                      User Registration Growth
                    </div>

                    <p className="text-muted mb-0">
                      New registrations over the last six months
                    </p>
                  </div>

                  <div className="card-body">
                    {hasRegistrationDates ? (
                      <ResponsiveContainer
                        width="100%"
                        height={320}
                      >
                        <LineChart data={monthlyData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis allowDecimals={false} />
                          <Tooltip />
                          <Legend />

                          <Line
                            type="monotone"
                            dataKey="registrations"
                            name="New Registrations"
                            stroke="#1572E8"
                            strokeWidth={3}
                            activeDot={{ r: 6 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="text-muted text-center py-5">
                        Registration dates are unavailable.
                        Add a createdAt field to your user model
                        to display this graph.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Monthly Registration Report bar graph */}
            <div className="row">
              <div className="col-md-12">
                <div className="card card-round">
                  <div className="card-header">
                    <div className="card-title">
                      Monthly Registration Report
                    </div>

                    <p className="text-muted mb-0">
                      Compare the number of new users each month
                    </p>
                  </div>

                  <div className="card-body">
                    {hasRegistrationDates ? (
                      <ResponsiveContainer
                        width="100%"
                        height={300}
                      >
                        <BarChart data={monthlyData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis allowDecimals={false} />
                          <Tooltip />
                          <Legend />

                          <Bar
                            dataKey="registrations"
                            name="Registered Users"
                            fill="#31CE36"
                            radius={[5, 5, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="text-muted text-center py-5">
                        Monthly analytics will appear when
                        registration dates are available.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Admin;
