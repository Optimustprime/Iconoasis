import React, {useState, useEffect} from "react";
import IconComponent from "../IconComponent/IconComponent";
import axios from "axios";


export default  function SearchFilter () {

    const [query, setQuery] = React.useState('')
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


    function downloadImage(url) {
        const link = document.createElement("a");
        link.href = url;
        link.download = "image.jpg";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        console.log(url)
    }


    function handleKeyDown(event){
        if(event.key === 'Enter'){
            handleSearch();
        }
    }


    return(
        <div className="center">


            <div className='filterBody'>

                <div className="searchInput">
                    <input type="text"
                           placeholder='Search you Images.....'
                           value={query}
                           onKeyDown={handleKeyDown}
                           onChange={(event) => setQuery(event.target.value)}
                    />

                    <button className='btn-- format' onClick={handleSearch}>
                        Search
                    </button>

                </div>

            </div>

            {query ?

            <table>
                <div className='strong'>Showing Result for: <strong>{query}</strong></div>
                <tbody>


            {images.map((image) => (

                <td key={image.id}>
                    <IconComponent  img={image.src.medium} name={image.alt} onclick={() => downloadImage(image.src.original)}/>
                </td>

            ))}
                </tbody>
            </table>
            :
            <h1 className='testing'>Your one stop PHOTO Destination</h1>
            }
        </div>
    )}