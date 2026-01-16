"use client"
import React from 'react'
import WideNavbar from './WideNavbar';
import MobileNavbar from './MobileNavbar';
import { useTranslations } from 'next-intl';
import { appRoutes } from '@/pub/assets';

export interface IGlobalOptions {
    name: string;
    href: string;
    fake_href: string;
}

const GlobalNav = () => {
  const NavText = useTranslations('Nav')

  const optionsRef = [
    { "name": "الرئيسية", "href": appRoutes.global.home, "fake_href": appRoutes.global.home },
    { "name": "مرجع المشاريع", "href": appRoutes.global.projectsInstance, "fake_href": appRoutes.global.projectsInstance },
    { "name": "احنا مين", "href": appRoutes.global.about, "fake_href": appRoutes.global.about },
    { "name": "كلمنا فى اى وقت", "href": appRoutes.global.contact, "fake_href": appRoutes.global.contact }
  ]

  const globalOptions = NavText('home') && NavText ? [
    { "name": NavText('home') , "href": "/global/", "fake_href": appRoutes.global.home },
    { "name": NavText('projects'), "href": appRoutes.global.projectsInstance, "fake_href": appRoutes.global.projectsInstance },
    { "name": NavText('about'), "href": appRoutes.global.about, "fake_href": appRoutes.global.about },
    { "name": NavText('contact'), "href": appRoutes.global.contact, "fake_href": appRoutes.global.contact }
  ] : optionsRef

  return (
    <div className=''>
      <WideNavbar   globalOptions={globalOptions as IGlobalOptions[]} />
      <MobileNavbar globalOptions={globalOptions as IGlobalOptions[]}/>
    </div>
)
}

export default GlobalNav
