import {
    BrowserRouter as Router,
    Link,
    useLocation, useHistory
} from "react-router-dom";
import axios from 'axios';
import './Marketplace.scss';
import { useEffect, useState } from "react";

const Aside = (props) => {
    const [resutlsToShow, setResultToShow] = useState(props.data)
    const [countElectric, setcountElectric] = useState(0)
    const [countMöbel, setcountMöbel] = useState(0)
    const [countKlamotten, setcountKlamotten] = useState(0)
    const [countSonstiges, setcountSonstiges] = useState(0)
    const [countApple, setcountApple] = useState(0)

    console.log('resluts to show' + resutlsToShow)

    let history = props.history;
    let searchString = props.searchString
    return (
        <aside>
            <div>
                <h3>Kategorie</h3>
                <ul>
                    <li>Electronics <span>{countElectric}</span></li>
                    <li>Möbel <span>{countMöbel}</span></li>
                    <li>Klamotten <span>{countKlamotten}</span></li>
                    <li>Sonstiges <span>{countSonstiges}</span></li>
                </ul>
            </div>
            <div>
                <h3>Marken</h3>
                <ul>
                    {resutlsToShow && (resutlsToShow.filter((product) => {
                        if (product.p_titel.toLowerCase().includes(searchString.toLowerCase()) || product.p_category[0].toLowerCase().includes(searchString.toLowerCase()) || product.p_mark.toLowerCase().includes(searchString.toLowerCase()) || product.p_description.toLowerCase().includes(searchString.toLowerCase()) || product.p_owner.toLowerCase().includes(searchString.toLowerCase())) {
                            return product
                        }
                    }).map(product =>
                        <li key={product._id}>{product.p_mark}</li>
                    ))}
                </ul>
            </div>
            <div>
                <h3>Preis</h3>
                <ul>
                    <li>Nach Preis 1 filtern</li>
                    <li>Nach Preis 1 filtern</li>
                    <li>Nach Preis 1 filtern</li>
                    <li>Nach Preis 1 filtern</li>
                </ul>
            </div>

        </aside>
    );
}

export default Aside;