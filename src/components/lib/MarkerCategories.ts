import { Landmark, Leaf, LocateFixed, LucideIcon, PersonStanding, Pyramid, Theater } from 'lucide-react'
import { FunctionComponent } from 'react'
import colors from 'tailwindcss/colors'

export enum Category {
  LOCATE = 0,
  CAT1 = 1,
  CAT2 = 2,
  CAT3 = 3,
  CAT4 = 4,
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
    icon: Landmark,
    color: colors.red[400],
  },
  [Category.CAT3]: {
    name: 'Category 3',
    icon: Pyramid,
    color: colors.yellow[400],
  },
  [Category.CAT4]: {
    name: 'Category 4',
    icon: Theater,
    color: colors.purple[400],
  },
}

export default MarkerCategories
