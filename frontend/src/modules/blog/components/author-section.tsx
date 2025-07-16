import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface AuthorSectionProps {
  name: string;
  profilePhoto: string | null;
  role: string;
}

export const AuthorSection: React.FC<AuthorSectionProps> = ({
  name,
  profilePhoto,
  role,
}) => {

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      <div className="flex items-center space-x-4 p-4 rounded-lg bg-white dark:bg-gray-800">
        <Avatar className="h-16 w-16">
          {profilePhoto && (
            <AvatarImage
              src={profilePhoto}
              alt={name}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = `https://placehold.co/64x64/cccccc/333333?text=${name.charAt(0)}`;
              }}
            />
          )}
          <AvatarFallback className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xl font-semibold">
            {name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="p-0 flex-1">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white leading-tight">
            {name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {role}
          </p>
        </div>
      </div>
    </div>
  );
};
