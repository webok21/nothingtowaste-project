import Nav from '../Navigation/Nav';
import './Error.scss';
import trash from '../../img/404/trash.png'

const Error = () => {
    return (
        <main id="error-main">
            <Nav />
            <h2>
                404 - SEITE NICHT GEFUNDEN
            </h2>
            <p>
                Anscheinend hat jemand die gesuchte Seite in den Müll geworfen.<br></br>
                Damit wir dich auf möglichst viele Seiten weiterleiten können,<br></br>
                bitten wir dich, nichts wegzuwerfen, sondern bei uns zu verkaufen bzw. zu verschenken. <br></br>Für dich und für unsere Umwelt.
            </p>
            <img src={trash} alt="" />

        </main>
    );
}

export default Error;