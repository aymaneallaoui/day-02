const selectTag = document.querySelectorAll("select");
const exchangeicon = document.querySelector(".exchange");
const translateBtn = document.querySelector("button"),
icons = document.querySelectorAll(".row i");
const fromText = document.querySelector(".from-text");
const toText = document.querySelector(".to-text");

selectTag.forEach((tag, id) => {
    for (const country_code in countries) {
        let selected;
        if(id == 0 && country_code == "en-GB"){
            selected = "selected";
        } else if(id == 1 && country_code == "ar-SA") {
            selected = "selected";
        }
        let option = ` <option value="${country_code}"${selected}>${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option)
    }
});

exchangeicon.addEventListener("click", () => {
    let tempText = fromText.value,
    templang = selectTag[0].value;
    fromText.value = toText.value;
    selectTag[0].value = selectTag[1].value;
    selectTag[1].value = templang;
    toText.value = tempText;
});

translateBtn.addEventListener("click", () => {
    let text = fromText.value,
    tranlateFrom = selectTag[0].value,
    translateTo = selectTag[1].value; 
    if(!text) return;
    toText.setAttribute("pracleholder", "translating...");
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${tranlateFrom}|${translateTo}&de=binid5600@gmail.com`;
    fetch(apiUrl).then(res => res.json()).then(data => {
        toText.value = data.responseData.translatedText;
        toText.setAttribute("pracleholder", "translating...");
    });
});

icons.forEach(icon => {
    icon.addEventListener("click", ({target}) => {
        if(target.classList.contains("fa-copy")) {
            if(target.id == "from") {
                navigator.clipboard.writeText(fromText.value);
            }else{
                navigator.clipboard.writeText(toText.value);
            }
        } else {
            let utterance;
            if(target.id == "from") {
                utterance = new SpeechSynthesisUtterance(fromText.value);
                utterance.lang =  selectTag[0].value;            
            }else{
                utterance = new SpeechSynthesisUtterance(toText.value);
                utterance.lang =  selectTag[1].value; 
            }
            speechSynthesis.speak(utterance)
        }
    });
});