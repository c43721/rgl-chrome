const apiKey = ""

const getRglLink = (id) => {
    return `https://rgl.gg/Public/PlayerProfile.aspx?p=${id}&r=40`
}

const getApiLink = (id) => {
    return `https://cors-anywhere.herokuapp.com/https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001?key=${encodeURIComponent(apiKey)}&vanityurl=${id}`
}

const appendUserDataToUI = (id) => {
    let elParent = document.querySelector(".profile_item_links");

    if (elParent === null) return

    const elContainer = document.createElement("div");
    elParent.insertBefore(elContainer, elParent.firstElementChild);

    elContainer.classList.add("profile_count_link");
    elContainer.innerHTML = `<a href=${getRglLink(id)} target="_blank">RGL Profile</a>`;
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            elContainer.classList.add("rgl-profile--visible");
        });
    });
}

const getSteamID = () => {
    const vanityName = window.location.href.split('/').slice(4)[0]
    return vanityName
}

const getNameFromUrl = (url) => {
    const vanityName = url.split('/').slice(4)[0]
    return vanityName
}

const makeSteamApiRequest = async () => {
    const linkToFetch = getApiLink(getSteamID())
    const data = await fetch(linkToFetch)
    const { response: { steamid } } = await data.json()
    return steamid
}

const makeSteamApiRequestPopup = async (link) => {
    if (!apiKey) return console.log("You should set your API key.")
    if (!link.match("steamcommunity.com/id")) return
    if (link.match(/(765611\d+)/)) return getNameFromUrl(link)
    const linkToFetch = getApiLink(getNameFromUrl(link))
    const data = await fetch(linkToFetch)
    const { response: { steamid } } = await data.json()
    return steamid
}

(async () => {
    if (!apiKey) return console.log("You should set your API key.")
    else {
        const id = await makeSteamApiRequest()
        appendUserDataToUI(id)
    }
})()