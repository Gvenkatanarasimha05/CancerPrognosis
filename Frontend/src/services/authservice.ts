const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  success: boolean;
  message?: string;
}

export async function register(formData: RegisterData): Promise<boolean> {
  const res = await fetch(`${API_BASE}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!res.ok) return false;
  const json: RegisterResponse = await res.json();
  return json.success;
}
