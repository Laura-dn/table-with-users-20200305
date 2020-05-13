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
        }

        table.append(tr);
    }

    section.append(table);
}

document.querySelector("#btn").addEventListener("click", load);
