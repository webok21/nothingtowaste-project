import { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import * as actionType from '../../constants/actionsTypes';

const Nav = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();

    const logout = () => {
        dispatch({ type: actionType.LOGOUT });

        history.push('/auth');

        setUser(null);
    };

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

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
                <div className="toolbar">
                    {user?.result ? (
                        <div className="profile">
                            <div className="avatar" alt={user?.result.name} src={user?.result.imageUrl}><p className="userName" >{user?.result.name}</p></div>

                            <button className="logout" onClick={logout}>Logout</button>
                        </div>
                    ) : (
                        <>
                            <Button className="logIn" component={Link} to="/auth" >Log In</Button>
                            <Button className="logIn" component={Link} to="/auth" >Registriere Dich</Button>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
}

export default Nav;