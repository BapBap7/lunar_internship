import usePokemonData from "../api/apiService";


const Selector = () => {
    const data = usePokemonData()
    console.log(data)
    return (
        <div>
            {data !== null ? (
                <ul>
                    {/* Check if data is an object and has the 'results' property */}
                    {data && 'results' in data && Array.isArray(data.results) ? (
                        data.results.map((pokemon : object) => (
                            <li key={pokemon.name}>{pokemon.name}</li>
                        ))
                    ) : (
                        <div>Loading...</div>
                    )}
                </ul>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    )
}

export default Selector;