import React from 'react'
import { postData } from '../types'
import { globalText } from '@/index' //! is there is a way to make a specific file - like homeText - visable everyware
import PropertyPost from '@/components/property-post';

interface ComponentProps {
  PropertyPosts: postData[];
}

const PropertyPosts = ({PropertyPosts}: ComponentProps ) => {
  return (
    <section className=''>
      {PropertyPosts && PropertyPosts.length > 0 ? PropertyPosts.map((prop) => (
        <PropertyPost property={prop}/>
        )) : <p>{globalText['prop-empity-message']}</p>
      }
    </section>
  )
}

export default PropertyPosts