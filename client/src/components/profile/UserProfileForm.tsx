
import { motion } from 'framer-motion';

const UserProfileForm = () => {
  const itemVars = {
    initial: { opacity: 0, x: -10 },
    animate: { opacity: 1, x: 0 }
  };

  return (
    <div>
      <motion.div variants={itemVars} className="card bg-base-100 shadow-xl">
          
            <div className="card-body">
          
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Input Fields */}
                <div className="form-control w-full">
                  <label className="label"><span className="label-text font-medium">Full Name</span></label>
                  <input type="text" placeholder="Alex Johnson" className="input input-bordered w-full focus:input-primary transition-all" />
                </div>
                
                <div className="form-control w-full">
                  <label className="label"><span className="label-text font-medium">Email Address</span></label>
                  <div className="input-group">
                    <input type="email" placeholder="alex@example.com" className="input input-bordered w-full" />
                  </div>
                </div>

                <div className="form-control w-full">
                  <label className="label"><span className="label-text font-medium">Default Currency</span></label>
                  <select className="select select-bordered w-full">
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                    <option>GBP (£)</option>
                  </select>
                </div>

                <div className="form-control w-full">
                  <label className="label"><span className="label-text font-medium">Timezone</span></label>
                  <select className="select select-bordered w-full">
                    <option>Pacific Time (PT)</option>
                    <option>Eastern Time (ET)</option>
                    <option>UTC</option>
                  </select>
                </div>
              </div>

              <div className="form-control mt-4">
                <label className="label"><span className="label-text font-medium">Bio</span></label>
                <textarea className="textarea textarea-bordered h-24" placeholder="Tracking my journey to financial freedom..."></textarea>
              </div>

              <div className="card-actions justify-end mt-6">
                <button className="btn btn-ghost">Cancel</button>
                <button className="btn btn-primary px-8">Save Changes</button>
              </div>
            </div>
          </motion.div>
    </div>
  )
}

export default UserProfileForm