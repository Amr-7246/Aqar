/* eslint-disable @typescript-eslint/no-explicit-any */
import { PageProps } from '@inertiajs/core';

export interface ServerResponse<T> {
  success: boolean;
  message: string;
  error: any;
  data: T;
}
export interface SharedProps extends PageProps {
  auth: {
    user: {
      id: number;
      name: string;
      email: string;
      avatar: string;
    } | null;
  };
}

export interface BaseProperty {
  id: number;
  uuid: string;
  title: string;
  price: number;
  currency: 'EG' | 'dolar';
  thumbnail: string;
  category: string;
  location: PropertyLocation;
  stats: {
    likes: number;
    views: number;
    comments: number;
  };
}

export interface PropertyLocation {
  country: string;
  government: string;
  city: string;
  address: string;
}