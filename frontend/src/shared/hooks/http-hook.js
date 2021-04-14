import { useState, useCallback } from 'react';

const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

export const useHttp = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const clearError = () => {
        setError(null);
    }

    const sendRequest = useCallback(async (url, method, body = null, headers = {}) => {
        setIsLoading(true);

        try {
            const response = await fetch(url, {
                method,
                headers,
                body
            });

            const data = await response.json();

            if(!response.ok) {
                throw new Error(data.message);
            }
            
            setIsLoading(false);

            return data;

        } catch(err) {
            setIsLoading(false);
            setError(err.message);
            throw new Error(err);
        }
        
    }, []);

    return [isLoading, sendRequest, error, clearError];
};