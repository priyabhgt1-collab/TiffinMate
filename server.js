<<<<<<< HEAD
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// MongoDB
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.log("MongoDB Error:", error));

// =========================
// MODELS
// =========================

const mealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  day: {
    type: String,
    required: true
  }
});

const Meal = mongoose.model("Meal", mealSchema);


const favouriteSchema = new mongoose.Schema({
  meal: {
    type: String,
    required: true
  }
});

const Favourite = mongoose.model("Favourite", favouriteSchema);


const shoppingSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true
  }
});

const Shopping = mongoose.model("Shopping", shoppingSchema);


// =========================
// HOME PAGE
// =========================

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});


// =========================
// MEALS
// =========================

// Get all meals
app.get("/api/meals", async (req, res) => {
  try {
    const meals = await Meal.find();
    res.json(meals);
  } catch (error) {
    res.status(500).json({
      message: "Unable to fetch meals",
      error: error.message
    });
  }
});


// Add meal
app.post("/api/meals", async (req, res) => {
  try {
    const { name, day } = req.body;

    if (!name || !day) {
      return res.status(400).json({
        message: "Meal name and day are required"
      });
    }

    const meal = new Meal({
      name,
      day
    });

    await meal.save();

    res.json({
      message: "Meal added successfully",
      meal
    });

  } catch (error) {
    res.status(500).json({
      message: "Unable to add meal",
      error: error.message
    });
  }
});


// =========================
// FAVOURITES
// =========================

// Add favourite
app.post("/api/favourite", async (req, res) => {
  try {
    const { meal } = req.body;

    if (!meal) {
      return res.status(400).json({
        message: "Meal name is required"
      });
    }

    const existing = await Favourite.findOne({ meal });

    if (existing) {
      return res.json({
        message: "Already in favourites",
        favourite: existing
      });
    }

    const favourite = new Favourite({
      meal
    });

    await favourite.save();

    res.json({
      message: "Added to favourites",
      favourite
    });

  } catch (error) {
    res.status(500).json({
      message: "Unable to add favourite",
      error: error.message
    });
  }
});


// Get favourites
app.get("/api/favourites", async (req, res) => {
  try {
    const favourites = await Favourite.find();

    res.json(favourites);

  } catch (error) {
    res.status(500).json({
      message: "Unable to fetch favourites",
      error: error.message
    });
  }
});


// Remove favourite
app.delete("/api/favourites/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await Favourite.findByIdAndDelete(id);

    res.json({
      message: "Favourite removed successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Unable to remove favourite",
      error: error.message
    });
  }
});


// =========================
// SHOPPING LIST
// =========================

// Add shopping item
app.post("/api/shopping", async (req, res) => {
  try {
    const { item } = req.body;

    if (!item) {
      return res.status(400).json({
        message: "Shopping item is required"
      });
    }

    const shoppingItem = new Shopping({
      item
    });

    await shoppingItem.save();

    res.json({
      message: "Shopping item added",
      shoppingItem
    });

  } catch (error) {
    res.status(500).json({
      message: "Unable to add shopping item",
      error: error.message
    });
  }
});


// Get shopping list
app.get("/api/shopping", async (req, res) => {
  try {
    const shoppingList = await Shopping.find();

    res.json(shoppingList);

  } catch (error) {
    res.status(500).json({
      message: "Unable to fetch shopping list",
      error: error.message
    });
  }
});


// =========================
// START SERVER
// =========================

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
=======
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 5000;

// ===============================
// MIDDLEWARE
// ===============================

app.use(cors());
app.use(express.json());

// Serve all frontend files
app.use(express.static(__dirname));

// ===============================
// MONGODB CONNECTION
// ===============================

// IMPORTANT:
// Put your NEW MongoDB Atlas connection string here
const MONGO_URI = "mongodb://tiffinmate:SPh54vyYxJAch0aq@ac-j2onwj4-shard-00-00.kibwd0c.mongodb.net:27017,ac-j2onwj4-shard-00-01.kibwd0c.mongodb.net:27017,ac-j2onwj4-shard-00-02.kibwd0c.mongodb.net:27017/?ssl=true&replicaSet=atlas-6czy3r-shard-0&authSource=admin&appName=Cluster0";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log("MongoDB Error:", error);
  });

// ===============================
// FRONTEND PAGES
// ===============================

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/index.html", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/admin.html", (req, res) => {
  res.sendFile(path.join(__dirname, "admin.html"));
});

app.get("/meals.html", (req, res) => {
  res.sendFile(path.join(__dirname, "meals.html"));
});

app.get("/favourites.html", (req, res) => {
  res.sendFile(path.join(__dirname, "favourites.html"));
});

// ===============================
// MEAL SCHEMA
// ===============================

const mealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  day: {
    type: String,
    required: true
  }
});

const Meal = mongoose.model("Meal", mealSchema);

// ===============================
// FAVOURITE SCHEMA
// ===============================

const favouriteSchema = new mongoose.Schema({
  meal: {
    type: String,
    required: true
  }
});

const Favourite = mongoose.model("Favourite", favouriteSchema);

// ===============================
// SHOPPING SCHEMA
// ===============================

const shoppingSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true
  }
});

const Shopping = mongoose.model("Shopping", shoppingSchema);

// ===============================
// GET ALL MEALS
// ===============================

app.get("/api/meals", async (req, res) => {
  try {
    const meals = await Meal.find();
    res.json(meals);
  } catch (error) {
    res.status(500).json({
      message: "Unable to fetch meals",
      error: error.message
    });
  }
});

// ===============================
// ADD MEAL
// ===============================

app.post("/api/meals", async (req, res) => {
  try {
    const { name, day } = req.body;

    if (!name || !day) {
      return res.status(400).json({
        message: "Meal name and day are required"
      });
    }

    const meal = new Meal({
      name,
      day
    });

    await meal.save();

    res.json({
      message: "Meal added successfully",
      meal
    });

  } catch (error) {
    res.status(500).json({
      message: "Unable to add meal",
      error: error.message
    });
  }
});

// ===============================
// ADD FAVOURITE
// ===============================

app.post("/api/favourite", async (req, res) => {
  try {
    const { meal } = req.body;

    if (!meal) {
      return res.status(400).json({
        message: "Meal name is required"
      });
    }

    const existing = await Favourite.findOne({ meal });

    if (existing) {
      return res.json({
        message: "Already in favourites",
        favourite: existing
      });
    }

    const favourite = new Favourite({
      meal
    });

    await favourite.save();

    res.json({
      message: "Added to favourites",
      favourite
    });

  } catch (error) {
    res.status(500).json({
      message: "Unable to add favourite",
      error: error.message
    });
  }
});

// ===============================
// GET FAVOURITES
// ===============================

app.get("/api/favourites", async (req, res) => {
  // DELETE FAVOURITE

app.delete("/api/favourites/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await Favourite.findByIdAndDelete(id);

    res.json({
      message: "Favourite removed successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Unable to remove favourite",
      error: error.message
    });
  }
});
  try {
    const favourites = await Favourite.find();
    res.json(favourites);

  } catch (error) {
    res.status(500).json({
      message: "Unable to fetch favourites",
      error: error.message
    });
  }
});

// ===============================
// ADD SHOPPING ITEM
// ===============================

app.post("/api/shopping", async (req, res) => {
  try {
    const { item } = req.body;

    if (!item) {
      return res.status(400).json({
        message: "Shopping item is required"
      });
    }

    const shoppingItem = new Shopping({
      item
    });

    await shoppingItem.save();

    res.json({
      message: "Shopping item added",
      shoppingItem
    });

  } catch (error) {
    res.status(500).json({
      message: "Unable to add shopping item",
      error: error.message
    });
  }
});

// ===============================
// GET SHOPPING LIST
// ===============================

app.get("/api/shopping", async (req, res) => {
  try {
    const shoppingList = await Shopping.find();
    res.json(shoppingList);

  } catch (error) {
    res.status(500).json({
      message: "Unable to fetch shopping list",
      error: error.message
    });
  }
});

// ===============================
// START SERVER
// ===============================

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
>>>>>>> 9ac9ed1d431e1113f1547ac6e9cd391af58c2325
});