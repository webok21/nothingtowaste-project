import Verkaufen from '../../img/home/verkaufen.png'
import Verschenken from '../../img/home/verschenke.png'
import Umwelt from '../../img/home/umwelt.png'
import Iphone from '../../img/home/iphone.png'
import Umwelt2 from '../../img/home/top-image.png'
import Umwelt3 from '../../img/home/bottom-image.png'

const SectionLiveDifferent = () => {
    return ( 
        <section id="live-different">
            <h2>Lebe eCommerce mal anders</h2>
            <div>
                <article>
                    <img src={Iphone} alt="" />
                    <img src={Verkaufen} alt="" />
                    <h3>Verkaufen statt wegwerfen</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus faucibus egestas neque, quis nunc in turpis cursus eget.</p>
                </article>
                <article>
                    <img src={Verschenken} alt="" />
                    <h3>Verschenke und schütze</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus faucibus egestas neque, quis nunc in turpis cursus eget.</p>
                </article>
                <article>
                <img src={Umwelt2} alt="" />
                <img src={Umwelt3} alt="" />
                    <img src={Umwelt} alt="" />
                    <h3>Der Umwelt zuliebe</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus faucibus egestas neque, quis nunc in turpis cursus eget.</p>
                </article>
            </div>
        </section>
    );
}
 
export default SectionLiveDifferent;