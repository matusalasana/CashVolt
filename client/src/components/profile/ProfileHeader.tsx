import { Camera } from "lucide-react";

const ProfileHeader = ({
  first_name = "User",
  last_name = "",
  role = "Member",
  joinedDate,
  avatar_url,
}) => {
  
  const monthsOfTheYear = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];
  const joinedMonth = monthsOfTheYear[Number(joinedDate[6])];
  const joinedYear = joinedDate.slice(0,4);
  
  const formattedDate = `${joinedMonth} ${joinedYear}`

  const avatar = avatar_url || `https://placehold.net/avatar.png`;

  return (
    <div className="text-center">
      {/* Avatar Section */}
      <div className="relative -mt-12 flex justify-center">
        <div className="avatar">
          <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 shadow-2xl">
            <img src={avatar} alt="User Avatar" />
          </div>
        </div>

        <button
          className="btn btn-circle btn-primary btn-sm absolute bottom-0 right-[calc(50%-3.5rem)] shadow-lg"
          aria-label="Change profile picture"
        >
          <Camera size={16} />
        </button>
      </div>

      {/* User Info */}
      <div className="mt-4">
        <h2 className="text-2xl font-bold">
          {first_name} {last_name}
        </h2>

        <p className="text-sm text-base-content/60">
          Member since {formattedDate}
        </p>

        <div className="badge badge-secondary mt-2">{role}</div>
      </div>
    </div>
  );
};

export default ProfileHeader;