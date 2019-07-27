const API = 'https://acme-users-api-rev.herokuapp.com/api'
let usersArray, timeout

const renderUserTable = () => {
    document.getElementById('users').innerHTML = `
    <tr>
        <th></th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
        <th>Title</th>
    </tr>`
    + usersArray.map(({id, firstName, lastName, title, email, avatarUrl}) =>  `
        <tr>
            <td><img src="${avatarUrl}"/></td>
            <td>${firstName}</td>
            <td>${lastName}</td>
            <td>${email}</td>
            <td>${title}</td>
        </tr>
    `).join()
}

const loadData = async () => {
    const usersResponse = (await (await fetch(`${API}/users/search/${window.location.hash.slice(1)}`)).json()).users
    usersArray = usersResponse ? usersResponse.map(({id, firstName, lastName, title, email, avatar}) => new User(id, firstName, lastName, title, email, avatar)) : []
    renderUserTable()
}

document.getElementById('search-input').addEventListener('keyup', (ev) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
        window.location.hash = ev.target.value
    }, 600)
})

document.getElementById('clear-link').addEventListener('click', (ev) => {
    ev.preventDefault()
    document.getElementById('users').innerHTML = ''
    document.getElementById('search-input').value = ''
    window.location.hash = ''
    usersArray = []
})

window.addEventListener('hashchange', (ev) => {
    if (window.location.hash) loadData()
})
