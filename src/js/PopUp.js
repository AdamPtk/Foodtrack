import { useState, useEffect } from "react";

const PopUp = ({id, setShowPopUp}) => {
    const [choosenRecipe, setChoosenRecipe] = useState(null);
    
    useEffect(() => {
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => res.json())
        .then(data => setChoosenRecipe(data.meals[0]))
        .catch(err => console.warn(err))
    }, [id])

    const ingredientsList = () => {
        let ingrArr = [];
        for (const [key, value] of Object.entries(choosenRecipe)) {
            if (key.startsWith('strIngredient') && value) {
                ingrArr.push(value)
            }
        }
        return ingrArr
    }

    const measuresList = () => {
        let measArr = [];
        for (const [key, value] of Object.entries(choosenRecipe)) {
            if (key.startsWith('strMeasure') && value) {
                measArr.push(value)
            }
        }
        return measArr
    }
    
    if (!choosenRecipe) {
        return (
            <div className="popup">
                Ładowanie...
            </div>
        ) 
    } else {
        return (
            <div className="popup">
                <i className="fas fa-times" onClick={() => setShowPopUp(false)}></i>
                <h1>{choosenRecipe.strMeal}</h1>
                <div className="recipe-header">
                    <img src={choosenRecipe.strMealThumb} alt="MealImg" />
                    <div className="ingredients">
                        <ul>
                            {ingredientsList().map((el, i) => {
                                return <li key={i}>{el}</li>
                            })}
                        </ul>
                        <ul>
                            {measuresList().map((el, i) => {
                                return <li key={i}>{el}</li>
                            })}
                        </ul>
                    </div>
                </div>
                <main>
                    <p>{choosenRecipe.strInstructions}</p>
                    <a href={choosenRecipe.strYoutube} target="_blank">Youtube link<i className="fas fa-arrow-right"></i></a>
                </main>
            </div>
        );
    }
}
 
export default PopUp;