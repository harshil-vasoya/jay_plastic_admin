import { useState } from 'react';

export function useApiCall(api) {
  const [inProgress, setInProgress] = useState(false);

  const apiCall = async (...data) => {
    setInProgress(true);
    try {
      const response = await api(...data);
      setInProgress(false);
      return response;
    } finally {
      setInProgress(false);
    }
  };

  return { call: apiCall, inProgress };
}
