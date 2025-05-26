import { NavBar } from "../../../../components/NavBar/NavBar";
import { Button } from "../../../../components/Button/Button";
import { useAuth } from "../../../../Context/AuthContext/AuthContext";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export function MainNavBar() {
    const {logout} = useAuth()
    const location = useLocation();
    const isChartsPage = location.pathname === "/main/charts";
    return (
        <NavBar>
            <div className="flex justify-center gap-3 grow">
                <Button
                    isPrimary={isChartsPage}
                >
                    <Link to="/main/charts">Chart</Link>
                </Button>
                <Button
                    isPrimary={!isChartsPage}
                >
                    <Link to="/main">Table</Link>
                </Button>
            </div>
            <Button
                isPrimary={false}
                onClick={logout}
            >
                log out
            </Button>
        </NavBar>
    )
}