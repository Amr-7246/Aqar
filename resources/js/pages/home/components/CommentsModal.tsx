/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode, useEffect, useState } from 'react'
import { Comment } from '@/pages/property/type'
import { Button } from '@/components/ui/button'
import { DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose, Drawer, DrawerTrigger } from '@/components/ui/drawer'
import { SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose, Sheet, SheetTrigger } from '@/components/ui/sheet'
import { useIsMobile } from '@/hooks/use-mobile'
import { MessageCircle, SendHorizontal } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { useInitials } from '@/hooks/use-initials'
import { ScrollArea } from '@/components/ui/scroll-area'
import { router, useForm } from '@inertiajs/react'
import { route } from 'ziggy-js'
import { Input } from '@/components/ui/input'
import toast from 'react-hot-toast'

const CommentsModal = ({propertyId}: {propertyId:number}) => {
  const isMobile : boolean = useIsMobile()
  const [localComments, setLocalComments] = useState<Comment[]|[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data, setData, post, processing, reset, errors } = useForm({
    body: '',
  });
  useEffect(() => {
    router.reload({
      data: { propertyId: propertyId }, 
      only: ['propertyComments'], 
      onSuccess: (page: any) => {
        setLocalComments(page.props.data.propertyComments);
        setIsLoading(false);
      },
    })
  }, [propertyId])
  

  const modalTitle="التعليقات"
  const modalClose="اغلاق"
  const modalContent = isLoading ? <p>loading ....</p> : localComments.length < 1 ? <p>كن اول من يعلق ....</p> : <ModalContent comments={localComments} />

  //& collect comment data

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const backupComments = [...localComments];

    post(route('comments.store', propertyId), {
      only: ['properties'], //! to do not return all data again, just update the props 
      preserveScroll: true ,//! to prevent the jump up 
      onStart: () => {
        //& Add "Fake" comment immediately for true instant feel
        const temporaryComment = {
          id: Date.now(),
          text: data.body,
          userName: 'أنت',
          date: 'الآن',
          isSending: true 
        };
        setLocalComments((prev: any) => [...prev, temporaryComment]);
      },
      onSuccess: (page:any) => {
        reset('body');
        setLocalComments(page.props.data.propertyComments);
      },
      onError: () => {
        setLocalComments(backupComments);
        toast.error(errors.body??'حدث خطاء اثناء اضافة التعليق')
      }
    });
  };

  //& the form UI
  const commentForm = () => {
    return(
      <div className="border-t p-4 bg-background">
        <form onSubmit={submit} className="flex gap-2">
          <Input 
            placeholder="اكتب تعليقاً..." 
            value={data.body}
            onChange={e => setData('body', e.target.value)}
            disabled={processing}
          />
          <Button type="submit" size="icon" disabled={!data.body || processing}>
            <SendHorizontal className="h-4 w-4" />
          </Button>
        </form>
      </div>
    )
  }
  //& the trigger btn
  const TriggerButton = (
    <Button variant="ghost" className="flex-1 gap-2">
      <MessageCircle /> <span>تعليق</span>
    </Button>
  );
  //& mobile modal
  if (isMobile) {
    return (
      <Drawer >
        <DrawerTrigger asChild>{TriggerButton}</DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>{modalTitle}</DrawerTitle>
              <DrawerDescription></DrawerDescription>
            </DrawerHeader>

            {modalContent}

            <DrawerFooter>
              {commentForm()}
              <DrawerClose asChild>
                <Button variant="outline">{modalClose}</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    )
  }
  //& Disktop modal
  return (
    <Sheet>
      <SheetTrigger asChild>{TriggerButton}</SheetTrigger>
      <SheetContent>

        <SheetHeader>
          <SheetTitle>{modalTitle}</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>

        {modalContent}
        <SheetFooter>
          {commentForm()}
          <SheetClose asChild>
            <Button variant="outline">{modalClose}</Button>
          </SheetClose>
        </SheetFooter>

      </SheetContent>
    </Sheet>
  )
}

export default CommentsModal

const ModalContent = ({comments}: {comments:Comment[]}) : ReactNode => {
  const getInitials = useInitials(); //! to ad an image placeholder "AE"
  return (
  <>
  {/*//& show comments */}
    <ScrollArea className="h-[400px] pr-4"> 
      <div className="space-y-4">
        {comments.map((com, index) => (
          <div key={com.id} className="space-y-3">
            <div className="flex items-start gap-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src={com.userAvatar} alt={com.userName} />
                <AvatarFallback>{getInitials(com.userName)}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">{com.userName}</span>
                  <span className="text-xs text-muted-foreground">{com.date}</span>
                </div>
                <p className="text-sm text-foreground leading-relaxed">
                  {com.text}
                </p>
              </div>
            </div>
            {/* we don't show separator after the last item */}
            {index < comments.length - 1 && <Separator className="opacity-50" />}
          </div>
        ))}
      </div>
    </ScrollArea>
  </>
  )
}
