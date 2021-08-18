import insta from '../../img/social/insta.png';
import facebook from '../../img/social/facebook.png';
import wiwi from '../../img/social/wiwi.png';
import twitter from '../../img/social/twitter.png';
import circle from '../../img/home/circle-footer.png';
import './FooterStyle.scss';

const Footer = () => {
    return (
        <footer>
            <section id="footer-register">
                <h4>nothingtotrash - eine online Plattform um Müll zu vermeiden.</h4>
                <button>Registriere Dich</button>
                <img src={circle} alt="circle" />
            </section>
            <section id="footer-icons">
                <div className="icons">
                    <a href="http://www.twitter.com"><img src={twitter} alt="twitter" /></a>
                    <a href="http://www.facebook.com"><img src={facebook} alt="facebook" /></a>
                    <a href="/"><img src={wiwi} alt="wiwi" /></a>
                    <a href="http://www.instagram.com"><img src={insta} alt="insta" /></a>
                </div>
                <div className="copyright">
                    <p>COPYRIGHT © nothingtotrash 2021 -
                        <a href="/">TERMS & CONDITIONS </a>
                        <a href="/">PRIVACY POLICY</a>
                    </p>
                </div>
            </section>
        </footer>
    );
}

export default Footer;

