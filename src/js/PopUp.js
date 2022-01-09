import { useState, useEffect } from "react";

const PopUp = ({id}) => {
    const [choosenRecipe, setChoosenRecipe] = useState(null);
    
    useEffect(() => {
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => res.json())
        .then(data => setChoosenRecipe(data.meals[0]))
        .catch(err => console.warn(err))
    }, [])
    
    if (!choosenRecipe) {
        return (
            <div className="popup">
                Ładowanie...
            </div>
        ) 
    } else {
        return (
            <div className="popup">
                <i className="fas fa-times"></i>
                <h1>{choosenRecipe.strMeal}</h1>
                <img src={choosenRecipe.strMealThumb} alt="MealImg" />
            </div>
        );
    }
}
 
export default PopUp;