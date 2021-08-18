import './Home.scss'

import Hero from "./SectionHero";
import SectionLiveDifferent from './SectionLiveDiffernt';
import SectionColor from './SectionColor';
import SectionPeople from './SectionPeople';

const Home = () => {
    return (
        <main>
            <div id="home">
            <Hero />
            <SectionLiveDifferent />
            <SectionColor />
            <SectionPeople />
            </div>
        </main>
    );
}

export default Home;