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

    const [filterCategories, setfilterCategories] = useState('')
    const [filterPrice, setfilterPrice] = useState('')
    const [filterPriceMin, setfilterPriceMin] = useState('')
    const [filterPriceMax, setfilterPriceMax] = useState('')
    const [filterMark, setfilterMark] = useState('')

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

    const handleFilterInputs = () => {
        history.push({
            search: `search=${searchString}&&category=${filterCategories}&&mark=${filterMark}&&price=${filterPrice}&&min=${filterPriceMin}&&max=${filterPriceMax}`,
        });
    }
    const handleReset = () => {
        setfilterCategories('')
        setfilterPrice('')
        setfilterPriceMin('')
        setfilterPriceMax('')
        setfilterMark('')
        history.push({
            pathname: '/marketplace',
        });
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

    const foundMarks = filteredArr && filteredArr.map(product => product.p_mark.toLowerCase())
    const foundCateg = filteredArr && filteredArr.map(product => product.p_category)

    console.log(foundMarks)
    console.log(foundCateg)

    const counts = {};

    for (const mark of foundMarks) {
        counts[mark.toLowerCase()] = counts[mark.toLowerCase()] ? counts[mark.toLowerCase()] + 1 : 1;
    }
    for (const category of foundCateg) {
        counts[category] = counts[category] ? counts[category] + 1 : 1;
    }
    console.log(counts[['Sonstiges']])
    console.log(counts['Amazon']);

    return (
        <main id="marketplace-main">
            <MarketplaceHeader />
            <input type="search" placeholder="Suche nach Produkt, Kategorie..." onChange={handleSearch} id="search"/>
            <section id="marketplace">
                <aside>
                    <div>
                        <h3>Kategorie</h3>
                        <ul>
                            <li>
                                <input type="checkbox" id="Klamotten" name="Klamotten" onChange={(e) => e.target.selected ? setfilterCategories(filterCategories + '#Klamotten') : ''}></input>
                                <label htmlFor="Klamotten">Klamotten </label><span>{counts[['Klamotten']] ? counts[['Klamotten']] : '0'}</span>
                            </li>

                            <li>
                                <input type="checkbox" id="Elektronik" name="Elektronik" onChange={() => setfilterCategories(filterCategories + '#Elektronik')}></input>
                                <label htmlFor="Elektronik">Elektronik </label><span>{counts[['Elektronik']] ? counts[['Elektronik']] : '0'}</span>
                            </li>
                            <li>
                                <input type="checkbox" id="Möbel" name="Möbel" onChange={() => setfilterCategories(filterCategories + '#Möbel')}></input>
                                <label htmlFor="Möbel">Möbel </label><span>{counts[['Möbel']] ? counts[['Möbel']] : '0'}</span>
                            </li>
                            <li>
                                <input type="checkbox" id="Sonstiges" name="Sonstiges" onChange={() => setfilterCategories(filterCategories + '#Sonstiges')}></input>
                                <label htmlFor="Sonstiges">Sonstiges </label><span>{counts[['Sonstiges']] ? counts[['Sonstiges']] : '0'}</span>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3>Marken</h3>
                        <ul>
                            {foundMarks && [...new Set(foundMarks)].map((mark, i) =>
                                <li key={i}> <input type="checkbox" id={mark} name={mark} onChange={() => setfilterMark(filterMark + '#Möbel')}></input>
                                    <label htmlFor={mark}>{mark}</label> <span>{counts[mark] ? counts[mark] : '0'}</span>
                                </li>
                            )}
                        </ul>
                    </div>
                    <div>
                        <h3>Preis</h3>
                        <input type="range" name="price" min="0" max="1000" onChange={(e) => setfilterPrice(e.target.value)}></input>
                        <span>Min: </span>  <input type="number" id="priceMin" placeholder='0 $' name="priceMin" onChange={(e) => setfilterPriceMin(e.target.value)} min='0'></input>
                        <span>Max: </span>  <input type="number" id="priceMax" placeholder='1000 $' name="priceMax" min='0' onChange={(e) => setfilterPriceMax(e.target.value)} ></input>
                        <button onClick={handleFilterInputs}>Anwenden</button>
                        <button onClick={handleReset}>Reset</button>
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
                                <p className="price">{productObj.p_price} EUR</p>
                                <p className="title">{productObj.p_titel}</p>
                                <p>Marke: {productObj.p_mark}</p>
                                <p>Anzahl: {productObj.p_amount}</p>
                                <p>Lieferung möglich: {productObj.p_shiping ? 'Ja' : 'Nein'}</p>
                                <p>Abholung möglich: {productObj.p_pickup ? 'Ja' : 'Nein'}</p>
                            </div>
                            <div>
                                <Link to={`/productDetail/${productObj._id}`}>Details <span className="arrow"></span> </Link>
                                <p className="like"><span className="heart"></span> Auf die Wunschliste</p>
                            </div>
                        </article>))}
                </div>
            </section>
        </main>
    );
}

export default Marketplace;