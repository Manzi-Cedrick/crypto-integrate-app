export interface IHeaderRoute {
    name: string
    href: string
    exact: boolean
}
export const headerRoutes: IHeaderRoute[] = [
    {
        name: "Home",
        href: "/",
        exact: false,
    },
    {
        name: "Explore",
        href: "/explore",
        exact: false,
    },
    {
        name: "Connect Developer",
        href: "/application-status",
        exact: false,
    }
]