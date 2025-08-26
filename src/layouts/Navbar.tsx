import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProfileIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6 text-gray-700" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="7" r="4" />
    <path d="M5.5 21a6.5 6.5 0 0113 0" />
  </svg>
);

const SearchIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-3.5-3.5" />
  </svg>
);

const Navbar: React.FC = () => {
  const [search, setSearch] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Search for: ${search}`);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center justify-between h-full px-6 w-full">
      {/* Search */}
      <form onSubmit={handleSearch} className="flex gap-2 max-w-md w-full" role="search">
        <input
          type="search"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-grow border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
          aria-label="Search"
        />
        <button
          type="submit"
          className="bg-gray-900 text-white px-4 rounded flex items-center gap-2 hover:bg-gray-800 transition"
          aria-label="Submit search"
        >
          <SearchIcon className="w-4 h-4" />
          <span className="hidden sm:inline">Search</span>
        </button>
      </form>

      {/* Profile Menu */}
      <div className="relative ml-4" ref={profileRef}>
        <button
          onClick={() => setShowProfileMenu((s) => !s)}
          className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition"
          aria-label="User Menu"
        >
          <ProfileIcon />
        </button>

        {showProfileMenu && (
          <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-md py-2 z-50">
            <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Profile
            </a>
            <a href="/setting" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Settings
            </a>
            <button
              onClick={() => {
                localStorage.removeItem("accessToken");
                navigate("/login", { replace: true });
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
