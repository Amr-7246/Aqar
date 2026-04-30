import React from 'react'
import { globalText } from '@/index' //! is there is a way to make a specific file - like homeText - visable everyware
import PropertyPost from '@/pages/home/components/PropertyPost';
import { Property } from '@/pages/property/type';
import { Separator } from '@/components/ui/separator';

interface Props {
  properties: Property[];
}

const Properties = ({properties}: Props ) => {
  return (
    <section className=''>
      {properties && properties.length > 0 ? properties.map((prop, index) => (
        <>
          <PropertyPost property={prop}/>
          {index < properties.length - 1 && <Separator className="opacity-50" />}
        </>
        )) : <p>{globalText['prop-empity-message']}</p>
      }
    </section>
  )
}

export default Properties