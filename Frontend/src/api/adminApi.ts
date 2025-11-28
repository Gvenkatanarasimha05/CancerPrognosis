import API from "./api";

export const getAdminStats = () => API.get("/admin/stats");

export const getUsers = (search = "", role = "") =>
  API.get(`/admin/users?search=${search}&role=${role}`);

export const getPendingDoctors = () => API.get("/admin/pending-doctors");

export const approveDoctor = (id: string) =>
  API.put(`/admin/approve-doctor/${id}`);

export const rejectDoctor = (id: string) =>
  API.put(`/admin/reject-doctor/${id}`);
