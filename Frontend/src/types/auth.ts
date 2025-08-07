export interface User {
  id: string;
  email: string;
  role: 'patient' | 'doctor' | 'admin';
  firstName: string;
  lastName: string;
  isVerified: boolean;
  profilePicture?: string;
  createdAt: Date;
}

export interface Patient extends User {
  role: 'patient';
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  phone: string;
  emergencyContact: string;
  medicalHistory?: string[];
  allergies?: string[];
}

export interface Doctor extends User {
  role: 'doctor';
  licenseNumber: string;
  specialization: string;
  experience: number;
  qualification: string;
  isApproved: boolean;
  hospital?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: RegisterData) => Promise<boolean>;
  verifyEmail: (token: string) => Promise<boolean>;
  isLoading: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'patient' | 'doctor';
  // Patient specific
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  phone?: string;
  emergencyContact?: string;
  // Doctor specific
  licenseNumber?: string;
  specialization?: string;
  experience?: number;
  qualification?: string;
  hospital?: string;
}