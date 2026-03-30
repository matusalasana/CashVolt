import API from "../api/api";
import { useForm } from "react-hook-form";
import { type LoginInput, loginSchema } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useNavigate, Navigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // ONLY used for redirect check
  const { data: user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    try {
      await API.post("/auth/login", data);

      toast.success("Logged in successfully");

      // refresh auth state
      await queryClient.invalidateQueries({ queryKey: ["auth"] });

      navigate("/");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  // if already logged in → redirect
  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
      >
        <legend className="fieldset-legend">Login</legend>

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

        <p className="text-sm mt-4 text-center">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="text-blue-500 hover:underline"
          >
            Sign up
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;