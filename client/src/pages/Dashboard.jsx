import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [msg, setMsg] = useState("");
  const role = localStorage.getItem("role");

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get("http://localhost:3001/api/protected", {
      headers: { authorization: token }
    })
    .then(res => setMsg(res.data.message))
    .catch(() => setMsg("Unauthorized"));
  }, []);

  return (
    <>
      <Navbar />

      <div className="page">
        <h2>Dashboard</h2>

        <div className="card">
          <p>{msg}</p>
          <p><strong>Role:</strong> {role}</p>
        </div>
      </div>
    </>
  );
}

export default Dashboard;