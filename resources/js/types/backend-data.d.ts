//! what does ".d." in index.d.ts mean

interface IComments {
  comment: string;
  autherName: string;
  autherId: number;
  autherImage: string;
}
export interface IProperty {
  id?: number;
  name: string;
  description: string;
  autherName: string;
  autherImage: string;
  autherId: number;
  images: Array;
  videos: Array;
  globalLocations: Array;
  area: Array;
  price: number;
  like: number;
  comments: IComments[];
} 