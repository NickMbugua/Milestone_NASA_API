
let imageSearchBar = document.querySelector("#imageSearchBar");
let imageTitle = document.querySelector("#imageTitle");
let imageText = document.querySelector("#imageText");
const buttonGallery = document.querySelector("#buttonGallery");
const clickHistoryButton = document.getElementById("clickHistoryButtonId");
let imageResult = document.getElementById("imageGallery-Flex");
let galleryUserSearch;
let divContainer;
let imageAPI = `https://images-api.nasa.gov/search?q=${imageSearchBar}&media_type=image`
let divPopUp = document.querySelector(".divPopUp");
let clickedArrayHistory = [];
let imageURlTrim;


if (clickedArrayHistory.length == 0) {
    clickHistoryButton.style.visibility = "hidden";
}
else {
    clickHistoryButton.style.visibility = "visible";
}
buttonGallery.addEventListener("click", e => {
    e.preventDefault();
    imageResult.innerHTML = "";
    let apodSearchBar = imageSearchBar.value;
    if ((imageSearchBar.value == "") || !(/^[0-9a-zA-Z () -]+$/.test(apodSearchBar))) {

        console.log("Name Can Not Be Empty, Please Try Again.");
        (imageResult.innerHTML = `<h1 class=heading>Invalid Search Entered</h1>`);
    }
    else {
        galleryUserSearch = (imageSearchBar.value);
        galleryFetchFn();
    }
})

clickHistoryButton.addEventListener("click", e => {
    e.preventDefault();
    imageResult.innerHTML = "";
    clickedArrayHistory.forEach((imageItems) => {
        let title = imageItems.title;
        let description = imageItems.description;
        let image = imageItems.image;
        imageResult = document.getElementById("imageGallery-Flex");
        divContainer = document.createElement("div");
        divContainer.setAttribute("class", "picDiv");
        divContainer.innerHTML = `<h2 class="imageHeading">${title}</h2> 
        <img src=${image} class="imgGallery" <div class="popUpTextDiv">  <p class="popUpText">${description}</p></div> `;
        imageResult.appendChild(divContainer);
        clickHistoryButton.style.visibility = "visible";
        imagePopUpFn();
    });
})
closePopUpImageFn();

function imagePopUpFn() {
    divPopUp = document.querySelector(".divPopUp");
    const popUpImageAreaBtn = document.querySelector(".popUpBackground");
    const imageDiv = document.querySelectorAll("#imageGallery-Flex .picDiv");

    for (let i = 0; i < imageDiv.length; i++) {
        imageDiv[i].addEventListener("click", e => {
            divPopUp.innerHTML = "";
            popUpImageAreaBtn.classList.add("open");
            let currentDiv = imageDiv[i].cloneNode(true);
            console.log(currentDiv);
            console.log(divPopUp);
            currentDiv.setAttribute("class", "picDivText");
            divPopUp.appendChild(currentDiv);
        })
    }
    clickHistoryButton.style.visibility = "visible";
    closePopUpImageFn();
}
function searchedInnerHtml() {
    imageURlTrim = (searchedImageData.image).split(' ').join('%20');
    divContainer = document.createElement("div");
    divContainer.setAttribute("class", "picDiv");
    divContainer.innerHTML = `<h2 class="imageHeading">${searchedImageData.title}</h2> 
    <img src=${imageURlTrim} class="imgGallery" alt=${searchedImageData.title}> <div class="popUpTextDiv">  <p class="popUpText">${searchedImageData.text}</p></div> `;
    imageResult.appendChild(divContainer);
}
function closePopUpImageFn() {
    let closeButton = document.querySelector(".popUpBackground");
    closeButton.addEventListener("click", e => {
        e.preventDefault();
        if (e.target.classList.contains("popUpBackground")) {
            closeButton.classList.remove("open");
        }
    })
}
console.log(clickedArrayHistory);
class ClickedHistory {
    constructor(title, description, image) {
        this.title = title;
        this.description = description;
        this.image = image;
    }
}
async function galleryFetchFn() {
    imageAPI = `https://images-api.nasa.gov/search?q=${galleryUserSearch}&media_type=image`;
    await fetch(imageAPI)
        .then(response => {
           // console.log(response)
            if (response.ok) {
                return response.json();
            }
        })
        .then(data => {
            //console.log(data);
            imageSearchBar.value = "";
            if (data) {
                if (data.collection.items.length == 0) {
                    (imageResult.innerHTML = `<h1 class=heading>Error Nothing Was Found</h1>`);
                }
                else {
                    for (let i = 0; i < data.collection.items.length; i++) {
                        imageURlTrim = (data.collection.items[i].links[0].href).split(' ').join('%20'); // Fix Image Url that have white spacing.
                        searchedImageData = {
                            title: data.collection.items[i].data[0].title,
                            image: data.collection.items[i].links[0].href,
                            text: data.collection.items[i].data[0].description
                        }
                       // console.log(i)
                        searchedInnerHtml();
                    }
                    if (imageResult.length == 0) {
                        (imageResult.innerText = "Nothing so found");
                    }
                    divPopUp = document.querySelector(".divPopUp");
                    const popUpImageAreaBtn = document.querySelector(".popUpBackground");
                    const imageDiv = document.querySelectorAll("#imageGallery-Flex .picDiv");
                    //console.log(divPopUp);
                    for (let i = 0; i < imageDiv.length; i++) { // Gallery Pop up image 
                        imageDiv[i].addEventListener("click", e => {
                            divPopUp.innerHTML = "";
                           // console.log(i)
                            popUpImageAreaBtn.classList.add("open");
                            let currentDiv = imageDiv[i].cloneNode(true);
                            console.log(currentDiv);
                            console.log(divPopUp);
                            currentDiv.setAttribute("class", "picDivText");
                            divPopUp.appendChild(currentDiv);
                            imagePopData = {
                                title: data.collection.items[i].data[0].title,
                                description: data.collection.items[i].data[0].description,
                                image: data.collection.items[i].links[0].href,
                            }
                            // Clicked images are saved here. 
                            let myClickedHistory = new ClickedHistory(imagePopData.title, imagePopData.description, imagePopData.image)
                           // console.log(myClickedHistory);
                            clickedArrayHistory.push(myClickedHistory);
                           // console.log(clickedArrayHistory);
                        })
                    }
                    let closeButton = document.querySelector(".popUpBackground");
                    closeButton.addEventListener("click", e => {
                        if (e.target.classList.contains("popUpBackground")) {
                            closeButton.classList.remove("open");
                            clickHistoryButton.style.visibility = "visible";
                        }
                    })
                }
            };

        }).catch(errorMessage => {
            console.log(errorMessage);
            console.log("An Error was Found");
        })
        .finally(() => {
            console.log("Request complete, Thank you!!")
        });

}
