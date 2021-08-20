import { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Avatar, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import * as actionType from '../../constants/actionsTypes';
import './Nav.scss'

const Nav = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();

    const logout = () => {
        dispatch({ type: actionType.LOGOUT });

        history.push('/auth/login');

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
                    <Link to="/productsold"><li>Bereits verkauft</li></Link>
                    <Link to="/wishlist"><li>Meine Wunschliste</li></Link>
                </ul>
                <div className="toolbar">
                    {user?.result ? (
                        <div className="profile">
                            <Avatar className="userName" >{user?.result.name.charAt(0)}</Avatar>
                            <button className="btn logout" onClick={logout}>Logout</button>
                        </div>
                    ) : (
                        <>
                            <Button className="btn login" type="submit"  component={Link} to="/auth/login" >Log In</Button>
                            <Button className="btn register" type="submit"  component={Link} to="/auth/register" >Registriere Dich</Button>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
}

export default Nav;