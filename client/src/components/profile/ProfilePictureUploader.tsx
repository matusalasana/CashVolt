import React, { useRef, useState } from "react";
import { Camera } from "lucide-react";
import axios from "axios";
import { useUpdateUser } from "../../hooks/useAuth";

const ProfilePictureUploader = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { mutate: updateImage } = useUpdateUser();
  const [loading, setLoading] = useState(false);
  const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  

  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, formData
    );
  
    const data = res.data;
  
    if (!data.secure_url) {
      throw new Error("Upload failed");
    }
  
    return data.secure_url;
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);

      // 1. upload to cloudinary directly
      const imageUrl = await uploadToCloudinary(file);

      // 2. save URL in backend
      updateImage({ profile_picture: imageUrl });

    } catch (err: any) {
      console.error(err);
      alert(err.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleChange}
        className="hidden"
      />

      <button
        onClick={() => inputRef.current?.click()}
        disabled={loading}
        className="btn btn-circle btn-primary btn-sm absolute bottom-0 right-[calc(50%-3.5rem)] shadow-lg"
      >
        <Camera size={16} />
      </button>
    </div>
  );
};

export default ProfilePictureUploader;