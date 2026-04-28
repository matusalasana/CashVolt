import { useState } from 'react';
import { motion } from 'framer-motion';
import ProfileHeader from "../components/profile/ProfileHeader";
import UserProfileForm from "../components/profile/UserProfileForm";
import ProfileNavigations from "../components/profile/ProfileNavigations"
import ProfilePreferences from "../components/profile/ProfilePreferences"
import { useAuth } from "../hooks/useAuth"

const Profile = () => {
  const { data: user, isLoading } = useAuth()
  
  const [ isEditOpen, setIsEditOpen ] = useState(false)
  // Animation Variants
  const containerVars = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } }
  };
  
  if (isLoading || !user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <motion.div 
        variants={containerVars}
        initial="initial"
        animate="animate"
        className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8"
      >

            
              <ProfileHeader 
                first_name={user?.first_name}
                last_name={user?.last_name}
                role={user?.role}
                joinedDate={user?.created_at}
                avatar_url={user?.profile_picture}
                onClickEdit={() => setIsEditOpen(true)}
              />
              <div className="divider"></div>
              <ProfileNavigations />
            
          
          <UserProfileForm 
            isEditOpen={isEditOpen}
            onClickClose={() => setIsEditOpen(false)}
          />
          <div className="divider"></div>
          {/* Preferences Section */}
          <ProfilePreferences />
        

      </motion.div>
    </div>
  );
};

export default Profile;
