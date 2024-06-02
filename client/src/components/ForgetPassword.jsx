import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        if (!email) {
            setError("Email is required");
            setLoading(false);
            return;
        }

        try {
            const res = await axios.post("http://localhost:5000/forgot-password", { email });
            if (res.data.Status === 'Success') {
                setSuccess("Password reset link sent to your email");
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                setError("Failed to send reset link");
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
                <p className='font-bold text-3xl py-6 pb-4'>Forget Password</p>
                <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-4">
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder='Enter Email'
                        className='border-gray-300 rounded-md py-1 px-3 placeholder:text-gray-600 min-w-[300px] border-[2px] mt-2 text-start placeholder:text-start outline-none focus:outline-none'
                    />
                    {error && <p className="text-red-600">{error}</p>}
                    {success && <p className="text-green-600">{success}</p>}
                    <button
                        type="submit"
                        className='mb-6 border-2 border-gray-200 rounded min-w-[304px] bg-green-600 text-white py-1.5 text-center'
                        disabled={loading}
                    >
                        {loading ? "Sending..." : "Send"}
                    </button>
                    <p className='py-3 text-center text-gray-600'>Remember Your Password?</p>
                    <Link to="/login">
                        <button className='mb-6 border-2 border-gray-200 rounded min-w-[300px] bg-gray-100 text-gray-800 py-1 text-center'>
                            Login
                        </button>
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default ForgetPassword;
