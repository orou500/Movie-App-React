import '../App.css';


const MovieListHeading = (props) => {
    return (
        <div className="col col-sm-7">
            <h1>{props.heading}</h1>
        </div>
    );
}

export default MovieListHeading;