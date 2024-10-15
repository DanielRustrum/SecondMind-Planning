import { useRouterData } from "@router"

const Page: React.FC = () => {
    const router_data = useRouterData()
    return <div className="color-fg-text">
        {JSON.stringify(router_data)}
        <div>test</div>
    </div>
}

export default {
    element: Page,
    title: "Hello!"
}