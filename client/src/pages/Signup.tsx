import API from "../api/api";
import { useForm } from "react-hook-form";
import { type RegisterInput, registerSchema } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    try {
      await API.post("/auth/register", data);

      toast.success("Account created! Please login.");
      navigate("/login");

    } catch (error: any) {
      console.error("Signup failed:", error);
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
      >
        <legend className="fieldset-legend">Sign up</legend>

        <label className="label">First name</label>
        <input
          type="text"
          className="input"
          {...register("first_name")}
        />
        {errors.first_name && (
          <p className="text-red-500 text-sm">{errors.first_name.message}</p>
        )}

        <label className="label">Last name</label>
        <input
          type="text"
          className="input"
          {...register("last_name")}
        />
        {errors.last_name && (
          <p className="text-red-500 text-sm">{errors.last_name.message}</p>
        )}

        <label className="label">Email</label>
        <input
          type="email"
          className="input"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        <button type="submit" className="btn btn-neutral mt-4">
          Sign Up
        </button>

        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-blue-500 hover:underline"
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default Signup;