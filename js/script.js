// common script code

function resetItemSearchFilter() {
    // reset items table state 
    const tableBody = document.getElementsByTagName('tbody')[0]
    const itemRows = tableBody.getElementsByTagName('tr')

    for (i = 0; i < itemRows.length; i++) {
        const itemRow = itemRows[i]
        itemRow.style.display = 'table-row'
    }

    // clear item search input
    const searchInput = document.getElementById('items-search')
    const clearButton = document.getElementById("items-search-clear-btn")

    if (searchInput.value.trim() !== "") {
        searchInput.value = ''
        clearButton.setAttribute("disabled", "disabled")
    }

    searchInput.focus()
}

function enableItemsSearchClearButton() {
    const searchInput = document.getElementById('items-search')
    const clearButton = document.getElementById("items-search-clear-btn")

    const searchInputValue = searchInput.value.trim()

    if (searchInputValue !== "") {
        clearButton.removeAttribute("disabled")
    } else {
        clearButton.setAttribute("disabled", "disabled")
    }
}

function filterItemsByName() {
    const searchInput = document.getElementById('items-search')
    const searchValue = searchInput.value.toLowerCase().trim()

    const tableBody = document.getElementsByTagName('tbody')[0]
    const itemRows = tableBody.getElementsByTagName('tr')

    for (i = 0; i < itemRows.length; i++) {
        const itemRow = itemRows[i]
        const itemNameColumn = itemRow.getElementsByTagName('td')[0]
        const itemName = itemNameColumn.getElementsByClassName('table-item-name')[0]?.innerHTML.toLowerCase() ?? ""

        if (!itemName.includes(searchValue)) {
            itemRow.style.display = 'none'
        } else {
            itemRow.style.display = 'table-row'
        }
    }
}

// changes table header colours on scroll to ensure legibility
function changeScrollingHeaderColor() {
    const tableContainer = document.getElementById('items-table-wrapper');
    const headerCells = document.querySelectorAll('th');

    tableContainer.addEventListener('scroll', () => {
        const scrollTop = tableContainer.scrollTop;

        headerCells.forEach(th => {
            if (scrollTop > 0) {
                th.classList.add('scrolled');
            } else {
                th.classList.remove('scrolled');
            }
        });
    })
}

document.addEventListener('DOMContentLoaded', changeScrollingHeaderColor);
