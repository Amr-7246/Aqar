'use client'
import { logo } from '@/pub/assets'
import Image from 'next/image'
import React from 'react'
import textContent from "@/AppContent.json"
const content = textContent

const Footer = () => {
  return (
    <div className='flex justify-between lg:flex-row flex-col-reverse'>
      <div className='w-[100%] mx-auto lg:w-[50%] mt-[20px] p-5'>
        <Image className="w-[30%]" src={logo} alt={'logo'} />
        <p className={'text-[15px] lg:text-[20px] text-mainText mt-[10px] text-center'}  >consectetur adipisicing elit necessitatibus eligendi ad a quasi laudantium aspernatur ut doloribus cupiditate optio dolorum nobis! Nisi, quisquam consectetur adipisicing elit. Corporis quibusdam accusantium vel minima, </p>
      </div>
      <div className='flex flex-row gap-5 py-5 px-[10%] justify-between'>
        <div className='flex flex-col gap-2' >
          <h2 className="text-mainText mb-2 p-2 border-b border-border " >Hot Explor</h2>
          {content.navBar.options.filter((link) => link.name != "contact us" && link.name != "about" ).map((link, idx) => (
            <a className=' hover:text-mainText text-thirdText font-black duration-500' href={link.href}>{link.name}</a>
          ))}
        </div>
        <div className='flex flex-col gap-2'>
          <h2 className="text-mainText mb-2 p-2 border-b border-border " >get in toutch with</h2>
          {content.navBar.options.filter((link) => link.name == "contact us" || link.name == "about" ).map((link, idx) => (
            <a className=' hover:text-mainText text-thirdText font-black duration-500' href={link.href}>{link.name}</a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Footer
