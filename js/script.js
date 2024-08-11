// common script code

const resetItemsTable = () => {
    const tableBody = document.getElementsByTagName('tbody')[0]
    const itemRows = tableBody.getElementsByTagName('tr')

    for (i = 0; i < itemRows.length; i++) {
        const itemRow = itemRows[i]
        itemRow.style.display = 'table-row'
    }
}

function resetItemSearchFilter() {
    // reset items table state 
    resetItemsTable()

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

function filterItemsByName(searchValue, itemRows) {
    for (i = 0; i < itemRows.length; i++) {
        const itemRow = itemRows[i]
        const itemNameColumn = itemRow.getElementsByTagName('td')[0]
        const itemName = itemNameColumn.getElementsByClassName('table-item-name')[0]?.innerHTML.toLowerCase() ?? ""

        if (!itemName.includes(searchValue)) {
            console.log(itemRow.classList)
            itemRow.classList.add('search-filtered')
        } else {
            itemRow.classList.remove('search-filtered')
        }
    }
}

// TODO: check url and disable this function for `currency` in the future
function filterItemsByType(selectedItemType, itemRows) {
    for (i = 0; i < itemRows.length; i++) {
        const itemRow = itemRows[i]
        const itemTypeColumn = itemRow.getElementsByTagName('td')[1]
        const itemType = itemTypeColumn.innerHTML

        if (itemType === selectedItemType || selectedItemType === "") {
            itemRow.style.display = 'table-row'
            itemRow.classList.remove('type-filtered')
        } else {
            itemRow.classList.add('type-filtered')
        }
    }
}

function filterItems(filterMethod) {
    const tableBody = document.getElementsByTagName('tbody')[0]
    const itemRows = tableBody.getElementsByTagName('tr')

    if (filterMethod === "name") {
        const searchInput = document.getElementById('items-search')
        const searchValue = searchInput.value.toLowerCase().trim()

        filterItemsByName(searchValue, itemRows)
    } else {
        const itemTypeFilter = document.getElementById('items-type-selection')
        const selectedItemType = itemTypeFilter.value

        filterItemsByType(selectedItemType, itemRows)
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
