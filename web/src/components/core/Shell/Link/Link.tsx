import { Link } from "react-router-dom"

export type LinkActions =  "navigate" | "back"
export interface LinkProps {
    group?: string
    page?: string
    action: LinkActions
    className?: string
    params?: Array<string>
    children?: JSX.Element
}

export const PageLink: React.FC<LinkProps> = ({group, page, children, action, className, params}) => {
    switch(action) {
        case "navigate":
            let url = `/${group}/${page}`
            
            if (params) params.map(param => {
                url += `/${param}`
            });
            
            return <Link to={url} className={className}>{children}</Link>
        case "back":
            return <a style={{ cursor: "pointer" }} role="link" onClick={_ => history.back()} className={className}>{children}</a>
    }
}