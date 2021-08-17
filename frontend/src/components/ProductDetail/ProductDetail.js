import { Link } from "react-router-dom";
import axios from 'axios';
import './ProductDetail.scss';
import { useEffect, useState } from "react";
import shoes from '../../img/shop/white-shoes.png'


const ProductDetail = () => {
    const [p_Detail, setDetail] = useState(null)
    let count = 0
    useEffect(() => {
        const abortControl = new AbortController();
        console.log(p_Detail)
        axios.get('/api/productDetails', { signal: abortControl.signal })
            .then((result) => {
                console.log(result.data)
                setDetail(result.data)
            })
            .catch((err) => {
                if (err.name === 'AbortError') {
                    console.log('err fetch abortion')
                } else {
                    console.log(err)
                }

            })
        console.log(p_Detail)
        return () => {
            abortControl.abort();
            console.log('cleanup: fetching aborted')
        }
    }, [count])
    return (
        <main>
            <section id="product-detail">
                {p_Detail && (p_Detail.map(productObj =>
                    <article key={productObj._id} >
                        {/* <img src={productObj.p_imageUrl} alt="img"></img> */}
                        <img src={shoes} alt="img"></img>
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
                            <p>Auf die Wunschliste</p>
                        </div>
                    </article>))}

            </section>

        </main>
    );
}

export default ProductDetail;