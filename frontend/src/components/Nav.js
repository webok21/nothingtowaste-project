import {
    Link
} from "react-router-dom";

const Nav = () => {
    return (
        <header>
            <nav>
                <ul>
                    <Link to="/"><li>nothingtotrash</li></Link>
                    <Link to="/marketplace"><li>Marktplatz</li></Link>
                    <Link to="/"><li>Über uns</li></Link>
                    <Link to="/"><li>Log In</li></Link>
                    <Link to="/"><li>Registriere Dich</li></Link>

                    <Link to="/addproduct"><li>add product</li></Link>
                    <Link to="/productdetail"><li>product detail</li></Link>
                    <Link to="/productsold"><li>product sold</li></Link>
                    <Link to="/wishlist"><li>wishlist</li></Link>

                </ul>
            </nav>


        </header>
    );
}

export default Nav;