
import type { INavigation } from '../navigationInterfaces'
import { NavLink } from 'react-router-dom'
import useActivePage from '../hook/useActivePage'
import { navigationPath } from '../navigationConstants'



function NavigationCard({navigation}: {navigation: INavigation}) {
    
    const Icon = navigation.logo

    const isActive = useActivePage()

    return (
        <div className='navigation-card'>
                
                    <NavLink to={navigation.children ? navigation.children[0].path : navigation.path} className={'item'}>
                        
                        <div className={`path ${isActive(navigation.path) && 'active-parent'}`}>
                            <Icon />
                                {navigation.label}
                                
                        </div>
                    </NavLink>
                {navigation.children && <div className='plus'>+</div>}

            {navigation.children && navigation.children.map((children) => 
            <div key={children.path} className='children-path'>
                <NavLink className={`path item ${isActive(children.path) && 'active-children'}`} to={children.path}>{children.label}</NavLink>
            
            </div>
            )}
        </div>
    )
}

function NavigationLink() {

    return (
        <nav className='navigation-list'>
            {navigationPath.map((navigation, index) => <NavigationCard key={index} navigation={navigation} />)}
        </nav>
    )
}

export default NavigationLink