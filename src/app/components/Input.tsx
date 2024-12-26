import React, { InputHTMLAttributes } from 'react'
import { IconBaseProps } from 'react-icons'
import { useFormContext } from 'react-hook-form'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  errorMessage: string
  icon?: React.ComponentType<IconBaseProps>
}

export const Input = ({
  errorMessage,
  name,
  icon: Icon,
  ...rest
}: InputProps) => {
  const { register } = useFormContext()

  return (
    <div className="w-full">
      <div className="flex items-center border border-gray-600 rounded-lg p-4 text-gray-600">
        {Icon && <Icon className="mr-2" size={18} />}
        <input
          {...register(name)}
          {...rest}
          className="flex-1 bg-transparent outline-none text-gray-600 placeholder-gray-400"
        />
      </div>
      {errorMessage && (
        <span className="flex text-sm text-red-600 ml-1">{errorMessage}</span>
      )}
    </div>
  )
}
