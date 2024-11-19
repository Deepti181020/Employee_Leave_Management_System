import React, { useState } from 'react';
import "./UserLogin.css"
import { useAuth } from '../../Context/authContext';
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { login } = useAuth(); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const response = await fetch("http://localhost:3300/api/auth/login-page", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error);
                setLoading(false);
                return;
            }

            console.log("Success:", data);
            setError("Login Failed");
            login(data.user);  
            if (data.token) {
                localStorage.setItem("token", data.token);  
            }

            // Navigate based on role
            if (data.user.role === "manager") {
                navigate('/manager-dashboard');
            } else {
                navigate('/employee-dashboard');
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                setError(error.response.data.error);
            } else {
                setError("Invalid Credentials");
            }
        }
    };
 
    return (
        <div className='login-container'>
            <h2 className='login-title'>Employee Leave Management System</h2>
            <div className="login-field">
                <h2 className='title'>Login</h2>
                {error && <p className='error-message'>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-body">
                        <label htmlFor="email" className='labels'>Email</label>
                        <input type="email" className='input-fields' placeholder='Enter email' onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="form-body">
                        <label htmlFor="password" className='labels'>Password</label>
                        <input type="password" className='input-fields' placeholder='Enter password' onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className='checkbox'>
                        <label className='checkbox-label'>
                            <input type="checkbox" className='checkbox-item' required />
                            <span className='span-item'>Remember me</span>
                        </label>
                    </div>
                    <div className="login-button">
                    <button type="submit" className="login-buttons" disabled={loading}>
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserLogin;
