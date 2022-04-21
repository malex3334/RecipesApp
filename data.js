import { Meal, salatkaCezar, kremGroszkowy } from "./constructor.js";

// data src
let data = [salatkaCezar, kremGroszkowy];

const data1 = JSON.parse(window.localStorage.getItem("data"));

if (!data1) {
  data = data;
} else {
  data = [...data1];
}

export { data, Meal };
