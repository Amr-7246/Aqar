import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Heart, Send, Star, ChevronRight } from 'lucide-react';
import { PropertyCard, Comment } from '../../type';
import { spacing, typography, borders, buttons } from '@/constants/globalStyles';

interface PropFooterProps {
  comments: Comment[];
  similarProperties: PropertyCard[];
  onAddComment: (comment: string) => void;
}

export default function PropFooter({ comments, similarProperties, onAddComment }: PropFooterProps) {
  const { t } = useTranslation();
  const [newComment, setNewComment] = useState('');
  const [visibleComments, setVisibleComments] = useState(5);

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  const loadMoreComments = () => {
    setVisibleComments(prev => prev + 5);
  };

  return (
    <div className="mt-12 space-y-12">
      {/* Comments Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={spacing.container}
      >
        <div className="flex items-center gap-2 mb-6">
          <MessageCircle className="w-6 h-6 text-primary" />
          <h2 className={typography.heading}>
            {t('property.show.comments')} ({comments.length})
          </h2>
        </div>

        {/* Add Comment */}
        <div className={`${borders.card} p-4 mb-6`}>
          <div className="flex gap-3">
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder={t('property.show.yourComment')}
                className={`${borders.input} w-full p-3 resize-none`}
                rows={3}
              />
            </div>
            <button
              onClick={handleSubmitComment}
              disabled={!newComment.trim()}
              className={`${buttons.primary} self-start flex items-center gap-2`}
            >
              <Send className="w-4 h-4" />
              {t('property.show.postComment')}
            </button>
          </div>
        </div>

        {/* Comments List */}
        <AnimatePresence>
          <div className="space-y-4">
            {comments.slice(0, visibleComments).map((comment, idx) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`${borders.card} p-4 hover:shadow-md transition-shadow`}
              >
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-muted flex-shrink-0">
                    {comment.userAvatar ? (
                      <img src={comment.userAvatar} alt={comment.userName} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-primary/10">
                        <span className="text-primary font-semibold">
                          {comment.userName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`${typography.body} font-semibold`}>
                        {comment.userName}
                      </span>
                      <span className={typography.caption}>
                        {/* {formatDistanceToNow(new Date(comment.date), { addSuffix: true })} */}
                        {comment.date}
                      </span>
                    </div>
                    <p className="text-muted-foreground">{comment.text}</p>
                    <button className="text-xs text-primary hover:underline mt-2">
                      Reply
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>

        {/* Load More */}
        {comments.length > visibleComments && (
          <button
            onClick={loadMoreComments}
            className={`${buttons.outline} w-full mt-4 flex items-center justify-center gap-2`}
          >
            {t('property.show.loadMore')}
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </motion.div>

      {/* Similar Properties Section */}
      {similarProperties.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={spacing.container}
        >
          <h2 className={`${typography.heading} mb-6`}>
            {t('property.show.similarProperties')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarProperties.map((property, idx) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className={`${borders.card} overflow-hidden hover:shadow-lg transition-all cursor-pointer group`}
                onClick={() => window.location.href = `/property/${property.uuid}`}
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title || 'Property'}
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute top-2 right-2">
                    <Heart className="w-5 h-5 text-white hover:fill-red-500 transition-colors" />
                  </div>
                </div>
                <div className="p-4">
                  <p className={`${typography.body} font-semibold text-primary mb-1`}>
                    {property.price.toLocaleString()} {property.currency === 'EG' ? 'EGP' : '$'}
                    {property.purpose === 'rent' && <span className="text-sm">/month</span>}
                  </p>
                  <p className={`${typography.bodySmall} text-muted-foreground mb-2`}>
                    {property.title || 'Property'}
                  </p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>4.5</span>
                    <span className="text-xs">(12 reviews)</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}