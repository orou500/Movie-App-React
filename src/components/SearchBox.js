import '../App.css';



const SearchBox = (props) => {
    return (
        <div className="col col-sm-4">
            <input className="form-control" placeholder="Type to Search..." value={props.value} onChange={(e) => {props.setSearchValue(e.target.value)}}/>
        </div>
    );
}

export default SearchBox;