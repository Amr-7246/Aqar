/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseProperty } from "../types";

export interface PropertyList extends BaseProperty {
  brokerId: number;
  brokerName: string;
  brokerImage: string;
  description: string;
  area_m2: number;
  purpose: 'rent' | 'sell';
  gallery: string[]; 
  videos: string[]; 
  liks: number;
  does_user_like: boolean;
  created_at?: string;
  updated_at?: string;
  links?: any;
}

export interface HomeProps {
    properties: {
      data:PropertyList[],
      links: any,
      meta:any
    },
    propertiesCount: number,
    clientsCount: number, 
    dealCount: number
  }