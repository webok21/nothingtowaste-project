import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import './ProductDetail.scss';
import { useEffect, useState } from "react";
// import shoes from '../../img/shop/white-shoes.png';
import like from '../../img/shop/like.svg'



const ProductDetail = () => {
    const [productDetail, setDetail] = useState({})
    const [productSold, setProductSold] = useState(false)
    let { id } = useParams();
    let count = 0
    useEffect(() => {
        const abortControl = new AbortController();
        console.log(productDetail)
        axios.get(`/api/productDetails/${id}`, { signal: abortControl.signal })
            .then((result) => {
                if (result.data) {
                    console.log(result.data)
                    setDetail(result.data)
                    setProductSold(productDetail.p_isSold)
                }
            })
            .catch((err) => {
                if (err.name === 'AbortError') {
                    console.log('err fetch abortion')
                } else {
                    console.log(err)
                }
            })
        return () => {
            abortControl.abort();
            console.log('cleanup: fetching aborted')
        }
    }, [count])

    const handleSoldStatus = () => {

        axios.put(`/api/makeSold/${id}`)
            .then((result) => {
                console.log(result.data)
                setDetail(result.data)
                setProductSold(productDetail.p_isSold)
                window.location.href = result.data.redirect
            })
            .catch((err) => { console.log(err) })

        console.log('added to sold listitems')

    }
    return (
        <main>
            <section id="product-detail">

                {productDetail &&
                    <article key={productDetail._id} >
                        <figure>
                            <img src={productDetail.p_imageUrl} alt="img" id="img-product-full"></img>
                            {/* <img src={shoes} alt="img"></img> */}
                            <div>
                                <p id="bigtitle">{productDetail.p_titel}</p>
                                <p id="bigprice">{productDetail.p_price} EUR</p>
                                <p>Marke: {productDetail.p_mark}</p>
                                
                                <p>Anzahl: {productDetail.p_amount}</p>
                                <p>Lieferung möglich: {productDetail.p_shiping ? 'Ja' : 'Nein'}</p>
                                <p>Abholung möglich: {productDetail.p_pickup ? 'Ja' : 'Nein'}</p>
                                {productDetail.p_isSold ? '' : <p className='like'> <span><img src={like} alt='img'></img></span>Auf die Wunschliste</p>}
                                <p>Kategorie: {
                                    productDetail.p_category && (productDetail.p_category.map((el, i) =>
                                        <span key={i}>{el}, </span>))
                                }</p>
                                <p><b>Produktbeschreibung</b></p>
                                <p>{productDetail.p_description}</p>
                            </div>
                        </figure>
                        {productDetail.p_isSold ? <p>This item is no longer available</p> : <div>
                            <Link to={`/editproduct/${productDetail._id}`} className="btn-white"> Bearbeiten </Link>
                            {/* <Link to={`/productDetail/${productDetail._id}`}> Verkauft </Link> */}
                            <button onClick={handleSoldStatus}>Verkauft</button>
                        </div>}

                    </article>
                }

            </section>

        </main>
    );
}

export default ProductDetail;