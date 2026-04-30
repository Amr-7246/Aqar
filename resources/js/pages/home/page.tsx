/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import { useEffect, useState } from "react";
import { ServerResponse } from "../types";
import Hero from "./components/Hero";
import Properties from "./components/Properties";
import { HomeProps, PropertyList } from "./types";
import { router } from "@inertiajs/react";
import { Loader2 } from "lucide-react";

interface Props extends ServerResponse<HomeProps> {}
export default function Page({ data }: Props) {
  const [items, setItems] = useState<PropertyList[]>(data.properties.data);
  const [nextUrl, setNextUrl] = useState(data.properties.links.next);
  const [isLoading, setIsLoading] = useState(false);
  const options = {
    root: null,
    rootMargin: "500px",
    threshold: 0.1 
  }

  const loadMore = () => {
    if (!nextUrl || isLoading) return;
  
    setIsLoading(true)
    router.get(nextUrl, {}, {
      preserveState: true, //! to do not loos the current state
      preserveScroll: true,
      only: ['properties'],
      onSuccess: (page:any) => {
        const newChunk = page.props.data.properties.data;
        const newNextUrl = page.props.data.properties.links.next;

        setItems((prev) => [...prev, ...newChunk])
        setNextUrl(newNextUrl)
        setIsLoading(false)
      }
    })
  }
  useEffect(() => { 
    const observer = new IntersectionObserver((entries) => { 
      if(entries[0].isIntersecting) loadMore()
    }, options)
    const flag = document.getElementById('flag')
    if (flag) observer.observe(flag)
    return () => observer.disconnect() 
  }, [nextUrl, isLoading])
  
  return (
    <div>
      <Hero propertiesCount={data.propertiesCount} clientsCount={data.clientsCount} dealCount={data.dealCount}/>
      <Properties properties={items} />
      <div id='flag' className="w-full flex flex-col items-center justify-center py-12">
        {isLoading && (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground animate-pulse">
              جاري تحميل المزيد من العقارات...
            </p>
          </div>
        )}

        {!nextUrl && items.length > 0 && (
          <p className="text-muted-foreground text-sm border-t w-full text-center pt-4">
            لقد شاهدت جميع العقارات المتاحة حالياً
          </p>
        )}
      </div>
    </div>
  );
}
