import { Bell } from "lucide-react";

export default function NotificationAlert() {
  return (
    <button className="relative p-1 rounded-full hover:bg-gray-100 transition cursor-pointer">
      <Bell size={20} className="text-gray-600" />
      <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500" />
    </button>
  );
}
