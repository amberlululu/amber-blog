import React, { useState } from "react";
import Recipe from "./Recipe";
import { v4 as uuidv4 } from "uuid";
import Alert from "./Alert";

const FoodRecipe = () => {
  const APP_ID = "d0c42674";
  const APP_KEY = "1aac8386ed568ff61ffa895046db59ec";

  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [alert, setAlert] = useState("");

  const getData = () => {
    if (query !== "") {
      fetch(
        `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      )
        .then((res) => res.json())
        .then((result) => {
          if (!result.more) {
            return setAlert("No food with such name");
          }
          setQuery("");
          setRecipes(result.hits);
          setAlert("");
          console.log(result.hits);
        });
    } else {
      setAlert("Please fill the form");
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    getData();
  };

  const onChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="food-recipe">
      <h1>Search Food Recipes</h1>
      <form className="search-form" onSubmit={onSubmit}>
        {alert !== "" && <Alert alert={alert} />}
        <input
          type="text"
          placeholder="Search Food"
          onChange={onChange}
          value={query}
        ></input>
        <input type="submit" value="search" />
      </form>
      <div className="recipes">
        {recipes.map((recipe) => (
          <Recipe key={uuidv4()} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default FoodRecipe;
