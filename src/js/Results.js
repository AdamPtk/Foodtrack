import Recipes from "./Recipe"

const Results = () => {
    return (
        <div className="results">
            <h1>Your results:</h1>
            <div className="wrapper">
                <Recipes />
            </div>
        </div>
    );
}
 
export default Results;