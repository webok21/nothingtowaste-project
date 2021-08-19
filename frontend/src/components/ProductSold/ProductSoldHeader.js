const ProductSoldHeader = () => {
    return (
        <section className="marketplace-headers">
            <h1>Mit diesen Artikeln konnten wir schon Müll vermeiden</h1>
            <form action="" method="post">
                <input type="search" placeholder="Suche nach Produkt, Kategorie..." />
                <div className="submit-input">
                    <input type="submit" name="submit" value="Produkt einstellen" />
                </div>
            </form>
        </section>
    );
}

export default ProductSoldHeader;