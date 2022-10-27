const userInputTextBox = document.querySelector("#searchBar");
const buttonApod = document.querySelector("#searchBnt");
let lastButtonApod = document.querySelector(".lastDay");
let nextButtonApod = document.querySelector(".nextDay");
const searchText = document.querySelector(".divArea");
let heading = document.querySelector(".heading");
let dateCopyright = document.querySelector(".dateCopyright");
let date;
const API_Key = "iCDqVgHcIHT1i8DuW7EqfTjWFflCtw8BY2CliUv9";
let apiSearch = `https://api.nasa.gov/planetary/apod?api_key=${API_Key}`;
let imageToClick = document.querySelector(".imgApod");
let divPopUp = document.getElementById("imagePopUpDiv");
let currentDate = new Date().toLocaleDateString('en-ca');


searchText.innerHTML = `<h1>Welcome to Astronomy Picture of the Day (APOD) </br> Search a specific Date or Search Day by Day</h1>
                        <h2></h2>`;
hideDayButtons();
setTimeout(todaysDateFetch, 5000); // First page timer/ 

function todaysDateFetch() { // auto Fetch
    apiSearch = `https://api.nasa.gov/planetary/apod?api_key=${API_Key}&date=${currentDate}`;
    fetchFunctionApod();
    lastButtonApod.style.visibility = "visible";
    document.getElementById("apodTitle").style.display = "block";
}
buttonApod.addEventListener("click", e => { // Search button
    e.preventDefault();
    lastButtonApod.style.visibility = "visible";
    if (userInputTextBox.value == "") {
        searchText.innerHTML = `<h1>Can Not Be Empty</h1>`;
        hideDayButtons();
    }
    else {
        for (let i = 0; i < imageToClick.length; i++) {

            (imageToClick[0].remove(imageToClick));
        }
        searchText.innerHTML = "";
        date = (userInputTextBox.value);
        if (!checkDate(date)) {
            console.log("not a date")
            searchText.innerHTML = `<h1>Not A Date</h1>`;
            hideDayButtons();
        }
        else {
            apiSearch = `https://api.nasa.gov/planetary/apod?api_key=${API_Key}&date=${date}`;
            fetchFunctionApod();
        }
    }
})

async function fetchFunctionApod() { // API Fetch
    await fetch(apiSearch)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            else {
                searchText.innerHTML = `<h1>Invalid Date Entered, Only the present date and past date can be search. No empty space </h1>`;
                hideDayButtons();
            }
        })
        .then(data => {
            userInputTextBox.value = "";
            if (data) {
                console.log(data);
                searchedResult = {
                    title: data.title,
                    text: data.explanation,
                    date: data.date,
                    imageUrl: data.url,
                    copyRight: data.copyright
                }
                if (searchedResult.date === currentDate) {
                    document.querySelector(".nextDay").style.visibility = "hidden";
                }
                else {
                    document.querySelector(".nextDay").style.visibility = "visible";
                }
                //console.log(currentDate);
                //console.log(searchedResult.date);
                lastDayFn(data); // USE DATA FROM FETCH FOR OTHER THINGS
                nextDayFn(data);
                if (data.media_type != "image") {
                    noImageInnerHtml();
                }
                else {
                    ApodInnerHtml();
                    imageToClick = document.querySelector(".imgApod"); // Opens the pop up image
                    popUpImageAreaBtn = document.querySelector(".popUpBackground");
                    divPopUp = document.getElementById("imagePopUpDiv");
                    imageToClick.addEventListener("click", e => {
                        imagePopUPClick(popUpImageAreaBtn);
                    })
                    let closeButton = document.querySelector(".popUpBackground"); // clicking the background close the image
                    closeButton.addEventListener("click", e => {

                        if (e.target.classList.contains("popUpBackground")) {
                            imagePopUpClose(popUpImageAreaBtn);
                            removePopUpImage();
                        }
                    })
                }
            }
        })
        .catch(errorMessage => {
            console.log(errorMessage);
        })

        .finally(() => {
            console.log("Request complete, Thank you!!")
        });
}

function lastDayFn(data) { // Last day button

    const clone = lastButtonApod.cloneNode(true); // Clones button(Without is the button was getting )
    lastButtonApod.parentNode.replaceChild(clone, lastButtonApod);
    lastButtonApod = clone;
    lastButtonApod.addEventListener("click", e => {
        console.log(e);
        e.preventDefault();
        result = {
            date: data.date,
        }
        console.log(result.date);
        let dayCount = new Date(result.date.replace(/-/g, '\/')); // subtract by one day
        dayCount.setUTCDate(dayCount.getUTCDate() - 1);
        let newDay = dayCount.toISOString();
        newDay = dayCount.toISOString().substring(0, 10);

        apiSearch = `https://api.nasa.gov/planetary/apod?api_key=${API_Key}&date=${newDay}`;
        //for (let i = 0; i < imageToClick.length; i++) {
           // (imageToClick[0].remove(imageToClick));
       // }
        searchText.innerHTML = "";
        fetchFunctionApod();
    }
    )
}

function nextDayFn(data) { 
    const clone = nextButtonApod.cloneNode(true);
    nextButtonApod.parentNode.replaceChild(clone, nextButtonApod);
    nextButtonApod = clone;
    nextButtonApod.addEventListener("click", e => {
        e.preventDefault();
        result1 = {
            date: data.date,
        }

        let dayCount = new Date(result1.date); 
        dayCount.setUTCDate(dayCount.getUTCDate() + 1); // subtract adds one day
        let newDay = dayCount.toISOString().substring(0, 10);
        apiSearch = `https://api.nasa.gov/planetary/apod?api_key=${API_Key}&date=${newDay}`;
        console.log(e);
        for (let i = 0; i < imageToClick.length; i++) {
            (imageToClick[0].remove(imageToClick));
        }
        searchText.innerHTML = "";
        console.log(newDay);
        fetchFunctionApod();

    }
    )
}

function checkYear(inputValue) {
    let currentYear = new Date().toLocaleDateString('en-ca').substring(0, 4);
    return Number(inputValue) >= 1960 && Number(inputValue <= currentYear);
}

function checkDate(inputValue) {
    let outputValue = true;
    inputValue = inputValue.trim();
    let inputDate = inputValue.split("-");
    if (!checkYear(inputDate[0])) {
        outputValue = false;
    }

    if (inputDate[1] < 1 || inputDate[1] > 12 || !Number.isInteger(Number(inputDate[1]))) {
        outputValue = false;
    }

    if (inputDate[2] < 1 || inputDate[2] > 31 || !Number.isInteger(Number(inputDate[2]))) {
        outputValue = false;
    }
    return outputValue;
}

function imagePopUPClick(popUpImageAreaBtn) {
    popUpImageAreaBtn.classList.add("open");
    let imagePopUp = imageToClick.cloneNode(true);
    imagePopUp.setAttribute("class", "imagePopUp");
    popUpImageAreaBtn.appendChild(imagePopUp);
}
function imagePopUpClose(popUpImageAreaBtn) {
    popUpImageAreaBtn.classList.remove("open");
}
function removePopUpImage() {
    let image = document.getElementsByClassName("imagePopUp");
    for (let i = 0; i < image.length; i++) {
        (image[0].remove(image));
    }
}
function ApodInnerHtml() {
    searchText.innerHTML = ` <div class="titleImageFlex"> <h2 class="heading">${searchedResult.title}</h2>  <img src=${searchedResult.imageUrl} class="imgApod" alt=${searchedResult.title} title=${searchedResult.title}></br>
    <div class="dateFlex"><p class="dateApod">${searchedResult.date}</p><p class="copyRightApod">${searchedResult.copyRight ?? ''}</p></div></div> 
    <P class="ApodTextClass">${searchedResult.text}</p> `; //   ?? '' if nun it would show nothing
}
function noImageInnerHtml() { // Function for innerHTML if Apod has an video and no image
    searchText.innerHTML = `<div class="titleImageFlex"> <h2 class="heading">${searchedResult.title}</h2> <img src="img/noImage.JPG" class="imgApod"> </br>
    <div class="dateFlex"><p class="dateApod">${searchedResult.date}</p><p class="copyRightApod">${searchedResult.copyRight ?? ''}</p></div></div>
    <P class="ApodTextClass">${searchedResult.text}</p> `;
}
function hideDayButtons() {
    lastButtonApod.style.visibility = "hidden";
    nextButtonApod.style.visibility = "hidden";
    let apodTitle = document.getElementById("apodTitle");
    apodTitle.style.display = "none";
}


