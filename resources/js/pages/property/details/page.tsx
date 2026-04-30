/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Head } from '@inertiajs/react';
import { ShowPropertyResponse } from "../type";
import AssetsArea from "./components/AssetsArea";
import PropDetails from "./components/PropDetails";
import PropFooter from "./components/PropFooter";
import { motion } from 'framer-motion';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface Props extends ShowPropertyResponse {}

export default function Page({ data }: Props) {
  console.log('== DEBUG ==')
  console.log(data)
  const { propertyDetails, similarProperties, isFavorited: initialFavorited } = data;
  const [isFavorited, setIsFavorited] = useState(initialFavorited);
  const [comments, setComments] = useState(propertyDetails.comments);

  const handleFavoriteToggle = async () => {
    try {
      // API call to toggle favorite
      setIsFavorited(!isFavorited);
      toast.success(isFavorited ? 'Removed from favorites' : 'Added to favorites');
    } catch (error) {
      console.log(error)
      toast.error('Failed to update favorites');
      setIsFavorited(initialFavorited);
    }
  };

  const handleAddComment = async (commentText: string) => {
    try {
      // API call to add comment
      const newComment = {
        id: Date.now(),
        userName: 'Current User',
        userAvatar: '',
        text: commentText,
        date: new Date().toISOString(),
      };
      setComments([newComment, ...comments]);
      toast.success('Comment added successfully');
    } catch (error) {
      console.log(error)
      toast.error('Failed to add comment');
    }
  };

  // Schema.org structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": propertyDetails.title,
    "description": propertyDetails.description,
    "price": propertyDetails.price,
    "priceCurrency": propertyDetails.currency === 'EG' ? 'EGP' : 'USD',
    "area": {
      "@type": "QuantitativeValue",
      "value": propertyDetails.area_m2,
      "unitCode": "MTK"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": propertyDetails.location.city,
      "addressRegion": propertyDetails.location.government,
      "addressCountry": propertyDetails.location.country
    }
  };

  return (
    <>
      {/* <Head>
        <title>{propertyDetails.title || 'Property Details'} | Real Estate</title>
        <meta name="description" content={propertyDetails.description.substring(0, 160)} />
        
        {/* Open Graph / Social Media Meta Tags 
        <meta property="og:title" content={propertyDetails.title || 'Property Details'} />
        <meta property="og:description" content={propertyDetails.description.substring(0, 160)} />
        <meta property="og:image" content={propertyDetails.thumbnail} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={propertyDetails.title || 'Property Details'} />
        <meta name="twitter:description" content={propertyDetails.description.substring(0, 160)} />
        <meta name="twitter:image" content={propertyDetails.thumbnail} />
        
        {/* Structured Data
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </Head> */}

      <div className="min-h-screen bg-background">
        {/* Breadcrumbs */}
        <div className="bg-muted/30 py-3 border-b">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <a href="/" className="hover:text-primary transition-colors">Home</a>
              <span>/</span>
              <a href="/properties" className="hover:text-primary transition-colors">Properties</a>
              <span>/</span>
              <span className="text-foreground">{propertyDetails.title || 'Property'}</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto py-8 space-y-8">
          {/* Assets Area */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <AssetsArea
              images={propertyDetails.gallery}
              videos={propertyDetails.videos}
              title={propertyDetails.title}
            />
          </motion.div>

          {/* Property Details with Sticky Sidebar */}
          <PropDetails
            property={propertyDetails}
            isFavorited={isFavorited}
            onFavoriteToggle={handleFavoriteToggle}
          />

          {/* Comments and Similar Properties */}
          <PropFooter
            comments={comments}
            similarProperties={similarProperties}
            onAddComment={handleAddComment}
          />
        </div>
      </div>

      {/* Add custom styles for lightbox */}
      <style >{`
        .lightbox-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0, 0, 0, 0.7);
          padding: 0.75rem;
          border-radius: 9999px;
          color: white;
          transition: all 0.2s;
        }
        .lightbox-button:hover {
          background: rgba(0, 0, 0, 0.9);
          transform: translateY(-50%) scale(1.1);
        }
        .lightbox-button:first-of-type {
          left: 1rem;
        }
        .lightbox-button:last-of-type {
          right: 1rem;
        }
      `}</style>
    </>
  );
}