import { 
  User, 
  Wallet, 
  Bell, 
  ShieldCheck, 
  LogOut
} from 'lucide-react';

const ProfileNavigations = () => {
  return (
    <div className="card bg-base-100 shadow-xl">
            <ul className="menu bg-base-100 w-full rounded-box p-2">
              <li><a className="active"><User size={18} /> Personal Info</a></li>
              <li><a><Wallet size={18} /> Payment Methods</a></li>
              <li><a><Bell size={18} /> Notifications</a></li>
              <li><a><ShieldCheck size={18} /> Security</a></li>
              <div className="divider my-1"></div>
              <li><a className="text-error"><LogOut size={18} /> Logout</a></li>
            </ul>
          </div>
  )
}

export default ProfileNavigations