function load() {
    let numUsers = Number(document.querySelector("#userNum").value),
        table = document.querySelector("table");

    if(isNaN(numUsers) || numUsers == 0) {
        numUsers = 1;
    }

    if(numUsers > 5000) {
        numUsers = 5000;
    }

    let url = "https://randomuser.me/api/?results=" + numUsers;

    const XHR = new XMLHttpRequest();
    XHR.onload = showUser;
    XHR.open('GET', url);
    XHR.send();
    
    if(table != null) {
        table.remove();
    }
    
    return true;
}

function showUser() {
    let arr = JSON.parse(this.responseText).results,
        table = document.createElement("table"),
        arrHead = ["#","Name","Email","Age","Address","Phone"],
        section = document.querySelector("section");

    for(let i = 0; i <= arr.length; i++) {
        let tr = document.createElement("tr");

        if(i == 0) {
            for(let j = 0; j < arrHead.length; j++) {
                let th = document.createElement("th");
                th.innerHTML = arrHead[j];
                tr.append(th);
            }
        } else {
            tr.innerHTML = `<td>${i}</td>
            <td>${arr[(i-1)].name.title} ${arr[(i-1)].name.first} ${arr[(i-1)].name.last}</td>
            <td>${arr[(i-1)].email}</td>
            <td>${arr[(i-1)].dob.age}</td>
            <td>${arr[(i-1)].location.country}, ${arr[(i-1)].location.city}, ${arr[(i-1)].location.postcode} 
            ${arr[(i-1)].location.state}, ${arr[(i-1)].location.street.number} ${arr[(i-1)].location.street.name}</td>
            <td>${arr[(i-1)].phone}</td>`;


            // for(let j = 0; j < arrHead.length; j++) {
            //     let td = document.createElement("td");
            //     td.innerHTML = 
            // }
        }

        table.append(tr);
    }

    section.append(table);
}

//('https://randomuser.me/api/', showUser)- https://randomuser.me/api/?results=10

/**Функция обработчик события load объекта AJAX
 * arguments : none
 * return : none
 */
// function showUser(){
//     console.log('Операция получения данных с сервера завершена');
//     const str = dom.cards.innerHTML;
//     dom.cards.innerHTML = renderUser(JSON.parse(this.responseText).results[0]) + str;
// }


/**Функция генерации карточки в виде HTML-строки
 * arguments:
 *  object user : полная информация о новом пользователе
 * return:
 *  string : html-строку с карточкой
 */
// function renderUser(user){
//     return `<div class="card d-inline-block m-2" style="width: 18rem;">
//     <img src="${user.picture.large}" class="card-img-top" alt="user-pic">
//     <div class="card-body">
//         <h5 class="card-title">${user.name.title} ${user.name.first} ${user.name.last}</h5>
//         <p class="card-text">${user.dob.age} ${user.gender}, ${user.nat}</p>
//     </div>
// </div>`;
// }

document.querySelector("#btn").addEventListener("click", load);
