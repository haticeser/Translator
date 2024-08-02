let container = document.querySelector(".container");
let fromOptionsBox = document.querySelector(".container .from-options");
let toOptionsBox = document.querySelector(".container .to-options");
let fromInputBox = document.querySelector (".container .select-box .from-input-box");
let toInputBox = document.querySelector (".container .select-box .to-input-box");
let fromInputIcon = document.querySelector (".container .select-box .from-input-box i");
let toInputIcon = document.querySelector (".container .select-box .to-input-box i");
let fromInput = document.querySelector(".container .select-box .from-input-box .from-input");
let toInput = document.querySelector(".container .select-box .to-input-box .to-input");
let switchBtn = document.querySelector(".container .select-box .switch-btn");
let fromTranslateInput = document.querySelector(".container .from-text-box textarea");
let toTranslateInput = document.querySelector(".container .to-text-box textarea");

let currentForm , currentTo , curretnFromInput , currentToInput , currentFromTranslation ,currentToTranslation;



let getCountries =()=>{
    let fromLi = "";
    let toLi = "";
    for(let countryCode in countries){
        /* console.log(countries[countryCode]); */
        fromLi += `<li onclick="setFromCountry('${countryCode}','${countries[countryCode]}')" >${countries[countryCode]}</li>`;
        toLi += `<li onclick="setToCountry('${countryCode}','${countries[countryCode]}')" >${countries[countryCode]}</li>`;
    }
    fromOptionsBox.innerHTML = fromLi;
    toOptionsBox.innerHTML = toLi;
}

fromInputBox.addEventListener("click",()=>{
    fromOptionsBox.classList.toggle("from-options-active");
    toOptionsBox.classList.remove("to-options-active");
    fromInputIcon.classList.toggle("from-icon-toggle");
    toInputIcon.classList.remove("to-icon-toggle");
})

toInputBox.addEventListener("click",()=>{
    toOptionsBox.classList.toggle("to-options-active");
    fromOptionsBox.classList.remove("from-options-active");
    toInputIcon.classList.toggle("to-icon-toggle");
    fromInputIcon.classList.remove("from-icon-toggle");
})


let setFromCountry =(countryCode,countryName) =>{
    /* console.log(countryCode,countryName); */
    fromInput.value = countryName;
    fromInput.dataset.country =countryCode;
    fromOptionsBox.classList.remove("from-options-active");
    fromInputIcon.classList.remove("from-icon-toggle");
    getTranslation();
}

let setToCountry =(countryCode,countryName) =>{
    toInput.value = countryName;
    toInput.dataset.country =countryCode;
    toOptionsBox.classList.remove("to-options-active");
    toInputIcon.classList.remove("to-icon-toggle");
    getTranslation();
}

switchBtn.addEventListener("click",()=>{
    //Getting data-country of both fields
    currentForm = fromInput.dataset.country;
    currentTo = toInput.dataset.country;
    /* console.log(currentForm,currentTo); */
    // Switching data-country of both fields
    fromInput.dataset.country = currentTo;
    toInput.dataset.country = currentForm;
    //Getting Values of Both Fields
    curretnFromInput = fromInput.value;
    currentToInput = toInput.value;
    // Switching values of Both Fields
    fromInput.value = currentToInput;
    toInput.value = curretnFromInput;
    //Getting Values of Both Translation Box
    currentFromTranslation = fromTranslateInput.value;
    currentToTranslation = toTranslateInput.value;
    // Switching values of Both Translation Box
    fromTranslateInput.value = currentToTranslation;
    toTranslateInput.value = currentFromTranslation;
    getTranslation();
})

let getTranslation =()=>{
    let text = fromTranslateInput.value;
    let from = fromInput.dataset.country;
    let to = toInput.dataset.country;
    let url = `https://api.mymemory.translated.net/get?q=${text}&langpair=${from}|${to}`;
    fetch(url).then((res)=>res.json()).then((data)=>{
        /* console.log(data); */
        toTranslateInput.value = data.responseData.translatedText;
    })
}
fromTranslateInput.addEventListener("keyup",(e)=>{
    if(e.key == "Enter"){
        /* alert("Hello"); */
        if(fromTranslateInput.value != "")
        {
            getTranslation();
        }
    }
})

let copyFromText =()=>{
    if(fromTranslateInput.value != ""){
        navigator.clipboard.writeText(fromTranslateInput.value);
    }
}

let copyToText =()=>{
    if(toTranslateInput.value != ""){
        navigator.clipboard.writeText(toTranslateInput.value);
    }
}

let speakFromText =()=>{
    if(fromTranslateInput.value != ""){
        let speech = new SpeechSynthesisUtterance();
        speech.lang = fromInput.dataset.country;
        speech.text = fromTranslateInput.value;
        speechSynthesis.speak(speech);
    }
}

let speakToText =()=>{
    if(toTranslateInput.value != ""){
        let speech = new SpeechSynthesisUtterance();
        speech.lang = toInput.dataset.country;
        speech.text = toTranslateInput.value;
        speechSynthesis.speak(speech);
    }
}

getCountries();