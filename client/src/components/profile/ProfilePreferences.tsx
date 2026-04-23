
import { motion } from 'framer-motion';

const ProfilePreferences = () => {
  const itemVars = {
    initial: { opacity: 0, x: -10 },
    animate: { opacity: 1, x: 0 }
  };
  return (
    <div>
      <motion.div variants={itemVars} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title text-xl mb-4">Email Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold">Weekly Summary</p>
                    <p className="text-sm opacity-60">Get a snapshot of your spending every Monday.</p>
                  </div>
                  <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold">Budget Alerts</p>
                    <p className="text-sm opacity-60">Notify me when I reach 80% of my budget.</p>
                  </div>
                  <input type="checkbox" className="toggle toggle-secondary" defaultChecked />
                </div>
              </div>
            </div>
          </motion.div>
    </div>
  )
}

export default ProfilePreferences