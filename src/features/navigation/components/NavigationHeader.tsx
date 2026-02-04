import { HiOutlineDotsVertical } from "react-icons/hi";
import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useUsersStore } from '../../../stores/userStore';
import { useLogout } from '../../auth/hook/useLogout';

function Dropdown() {

    const logout = useLogout()

    return (
        <div className='dropdown'>
            <NavLink onClick={() => logout()} to={'/login'} className={'item'}>Se déconnecter</NavLink>
        </div>
    )
}

function NavigationHeader() {

    const [open, setOpen] = useState<boolean>(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const { email } = useUsersStore();

    useEffect(() => {

        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false)
            }
        }
        if (open) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }

    }, [open])
    

    return (
        <header className="navigation-header">
            <span>{email.length > 0 ? email :"Utilisateur invité"}</span>
            <div className='button-container' ref={dropdownRef}>
                <button onClick={() => setOpen(true)} className='button'>
                    <HiOutlineDotsVertical size={15}/>
                    {open && <Dropdown />}
                </button>
            </div>
        </header>
    )
}

export default NavigationHeader