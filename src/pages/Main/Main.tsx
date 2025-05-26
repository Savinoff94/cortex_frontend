import { MainNavBar } from "./components/MainNavBar/MainNavBar"
import { Outlet } from "react-router-dom"
export function Main() {
    return (
        <>
            <MainNavBar/>
            <Outlet/>
        </>
    )
}