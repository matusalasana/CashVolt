
import API from "../api/api"
import { useForm } from "react-hook-form";
import { type LoginInput } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../types";
import { toast } from "react-hot-toast"
import { Navigate } from "react-router-dom";


const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginInput>({
      resolver: zodResolver(loginSchema),
    });
  

  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await API.post("/auth/login", data);

      // 🟢 SAVE JWT TOKEN
      localStorage.setItem("token", res.data.token);
      reset ();
      toast.success("Login successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
      >
        <legend className="fieldset-legend">Login</legend>

        {/* EMAIL */}
        <label className="label">Email</label>
        <input
          type="email"
          className="input"
          placeholder="Email"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        {/* PASSWORD */}
        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        <button type="submit" className="btn btn-neutral mt-4">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;