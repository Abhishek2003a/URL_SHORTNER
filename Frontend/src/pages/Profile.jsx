import { Bell, LockKeyhole, Mail, UserRound } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const Profile = () => {
  const { user } = useAuth();
  const username = user?.username || "User";
  const initial = username.charAt(0).toUpperCase();

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="mt-2 text-sm text-slate-500">
          Manage your account information and preferences.
        </p>
      </div>

      <div className="space-y-6">
        <section className="rounded-2xl border border-white/10 bg-white/[0.025] p-6 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="grid h-20 w-20 place-items-center rounded-2xl bg-white text-2xl font-bold text-black">
              {initial}
            </div>

            <div>
              <h2 className="text-xl font-bold">{username}</h2>
              <p className="mt-1 text-sm text-slate-500">Free Plan</p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur sm:p-8">
          <h2 className="font-semibold">Account information</h2>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <Field icon={UserRound} label="Name" value={username} />
            <Field icon={Mail} label="Email" value={user?.email || ""} />
          </div>
        </section>

        <section className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur sm:p-8">
          <h2 className="font-semibold">Preferences</h2>

          <div className="mt-5 space-y-4">
            <Preference
              icon={Bell}
              title="Analytics notifications"
              description="Receive notifications about unusual traffic spikes."
            />
            <Preference
              icon={LockKeyhole}
              title="Secure sessions"
              description="Require authentication for dashboard access."
            />
          </div>
        </section>
      </div>
    </div>
  );
};

const Field = ({ icon: Icon, label, value }) => (
  <div>
    <label className="mb-2 block text-xs font-medium text-slate-500">
      {label}
    </label>
    <div className="flex items-center gap-3 rounded-xl border border-white/20 bg-black/20 px-4 py-3">
      <Icon size={17} className="text-slate-600" />
      <span className="text-sm text-slate-300">{value}</span>
    </div>
  </div>
);

const Preference = ({ icon: Icon, title, description }) => (
  <div className="flex items-center justify-between gap-5 rounded-xl border border-white/10 bg-black/20 p-4">
    <div className="flex items-center gap-3">
      <div className="rounded-lg bg-white/5 p-2 text-slate-400">
        <Icon size={17} />
      </div>
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="mt-1 text-xs text-slate-600">{description}</p>
      </div>
    </div>

    <div className="h-5 w-9 rounded-full bg-white p-0.5">
      <div className="ml-auto h-4 w-4 rounded-full bg-black" />
    </div>
  </div>
);

export default Profile;
