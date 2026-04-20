import { Link } from "react-router-dom";
import { type Notification } from "../../types";
import { Avatar } from "../ui/Avatar";
import { Heart, MessageCircle, UserPlus, Repeat2 } from "lucide-react";
import { formatDistanceToNow } from "../../utils/time";

import { getImageUrl } from "../../utils/config";

const icons = {
  like: <Heart size={14} className="text-red-500" fill="currentColor" />,
  comment: <MessageCircle size={14} className="text-blue-400" fill="currentColor" />,
  follow: <UserPlus size={14} className="text-green-400" />,
  repost: <Repeat2 size={14} className="text-purple-400" />,
};

interface Props {
  notification: Notification;
  onRead: (id: string) => void;
}

export const NotificationItem = ({ notification, onRead }: Props) => {
  return (
    <div
      onClick={() => !notification.read && onRead(notification._id)}
      className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-800 transition cursor-pointer ${
        !notification.read ? "bg-gray-800/60" : ""
      }`}
    >
      {/* Unread dot */}
      <div className="relative shrink-0">
        <Avatar
          src={notification.sender.avatar ? `${getImageUrl}${notification.sender.avatar}` : ""}
          name={notification.sender.name}
          size="md"
        />
        <div className="absolute -bottom-0.5 -right-0.5 bg-gray-900 rounded-full p-0.5">
          {icons[notification.type]}
        </div>
      </div>

      {/* Message */}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-white">
          <Link
            to={`/profile/${notification.sender._id}`}
            className="font-semibold hover:underline"
          >
            {notification.sender.name}
          </Link>{" "}
          <span className="text-gray-400">
            {notification.message.replace(notification.sender.name, "").trim()}
          </span>
        </p>
        <p className="text-xs text-gray-600 mt-0.5">
          {formatDistanceToNow(notification.createdAt)}
        </p>
      </div>

      {/* Post thumbnail */}
      {notification.post?.image && (
        <img
          src={`${getImageUrl}${notification.post.image}`}
          className="w-10 h-10 rounded-lg object-cover shrink-0"
        />
      )}

      {/* Unread indicator */}
      {!notification.read && (
        <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: "#6C63FF" }} />
      )}
    </div>
  );
};