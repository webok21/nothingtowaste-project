
import '../AddProduct/AddProductStyle.scss';
import camera from '../../img/add/upload-image.png';
import fourCircles from '../../img/add/four-circles.png';
import fiveCircles from '../../img/add/five-circles.png';
import dotsCircles from '../../img/add/dots-circles.png';
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EditProduct = () => {
    let { id } = useParams();
    const [productDetails, setProductDetails] = useState({})


    const [fileChosen, setFileChosen] = useState(null)
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [err, setErr] = useState('');

    useEffect(() => {
        const abortControl = new AbortController();
        axios.get(`/api/editProduct/${id}`)
            .then((result) => {
                if (result.data) {
                    console.log(result.data)
                    setProductDetails(result.data)
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
    }, [id])

    const handleInputs = (event) => {
        setProductDetails(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        })
    }

    const handleFile = (event) => {
        console.log(event.target.files);
        setFileChosen(event.target.files[0])
        setIsFilePicked(true);
    }

    const saveInputs = (e) => {
        e.preventDefault();

        axios.put(`api/editProduct/${id}`, productDetails)
            .then((result) => {
                console.log(result)
                console.log('edited article from db')
                window.location.href = result.data.redirect
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <main>
            <section id="add-product">
                <h3>Edit this Product </h3>
                <form onSubmit={saveInputs} >
                    <div>
                        <label htmlFor="advert">Anzeigentyp:</label>
                        <input type="radio" name='advertType' value='offer' onChange={handleInputs} />
                        <label htmlFor="offer">Ich biete</label>
                        <input type="radio" name='advertType' value='search' onChange={handleInputs} />
                        <label htmlFor="search">Ich suche</label>
                    </div>
                    <div>
                        <label>Lieferung:</label>
                        <input type="radio" name="delivery" value='yes' onChange={handleInputs} />
                        <label htmlFor="offer">Ja</label>
                        <input type="radio" id="delivery-no" name="delivery" value='no' onChange={handleInputs} />
                        <label htmlFor="offer">Nein</label>
                    </div>
                    <div>
                        <label>Abholung:</label>
                        <input type="radio" name="pickup" value='yes' onChange={handleInputs} />
                        <label htmlFor="offer">Ja</label>
                        <input type="radio" id="pickup-no" name="pickup" value='no' onChange={handleInputs} />
                        <label htmlFor="offer">Nein</label>
                    </div>
                    <div>
                        <label>Titel der Anzeige:</label>
                        <input type="text" name="title" required onChange={handleInputs} value={productDetails.p_titel} />
                    </div>
                    <div>
                        <label>Marke des Artikels:</label>
                        <input type="text" name="mark" onChange={handleInputs} value={productDetails.p_mark} />
                    </div>
                    <div>
                        <label>Beschreibung:</label>
                        <input type="text" id="description-input" name="description" onChange={handleInputs} value={productDetails.p_description} />
                    </div>

                    <div>
                        <label>Anzahl:</label>
                        <input type="number" name="quantity" required onChange={handleInputs} min='1' value={productDetails.p_amount} />
                    </div>
                    <div>
                        <label>Preis:</label>
                        <input step=".01" type="number" name="price" required onChange={handleInputs} min='0' value={productDetails.p_price} /> EUR
                        <input type="radio" checked name="condition" value='fixed' onChange={handleInputs} />
                        <label htmlFor="fixed-price">Festpreis</label>
                        <input type="radio" name="condition" value='flex' onChange={handleInputs} />
                        <label htmlFor="negotiable">VB</label>
                        <input type="radio" name="condition" value='free' onChange={handleInputs} />
                        <label htmlFor="give-away">Zu Verschenken</label>
                    </div>

                    <div className="upload">
                        <label>Bilder:</label>
                        <img src={camera} alt="" />
                        <input type="file" name="uploaded_file" onChange={handleFile} />
                        <p className='errorMessages'>{err}</p>
                        {/* <button onClick={handleUpload}>Hochladen</button> */}
                    </div >

                    <div>
                        <label>Kategorie</label>
                        <select name="category" id="" onChange={handleInputs} value={productDetails.p_category}>
                            <option value="Klamotten" >Klamotten</option>
                            <option value="Moebel">Möbel</option>
                            <option value="Electronik" >Elektronik</option>
                            <option value="Sonstiges" >Sonstiges</option>
                        </select>
                    </div >

                    <div>
                        <img className="dots-circles" src={dotsCircles} alt="cirlces" />
                        <img className="four-circles" src={fourCircles} alt="dots-circles" />
                        <img className="five-circles" src={fiveCircles} alt="circles" />

                        <label>PLZ*</label>
                        <input type="text" name="postcode" placeholder="PLZ" onChange={handleInputs} value={productDetails.p_PLZ} /><br></br>
                        <input type="text" id="city-input" name="city" placeholder="Ort" required onChange={handleInputs} value={productDetails.p_city} />
                    </div>
                    <div>
                        <label>Straße/Nr.*</label><input type="text" name="street" required onChange={handleInputs} value={productDetails.p_street} />
                    </div>
                    <div>
                        <label>Name*</label><input type="text" name="name" required onChange={handleInputs} value={productDetails.p_owner} />
                    </div>
                    <div>
                        <label>Telefonnummer*</label><input id="phone-input" type="number" name="phone" required onChange={handleInputs} min='0' value={productDetails.p_call} />
                    </div>
                    <div className="submit-input">
                        {/* <button onClick={saveInputs}>Produkt einstellen</button> */}
                        <input type="submit" value="Änderungen speichern" />
                    </div>
                </form >
                {/* <button onClick={saveInputs}>Produkt einstellen</button> */}

            </section >
        </main >
    );
}

export default EditProduct;