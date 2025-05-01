import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const VerifyEmail = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
     console.log("verify email");
      try {
        const response = await axios.get(`http://localhost:5000/user/verify/${token}`);
        setMessage(response.data);
        setTimeout(() => {
          navigate('/login'); // Redirect to the home page after email is verified
        }, 2000); // Wait 2 seconds before redirecting
      } catch (err) {
        console.log(err);
        setError('Verification failed. The link may have expired.');
      }
    };

    verifyEmail();
  }, [token, navigate]);

return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2 style={{ color: '#333', fontSize: '24px' }}>Email Verification</h2>
        {message && (
            <div
                className="alert"
                style={{
                    color: '#155724',
                    backgroundColor: '#d4edda',
                    border: '1px solid #c3e6cb',
                    padding: '10px',
                    margin: '10px auto',
                    width: '50%',
                    borderRadius: '5px',
                }}
            >
                {message}
            </div>
        )}
        {error && (
            <div
                className="alert alert-error"
                style={{
                    color: '#721c24',
                    backgroundColor: '#f8d7da',
                    border: '1px solid #f5c6cb',
                    padding: '10px',
                    margin: '10px auto',
                    width: '50%',
                    borderRadius: '5px',
                }}
            >
                {error}
            </div>
        )}
    </div>
);
};

export default VerifyEmail;
