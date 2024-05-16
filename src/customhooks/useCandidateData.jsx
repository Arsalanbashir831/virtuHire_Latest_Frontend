import axios from 'axios';
import React, { useEffect, useState } from 'react';

const useCandidateData = (url) => {
    const [candidateData, setCandidateData] = useState(null); 
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        const fetchCandidateData = async () => {
            try {
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Token ${token}` 
                    }
                });
                setCandidateData(response.data); 
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        if (token) {
            fetchCandidateData(); 
        }

    }, []);
return candidateData
};

export default useCandidateData;