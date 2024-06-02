import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [success, setSuccess] = useState("");
  const navigate=useNavigate();
  axios.defaults.withCredentials = true;

  
  useEffect(() => {
    axios.get("http://localhost:5000/dashboard").then((res) => {
      if (res.data === "Success") {
        setSuccess("Successfully Verified Admin");
      }else{
        navigate("/login");
      }
    }).catch(err => console.log(err))
  });
  return (
    <div>
      <p>Dashboard!</p>
      <p>{success}</p>
    </div>
  );
}
