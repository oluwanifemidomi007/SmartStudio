export const IMAGE_STORE_KEY = 'smartstudio-service-images';
export const BOOKINGS_STORE_KEY = 'smartstudio-bookings';
export const GALLERY_STORE_KEY = 'smartstudio-gallery-images';
export const BLOG_STORE_KEY = 'smartstudio-blog-images';

export type ServiceImageMap = Record<string, string[]>; // category -> data URLs or remote URLs

export type BookingRecord = {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  message?: string;
  createdAt: string;
};

export function getServiceImagesMap(): ServiceImageMap {
  try {
    const raw = localStorage.getItem(IMAGE_STORE_KEY);
    return raw ? (JSON.parse(raw) as ServiceImageMap) : {};
  } catch {
    return {};
  }
}

export function getAllAdminImages(): Array<{ category: string; url: string }> {
  const map = getServiceImagesMap();
  const list: Array<{ category: string; url: string }> = [];
  Object.keys(map).forEach(cat => {
    (map[cat] || []).forEach(url => list.push({ category: cat, url }));
  });
  return list;
}

export function saveBooking(record: BookingRecord) {
  try {
    const raw = localStorage.getItem(BOOKINGS_STORE_KEY);
    const arr: BookingRecord[] = raw ? JSON.parse(raw) : [];
    arr.unshift(record);
    localStorage.setItem(BOOKINGS_STORE_KEY, JSON.stringify(arr));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('smartstudio:new-booking', { detail: record }));
    }
  } catch {
    // ignore
  }
}

export function getBookings(): BookingRecord[] {
  try {
    const raw = localStorage.getItem(BOOKINGS_STORE_KEY);
    return raw ? (JSON.parse(raw) as BookingRecord[]) : [];
  } catch {
    return [];
  }
}

export function getCustomerStats(): { totalBookings: number; uniqueCustomers: number } {
  const bookings = getBookings();
  const unique = new Set(
    bookings.map(b => (b.email || b.phone).toLowerCase?.() || b.email || b.phone)
  );
  return { totalBookings: bookings.length, uniqueCustomers: unique.size };
}

export function getGalleryImages(): string[] {
  try {
    const raw = localStorage.getItem(GALLERY_STORE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function setGalleryImages(images: string[]) {
  localStorage.setItem(GALLERY_STORE_KEY, JSON.stringify(images));
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('smartstudio:image-uploaded', {
        detail: { kind: 'gallery', count: images.length },
      })
    );
  }
}

export function getBlogImages(): string[] {
  try {
    const raw = localStorage.getItem(BLOG_STORE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function setBlogImages(images: string[]) {
  localStorage.setItem(BLOG_STORE_KEY, JSON.stringify(images));
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('smartstudio:image-uploaded', {
        detail: { kind: 'blog', count: images.length },
      })
    );
  }
}
