import { async } from 'regenerator-runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchview.js';
import resultsView from './views/resultsView.js';
import bookmarkView from './views/bookmarkView.js';
import paginationView from './views/paginationView.js';
import addRecipeView from './views/addRecipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

if (module.hot) {
  module.hot.accept();
}

// const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
//we will create a async function so that we can make a single await

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    // recipeView.renderSpinner();

    //load recipe
    await model.loadRecipe(id);
    const { recipe } = model.state;
    //rendering recipe
    recipeView.render(model.state.recipe);
    bookmarkView.render(model.state.bookmarks);
    //test
    // controlServings();
  } catch (err) {
    // alert(err);
    recipeView.renderError();
  }
};
// controlRecipes();

const controlSearchResults = async function () {
  try {
    //load the spinner
    // resultsView.renderSpinner();
    // bookmarkView.addHandlerRender(controlBookmark);

    // bookmarkView.render(model.state.bookmarks);

    //get search query
    const query = searchView.getQuery();
    if (!query) return;
    recipeView.renderSpinner();

    //load search results
    await model.loadSearchResults(query);

    // render results
    // console.log(model.state.search.results);

    //view only 10 per page
    resultsView.render(model.getSearchResultsPage());

    //view all results
    // resultsView.render(model.state.search.results);

    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

// controlSearchResults('pizza');

const controlPagination = function (goToPage) {
  console.log(goToPage);
  //render new results
  resultsView.render(model.getSearchResultsPage(goToPage));

  //render new pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //update the recipe servings
  model.updateServings(newServings);

  //update the recipe view

  recipeView.render(model.state.recipe);
};

const controlAddBookmark = function () {
  //add/remove the bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // console.log(model.state.recipe);
  //update recipe view
  recipeView.render(model.state.recipe);

  //render bookmarks
  bookmarkView.render(model.state.bookmarks);
};

const controlBookmark = function () {
  bookmarkView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  // console.log(newRecipe);
  try {
    //uplaod the new recipe
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    //render recipe
    recipeView.render(model.state.recipe);
    //success message
    addRecipeView.renderMessage();

    //render bookmark view
    bookmarkView.render(model.state.bookmarks);

    //change ID in url
    window.history.pushState(null, '', `${model.state.recipe.id}`);

    //close the form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, 2500);
  } catch (err) {
    console.error('ERROR', err);
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  bookmarkView.addHandlerRender(controlBookmark);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
