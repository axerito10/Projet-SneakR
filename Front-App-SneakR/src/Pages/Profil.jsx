import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { logout, getToken, getUserId } from '../helpers';


const Profil = () => {
  const [isLoggedIn, setLoggedIn] = useState(true);
  const [userData, setUserData] = useState(null);
  const [emailData, setEmailData] = useState(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setLoggedIn(false);
    navigate('/');
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:1337/api/users/me`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          throw new Error('Erreur lors de la récupération des données de l\'utilisateur');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données de l\'utilisateur', error);
        setError('Erreur lors de la récupération des données de l\'utilisateur');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Fonction d'envoi de mail

  useEffect(() => {
    const fetchMailData = async () => {
      try {
        const response = await fetch(`http://localhost:1337/api/privates/${getUserId()}?populate=*`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          throw new Error('Erreur lors de la récupération des données de l\'utilisateur');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données de l\'utilisateur', error);
        setError('Erreur lors de la récupération des données de l\'utilisateur');
      } finally {
        setLoading(false);
      }
    };

    fetchMailData();
  }, []);

  const handleShareCollection = async() => {console.log("Collection partagée")}
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="bg-custom-blue p-4 md:p-8 lg:p-12 xl:p-16 rounded-md shadow-md text-center">
          <div>
            <h2 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold">
              Bonjour et bienvenue sur votre profil "{userData ? userData.username : 'Nom Utilisateur'}"
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold">
              Adresse email : {userData ? userData.email : 'Adresse email'}
            </p>
          </div>

          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Se déconnecter
            </button>
          )}

          <button
            className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => navigate('/modifier-mot-de-passe')}
          >
            Modifier le mot de passe
          </button>
        </div>
      </div>
      <button onClick={handleShareCollection} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">PARTAGER MA COLLECTION</button>
    </>
  );
};

export default Profil