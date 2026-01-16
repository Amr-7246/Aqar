import Link from 'next/link';
import React from 'react'
import { RiLoader3Fill } from "react-icons/ri";


//& ThreeDBtn
export interface ThreeDBtnProps {
  text: string | React.ReactNode;
  icon?: React.ReactNode;
  buttonColors?: string;
  spanColors?: string;
  onClick?: () => void;
  isLoading?: boolean;
  loadingIcon?: React.ReactNode;
}

export const ThreeDBtn: React.FC<ThreeDBtnProps> = ({
  text,
  icon,
  buttonColors = "",
  spanColors = "",
  onClick,
  isLoading = false,
  loadingIcon = <RiLoader3Fill/>,
}) => {
  const buttonDefault =
    buttonColors === "" ? "shadow-black/50 bg-black text-white" : "";
  const spanDefault = spanColors === "" ? "bg-white" : "";

  return (
    <div className='group relative h-[40px] '>

      <span
        className={`group-hover:top-[6px]  group-hover:right-[6px] duration-300 absolute top-[0px] right-[0px] w-full h-full -z-1 ${spanDefault} ${spanColors}`}
      />

      <button
        onClick={onClick}
        className={`group-hover:top-[-6px] group-hover:right-[-6px] duration-300 absolute top-[0px] right-[0px] h-full cursor-pointer flex-center shadow-lg shadow-bg ${buttonDefault} ${buttonColors}`}
      >

        {isLoading ? (
          <span className="animate-spin inline-block">{loadingIcon}</span>
        ) : (
          <>
            {icon && <span>{icon}</span>}
            {text}
          </>
        )}
      </button>
    </div>
  );
};


//& IconicBtn

export interface IconicBtnProps {
  text: string | React.ReactNode;
  icon: React.ReactNode;
  iconStyle:string;
  buttonStyle: string;
  route?: string;

  onClick?: () => void;
  isLoading?: boolean;
  loadingIcon?: React.ReactNode;
}

export const IconicBtn = ({ 
  text, iconStyle, buttonStyle, 
  onClick, isLoading,route,
  icon = <RiLoader3Fill/> ,
  loadingIcon = <RiLoader3Fill/> }: IconicBtnProps) => {

  const butDefualt = buttonStyle == "" ? "shadow-black/50 bg-black text-white" : ""
  return (
    <div className={'group w-fit '}>
      <button 
        onClick={onClick}
        className={`font-Jost cursor-pointer font-black flex-center rounded-xl gap-3 px-3 py-2 w-fit shadow-lg text-[15px] ${butDefualt} relative ${buttonStyle}`}>
        
        <span className={`flex-center p-1 rounded-full w-8 h-8 text-[15px] ${iconStyle} `}>
          {isLoading ? (
          <span className="animate-spin inline-block">{loadingIcon}</span>
            ) : (<span>{icon}</span>)
          }
        </span>
        {text}
      </button>

    </div>
  )
}

// & CuttedBtn
export const CuttedBtn = ({
  text,
  icon,
  iconStyle,
  buttonColors,
  textStyle,
  svgStyle,
}: {
  text: string | any
  icon?: any
  iconStyle?: string
  buttonColors?: string
  textStyle?: string
  svgStyle?: string
}) => {
  const butDefualt =
    buttonColors == "" ? "shadow-black/50 bg-black text-white" : ""

  return (
    <button
      className={`py-2 px-4 font-Jost cursor-pointer font-black relative group w-fit shadow-lg text-[15px] flex items-center gap-2 ${butDefualt} ${buttonColors}`}
      style={{
        clipPath:
          "polygon(10% 0%, 90% 0%, 100% 25%, 100% 75%, 90% 100%, 10% 100%, 0% 75%, 0% 25%)",
      }}
    >
      {icon && (
        <span
          className={`flex-center w-7 h-7 text-[16px] ${iconStyle}`}
        >
          {icon}
        </span>
      )}
      <span className={`block ${textStyle}`}>{text}</span>

      {/* Decorative SVG inside button */}
      <svg
        className={`absolute inset-0 w-full h-full pointer-events-none ${svgStyle}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 80"
        preserveAspectRatio="none"
      >
        <polygon
          points="20,0 180,0 200,20 200,60 180,80 20,80 0,60 0,20"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        />
      </svg>
    </button>
  )
}
