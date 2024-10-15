import { PageLink, LinkActions } from "../Shell/Link/Link"
import './Icon.scss'

interface Props {
    name: string
    size?: number
    accent: boolean
    group?: string
    page?: string
    action: LinkActions
    text?: string
    className?: string
}

const IconLinks: Map<string, string> = new Map()

Object.values(
        import.meta.glob<string>('@assets/icons/*.{png,jpg,jpeg,PNG,JPEG,svg}', { eager: true, query: '?url', import: 'default'})
    ).map(value => {
        const name = value.split("/").pop()?.split(".").shift()
        IconLinks.set(name!, value)
    });

const Icon: React.FC<Props> = ({name, size, accent, action, className, text, group, page}) => {
    const icon_color = accent? 
        "brightness(0) saturate(100%) invert(98%) sepia(69%) saturate(3032%) hue-rotate(299deg) brightness(100%) contrast(97%)":
        "brightness(0) saturate(100%) invert(100%) sepia(59%) saturate(4821%) hue-rotate(178deg) brightness(100%) contrast(91%)";

    let icon_link = IconLinks.get(name)
    if(!IconLinks.has(name)) icon_link = IconLinks.get("temp");

    return (
        <PageLink group={group} page={page} action={action} className={className ?? ""}>
            <>
                <img 
                    style={{
                        height: `${size?? 25}px`,
                        width: `${size?? 25}px`,
                        filter: icon_color,
                    }}
                    className="app__icon"
                    src={icon_link} 
                    alt="" 
                />
                {text? 
                    <p className={`${accent?"color-fg-accent":"color-fg-text"}`}>{text}</p>: 
                    <></>
                }
            </>
        </PageLink>
    )
}

export default Icon