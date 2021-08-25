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

    const handleDelete = () => {
        axios.delete(`/api/deleteProduct/${id}`)
            .then(result => window.location.href = result.data.redirect)
            .catch(err => console.log(err))
    }


    useEffect(() => {
        if (productDetail2) {
            axios.put(`/api/addLover/${productDetail._id}`, productDetail2)
                .then((result) => {
                    console.log(result.data)
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
                        <figure>
                            <img className={productDetail.p_isSold ? 'soldProduct' : ''} src={productDetail.p_imageUrl} alt="img" id="img-product-full"></img>
                            {/* <img src={shoes} alt="img"></img> */}
                            <div>
                                <h3>{productDetail.p_titel}</h3>
                                <p>Anzeige-Typ: {productDetail.p_toGiveAway ? 'Suche' : 'Angebot'}</p>
                                <p>Marke: {productDetail.p_mark}</p>
                                <p>Preis pro Stück: {productDetail.p_price} Euros, {(ProductDetail.p_forFree || productDetail.p_price * 1 == 0) ? 'Zu Verschenken' : productDetail.p_priceFlex ? 'VB' : 'Festpreis'}</p>
                                <p>Anzahl: {productDetail.p_amount}</p>
                                <p>PLZ/Ort: {productDetail.p_PLZ} / {productDetail.p_city}</p>
                                <p>Lieferung möglich: {productDetail.p_shiping ? 'Ja' : 'Nein'}</p>
                                <p>Abholung möglich: {productDetail.p_pickup ? 'Ja' : 'Nein'}</p>
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
                                <p>Kategorie: {
                                    productDetail.p_category && (productDetail.p_category.map((el, i) =>
                                        <span key={i}>{el} </span>))
                                }</p>
                                <p><b>Produktbeschreibung</b></p>
                                <p>{productDetail.p_description}</p>
                                <p>Bei Interesse kontaktieren Sie mich gern telefonisch!</p>
                                <p>Verkäufername: {productDetail.p_owner}</p>
                                <p>Telefon: {productDetail.p_call}</p>


                            </div>
                        </figure>
                        {productDetail.p_isSold ?
                            <p>Dieses Produkt ist nicht mehr verfügbar.
                                Sie können aber gern nach dem Namen des/der Verkäufers/in suchen
                                (in der Marktplatz Seite) um weitere Angebote von ihm/ihr zu finden</p> :
                            <div>
                                {(`${productDetail.p_ownerID}` == `${logged_user.result._id}`) ?
                                    <div>
                                        <Link to={`/editproduct/${productDetail._id}`}> Bearbeiten </Link>
                                        <button onClick={handleDelete}>Löschen</button>
                                        <button onClick={handleSoldStatus}>Als Verkauft markieren</button>
                                        <i>    (Die Aktion kann zuerzeit nicht rückgängig gemacht werden!)</i>
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