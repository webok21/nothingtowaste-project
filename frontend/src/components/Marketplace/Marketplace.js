import { Link } from "react-router-dom";
import axios from 'axios';
import './Marketplace.scss';
import { useEffect, useState } from "react";
import shoes from '../../img/shop/white-shoes.png'
import Aside from "./Aside";

const Marketplace = () => {
    const [productData, setProductData] = useState(null)
    let count = 0
    useEffect(() => {
        const abortControl = new AbortController();
        console.log(productData)
        axios.get('/api/products', { signal: abortControl.signal })
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
        <main>
            <section id="marketplace">
                <Aside></Aside>
                <div>
                    {productData && (productData.map(productObj =>
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