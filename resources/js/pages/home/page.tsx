import Hero from "./components/Hero";
import PropertiesBref from "./components/PropertyPosts";
import { HomeProps } from "./types";

export default function Page({propertyPostData, propertiesCount, clientsCount, dealCount}: HomeProps) {
  return (
    <div>
      <Hero propertiesCount={propertiesCount} clientsCount={clientsCount} dealCount={dealCount}/>
      <PropertiesBref PropertyPosts={propertyPostData} />
    </div>
  );
}
