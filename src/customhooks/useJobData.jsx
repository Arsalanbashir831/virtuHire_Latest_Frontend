import axios from 'axios';
import React, { useEffect, useState } from 'react';

const useJobData = (url) => {
    const [jobData, setJobData] = useState(null); // State to store user data

    useEffect(() => {
        const token = localStorage.getItem('token');
        const fetchJobData = async () => {
            try {
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Token ${token}` // Include token in Authorization header
                    }
                });
                setJobData(response.data); // Set the user data in state
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        if (token) {
            fetchJobData(); // Fetch user data if token is available
        }

    }, []);
return jobData
};

export default useJobData;