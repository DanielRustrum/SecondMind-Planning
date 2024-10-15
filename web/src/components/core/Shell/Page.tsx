import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"

export type PageData = {
    element: React.FC
    params?: Array<string>
    title?: string
}

export type MetaPageMap = {
    index?: React.FC
    error?: React.FC
    loader?: React.FC
}

export type ClusterData = Array<{
    icon: string
    page: string
    name: string
}>

type PageRecordType = {
    title: string
    cluster: ClusterData
}

export const Modules = import.meta.glob<{default: PageData}>("@pages/**/*.tsx", { eager: true })
const PageRecord: Map<`${string}.${string}`, PageRecordType> = new Map()

export const buildPage = (
    group: string, 
    name: string, 
    data: PageData, 
    cluster: ClusterData, 
    params: Array<string>
) => {
    let built_path = `${name}`
    params?.forEach(param => {
        built_path += `/:${param}`
    })

    PageRecord.set(`${group}.${name}`, {
        title: data.title ?? name,
        cluster: cluster
    })

    return {
        path: built_path,
        element: <data.element />
    }
}

export const usePageData = () => {
    const location = useLocation()
    const [current_page_data, setPageData] = useState<PageRecordType & {
        name: string
        group: string
    }>({
        name: "error",
        group: "error",
        title: "Error",
        cluster: []
    })

    useEffect(() => {
        let PathList = location.pathname.split("/")
        PathList.shift()
        const group = PathList.shift()
        const page = PathList.shift()
        const record = PageRecord.get(`${group}.${page}`)

        if(record)
            setPageData({...current_page_data, ...record, name: page!, group: group!});

    },[location])

    return current_page_data
}