function getCurrentTabUrl(callback) {
    const queryInfo = {
        active: true,
        currentWindow: true
    };

    chrome.tabs.query(queryInfo, (tabs) => {
        const tab = tabs[0];
        const url = tab.url;
        callback(url);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    getCurrentTabUrl(async (url) => {
        const append = document.getElementById("append")
        const id = await makeSteamApiRequestPopup(url)
        if(id === undefined) return
        const elContainer = document.createElement("div");
        append.insertBefore(elContainer, append.firstElementChild);

        elContainer.classList.add("profile_count_link");
        elContainer.innerHTML = `<a href=${getRglLink(id)} target="_blank">RGL Profile</a>`;
    });
});
