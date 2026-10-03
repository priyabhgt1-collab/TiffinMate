const meals = [
  {
    name: "Rajma Rice",
    day: "Monday",
    image: "./rajma-rice.jpg",
    description: "Healthy rajma with delicious steamed rice."
  },
  {
    name: "Veg Sandwich",
    day: "Tuesday",
    image: "./veg-sandwich.jpg",
    description: "Fresh and tasty vegetable sandwich."
  },
  {
    name: "Paneer Kathi Roll",
    day: "Wednesday",
    image: "./paneer-kathi-roll.jpg",
    description: "Soft roll filled with delicious paneer and vegetables."
  },
  {
    name: "Veg Pasta",
    day: "Thursday",
    image: "./veg-pasta.jpg",
    description: "Creamy and delicious vegetable pasta."
  },
  {
    name: "Chole Salad",
    day: "Friday",
    image: "./chole-salad.jpg",
    description: "Healthy chickpea salad with fresh vegetables."
  },
  {
    name: "Aloo Paratha",
    day: "Saturday",
    image: "./aloo-prantha.jpg",
    description: "Homemade aloo paratha, perfect for a filling tiffin."
  },
  {
    name: "Veg Pulao",
    day: "Sunday",
    image: "./veg-pulao.jpg",
    description: "Flavorful vegetable pulao with fresh ingredients."
  }
];

const mealList = document.getElementById("mealList");

function displayMeals() {
  if (!mealList) return;

  mealList.innerHTML = "";

  meals.forEach((meal) => {
    const card = document.createElement("div");

    card.className = "meal-card";

    card.innerHTML = `
      <img
        src="${meal.image}"
        alt="${meal.name}"
        onerror="this.style.display='none'"
      >

      <div class="meal-info">
        <h3>${meal.name}</h3>

        <p class="meal-day">
          ${meal.day}
        </p>

        <p>
          ${meal.description}
        </p>

        <button onclick="addToFavourite('${meal.name}')">
          ❤️ Favourite
        </button>
      </div>
    `;

    mealList.appendChild(card);
  });
}


async function addToFavourite(mealName) {
  try {
    const response = await fetch("https://tiffinmate-qsxx.render.com/api/favourite", {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        meal: mealName
      })
    });

    const data = await response.json();

    if (response.ok) {

      if (data.message === "Already in favourites") {
        alert(
          mealName +
          " is already in your favourites ❤️"
        );
      } else {
        alert(
          mealName +
          " added to favourites ❤️"
        );
      }

    } else {
      alert("Could not add meal to favourites.");
    }

  } catch (error) {

    console.error(error);

    alert(
      "Server connection error. Please check if server is running."
    );
  }
}


displayMeals();