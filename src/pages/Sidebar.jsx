import SidebarComp from "../components/Sidebar"
import Navbar from "../components/Navbar"

const Sidebar = () => {
  return (
    <div className="bg-slate-100">
        <Navbar/>
        <SidebarComp/>
    </div>
  )
}

export default Sidebar