import React,{useState, useEffect} from 'react';
import './App.css';
import PokemoneList from './components/PokemoneList';
import axios from 'axios'
import Pagination from './components/Pagination'


function App() {
  const [pokemon,setPokemon] = useState([])
  const [currentPageUrl,setCurrentPageUrl] =useState('https://pokeapi.co/api/v2/pokemon')
  const [nextPageUrl,setNextPageUrl] =useState()
  const [prevPageUrl,setPrevPageUrl] =useState()

  const [loading,setLoading]= useState(true)

  useEffect(() => {
    setLoading(true)
    let cancel;
    axios.get(currentPageUrl,{
      cancelToken: new axios.CancelToken(c=>cancel=c)
    }).then(res=>{
      setLoading(false)
      setNextPageUrl(res.data.next)
      setPrevPageUrl(res.data.previous)
      setPokemon(res.data.results.map(p=> p.name))
  })
  return()=> cancel()

}, [currentPageUrl])

  if(loading){
    return(
      <div className="loader">Loading...</div>
    )
  }

  function goToNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }

  function goToPrevPage(){
    setCurrentPageUrl(prevPageUrl)
  }

  return (
    <>
      <PokemoneList pokemon={pokemon} />
      <Pagination goToNextPage={nextPageUrl ?goToNextPage:null} goToPrevPage={prevPageUrl ?goToPrevPage:null}/>
    </>
  );
}

export default App;
