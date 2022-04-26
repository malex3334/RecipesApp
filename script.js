"use strict";

import { data, Meal } from "/data.js";

const nameInput = document.getElementById("name");
const typeInput = document.getElementById("type");
const ingredientsInput = document.getElementById("ingredients");
const descriptionInput = document.getElementById("description");
const preparationInput = document.getElementById("preparation-time");
const photoInputURL = document.getElementById("photo");
const submitBtn = document.getElementById("submit");
const output = document.querySelector(".output");
const modal = document.getElementById("modal");
const closeModalBtn = document.querySelector(".close");
const newRecipe = document.getElementById("new-recipe");
const delRecipe = document.getElementById("del-recipe");
const delModal = document.getElementById("del-modal");
delModal.style.opacity = "0";

const emptyNameWarning = document.querySelector(".empty-name");
const select = document.getElementById("select");

// temporary reseting
const btnReset = document.getElementById("reset");
btnReset.addEventListener("click", () => {
  window.localStorage.clear();
  localStorage.clear();
  window.location.reload();
});

//end

const btnYes = document.getElementById("btn-yes");
const btnNo = document.getElementById("btn-no");

const btnRight = document.getElementById("right");
const btnLeft = document.getElementById("left");

const ratingStars = document.querySelectorAll(".rating-option");

const body = document.querySelector("body");
body.style.backgroundImage = `url('https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80)`;

let i = 0;
let index = 1;
let ratingValue;

const submitForm = function () {
  index++;
  data.push(
    new Meal(
      index,
      nameInput.value,
      typeInput.value,
      ingredientsInput.value,
      descriptionInput.value,
      preparationInput.value,
      photoInputURL.value
        ? photoInputURL.value
        : `https://source.unsplash.com/1200x720/?food`,
      `${ratingValue}`
    )
  );

  window.localStorage.setItem("data", JSON.stringify(data));
};

//  ############ PRINT MEALS TO THE DOM ############

const printMeals = function () {
  const insertMeals = `
  <li data-index="${data[i].index}" id="${data[i].name}"  class="meals-container">
  <div class="meal-img"><img src="${data[i].img}" width="auto" height="auto"/></div>
  <h3 class="meal-name">${data[i].name}</h3>
  <p id="rating"> ${data[i].rating} </p>
  <ul class="description-list">
  <li id="meal-type"><span class="bold">Typ posiłku:</span> ${data[i].type} </li>
  <li><span class="bold"> ⏱ Czas przygotowania:</span> ${data[i].preparation} min </li>
  <li><span class="bold"> 🥣 Składniki:</span> ${data[i].ingredients} </li>
  <li><span class="bold"> 🖋 Opis:</span> ${data[i].description} </li>
  
  </ul>
  `;
  output.insertAdjacentHTML("afterbegin", insertMeals);

  // add to recipes select list
  select.insertAdjacentHTML(
    "beforeend",
    `
    <option value="${data[i].name}" data-id="${data[i].name}">${data[i].name}
    `
  );
  i++;
};

function clearInputFields() {
  nameInput.value = "";
  typeInput.value = "";
  ingredientsInput.value = "";
  descriptionInput.value = "";
  preparationInput.value = "";
  photoInputURL.value = "";
  ratingStars.value = "";
}

//  ############ ADD NEW RECIPE ############

submitBtn.addEventListener("click", () => {
  // check if name is correct (not empty)
  if (nameInput.value == "") {
    emptyNameWarning.style.opacity = 1;
    setTimeout(() => {
      emptyNameWarning.style.opacity = 0;
    }, 3000);
    return;
  }
  submitForm();
  printMeals();
  modal.close();
  switchForward();
  clearInputFields();
});

// close modal
closeModalBtn.addEventListener("click", () => {
  modal.close();
});

// recipe form modal open
newRecipe.addEventListener("click", () => {
  modal.showModal();
});

// CAROUSEL START VALUE
let idx = 0;

//  ############ NEXT RECIPE FUNCTION ############
const switchForward = function () {
  const mealCard = document.querySelectorAll(".meals-container");

  mealCard.forEach((meal) => {
    meal.classList.remove("active");
  });
  idx++;
  if (idx > mealCard.length - 1) idx = 0;
  mealCard[idx].classList.add("active");

  // update select value
  select.value = document.querySelector(".active").children[1].textContent;
};

// previous recipe function
const switchBackward = function () {
  const mealCard = document.querySelectorAll(".meals-container");

  mealCard.forEach((meal) => {
    meal.classList.remove("active");
  });
  idx--;
  if (idx < 0) idx = mealCard.length - 1;
  mealCard[idx].classList.add("active");
  // update select value
  select.value = document.querySelector(".active").children[1].textContent;
};

btnRight.addEventListener("click", () => {
  switchForward();
});
btnLeft.addEventListener("click", () => {
  switchBackward();
});

document.addEventListener("keydown", (e) => {
  if (e.keyCode == 39) switchForward();
  if (e.keyCode == 37) switchBackward();
});

//  ############ SELECT RECIPE FROM LIST AND SHOW ############
select.addEventListener("change", () => {
  const result = data.filter((obj) => {
    return obj.name === select.value;
  });

  // remove activ to last div and add active to another
  const mealCard = document.querySelectorAll(".meals-container");
  mealCard.forEach((meal) => {
    meal.classList.remove("active");
  });
  document.getElementById(result[0].name).classList.add("active");
});

// data.forEach((obj) => {
//   if (obj.preparation > 25) console.log(obj.name, obj.type);
//   if (obj.type == "kolacja") console.log(obj.name);
// });

//  ############ DELETE RECIPE ############
// get active element id and check index of data array
delRecipe.addEventListener("click", () => {
  // show modal and if answer value == true proceed function. If value == false, return function
  delModal.showModal();
  delModal.style.opacity = "1";
  btnNo.addEventListener("click", () => {
    delModal.close();
    delModal.style.opacity = "0";
  });

  btnYes.addEventListener("click", () => {
    // close modal
    delModal.close();
    delModal.style.opacity = "0";
    let activeContent = document.querySelector(".active").id;
    document.querySelector(`[data-id="${activeContent}"]`).remove();

    const index = data
      .map((e) => e.name)
      .indexOf(document.querySelector(".active").id);

    // remove data src position from array
    data.splice(index, 1);

    //  ############ REMOVE DOM ELEMENT ############
    document.querySelector(".active").remove();

    window.localStorage.setItem("data", JSON.stringify(data));

    // // reset data index counter
    i--;
    // // set another recipe
    setTimeout(() => {
      switchBackward();
    }, 300);
  });
});

//  ############ RATING SYSTEM ############
ratingStars.forEach((star) => {
  star.addEventListener("click", () => {
    // ratingValue = star.id.slice(5, 6);
    let starsSelected = star.value;

    function checkRating(stars) {
      stars = starsSelected;

      if (stars == 1) {
        return `⭐`;
      } else if (stars == 2) {
        return `⭐⭐`;
      } else if (stars == 3) {
        return `⭐⭐⭐`;
      } else if (stars == 4) {
        return `⭐⭐⭐⭐`;
      } else if (stars == 5) {
        return `⭐⭐⭐⭐⭐`;
      }
    }

    ratingValue = checkRating(starsSelected);
  });
});

// print all meals from data src
data.forEach(() => {
  printMeals();
  switchForward();
});

// function download(content, fileName, contentType) {
//   const a = document.createElement("a");
//   const file = new Blob([content], { type: contentType });
//   a.href = URL.createObjectURL(file);
//   a.download = fileName;
//   a.click();
// }

// function onDownload() {
//   download(JSON.stringify(data), "json-file-name.json", "text/plain");
// }

// const downloadData = document.querySelector("#download-data");
// downloadData.addEventListener("click", onDownload);
