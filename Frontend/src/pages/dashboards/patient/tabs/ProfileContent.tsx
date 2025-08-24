import React, { useEffect, useState } from "react";
import API from "../../../../api/api";

interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  role: "patient" | "doctor" | string;
  dateOfBirth?: string;
  gender?: string;
  phone?: string;
  emergencyContact?: string;
  licenseNumber?: string;
  specialization?: string;
}

const ProfileContent: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);

  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await API.get("/patient/me");
        if (response.data && response.data.data) {
          // Format DOB as yyyy-mm-dd for input[type=date]
          const data = response.data.data;
          if (data.dateOfBirth) {
            data.dateOfBirth = new Date(data.dateOfBirth).toISOString().split("T")[0];
          }
          setProfile(data);
        } else {
          setError("Profile data not available.");
        }
      } catch (err: any) {
        console.error("❌ Failed to load profile", err);
        setError(err.response?.status === 401 ? "Unauthorized. Please login again." : "Error fetching profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // Handle input changes in edit mode
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!profile) return;
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  // Save profile updates
  const handleSave = async () => {
    if (!profile) return;
    try {
      setSaving(true);
      const payload: any = {};
      if (profile.role === "patient") {
        payload.email = profile.email;
        payload.dateOfBirth = profile.dateOfBirth;
        payload.gender = profile.gender;
        payload.phone = profile.phone;
        payload.emergencyContact = profile.emergencyContact;
      } 
      const response = await API.put("/patient/update", payload);
      console.log("✅ Update response:", response.data);
      setEditMode(false);
    } catch (err) {
      console.error("❌ Failed to save profile", err);
      setError("Failed to save profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!profile) return <p className="text-red-500">Profile not found.</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Personal Profile</h2>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input type="text" name="firstName" value={profile.firstName} readOnly className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input type="text" name="lastName" value={profile.lastName} readOnly className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" name="email" value={profile.email || ""} readOnly={!editMode} onChange={handleChange} className={`mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 ${editMode ? "bg-white" : "bg-gray-100"}`} />
          </div>

          {/* Patient fields */}
          {profile.role === "patient" && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">DOB</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={profile.dateOfBirth || ""}
                    readOnly={!editMode}
                    onChange={handleChange}
                    className={`mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 ${editMode ? "bg-white" : "bg-gray-100"}`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Gender</label>
                  <input type="text" name="gender" value={profile.gender || ""} readOnly={!editMode} onChange={handleChange} className={`mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 ${editMode ? "bg-white" : "bg-gray-100"}`} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input type="tel" name="phone" value={profile.phone || ""} readOnly={!editMode} onChange={handleChange} className={`mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 ${editMode ? "bg-white" : "bg-gray-100"}`} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Emergency Contact</label>
                <input type="tel" name="emergencyContact" value={profile.emergencyContact || ""} readOnly={!editMode} onChange={handleChange} className={`mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 ${editMode ? "bg-white" : "bg-gray-100"}`} />
              </div>
            </>
          )}

          <div className="flex gap-2 mt-4">
            {!editMode && (
              <button type="button" onClick={() => setEditMode(true)} className="px-4 py-2 bg-blue-600 text-white rounded-md">
                Edit
              </button>
            )}
            {editMode && (
              <>
                <button type="button" onClick={handleSave} disabled={saving} className="px-4 py-2 bg-green-600 text-white rounded-md">
                  {saving ? "Saving..." : "Save"}
                </button>
                <button type="button" onClick={() => setEditMode(false)} className="px-4 py-2 bg-gray-400 text-white rounded-md">
                  Cancel
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileContent;
