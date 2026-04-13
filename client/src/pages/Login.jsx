import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await axios.post("https://auth-app-f71q.onrender.com/api/login", data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      navigate("/dashboard");
    } catch (err) {
      setErrorMsg("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="container">
        <h2>Sign in to your account</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          
          <input
            {...register("username", { required: "Username is required" })}
            placeholder="Username"
          />
          {errors.username && <p className="error">{errors.username.message}</p>}

          <input
            {...register("password", { required: "Password is required" })}
            type="password"
            placeholder="Password"
          />
          {errors.password && <p className="error">{errors.password.message}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Sign In"}
          </button>

          {errorMsg && <p className="error">{errorMsg}</p>}
        </form>
      </div>
    </div>
  );
}

export default Login;