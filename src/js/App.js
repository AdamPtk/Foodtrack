import { useState, useEffect, createContext } from 'react';
import Nav from './Nav';
import Form from './Form';
import Results from './Results';
import YourRecipes from './YourRecipes';
import NotFound from './NotFound';
import {
  HashRouter,
  Route,
  Switch
} from 'react-router-dom';

export const AppContext = createContext([]);

function App() {
  const [recipes, setRecipes] = useState(null);
  const [keyIngredient, setKeyIngredient] = useState("");
  const [keyCountry, setKeyCountry] = useState("");

  const host = "http://localhost:8000";

  const [yourRecipes, setYourRecipes] = useState(null);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyIngredient}`)
        .then(res => res.json())
        .then(data => setRecipes(data.meals))
        .catch(err => console.warn(err))
    }, [keyIngredient])

  const handleOnChange = (e) => {
    setKeyIngredient(e.target.value)
    setKeyCountry("")
  }

  useEffect(() => {
    if (keyCountry) {
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${keyCountry}`)
      .then(res => res.json())
      .then(data => {
        setRecipes(data.meals)
      })
      .catch(err => console.warn(err))
    }
  }, [keyCountry])

  const handleOnClick = (e) => {

        setKeyCountry(e.target.value)
        setKeyIngredient("")
  }

  const handleSelectYourRecipe = yourRecipe => {
    fetch(`${host}/db`, {
        method: "POST",
        body: JSON.stringify(yourRecipe),
        headers: {
            "Content-Type": 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => setYourRecipes(prev => [...prev, data]))
}

  return (
    <AppContext.Provider value={{recipes, handleSelectYourRecipe}}>
    <HashRouter>
      <div className="app">
        <Nav />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Form keyIngredient={keyIngredient} onSearch={e => handleOnChange(e)} onClick={e => handleOnClick(e)}/>
              <Results onAdd={handleSelectYourRecipe}/>
            </Route>
            <Route path="/yourrecipes" component={YourRecipes} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    </HashRouter>
    </AppContext.Provider>
  );
}

export default App;
