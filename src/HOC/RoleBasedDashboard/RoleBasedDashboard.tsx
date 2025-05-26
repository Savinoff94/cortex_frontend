import { useAuth } from "../../Context/AuthContext/AuthContext";
import { ViewerDashboard } from "../../pages/Dashboard/ViewerDashboard/ViewerDashboard";
import { AdminDashboard } from "../../pages/Dashboard/AdminDashboard/AdminDashboard";
export function RoleBasedDashboard() {
    const {user} = useAuth()

    if(!user) {
        throw new Error('no user')
    }

    if(user.role === 'admin') {
        return (
            <AdminDashboard/>
        )
    }
    if(user.role === 'viewer') {
        return (
            <ViewerDashboard/>
        )
    }

    return <div>Unknown role: {user.role}</div>;
}