import Loading from '@/app/[locale]/components/Loading';
import React from 'react';
import ErrorMessage from './ErrorMessage';

interface Option {
  value: string | number;
  label: string;
}

interface FormElement {
  type: string; // 'text', 'password', 'email', 'select', etc.
  label: string;
  name: string;
  placeholder?: string;
  className?: string;
  options?: Option[]; // only for select boxes
  pending?: boolean,  // only for select boxes
  error?: boolean     // only for select boxes
}

interface FormGeneratorProps {
  formElements: FormElement[];
  formState: Record<string, any>;
  registerPending?: boolean;
  errors?: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const FormGenerator: React.FC<FormGeneratorProps> = ({
  formElements,
  formState,
  registerPending,
  errors,
  handleChange,
  handleSubmit
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 rounded-2xl bg-second shadow-md space-y-3 flex flex-col gap-4 w-[90%] max-w-[500px] mx-auto"
    >
      {formElements.map((field) => (
        <div key={field.name} className="flex flex-col">
          <label className="text-sm font-semibold text-third mb-1">
            {field.label}
          </label>
          {field.type === 'select' ? (
          //& Generate the Select Box if Exist
          //TODO: Build a costume select box instead
            field.pending ? <Loading/> :
            field.error ? <ErrorMessage/> :
              <select
                name={field.name}
                value={formState[field.name] || ''}
                onChange={handleChange}
                className={`border p-2 rounded-lg focus:ring-2 focus:ring-main ${field.className}`}
              >
                <option value="">{field.placeholder}</option>
                {field.options?.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) :
            //& Generate the textArea If exist
            field.type === 'textArea' ? (
              <>
                <textarea 
                  type={field.type}
                  name={field.name}
                  value={formState[field.name] || ''}
                  // @ts-ignore
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className={`textarea ${field.className}`}
                />
              </>
            ): (
            //& Generate the usual form fields
            <>
              <input
                type={field.type}
                name={field.name}
                value={formState[field.name] || ''}
                onChange={handleChange}
                placeholder={field.placeholder}
                className={`border p-2 rounded-lg focus:ring-2 focus:ring-main ${field.className}`}
              />
              {/* //~ Handel errros message */}
                {
                //@ts-ignore
                errors[field as keyof typeof errors] && (
                //@ts-ignore
                  <p className="text-rose-500 text-sm mt-1">{errors[field as keyof typeof errors]}</p>
                )}
            </>
          )}
        </div>
      ))}

      <button
        type="submit"
        className="btn w-full"
      >
        {registerPending? <Loading/> : 'Submit' }
      </button>
    </form>
  );
};

export default FormGenerator;

//& Usage Example

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import FormGenerator from './FormGenerator';

// export default function ArtisanRegister() {
//   const [formState, setFormState] = useState({
//     name: '',
//     email: '',
//     password: '',
//     spesification_id: ''
//   });

//   const [spesifications, setSpesifications] = useState<{ value: number; label: string }[]>([]);

//   useEffect(() => {
//     axios.get('/api/spesifications')
//       .then((res) => {
//         const options = res.data.map((s: any) => ({
//           value: s.id,
//           label: s.name
//         }));
//         setSpesifications(options);
//       })
//       .catch(console.error);
//   }, []);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setFormState({ ...formState, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     console.log('Submitted:', formState);
//     // axios.post('/api/auth/artisan/register', formState)
//   };

//   const formElements = [
//     { type: 'text', label: 'Name', name: 'name', placeholder: 'Enter your name' },
//     { type: 'email', label: 'Email', name: 'email', placeholder: 'Enter your email' },
//     { type: 'password', label: 'Password', name: 'password', placeholder: 'Enter your password' },
//     {
//       type: 'select',
//       label: 'Specialization',
//       name: 'spesification_id',
//       options: spesifications
//     }
//   ];

//   return (
//     <FormGenerator
//       formElements={formElements}
//       formState={formState}
//       handleChange={handleChange}
//       handleSubmit={handleSubmit}
//     />
//   );
// }
