// src/components/Header.tsx

import { useUser } from "@auth0/nextjs-auth0/client";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const { user, error, isLoading } = useUser();

  return (
    <header className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-300 dark:bg-neutral-600 ">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <h1 className="text-xl font-semibold">MyLittleTextbook</h1>
        </div>
        <div className="flex items-center justify-center gap-5">
          <ThemeToggle />
          <div>
            {isLoading ? (
              <span>Loading...</span>
            ) : user ? (
              <a
                href="/api/auth/logout"
                className="text-blue-600 p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                Logout
              </a>
            ) : (
              <a
                href="/api/auth/login"
                className="text-blue-600 p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                Login
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
