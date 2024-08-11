// common script code

function clearItemsSearchInput() {
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

// changes table header colours on scroll to ensure legibility
const changeScrollingHeaderColor = () => {
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
