import { RecursiveKeyValuePair, ResolvableTo } from 'tailwindcss/types/config'

import twConfig from '@root/tailwind.config.js'

export const twColor = (color: string) =>
  twConfig?.theme?.colors![color as keyof ResolvableTo<RecursiveKeyValuePair<string, string>>]
