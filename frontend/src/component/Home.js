import NavBar from '../component/NavBar/Navbar';
import SearchFilter from "../component/SearchFilter/SearchFilter";

export default  function Home() {
    return (
        <div className='force'>
            <NavBar/>
            <SearchFilter/>
        </div>
    );
}

