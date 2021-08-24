import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import './ProductDetail.scss';
import { useEffect, useState, useContext } from "react";
// import shoes from '../../img/shop/white-shoes.png';
import like from '../../img/shop/like.svg';
import { UserContext } from "../context/UserContext";



const ProductDetail = () => {
    let logged_user = useContext(UserContext) //added!!
    const [productDetail, setDetail] = useState({})
    const [productDetail2, setDetail2] = useState({})
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
                setDetail2(result.data)
                setProductSold(productDetail.p_isSold)
                window.location.href = result.data.redirect
            })
            .catch((err) => { console.log(err) })

        console.log('added to sold listitems')

    }

    // setDetail2(() => {
    //     if (productDetail && logged_user) {
    //         return {
    //             ...productDetail,
    //             p_lovers: [...productDetail.p_lovers, logged_user.result._id]
    //         }
    //     }
    // })

    // setDetail2(() => {
    //     if (productDetail && logged_user) {
    //         return {
    //             p_titel: productDetail.p_titel,
    //             p_imageUrl: productDetail.p_imageUrl,
    //             p_mark: productDetail.p_mark,
    //             p_shiping: productDetail.p_shiping,
    //             p_pickup: productDetail.p_pickup,
    //             p_price: productDetail.p_price,
    //             p_amount: productDetail.p_amount,
    //             p_category: productDetail.p_category,
    //             p_description: productDetail.p_description,
    //             p_owner: productDetail.p_owner,
    //             p_forFree: productDetail.p_forFree,
    //             p_priceFlex: productDetail.p_priceFlex,
    //             p_toGiveAway: productDetail.p_toGiveAway,
    //             p_call: productDetail.p_call,
    //             p_street: productDetail.p_street,
    //             p_city: productDetail.p_city,
    //             p_PLZ: productDetail.p_PLZ,
    //             p_isSold: productDetail.p_isSold,
    //             p_ownerID: productDetail.p_ownerID,
    //             p_lovers: [...productDetail.p_lovers, logged_user.result._id]

    //         }
    //     }
    // })


    return (
        <main>
            <section id="product-detail">

                {productDetail &&
                    <article key={productDetail._id} >
                        <figure>
                            <img src={productDetail.p_imageUrl} alt="img"></img>
                            {/* <img src={shoes} alt="img"></img> */}
                            <div>
                                <h3>{productDetail.p_titel}</h3>
                                <p>Marke: {productDetail.p_mark}</p>
                                <p>Preis pro Stück: {productDetail.p_price} $</p>
                                <p>Anzahl: {productDetail.p_amount}</p>
                                <p>Lieferung möglich: {productDetail.p_shiping ? 'Ja' : 'Nein'}</p>
                                <p>Abholung möglich: {productDetail.p_pickup ? 'Ja' : 'Nein'}</p>
                                {productDetail.p_isSold ? '' : <p className='like'>
                                    <span onClick={() => {
                                        axios.put(`/api/addLover/${productDetail._id}`, productDetail2)
                                            .then((result) => {
                                                console.log(result.data)
                                                // setData(result.data)
                                            })
                                            .catch((err) => { console.log(err) })

                                    }}><img src={like} alt='img'></img></span>Auf die Wunschliste</p>}
                                <p>Kategorie: {
                                    productDetail.p_category && (productDetail.p_category.map((el, i) =>
                                        <span key={i}>{el}, </span>))
                                }</p>
                                <p>{productDetail.p_description}</p>
                            </div>
                        </figure>
                        {productDetail.p_isSold ? <p>This item is no longer available</p> : <div>
                            <Link to={`/editproduct/${productDetail._id}`}> Bearbeiten </Link>
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