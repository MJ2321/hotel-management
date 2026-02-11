import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(value: Date): string
export function formatDate(value: string): string
export function formatDate(value: Date | string): string {
  const date = typeof value === 'string' ? new Date(value) : value
  return isNaN(date.getTime()) ? '' : date.toLocaleDateString()
}
