import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLogin } from '../hooks/useAuth';

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

function Login () {
  const { mutate: login, isPending } = useLogin();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <div className="flex justify-center items-center h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <form className="card-body" onSubmit={handleSubmit((data) => login(data))}>
          <h2 className="card-title text-2xl font-bold">Login</h2>
          
          <div className="form-control">
            <label className="label"><span className="label-text">Email</span></label>
            <input 
              {...register('email')} 
              className={`input input-bordered ${errors.email ? 'input-error' : ''}`} 
            />
            {errors.email && <span className="text-error text-sm mt-1">{errors.email.message}</span>}
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Password</span></label>
            <input 
              type="password" 
              {...register('password')} 
              className="input input-bordered" 
            />
          </div>

          <div className="card-actions justify-end mt-6">
            <button className={`btn btn-primary w-full ${isPending ? 'loading' : ''}`}>
              {isPending ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login
