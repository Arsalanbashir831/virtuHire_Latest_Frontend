// customhooks/useUserData.js
import axios from 'axios';
import { useEffect, useState } from 'react';
import { BASE_URL } from '../utils';

const useUserData = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/auth_user`, {
            headers: { Authorization: `Token ${token}` }
          });
          setUserData(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUserData(null); // Reset user data on error
        }
      };

      fetchUserData();
    }
  }, []);

  return userData;
};

export default useUserData;
