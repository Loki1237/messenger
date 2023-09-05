import { useCallback, useContext, useState } from 'react';
import axios, { AxiosError, Method } from 'axios';
import { SystemContext } from 'app/context/system';

type LoadStatus = 'IDLE' | 'PENDING' | 'SUCCESS' | 'FAILURE';
type SendFn<T, D> = (data?: D) => Promise<T>;

export const useService = <T, D = void>(method: Method, url: string): [SendFn<T, D>, LoadStatus, string, () => void] => {
    const [status, setStatus] = useState<LoadStatus>('IDLE');
    const [error, setError] = useState<string>(null);

    const clearError = useCallback(() => setError(null), []);

    const send = useCallback<SendFn<T, D>>(async (data = null): Promise<T> => {
        setStatus('PENDING');

        try {
            const response = await axios.request<T>({ url, method, data });
            setStatus('SUCCESS');

            return response.data;
        } catch (err: unknown) {
            const error = <AxiosError<string>>err;
            setStatus('FAILURE');
            setError(error.response.data);
        }
    }, [method, url]);

    return [send, status, error, clearError];
}

export const useSystem = () => useContext(SystemContext);
