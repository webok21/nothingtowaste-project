import './AddProductStyle.scss';
import camera from '../../img/add/upload-image.png';
import fourCircles from '../../img/add/four-circles.png';
import fiveCircles from '../../img/add/five-circles.png';
import dotsCircles from '../../img/add/dots-circles.png';
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import firebase from '../../config/firebase';
import { UserContext } from '../context/UserContext';


const AddProduct = () => {
    let logged_user = useContext(UserContext)
    // console.log(logged_user.result._id)
    const [inputs, setInputs] = useState({})
    const [filesChosen, setFilesChosen] = useState(null)
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [err, setErr] = useState('');
    const handleInputs = (event) => {
        setInputs(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        })
    }

    const handleUpload = (e) => {
        // console.log(e.target.files);
        // setFilesChosen(e.target.files[0])
        setIsFilePicked(true);
        let storageRef = firebase.storage().ref()
        // Create the file metadata
        // var metadata = {
        //     contentType: 'image/jpeg'
        // };

        // Upload file and metadata to the object 'images/mountains.jpg'
        var uploadTask = storageRef.child('images/' + filesChosen.name).put(filesChosen);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed', // or 'state_changed'
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':// or 'paused'
                        console.log('Upload is paused');
                        break;
                    case 'running':// or 'running'
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;

                    // ...

                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    // console.log('File available at', downloadURL);
                    setInputs(prev => {
                        return {
                            ...prev,
                            p_imageUrl: downloadURL,
                            p_ownerID: logged_user ? logged_user.result._id : ''
                        }
                    })
                });
            }
        );

    }
    const saveInputs = () => {
        console.log('these are the inputs:' + inputs)
        axios.post('/api/addProduct', inputs)
            .then((result) => {
                console.log(result)
                console.log('added article to db')
                window.location.href = result.data.redirect
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        if (filesChosen) {
            handleUpload()
        }

    }, [filesChosen])
    return (
        <main>
            <section id="add-product">
                <form onSubmit={saveInputs} encType="multipart/form-data">
                    <div>
                        <label>Anzeigentyp:</label>
                        <input type="radio" id="offer" name='advertType' value='offer' onChange={handleInputs} />
                        <label htmlFor="offer">Ich biete</label>
                        <input type="radio" id="search" name='advertType' value='search' onChange={handleInputs} />
                        <label htmlFor="search">Ich suche</label>
                    </div>
                    <div>
                        <label>Lieferung:</label>
                        <input type="radio" id="delivery-no" name="delivery" value='yes' onChange={handleInputs} />
                        <label htmlFor="delivery-no">Ja</label>
                        <input type="radio" id="delivery-yes" name="delivery" value='no' onChange={handleInputs} />
                        <label htmlFor="delivery-yes">Nein</label>
                    </div>
                    <div>
                        <label>Abholung:</label>
                        <input type="radio" name="pickup-yes" value='yes' onChange={handleInputs} />
                        <label htmlFor="pickup-yes">Ja</label>
                        <input type="radio" id="pickup-no" name="pickup" value='no' onChange={handleInputs} />
                        <label htmlFor="pickup-no">Nein</label>
                    </div>
                    <div>
                        <label>Titel der Anzeige:</label>
                        <input type="text" name="title" required onChange={handleInputs} />
                    </div>
                    <div>
                        <label>Marke des Artikels:</label>
                        <input type="text" name="mark" onChange={handleInputs} />
                    </div>
                    <div>
                        <label htmlFor="description-input">Beschreibung:</label>
                        <input type="text" id="description-input" name="description" onChange={handleInputs} />
                    </div>

                    <div>
                        <label>Anzahl:</label>
                        <input type="number" name="quantity" required onChange={handleInputs} min='0' />
                    </div>
                    <div className="price">
                        <label>Preis:</label>
                        <input type="number" id="currency" name="price" required onChange={handleInputs} min='0' />
                        <label htmlFor="currency">EUR</label>
                        <input type="radio" id="fixed-price" name="condition" value='fixed' checked onChange={handleInputs} />
                        <label htmlFor="fixed-price">Festpreis</label>
                        <input type="radio" id="negotiable" name="condition" value='flex' onChange={handleInputs} />
                        <label htmlFor="negotiable">VB</label>
                        <input type="radio" id="give-away" name="condition" value='free' onChange={handleInputs} />
                        <label htmlFor="give-away">Zu Verschenken</label>
                    </div>
                    <div className="upload">
                        <label>Bilder:</label>
                        <div className="upload-btn">
                            <img src={camera} alt="" />
                            <input type="file" name="uploaded_file" onChange={(e) => setFilesChosen(e.target.files[0])} />
                            <p className='errorMessages'>{err}</p>
                            {/* <button onClick={handleUpload}>Hochladen</button> */}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="category-select">Kategorie</label>
                        <select name="category" id="category-select" onChange={handleInputs} >
                            <option value="Klamotten" >Klamotten</option>
                            <option value="Möbel">Möbel</option>
                            <option value="Elektronik" >Elektronik</option>
                            <option value="Sonstiges" >Sonstiges</option>
                        </select>
                    </div>
                    <div className="form-images">
                        <img className="dots-circles" src={dotsCircles} alt="cirlces" />
                        <img className="four-circles" src={fourCircles} alt="dots-circles" />
                        <img className="five-circles" src={fiveCircles} alt="circles" />
                    </div>
                    <div className="address">
                        <label>PLZ*</label>
                        <input type="text" id="postcode" name="postcode" placeholder="PLZ" onChange={handleInputs} /><br></br>
                        <input type="text" id="city-input" name="city" placeholder="Ort" required onChange={handleInputs} />
                    </div>
                    <div>
                        <label>Straße/Nr.*</label>
                        <input type="text" name="street" required onChange={handleInputs} />
                    </div>
                    <div>
                        <label>Name*</label>
                        <input type="text" name="name" required onChange={handleInputs} />
                    </div>
                    <div className="phone-container">
                        <label>Telefonnummer*</label>
                        <input type="number" name="phone" required onChange={handleInputs} min='0' />
                    </div>
                    <div className="submit-input">
                        {/* <button onClick={saveInputs}>Produkt einstellen</button> */}
                        <input type="submit" value="Produkt einstellen" />
                    </div>
                </form >
                {/* <button onClick={saveInputs}>Produkt einstellen</button> */}

            </section >
        </main >
    );
}

export default AddProduct;