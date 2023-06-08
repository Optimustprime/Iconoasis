import NavBar from '../component/NavBar/Navbar';
import SearchFilter from "../component/SearchFilter/SearchFilter";
import NounProjectSearch from "./SearchFilter/test";
import MyComponent from "./SearchFilter/test";

export default  function Home() {
    return (
        <div className='force'>
            <NavBar/>
            <SearchFilter/>
            <MyComponent/>
        </div>
    );
}

