const cartSessionName = '@MahindraCoins:cart'

const cartCounter = document.querySelector('header>nav>div>figure>small')

let totalAmountOfMCsNeeded = sessionStorage.getItem(cartSessionName)
if(!totalAmountOfMCsNeeded) totalAmountOfMCsNeeded = 0
cartCounter.textContent = totalAmountOfMCsNeeded 

function addToCart() {
    const isThereCart = sessionStorage.getItem(cartSessionName)
    if (isThereCart === undefined) sessionStorage.setItem(cartSessionName, totalAmountOfMCsNeeded)

    totalAmountOfMCsNeeded++
    sessionStorage.setItem(cartSessionName, totalAmountOfMCsNeeded)

    cartCounter.textContent = totalAmountOfMCsNeeded 
}
