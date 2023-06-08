import React from "react";
import LazyLoad from "react-lazyload";

export default function IconComponent(props){
    // function handleDownload(){
    //     alert('Downloading...')
    // }
    return(
        <div className="IconContainer">
            {/*<div className="icondisplay">*/}
               <LazyLoad height={200} once> <img src={props.img} alt={props.alt}/></LazyLoad>
            {/*</div>*/}

            <div className="nameDownload">
                {/*<div className="name">{props.name}</div>*/}
                <div className="download">
                    <img src="https://res.cloudinary.com/do5wu6ikf/image/upload/v1684618590/alx/Download_t7ulih.svg" onClick={props.onclick} alt=""/>
                </div>
            </div>
        </div>
    )
}