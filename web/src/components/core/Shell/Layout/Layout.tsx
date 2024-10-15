import "./layout.scss"
import { Outlet } from "react-router-dom"
import Icon from '../../Icon/Icon'
import { usePageData } from "../Page"


const isDesktopApp = navigator.userAgent.indexOf('Electron') >= 0

export type LayoutTypes = "none" | "minimal" | "nav"

export type SimpleLinkedIcon = {
    icon: string
    page: string
}

export type NavData = Array<SimpleLinkedIcon & {group: string, label: string}>

interface LayoutProps {
    nav?: NavData
}





const EmptyLayout: React.FC<LayoutProps> = ({}) => <><Outlet /></>;

const MinimalLayout: React.FC<LayoutProps> = ({}) => {
    const PageData = usePageData()

    let mobile_action = <Icon name="back" action="back" accent={false}/>
    PageData.cluster.map((action, index) => {
        if (PageData.name === action.name) {
            const next_action = PageData.cluster[index + 1 === PageData.cluster.length? 0: index +1]
            mobile_action = <Icon
                name={next_action.name} 
                accent={false}
                group={PageData.group}
                page={next_action.name}
                action="navigate"
            />
        }
    })

    return <div id="app__layout">
        {isDesktopApp && 
            <header className='flex space-between v-centered pad-hori-10px color-bg-3'>
                {mobile_action}
                <h1 className='color-fg-text font-size-l'>{PageData.title}</h1>
                <div className="flex v-centered gap-15px">
                    <Icon name="back" action="back" accent={false}/>
                    <Icon name='setting' accent={false} group="other" page="settings" action="navigate"/>
                    <Icon name='setting' accent={false} group="other" page="minimize" action="navigate"/>
                    <Icon name='setting' accent={false} group="other" page="maximize" action="navigate"/>
                    <Icon name='setting' accent={false} group="other" page="close" action="navigate"/>
                </div>
            </header>
        }

        {!isDesktopApp && 
            <header className='flex space-between v-centered pad-hori-10px'>
                {mobile_action}
                <h1 className='color-fg-text font-size-l'>{PageData.title}</h1>
                <Icon name='setting' accent={false} group="other" page="settings" action="navigate"/>
            </header>
        }

        <main className="scrollbar-dark-3">
            <Outlet />
        </main>
    </div>
};

const NavLayout: React.FC<LayoutProps> = ({
    nav
}: LayoutProps) => {
    const PageData = usePageData()

    let mobile_action = <Icon className='mobile-only' name="back" action="back" accent={false}/>
    const actions = PageData.cluster.map((action, index) => {
        if (PageData.name === action.name) {
            const next_action = PageData.cluster[index + 1 === PageData.cluster.length? 0: index +1]
            mobile_action = <Icon
                className='mobile-only' 
                name={next_action.name} 
                accent={false}
                group={PageData.group}
                page={next_action.name}
                action="navigate"
            />
        }

        return <li 
            style={{
                width: "25px"
            }}
            key={index}
        >
            <Icon 
                name={action.name} 
                accent={PageData.name === action.name} 
                group={PageData.group}
                page={action.name}
                action="navigate"
            />
        </li>
    })

    const nav_buttons = nav?.map((nav_item, index) => {
        return <li key={index}>
            <Icon 
                name={nav_item.icon} 
                group={nav_item.group}
                page={nav_item.page}
                action="navigate"
                accent={PageData.group === nav_item.group} 
                text={nav_item.label}
                className="font-size-s color-fg-text text-no-underline flex columns v-centered"
            />
        </li>
    })

    return <div id="app__layout">
        {isDesktopApp && 
            <header className='flex space-between v-centered pad-hori-10px color-bg-3'>
                {mobile_action}
                <h1 className='color-fg-text font-size-l'>{PageData.title}</h1>
                <div className="flex v-centered gap-15px">
                    <Icon name='setting' accent={false} group="other" page="settings" action="navigate"/>
                    <Icon name='setting' accent={false} group="other" page="minimize" action="navigate"/>
                    <Icon name='setting' accent={false} group="other" page="maximize" action="navigate"/>
                    <Icon name='setting' accent={false} group="other" page="close" action="navigate"/>
                </div>
            </header>
        }

        {!isDesktopApp && 
            <header className='flex space-between v-centered pad-hori-10px'>
                {mobile_action}
                <h1 className='color-fg-text font-size-l'>{PageData.title}</h1>
                <Icon name='setting' accent={false} group="other" page="settings" action="navigate"/>
            </header>
        }
        
        <main className="scrollbar-dark-3">
            <Outlet />
        </main>

        <footer className='flex centered v-centered pad-hori-10px gap-20px'>
            <ul role="navigation" className='color-fg-text flex no-decor space-between pad-hori-10px gap-5px full-width'>
                {nav_buttons}
            </ul>
            <div id="app__seperator" className="exclude-mobile"></div>
            <ul className='flex no-decor space-between exclude-mobile pad-hori-20px gap-20px'>
                {actions.length !== 0 && <>
                    {actions}
                </>}
                {actions.length === 0 && <>
                    <Icon name="back" action="back" accent={false}/>
                </>}
            </ul>
            
        </footer>
    </div>
}

export const setLayout = (
    layout_type: "none" | "minimal" | "nav",
): React.FC<LayoutProps>  => {
    switch(layout_type) {
        case "none":
            return EmptyLayout
        case 'minimal':
            return MinimalLayout
        case 'nav':
            return NavLayout
    }
}
