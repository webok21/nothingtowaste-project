// import './Slider.scss'
// //https://stackoverflow.com/questions/4753946/html5-slider-with-two-inputs-possible
// const Slider = () => {
//     return (
//         <div slider id="slider-distance">
//             <div>
//                 <div inverse-left style="width:70%;"></div>
//                 <div inverse-right style="width:70%;"></div>
//                 <div range style="left:0%;right:0%;"></div>
//                 <span thumb style="left:0%;"></span>
//                 <span thumb style="left:100%;"></span>
//                 <div sign style="left:0%;">
//                     <span id="value">0</span>
//                 </div>
//                 <div sign style="left:100%;">
//                     <span id="value">100</span>
//                 </div>
//             </div>
//             <input type="range" value="0" max="100" min="0" step="1" oninput="
//                 this.value=Math.min(this.value,this.parentNode.childNodes[5].value-1);
//                 let value = (this.value/parseInt(this.max))*100
//                 var children = this.parentNode.childNodes[1].childNodes;
//                 children[1].style.width=value+'%';
//                 children[5].style.left=value+'%';
//                 children[7].style.left=value+'%';children[11].style.left=value+'%';
//                 children[11].childNodes[1].innerHTML=this.value;" >
//             </input>

//             <input type="range" value="100" max="100" min="0" step="1" oninput="
//                 this.value=Math.max(this.value,this.parentNode.childNodes[3].value-(-1));
//                 let value = (this.value/parseInt(this.max))*100
//                 var children = this.parentNode.childNodes[1].childNodes;
//                 children[3].style.width=(100-value)+'%';
//                 children[5].style.right=(100-value)+'%';
//                 children[9].style.left=value+'%';children[13].style.left=value+'%';
//                 children[13].childNodes[1].innerHTML=this.value;">
//             </input>
//         </div>
//     );
// }

// export default Slider;
