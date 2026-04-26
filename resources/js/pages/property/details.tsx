import PropertyPost from "@/components/property-post";
import { postData } from "../home/types";
import { globalText } from "@/index";


export default function Details({propertyDetails} : {propertyDetails:postData}) {
  return (
    <main>
      {propertyDetails ?
        <PropertyPost property={propertyDetails}/>
        : <p>{globalText['prop-empity-message']}</p>
      }
    </main>
  )
}