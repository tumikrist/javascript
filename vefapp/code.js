/* fetch('./gogn.json')
    .then((response) => response.json())
    .then((data) => console.log(data)); */
    
async function getUsers() {
    let url = './gogn.json';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function renderUsers() {
    let users = await getUsers();
    let html = '';

    let user_listi = users
    console.log(user_listi)

    /* delete user_listi[0]
    for(let i = 0; i < 7; i++){
        delete user_listi[i]
    }
    console.log(user_listi) */
    const value = document.querySelector("#value")
    const input = document.querySelector("#pi_input")
    value.textContent = input.value
    input.addEventListener("input", (event) => {
        value.textContent = event.target.value
    })

    user_listi.forEach(user => {
        let htmlSegment = `<div class="user">
                            <div class="mynd">
                                <img src="${user.web_photo}" ></img>
                            </div>
                            <div class="texti">
                                <h2>Name : ${user.name}</h2>
                                <h2>Price : ${user.price}</h2>
                                <h2>Date : ${user.date}</h2>
                                <h2>Location : ${user.location}</h2>
                            </div>
                        </div>`;

        html += htmlSegment;
    });

    let container = document.querySelector('.container');
    container.innerHTML = html;
}


/* const value = document.querySelector("#value")

value.textContent = input.value
input.addEventListener("input", (event) => {
    value.textContent = event.target.value
}) */


renderUsers();

//<h2>${user.name}</h2>
{/* <img src="${user.web_photo}" ></img> */}