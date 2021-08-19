const MarketplaceHeader = () => {
    return (
        <section className="marketplace-headers">
            <h1>Hilf mit die Umwelt zu schützen</h1>
            <p>Abfälle bedrohen Vögel, Delfine und Co. Mehr als zehn Millionen Tonnen Abfälle gelangen jährlich in die Ozeane.
                Sie kosten Abertausende Meerestiere das Leben. Seevögel verwechseln Plastik mit natürlicher Nahrung,
                Delfine verfangen sich in alten Fischernetzen. Hilf mit Müll zu reduzieren und trashnothing.
            </p>
            <form action="" method="GET">
                <input type="search" placeholder="Suche nach Produkt, Kategorie..." />
                <div className="submit-input">
                    <input type="submit" name="submit" value="Produkt einstellen" />
                </div>
            </form>
        </section>
    );
}

export default MarketplaceHeader;