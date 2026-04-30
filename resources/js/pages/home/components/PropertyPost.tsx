import React from 'react'
import { Rocket, MapPin, MoreHorizontal, ChartNoAxesCombined } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Link } from '@inertiajs/react'
import {route} from 'ziggy-js'
import CommentsModal from './CommentsModal'
import { useLike } from '@/hooks/use-like'
import { PropertyList } from '../types'

const PropertyPost = ({ property }: { property: PropertyList }) => {
  const {toggleLike, isLiked, count} = useLike(property.does_user_like ?? false, property.stats.likes, route('properties.like', property.id))
  return (
    <Card className="w-full max-w-2xl mx-auto bg-card overflow-hidden mb-1 shadow-sm">
      {/* //& Header: Broker Info */}
      <CardHeader className="flex flex-row items-center justify-between p-4 space-y-0">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border border-border">
            <AvatarImage src={property.brokerImage ?? ''} alt={property.brokerName} />
            <AvatarFallback>{property.brokerName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h4 className="text-sm font-bold leading-none text-foreground">
              {property.brokerName}
            </h4>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-xs text-muted-foreground">{property.created_at}</span>
              <span className="text-xs text-muted-foreground">•</span>
              <Badge variant="secondary" className="text-[10px] px-1 py-0 h-4 bg-secondary text-secondary-foreground">
                {property.category}
              </Badge>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </CardHeader>

      {/* //& Body: Title & Description */}
      <CardContent className="px-4 pb-2 pt-0 space-y-3">
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-foreground leading-tight">{property.title}</h3>
          <div className="flex items-center gap-1 text-primary text-sm font-medium">
            <MapPin className="h-3 w-3" />
            {property.location.address}
          </div>
        </div>

        <p className="text-sm text-foreground whitespace-pre-line leading-relaxed">
          {property.description}
        </p>

        {/*//TODO: use yet lib*/}
        <div className="relative mt-3 -mx-4 rounded-[8px] flex items-center justify-center overflow-hidden">
          {property.thumbnail ? (
            <img
              src={property.thumbnail}
              alt="Property"
              className="object-cover w-full h-full transition-transform duration-500"
            />
          ) : (
            <div className="text-muted-foreground text-xs">لا توجد صور متوفرة</div>
          )}
          {property.gallery.length > 0 && (
            <div className="absolute bottom-3 right-3 bg-black/60 text-white px-2 py-1 rounded-md text-xs">
              +{property.gallery.length} صور
            </div>
          )}
        </div>
      </CardContent>

      {/*//& Social Stats */}
        <div className="px-4 py-2 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <div className="bg-primary p-1 rounded-full">
              <Rocket className="h-3 w-3 text-primary-foreground" fill="currentColor" />
            </div>
            <span>{property.stats.likes}</span>
          </div>
          <div className="flex gap-3">
            <span>{property.stats.comments} تعليق</span>
            <span>{property.area_m2} م²</span>
          </div>
        </div>

        <div className="px-4">
          <Separator className="bg-border" />
        </div>

      {/*//& Footer: Actions */}
        <CardFooter className="p-1 flex items-center justify-between">
          {/* //TODO: centerlize the repeated styles using tailwind plugin */}
          <Button onClick={toggleLike} variant="ghost" className="flex-1 gap-2 text-muted-foreground hover:text-primary transition-colors">
            <Rocket className={`h-5 w-5 ${isLiked ? 'fill-current animate-bounce' : ''}`}  />
            <span className="font-medium">
              {isLiked ? 'تم الإعجاب' : 'أعجبني'} 
              <span className="ml-1 text-xs">({count})</span>
            </span>
          </Button>

          {/*//& comments area */}
          <CommentsModal propertyId={property.id}/>

          <Button variant="ghost" className="flex-1 gap-2 text-muted-foreground transition-colors">
            <Link className='flex flex-row gap-2' href={route('properties.show', {id:property.uuid})}>
              <ChartNoAxesCombined className="h-5 w-5" />
              <span className="font-medium">استعلام</span>
            </Link>
          </Button>
        </CardFooter>

    </Card>
  )
}

export default PropertyPost
