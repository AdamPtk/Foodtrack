const PopUp = ({recipe}) => {
    return (
        <div className="popup">
            <i class="fas fa-times"></i>
            <h1>{recipe.strMeal}</h1>
            {/* <img src={recipe.strMealThumb} alt="MealImg" /> */}
        </div>
    );
}
 
export default PopUp;