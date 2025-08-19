import React, { useState, useEffect } from "react";

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  bio: string;
  location: string;
  joined: string;
  balance: number;
  transactions: number;
  successRate: number;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    // Hardcoded JSON data
    const profileData: UserProfile = {
      name: "Elna Yangfo",
      email: "elna@example.com",
      avatar: "https://i.pravatar.cc/300?img=12",
      bio: "Full-stack developer passionate about fintech, secure payments & scaling platforms.",
      location: "Kathmandu, Nepal",
      joined: "March 2023",
      balance: 15230.75,
      transactions: 348,
      successRate: 96.4,
    };

    setTimeout(() => {
      setProfile(profileData);
    }, 500);
  }, []);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <div className="w-full max-w-3xl bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
        {/* Top Section */}
        <div className="flex flex-col items-center text-center">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-28 h-28 rounded-full border border-gray-300 object-cover shadow-md"
          />
          <h1 className="mt-4 text-2xl font-bold text-gray-800">
            {profile.name}
          </h1>
          <p className="text-gray-600">{profile.email}</p>
          <p className="mt-2 text-gray-700 max-w-md">{profile.bio}</p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-4 mt-8 text-center">
          <div className="p-4 rounded-lg bg-gray-50 border">
            <p className="text-sm text-gray-500">Wallet Balance</p>
            <p className="text-xl font-bold text-green-600">
              ${profile.balance.toLocaleString()}
            </p>
          </div>
          <div className="p-4 rounded-lg bg-gray-50 border">
            <p className="text-sm text-gray-500">Transactions</p>
            <p className="text-xl font-bold text-blue-600">
              {profile.transactions}
            </p>
          </div>
          <div className="p-4 rounded-lg bg-gray-50 border">
            <p className="text-sm text-gray-500">Success Rate</p>
            <p className="text-xl font-bold text-purple-600">
              {profile.successRate}%
            </p>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-6 flex justify-between text-gray-600 text-sm border-t pt-4">
          <span>📍 {profile.location}</span>
          <span>🗓 Joined {profile.joined}</span>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-3 justify-center">
          <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
            Edit Profile
          </button>
          <button className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200">
            View Transactions
          </button>
          <button className="px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
