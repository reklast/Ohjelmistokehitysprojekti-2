import { Leaf, LocateFixed, LucideIcon, PersonStanding } from 'lucide-react'
import { FunctionComponent } from 'react'
import colors from 'tailwindcss/colors'

export enum Category {
  LOCATE = 0,
  CAT1 = 1,
  CAT2 = 2,
}

export interface MarkerCategoriesValues {
  // category: any
  // position: number[]
  name: string
  icon: LucideIcon
  color: string
  hideInMenu?: boolean
}

export type MarkerCategoryType = {
  [key in Category]: MarkerCategoriesValues
}

const MarkerCategories: MarkerCategoryType = {
  [Category.LOCATE]: {
    name: 'User Location',
    icon: LocateFixed,
    color: colors.green[400],
    hideInMenu: false,
  },
  [Category.CAT1]: {
    name: 'Category 1',
    icon: Leaf,
    color: colors.blue[200],
  },
  [Category.CAT2]: {
    name: 'Category 2',
    icon: PersonStanding,
    color: colors.red[400],
  },
}

export default MarkerCategories
