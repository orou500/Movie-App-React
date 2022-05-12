import { useState, useEffect } from 'react';
import useLocalStorage from 'use-local-storage'
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from "./components/AddFavourites";
import RemoveFavourites from './components/RemoveFavourites';
import Footer from './components/Footer';

function App() {

  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme) 
  }

  const [movies, setMovies] = useState([]);
  const [favourite, setFavourite] = useState([]);
  const [searchValue, setSearchValue] = useState('');

const getMovieRequest = async (searchValue) => {
  const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=bea53104`
  const response = await fetch(url)
  const responseJson = await response.json();

  if(responseJson.Search){
    setMovies(responseJson.Search)
  }
}

useEffect(() => {
  getMovieRequest(searchValue);
}, [searchValue])

useEffect(() => {
  const movieFavourites = JSON.parse(localStorage.getItem('movie-app-favourites'))
  setFavourite(movieFavourites)
}, [])

const saveToLocalStorage = (items) => {
  localStorage.setItem('movie-app-favourites', JSON.stringify(items))
}

const addFavouriteMovie = (movie) => {
  if(!favourite.includes(movie)){
    const newFavouriteList = [movie, ...favourite]
    saveToLocalStorage(newFavouriteList)
    return setFavourite(newFavouriteList)
  } else {
    alert('The Movie Is Already In Your Favourite')
  }
}

const RemoveFavouriteMovie = (movie) => {
  const newFavouriteList = favourite.filter((favourite) =>
    favourite.imdbID !== movie.imdbID
  )
  saveToLocalStorage(newFavouriteList)
  setFavourite(newFavouriteList)
}

  return (
      <div className="container-fluid movie-app" data-theme={theme}>
        <div className='row d-flex align-items-center mt-4 mb-4'>
          <MovieListHeading heading="Movies"/>
          <button className="change-theme-btn col" onClick={switchTheme}>
          {(() => {
              if (theme === 'light') {
                return (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-moon-fill" viewBox="0 0 16 16">
                  <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/>
                  </svg>
                )
              } else {
                return (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-brightness-high" viewBox="0 0 16 16">
                  <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
                  </svg>
                )
              }
          })()}
          </button>
          <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
        </div>
        <div className='row'>
          <MovieList movies={movies} handleFavouritesClick={addFavouriteMovie} favouriteComponent={AddFavourites}/>
        </div>
          <div className='row d-flex align-items-center mt-4 mb-4'>
          <MovieListHeading heading="My Favourites"/>
          </div>
        <div className='row'>
          <MovieList movies={favourite} handleFavouritesClick={RemoveFavouriteMovie} favouriteComponent={RemoveFavourites}/>
        </div>
          <Footer />
      </div>
  );
}

export default App;
