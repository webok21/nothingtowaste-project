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
    const [productDetail2, setDetail2] = useState(null)
    const [productSold, setProductSold] = useState(false)
    let { id } = useParams();
    let count = 0
    useEffect(() => {
        const abortControl = new AbortController();
        // console.log(productDetail)
        axios.get(`/api/productDetails/${id}`, { signal: abortControl.signal })
            .then((result) => {
                if (result.data) {
                    // console.log(result.data)
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
                // console.log(result.data)
                setDetail(result.data)
                setProductSold(productDetail.p_isSold)
                window.location.href = result.data.redirect
            })
            .catch((err) => { console.log(err) })

        console.log('added to sold listitems')

    }

    const handleDelete = () => {
        axios.delete(`/api/deleteProduct/${id}`)
            .then(result => window.location.href = result.data.redirect)
            .catch(err => console.log(err))
    }


    useEffect(() => {
        if (productDetail2) {
            axios.put(`/api/addLover/${productDetail._id}`, productDetail2)
                .then((result) => {
                    // console.log(result.data)
                    window.location.href = result.data.redirect
                })
                .catch((err) => { console.log(err) })
        }

    }, [productDetail2])
    return (
        <main>
            <section id="product-detail">

                {productDetail &&
                    <article key={productDetail._id} >
                        <p id="bigtitle">{productDetail.p_titel}</p>

                        <div className='detailBox'>
                            <figure>
                                <img className={productDetail.p_isSold ? 'soldProduct' : ''} src={productDetail.p_imageUrl} alt="img" id="img-product-full"></img>
                                {/* <img src={shoes} alt="img"></img> */}

                                <figcaption>
                                    <p><b>Produktbeschreibung:</b></p>
                                    <p>{productDetail.p_description}</p>
                                </figcaption>
                            </figure>
                            <div>

                                <p id="bigprice">{productDetail.p_price} ???, {(ProductDetail.p_forFree || productDetail.p_price * 1 == 0) ? 'Zu Verschenken' : productDetail.p_priceFlex ? 'VB' : 'Festpreis'}</p>


                                {productDetail.p_isSold ? '' : (productDetail.p_lovers &&
                                    productDetail.p_lovers.includes(`${logged_user.result._id}`)) ?
                                    <p className='inWishlist'><span className={productDetail.p_lovers &&
                                        productDetail.p_lovers.includes(`${logged_user.result._id}`) ? 'heart liked' : 'heart'
                                    }></span>In der Wunschliste</p> :
                                    <p onClick={() => {
                                        (setDetail2(() => {
                                            if (productDetail && logged_user) {

                                                return {
                                                    ...productDetail,
                                                    p_lovers: [...productDetail.p_lovers, logged_user.result._id]
                                                }

                                            }
                                        }))
                                    }} className='like'>
                                        <span className={productDetail.p_lovers &&
                                            productDetail.p_lovers.includes(`${logged_user.result._id}`) ? 'heart liked' : 'heart'
                                        }

                                        >
                                        </span>Auf die Wunschliste</p>}

                                <p><b>Anzeige-Typ:</b> {productDetail.p_toGiveAway ? 'Suche' : 'Angebot'}</p>
                                <p><b>Marke:</b> {productDetail.p_mark}</p>
                                <p><b>Kategorie:</b> {
                                    productDetail.p_category && (productDetail.p_category.map((el, i) =>
                                        <span key={i}>{el} </span>))
                                }</p>

                                <p><b>Anzahl:</b> {productDetail.p_amount}</p>
                                <p><b>Ort:</b> {productDetail.p_PLZ}  {productDetail.p_city}</p>
                                <p><b>Lieferung m??glich:</b> {productDetail.p_shiping ? 'Ja' : 'Nein'}</p>
                                <p><b>Abholung m??glich:</b> {productDetail.p_pickup ? 'Ja' : 'Nein'}</p>


                                <p className='kontakt'>Kontaktaufnahme</p>
                                <p><b>Verk??ufername:</b> {productDetail.p_owner}</p>
                                <p><b>Telefon:</b> {productDetail.p_call}</p>


                            </div>

                        </div>
                        {productDetail.p_isSold ?
                            <p className='isSoldMessage'>Dieses Produkt ist nicht mehr verf??gbar.
                                Sie k??nnen aber gern nach dem Namen des/der Verk??ufers/in suchen
                                (in der Marktplatz Seite) um weitere Angebote von ihm/ihr zu finden</p> :
                            <div>
                                {(`${productDetail.p_ownerID}` == `${logged_user.result._id}`) ?
                                    <div id="edit">
                                        <Link id="editbutton" to={`/editproduct/${productDetail._id}`}> Bearbeiten </Link>
                                        <button onClick={handleDelete}>L??schen</button>
                                        <button onClick={handleSoldStatus}>Verkauft</button>

                                    </div> : <div></div>
                                }
                            </div>
                        }

                    </article>
                }

            </section>

        </main>
    );
}

export default ProductDetail;