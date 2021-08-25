import {
    BrowserRouter as Router,
    Link,
    useLocation, useHistory
} from "react-router-dom";
import axios from 'axios';
import './Marketplace.scss';
import { useEffect, useState } from "react";
// import shoes from '../../img/shop/white-shoes.png'
import MarketplaceHeader from "./MarketplaceHeader";

const Marketplace = () => {
    let history = useHistory();
    const [productData, setProductData] = useState(null)
    const [searchString, setSearchString] = useState('')

    const [filterCategories, setfilterCategories] = useState('')
    const [filterPriceMin, setfilterPriceMin] = useState(0)
    const [filterPriceMax, setfilterPriceMax] = useState(5000)
    const [filterMark, setfilterMark] = useState('')

    const [resultMessage, setResultMessage] = useState('')
    const [renderComp, setRenderComp] = useState(false)


    const handleSearch = (e) => {
        let str = e.target.value
        setSearchString(str.replace(/\s+/g))
        //using locations
        history.push({
            // pathname: { searchString },
            search: `search=${searchString}`,
            // hash: "#react"
        });
        // https://localhost:3000/blogs?id=5#react
    }
    const queryStr = `text=${searchString}&category=${filterCategories}&mark=${filterMark}&min=${filterPriceMin}&max=${filterPriceMax}`;
    // const urlSearch = new URLSearchParams(queryStr);
    const urlSearch = new URLSearchParams({
        text: `${searchString}`,
        category: `${filterCategories}`,
        mark: `${filterMark}`,
        min: `${filterPriceMin}`,
        max: `${filterPriceMax}`
    });
    console.log('this is urlSearch: ' + urlSearch);


    for (const [key, value] of urlSearch) {
        console.log(`${key}=>${value}`)
    }

    const handleReset = () => {
        setSearchString('')
        setfilterCategories('')
        setfilterPriceMin(0)
        setfilterPriceMax(5000)
        setfilterMark('')
        setResultMessage('')
        history.push({
            pathname: '/marketplace',
        });
    }


    let count = 0
    useEffect(() => {
        const abortControl = new AbortController();
        console.log(productData)
        axios.get(`/api/products`, { signal: abortControl.signal })
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
    }, [])

    const handleFilterInputs = () => {
        history.push({
            search: `${urlSearch.toString()}`,
        });
        // const filteredArr2 = (productData ? productData.filter((product) => {
        //     if (searchString.replace(/\s+/g, '') !== '') {
        //         if (product.p_titel.toLowerCase().includes(searchString.toLowerCase()) || product.p_category[0].toLowerCase().includes(searchString.toLowerCase()) || product.p_mark.toLowerCase().includes(searchString.toLowerCase()) || product.p_description.toLowerCase().includes(searchString.toLowerCase()) || product.p_owner.toLowerCase().includes(searchString.toLowerCase())) {
        //             if (filterCategories.toLowerCase().includes(product.p_category[0].toLowerCase()) && filterMark.toLowerCase().includes(product.p_mark.toLowerCase()) && product.p_price >= filterPriceMin && product.p_price <= filterPriceMax) {
        //                 return product
        //             }
        //         } else {
        //             setResultMessage(`No matching results for "${searchString}"`)
        //         }
        //     }
        // }) : 'nothing')

        const filteredArr2 = (productData ? productData.filter((product) => {
            if (searchString.replace(/\s+/g, '') !== '') {
                if (product.p_titel.toLowerCase().includes(searchString.toLowerCase()) || product.p_category[0].toLowerCase().includes(searchString.toLowerCase()) || product.p_mark.toLowerCase().includes(searchString.toLowerCase()) || product.p_description.toLowerCase().includes(searchString.toLowerCase()) || product.p_owner.toLowerCase().includes(searchString.toLowerCase())) {
                    setResultMessage('yep string in searchfielf matches with these objects')
                    if (filterCategories.toLowerCase().includes(product.p_category[0].toLowerCase()) && filterMark.toLowerCase().includes(product.p_mark.toLowerCase()) && product.p_price >= filterPriceMin && product.p_price <= filterPriceMax) {
                        return product
                    } else {
                        setResultMessage(`No matching results for second level search`)
                    }
                } else {
                    setResultMessage(`No matching results for "${searchString}"`)
                }
            }
        }) : 'nothing')
        setProductData(filteredArr)
        console.log('searchstring without space: ' + searchString.replace(/\s+/g, ''))
        // setRenderComp(!renderComp)
        console.log(`filter1 => ${filteredArr}`)
        console.log(`filter2 => ${filteredArr2}`)
    }


    const filteredArr = (productData ? productData.filter((product) => {
        if (product.p_titel.toLowerCase().includes(searchString.toLowerCase()) || product.p_category[0].toLowerCase().includes(searchString.toLowerCase()) || product.p_mark.toLowerCase().includes(searchString.toLowerCase()) || product.p_description.toLowerCase().includes(searchString.toLowerCase()) || product.p_owner.toLowerCase().includes(searchString.toLowerCase())) {
            return product
        }
    }) : '')

    const foundMarks = filteredArr && filteredArr.map(product => product.p_mark.toLowerCase())
    const foundCateg = filteredArr && filteredArr.map(product => product.p_category)

    console.log(foundMarks)
    console.log(foundCateg)

    const counts = {};

    for (const mark of foundMarks) {
        counts[mark.toLowerCase()] = counts[mark.toLowerCase()] ? counts[mark.toLowerCase()] + 1 : 1;
    }
    for (const category of foundCateg) {
        counts[category] = counts[category] ? counts[category] + 1 : 1;
    }
    console.log(counts[['Sonstiges']])
    console.log(counts['Amazon']);




    return (
        <main id="marketplace-main">
            <MarketplaceHeader />
            <input type="search" placeholder="Suche nach Produkt, Kategorie..." onChange={handleSearch} id="search" />
            <section id="marketplace">
                <aside>
                    <div>
                        <h3>Kategorien</h3>
                        <ul>
                            <li>
                                <label htmlFor="Klamotten">
                                    <input type="checkbox" id="Klamotten" name="Klamotten" onClick={(e) => {
                                        if (e.target.checked) {
                                            if (!filterCategories.toLocaleLowerCase().search('klamotten') > -1) {
                                                setfilterCategories(filterCategories + `-Klamotten`)
                                            }
                                        } else if (!e.target.checked) {
                                            if (filterCategories.toLocaleLowerCase().search('klamotten') > -1) {
                                                setfilterCategories(filterCategories.replace(`-Klamotten`, ''))
                                            }
                                        }
                                    }}></input>
                                    Klamotten</label>
                                <span>{counts[['Klamotten']] ? counts[['Klamotten']] : '0'}</span>
                            </li>

                            <li>
                                <label htmlFor="Elektronik">
                                    <input type="checkbox" id="Elektronik" name="Elektronik" onClick={(e) => {
                                        if (e.target.checked) {
                                            if (!filterCategories.toLocaleLowerCase().search('elektronik') > -1) {
                                                setfilterCategories(filterCategories + `-Elektronik`)
                                            }
                                        } else if (!e.target.checked) {
                                            if (filterCategories.toLocaleLowerCase().search('elektronik') > -1) {
                                                setfilterCategories(filterCategories.replace(`-Elektronik`, ''))
                                            }
                                        }
                                    }}></input>
                                    Elektronik </label>

                                <span>{counts[['Elektronik']] ? counts[['Elektronik']] : '0'}</span>
                            </li>
                            <li>
                                <label htmlFor="Möbel">
                                    <input type="checkbox" id="Möbel" name="Möbel" onClick={(e) => {
                                        if (e.target.checked) {
                                            if (!filterCategories.toLocaleLowerCase().search('moebel') > -1) {
                                                setfilterCategories(filterCategories + `-Moebel`)
                                            }
                                        } else if (!e.target.checked) {
                                            if (filterCategories.toLocaleLowerCase().search('moebel') > -1) {
                                                setfilterCategories(filterCategories.replace(`-Moebel`, ''))
                                            }
                                        }
                                    }}></input>
                                    Möbel </label>
                                <span>{counts[['Möbel']] ? counts[['Möbel']] : '0'}</span>
                            </li>
                            <li>
                                <label htmlFor="Sonstiges">
                                    <input type="checkbox" id="Sonstiges" name="Sonstiges" onClick={(e) => {
                                        if (e.target.checked) {
                                            if (!filterCategories.toLocaleLowerCase().search('sonstiges') > -1) {
                                                setfilterCategories(filterCategories + `-Sonstiges`)
                                            }
                                        } else if (!e.target.checked) {
                                            if (filterCategories.toLocaleLowerCase().search('sonstiges') > -1) {
                                                setfilterCategories(filterCategories.replace(`-Sonstiges`, ''))
                                            }
                                        }
                                    }}></input>
                                    Sonstiges </label>
                                <span>{counts[['Sonstiges']] ? counts[['Sonstiges']] : '0'}</span>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3>Marken</h3>
                        <ul>
                            {foundMarks && [...new Set(foundMarks)].map((mark, i) =>
                                <li key={i}>
                                    <label htmlFor={mark}>
                                        <input type="checkbox" id={mark} name={mark} onClick={(e) => {
                                            if (e.target.checked) {
                                                if (!filterMark.toLocaleLowerCase().search(`${mark}`) > -1) {
                                                    setfilterMark(filterMark + `-${mark}`)
                                                }
                                            } else if (!e.target.checked) {
                                                if (filterMark.toLocaleLowerCase().search(`${mark}`) > -1) {
                                                    setfilterMark(filterMark.replace(`-${mark}`, ''))
                                                }
                                            }
                                        }}></input>
                                        {mark}</label>
                                    <span>{counts[mark] ? counts[mark] : '0'}</span>
                                </li>
                            )}
                        </ul>
                    </div>
                    <div className="price-filter">
                        <h3>Preis</h3>

                        <input type="range" name="priceMin" min='0' max="500" onChange={(e) => setfilterPriceMin(e.target.value)}></input>
                        <div className="min-max-container">
                            <span>Min</span>
                            <div className="min-max">{filterPriceMin}</div>
                        </div>
                        <input type="range" name="priceMax" min='500' max="5000" onChange={(e) => setfilterPriceMax(e.target.value)}></input>
                        <div className="min-max-container">
                            <span>Max</span>
                            <div className="min-max">{filterPriceMax}</div>
                        </div>

                        <div className="filter-btn">
                            <button onClick={handleFilterInputs}>Anwenden</button>
                            <button onClick={handleReset}>Reset</button>
                        </div>
                    </div>

                </aside>
                <div>
                    <p>{resultMessage}</p>
                    {/* {productData && {
                        p=() => setProductData(productData.filter((product) => {

                            if (product.p_titel.toLowerCase().includes(searchString.toLowerCase()) || product.p_category[0].toLowerCase().includes(searchString.toLowerCase()) || product.p_mark.toLowerCase().includes(searchString.toLowerCase()) || product.p_description.toLowerCase().includes(searchString.toLowerCase()) || product.p_owner.toLowerCase().includes(searchString.toLowerCase())) {
                                return product
                            }

                        }))
                    }} */}
                    {productData && (productData.filter((product) => {

                        if (product.p_titel.toLowerCase().includes(searchString.toLowerCase()) || product.p_category[0].toLowerCase().includes(searchString.toLowerCase()) || product.p_mark.toLowerCase().includes(searchString.toLowerCase()) || product.p_description.toLowerCase().includes(searchString.toLowerCase()) || product.p_owner.toLowerCase().includes(searchString.toLowerCase())) {
                            return product
                        }

                    }).map(productObj =>
                        <article key={productObj._id} >
                            <img src={productObj.p_imageUrl} alt="img"></img>
                            {/* <img src={shoes} alt="img"></img> */}
                            <div>
                                <p className="price">{productObj.p_price} EUR</p>
                                <p className="title">{productObj.p_titel}</p>
                                <p>Marke: {productObj.p_mark}</p>
                                <p>Anzahl: {productObj.p_amount}</p>
                                <p>Lieferung möglich: {productObj.p_shiping ? 'Ja' : 'Nein'}</p>
                                <p>Abholung möglich: {productObj.p_pickup ? 'Ja' : 'Nein'}</p>
                            </div>
                            <div>
                                <Link to={`/productDetail/${productObj._id}`}>Details <span className="arrow"></span> </Link>
                                <p className="like"><span className="heart"></span> Auf die Wunschliste</p>
                            </div>
                        </article>))}
                </div>
            </section>
        </main >
    );
}

export default Marketplace;