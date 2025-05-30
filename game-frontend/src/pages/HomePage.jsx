
import React, { useState, useEffect} from 'react';
import axios from 'axios';


import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';


const HomePage = () => {


  const [recommendations, setRecommendations] = useState([]);
  const [gameList, setGameList] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState('');
  const [query, setQuery] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  const fetchInitialRecommendations = async () => {

    try {
      const response = await axios.get('http://127.0.0.1:5001/user/recommendations', {
        headers: {
          'x-access-token': token,
        },
      });

      const recs = Array.isArray(response.data.recommendations)
        ? response.data.recommendations
        : response.data.recommendations.recommended;

      setRecommendations(recs);
    } catch (err) {
      setMessage('No previous recommendations is found in the Database. Try selecting a new game.');
    } finally {
      setLoading(false);
    }
  };

  const fetchGameList = async () => {

    try {
      const response = await axios.get('http://127.0.0.1:5001/games', {
        headers: {
          'x-access-token': token,
        },
      });
      setGameList(response.data.games);
    } catch (error) {
      console.error('Unable to fetch the games list:', error);
    }
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    setQuery(input);

    const filtered = gameList.filter((game) =>
      game.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredGames(filtered);
  };

  const handleSuggestionClick = (game) => {
    setSelectedGame(game);
    setQuery(game);
    setFilteredGames([]);
  };

  const getNewRecommendations = async () => {
    if (!selectedGame) {
      setMessage('Please select a valid game from the list');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:5001/choose_game',
        { game: selectedGame },
        {
          headers: {
            'x-access-token': token,
          },
        }
      );
      setRecommendations(response.data.recommended);
      setMessage('');
    } catch (err) {
      console.error(err);
      setMessage('Failed to get recommendations. Try a different game from the list.');
    }
  };
  useEffect(() => {
    
    fetchInitialRecommendations();
    fetchGameList();
  }, []);

  return (
    <div className="min-h-screen w-screen bg-gradient-to-r from-gray-900 to-black text-white px-6 py-8">
      <Navbar />
      <h2 className="text-5xl py-4 font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-200 drop-shadow-lg">
        Get New Recommendations
      </h2>

      {message && <p className="text-red-400 mb-4 text-center">{message}</p>}

      {/* Search Box */}
      <div className="relative mb-10 w-full max-w-2xl mx-auto">
        <input
          type="text"
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type a game name..."
          value={query}
          onChange={handleInputChange}
        />
        {filteredGames.length > 0 && (
          <ul className="absolute bg-gray-800 border border-gray-700 rounded mt-1 w-full max-h-48 overflow-y-auto z-10">
            {filteredGames.map((game, index) => (
              <li
                key={index}
                className="p-2 hover:bg-gray-700 cursor-pointer"
                onClick={() => handleSuggestionClick(game)}
              >
                {game}
              </li>
            ))}
          </ul>
        )}
        
        <button
          onClick={getNewRecommendations}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'black';
            e.target.style.color = '#C989E9';
            e.target.style.borderColor = '#C989E9';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#C989E9';
            e.target.style.color = 'black';
            e.target.style.borderColor = 'black';
          }}
          style={{
            backgroundColor: '#C989E9',
            color: 'black',
            border: '1.5px solid black',
            padding: '10px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontWeight: 'bold',
            boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
            width: '100%',
            marginTop: '0.75rem'
          }}
        >
          Get Recommendations
        </button>

      </div>

      {/* Recommendations */}
      {loading ? (
        <p className="text-center text-gray-400">Loading recommendations...</p>
      ) : recommendations.length === 0 ? (
        <p className="text-center text-gray-400">No recommendations to display.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4">
          {recommendations.map((game, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl"
            >
              <img
                src={game.poster}
                alt={game.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="text-lg font-semibold text-center">{game.title}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
