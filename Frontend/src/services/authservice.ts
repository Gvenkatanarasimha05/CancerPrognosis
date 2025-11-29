const API_BASE = "https://cancerprognosis.onrender.com/api";

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
