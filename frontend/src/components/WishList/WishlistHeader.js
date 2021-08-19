import './Wishlist.scss'

const WishlistHeader = () => {
    return (
        <section className="marketplace-headers">
            <h1>Diese Artikel hättest du gerne</h1>
            <form action="/" method="GET" id="form">
                <input type="search" placeholder="Suche nach Produkt, Kategorie..." id="search-field" />
                <div className="submit-input">
                    <input type="submit" name="submit" value="Produkt einstellen" />
                </div>
            </form>
        </section >
    )
}

export default WishlistHeader;