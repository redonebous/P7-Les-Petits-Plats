import { getCard } from "../factories/card.js";
import { getRecettes, getIngredients, getAppareils, getUstensils, handleUpperCase } from "./dataProvider.js";

let state = {

    recettes: getRecettes(),
    data: [],
    display: [],
    search: [],
    ingredients: [],
    appareils: [],
    ustensils: []
}

let init = {
    ingredients: getIngredients(),
    appareils: getAppareils(),
    ustensils: getUstensils()
}

const dropIngredient = document.querySelector('.ingredient-drop');
const dropAppareils = document.querySelector('.appareil-drop');
const dropUstensile = document.querySelector('.ustensile-drop');

const inputIngredient = document.querySelector('#search-ingredient');
const inputAppareils = document.querySelector('#search-appareils');
const inputUstensile = document.querySelector('#search-ustensile');

const galery = document.querySelector('#galery');


function setWordSearch() {
    const searchInput = document.querySelector('#search-input');


    searchInput.addEventListener('input', (e) => {
        let input = e.target.value.toLowerCase();
        if (input.length > 3) {
            state.recettes.forEach((r) => {
                let str = r.name.toLowerCase();
                if (str.includes(input)) state.search.push(r);
            });
            globalSearch();
        }
    })
}

function setFilterSearch(btn) {
    btn.addEventListener('click', (e) => {

        if (e.target.classList.contains('ingredient')) state.ingredients.push(e.target.innerText);
        if (e.target.classList.contains('appareil')) state.appareils.push(e.target.innerText);
        if (e.target.classList.contains('ustensile')) state.ustensils.push(e.target.innerText);

        /* if (e.target.classList.contains('ingredient')) state.ingredients = init.ingredients.filter((i) => i == e.target.innerText); */


        globalSearch();

    })

}

function removeFilterSearch(span) {
    span.addEventListener('click', (e) => {
        if (span.classList.contains('select-ingredient')) {
            state.ingredients = state.ingredients.filter((i) => span.innerText != i);
        }
        if (span.classList.contains('select-appareil')) {
            state.appareils = state.appareils.filter((a) => span.innerText != a);
        }
        if (span.classList.contains('select-ustensile')) {
            state.ustensils = state.ingredients = state.ustensils.filter((u) => span.innerText != u);
        }

        globalSearch();

    })
}


function displayGalery(data) {
    galery.innerHTML = "";
    data.forEach((r) => {
        const card = getCard(r);
        galery.appendChild(card);
    })
}


// Génère la galery à partir de l'état du state
function globalSearch() {


    if (state.search.length > 0) {
        state.data = state.search
    } else {
        state.data = [];
    }


    state.display = [];

    if (state.ingredients.length > 0) {
        state.ingredients.forEach((i) => {
            state.recettes.forEach((r) => {
                r.ingredients.forEach((ingredient) => {
                    if (ingredient[0] == i) state.data.push(r);

                })
            })
        })
    }

    if (state.appareils.length > 0) {
        state.appareils.forEach((a) => {
            state.recettes.forEach((r) => {
                if (a == r.appareils) state.data.push(r);
            })
        })
    }

    if (state.ustensils.length > 0) {
        state.ustensils.forEach((u) => {
            state.recettes.forEach((r) => {
                r.ustensils.forEach((ustensile) => {
                    if (ustensile == u) state.data.push(r);
                })
            })
        })
    }

    state.data = state.data.filter((item, index) => state.data.indexOf(item) === index);

    state.data.forEach((data) => {
        console.log(checkIngredients(data));
        if (checkIngredients(data) && checkAppareils(data) && checkUstensils(data)) state.display.push(data);
    })

    console.log(state.ingredients);

    state.display = state.display.filter((item, index) => state.display.indexOf(item) === index);


    console.log(state.display);

    if (state.display.length > 0) {
        displayGalery(state.display);
    } else {
        displayGalery(state.recettes);
    }

}

function checkIngredients(data) {
    let bool = true;
    let arr = [];
    let check = [];
    data.ingredients.forEach((ingredient) => arr.push(ingredient[0]));

    if (state.ingredients.length > 0) {
        state.ingredients.forEach((i) => {
            arr.filter((item, index) => arr.indexOf(item) === index);
            if (arr.includes(i)) {
                check.push(i);
            } else {
                bool = false;
            }
        })

        if (data.ingredients.length == check.length) bool = true;
    }

    return bool;
}

function checkAppareils(data) {
    let bool = true;
    if (state.appareils.length > 0) {
        state.appareils.forEach((a) => {
            if (data.appareils == a) {
                bool = true;
            } else {
                bool = false;
            }
        })
    }

    return bool;
}

function checkUstensils(data) {
    let bool = true;
    let check = [];
    if (state.ustensils.length > 0) {
        state.ustensils.forEach((u) => {
            if (data.ustensils.includes(u)) {
                check.push(u);
            } else {
                bool = false;
            }
        })

        if (check.length == state.ustensils.length) bool = true;
    }

    return bool;
}




function setFilterInput(i, a, u) {


    inputIngredient.addEventListener('input', (e) => {
        let input = e.target.value.toLowerCase();
        let data = [];

        if (input.length > 0) {
            i.forEach((i) => {
                let str = i.toLowerCase();
                if (str.includes(input)) data.push(i);
            });
            fillFilterDrop(dropIngredient, data, 'ingredient');
        } else {
            fillFilterDrop(dropIngredient, i, 'ingredient')
        }

    });

    inputAppareils.addEventListener('input', (e) => {
        let input = e.target.value.toLowerCase();
        let data = [];

        if (input.length > 0) {
            a.forEach((a) => {
                let str = a.toLowerCase();
                if (str.includes(input)) data.push(a);
            });
            fillFilterDrop(dropAppareils, data, 'appareil');
        } else {
            fillFilterDrop(dropAppareils, a, 'appareil');
        }

    });

    inputUstensile.addEventListener('input', (e) => {
        let input = e.target.value.toLowerCase();
        let data = [];

        if (input.length > 0) {
            u.forEach((u) => {
                let str = u.toLowerCase();
                if (str.includes(input)) data.push(u);
            });
            fillFilterDrop(dropUstensile, data, 'ustensile')
        } else {
            fillFilterDrop(dropUstensile, u, 'ustensile')
        }

    });

}


// Nettoie et rempli le dropdown avec la data transmise
function fillFilterDrop(drop, data, type) {
    drop.innerHTML = "";
    data.forEach((item) => {
        const button = document.createElement('button');
        button.classList.add('btn-filtre');
        button.classList.add(type);
        button.innerText = item;
        drop.appendChild(button);
        setBtnDrop(button);
        setFilterSearch(button);
    })

}


// Gère l'ouverture et la fermeture du dropdown des filtres
function setDropDownFilter(i, a, u) {
    const openDrops = document.querySelectorAll('.open-drop');
    const inputFilters = document.querySelectorAll('.input-filtre');
    const filtres = document.querySelectorAll('.filtre');

    openDrops.forEach((drop) => {
        drop.addEventListener('click', (e) => {
            let filtre = e.target.parentNode.parentNode;

            if (filtre.classList.contains('drop-active')) {
                filtre.classList.remove('drop-active');
            } else if (!filtre.classList.contains('drop-active')) {
                filtres.forEach((f) => {
                    f.classList.remove('drop-active');
                })

                filtre.classList.add('drop-active');
            }

            inputFilters.forEach((input) => {
                input.value = "";
            })

            handlePlaceHolderChange(filtre);


            fillFilterDrop(dropIngredient, i, 'ingredient');
            fillFilterDrop(dropAppareils, a, 'appareil');
            fillFilterDrop(dropUstensile, u, 'ustensile');

        })
    });

    inputFilters.forEach((input) => {
        input.addEventListener('input', (e) => {
            let filtre = e.target.parentNode.parentNode;
            if (e.target.value.length > 0 && !filtre.classList.contains('drop-active')) {
                // Ouverture du dropdown via l'input
                filtres.forEach((f) => {
                    if (f.classList.contains('drop-active')) {
                        f.classList.remove('drop-active');
                    }
                })
                filtre.classList.add('drop-active');


                handlePlaceHolderChange(filtre);
            } else if (e.target.value.length == 0 && filtre.classList.contains('drop-active')) {
                // Fermeture du dropdown via l'input
                filtre.classList.remove('drop-active');
                handlePlaceHolderChange(filtre);
            }
        })
    })

}


// Gère l'envoi du filtre depuis le dropdown jusqu'à l'encart des filtres 
function setBtnDrop(btn) {
    const selected = document.querySelector('.filtre-selected');
    btn.addEventListener('click', (e) => {
        const span = document.createElement('span');
        span.classList.add('selected');
        span.innerHTML = `${e.target.innerText} <i class="fa-regular fa-circle-xmark"></i>`

        if (e.target.classList.contains('ingredient')) span.classList.add('select-ingredient');
        if (e.target.classList.contains('appareil')) span.classList.add('select-appareil');
        if (e.target.classList.contains('ustensile')) span.classList.add('select-ustensile');

        selected.appendChild(span);

        removeFilterSearch(span);
        setSelectedDrop(span);

        btn.remove();

    })
}

// Gère l'envoi du filtre depuis l'encart des filtres jusqu'au dropdown
function setSelectedDrop(span) {
    span.addEventListener('click', (e) => {
        let btnNew = document.createElement('button')
        btnNew.innerText = span.innerText;
        btnNew.classList.add('btn-filtre');

        if (span.classList.contains('select-ingredient')) {
            btnNew.classList.add('ingredient');
            document.querySelector('.ingredient-drop').appendChild(btnNew);
        }
        if (span.classList.contains('select-appareil')) {
            btnNew.classList.add('appareil');
            document.querySelector('.appareil-drop').appendChild(btnNew);
        }
        if (span.classList.contains('select-ustensile')) {
            btnNew.classList.add('ustensile');
            document.querySelector('.ustensile-drop').appendChild(btnNew);
        }

        setFilterSearch(btnNew);
        setBtnDrop(btnNew);

        span.remove();

    })
}



function handlePlaceHolderChange(filtre) {
    if (filtre.classList.contains('filtre-ingredient') && filtre.classList.contains('drop-active')) {
        let input = document.querySelector('#search-ingredient');
        input.setAttribute('placeholder', 'Rechercher un ingrédient...');
    } else {
        document.querySelector('#search-ingredient').setAttribute('placeholder', 'Ingrédients')
    }

    if (filtre.classList.contains('filtre-appareil') && filtre.classList.contains('drop-active')) {
        let input = document.querySelector('#search-appareils');
        input.setAttribute('placeholder', 'Rechercher un appareil...');
    } else {
        document.querySelector('#search-appareils').setAttribute('placeholder', 'Appareils')

    }

    if (filtre.classList.contains('filtre-ustensile') && filtre.classList.contains('drop-active')) {
        let input = document.querySelector('#search-ustensile');
        input.setAttribute('placeholder', 'Rechercher un ustensile...');
    } else {
        document.querySelector('#search-ustensile').setAttribute('placeholder', 'Ustensiles')
    }
}



export { setWordSearch, setFilterInput, setFilterSearch, removeFilterSearch, setDropDownFilter, setBtnDrop }; 