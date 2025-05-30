
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const gamesList = [
  {
    title: 'Dota 2',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/570/header.jpg',
  },
  {
    title: 'Forza Horizon 5',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1551360/header.jpg',
  },
  {
    title: 'PUBG: BATTLEGROUNDS',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/578080/header.jpg',
  },
  {
    title: 'STAR WARS Jedi: Fallen Order™',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1172380/header.jpg',
  },
  {
    title: 'Resident Evil Village',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1196590/header.jpg',
  },
  {
    title: 'Red Dead Redemption 2',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1174180/header.jpg',
  },
  {
    title: 'FIFA 22',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1506830/header.jpg',
  },
  {
    title: 'Stumble Guys',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1677740/header.jpg',
  },
  {
    title: 'TEKKEN 7',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/389730/header.jpg',
  },
  {
    title: 'ELDEN RING',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg',
  },
  {
    title: 'Farming Simulator 22',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1248130/header.jpg',
  },
  {
    title: 'Cyberpunk 2077',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg',
  },
];

const RateAndFav = () => {
  const [ratings, setRatings] = useState({});
  const [favorite, setFavorite] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRatingChange = (gameTitle, value) => {
    setRatings(prev => ({ ...prev, [gameTitle]: parseInt(value) }));
  };

  const handleFavoriteSelect = (gameTitle) => {
    setFavorite(gameTitle);
  };

  const handleSubmit = async () => {
    if (!favorite) {
      setError('Please select your favorite game.');
      return;
    }

    try {
      const token = localStorage.getItem('token');

      for (const [game, rating] of Object.entries(ratings)) {
        console.log('Submitting rating:', { game, rating });
        await fetch('http://127.0.0.1:5001/rate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': token,
          },
          body: JSON.stringify({ game, rating }),
        });
      }

      const res = await fetch('http://127.0.0.1:5001/choose_game', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
        body: JSON.stringify({ game: favorite }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.message || 'Failed to generate the recommendations.');
        return;
      }

      navigate('/home');
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-10 text-center tracking-wide">Rate Games & Choose Your Favorite</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {gamesList.map((game) => (
            <div
              key={game.title}
              className="bg-gray-800 hover:shadow-2xl hover:scale-105 transition-transform duration-300 rounded-xl overflow-hidden flex flex-col items-center p-4"
            >
              <img
                src={game.image}
                alt={game.title}
                className="w-full h-40 object-cover rounded-lg shadow-sm mb-4"
              />
              <h2 className="text-lg font-semibold mb-3 text-center">{game.title}</h2>

              <label className="text-sm text-gray-300 mb-1 self-start">Rate this game:</label>
              <input
                type="range"
                min="1"
                max="5"
                value={ratings[game.title] || 3}
                onChange={(e) => handleRatingChange(game.title, e.target.value)}
                className="w-full accent-purple-500"
              />
              <p className="text-xs mt-1 text-gray-400">Rating: {ratings[game.title] || 3}</p>

              <button
                onClick={() => handleFavoriteSelect(game.title)}
                onMouseLeave={(e) => {
                  if (favorite !== game.title) {
                    e.target.style.backgroundColor = '#C989E9';
                    e.target.style.color = 'black';
                    e.target.style.borderColor = 'black';
                  }
                }}
                onMouseEnter={(e) => {
                  if (favorite !== game.title) {
                    e.target.style.backgroundColor = '#b173d0'; // subtle hover effect for violet
                  }
                }}
                style={{
                  backgroundColor: favorite === game.title ? '#4ade80' : '#C989E9',
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
                {favorite === game.title ? 'Favorite Selected' : 'Mark as Favorite'}
              </button>


            </div>
          ))}
        </div>

        {error && <p className="text-red-500 text-center mt-6 font-semibold">{error}</p>}

        <div className="text-center mt-10">
          <button
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
            onClick={handleSubmit}
          >
            Submit & Get Recommendations
          </button>
        </div>
      </div>
    </div>
  );
};

export default RateAndFav;
