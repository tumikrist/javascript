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
    users.forEach(user => {
        let htmlSegment = `<div class="user">
                            <div class="mynd">
                                <img src="${user.web_photo}" >
                            </div>
                            <h2>${user.name}</h2>
                        </div>`;

        html += htmlSegment;
    });

    let container = document.querySelector('.container');
    container.innerHTML = html;
}

renderUsers();

