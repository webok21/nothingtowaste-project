import { Link } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from "react";
// import shoes from '../../img/shop/white-shoes.png'
import Aside from "../Marketplace/Aside";
import ProductSoldHeader from "./ProductSoldHeader";
import '../Marketplace/Marketplace.scss';
import './ProductSold.scss'

const ProductSold = () => {
    const [productData, setProductData] = useState(null)
    let count = 0
    useEffect(() => {
        const abortControl = new AbortController();
        console.log(productData)
        axios.get('/api/products/sold', { signal: abortControl.signal })
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
            <ProductSoldHeader />
            <section id="product-sold">
                <Aside></Aside>
                <div>
                    {productData && (productData.map(productObj =>
                        <article key={productObj._id} >
                            <img src={productObj.p_imageUrl} alt="img"></img>
                            {/* <img src={shoes} alt="img"></img> */}
                            <div>
                            <p className="price">{productObj.p_price} EUR</p>
                                <p className="title">{productObj.p_titel}</p>
                                <p>Marke: {productObj.p_mark}</p>
                                <p>Anzahl: {productObj.p_amount}</p>
                                {/* <p>Lieferung möglich: {productObj.p_shiping ? 'Ja' : 'Nein'}</p>
                                <p>Abholung möglich: {productObj.p_pickup ? 'Ja' : 'Nein'}</p> */}
                            </div>
                            <div>
                                <Link to={`/productDetail/${productObj._id}`}>Details <span className="arrow"></span></Link>
                                {/* <p className='like'>Auf die Wunschliste</p> */}
                            </div>
                        </article>))}
                </div>
            </section>

        </main>
    );
}

export default ProductSold;