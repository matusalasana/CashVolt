import { useState } from "react";
import API from "../api/api"
import { useForm } from "react-hook-form";
import { type RegisterInput } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../types";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
      resolver: zodResolver(registerSchema),
    });
  

  const onSubmit = async (data: LoginForm) => {
    try {
      setInputData(res)
      const res = await API.post(
        "/auth/register",
        data
      );

      console.log("Login success:", res.data);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
      >
        <legend className="fieldset-legend">Sign up</legend>

        <label className="label">First name</label>
        <input
          type="text"
          className="input"
          placeholder="First name"
          {...register("first_name")}
        />
        {errors.first_name && (
          <p className="text-red-500 text-sm">{errors.first_name.message}</p>
        )}
        
        <label className="label">Last name</label>
        <input
          type="text"
          className="input"
          placeholder="Last name"
          {...register("last_name")}
        />
        {errors.last_name && (
          <p className="text-red-500 text-sm">{errors.last_name.message}</p>
        )}
        
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

export default Signup;