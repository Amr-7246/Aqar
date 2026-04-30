/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import { ServerResponse } from "@/pages/types";
import DroplistContainer from "./components/DroplistContainer";
import MainContainer from "./components/MainContainer";
import RestContainer from "./components/RestContainer";
import { DropListData } from "../type";
import { page, typography } from "@/constants/globalStyles";
import { motion } from "framer-motion";
import { useState } from "react";

interface Props extends ServerResponse<DropListData> {}

export default function Page({ data }: Props) {
  
  const [formData, setFormData] = useState({
    description: '',
    location: {},
    selectedAttributes: [],
    restDetails: {}
  });

  const handleMainDataChange = (description: string) => {
    setFormData(prev => ({ ...prev, description }));
  };

  const handleDroplistDataChange = (droplistData: any) => {
    setFormData(prev => ({ ...prev, ...droplistData }));
  };

  const handleRestDataChange = (restData: any) => {
    if (restData.submit) {
      // Handle form submission
      console.log('Form submitted:', { ...formData, ...restData.data });
    } else if (restData.cancel) {
      // Handle cancel
      console.log('Form cancelled');
    } else {
      setFormData(prev => ({ ...prev, restDetails: restData }));
    }
  }
  return (
    <div className={`${page}`}>
      {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className={`${typography.heading} text-4xl mb-2`}>
            Add New Property
          </h1>
          <p className="text-muted-foreground">
            Fill in the details to list your property
          </p>
        </motion.div>

      {/*// form section */}
        <div className="space-y-6">
          {/* //TODO: use React Easy Crop for beater UI */}
          <MainContainer 
            value={formData.description}
            onChange={handleMainDataChange} 
          />

          <DroplistContainer 
            categories={data.categories}
            countries={data.countries}
            governments={data.governments}
            cities={data.cities}
            attributeValue={data.attributeValue}
            onDataChange={handleDroplistDataChange}
          />
          
          <RestContainer onDataChange={handleRestDataChange} />
      </div>
    </div>
  )
}