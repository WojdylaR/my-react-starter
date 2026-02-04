import type { IconType } from 'react-icons'

export interface INavigation {
    label: string
    path: string
    logo: IconType
    children?: Array<{
        label: string
        path: string
    }>
}