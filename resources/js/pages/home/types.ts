export interface HeroProps {
  propertiesCount: number,
  clientsCount: number, 
  dealCount: number
}

export interface postData {
  id: number;
  brokerId: number;
  brokerName: string;
  brokerImage: string;
  categoryName: number;
  locations: string[];
  title: string;
  description: string;
  area_m2: number;
  type: 'rent' | 'sell';
  price: number;
  images: string[]; // Representing the JSON array
  videos: string[]; // Representing the JSON array
  liks: number;
  comments: string[];
  created_at?: string;
  updated_at?: string;
}

export interface HomeProps {
    propertyPostData: postData[],
    propertiesCount: number,
    clientsCount: number, 
    dealCount: number
  }