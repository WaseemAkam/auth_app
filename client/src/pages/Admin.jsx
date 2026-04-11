import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function Admin() {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get("http://localhost:3001/api/admin", {
      headers: { authorization: token }
    })
    .then(res => setMsg(res.data.message))
    .catch(() => setMsg("Access Denied"));
  }, []);

  return (
    <>
      <Navbar />

      <div className="page">
        <h2>Admin Panel</h2>

        <div className="card">
          <p>{msg}</p>
          <p>Only admins can access this page.</p>
        </div>
      </div>
    </>
  );
}

export default Admin;