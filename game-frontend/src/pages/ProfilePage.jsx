
import Navbar from '../components/Navbar';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [username, setUsername] = useState('');
  const [ratings, setRatings] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://127.0.0.1:5001/profile', {
          headers: { 'x-access-token': token }
        });

        if (!res.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await res.json();
        setUsername(data.username);
        setRatings(data.ratings || []);
        setRecommendations(data.past_recommendations || []);
      } catch (err) {
        console.error(err);
        alert('Session expired or unauthorized. Please try to login again.');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-tr from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] text-white font-sans">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-5xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-200 drop-shadow-lg">
          👤 Welcome, {username}
        </h1>

        {loading ? (
          <p className="text-center text-gray-400 animate-pulse">Loading profile...</p>
        ) : (
          <>
            <section className="mb-16">
              <h2 className="text-3xl font-semibold mb-6 text-cyan-400 border-b border-cyan-600 pb-2">
                ⭐ Your Game Ratings
              </h2>
              {ratings.length === 0 ? (
                <p className="text-gray-500 italic">No games rated yet.</p>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                  {ratings.map((entry, index) => (
                    <div
                      key={index}
                      className="bg-[#1f1f1f] border border-gray-700 rounded-xl p-5 shadow-md hover:shadow-cyan-500/40 backdrop-blur-md transition-transform transform hover:scale-105"
                    >
                      <h3 className="text-lg font-bold text-white mb-2">{entry.game}</h3>
                      <p className="text-yellow-300 font-semibold text-md">
                        {entry.rating} / 5
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section className="mb-16">
              <h2 className="text-3xl font-semibold mb-6 text-emerald-400 border-b border-emerald-600 pb-2">
                📦 Your Past Recommendations
              </h2>
              {recommendations.length === 0 ? (
                <p className="text-gray-500 italic">No past recommendations yet.</p>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                  {recommendations.map((game, index) => (
                    <div
                      key={index}
                      className="bg-[#121212] rounded-xl overflow-hidden border border-gray-800 shadow-lg hover:shadow-emerald-500/40 transition-transform transform hover:scale-105"
                    >
                      <img
                        src={game.poster}
                        alt={game.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="text-white text-center font-semibold text-lg">
                          {game.title}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <div className="flex justify-center mt-12">
              <button
                onClick={handleLogout}
                className="px-8 py-3 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-500 text-black font-bold rounded-full shadow-lg hover:from-pink-400 hover:to-indigo-400 hover:text-white transition-all duration-300 border border-transparent hover:border-white"
              >
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;

