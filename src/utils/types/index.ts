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
        href: "https://github.com/Manzi-Cedrick",
        exact: false,
    },
    {
        name: "Connect Developer",
        href: "https://www.linkedin.com/in/manzi-cedrick",
        exact: false,
    }
]