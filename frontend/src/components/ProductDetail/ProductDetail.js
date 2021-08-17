import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import './ProductDetail.scss';
import { useEffect, useState } from "react";
import shoes from '../../img/shop/white-shoes.png';



const ProductDetail = () => {
    const [productDetail, setDetail] = useState(null)
    let { id } = useParams();
    let count = 0
    useEffect(() => {
        const abortControl = new AbortController();
        console.log(productDetail)
        axios.get(`/api/productDetails/${id}`, { signal: abortControl.signal })
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
        console.log(productDetail)
        return () => {
            abortControl.abort();
            console.log('cleanup: fetching aborted')
        }
    }, [count])
    return (
        <main>
            <section id="product-detail">

                {productDetail &&
                    <article key={productDetail._id} >
                        <figure>
                            {/* <img src={productDetail.p_imageUrl} alt="img"></img> */}
                            <img src={shoes} alt="img"></img>
                            <div>
                                <h3>{productDetail.p_titel}</h3>
                                <p>Marke: {productDetail.p_mark}</p>
                                <p>Preis pro Stück: {productDetail.p_price} $</p>
                                <p>Anzahl: {productDetail.p_amount}</p>
                                <p>Lieferung möglich: {productDetail.p_shiping ? 'Ja' : 'Nein'}</p>
                                <p>Abholung möglich: {productDetail.p_pickup ? 'Ja' : 'Nein'}</p>
                                <p>Auf die Wunschliste</p>
                                <p>{productDetail.p_description}</p>
                            </div>
                        </figure>
                        <div>
                            <Link to={`/productDetail/${productDetail._id}`}> Bearbeiten </Link>
                            <Link to={`/productDetail/${productDetail._id}`}> Verkauft </Link>

                        </div>
                    </article>
                }

            </section>

        </main>
    );
}

export default ProductDetail;