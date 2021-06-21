import {useState,useEffect} from 'react'
import './App.css';
import useSWR from 'swr' 

const fetcher = (...args)=> fetch(...args).then((response) => response.json())

function App() {
  const [gameTitle,setgameTitle] = useState("")
  const [searchedGames,setsearchedGames] = useState([])
  

  const {data,error}= useSWR('https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=20&pageSize=3',fetcher)
  
  
  const searchGame=()=>{
    fetch(`https://www.cheapshark.com/api/1.0/games?title=${gameTitle}&limit=10`)
    .then((response)=> response.json())
    .then((data)=>{
      setsearchedGames(data);
    })
  }
  
  return (
    <div className="App">
      <div className="searchSection">
        <h1>Search for a game</h1>
        <input type="text" placeholder="Minecraft..." onChange={(event)=>{
          setgameTitle(event.target.value)
        }}/>
        <button onClick={searchGame}>Search game title</button>
        <div className="games">
          {searchedGames.map((game,key)=>{
            return(
              <div className="game" key={key}>
                {game.external}
                <img src={game.thumb} />
                {game.cheapest}
              </div>
            )
          })}
        </div>
      </div>
      <div className="dealsSection">
      <h1>Latest deals:</h1>
        <div className="games">
          
          {data && data.map((game,key)=>{
            return (
              <div className="game" id="deals" key={key}>
                <h2>{game.title.substr(0,10)}</h2>
                <p>Normal Price:{game.normalPrice}</p>
                <p>Sales Price:{game.salePrice}</p>
                <h3>You save {game.savings.substr(0,2)}%</h3>
              </div>
            )
        
            })}
      </div>
    </div>

    </div>
  );
}

export default App;
