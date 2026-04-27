import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuth } from "../../hooks/useAuth"
import { useUpdateUser } from "../../hooks/useAuth"
import { type ProfileFormInput, profileSchema } from "../../types"


interface Props {
  isEditOpen?: boolean;
  onClickClose?: () => void;
}

// 2. Component
export default function UserProfileForm({ isEditOpen, onClickClose }: Props) {
  const { data: user } = useAuth();
  const { mutate: updateUser, isPending } = useUpdateUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    },
  });

  const onSubmit = async (data: ProfileFormInput) => {
    try {
      updateUser(data);
    } catch (error: any) {
      console.log(error.message || "Error updating profile info");
    }
  };

  if (!isEditOpen) return null;

  return (
    <div className="modal modal-open">
    
      <div className="modal-box animate-in fade-in duration-300">
        <h2 className="text-xl text-center font-semibold mb-4">
          Edit Profile
        </h2>
        
        {/* Close button */}
          <button
            onClick={onClickClose}
            className="absolute top-2 right-2"
          >
            <X size={24} />
          </button>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
          {/* First name */}
          <div>
            <label className="block text-sm">First name</label>
            <input
              {...register("first_name")}
              className="w-full border rounded px-3 py-2"
            />
            {errors.first_name && (
              <p className="text-red-500 text-sm">
                {errors.first_name.message}
              </p>
            )}
          </div>

          {/* Last name */}
          <div>
            <label className="block text-sm">Last name</label>
            <input
              {...register("last_name")}
              className="w-full border rounded px-3 py-2"
            />
            {errors.last_name && (
              <p className="text-red-500 text-sm">
                {errors.last_name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm">Email</label>
            <input
              {...register("email")}
              type="email"
              className="w-full border rounded px-3 py-2"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            className="btn btn-primary w-full"
          >
            {isPending ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
      
    </div>
  );
}