import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="nav-left">AuthApp</div>

      <div className="nav-links">
        <span onClick={() => navigate("/dashboard")}>Dashboard</span>

        {role === "admin" && (
          <span onClick={() => navigate("/admin")}>Admin</span>
        )}

        <span onClick={logout}>Logout</span>
      </div>
    </div>
  );
}

export default Navbar;