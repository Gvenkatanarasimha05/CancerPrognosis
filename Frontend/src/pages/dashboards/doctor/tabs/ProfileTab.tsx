import React, { useEffect, useState } from "react";
import API from "../../../../api/api";

interface DoctorProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;               
  licenseNumber?: string;
  specialization?: string;
  experience?: number;
  qualification?: string;
  hospital?: string;
}

const ProfileTab: React.FC = () => {
  const [profile, setProfile] = useState<DoctorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await API.get("/doctor/profile");
        setProfile(response.data.data);
      } catch (err: any) {
        setError("Error fetching profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!profile) return;
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSave = async () => {
    if (!profile) return;
    try {
      setSaving(true);

      const payload = {
        phone: profile.phone,                     
        licenseNumber: profile.licenseNumber,
        specialization: profile.specialization,
        experience: profile.experience,
        qualification: profile.qualification,
        hospital: profile.hospital,
      };

      await API.put("/doctor/update", payload);
      setEditMode(false);
    } catch (err) {
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
      <h2 className="text-2xl font-bold text-gray-900">Doctor Profile</h2>
      <div className="bg-white p-6 rounded-lg shadow">
        <form className="space-y-4">
          
          {/* Name and Email */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input type="text" value={profile.firstName} readOnly className="mt-1 block w-full bg-gray-100 border px-3 py-2 rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input type="text" value={profile.lastName} readOnly className="mt-1 block w-full bg-gray-100 border px-3 py-2 rounded-md" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" value={profile.email} readOnly className="mt-1 block w-full bg-gray-100 border px-3 py-2 rounded-md" />
          </div>

          {/* ✅ Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={profile.phone || ""}
              readOnly={!editMode}
              onChange={handleChange}
              className={`mt-1 block w-full border px-3 py-2 rounded-md ${
                editMode ? "bg-white" : "bg-gray-100"
              }`}
            />
          </div>

          {/* Doctor Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">License Number</label>
              <input
                type="text"
                name="licenseNumber"
                value={profile.licenseNumber || ""}
                readOnly={!editMode}
                onChange={handleChange}
                className={`mt-1 block w-full border px-3 py-2 rounded-md ${editMode ? "bg-white" : "bg-gray-100"}`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Specialization</label>
              <input
                type="text"
                name="specialization"
                value={profile.specialization || ""}
                readOnly={!editMode}
                onChange={handleChange}
                className={`mt-1 block w-full border px-3 py-2 rounded-md ${editMode ? "bg-white" : "bg-gray-100"}`}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Experience (years)</label>
              <input
                type="number"
                name="experience"
                value={profile.experience || 0}
                readOnly={!editMode}
                onChange={handleChange}
                className={`mt-1 block w-full border px-3 py-2 rounded-md ${editMode ? "bg-white" : "bg-gray-100"}`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Qualification</label>
              <input
                type="text"
                name="qualification"
                value={profile.qualification || ""}
                readOnly={!editMode}
                onChange={handleChange}
                className={`mt-1 block w-full border px-3 py-2 rounded-md ${editMode ? "bg-white" : "bg-gray-100"}`}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Hospital</label>
            <input
              type="text"
              name="hospital"
              value={profile.hospital || ""}
              readOnly={!editMode}
              onChange={handleChange}
              className={`mt-1 block w-full border px-3 py-2 rounded-md ${editMode ? "bg-white" : "bg-gray-100"}`}
            />
          </div>

          {/* Action Buttons */}
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

export default ProfileTab;
