import { NavLink } from "react-router-dom";

const Nav = () => {
    const activeStyle = {
        borderBottom: "1px solid #77AF9C"
    }
    return ( 
        <nav>
            <h1>FoodTrack</h1>
            <div className="links">
                <NavLink exact to="/" activeStyle={activeStyle}>Home</NavLink>
                <NavLink to="/yourrecipes" activeStyle={activeStyle}>Your recipes</NavLink>
                <NavLink to="/login" activeStyle={activeStyle}>Log in</NavLink>
            </div>
        </nav>
    );
}
 
export default Nav;