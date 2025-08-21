import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import API from '../../../api';

const ProfileContent: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await API.get('/patient/me');
        setProfile(data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  if (!profile) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <p><strong>Name:</strong> {profile.user.firstName} {profile.user.lastName}</p>
      <p><strong>Email:</strong> {profile.user.email}</p>
    </div>
  );
};

export default ProfileContent;
