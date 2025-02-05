import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Results = () => {
    const [results, setResults] = useState([]);

    useEffect(() => {
        const fetchResults = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:5000/api/results', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setResults(response.data);
            } catch (error) {
                console.error("Error fetching results", error);
            }
        };

        fetchResults();
    }, []);

    return (
        <div>
            <h2>Results</h2>
            <ul>
                {results.map(result => (
                    <li key={result.id}>{result.title}: {result.score}</li>
                ))}
            </ul>
        </div>
    );
};

export default Results;