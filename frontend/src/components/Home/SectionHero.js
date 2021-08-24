import { useState } from 'react';
import { Link } from "react-router-dom";

const Hero = () => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    console.log(setUser);

    return ( 
        <section id="hero">
            <div>
        <h1>Hilf mit die Umwelt zu schützen</h1>
        <p>Abfälle bedrohen Vögel, Delfine und Co. Mehr als zehn Millionen Tonnen Abfälle gelangen jährlich in die Ozeane.
        Sie kosten Abertausende Meerestiere das Leben. Seevögel verwechseln Plastik mit natürlicher Nahrung, 
        Delfine verfangen sich in alten Fischernetzen. Hilf mit Müll zu reduzieren und trashnothing.
        </p>
        {user?.result ? (
                    <>
                        <Link to="/marketplace"><li>Starte jetzt!</li></Link>
                    </>
                ) : (
                    <Link to="/auth/login"><li>Starte jetzt!</li></Link>
                )}
        </div>
        </section>
     );
}
 
export default Hero;