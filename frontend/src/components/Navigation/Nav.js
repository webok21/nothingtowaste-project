import './Nav.scss'

import {
    Link
} from "react-router-dom";

const Nav = () => {
    return (
        <header>
            <nav>
                <div id="logo">
                    <Link to="/"><li>nothingtotrash</li></Link>
                </div>
                <ul>
                    <Link to="/marketplace"><li>Marktplatz</li></Link>
                    <Link to="/"><li>Über uns</li></Link>
                    <Link to="/addproduct"><li>Füge ein Artikel hinzu</li></Link>
                    <Link to="/productdetail"><li>Produkt-Detail</li></Link>
                    <Link to="/productsold"><li>Bereits verkauft</li></Link>
                    <Link to="/wishlist"><li>Meine Wunschliste</li></Link>
                </ul>
                <ul id="login">
                    <Link to="/"><li>Log In</li></Link>
                    <Link to="/"><li id="btn-register">Registriere Dich</li></Link>
                </ul>
            </nav>


        </header>
    );
}

export default Nav;