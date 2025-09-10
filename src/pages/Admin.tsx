import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  IMAGE_STORE_KEY,
  BOOKINGS_STORE_KEY,
  getCustomerStats,
  getGalleryImages,
  setGalleryImages,
  getBlogImages,
  setBlogImages,
} from '../utils/storage';

const categories = ['Haircut', 'Manicure', 'Pedicure', 'Facial', 'Waxing', 'Hair Coloring'];

type ServiceImageMap = Record<string, string[]>; // category -> array of data URLs

type Booking = {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  message?: string;
};

const Admin: React.FC = () => {
  const { user, triggerToast } = useAuth();
  const [images, setImages] = useState<ServiceImageMap>({});
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [gallery, setGallery] = useState<string[]>([]);
  const [blogImages, setBlogImgs] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);
  const galleryFileRef = useRef<HTMLInputElement>(null);
  const blogFileRef = useRef<HTMLInputElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]);

  useEffect(() => {
    const raw = localStorage.getItem(IMAGE_STORE_KEY);
    if (raw) {
      try {
        setImages(JSON.parse(raw));
      } catch {}
    }
    const br = localStorage.getItem(BOOKINGS_STORE_KEY);
    if (br) {
      try {
        setBookings(JSON.parse(br));
      } catch {}
    }
    setGallery(getGalleryImages());
    setBlogImgs(getBlogImages());
  }, []);

  useEffect(() => {
    localStorage.setItem(IMAGE_STORE_KEY, JSON.stringify(images));
  }, [images]);

  const handleFiles = (files: FileList) => {
    const arr = Array.from(files);
    if (arr.length === 0) return;
    let ok = 0;
    arr.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = String(reader.result);
        setImages(prev => {
          const existing = prev[activeCategory] || [];
          return { ...prev, [activeCategory]: [dataUrl, ...existing] };
        });
        ok += 1;
        if (ok === arr.length) triggerToast('Service images uploaded', 'success');
      };
      reader.onerror = () => triggerToast('Failed to read some files', 'error');
      reader.readAsDataURL(file);
    });
  };

  const removeServiceImage = (idx: number) => {
    setImages(prev => {
      const existing = prev[activeCategory] || [];
      const next = existing.filter((_, i) => i !== idx);
      return { ...prev, [activeCategory]: next };
    });
    triggerToast('Service image removed', 'success');
  };

  const handleGalleryFiles = (files: FileList) => {
    const arr = Array.from(files);
    if (arr.length === 0) return;
    let added: string[] = [];
    let processed = 0;
    arr.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        added.push(String(reader.result));
        processed += 1;
        if (processed === arr.length) {
          const updated = [...added, ...gallery];
          setGallery(updated);
          setGalleryImages(updated);
          triggerToast('Gallery images uploaded', 'success');
        }
      };
      reader.onerror = () => triggerToast('Failed to read some gallery files', 'error');
      reader.readAsDataURL(file);
    });
  };

  const removeGalleryImage = (idx: number) => {
    const updated = gallery.filter((_, i) => i !== idx);
    setGallery(updated);
    setGalleryImages(updated);
    triggerToast('Gallery image removed', 'success');
  };

  const handleBlogFiles = (files: FileList) => {
    const arr = Array.from(files);
    if (arr.length === 0) return;
    let added: string[] = [];
    let processed = 0;
    arr.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        added.push(String(reader.result));
        processed += 1;
        if (processed === arr.length) {
          const updated = [...added, ...blogImages];
          setBlogImgs(updated);
          setBlogImages(updated);
          triggerToast('Blog images uploaded', 'success');
        }
      };
      reader.onerror = () => triggerToast('Failed to read some blog files', 'error');
      reader.readAsDataURL(file);
    });
  };

  const removeBlogImage = (idx: number) => {
    const updated = blogImages.filter((_, i) => i !== idx);
    setBlogImgs(updated);
    setBlogImages(updated);
    triggerToast('Blog image removed', 'success');
  };

  const canView = useMemo(() => user?.role === 'admin', [user]);

  if (!canView) {
    return (
      <div className="min-h-screen bg-gray-200 dark:bg-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-lg mx-auto bg-white dark:bg-gray-900 rounded-xl shadow p-8 border border-gray-100 dark:border-gray-700 text-center">
            <h1 className="text-2xl font-bold text-black dark:text-white mb-2">Access Denied</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Admins only. Please sign in as admin.
            </p>
            <a
              className="inline-block mt-4 px-4 py-2 rounded bg-primary text-black font-semibold"
              href="/auth"
            >
              Go to Sign In
            </a>
          </div>
        </div>
      </div>
    );
  }

  const stats = getCustomerStats();

  return (
    <div className="min-h-screen bg-gray-200 dark:bg-gray-800">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-black dark:text-white mb-6">Admin Dashboard</h1>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-4 border border-gray-100 dark:border-gray-700">
            <div className="text-gray-500 dark:text-gray-400 text-sm">Total Bookings</div>
            <div className="text-3xl font-bold text-black dark:text-white">
              {stats.totalBookings}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-4 border border-gray-100 dark:border-gray-700">
            <div className="text-gray-500 dark:text-gray-400 text-sm">Unique Customers</div>
            <div className="text-3xl font-bold text-black dark:text-white">
              {stats.uniqueCustomers}
            </div>
          </div>
        </div>

        <div className="grid xl:grid-cols-3 gap-6">
          {/* Upload panel */}
          <div className="xl:col-span-2 bg-white dark:bg-gray-900 rounded-xl shadow p-6 border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-black dark:text-white mb-4">
              Upload Service Images
            </h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1 rounded-full border text-sm ${
                    activeCategory === cat
                      ? 'bg-primary text-black border-primary'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={e => e.target.files && handleFiles(e.target.files)}
            />
            <button
              onClick={() => fileRef.current?.click()}
              className="px-4 py-2 rounded bg-primary text-black font-semibold hover:bg-white"
            >
              Select Images
            </button>

            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mt-4">
              {(images[activeCategory] || []).map((src, idx) => (
                <div key={idx} className="relative group">
                  <img
                    src={src}
                    alt={`${activeCategory}-${idx}`}
                    className="w-full h-24 object-cover rounded border border-gray-200 dark:border-gray-700"
                  />
                  <button
                    type="button"
                    onClick={() => removeServiceImage(idx)}
                    className="absolute top-1 right-1 px-2 py-1 text-xs rounded bg-red-600 text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 focus:opacity-100"
                    aria-label="Remove image"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Gallery upload */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-black dark:text-white mb-4">
              Upload Gallery Images
            </h2>
            <input
              ref={galleryFileRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={e => e.target.files && handleGalleryFiles(e.target.files)}
            />
            <button
              onClick={() => galleryFileRef.current?.click()}
              className="px-4 py-2 rounded bg-primary text-black font-semibold hover:bg-white"
            >
              Select Images
            </button>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mt-4">
              {gallery.map((src, idx) => (
                <div key={idx} className="relative group">
                  <img
                    src={src}
                    alt={`gallery-${idx}`}
                    className="w-full h-24 object-cover rounded border border-gray-200 dark:border-gray-700"
                  />
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(idx)}
                    className="absolute top-1 right-1 px-2 py-1 text-xs rounded bg-red-600 text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 focus:opacity-100"
                    aria-label="Remove image"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Blog images panel */}
        <div className="mt-6 bg-white dark:bg-gray-900 rounded-xl shadow p-6 border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-black dark:text-white mb-4">
            Upload Blog Images
          </h2>
          <input
            ref={blogFileRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={e => e.target.files && handleBlogFiles(e.target.files)}
          />
          <button
            onClick={() => blogFileRef.current?.click()}
            className="px-4 py-2 rounded bg-primary text-black font-semibold hover:bg-white"
          >
            Select Images
          </button>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mt-4">
            {blogImages.map((src, idx) => (
              <div key={idx} className="relative group">
                <img
                  src={src}
                  alt={`blog-${idx}`}
                  className="w-full h-24 object-cover rounded border border-gray-200 dark:border-gray-700"
                />
                <button
                  type="button"
                  onClick={() => removeBlogImage(idx)}
                  className="absolute top-1 right-1 px-2 py-1 text-xs rounded bg-red-600 text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 focus:opacity-100"
                  aria-label="Remove image"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
