import { FaBoltLightning } from "react-icons/fa6";

function Nav() {
  return (
    <nav>
      <div className="nav--group">
        <div><FaBoltLightning/>HUMAN BENCHMARK</div>
        <div>DASHBOARD</div>
      </div>
      <div className="nav--group">
        <div>SIGNUP</div>
        <div>LOGIN</div>
      </div>
      
    </nav>
  )
}

export default Nav