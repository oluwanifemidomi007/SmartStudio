import React, { useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Settings: React.FC = () => {
  const { user, updateProfile, updateProfilePic, triggerToast } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const fileRef = useRef<HTMLInputElement>(null);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-200 dark:bg-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-lg mx-auto bg-white dark:bg-gray-900 rounded-xl shadow p-8 border border-gray-100 dark:border-gray-700 text-center">
            <h1 className="text-2xl font-bold text-black dark:text-white mb-2">Please sign in</h1>
            <a href="/auth" className="inline-block mt-2 px-4 py-2 rounded bg-primary text-black font-semibold">Go to Login</a>
          </div>
        </div>
      </div>
    );
  }

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, email, phone });
    triggerToast('Profile updated', 'success');
  };

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      updateProfilePic(String(reader.result));
      triggerToast('Profile picture updated', 'success');
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-gray-200 dark:bg-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow p-8 border border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-black dark:text-white mb-4">Settings</h1>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
              {user.profilePic ? (
                <img src={user.profilePic} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-300">No Pic</div>
              )}
            </div>
            <div>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => e.target.files && e.target.files[0] && handleFile(e.target.files[0])} />
              <button onClick={() => fileRef.current?.click()} className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 hover:border-primary">Change picture</button>
            </div>
          </div>
          <form onSubmit={save} className="space-y-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Name</label>
              <input value={name} onChange={e => setName(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Email</label>
              <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Phone</label>
              <input value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <button type="submit" className="px-6 py-2 rounded bg-primary text-black font-semibold hover:bg-black hover:text-primary">Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
