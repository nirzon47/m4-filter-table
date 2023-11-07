const table = document.getElementById('table')
const search = document.getElementById('search')
const countrySelect = document.getElementById('country-select')
const root = document.documentElement
const themeToggle = document.getElementById('theme')

const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches
	? 'dark'
	: 'light'

let currentTheme = localStorage.getItem('theme') || preferred

document.addEventListener('DOMContentLoaded', () => {
	renderAll()
	setTheme()
})

search.addEventListener('input', () => {
	renderSearch()
})

countrySelect.addEventListener('change', () => {
	renderCountry()
})

themeToggle.addEventListener('click', () => {
	toggleTheme()
})

const renderAll = () => {
	data.forEach((item) => {
		table.innerHTML += `
            <tr>
                <th class="hidden md:inline-block">${item.id}</th>
                <td>${item.name}</td>
                <td>${item.country}</td>
            </tr>
        `
	})
}

const renderSearch = () => {
	table.innerHTML = ''

	let searchValue = search.value.toLowerCase()

	data.forEach((item) => {
		let name = item.name.toLowerCase()

		if (name.includes(searchValue)) {
			let highlightedName = item.name.replace(
				new RegExp(searchValue, 'gi'),
				(match) => `<mark>${match}</mark>`
			)
			table.innerHTML += `
                        <tr>
                            <th class="hidden md:inline-block">${item.id}</th>
                            <td>${highlightedName}</td>
                            <td>${item.country}</td>
                        </tr>
                    `
		}
	})
}

const renderCountry = () => {
	table.innerHTML = ''

	if (countrySelect.value === 'All') {
		renderAll()
		return
	}

	data.forEach((item) => {
		if (item.country === countrySelect.value) {
			table.innerHTML += `
                <tr>
                    <th class="hidden md:inline-block">${item.id}</th>
                    <td>${item.name}</td>
                    <td>${item.country}</td>
                </tr>
            `
		}
	})
}

const toggleTheme = () => {
	if (currentTheme === 'light') {
		currentTheme = 'dark'
		root.setAttribute('data-theme', 'dark')
	} else {
		currentTheme = 'light'
		root.setAttribute('data-theme', 'light')
	}

	localStorage.setItem('theme', currentTheme)
}

const setTheme = () => {
	if (currentTheme === 'light') {
		theme.checked = true
		root.setAttribute('data-theme', 'light')
	}
}
