import React, { useState, useEffect } from 'react';

function ApiHandler() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch('https://api.example.com/data');
                const data = await response.json();
                setData(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>An error occurred: {error.message}</p>;
    }

    return (
        <ul>
            {data.map(item => (
                <li key={item.id}>{item.title}</li>
            ))}
        </ul>
    );
}
document.cookie = "user=eyJqd3QiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcFpDSTZJalkwTVdGa1pETm1OVFJsT0RKaVpqa3dNalZrTUdZM1l5SXNJblZ6WlhKdVlXMWxJam9pVkhWaGJreGxNalV4TWpJd01ERWlMQ0ptZFd4c2JtRnRaU0k2SWt4bElFNW5kWGxsYmlCVWRXRnVJaXdpY0dodmJtVWlPaUl3T0RZNU1qTTJOVEUwSWl3aVVtOXNaU0k2VzNzaVpHVnpZM0pwY0hScGIyNGlPaUp0WVc1aFoyVnlJaXdpYVdRaU9pSTJOREZoWW1RMVl6azFZelk1WXpoak5UTTJZVEl3WlRVaWZWMHNJa1JsY0dGeWRHMWxiblFpT2x0N0ltUmxjMk55YVhCMGFXOXVJam9pYjNWMFltOTFibVFpTENKcFpDSTZJalkwTVdGaVltRm1OVE15TVRjMU5tVXdNVGt5TnpjeU5pSjlYU3dpYVdGMElqb3hOamd5TkRBek5UVTRmUS55Vm4zclVpTmZIVUtQckdqQnRwbTdrdWhFZ054d1oyWmNnbjZIaDNJRXNrIn0";
export default ApiHandler;