import '../App.css';
import MovieName from './MovieName';


const MovieList = (props) => {

    const FavouriteComponent = props.favouriteComponent

    return (
        <>
            {props.movies.map((movie, index) => (
                <div className="image-container d-flex justify-content-start m-3 movie">
                    <img src={movie.Poster} alt='movie'></img>
                    <div className='overlay-Name'>
                        <MovieName MovieName={movie.Title}/>
                    </div>
                    <div onClick={() => props.handleFavouritesClick(movie)} className="overlay d-flex align-items-center justify-content-center">
                        <FavouriteComponent />
                    </div>
                </div>
            ))}
        </>
    );
}

export default MovieList;