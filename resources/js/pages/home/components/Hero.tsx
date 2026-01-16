import { IconicBtn, ThreeDBtn } from '@/components/Buttons'
// import { appRoutes, homeAssets } from '@/pub/assets'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FiChevronRight, FiUsers, FiMapPin } from 'react-icons/fi'

const Hero = () => {
  const homeText = useTranslations('Home')

  return (
    <section className="w-full min-h-[85vh] ">
      {/*//~ upper Part */}
        <div className="flex flex-col lg:flex-row items-start lg:gap-0 gap-8">

          {/*//& App Global Intro */}
            <div className="flex-1 p-8 lg:p-12 mt-12 ">
              <div className="flex items-center gap-1 mb-4">
                <span className="text-second-text">
                  <FiMapPin className="w-5 h-5" />
                </span>
                <span className="text-sm font-semibold text-third-text ">{homeText('explorMap')}</span>
              </div>

              <h1 className="">
                {homeText('welcome')}
              </h1>

              <p className="">
                {homeText('pref')}
              </p>
              {/* //TODO:use smoothScrolling() */}
                <div className='w-fit'>
                  <Link href={'#specifications'}>
                    <IconicBtn
                      text={homeText('explorSpecificationsBtn')}
                      icon={undefined}
                      iconStyle={'bg-second text-main-text group-hover:bg-main group-hover:text-second-text duration-500  '}
                      buttonStyle={'bg-main text-second-text mt-8 group-hover:bg-second group-hover:text-main-text duration-500 '}/>

                  </Link>
                </div>
            </div>

          {/*//& Hero image */}
            <div className="flex-1 flex items-center justify-center mx-auto pt-10">
              <div className=" w-full overflow-hidden ">
                <Image src={homeAssets.hero} alt={'hero'} className="w-full h-auto object-cover" />
              </div>
            </div>

        </div>
      {/*//~ lower Part */}
        <div className="mt-16 flex flex-col gap-6 ">
          <Link href={appRoutes.global.book} className="inline-block">
            <ThreeDBtn
            //TODO: fix that bug latter
              text={homeText('rentArtisan')}
              buttonColors={'bg-third text-second-text shadow-md w-full'}
              spanColors={'bg-second'}
            />
          </Link>

          <Link href={appRoutes.global.projectsInstance} className="inline-block">
            <ThreeDBtn
              text={homeText('explorPricing')}
              buttonColors={'bg-third text-second-text w-full shadow-md'}
              spanColors={'bg-second'}
            />
          </Link>

        </div>

    </section>
  )
}

export default Hero
