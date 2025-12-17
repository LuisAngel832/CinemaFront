import React from "react";

export default function UserHeader({ fullName, email, avatarUrl }) {
  return (
    <div className="flex items-center gap-4 mb-6">

      <div>
        <h2 className="text-xl font-semibold text-black-900 m-0">
          {fullName}
        </h2>
        <p className="text-sm text-gray-500 m-0">{email}</p>
      </div>
    </div>
  );
}
