import { recipes } from "../data/recipes.js";
import { getRecettes, getIngredients, getAppareils, getUstensils } from "./dataProvider.js";
import { getCard } from "../factories/card.js";
import { setFilterInput, setWordSearch, setFilterSearch, setDropDownFilter, setBtnDrop } from "./search.js";

const galery = document.querySelector('#galery');
const dropIngredient = document.querySelector('.ingredient-drop');
const dropAppareils = document.querySelector('.appareil-drop');
const dropUstensile = document.querySelector('.ustensile-drop');



const recettes = getRecettes();
const ingredients = getIngredients();
const ustensils = getUstensils();
const appareils = getAppareils();

recettes.forEach((r) => {
    const card = getCard(r);
    galery.appendChild(card);
})

/* ingredients.forEach((i) => {
    const button = document.createElement('button');
    button.classList.add('btn-filtre');
    button.classList.add('ingredient');
    button.innerText = i;
    dropIngredient.appendChild(button);
    setBtnDrop(button);
    setFilterSearch(button);
})

appareils.forEach((a) => {
    const button = document.createElement('button');
    button.classList.add('btn-filtre');
    button.classList.add('appareil');
    button.innerText = a;
    dropAppareils.appendChild(button);
    setBtnDrop(button);
    setFilterSearch(button);
})

ustensils.forEach((u) => {
    const button = document.createElement('button');
    button.classList.add('btn-filtre');
    button.classList.add('ustensile');
    button.innerText = u;
    dropUstensile.appendChild(button);
    setBtnDrop(button);
    setFilterSearch(button);
})
 */



setWordSearch(recettes);
setFilterInput(ingredients, appareils, ustensils);
setDropDownFilter(ingredients, appareils, ustensils);



/* const ingredients = getIngredients();
const appareils = getAppareils();
const ustensils = getUstensils(); */



