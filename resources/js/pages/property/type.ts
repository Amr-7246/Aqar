import { BaseProperty } from "../types";

//~ property details
  export interface ShowPropertyResponse {
    success: boolean;
    message: string;
    data: {
      propertyDetails: PropertyDetails;
      similarProperties: PropertyCard[]; 
      isFavorited: boolean; 
    };
  }
  export interface PropertyCard {
    id: number;
    uuid: string;
    title: string | null;
    price: number;
    currency: string;
    image: string;
    city: string;
    purpose: 'rent' | 'sale';
  }

  export interface PropertyDetails extends BaseProperty {
    //& relations data
    brokerId: string | number;
    brokerName: string;
    brokerImage: string | null;

    //& Main Data
    description: string;
    area_m2: number | null;
    purpose: 'rent' | 'sale';
    gallery: string[];
    videos: string[];
    created_at: string;
    status: string;

    //& Statistics Data
    does_user_like: boolean;
    comments: Comment[];
    inquiriesCount: number;
  }


  export interface Comment {
    id: number;
    userName: string;
    userAvatar: string;
    text: string;
    date: string;
  }

//~ property summary types
  export interface UserProperties {
    properties: PropertySummary[];
    statusCounts: {
        pending: number;
        approved: number;
        rejected: number;
    };
  }
  export interface PropertySummary extends BaseProperty {
    created_at: string;
  }

//~ prop types for creations
  export interface CreatePropertyRequest {
    owner_id?: number ;
    broker_id: null;
    location_id: number;
    category_id: number;

    //& Form Inputs
    title: string | null;
    description: string;
    area_m2: number | null;
    price: number;
    is_flexable_price: boolean;

    //& Enums as String Unions
    purpose: 'rent' | 'sale';
    currency: 'EG' | 'dolar';
    
    is_active?: boolean;
  }
//~ droplist types for UX
  export interface DropListData {
    categories : {
      name:string,
      description:string,
    }[],
    countries : string[],
    governments : string[],
    cities : string[],
    attributeValue : Record<string, string[]>,
  }