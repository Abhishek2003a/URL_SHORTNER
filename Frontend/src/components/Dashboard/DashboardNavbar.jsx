import { Bell, Search, UserRound } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const DashboardNavbar = () => {
  const { user } = useAuth();
  const username = user?.username || "User";

  return (
    <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-white/10 bg-black/80 px-4 backdrop-blur-xl sm:px-6 lg:px-10">
      <div className="ml-12 flex min-w-0 items-center gap-3 lg:ml-0">
        <div className="relative hidden sm:block">
          <Search
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          />
          <input
            type="text"
            placeholder="Search URLs..."
            className="w-64 rounded-xl border border-white/20 bg-white/10 py-2.5 pl-10 pr-4 text-sm text-white outline-none placeholder:text-gray-500 focus:border-white/40"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button className="relative rounded-xl p-2.5 text-gray-400 hover:bg-white/10 hover:text-white" title="Notifications">
          <Bell size={19} />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-white" />
        </button>

        <div className="h-7 w-px bg-white/10" />

        <button className="flex items-center gap-3 rounded-xl px-2 py-1.5 hover:bg-white/5">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-white text-black">
            <UserRound size={17} />
          </div>

          <div className="hidden text-left sm:block">
            <p className="text-sm font-semibold text-white">{username}</p>
            <p className="text-[11px] text-gray-500">Free Plan</p>
          </div>
        </button>
      </div>
    </header>
  );
};

export default DashboardNavbar;
