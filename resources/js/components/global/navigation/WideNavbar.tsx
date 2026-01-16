"use client"

import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import AuthBtn from './AuthBtn'
import { useUserInfoContext } from '@/context/userInfoContext'
import Image from 'next/image'
import { logo } from '@/pub/assets'
import { useTranslations } from 'next-intl'
import { IGlobalOptions } from './GlobalNavBar'

const WideNavbar = ({globalOptions} : {globalOptions:IGlobalOptions[]}) => {
  const { UserInfo : user } = useUserInfoContext()
  const curentPath = usePathname()
  return (
      <nav  className='bg-third shadow-lg fixed top-0 left-0 shadow-black/30 px-[20px] py-3 hidden border-b border-[var(--border)] lg:px-[50px] h-fit w-[100%] z-30 md:!flex !justify-between items-center gap-3 '>
        {/*//& Logo & Theme button */}
          <div className=' flex-center flex-row gap-3 '>
              <Link href={"/"} >
                  <Image className='w-[100px] cursor-pointer' src={logo} alt="logo" />
              </Link>
          </div>
        {/*//& Nav Links */}
          <div className='flex-center lg:gap-8 gap-4 text-second-text '>
              {globalOptions.map((option, idx) => (
                option.name == 'Portfolio' && user == null  ?
                <Link  className={` hidden ${curentPath.includes(option.fake_href) ? '!text-bg-text  hover:!text-second-text ' : ''} hover:!text-bg-text duration-500 cursor-pointer`} key={idx}  href={option.href}> {option.name} </Link>
                :
                <Link  className={`${curentPath.includes(option.fake_href) ? '!text-bg-text  hover:!text-second-text ' : ''} hover:!text-bg-text duration-500 cursor-pointer`} key={idx}  href={option.href}> {option.name} </Link>
              ))}
          </div>
        {/*//& Auth Buttons */}
          <AuthBtn/>
      </nav >
  )
}

export default WideNavbar
