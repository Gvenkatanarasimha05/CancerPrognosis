import React, { useEffect, useState } from "react";
import axios from "axios";

const Approvals: React.FC = () => {
  const [pending, setPending] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const token = localStorage.getItem("token");

  // Fetch pending doctors
  useEffect(() => {
    const fetchPending = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/admin/pending-doctors", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (Array.isArray(res.data)) {
          setPending(res.data);
        } else {
          setPending([]);
        }
      } catch (err: any) {
        console.error(err);
        setError("Failed to fetch pending doctors");
      } finally {
        setLoading(false);
      }
    };

    fetchPending();
  }, [token]);

  // Approve doctor
  const approveDoctor = async (id: string) => {
    try {
      await axios.put(
        `http://localhost:4000/api/admin/approve-doctor/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPending((prev) => prev.filter((doc) => doc._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Reject doctor
  const rejectDoctor = async (id: string) => {
    try {
      await axios.put(
        `http://localhost:4000/api/admin/reject-doctor/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPending((prev) => prev.filter((doc) => doc._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Pending Doctor Approvals</h2>
      {pending.length === 0 ? (
        <p>No pending doctors</p>
      ) : (
        <ul className="space-y-3">
          {pending.map((doctor) => (
            <li
              key={doctor._id}
              className="p-3 border rounded-lg shadow-sm bg-white"
            >
              {/* Default row (basic info) */}
              <div className="flex justify-between items-center">
                <div>
                  <p>
                    <strong>Name:</strong> {doctor.firstName} {doctor.lastName}
                  </p>
                  <p>
                    <strong>Email:</strong> {doctor.email}
                  </p>
                </div>
                <button
                  onClick={() =>
                    setExpanded(expanded === doctor._id ? null : doctor._id)
                  }
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  {expanded === doctor._id ? "Hide Details" : "View Details"}
                </button>
              </div>

              {/* Expanded section with full details */}
              {expanded === doctor._id && (
                <div className="mt-3 border-t pt-3 text-sm space-y-1">
                  <p>
                    <strong>License Number:</strong> {doctor.licenseNumber}
                  </p>
                  <p>
                    <strong>Specialization:</strong>{" "}
                    {doctor.specialization || "N/A"}
                  </p>
                  <p>
                    <strong>Experience:</strong>{" "}
                    {doctor.experience ? `${doctor.experience} years` : "N/A"}
                  </p>
                  <p>
                    <strong>Qualification:</strong>{" "}
                    {doctor.qualification || "N/A"}
                  </p>
                  <p>
                    <strong>Hospital:</strong> {doctor.hospital || "N/A"}
                  </p>

                  {/* Approve / Reject buttons */}
                  <div className="mt-3 flex space-x-2">
                    <button
                      onClick={() => approveDoctor(doctor._id)}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => rejectDoctor(doctor._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Approvals;
