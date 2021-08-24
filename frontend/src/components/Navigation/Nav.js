import { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Avatar, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import * as actionType from '../../constants/actionsTypes';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
// import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import LabelOffOutlinedIcon from '@material-ui/icons/LabelOffOutlined';
import HomeIcon from '@material-ui/icons/Home';

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
                    <Link to="/">
                        <li>nothingtotrash</li>
                        <HomeIcon className="home icon" />
                    </Link>
                </div>
                <ul className="ul lgout">
                    {user?.result ? (
                        <>
                            <Link to="/marketplace">
                                <li>Marktplatz</li>
                                <ShoppingCartOutlinedIcon className="icon" />
                            </Link>
                        </>
                    ) : (
                        <Link to="/auth/login">
                            <li>Marktplatz</li>
                        </Link>
                    )}
                    <Link to="/"><li>Über uns</li></Link>
                    {/* <Link to="/addproduct"><li>Füge ein Artikel hinzu</li></Link>
                    <Link to="/productsold"><li>Bereits verkauft</li></Link>
                    <Link to="/wishlist"><li>Meine Wunschliste</li></Link> */}
                </ul>

                {user?.result ? (
                    <>
                        <ul className="ul lgin">
                            <Link to="/addproduct">
                                <li>Füge ein Artikel hinzu</li>
                                <AddOutlinedIcon className="icon" />
                            </Link>
                            <Link to="/productsold">
                                <li>Bereits verkauft</li>
                                <LabelOffOutlinedIcon className="icon" />
                            </Link>
                            <Link to="/wishlist">
                                <li>Meine Wunschliste</li>
                                <FavoriteBorderOutlinedIcon className="icon" />
                            </Link>
                        </ul>
                        <div className="toolbar">
                            <div className="profile">
                                <Avatar className="userName" src={user?.result.imageUrl} alt={user?.result.name}>{user?.result.name.charAt(0)}</Avatar>
                                <button className="btn logout" onClick={logout}>Logout</button>
                            </div>
                        </div>
                    </>
                ) : (
                    <><div className="toolbar">
                        <div className="profile">
                            <Button className="btn login" type="submit" component={Link} to="/auth/login" >Log In</Button>
                            <Button className="btn register" type="submit" component={Link} to="/auth/register" >Registriere Dich</Button>
                        </div>
                    </div>
                    </>
                )}

            </nav>
        </header>
    );
}

export default Nav;