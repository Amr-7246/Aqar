import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { borders, buttons, spacing, typography } from '@/constants/globalStyles';
import { SharedProps } from '@/pages/types';
import { usePage } from '@inertiajs/react'
import { Video, MapPin, AtSign, Bold, Italic, List, Smile, Send} from 'lucide-react';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';

interface MainContainerProps {
  value?: string;
  onChange?: (value: string) => void;
}

const toolbarButtons = [
  { icon: Image,  labelKey: 'attachImage', color: 'text-blue-500' },
  { icon: Video,  labelKey: 'attachVideo', color: 'text-red-500' },
  { icon: MapPin,  labelKey: 'addLocation', color: 'text-green-500' },
  { icon: AtSign,  labelKey: 'mention', color: 'text-purple-500' },
  { icon: Bold,  labelKey: 'formatBold', color: 'text-gray-600' },
  { icon: Italic,  labelKey: 'formatItalic', color: 'text-gray-600' },
  { icon: List,  labelKey: 'formatList', color: 'text-gray-600' },
  { icon: Smile,  labelKey: 'emoji', color: 'text-yellow-500' },
];

const MainContainer = ({ onChange }: MainContainerProps) => {
  const { auth } = usePage<SharedProps>().props;
  const [description, setDescription] = useState('')
  const { t } = useTranslation(); //TODO: handle the translation

  //& set description
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => { //? who ingect the e at the function 
    const newValue = e.target.value;
    setDescription(newValue);
    onChange?.(newValue);
  };
  //& tool action logic
    const handleToolbarAction = (labelKey:string) => {
      console.log(labelKey)
      //TODO:handle that logic
    }

  if (!auth.user?.name) {
      return <p>Please log in.</p>;
  }
  return (
    <div>
      {/*//& header name + photo */}
        <div className='flex justify-between'>
          <h2 className={`${typography.subheading} ${spacing.element} flex items-center gap-2`}>
            {t('create.mainSection')}
          </h2>
          <div>
            <img src={auth.user.avatar} alt="avatar" /> //TODO: but a default value
          </div>
        </div>
      {/*//& textarea which is hold the property description */}
        <div>
          <div className="relative">
            <label className={`${typography.label} block mb-2`}>
              {t('create.descriptionLabel')}
            </label>
            <Textarea
              value={description}
              onChange={handleDescriptionChange}
              placeholder={t('create.descriptionPlaceholder')}
              className={`${borders.input} min-h-[200px] resize-y focus:outline-none transition-all duration-200`}
            />
            <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
              {description.length} characters
            </div>
          </div>
          {/* //TODO: render the mensiened user */}
            <div></div>
        </div>
      {/*//& a tool bar with some colored icons which offer functienlities like attaching image/video/location, menshion some one and so on*/}
        <div>
          <div className="flex flex-wrap gap-2 mb-4 p-2 bg-muted/30 rounded-lg">
            {toolbarButtons.map(({ labelKey, color }) => (
              <Button
                key={labelKey}
                variant="ghost"
                size="sm"
                onClick={() => handleToolbarAction(labelKey)}
                className={`${buttons.ghost} ${color} hover:bg-accent/50 transition-all duration-200`}
                title={t(`create.toolbar.${labelKey}`)}
              >
                <Send className="w-4 h-4" />
              </Button>
            ))}
          </div>
          {/* //~ render the uploded assets */}
            <div>
            </div>
        </div>
    </div>
  )
}

export default MainContainer