import { globalAssets } from "@/constants/assets"
import { router } from "@inertiajs/react"
import { useState } from "react"

export function useLike(initialIsLiked: boolean, initialCount: number, routeName:string) {
  const [isLiked, setIsLiked] = useState(initialIsLiked)
  const [count, setCount] = useState<number>(initialCount)

  const playSound = (type: 'on' | 'off') => {
    const audio = new Audio(type === 'on' ? globalAssets.likeSound : globalAssets.unlikeSound)
    audio.volume = 0.4
    audio.play().catch(()=>{})  //! Catch block prevents errors if browser blocks autoplay
  }

  const toggleLike = () => {
    const prevLiked = isLiked;
    const prevCount = count;
    //& reverse the isLiked state, condtionaly change the count
      setCount(prevLiked ? prevCount + 1 : prevCount - 1)
      setIsLiked(!prevLiked)
    //& lunch the sound
      playSound(prevLiked ? 'off' : 'on');
    //& hit the backend
      router.post(routeName, {}, {
        preserveScroll: true,
        onCancel: () => { // If request is cancelled
          setIsLiked(prevLiked);
          setCount(prevCount);
        },
        onError: () => { // If server fails 
          setIsLiked(prevLiked);
          setCount(prevCount);
        }
      })
  }

return {toggleLike, isLiked, count}
}