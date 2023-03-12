function getCard(data) {
    let { id } = data;

    const card = document.createElement('article');
    card.setAttribute('id', `card-${id}`);
    card.classList.add('card');

    const img = document.createElement('div');
    img.classList.add('img-card');

    const recette = document.createElement('div');
    recette.classList.add('recette');
    recette.setAttribute('id', `recette-${id}`);

    const top = getTopSide(data);

    const sideL = getLeftSide(data);
    const sideR = getRightSide(data);



    recette.appendChild(sideL);
    recette.appendChild(sideR);

    card.appendChild(img);
    card.appendChild(top);
    card.appendChild(recette);

    return card;

}

function getTopSide({ name, time }) {
    const top = document.createElement('div');
    top.classList.add('top-card');

    const title = document.createElement('span');
    title.classList.add('title');
    title.textContent = name;

    const timming = document.createElement('span');
    timming.classList.add('time');
    timming.innerHTML = `<i class="fa-regular fa-clock"></i>`
    timming.textContent = time;

    top.appendChild(title);
    top.appendChild(timming);

    return top;

}

function getRightSide({ description }) {
    const sideR = document.createElement('div');
    sideR.classList.add('side-right');
    const desc = document.createElement('p');
    desc.classList.add('desc');


    desc.textContent = description;

    sideR.appendChild(desc);

    return sideR;

}

function getLeftSide({ ingredients }) {
    const sideL = document.createElement('div');
    sideL.classList.add('side-left');


    const list = document.createElement('ul');
    list.classList.add('list');

    ingredients.forEach((i) => {
        const li = document.createElement('li');
        if (i.length == 2) {
            li.textContent = i[0] + ':  ' + i[1];
        } else {
            li.textContent = i[0];
        }
        list.appendChild(li);
    });

    sideL.appendChild(list);

    return sideL;
}

export { getCard };