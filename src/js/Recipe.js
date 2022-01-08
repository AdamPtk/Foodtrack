import { useState, useContext } from "react";
import { AppContext } from "./App";

const Recipe = () => {
    const [recipeWindow, setRecipeWindow] = useState(false);

    const {recipes, handleSelectYourRecipe} = useContext(AppContext);
    const handleShowRecipe = () => {
        setRecipeWindow(true);
    }

    return <>
        {recipes ? recipes.map(recipe => {
            return <div className="recipe" key={recipe.idMeal}>
                <img src={recipe.strMealThumb} alt="MealImg" />
                <h2>{recipe.strMeal}</h2>
                <button onClick={handleShowRecipe}>Check this out!</button>
                <i class="far fa-heart"></i>
            </div>
        }) : <h1>No matching results</h1>}
    </>
}
 
export default Recipe;