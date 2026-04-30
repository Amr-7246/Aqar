/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { spacing, borders, typography, buttons } from '@/constants/globalStyles';

interface DroplistContainerProps {
  categories: { name: string; description: string }[];
  countries: string[];
  governments: string[];
  cities: string[];
  attributeValue: Record<string, string[]>;
  onDataChange?: (data: any) => void;
}

interface SelectedAttribute {
  key: string;
  value: string;
}

export default function DroplistContainer({
  categories,
  countries,
  governments,
  cities,
  attributeValue,
  onDataChange
}: DroplistContainerProps) {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedGovernment, setSelectedGovernment] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedAttributes, setSelectedAttributes] = useState<SelectedAttribute[]>([]);
  const [searchAttribute, setSearchAttribute] = useState('');
  const [newAttributeKey, setNewAttributeKey] = useState('');
  const [newAttributeValue, setNewAttributeValue] = useState('');

  //TODO: review that logic
  //~ Filter attributes based on search 
    const filteredAttributes = useMemo(() => {
      if (!searchAttribute) return Object.keys(attributeValue);
      return Object.keys(attributeValue).filter(key =>
        key.toLowerCase().includes(searchAttribute.toLowerCase())
      );
    }, [attributeValue, searchAttribute]);

    const handleAddAttribute = (attributeKey: string) => {
      if (selectedAttributes.some(attr => attr.key === attributeKey)) return;
      
      const possibleValues = attributeValue[attributeKey];
      if (possibleValues && possibleValues.length > 0) {
        setSelectedAttributes([...selectedAttributes, { key: attributeKey, value: possibleValues[0] }]);
      } else {
        setSelectedAttributes([...selectedAttributes, { key: attributeKey, value: '' }]);
      }
      setSearchAttribute('');
    };

    const handleAddCustomAttribute = () => {
      if (newAttributeKey && newAttributeValue) {
        setSelectedAttributes([...selectedAttributes, { key: newAttributeKey, value: newAttributeValue }]);
        setNewAttributeKey('');
        setNewAttributeValue('');
      }
    };

    const handleUpdateAttributeValue = (index: number, value: string) => {
      const updated = [...selectedAttributes];
      updated[index].value = value;
      setSelectedAttributes(updated);
      onDataChange?.({ selectedAttributes: updated });
    };

    const handleRemoveAttribute = (index: number) => {
      setSelectedAttributes(selectedAttributes.filter((_, i) => i !== index));
    };

  //~ Form data change handler
    const handleLocationChange = (type: string, value: string) => {
      const locationData = {
        country: type === 'country' ? value : selectedCountry,
        government: type === 'government' ? value : selectedGovernment,
        city: type === 'city' ? value : selectedCity,
      };
      onDataChange?.({ location: locationData });
    };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className={`${spacing.container} ${borders.card} bg-card shadow-sm hover:shadow-md transition-shadow`}
    >
      <h2 className={`${typography.subheading} ${spacing.element}`}>
        {t('create.detailsSection')}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/*//& Category Selection */}
          <div>
            <label className={`${typography.label} block mb-2`}>
              {t('create.selectCategory')}
            </label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className={borders.input}>
                <SelectValue placeholder={t('create.selectCategory')} />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.name} value={category.name}>
                    <div>
                      <div>{category.name}</div>
                      <div className="text-xs text-muted-foreground">{category.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

        {/*//& Location Fields */}
          <div className="space-y-4">
            <div>
              <label className={`${typography.label} block mb-2`}>
                {t('create.country')}
              </label>
              <Select value={selectedCountry} onValueChange={(v) => {
                setSelectedCountry(v);
                handleLocationChange('country', v);
              }}>
                <SelectTrigger className={borders.input}>
                  <SelectValue placeholder={t('create.country')} />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>{country}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className={`${typography.label} block mb-2`}>
                {t('create.government')}
              </label>
              <Select value={selectedGovernment} onValueChange={(v) => {
                setSelectedGovernment(v);
                handleLocationChange('government', v);
              }}>
                <SelectTrigger className={borders.input}>
                  <SelectValue placeholder={t('create.government')} />
                </SelectTrigger>
                <SelectContent>
                  {governments.map((gov) => (
                    <SelectItem key={gov} value={gov}>{gov}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className={`${typography.label} block mb-2`}>
                {t('create.city')}
              </label>
              <Select value={selectedCity} onValueChange={(v) => {
                setSelectedCity(v);
                handleLocationChange('city', v);
              }}>
                <SelectTrigger className={borders.input}>
                  <SelectValue placeholder={t('create.city')} />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
      </div>

      {/* Attributes Section */}
      <div className="mt-6">
        <label className={`${typography.label} block mb-2`}>
          {t('create.attributes')}
        </label>
        
        {/*//& Search/Create Attribute */}
          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={searchAttribute}
                onChange={(e) => setSearchAttribute(e.target.value)}
                placeholder={t('create.searchAttributes')}
                className={`${borders.input} pl-9`}
              />
              <AnimatePresence>
                {searchAttribute && filteredAttributes.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute z-10 w-full mt-1 bg-card border border-border rounded-md shadow-lg max-h-48 overflow-y-auto"
                  >
                    {filteredAttributes.map((attr) => (
                      <button
                        key={attr}
                        onClick={() => handleAddAttribute(attr)}
                        className="w-full text-left px-3 py-2 hover:bg-accent transition-colors"
                      >
                        {attr}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        {/*//& Add Custom Attribute */}
          <div className="flex gap-2 mb-4">
            <Input
              value={newAttributeKey}
              onChange={(e) => setNewAttributeKey(e.target.value)}
              placeholder={t('create.addAttribute')}
              className={`${borders.input} flex-1`}
            />
            <Input
              value={newAttributeValue}
              onChange={(e) => setNewAttributeValue(e.target.value)}
              placeholder={t('create.attributeValue')}
              className={`${borders.input} flex-1`}
            />
            <Button
              onClick={handleAddCustomAttribute}
              disabled={!newAttributeKey || !newAttributeValue}
              className={buttons.primary}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

        {/*//& Selected Attributes */}
          <div className="space-y-2">
            <AnimatePresence>
              {selectedAttributes.map((attr, index) => (
                <motion.div
                  key={`${attr.key}-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg"
                >
                  <Badge variant="secondary" className="px-2 py-1">
                    {attr.key}
                  </Badge>
                  {attributeValue[attr.key] ? (
                    <Select
                      value={attr.value}
                      onValueChange={(v) => handleUpdateAttributeValue(index, v)}
                    >
                      <SelectTrigger className={`${borders.input} flex-1`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {attributeValue[attr.key].map((val) => (
                          <SelectItem key={val} value={val}>{val}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      value={attr.value}
                      onChange={(e) => handleUpdateAttributeValue(index, e.target.value)}
                      className={`${borders.input} flex-1`}
                      placeholder={t('create.attributeValue')}
                    />
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveAttribute(index)}
                    className={buttons.ghost}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
      </div>
    </motion.div>
  );
}