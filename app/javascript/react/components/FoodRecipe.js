import React, { useState, useEffect } from "react";
import Recipe from "./Recipe";
import { v4 as uuidv4 } from "uuid";
import Alert from "./Alert";
import RecipeRow from "./RecipeRow";

const FoodRecipe = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [alert, setAlert] = useState("");
  const [saveRecipes, setSaveRecipes] = useState([]);

  const getData = () => {
    if (query !== "") {
      fetch(`api/v1/recipes/search?query=${query}`)
        .then((res) => res.json())
        .then((result) => {
          if (!result.result.more) {
            return setAlert("No food with such name");
          } else {
            setQuery("");
            setRecipes(result.result.hits);
            setAlert("");
          }
        });
    } else {
      setAlert("Please fill the form");
    }
  };

  useEffect(() => {
    fetch("/api/v1/recipes")
      .then((response) => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw error;
        }
      })
      .then((response) => {
        return response.json();
      })
      .then((body) => {
        if (body.recipes) {
          setSaveRecipes(body.recipes);
        } else if (body.error) {
          setAlert(body.error[0]);
        } else {
          setSaveRecipes(body);
        }
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  }, []);

  const updatedRecipes = (updatedRecipe) => {
    setSaveRecipes(updatedRecipe);
  };

  let recipetiles = saveRecipes.map((eachRecipe, index) => {
    return (
      <RecipeRow
        index={index}
        id={eachRecipe.id}
        key={eachRecipe.id}
        label={eachRecipe.label}
        url={eachRecipe.url}
        image={eachRecipe.image}
        updatedRecipes={updatedRecipes}
      />
    );
  });

  const onSubmit = (e) => {
    e.preventDefault();
    getData();
  };

  const onChange = (e) => {
    setQuery(e.target.value);
  };

  const addRecipe = (newRecipe) => {
    setSaveRecipes([...saveRecipes, newRecipe]);
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
      <table className="table container">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Recipe Name</th>
            <th scope="col">URL</th>
            <th scope="col">IMAGE</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>{recipetiles}</tbody>
      </table>
      <div className="recipes">
        {recipes.map((recipe) => (
          <Recipe key={uuidv4()} recipe={recipe} addRecipe={addRecipe} />
        ))}
      </div>
    </div>
  );
};

export default FoodRecipe;
