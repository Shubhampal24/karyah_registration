import { useState } from 'react';
import { saveRegistration } from '../services/store';

export function useRegistration() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]           = useState(null);
  const [successData, setSuccessData] = useState(null);

  const register = ({ professionId, professionName, mobileNumber }) => {
    setSubmitting(true);
    setError(null);

    const clean = String(mobileNumber).replace(/\D/g, '').slice(-10);

    if (clean.length !== 10) {
      setError('Please enter a 10-digit mobile number.');
      setSubmitting(false);
      return { success: false };
    }

    try {
      const registration = saveRegistration({
        professionId,
        professionName,
        mobileNumber: clean,
        countryCode:  '+91',
      });
      setSuccessData({ registration });
      setSubmitting(false);
      return { success: true, data: { registration } };
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
      setSubmitting(false);
      return { success: false };
    }
  };

  const reset = () => {
    setSubmitting(false);
    setError(null);
    setSuccessData(null);
  };

  return { register, submitting, error, successData, reset };
}
