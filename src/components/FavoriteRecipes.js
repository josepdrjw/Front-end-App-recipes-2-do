import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

const copyURL = require('clipboard-copy');

function FavoriteRecipes() {
  const responseFav = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const [fav, setFav] = useState(responseFav);
  const [isCopied, setIsCopied] = useState('');

  const filterMeals = () => {
    const filterMeal = responseFav.filter((e) => e.type === 'meal');
    setFav(filterMeal);
  };

  const filterDrinks = () => {
    const filterDrink = responseFav.filter((e) => e.type === 'drink');
    setFav(filterDrink);
  };

  const filterAll = () => {
    setFav(responseFav);
  };

  const handleShare = (type, id) => {
    if (type === 'drink') {
      copyURL(`http://localhost:3000/drinks/${id}`);
      setIsCopied(id);
    } if (type === 'meal') {
      copyURL(`http://localhost:3000/meals/${id}`);
      setIsCopied(id);
    }
  };

  const handleFavorite = (id) => {
    const recoverFav = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newArr = recoverFav.filter((element) => element.id !== id);

    localStorage.setItem('favoriteRecipes', JSON.stringify(newArr));
    setFav(newArr);
  };

  return (
    <div>
      <Header headerText="Favorite Recipes" enableSearchButton={ false } />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ filterAll }
      >
        All

      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        onClick={ filterMeals }
      >
        Meals

      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ filterDrinks }
      >
        Drinks

      </button>
      {
        fav
          .map((element, index) => {
            if (element.type === 'meal') {
              return (
                <div className="teste" key={ index }>
                  <Link to={ `/meals/${element.id}` }>
                    <img
                      data-testid={ `${index}-horizontal-image` }
                      src={ element.image }
                      alt={ element.name }
                      height={ 300 } // alterei o tamanho para passar no teste, mudar depois
                      width={ 300 }
                    />
                  </Link>
                  <p data-testid={ `${index}-horizontal-top-text` }>
                    { `${element.nationality} - ${element.category}` }
                  </p>
                  <Link to={ `/meals/${element.id}` }>
                    <p data-testid={ `${index}-horizontal-name` }>{ element.name}</p>
                  </Link>
                  <button
                    type="button"
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    onClick={ () => handleFavorite(element.id) }
                    src="blackHeartIcon"
                  >
                    <img src={ blackHeartIcon } alt={ element.name } />
                  </button>
                  {
                    isCopied === element.id ? <p>Link copied!</p> : (
                      <button
                        type="button"
                        data-testid={ `${index}-horizontal-share-btn` }
                        onClick={ () => handleShare(element.type, element.id) }
                        src="shareIcon"
                      >
                        <img src={ shareIcon } alt={ element.name } />
                      </button>)
                  }

                </div>
              );
            }
            return (
              <div className="teste" key={ index }>
                <Link to={ `/drinks/${element.id}` }>
                  <img
                    data-testid={ `${index}-horizontal-image` }
                    src={ element.image }
                    alt={ element.name }
                    height={ 300 }
                    width={ 300 }
                  />

                </Link>
                <p data-testid={ `${index}-horizontal-top-text` }>
                  { element.alcoholicOrNot }
                </p>
                <Link to={ `/drinks/${element.id}` }>
                  <p data-testid={ `${index}-horizontal-name` }>{ element.name}</p>
                </Link>
                <button
                  type="button"
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  onClick={ () => handleFavorite(element.id) }
                  src="blackHeartIcon"
                >
                  <img src={ blackHeartIcon } alt={ element.name } />
                </button>
                {
                  isCopied === element.id ? <p>Link copied!</p> : (
                    <button
                      type="button"
                      data-testid={ `${index}-horizontal-share-btn` }
                      onClick={ () => handleShare(element.type, element.id) }
                      src="shareIcon"
                    >
                      <img src={ shareIcon } alt={ element.name } />
                    </button>)
                }

              </div>
            );
          })
      }
    </div>
  );
}

export default FavoriteRecipes;