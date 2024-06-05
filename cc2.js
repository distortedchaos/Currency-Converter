const URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies";
const exchange = document.querySelectorAll(".exchange select");
const fromselect = document.querySelector("#fselect");
const toselect = document.querySelector("#sselect");
const conversion = document.querySelector("#conversion");
const getexchngrate = document.querySelector("button");
const input = document.querySelector("#input");
let seccon = null;


const updateflag = async (element) => {
    const currcode = element.value;
    const countrycode = countryList[currcode];
    const newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    const img = element.parentElement.querySelector("img");
    img.src = newsrc;

    const smallcurrcode = currcode.toLowerCase();
    const url = `${URL}/${smallcurrcode}.json`;
    const response = await fetch(url);
    const data = await response.json();
    const rate = data[smallcurrcode];
    
    const sval = toselect.value.toLowerCase();
    return rate[sval] || null;
};

const updateExchangeRate = async (element) => {
    seccon = await updateflag(element);
};

const populateSelectOptions = () => {
    for (const select of exchange) {
        for (const currcode in countryList) {
            const newoption = document.createElement("option");
            newoption.innerText = currcode;
            newoption.value = currcode;
            select.append(newoption);
            if (select.name === "from" && currcode === "USD") {
                newoption.selected = "selected";
            } else if (select.name === "to" && currcode === "INR") {
                newoption.selected = "selected";
            }
        }
        select.addEventListener("change", async (event) => {
            await updateExchangeRate(event.target);
            const inputval = input.value;
            if (inputval !== "") {
                conversion.innerText = `${inputval} ${fromselect.value} = ${inputval * seccon} ${toselect.value}`;
            }
        });
    }
};

getexchngrate.addEventListener("click", async () => {
    await updateExchangeRate(fromselect);
    const inputval = input.value;
    if(inputval === ""){
        alert("Enter Amount First");
    } else {
        conversion.innerText = `${inputval} ${fromselect.value} = ${inputval * seccon} ${toselect.value}`;
    }
});





populateSelectOptions();
updateflag(fromselect);
updateflag(toselect);

