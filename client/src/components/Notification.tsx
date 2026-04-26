import { Bell, CheckCircle, AlertCircle, Info, X } from "lucide-react";

interface Notification {
  id: number;
  title: string;
  message: string;
  type?: "success" | "error" | "info";
  created_at: string;
  read?: boolean;
}

interface Props {
  notifications: Notification[];
  onMarkRead?: (id: number) => void;
  onDelete?: (id: number) => void;
}

const getIcon = (type?: string) => {
  switch (type) {
    case "success":
      return <CheckCircle className="text-success" size={20} />;
    case "error":
      return <AlertCircle className="text-error" size={20} />;
    default:
      return <Info className="text-info" size={20} />;
  }
};

const formatTime = (date: string) => {
  return new Date(date).toLocaleString();
};

const Notification = ({
  notifications,
  onMarkRead,
  onDelete,
}: Props) => {
  if (!notifications?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-base-200/30 rounded-2xl border-2 border-dashed border-base-300">
        <Bell size={48} className="text-base-content/20 mb-4" />
        <p className="text-lg text-base-content/50">
          No notifications yet
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {notifications.map((notif) => (
        <div
          key={notif.id}
          className={`
            group flex items-start gap-4 p-4 rounded-xl border
            transition-all duration-300 hover:shadow-md
            ${notif.read
              ? "bg-base-100 border-base-200"
              : "bg-primary/5 border-primary/20"}
          `}
        >
          {/* Icon */}
          <div className="mt-1">
            {getIcon(notif.type)}
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex justify-between items-start">
              
              <div>
                <h3 className="font-semibold text-base-content">
                  {notif.title}
                </h3>

                <p className="text-sm text-base-content/70 mt-1">
                  {notif.message}
                </p>

                <p className="text-xs text-base-content/40 mt-2">
                  {formatTime(notif.created_at)}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
                
                {!notif.read && (
                  <button
                    onClick={() => onMarkRead?.(notif.id)}
                    className="btn btn-xs btn-ghost text-success"
                  >
                    Mark read
                  </button>
                )}

                <button
                  onClick={() => onDelete?.(notif.id)}
                  className="btn btn-xs btn-ghost text-error"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Unread dot */}
            {!notif.read && (
              <div className="mt-2">
                <span className="inline-block w-2 h-2 bg-primary rounded-full" />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notification;