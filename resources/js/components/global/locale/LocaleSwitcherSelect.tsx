'use client';

import { useState, useTransition } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useParams } from 'next/navigation';
import { IoLanguage } from "react-icons/io5";
import { motion, AnimatePresence } from 'framer-motion';
import { Locale } from 'next-intl';
import clsx from 'clsx';

type Props = {
  defaultValue: string;
  label: string;
  children: React.ReactNode;
};

export default function LocaleSwitcherSelect({ defaultValue, label, children }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  // custom dropdown states
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue);

  const handleSelect = (nextLocale: Locale) => {
    setSelected(nextLocale);
    setIsOpen(false);
    startTransition(() => {
      router.replace(
        // @ts-expect-error: validated at build time
        { pathname, params },
        { locale: nextLocale }
      );
    });
  };

  // Convert <option> elements into clickable items
  const options = Array.isArray(children)
    ? children.map((child: any) => ({
        value: child.props.value,
        label: child.props.children
      }))
    : [];

  return (
    <div className="relative inline-flex flex-col items-start text-white">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        disabled={isPending}
        className={clsx(
          'flex-center cursor-pointer gap-2 hover:border-main border border-transparent duration-500 transition-colors px-4 py-2 rounded-lg min-w-[100px]',
          'text-base font-medium focus:outline-none',
          isPending && 'opacity-60 cursor-wait'
        )}
      >
        <IoLanguage className="text-xl" />
        <span>{selected.toUpperCase()}</span>
      </button>

      {/* Dropdown animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute top-[115%] left-0 w-full bg-sky-700/90 backdrop-blur-md shadow-lg rounded-xl overflow-hidden z-50"
          >
            {options.map(({ value, label }) => (
              <li
                key={value}
                onClick={() => handleSelect(value as Locale)}
                className={clsx(
                  'px-4 py-2 cursor-pointer text-sm hover:bg-sky-600 transition-all',
                  value === selected && 'bg-sky-800 font-semibold'
                )}
              >
                {label}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
