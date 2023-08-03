/* eslint-disable react/prop-types */
import Country from "./Country";

function Content({ countriesToShow, setCountriesToShow }) {
    if (countriesToShow.length > 10) {
        return <p>Too many matches, specify another filter</p>;
    } else if (
        (countriesToShow.length > 1 && countriesToShow.length < 10) ||
        countriesToShow.length === 0
    ) {
        return (
            <ul>
                {countriesToShow.map((country, i) => (
                    <li key={i}>
                        {country.name.common}{" "}
                        <button onClick={() => setCountriesToShow([country])}>
                            show
                        </button>
                    </li>
                ))}
            </ul>
        );
    } else {
        return <Country country={countriesToShow[0]} />;
    }
}

export default Content;
