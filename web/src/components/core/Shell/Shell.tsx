import { RouterProvider, createBrowserRouter, useLocation, useParams } from "react-router-dom";
import { StrictMode, useMemo } from 'react'
import { createRoot } from 'react-dom/client';

import {LayoutTypes, setLayout, NavData, } from './Layout/Layout'
import {PageLink as Link} from "./Link/Link"

import { buildPage, Modules, MetaPageMap, ClusterData } from "./Page";


type AppData = {
    nav: NavData
    groups: {
        [name: string]: {
            shell?: LayoutTypes
            cluster?: ClusterData
        }
    }
    widgets: {
        [name: string]: {}
    }
} | null

type RouterEntry = {
    path: string
    element: JSX.Element
    errorElement?: JSX.Element,
    children?: Array<RouterEntry>
}




let ShellData: AppData = null

export const PageLink = Link
export const defineAppData = (data: AppData) => {
    ShellData = data
}

export const init = async () => {
    const routes: Array<RouterEntry> = []
    const meta: MetaPageMap = {}
    const groups: Map<string, {
        path: string
        layout_element: JSX.Element
        pages: Array<RouterEntry>
    }> = new Map()

    if (ShellData === null) return;

    for (const path in Modules) {
        const path_list = path.split("/")
        const page_list = path_list.pop()?.split(".") ?? []
        page_list.pop()
        const page_name = page_list.shift()
        const page_params = page_list
        const page_data = Modules[path]["default"]
        
        // Define Group
        let group = "*"
        if(path_list.length === 4) {
            group = path_list.pop()!
        }

        // Initalize New Group
        if (group !== "*" && !groups.has(group)) {
            const shell_type: LayoutTypes = ShellData.groups[group]?.shell?? "none"
            const Element = setLayout(shell_type)

            groups.set(group, {
                path: `/${group}`,
                layout_element: <Element nav={ShellData.nav}></Element>,
                pages: []
            })
        }


        // Add Page to Group
        if(group !== "*") {
            const page = buildPage(
                group, 
                page_name!, 
                page_data, 
                ShellData.groups[group]?.cluster ?? [],
                page_params
            )

            groups.get(group)!.pages.push(page)
        } else {
            switch(page_name) {
                case "[error]":
                    meta.error = page_data.element
                    break
                case "[index]":
                    meta.index = page_data.element
                    break
            }
        }
    }

    const ErrorElement: React.FC<{}> = meta.error !== undefined? meta.error: () => <div>Error!</div>

    for(const [_, GroupData] of groups) {
        routes.push({
            path: GroupData.path,
            element: GroupData.layout_element,
            errorElement: <ErrorElement />,
            children: GroupData.pages
        })
    }


    routes.push({
        path: "/",
        element: <div>No INdex Provided</div>,
        errorElement: <ErrorElement />
    })

    const router = createBrowserRouter(routes)


    createRoot(document.getElementById('root')!).render(
        <StrictMode>
          <RouterProvider router={router} />
        </StrictMode>,
      )
}

export const useRouterData = () => {
    const { search } = useLocation();
    const params_obj = useParams()
    const params = useMemo(()=> params_obj, [params_obj])
    const query = useMemo(() => Object.fromEntries(new URLSearchParams(search).entries()), [search]);
    
    return {
        params: params,
        query: query
    }
}