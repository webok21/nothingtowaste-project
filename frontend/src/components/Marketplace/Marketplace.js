import {
    BrowserRouter as Router,
    Link,
    useLocation, useHistory
} from "react-router-dom";
import axios from 'axios';
import './Marketplace.scss';
import { useEffect, useState } from "react";
// import shoes from '../../img/shop/white-shoes.png'
import Aside from "./Aside";
import MarketplaceHeader from "./MarketplaceHeader";

const Marketplace = () => {
    let history = useHistory();
    const [productData, setProductData] = useState(null)
    const [searchString, setSearchString] = useState('')

    const [countElectric, setcountElectric] = useState(0)
    const [countMöbel, setcountMöbel] = useState(0)
    const [countKlamotten, setcountKlamotten] = useState(0)
    const [countSonstiges, setcountSonstiges] = useState(0)
    const [countApple, setcountApple] = useState(0)


    const handleSearch = (e) => {
        setSearchString(e.target.value)
        //using location
        history.push({
            // pathname: { searchString },
            search: `search=${searchString}`,
            // hash: "#react"
        });
        // https://localhost:3000/blogs?id=5#react

    }


    let count = 0
    useEffect(() => {
        const abortControl = new AbortController();
        console.log(productData)
        axios.get(`/api/products`, { signal: abortControl.signal })
            .then((result) => {
                console.log(result.data)
                setProductData(result.data)
            })
            .catch((err) => {
                if (err.name === 'AbortError') {
                    console.log('err fetch abortion')
                } else {
                    console.log(err)
                }
            })
        console.log(productData)
        return () => {
            abortControl.abort();
            console.log('cleanup: fetching aborted')
        }
    }, [count])


    const filteredArr = (productData ? productData.filter((product) => {
        if (product.p_titel.toLowerCase().includes(searchString.toLowerCase()) || product.p_category[0].toLowerCase().includes(searchString.toLowerCase()) || product.p_mark.toLowerCase().includes(searchString.toLowerCase()) || product.p_description.toLowerCase().includes(searchString.toLowerCase()) || product.p_owner.toLowerCase().includes(searchString.toLowerCase())) {
            return product
        }
    }) : '')

    const foundMarks = filteredArr && filteredArr.map(product => product.p_mark)
    const foundCateg = filteredArr && filteredArr.map(product => product.p_category)

    console.log(foundMarks)
    console.log(foundCateg)
    const allCategories = [['Klamotten'], ['Elektronik'], ['Möbel'], ['Sonstiges']]

    const counts = {};

    for (const mark of foundMarks) {
        counts[mark.toLowerCase()] = counts[mark.toLowerCase()] ? counts[mark.toLowerCase()] + 1 : 1;
    }
    for (const category of foundCateg) {
        counts[category] = counts[category] ? counts[category] + 1 : 1;
    }
    console.log(counts[['Sonstiges']])
    // console.log(counts['apple']);

    return (
        <main id="marketplace-main">
            <MarketplaceHeader />
            <input type="search" placeholder="Suche nach Produkt, Kategorie..." onChange={handleSearch} />
            <section id="marketplace">
                <aside>
                    <div>
                        <h3>Kategorie</h3>
                        <ul>
                            <li>
                                <input type="checkbox" id="scales" name="scales"></input>
                                <label for="scales">Klamotten </label><span>{counts[['Klamotten']] ? counts[['Klamotten']] : '0'}</span>
                            </li>

                            <li>
                                <input type="checkbox" id="horns" name="horns"></input>
                                <label for="horns">Elektronik </label><span>{counts[['Elektronik']] ? counts[['Elektronik']] : '0'}</span>
                            </li>
                            <li>
                                <input type="checkbox" id="horns" name="horns"></input>
                                <label for="horns">Möbel </label><span>{counts[['Möbel']] ? counts[['Möbel']] : '0'}</span>
                            </li>
                            <li>
                                <input type="checkbox" id="horns" name="horns"></input>
                                <label for="horns">Sonstiges </label><span>{counts[['Sonstiges']] ? counts[['Sonstiges']] : '0'}</span>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3>Marken</h3>
                        <ul>
                            {foundMarks && [...new Set(foundMarks)].map((mark, i) =>
                                <li key={i}> <input type="checkbox" id="horns" name="horns"></input>
                                    <label for="horns">{mark}</label> <span>{counts[mark]}</span>
                                </li>
                            )}
                        </ul>
                    </div>
                    <div>
                        <h3>Preis</h3>
                        <input type="range" name="auswertung" min="0" max="10" value="5"></input>
                        <p><span>Min: </span> <span>0</span></p>
                        <p><span>Max: </span> <span>000</span></p>
                        <button>Anwenden</button>
                        <button>Reset</button>

                    </div>

                </aside>
                <div>
                    {productData && (productData.filter((product) => {
                        if (product.p_titel.toLowerCase().includes(searchString.toLowerCase()) || product.p_category[0].toLowerCase().includes(searchString.toLowerCase()) || product.p_mark.toLowerCase().includes(searchString.toLowerCase()) || product.p_description.toLowerCase().includes(searchString.toLowerCase()) || product.p_owner.toLowerCase().includes(searchString.toLowerCase())) {
                            return product
                        }
                    }).map(productObj =>
                        <article key={productObj._id} >
                            <img src={productObj.p_imageUrl} alt="img"></img>
                            {/* <img src={shoes} alt="img"></img> */}
                            <div>
                                <p>{productObj.p_titel}</p>
                                <p>Marke: {productObj.p_mark}</p>
                                <p>Preis pro Stück: {productObj.p_price} $</p>
                                <p>Anzahl: {productObj.p_amount}</p>
                                <p>Lieferung möglich: {productObj.p_shiping ? 'Ja' : 'Nein'}</p>
                                <p>Abholung möglich: {productObj.p_pickup ? 'Ja' : 'Nein'}</p>
                            </div>
                            <div>
                                <Link to={`/productDetail/${productObj._id}`}> Details </Link>
                                <p className='like'>Auf die Wunschliste</p>
                            </div>
                        </article>))}
                </div>
            </section>
        </main>
    );
}

export default Marketplace;