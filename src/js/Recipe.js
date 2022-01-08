import { useState, useEffect, useContext } from "react";
import { AppContext } from "./App";

import PopUp from "./PopUp";

const Recipes = () => {
    const [choosenRecipeId, setChoosenRecipeId] = useState(null);
    const [choosenRecipe, setChoosenRecipe] = useState(null);
    const [showPopUp, setShowPopUp] = useState(false);

    const {recipes, handleSelectYourRecipe} = useContext(AppContext);

    useEffect(() => {
        choosenRecipeId &&
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${choosenRecipeId}`)
            .then(res => res.json())
            .then(data => setChoosenRecipe(data.meals[0]))
            .catch(err => console.warn(err))
    }, [choosenRecipeId])

    const handleChooseRecipe = (id) => {
        setChoosenRecipeId(id);
        setShowPopUp(true);
    }

    return <>
        {recipes ? recipes.map(recipe => {
            return <>
                <div className="recipe" key={recipe.idMeal}>
                    <img src={recipe.strMealThumb} alt="MealImg" />
                    <h2>{recipe.strMeal}</h2>
                    <button onClick={() => handleChooseRecipe(recipe.idMeal)}>Check this out!</button>
                    <i className="far fa-heart"></i>
                </div>
            </>
        }) : <h1>No matching results</h1>}
        {showPopUp  && <PopUp recipe={choosenRecipe}/>}
        {showPopUp  && console.log(choosenRecipe)}
    </>
}
 
export default Recipes;