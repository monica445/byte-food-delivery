export interface Shop {
  id: string;
  sellerId: string;
  shopCategoryId: string | null;
  name: string;
  description: string | null;
  logoUrl: string | null;
  coverUrl: string | null;
  addressText: string;
  latitude: number;
  longitude: number;
  isOpen: boolean;
  isApproved: boolean;
}

export interface Category {
  id: string;
  shopId: string;
  name: string;
  imageUrl: string | null;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  shopId: string;
  categoryId: string;
  name: string;
  description: string | null;
  price: number; // integer, KHR
  imageUrl: string | null;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryInput {
  name: string;
  imageUrl?: string;
  sortOrder?: number;
}

export interface ProductInput {
  name: string;
  description?: string;
  price: number;
  categoryId: string;
  imageUrl?: string;
  isAvailable?: boolean;
}
