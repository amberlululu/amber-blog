import React, { useState } from "react";
import RecipeDetails from "./RecipeDetails";

const Recipe = (props) => {
  const [show, setShow] = useState(false);
  const { label, image, url, ingredients } = props.recipe.recipe;

  let addRecipeObject = {
    label: label,
    image: image,
    url: url,
  };

  const addNewRecipeWrapper = (event) => {
    event.preventDefault();
    addNewRecipe(addRecipeObject);
  };

  const addNewRecipe = (addRecipeObject) => {
    fetch(`/api/v1/recipes`, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addRecipeObject),
    })
      .then((response) => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw error;
        }
      })
      .then((response) => response.json())
      .then((body) => {
        if (body.error) {
        } else {
          props.addRecipe(body);
        }
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  };

  return (
    <div className="recipe">
      <h2>{label}</h2>
      <img src={image} alt={label} />
      <a href={url} target="_blank" rel="noopener noreferencer">
        Recipe Details
      </a>
      <button onClick={addNewRecipeWrapper} className="list">
        Add to My List
      </button>
      <button onClick={() => setShow(!show)} className="ingre">
        Ingredients
      </button>
      {show && <RecipeDetails ingredients={ingredients} />}
    </div>
  );
};

export default Recipe;
