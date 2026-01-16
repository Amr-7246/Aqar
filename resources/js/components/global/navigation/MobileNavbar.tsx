"use client"

import { motion } from 'framer-motion';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { IoCloseOutline } from "react-icons/io5";
import AuthBtn from './AuthBtn';
import { useUserInfoContext } from '@/context/userInfoContext';
import { logo } from '@/pub/assets';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { IGlobalOptions } from './GlobalNavBar';

const MobileNavbar = ({globalOptions} : {globalOptions:IGlobalOptions[]}) => {

  const { UserInfo : user } = useUserInfoContext()
  const curentPath = usePathname()
  const navRef = useRef<HTMLDivElement>(null);
  const [IsOpend, setIsOpend] = useState(false)

  useEffect(() => {
      const handleResize = () => {
          const IsSmall = !!( window.innerWidth < 768 )
          if (IsOpend  && IsSmall ) {
              document.body.style.overflow = "hidden"
          } else {
              document.body.style.overflow = "auto"
          }
      }
      handleResize()
      window.addEventListener("resize", handleResize);
      return () => {
          window.removeEventListener("resize", handleResize);
          document.body.style.overflow = "auto"
      }
  }, [IsOpend])

  return (
    <div className=''>
      {/*//& front nav bar */}
        <nav ref={navRef}  className="bg-third shadow-lg fixed shadow-third/20 top-0 left-0 z-10 border-b border-third flex-center md:!hidden !justify-between items-center h-fit w-[100%] py-1 px-5 ">

          <Link href={"/"} >
              <Image className='w-[100px] cursor-pointer' src={logo} alt="logo" />
          </Link>
          <div className='flex flex-row gap-3'>
            {/* <ThemeToggle/> */}
            <div onClick={() => {setIsOpend(true); navRef.current?.scrollIntoView({ behavior: "smooth" });}}  className="flex-center  group items-end flex-col w-[60px] gap-2 cursor-pointer">
                <span className={` ${IsOpend ? 'w-full  group-hover:w-1/2 ' : ' w-1/2 group-hover:w-full' } block  h-[1px] bg-[var(--surface)] transition-all duration-800 ease-in-out `}></span>
                <span className="block w-full h-[1px] bg-[var(--surface)] transition-all duration-300 ease-in-out"></span>
            </div>
          </div>

        </nav>

      {/*//& Sid Bar */}
        <nav className={` z-20 fixed ${IsOpend ? "translate-x-[0%]" : "translate-x-[-100%]" } left-0 top-0 md:hidden z-20 flex min-h-screen duration-1000 transition-all w-full `}>

            <div className=' !text-second-text bg-third w-[70%] border-r border-stone-400/50 '>

              <div className='border-b flex flex-row justify-between border-third p-3 '>
                  <div onClick={() => setIsOpend(false)}  className={`flex-center group items-end flex-col w-[60px] h-[60px] gap-2 cursor-pointer`}>
                      <span className={`  text-[30px] hover:scale-125 hover:rotate-15 hover:text-second-text duration-700 `}><IoCloseOutline/></span>
                  </div>
                  <AuthBtn/>
              </div>

              <div  className='flex flex-wrap h-fit mb-3'>
                  {globalOptions.map((option, idx) => (
                      option.name == 'Portfolio' && user == null  ?
                          <Link onClick={() => setIsOpend(false)}  className={`${curentPath == option.href ? '!text-second-text' : 'text-main-text'} hidden hover:!text-second-text font-third font-mono duration-500 py-5 px-3 w-full border-b border-stone-600 cursor-pointer`} key={idx} href={option.href}>{option.name}</Link>
                      :   <Link onClick={() => setIsOpend(false)}  className={`${curentPath == option.href ? '!text-second-text' : 'text-main-text'} hover:!text-second-text font-third font-mono duration-500 py-5 px-3 w-full border-b border-stone-600 cursor-pointer`} key={idx} href={option.href}>{option.name}</Link>
                  ))}
              </div>

            </div>

            {
            IsOpend &&
            <motion.div
                initial={{ opacity: 0 }}
                animate={{opacity : 0.5 }}
                transition={{
                    duration: 0.3 ,
                    delay: 0.8 ,
                    ease: "easeInOut"
                }}
                onClick={() => setIsOpend(false)} className={` h-screen flex-1 bg-third `} />
            }
        </nav>
    </div>
  )
}

export default MobileNavbar
