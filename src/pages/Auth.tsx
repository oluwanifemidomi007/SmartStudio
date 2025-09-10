import React, { useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Auth: React.FC = () => {
  const { user, signIn, signOut, updateProfilePic, triggerToast } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<'user' | 'admin'>('user');
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result);
      updateProfilePic(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name || !email) {
      setError('Please fill name and email');
      return;
    }
    signIn({ name, email, phone, role });
    triggerToast(`Signed in as ${role}`, 'success');
  };

  if (user) {
    return (
      <div className="min-h-screen bg-gray-200 dark:bg-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-lg mx-auto bg-white dark:bg-gray-900 rounded-xl shadow p-8 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                {user.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-300">
                    No Pic
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-xl font-bold text-black dark:text-white">{user.name}</h2>
                <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
                <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs bg-primary text-black font-semibold">
                  {user.role.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={e => e.target.files && e.target.files[0] && handleFile(e.target.files[0])}
              />
              <button
                onClick={() => fileRef.current?.click()}
                className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 hover:border-primary"
              >
                Upload profile picture
              </button>
              <button
                onClick={signOut}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Log out
              </button>
            </div>

            {user.role === 'admin' ? (
              <div>
                <h3 className="text-lg font-semibold text-black dark:text-white mb-3">
                  Admin Panel
                </h3>
                <a
                  href="/admin"
                  className="inline-block px-4 py-2 rounded bg-primary text-black font-semibold hover:bg-white"
                >
                  Go to Admin Dashboard →
                </a>
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-300">
                You are signed in as a user. Use the menu to explore.
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-200 dark:bg-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white dark:bg-gray-900 rounded-xl shadow p-8 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-6">
            <img
              src="/images/smart_tonsurium-removebg-preview.png"
              alt="logo"
              className="w-12 h-12"
            />
            <h1 className="text-2xl font-bold text-black dark:text-white">Smart TS Studio</h1>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="text-red-600 text-sm">{error}</div>}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                Name
              </label>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                Email
              </label>
              <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                type="email"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                Phone
              </label>
              <input
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                Sign in as
              </label>
              <select
                value={role}
                onChange={e => setRole(e.target.value as 'user' | 'admin')}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-black py-2 rounded-md font-semibold hover:bg-black hover:text-primary transition"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
