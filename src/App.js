import React,{useState} from 'react';
import './App.css';
import PokemoneList from './components/PokemoneList';
import axios from 'axios'

function App() {
  const [pokemon,setPokemon] = useState([])
  axios.get('https://pokeapi.co/api/v2/pokemon').then(res=>{
    setPokemon(res.data.results.map(p=> p.name))
  })  
  return (
    <PokemoneList pokemon={pokemon} />
  );
}

export default App;
