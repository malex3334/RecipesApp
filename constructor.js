class Meal {
  constructor(
    index,
    name,
    type,
    ingredients,
    description = "no description",
    preparation = 0,
    img = "123",
    rating = "no rating yet"
  ) {
    this.index = index;
    this.name = name;
    this.type = type;
    this.ingredients = ingredients;
    this.description = description;
    this.preparation = preparation;
    this.img = img;
    this.rating = rating;
  }
}

let salatkaCezar = new Meal(
  0,
  "Sałatka cezar z kurczakiem i makaronem",
  "Obiad",
  [
    " pomidory koktajlowe",
    " mięso z piersi kurczaka",
    " makaron penne",
    " sałata",
    " oliwa z oliwek",
    " oregano",
    " mielona słodka papryka",
    " sól biała",
    " pieprz",
  ],

  "1. Makaron ugotować wg instrukcji na opakowaniu. Kurczaka pokroić w kostkę i wymieszać z przyprawami. 3. Warzywa pokroić w dowolny sposób. 4. Na połowie oliwy usmażyć kurczaka. 5. Kiedy makaron ostygie wymieszać wszystkie składniki sałatki.",
  30,
  `./img/1.jpg`,
  "⭐⭐⭐⭐⭐"
);

let kremGroszkowy = new Meal(
  1,
  "Krem z zielonego groszku i szpinaku",
  "Kolacja",
  [
    " Bulion warzywny (domowy)",
    " Groszek zielony",
    " Ziemniaki",
    " Szpinak",
    " Chleb orkiszowy",
    " Dynia, pestki łuskane",
    " Cytryna",
    " Mięta",
    " Pieprz czarny mielony",
    " Sól biała",
  ],
  "1. W bulionie ugotuj ziemniaki. Gdy zmiękną dodaj groszek, szpinak, sok z cytryny oraz miętę i przyprawy. Zagotuj a następnie zmiksuj blenderem na gładki krem. Posyp pestkami i grzankami z chleba",
  30,
  `./img/1.jpg`,
  "⭐⭐⭐⭐⭐ "
);

export { Meal, salatkaCezar, kremGroszkowy };
