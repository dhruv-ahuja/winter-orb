// common script code

function debounce(func, timeout = 300) {
    let timer

    return function (...args) {
        clearTimeout(timer)

        timer = setTimeout(() => {
            func.apply(this, args)
        }, timeout)
    }
}

const debouncedFilterByName = debounce(filterItemsByName)

function resetItemSearchFilter() {
    // reset items table search state 
    const tableBody = document.getElementsByTagName('tbody')[0]
    const itemRows = tableBody.getElementsByTagName('tr')

    for (i = 0; i < itemRows.length; i++) {
        const itemRow = itemRows[i]
        itemRow.classList.remove('search-filtered')
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

function filterItemsByName(searchValue, itemRows) {
    for (i = 0; i < itemRows.length; i++) {
        const itemRow = itemRows[i]
        const itemNameColumn = itemRow.getElementsByTagName('td')[0]
        const itemName = itemNameColumn.getElementsByClassName('table-item-name')[0]?.innerHTML.toLowerCase() ?? ""

        if (!itemName.includes(searchValue)) {
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

        debouncedFilterByName(searchValue, itemRows)
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

const loadPriceHistoryData = () => {
    const dataSet = [
        ["2024-08-16T07:23:30.077482Z", "102466.67"],
        ["2024-08-17T07:23:30.077485Z", "101200.00"],
        ["2024-08-18T07:23:30.077487Z", "99955.20"],
        ["2024-08-19T07:23:30.077488Z", "101500.00"],
        ["2024-08-20T07:23:30.077490Z", "103629.17"],
        ["2024-08-21T07:23:30.077492Z", "114157.89"],
        ["2024-08-22T07:23:30.077493Z", "115600.00"]
    ]
    const data = dataSet.map((v) => parseFloat(v[1]))

    Highcharts.chart('mirrorPriceHistory', {
        chart: {
            type: 'line',
            backgroundColor: 'transparent',
        },
        title: { text: null },
        xAxis: { visible: false },
        yAxis: { visible: false },
        legend: { enabled: false },
        tooltip: { enabled: true },
        credits: { enabled: false },
        series: [{
            data: data,
            color: '#8378ffe2',
            fillOpacity: 0.5,
            lineWidth: 2,
            marker: { enabled: false },
            enableMouseTracking: false,
        }],
    })
}

const loadPricePredictionData = () => {
    const dataSet = [
        ["2024-08-19T07:23:30.077488Z", "101500.00"],
        ["2024-08-16T07:23:30.077482Z", "98466.67"],
        ["2024-08-17T07:23:30.077485Z", "98200.00"],
        ["2024-08-18T07:23:30.077487Z", "99955.20"],
    ]
    const data = dataSet.map((v) => parseFloat(v[1]))

    Highcharts.chart('mirrorPricePrediction', {
        chart: {
            type: 'line',
            backgroundColor: 'transparent',
        },
        title: { text: null },
        xAxis: { visible: false },
        yAxis: { visible: false },
        legend: { enabled: false },
        tooltip: { enabled: true },
        credits: { enabled: false },
        series: [{
            data: data,
            color: 'red',
            fillOpacity: 0.5,
            lineWidth: 2,
            marker: { enabled: false },
            enableMouseTracking: false,
        }],
    })
}

document.addEventListener('DOMContentLoaded', changeScrollingHeaderColor);
document.addEventListener('DOMContentLoaded', loadPriceHistoryData);
document.addEventListener('DOMContentLoaded', loadPricePredictionData);
