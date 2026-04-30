import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  MapPin,
  Ruler,
  Home,
  DollarSign,
  Calendar,
  Eye,
  Heart,
  MessageCircle,
  Phone,
  Mail,
  Share2,
  Star,
  Send,
  Clock
} from 'lucide-react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { Property } from '../../type';
import { typography, borders, buttons } from '@/constants/globalStyles';

interface PropDetailsProps {
  property: Property;
  isFavorited: boolean;
  onFavoriteToggle: () => void;
}

export default function PropDetails({ property, isFavorited }: PropDetailsProps) {
  const { t } = useTranslation();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [inquiryMessage, setInquiryMessage] = useState('');

  const handleShare = async () => {
    try {
      await navigator.share({
        title: property.title || 'Property',
        text: property.description,
        url: window.location.href,
      });
    } catch (error) {
      console.log(error)
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const handleSendInquiry = () => {
    if (inquiryMessage.trim()) {
      // Handle inquiry submission
      toast.success('Inquiry sent successfully!');
      setInquiryMessage('');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        {/* Title and Basic Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h1 className={`${typography.heading} text-3xl lg:text-4xl`}>
            {property.title || 'Property Details'}
          </h1>
          
          <div className="flex flex-wrap gap-4 text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">
                {property.location.city}, {property.location.government}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">
                {format(new Date(property.created_at), 'PPP')}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span className="text-sm">{property.views} {t('property.show.views')}</span>
            </div>
          </div>
        </motion.div>

        {/* Key Details Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <div className="p-4 bg-muted/30 rounded-lg">
            <DollarSign className="w-5 h-5 text-primary mb-2" />
            <p className={`${typography.caption} text-muted-foreground`}>{t('property.show.price')}</p>
            <p className={`${typography.body} font-semibold`}>
              {property.price.toLocaleString()} {property.currency === 'EG' ? 'EGP' : '$'}
            </p>
          </div>
          
          <div className="p-4 bg-muted/30 rounded-lg">
            <Ruler className="w-5 h-5 text-primary mb-2" />
            <p className={`${typography.caption} text-muted-foreground`}>{t('property.show.area')}</p>
            <p className={`${typography.body} font-semibold`}>
              {property.area_m2 ? `${property.area_m2} m²` : 'N/A'}
            </p>
          </div>
          
          <div className="p-4 bg-muted/30 rounded-lg">
            <Home className="w-5 h-5 text-primary mb-2" />
            <p className={`${typography.caption} text-muted-foreground`}>{t('property.show.purpose')}</p>
            <p className={`${typography.body} font-semibold capitalize`}>
              {property.purpose}
            </p>
          </div>
          
          <div className="p-4 bg-muted/30 rounded-lg">
            <Star className="w-5 h-5 text-primary mb-2" />
            <p className={`${typography.caption} text-muted-foreground`}>{t('property.show.category')}</p>
            <p className={`${typography.body} font-semibold`}>
              {property.category}
            </p>
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose prose-sm max-w-none"
        >
          <h2 className={typography.subheading}>{t('property.show.description')}</h2>
          <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
            {property.description}
          </p>
        </motion.div>

        {/* Location Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-2"
        >
          <h2 className={typography.subheading}>{t('property.show.location')}</h2>
          <div className="p-4 bg-muted/30 rounded-lg space-y-2">
            <p><strong>Country:</strong> {property.location.country}</p>
            <p><strong>Government:</strong> {property.location.government}</p>
            <p><strong>City:</strong> {property.location.city}</p>
            <p><strong>Address:</strong> {property.location.address}</p>
          </div>
        </motion.div>
      </div>

      {/* Sticky Sidebar */}
      <div className="lg:col-span-1">
        <div className="sticky top-24 space-y-6">
          {/* Price/Booking Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`${borders.card} p-6 bg-card shadow-lg`}
          >
            <div className="space-y-4">
              <div>
                <p className={`${typography.caption} text-muted-foreground`}>{t('property.show.price')}</p>
                <p className={`${typography.heading} text-3xl text-primary`}>
                  {property.price.toLocaleString()} {property.currency === 'EG' ? 'EGP' : '$'}
                </p>
                {property.purpose === 'rent' && <p className="text-sm text-muted-foreground">per month</p>}
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => setIsBookingModalOpen(true)}
                  className={`${buttons.primary} w-full flex items-center justify-center gap-2`}
                >
                  <Calendar className="w-4 h-4" />
                  {t('property.show.booking')}
                </button>
                
                <button
                  onClick={handleShare}
                  className={`${buttons.outline} w-full flex items-center justify-center gap-2`}
                >
                  <Share2 className="w-4 h-4" />
                  {t('property.show.share')}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Contact Agent Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className={`${borders.card} p-6 bg-card`}
          >
            <h3 className={`${typography.subheading} text-lg mb-4`}>
              {t('property.show.broker')}
            </h3>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-muted">
                {property.brokerImage ? (
                  <img src={property.brokerImage} alt={property.brokerName} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary/10">
                    <Home className="w-8 h-8 text-primary" />
                  </div>
                )}
              </div>
              <div>
                <p className={`${typography.body} font-semibold`}>{property.brokerName}</p>
                <p className={typography.caption}>Licensed Real Estate Agent</p>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => window.location.href = `tel:${property.brokerId}`}
                className={`${buttons.secondary} w-full flex items-center justify-center gap-2`}
              >
                <Phone className="w-4 h-4" />
                {t('property.show.callNow')}
              </button>
              
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className={`${buttons.outline} w-full flex items-center justify-center gap-2`}
              >
                <Mail className="w-4 h-4" />
                {t('property.show.sendMessage')}
              </button>
            </div>
          </motion.div>

          {/* Statistics Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-around p-4 bg-muted/30 rounded-lg"
          >
            <div className="text-center">
              <Heart className={`w-5 h-5 mx-auto mb-1 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
              <p className={typography.caption}>{property.likes}</p>
            </div>
            <div className="text-center">
              <MessageCircle className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
              <p className={typography.caption}>{property.commentsCount}</p>
            </div>
            <div className="text-center">
              <Clock className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
              <p className={typography.caption}>{property.inquiriesCount}</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Booking Modal */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-xl shadow-xl max-w-md w-full p-6"
          >
            <h3 className={`${typography.heading} text-xl mb-4`}>Book an Appointment</h3>
            <textarea
              value={inquiryMessage}
              onChange={(e) => setInquiryMessage(e.target.value)}
              placeholder="Your message..."
              className={`${borders.input} w-full p-3 mb-4 min-h-[100px]`}
            />
            <div className="flex gap-3">
              <button onClick={handleSendInquiry} className={`${buttons.primary} flex-1`}>
                <Send className="w-4 h-4 inline mr-2" />
                Send Request
              </button>
              <button onClick={() => setIsBookingModalOpen(false)} className={`${buttons.outline} flex-1`}>
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}