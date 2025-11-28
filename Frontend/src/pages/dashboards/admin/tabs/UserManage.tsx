import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { getAdminStats, getUsers } from "../../../../api/adminApi";


interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  approvalStatus?: string;
}

const UserManage: React.FC = () => {
  const [stats, setStats] = useState({ total: 0, patients: 0, doctors: 0, admins: 0 });
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");

  // Load stats from backend
  const loadStats = async () => {
    try {
      const res = await getAdminStats();
      setStats(res.data);
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  // Load users from backend
  const loadUsers = async () => {
    try {
      const res = await getUsers(search, role);
      const usersWithApprovedAdmins = res.data.map((u: User) => ({
        ...u,
        approvalStatus: u.role === "admin" ? "approved" : u.approvalStatus || "active",
      }));
      setUsers(usersWithApprovedAdmins);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    loadStats();
    loadUsers();
  }, []);

  useEffect(() => {
    loadUsers();
  }, [search, role]);

  return (
    <div className="space-y-6">
      {/* Header + Search + Filter */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">User Management</h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="">All Roles</option>
            <option value="patient">Patients</option>
            <option value="doctor">Doctors</option>
            <option value="admin">Admins</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card title="Total Users" value={stats.total} color="text-blue-600" />
        <Card title="Patients" value={stats.patients} color="text-green-600" />
        <Card title="Doctors" value={stats.doctors} color="text-teal-600" />
        <Card title="Admins" value={stats.admins} color="text-purple-600" />
      </div>

      {/* Users Table */}
      <div className="bg-white border rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">Users</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.length > 0 ? (
                users.map((u) => (
                  <tr key={u._id}>
                    <td className="px-6 py-4 font-medium">{u.firstName} {u.lastName}</td>
                    <td className="px-6 py-4 text-gray-600">{u.email}</td>
                    <td className="px-6 py-4 capitalize font-semibold">{u.role}</td>
                    <td className="px-6 py-4 font-semibold">
                      {u.approvalStatus?.toUpperCase()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-gray-500 text-center">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const Card: React.FC<{ title: string; value: number; color: string }> = ({ title, value, color }) => (
  <div className="bg-white border rounded-lg p-4 text-center">
    <div className={`text-2xl font-bold ${color}`}>{value}</div>
    <div className="text-sm text-gray-600">{title}</div>
  </div>
);

export default UserManage;
