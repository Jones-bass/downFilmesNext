import { IconBaseProps } from 'react-icons'
import { ReactNode } from 'react'

interface ButtonProps {
  title: string
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  type?: string
  icon?: React.ComponentType<IconBaseProps>
  onClick?: () => void
  children?: ReactNode
}

export function Button({
  title,
  icon: Icon,
  children,
  onClick,
  size = 'medium',
}: ButtonProps) {
  const sizeClasses = {
    small: 'w-20 h-8 text-xs',
    medium: 'w-36 h-12 text-sm',
    large: 'w-full h-14 text-base',
  }

  return (
    <button
      className={`flex items-center justify-center gap-2 bg-blue-500 text-white rounded-md transition hover:bg-blue-600 ${sizeClasses[size]}`}
      onClick={onClick}
    >
      {Icon && <Icon size={22} />}
      {children || title}
    </button>
  )
}
