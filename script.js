const users = await getUsers()
const table = buildTable(users)
const header = table.querySelector('tr')

document.body.appendChild(table)

header.onclick = handleSort

function handleSort(e) {
  const th = e.target
  const key = th.dataset.key
  let reverse = false

  if (th.matches('.desc')) {
    th.classList.remove('desc')
  } else if (th.matches('.sorted')) {
    th.classList.add('desc')
    reverse = true
  } else {
    const current = header.querySelector('.sorted')
    current.className = ''
    th.classList.add('sorted')
  }

  sortBy(key, reverse)
}

function sortBy(key, reverse) {
  const [header, ...rows] = table.rows

  rows.sort((a, b) => users[a.dataset.index][key].localeCompare?.(users[b.dataset.index][key]) ?? users[a.dataset.index][key] - users[b.dataset.index][key])

  if (reverse) rows.reverse()

  header.after(...rows)
}

function buildTable(users) {
  const table = document.createElement('table')

  let html = `
    <tr>
      <th data-key="id" class="sorted">Id</th>
      <th data-key="name">Name</th>
      <th data-key="username">Username</th>
      <th data-key="email">Email</th>
      <th data-key="phone">Phone</th>
      <th data-key="website">Website</th>
    </tr>
  `

  for (const i in users) {
    const user = users[i]

    html += `
      <tr data-index="${i}">
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        <td>${user.website}</td>
      </tr>
    `
  }
  table.innerHTML = html

  return table
}

async function getUsers() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  const users = await response.json()
  return users
}

