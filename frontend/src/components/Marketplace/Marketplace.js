import { Link } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from "react";

const Marketplace = () => {
    const [productData, setProductData] = useState(null)
    // const [isFav, setFav] = useState(false)
    let count = 0
    useEffect(() => {
        const abortControl = new AbortController();

        console.log(productData)
        axios.get('/api/products', { signal: abortControl.signal })
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
            <section id="marketplace">

            </section>


        </main>
    );
}

export default Marketplace;