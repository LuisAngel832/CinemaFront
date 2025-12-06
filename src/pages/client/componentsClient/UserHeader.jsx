import React from "react";

export default function UserHeader({ fullName, email, avatarUrl }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="w-20 h-20 rounded-full border border-gray-300 bg-gray-200 overflow-hidden">
        {avatarUrl && (
          <img src={avatarUrl} alt={fullName} className="w-full h-full object-cover" />
        )}
      </div>
      <div>
        <h2 className="text-xl font-semibold text-gray-900 m-0">{fullName}</h2>
        <p className="text-sm text-gray-500 m-0">{email}</p>
      </div>
    </div>
  );
}
