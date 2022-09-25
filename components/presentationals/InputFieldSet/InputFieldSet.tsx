import React, { ReactNode } from 'react';

interface Props {
  labelContent: ReactNode;
  name: string;
  type?: 'text' | 'email' | 'password';
  isRequired?: boolean;
  isDisabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  placeholder?: string;
  validationMessageContent?: ReactNode;
}

function InputFieldSet({
  labelContent,
  name,
  type = 'text',
  isRequired = false,
  isDisabled = false,
  onChange,
  placeholder,
  value,
  validationMessageContent,
}: Props) {
  return (
    <fieldset className="space-y-3">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {labelContent}
      </label>
      <input
        value={value}
        onChange={onChange}
        type={type}
        name={name}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500 transition duration-200"
        required={isRequired}
        disabled={isDisabled}
        placeholder={placeholder}
      />
      {validationMessageContent && (
        <p className="text-sm text-red-500">{validationMessageContent}</p>
      )}
    </fieldset>
  );
}

export default InputFieldSet;
