import React, { useState } from "react";
import Recipe from "./Recipe";

const FoodRecipe = () => {
  const APP_ID = "d0c42674";
  const APP_KEY = "1aac8386ed568ff61ffa895046db59ec";

  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);

  const getData = () => {
    fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    )
      .then((res) => res.json())
      .then((result) => {
        setQuery("");
        setRecipes(result.hits);
        console.log(result.hits);
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    getData();
  };

  const onChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <h1>Search Food Recipes</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Search Food"
          onChange={onChange}
          value={query}
        ></input>
        <input type="submit" value="search" />
      </form>
      <div>
        {recipes.map((recipe) => (
          <Recipe recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default FoodRecipe;
