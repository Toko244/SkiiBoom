// API Response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  meta?: PaginationMeta;
}

export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

// Equipment
export interface Equipment {
  id: number;
  slug: string;
  name: string;
  category: string;
  price: number;
  image: string;
  alt: string;
  rating: number;
  reviews: number;
  available: boolean;
  features: string[];
  sizes: string[];
  description: string;
  specifications: { label: string; value: string }[];
  images: { url: string; alt: string }[];
}

export interface EquipmentCategory {
  name: string;
  slug: string;
  count: number;
}

export interface EquipmentFilters {
  search?: string;
  category?: string | string[];
  price_min?: number;
  price_max?: number;
  size?: string | string[];
  availability?: string;
  min_rating?: number;
  sort?: string;
  per_page?: number;
  page?: number;
}

// Instructors
export interface Instructor {
  id: number | string;
  slug: string;
  name: string;
  image: string;
  alt: string;
  specialization: string;
  experience: string;
  languages: string[];
  rating: number;
  totalLessons: number;
  certifications: string[];
  bio: string;
}

// Skill Levels
export interface SkillLevel {
  id: string;
  title: string;
  description: string;
  icon: string;
  duration: string;
  price: string;
  priceNumeric: number;
  features: string[];
  color: string;
}

// Lessons
export interface Lesson {
  id: number;
  slug: string;
  title: string;
  description: string;
  instructor: string;
  instructorId: number | null;
  level: string;
  duration: number | string;
  maxParticipants: number;
  price: number;
  image: string;
  available: boolean;
}

// Lesson Packages
export interface LessonPackage {
  id: string;
  slug: string;
  name: string;
  description: string;
  sessions: number;
  duration: string;
  price: string;
  priceNumeric: number;
  savings: string;
  features: string[];
  popular: boolean;
}

// Bookings
export interface BookingRequest {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  start_date: string;
  end_date: string;
  arrival_date?: string;
  number_of_days: number;
  currency: 'GEL' | 'EUR' | 'USD';
  payment_method?: string;
  customer_message?: string;
  language?: string;
  equipment?: { equipment_id: number; quantity: number }[];
  lesson?: { lesson_id: number };
  lesson_package_id?: number;
}

export interface Booking {
  id: number;
  bookingId: string;
  status: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  startDate: string;
  endDate: string;
  arrivalDate: string;
  numberOfDays: number;
  subtotal: number;
  discount: number;
  taxAmount: number;
  totalAmount: number;
  currency: string;
  exchangeRate: number;
  paymentMethod: string | null;
  customerMessage: string | null;
  language: string;
  equipment: BookingEquipmentItem[];
  lessons: BookingLessonItem[];
  createdAt: string;
}

export interface BookingEquipmentItem {
  id: number;
  name: string;
  quantity: number;
  pricePerDay: number;
  lineTotal: number;
}

export interface BookingLessonItem {
  id: number;
  title: string;
  price: number;
}

// Gallery
export interface GalleryPhoto {
  id: number;
  image: string;
  alt: string;
  title: string;
  author: string;
  authorAvatar: string;
  authorAvatarAlt: string;
  date: string;
  likes: number;
  category: string;
  season: string;
  description: string;
  status: string;
}

export interface GalleryFilters {
  category?: string;
  season?: string;
  sort?: 'recent' | 'popular' | 'oldest';
  per_page?: number;
  page?: number;
}

export interface GallerySubmission {
  title: string;
  description?: string;
  image: File;
  category: string;
  season?: string;
  author_name?: string;
}

// Testimonials
export interface Testimonial {
  id: number;
  name: string;
  country: string;
  location: string;
  image: string;
  alt: string;
  rating: number;
  text: string;
  comment: string;
  date: string;
  lessonType: string;
  platform: string;
  page: string;
}

// FAQs
export interface FAQ {
  id: number;
  question: string;
  answer: string;
}

// About
export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  alt: string;
  bio: string;
  certifications: string[];
  experience: string;
}

export interface Certification {
  id: number;
  icon: string;
  title: string;
  description: string;
  issuer: string;
}

export interface Partner {
  id: number;
  name: string;
  logo: string;
  alt: string;
  url: string | null;
  category: string;
}

export interface Facility {
  id: number;
  name: string;
  description: string;
  areaSize: string | null;
  images: { id: number; url: string; alt: string }[];
}

export interface TimelineEvent {
  id: number;
  year: number;
  title: string;
  description: string;
  icon: string;
}

// Content
export interface PageContent {
  [section: string]: unknown;
}

// Settings
export interface SiteSettings {
  [key: string]: unknown;
}

// Auth
export interface AuthUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  role: string;
  languagePreference: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
  language?: string;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
}
