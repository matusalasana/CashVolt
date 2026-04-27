import { UserRoundPen } from "lucide-react";
import ProfilePictureUploader from "./ProfilePictureUploader"


interface ProfileHeaderProps {
  first_name?: string;
  last_name?: string;
  role?: string;
  joinedDate?: string;
  avatar_url?: string;
  onClickEdit?: () => void;
}

  const formatJoinDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Recently";
    
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    return `${month} ${year}`;
  };

const ProfileHeader = ({ 
  first_name = "User", 
  last_name = "", 
  role = "user", 
  joinedDate,
  avatar_url,
  onClickEdit
}: ProfileHeaderProps) => {
  const formattedDate = joinedDate ? formatJoinDate(joinedDate) : "Recently";

  const avatar = avatar_url || `https://placehold.net/avatar.png`;

  return (
    <div className="text-center pt-10">
      {/* Avatar Section */}
      <div className="relative -mt-12 flex justify-center">
        <div className="avatar">
          <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 shadow-2xl">
            <img src={avatar} alt="User Avatar" />
          </div>
        </div>

        <div
          className=""
        >
          <ProfilePictureUploader />
        </div>
      </div>

      {/* User Info */}
      <div className="mt-2 flex flex-col gap-2 justify-center items-center">
      
        <div className="badge badge-primary badge-outline capitalize">
          {role}
        </div>
        
        <h2 className="text-2xl font-bold">
          {first_name} {last_name}
        </h2>

        <p className="text-sm text-base-content/60">
          Member since {formattedDate}
        </p>
      </div>
      
      <button 
        onClick={onClickEdit}
        className="btn mx-auto my-3 btn-outline btn-error btn-sm flex items-center gap-2">
        <UserRoundPen size={16} /> Edit Profile
      </button>
      
    </div>
  );
};

export default ProfileHeader;