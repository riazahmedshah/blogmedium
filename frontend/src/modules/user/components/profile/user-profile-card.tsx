import React from 'react';

interface UserProfileDetailsProps {
  user: {
    name: string;
    email: string;
    profilePhoto?: string;
    role?: string;
  };
  blogCount: number;
}

export const UserProfileDetails: React.FC<UserProfileDetailsProps> = ({ user, blogCount }) => {
  if (!user) {
    return <div className="text-red-500">User details not available.</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="flex items-center space-x-4">
        {user.profilePhoto && (
          <img
            src={user.profilePhoto}
            alt={user.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
          />
        )}
        <div>
          <h2 className="text-3xl font-bold text-gray-900">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
          {user.role && <p className="text-gray-500 text-sm mt-1">{user.role}</p>}
          <p className="text-gray-700 text-md mt-2">
            <strong>Blogs Published:</strong> <span className="font-semibold text-lg">{blogCount}</span>
          </p>
        </div>
      </div>
    </div>
  );
};