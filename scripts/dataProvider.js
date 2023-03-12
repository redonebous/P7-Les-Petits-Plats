import { recipes } from "../data/recipes.js";

function getRecettes() {
    let data = [];

    recipes.forEach((r) => {
        let o = {
            id: r.id,
            name: r.name,
            ingredients: handleIngredient(r),
            time: r.time + ' min',
            description: r.description,
            appareils: handleUpperCase(r.appliance),
            ustensils: handleUstensils(r.ustensils)
        }

        data.push(o);
    })
    return data;
}

function getIngredients() {
    let data = [];
    recipes.forEach((r) => {
        r.ingredients.forEach((i) => {
            let ingredient = i.ingredient;
            ingredient = handleUpperCase(ingredient);
            data.push(ingredient);
        })

    })
    data = data.filter((item, index) => data.indexOf(item) === index);
    return data;
}

function getAppareils() {
    let data = [];
    recipes.forEach((r) => {
        let appareil = r.appliance;
        appareil = handleUpperCase(appareil);
        data.push(appareil);
    })
    data = data.filter((item, index) => data.indexOf(item) === index);
    return data;
}

function getUstensils() {
    let data = [];
    recipes.forEach((r) => {
        r.ustensils.forEach((u) => {
            let ustensils = handleUpperCase(u);
            data.push(ustensils);
        })
    })
    data = data.filter((item, index) => data.indexOf(item) === index);

    return data;
}

function handleUpperCase(str) {
    let first = str.slice(0, 1);
    first = first.toUpperCase();
    let reste = str.slice(1);
    reste = reste.toLowerCase();

    str = first + reste;
    return str;
}


function handleUnit(i) {
    switch (i.unit) {
        case 'grammes':
            i.unit = 'g';
            break;
        case 'litres':
            i.unit = 'L';
            break;
        case 'cuillères à soupe':
            i.unit = 'càs';
            break;
        case 'cuillère à soupe':
            i.unit = 'càs';
            break;
        case 'cuillères à café':
            i.unit = 'càc';
            break;
        case 'cuillère à café':
            i.unit = 'càc';
            break;
        default:
            break
    }
    let quantity = i.quantity + ' ' + i.unit;
    return quantity;
}

function handleIngredient(r) {
    let o = [];
    r.ingredients.forEach((i) => {
        if (i.unit) {
            let quantity = handleUnit(i);
            o.push([handleUpperCase(i.ingredient), quantity]);
        } else if (i.quantity && !i.unit) {
            o.push([handleUpperCase(i.ingredient), i.quantity]);
        } else {
            o.push([handleUpperCase(i.ingredient)]);
        }
    })
    return o;
}

function handleUstensils(u) {
    let arr = [];
    u.forEach((u) => {
        u = handleUpperCase(u);
        arr.push(u);
    })
    return arr;
}

export { getRecettes, getIngredients, getAppareils, getUstensils, handleUpperCase };