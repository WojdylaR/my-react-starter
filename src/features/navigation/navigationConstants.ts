import type { INavigation } from './navigationInterfaces'
import { IoHome, IoPhonePortrait  } from "react-icons/io5";


export const navigationPath: Array<INavigation> = [
    {
        label: 'Home',
        path: '/home',
        logo: IoHome
    },
]