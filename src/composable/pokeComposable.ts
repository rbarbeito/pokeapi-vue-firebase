import type { PokemonResponse } from "@/interfaces/pokemon.Interfaces";




export const pokeComposable = () => {

  const getPokemon = async (pokeName: string): Promise<PokemonResponse | undefined> => {
    try {
      const consulta = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
      const data = await consulta.json()
      if (!data) return undefined

      return data
    } catch (error) {
      console.log('error :', error);

    }
  }




  return { getPokemon }
}
