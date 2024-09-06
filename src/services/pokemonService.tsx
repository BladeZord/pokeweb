import { Pokemon } from "../models/Pokemon.m";

export async function getPokemons(): Promise<Pokemon[]> {
    try {
        const response = await fetch("https://unpkg.com/pokemons@1.1.0/pokemons.json");
        const datos = await response.json();

        const pokemons: Pokemon[] = datos.results.map((pokemon: any) => ({
            id: pokemon.national_number,
            name: 
                pokemon.name.includes("♂") 
                    ? pokemon.name.replace(/♂/g, " (male)") 
                    : pokemon.name.includes("♀") 
                    ? pokemon.name.replace(/♀/g, " (female)") 
                    : pokemon.name,
            imgif: correccionNombre(pokemon.sprites['animated']),
            imgnormal: correccionNombre(pokemon.sprites['normal']),
            imglarge: correccionNombre(pokemon.sprites['large']),
            total: pokemon.total,
            hp: pokemon.hp,
            type: pokemon.type, // Mantén el array de strings
            attack: pokemon.attack,
            defense: pokemon.defense,
            sp_atk: pokemon.sp_atk,
            sp_def: pokemon.sp_def,
            speed: pokemon.speed,
        }));
        

        // Filtrar Pokémon únicos basados en el id
        const uniquePokemons = Array.from(new Set(pokemons.map(pokemon => pokemon.id)))
            .map(id => pokemons.find(pokemon => pokemon.id === id)!);

        return uniquePokemons;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}


export function correccionNombre(name: string): string {
    // Reemplazar "farfetch'd" por "farfetchd"
    if (name.includes("farfetch'd")) {
        return name.replace(/farfetch'd/g, "farfetchd");
    }
    // Reemplazar "mr.-mime" por "mr-mime"
    if (name.includes("mr.-mime")) {
        return name.replace(/mr.-mime/g, "mr-mime");
    }
    // Reemplazar el símbolo masculino por "-m"
    if (name.includes("♂")) {
        return name.replace(/♂/g, "-m");
    }
    // Reemplazar el símbolo femenino por "-f"
    if (name.includes("♀")) {
        return name.replace(/♀/g, "-f");
    }
    // Si no hay coincidencias, devolver el nombre original
    return name;
}

