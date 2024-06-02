import axios from "axios";
import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

export default function Home (){
    const navigate = useNavigate();

    useEffect(()=>{
        const token = (document.cookie.split('; ').find(row => row.startsWith('token=')) || '').split('=')[1] || null;

        if(!token){
            navigate("/login")
        }

    })

    const handleLogout = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/logout")
            .then(res => {
                console.log("Logout successful:", res.data);
                window.location.reload();
            })
            .catch(err => {
                console.error("Logout failed:", err);
                // Handle specific errors if needed
            });
    };
    
    
    
    return <div className="flex flex-col justify-center items-center min-h-screen gap-10">
        <p>Home Page</p>
        <button onClick={handleLogout} type="submit" className="text-white bg-red-600 py-1 px-10 rounded">Logout</button>
    </div>
}