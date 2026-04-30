/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { DollarSign, Ruler, Home, RefreshCw, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { spacing, borders, typography, buttons } from '@/constants/globalStyles';

interface RestContainerProps {
  onDataChange?: (data: any) => void;
  initialData?: {
    price: number;
    area_m2: number | null;
    purpose: 'rent' | 'sale';
    currency: 'EG' | 'dolar';
    is_flexable_price: boolean;
    is_active: boolean;
  };
}

export default function RestContainer({ onDataChange, initialData }: RestContainerProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    price: initialData?.price || 0,
    area_m2: initialData?.area_m2 || null,
    purpose: initialData?.purpose || 'sale' as const,
    currency: initialData?.currency || 'EG' as const,
    is_flexable_price: initialData?.is_flexable_price || false,
    is_active: initialData?.is_active || true,
  });

  const handleChange = (field: string, value: any) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onDataChange?.(newData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className={`${spacing.container} ${borders.card} bg-card shadow-sm hover:shadow-md transition-shadow`}
    >
      <h2 className={`${typography.subheading} ${spacing.element}`}>
        {t('create.detailsSection')}
      </h2>

      <div className="space-y-6">
        {/*//& Price and Currency */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Label className={typography.label}>
                <DollarSign className="inline w-4 h-4 mr-1" />
                {t('create.price')}
              </Label>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) => handleChange('price', parseFloat(e.target.value) || 0)}
                className={`${borders.input} mt-1`}
                min={0}
              />
            </div>

            <div>
              <Label className={typography.label}>{t('create.currency')}</Label>
              <RadioGroup
                value={formData.currency}
                onValueChange={(value) => handleChange('currency', value as 'EG' | 'dolar')}
                className="flex gap-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="EG" id="egp" />
                  <Label htmlFor="egp" className="cursor-pointer">{t('create.egp')}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dolar" id="dollar" />
                  <Label htmlFor="dollar" className="cursor-pointer">{t('create.dollar')}</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

        {/*//& Area */}
          <div>
            <Label className={typography.label}>
              <Ruler className="inline w-4 h-4 mr-1" />
              {t('create.area')}
            </Label>
            <Input
              type="number"
              value={formData.area_m2 || ''}
              onChange={(e) => handleChange('area_m2', e.target.value ? parseFloat(e.target.value) : null)}
              className={`${borders.input} mt-1`}
              placeholder={t('common.optional')}
              min={0}
            />
          </div>

        {/*//& Purpose */}
          <div>
            <Label className={typography.label}>
              <Home className="inline w-4 h-4 mr-1" />
              {t('create.purpose')}
            </Label>
            <RadioGroup
              value={formData.purpose}
              onValueChange={(value) => handleChange('purpose', value as 'rent' | 'sale')}
              className="flex gap-4 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="rent" id="rent" />
                <Label htmlFor="rent" className="cursor-pointer">{t('create.rent')}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sale" id="sale" />
                <Label htmlFor="sale" className="cursor-pointer">{t('create.sale')}</Label>
              </div>
            </RadioGroup>
          </div>

        {/*//& Flexible Price Toggle */}
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-muted-foreground" />
              <Label className={`${typography.label} cursor-pointer`}>
                {t('create.flexiblePrice')}
              </Label>
            </div>
            <Switch
              checked={formData.is_flexable_price}
              onCheckedChange={(checked) => handleChange('is_flexable_price', checked)}
            />
          </div>

        {/*//& Active Status Toggle */}
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <Label className={`${typography.label} cursor-pointer`}>
                {t('common.save')} (Active)
              </Label>
            </div>
            <Switch
              checked={formData.is_active}
              onCheckedChange={(checked) => handleChange('is_active', checked)}
            />
          </div>

        {/*//& Action Buttons */}
          <div className="flex gap-4 pt-4 border-t border-border">
            <Button
              className={`${buttons.primary} flex-1`}
              onClick={() => onDataChange?.({ submit: true, data: formData })}
            >
              {t('create.submit')}
            </Button>
            <Button
              variant="outline"
              className={`${buttons.outline} flex-1`}
              onClick={() => onDataChange?.({ cancel: true })}
            >
              {t('create.cancel')}
            </Button>
          </div>
      </div>
    </motion.div>
  );
}