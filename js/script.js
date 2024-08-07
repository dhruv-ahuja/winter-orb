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
