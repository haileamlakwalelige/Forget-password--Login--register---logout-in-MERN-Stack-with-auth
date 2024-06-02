import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { id, token } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (password.length < 6) {
            setError("Password must be at least 6 characters long");
            setLoading(false);
            return;
        }

        try {
            const res = await axios.post(`http://localhost:5000/reset-password/${id}/${token}`, { password });
            if (res.data.Status === 'Success') {
                console.log("Status", res.data.Status);
                navigate('/login');
            } else {
                setError("Failed to reset password");
            }
        } catch (err) {
            console.error("Error", err);
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-400'>
            <div className="bg-white flex flex-col justify-center items-center px-2 sm:px-4 md:px-8 lg:px-16 rounded-lg py-4">
                <p className='font-bold text-3xl py-6 pb-4'>Reset Password</p>
                <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-4">
                    <input 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        type="password" 
                        placeholder='Enter New Password' 
                        className='border-gray-300 rounded-md py-1 px-3 placeholder:text-gray-600 min-w-[300px] border-[2px] mt-2 text-start placeholder:text-start outline-none focus:outline-none' 
                    />
                    {error && <p className="text-red-600">{error}</p>}
                    <button 
                        type="submit" 
                        className='mb-6 border-2 border-gray-200 rounded min-w-[304px] bg-green-600 text-white py-1.5 text-center' 
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Update"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;
