const itemArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : []
console.log(itemArray)

document.querySelector('#enter').addEventListener('click', () => {
    const item = document.querySelector('#item')
    createItem(item)
})
function createItem(item) {

    if (item.value != '') {
        itemArray.push(item.value)
        localStorage.setItem('items', JSON.stringify(itemArray))
        location.reload()
    }
}

function displayItems() {
    let items = ''
    for (const item of itemArray) {
        items +=
            `
                    <div class="item">
                      <div class="input-controller">
                          <textarea disabled>${item}</textarea>
                          <div class="edit-controller">
                              <i class="fa-solid fa-check deleteBtn"></i>
                              <i class="fa-solid fa-pen-to-square editBtn"></i>
                          </div>
                      </div>
                      <div class="update-controller">
                          <button class="saveBtn">Save</button>
                          <button class="cancelBtn">Cancel</button>
                      </div>
                    </div>
            `
    }

    document.querySelector('.to-do-list').innerHTML = items
    activateDeleteListeners()
    activateEditeListeners()
    activateSaveListeners()
    activateCancelListeners()
}

function activateDeleteListeners() {
    let deletBtn = document.querySelectorAll(".deleteBtn")
    deletBtn.forEach((db, i) => {
        db.addEventListener('click', () => {
            itemArray.splice(i, 1)
            localStorage.setItem('items', JSON.stringify(itemArray))
            location.reload()
        })
    })
}
function activateEditeListeners() {
    const editBtn = document.querySelectorAll('.editBtn')
    const updateController = document.querySelectorAll('.update-controller')
    const inputs = document.querySelectorAll('.input-controller textarea')
    editBtn.forEach((eb, i) => {
        eb.addEventListener('click', () => {
            updateController[i].style.display = 'block'
            inputs[i].disabled = false
        })
    })
}
function activateSaveListeners() {
    const saveBtn = document.querySelectorAll('.saveBtn')
    const inputs = document.querySelectorAll('.input-controller textarea')
    saveBtn.forEach((sb, i) => {
        sb.addEventListener('click', () => {
            itemArray[i] = inputs[i].value
            localStorage.setItem('items', JSON.stringify(itemArray))
            location.reload()
        })
    })
}
function activateCancelListeners() {
    const cancelBtn = document.querySelectorAll('.cancelBtn')
    const updateController = document.querySelectorAll('.update-controller')
    const inputs = document.querySelectorAll('.input-controller textarea')
    cancelBtn.forEach((cb, i) => {
        cb.addEventListener('click', () => {
            updateController[i].style.display = 'none'
            inputs[i].disabled = true
        })
    })

}

function displayDate() {
    let date = new Date()

    function getmonth() {
        switch (date.getMonth()) {
            case 1:
                return 'Jan'
            case 2:
                return 'Feb'
            case 3:
                return 'Mar'
            case 4:
                return 'Apr'
            case 5:
                return 'May'
            case 6:
                return 'Jun'
            case 7:
                return 'Jul'
            case 8:
                return 'Aug'
            case 9:
                return 'Sep'
            case 10:
                return 'Oct'
            case 11:
                return 'Nov'
            case 12:
                return 'Dec'
        }
    }

    let fullDate = `${date.getDate()} ${getmonth()} ${date.getFullYear()} `
    document.querySelector('#date').innerHTML = fullDate
}

window.onload = () => {
    displayDate()
    displayItems()
}
