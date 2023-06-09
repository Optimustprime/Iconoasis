import React, {useState, useEffect} from "react";
import IconComponent from "../IconComponent/IconComponent";
import axios from "axios";


export default  function SearchFilter () {

    const [query, setQuery] = React.useState('')
    const [True, setTrue] = React.useState(false)
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
            setTrue(true);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };




    const downloadImage = async (url, name) => {
        try {
            const img = new Image();
            img.src = url;
            img.onload = async () => {
                try {
                    const response = await fetch(url);
                    const contentType = response.headers.get('content-type');
                    const extension = contentType.split('/')[1];
                    if (extension !== 'jpeg' && extension !== 'png' && extension !== 'gif') {
                        throw new Error('Invalid file type');
                    }
                    alert('downloading...');
                    const blob = await response.blob();
                    const objectUrl = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = objectUrl;
                    link.download = `${name}.${extension}`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(objectUrl);

                } catch (error) {
                    console.error(error);
                }
            };
        } catch (error) {
            console.error(error);
        }
    };




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
                {True && <div className='strong'>Showing Result for: <strong>{query}</strong></div>}
                <tbody>

                    {images.map((image) => (

                        <td key={image.id}>
                            <IconComponent img={image.src.medium} name={image.alt} onclick={() => downloadImage(image.src.original, image.alt)}/>
                        </td>

                    ))}
                </tbody>
            </table>
            :
            <h1 className='testing'>Your one stop PHOTO Destination</h1>
            }
        </div>
    )}