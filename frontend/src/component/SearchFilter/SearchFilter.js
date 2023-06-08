import React, {useState, useEffect} from "react";
import IconComponent from "../IconComponent/IconComponent";
import axios from "axios";
// import {LazyLoadImage} from "react-lazy-load-image-component";
//import "react-lazy-load-image-component/src/effects/blur.css"
//import {Icons} from "./searchicondata";//dummy api call


export default  function SearchFilter () {

    const [query, setQuery] = React.useState('')
    // const [dropDown, setDropdown] = React.useState(false)
    // const [selectItem, setSelectItem] = React.useState('PNG');
    // const icons = Object.values(jsonData.icon);

    const [images, setImages] = useState([]);

    useEffect(() => {
        const storedQuery = localStorage.getItem("searchQuery");
        if (storedQuery) {
            setQuery(storedQuery);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("searchQuery", query);
    }, [query]);


    const handleSearch = async () => {
        try {
            const response = await axios.get('https://api.pexels.com/v1/search', {
                headers: {
                    Authorization: 'yjfayPK3Nbm3wKzvDFp8dzYD62TZnPO0lqkLdVPehOpSNj3m2aGixdZ4',
                },
                params: {
                    query: query,
                    per_page: 100, // Number of images per page (adjust as needed)
                },
            });

            setImages(response.data.photos);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };




    // function handleDropdown(){
    //     if(!dropDown){
    //         setDropdown(true)
    //     }else{
    //         setDropdown(false)
    //     }
    // }
    //
    // function handleSelection(x){
    //     setSelectItem(x);
    //     setDropdown(false)
    // }

    function downloadImage(url) {
        const link = document.createElement("a");
        link.href = url;
        link.download = "image.jpg";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }


    function handleKeyDown(event){
        if(event.key === 'Enter'){
            handleSearch();
        }
    }


    return(
        <div className="center">


            <div className='filterBody'>
                {/*<div className="selectFormat" >*/}

                {/*    <div className="format" onClick={handleDropdown}>{selectItem}*/}
                {/*        <span className='dropdown' >*/}
                {/*            <img src="https://res.cloudinary.com/do5wu6ikf/image/upload/v1684572720/alx/Down_arrow_x9x9ni.svg" alt=""/>*/}
                {/*        </span>*/}
                {/*    </div>*/}

                {/*    {dropDown &&  <div className="formatDropdown">*/}
                {/*        <ul>*/}
                {/*            <li onClick={() => handleSelection('PNG')}>PNG</li>*/}
                {/*            <li className='line' onClick={() => handleSelection('ICO')}>ICO</li>*/}
                {/*            <li className='line' onClick={() => handleSelection('AI')}>AI</li>*/}
                {/*            <li className='line' onClick={() => handleSelection('SVG')}>SVG</li>*/}
                {/*        </ul>*/}
                {/*    </div>}*/}

                {/*</div>*/}

                <div className="searchInput">
                    <input type="text"
                           placeholder='Search you Images.....'
                           value={query}
                           onKeyDown={handleKeyDown}
                           onChange={(event) => setQuery(event.target.value)}
                    />
                    {/*<ul className="searchlist">*/}
                    {/*    {Icons.filter((icon) => icon.name.toLowerCase().includes(query)*/}
                    {/*    ).map((icon) => (*/}
                    {/*        <li key={icon.id}>{icon.name}</li>*/}
                    {/*    ))}*/}
                    {/*</ul>*/}
                    <button className='btn-- format' onClick={handleSearch}>
                        Search
                    </button>

                </div>


                {/*<p>{searchicondata.icon[0].format}</p>*/}
            </div>

            <table>
                <tbody>
            {/*    {images.filter(image => image.alt.some(filter => filter.toLowerCase().includes(query.toLowerCase()))*/}
            {/*        // && icon.format.toLowerCase() === selectItem.toLowerCase()// since there is no format*/}
            {/*    ).map((image) => ( <td key={image.id}>*/}
            {/*            <IconComponent*/}
            {/*                img={image.src.medium}*/}
            {/*                name={image.alt}*/}
            {/*            />*/}
            {/*        </td>*/}
            {/*    ))}*/}

            {images.map((image) => (

                <td key={image.id}>
                    <IconComponent  img={image.src.medium} name={image.alt} onclick={() => downloadImage(image.src.original)}/>
                </td>

            ))}
                </tbody>
            </table>
        </div>
    )}