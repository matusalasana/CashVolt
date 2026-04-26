import { useState } from "react";
import { Bell, Mail } from "lucide-react";

const NotificationSection = () => {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [newsletterEnabled, setNewsletterEnabled] = useState(false);

  return (
    <div className="mx-auto w-full p-4">
      <div className="mb-3">
        <h2 className="text-[10px] font-semibold uppercase tracking-wider text-base-content/50">
          Notifications
        </h2>
      </div>

      <div className="overflow-hidden rounded-2xl bg-base-100 border border-base-300 shadow-sm">

        {/* Push Notifications */}
        <div className="flex items-center justify-between px-4 py-3">

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-base-200 text-emerald-600">
              <Bell size={20} />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-base-content">
                Push Notifications
              </h3>
              <p className="text-xs text-base-content/70">
                Real-time alerts
              </p>
            </div>
          </div>

          {/* Toggle */}
          <button
            onClick={() => setPushEnabled(!pushEnabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full  ${
              pushEnabled ? "bg-emerald-500" : "bg-base-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white  ${
                pushEnabled ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        <div className="mx-4 border-t border-base-300" />

        {/* Newsletter */}
        <div className="flex items-center justify-between px-4 py-3">

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-base-200 text-base-content">
              <Mail size={20} />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-base-content">
                Newsletter
              </h3>
              <p className="text-xs text-base-content/70">
                Weekly updates
              </p>
            </div>
          </div>

          {/* Toggle */}
          <button
            onClick={() => setNewsletterEnabled(!newsletterEnabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full  ${
              newsletterEnabled ? "bg-emerald-500" : "bg-base-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white  ${
                newsletterEnabled ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

      </div>
    </div>
  );
};

export default NotificationSection;