import './AddProductStyle.scss';
import camera from '../../img/add/upload-image.png'
import fourCircles from '../../img/add/four-circles.png'
import fiveCircles from '../../img/add/five-circles.png'
import dotsCircles from '../../img/add/dots-circles.png'

const AddProduct = () => {
    return (
        <main>
            <section id="add-product">
                <form method="post" name="add-product">

                    <div>
                        <label htmlFor="advert">Anzeigentyp:</label>
                        <input type="radio" name="advert-type" checked />
                        <label htmlFor="offer">Ich biete</label>
                        <input type="radio" name="advert-type" />
                        <label htmlFor="search">Ich suche</label>
                    </div>
                    <div>
                        <label>Lieferung:</label>
                        <input type="radio" name="delivery" checked />
                        <label htmlFor="offer">Ja</label>
                        <input type="radio" id="delivery-no" name="delivery" />
                        <label htmlFor="offer">Nein</label>
                    </div>
                    <div>
                        <label>Abholung:</label>
                        <input type="radio" name="pickup" checked />
                        <label htmlFor="offer">Ja</label>
                        <input type="radio" id="pickup-no" name="pickup" />
                        <label htmlFor="offer">Nein</label>
                    </div>
                    <div>
                        <label>Titel der Anzeige:</label>
                        <input type="text" name="title" />
                    </div>
                    <div>
                        <label>Beschreibung:</label>
                        <input type="text" id="description-input" name="description" />
                    </div>

                    <div>
                        <label>Anzahl:</label>
                        <input type="number" name="quantity" />
                    </div>
                    <div>
                        <label>Preis:</label>
                        <input type="number" name="price" /> EUR
                        <input type="radio" checked />
                        <label htmlFor="fixed-price">Festpreis</label>
                        <input type="radio" />
                        <label htmlFor="negotiable">VB</label>
                        <input type="radio" checked />
                        <label htmlFor="give-away">Zu Verschenken</label>
                    </div>

                    <div className="upload">
                        <label>Bilder:</label>
                        <img src={camera} alt="" />
                        <input type="button" value="Bilder hinzufügen" />
                    </div >

                    <div>
                        <label>Kategorie</label>
                        <select name="" id="">
                            <option value="">Klamotten</option>
                            <option value="">Möbel</option>
                            <option value="">Elektronik</option>
                            <option value="">Sonstiges</option>
                        </select>
                    </div >

                    <div>
                        <img className="dots-circles" src={dotsCircles} alt="cirlces" />
                        <img className="four-circles" src={fourCircles} alt="dots-circles" />
                        <img className="five-circles" src={fiveCircles} alt="circles" />

                        <label>PLZ*</label>
                        <input type="number" name="postcode" placeholder="PLZ" />
                        <input type="text" id="city-input" name="city" placeholder="Ort" required />
                    </div>
                    <div>
                        <label>Straße/Nr.*</label><input type="text" name="street" required />
                    </div>
                    <div>
                        <label>Name*</label><input type="text" name="name" required />
                    </div>
                    <div>
                        <label>Telefonnummer*</label><input id="phone-input" type="number" name="phone" required />
                    </div>
                    <div className="submit-input">
                        <input type="submit" name="submit" value="Produkt einstellen" />
                    </div>
                </form >

            </section >
        </main >
    );
}

export default AddProduct;