const imageSection = document.querySelector("#current-image-container");
const imageTag = document.querySelector("#current-image-container img");
const heading = document.getElementById("heading");
const caption = document.getElementById("caption");
const description = document.getElementById("description");
const dateInp = document.getElementById("search-input");
const submitBtn = document.getElementById("submit-btn");
const historyUl = document.getElementById("history");

var api_key = 'jFRYnFp1hiMfgy8lC5dsgzaFiVypcTFIXiKVahN4';
var dateArray = [];

(async function getCurrentImageOfTheDay() {
    const currentDate = new Date().toISOString().split("T")[0];
    const response = await fetch(`https://api.nasa.gov/planetary/apod?date=${currentDate}&api_key=${api_key}`);
    const data = await response.json();
    caption.innerText = data.title;
    description.innerText = data.explanation;
    imageTag.src = data.hdurl;
})()

async function getImageOfTheDay(e) {
    e.preventDefault();
    var date = dateInp.value;
    const response = await fetch(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=${api_key}`);
    const data = await response.json();
    saveDate(date);
    heading.innerText = `Picture On ${date}`
    caption.innerText = data.title;
    description.innerText = data.explanation;
    imageTag.src = data.url;
}
submitBtn.addEventListener("click", () => { getImageOfTheDay(event) });

function saveDate(date) {
    dateArray.push({ 'date': `${date}` });
    localStorage.setItem("searches", JSON.stringify(dateArray));
    addSearchToHistory();
}

function addSearchToHistory() {
    var storedArray = localStorage.getItem('searches');
    var myArray = JSON.parse(storedArray);
    historyUl.innerHTML='';
    myArray.forEach((element)=>{
        const li = document.createElement("li");
        li.innerText=element.date;
        li.setAttribute("onClick",`historyData(event)`);
        historyUl.appendChild(li);
    })
}

async function historyData(event){
    event.preventDefault();
    var date = event.target.innerText;;
    const response = await fetch(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=${api_key}`);
    const data = await response.json();
    heading.innerText = `Picture On ${date}`
    caption.innerText = data.title;
    description.innerText = data.explanation;
    imageTag.src = data.url;
}