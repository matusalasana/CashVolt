import React, { useRef, useState } from "react";
import axios from "axios";
import { useUpdateUser } from "../../hooks/useAuth";

const ProfilePictureUploader = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { mutate: updateImage } = useUpdateUser();
  const [loading, setLoading] = useState(false);

const uploadToCloudinary = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "CashVolt profile pictures");

  const res = await axios.post(
    "https://api.cloudinary.com/v1_1/dkwfrnwek/image/upload",
    formData
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
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        {loading ? "Uploading..." : "Upload Profile Image"}
      </button>
    </div>
  );
};

export default ProfilePictureUploader;