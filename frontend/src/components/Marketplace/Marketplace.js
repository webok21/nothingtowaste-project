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


    const handleSearch = (e) => {
        setSearchString(e.target.value)
        //using location
        history.push({
            // pathname: { searchString },
            // search: "?id=5",
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
    return (
        <main id="marketplace-main">
            <MarketplaceHeader />
            <input type="search" placeholder="Suche nach Produkt, Kategorie..." onChange={handleSearch} />
            <section id="marketplace">
                <Aside></Aside>
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