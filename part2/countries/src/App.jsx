import countriesService from "./services/countries";
import Content from "./components/Content";

import { useState, useEffect } from "react";

function App() {
    const [allCountries, setAllCountries] = useState([]);
    const [countriesToShow, setCountriesToShow] = useState([]);
    const handleSearch = (e) => {
        const value = e.target.value;
        const matchCountries = allCountries.filter((country) =>
            country.name.common.toLowerCase().includes(value)
        );
        setCountriesToShow(matchCountries);
    };

    useEffect(() => {
        countriesService
            .getAllCountries()
            .then((response) => {
                setAllCountries(response);
            })
            .catch((error) => console.log(error));
    }, []);
    return (
        <div>
            find countries <input type="search" onInput={handleSearch} />
            <Content
                countriesToShow={countriesToShow}
                setCountriesToShow={setCountriesToShow}
            />
        </div>
    );
}

export default App;
