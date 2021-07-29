import { useState, useEffect } from "react";

const Form = ({keyIngredient, onSearch, onClick}) => {
    const [country, setCountry] = useState("");

    useEffect(() => {
        fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
            .then(res => res.json())
            .then(data => setCountry(data.meals))
            .catch(err => console.warn(err))
    }, [])

    const onSubmit = e => {
     e.preventDefault();
    }

    return ( 
        <form onSubmit={e => onSubmit(e)}>
            <h1>Find some tasty flavours:</h1>
            <input id="mainInput" type="text" value={keyIngredient} onChange={e => onSearch(e)} placeholder="What groceries do you have?" autoComplete="off"/>
            <div className="countryTags">
                {country && country.map((el,i) => {
                    return <input key={i} type="button" value={el.strArea} onClick={e => onClick(e)}/>
                })}
            </div>
        </form>
    );
}
 
export default Form;