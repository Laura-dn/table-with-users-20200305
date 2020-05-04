function load(url, callback){
    if(!url || !callback){
        return false;
    }
    const aja = new XMLHttpRequest();
    aja.onload = showUser;
    aja.open('GET', url);
    aja.send();
    return true;
}

function showUser(){
    console.log(JSON.parse(this.responseText));
}


/**Функция обработчик события load объекта AJAX
 * arguments : none
 * return : none
 */
function showUser(){
    console.log('Операция получения данных с сервера завершена');
    const str = dom.cards.innerHTML;
    dom.cards.innerHTML = renderUser(JSON.parse(this.responseText).results[0]) + str;
}


/**Функция генерации карточки в виде HTML-строки
 * arguments:
 *  object user : полная информация о новом пользователе
 * return:
 *  string : html-строку с карточкой
 */
function renderUser(user){
    return `<div class="card d-inline-block m-2" style="width: 18rem;">
    <img src="${user.picture.large}" class="card-img-top" alt="user-pic">
    <div class="card-body">
        <h5 class="card-title">${user.name.title} ${user.name.first} ${user.name.last}</h5>
        <p class="card-text">${user.dob.age} ${user.gender}, ${user.nat}</p>
    </div>
</div>`;
}

const dom = {
    cards : document.querySelector('.cards'),
    btn   : document.querySelector('.btn-add-user')
};

/**Вешаем обработчик клика на кнопку*/
dom.btn.addEventListener('click', ()=>load('https://randomuser.me/api/', showUser));