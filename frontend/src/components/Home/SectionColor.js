import {
    Link
} from "react-router-dom";

import Limit1 from '../../img/home/limits-1.png'
import Limit2 from '../../img/home/limits-2.png'

const SectionColor = () => {
    return ( 
       <section id="color">
           <div>
           <article>
               <img src={Limit1} alt="" />
               <div className="article-text">
                   <h3>Ohne Limits</h3>
                   <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus faucibus egestas neque, quis nunc in turpis cursus eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus faucibus egestas neque, quis nunc in turpis cursus eget.</p>
                   <Link to="/"><li>Zur Dokumentation</li></Link>
               </div>
           </article>
           <article>
              
               <div className="article-text">
                   <h3>Kenne deine Community</h3>
                   <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus faucibus egestas neque, quis nunc in turpis cursus eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus faucibus egestas neque, quis nunc in turpis cursus eget.</p>
                   <Link to="/"><li>Zur Dokumentation</li></Link>
               </div>
               <img src={Limit2} alt="" />
           </article>
           </div>
       </section>
     );
}
 
export default SectionColor;