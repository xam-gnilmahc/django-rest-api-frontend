import React, { useState, useRef, useEffect } from "react";

const Navbar: React.FC = () => {
  const [search, setSearch] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Search for: ${search}`);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center justify-between h-full px-4 bg-white">
      {/* Search */}
      <form onSubmit={handleSearch} className="flex gap-2 max-w-md w-full" role="search">
        <input
          type="search"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-grow rounded border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
          aria-label="Search"
        />
        <button
          type="submit"
          className="bg-gray-900 text-white px-4 rounded hover:bg-gray-300 transition"
          aria-label="Submit search"
        >
          Search
        </button>
      </form>

      {/* Profile Menu */}
      <div className="relative ml-4" ref={profileRef}>
        <button
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition"
          aria-label="User Menu"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="7" r="4" />
            <path d="M5.5 21a6.5 6.5 0 0113 0" />
          </svg>
        </button>

        {showProfileMenu && (
          <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-md py-2 z-50">
            <a
              href="/profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Profile
            </a>
            <a
              href="/setting"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Settings
            </a>
            <button
              onClick={() => {
                localStorage.removeItem("accessToken");
                window.location.href = "/login";
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
