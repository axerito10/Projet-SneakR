import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { logout, getToken, getUserId } from '../helpers';
import defaultImage from '../assets/no-image-found-2.jpg';

const Profil = () => {
  const [isLoggedIn, setLoggedIn] = useState(true);
  const [userData, setUserData] = useState(null);
  const [dataWishlistMail, setDataWishlistMail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [emailRecipient, setEmailRecipient] = useState('');
  const [emailValid, setEmailValid] = useState(true); // Ajout de l'état pour la validité de l'adresse e-mail
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

  useEffect(() => {
    const fetchdataWishlistMail = async () => {
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
          setDataWishlistMail(data.data.attributes.wishlist.data);
        } else {
          throw new Error('Erreur lors de la récupération des données de la wishlist');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données de la wishlist', error);
        setError('Erreur lors de la récupération des données de la wishlist');
      }
    };

    fetchdataWishlistMail();
  }, []);

  const fetchImageAsBase64 = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.onloadend = () => resolve(reader.result.split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Erreur lors du chargement de l\'image :', error);
      throw error;
    }
  };

  const getThumbnailUrl = (item) => {
    const imageObj = JSON.parse(item.attributes.image);
    const isThumbnailValidUrl = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(imageObj.thumbnail);
    return isThumbnailValidUrl ? imageObj.thumbnail : defaultImage;
  };

  const handleShareCollection = async () => {
    try {
      // Vérification du format de l'adresse e-mail
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailRecipient)) {
        setEmailValid(false);
        return; // Sortir de la fonction si l'adresse e-mail n'est pas valide
      }
  
      // Réinitialiser l'état de validité de l'adresse e-mail
      setEmailValid(true);
  
      const emailTo = emailRecipient || 'sneaker.addict.epitech@gmail.com';
  
      const wishlistItems = dataWishlistMail.map(item => (
        `${item.attributes.name} - ${item.attributes.brand} - ${item.attributes.colorway}`
      ));
  
      const formattedWishlist = `Voici ma wishlist de sneakers :\n\nContenu de la wishlist :\n\n${wishlistItems.join('\n')}`;
  
      const thumbnailAttachments = await Promise.all(dataWishlistMail.map(async item => {
        const thumbnailUrl = getThumbnailUrl(item);
        const thumbnailData = await fetchImageAsBase64(thumbnailUrl);
        return { name: `${item.attributes.name}.jpg`, data: thumbnailData };
      }));
  
      Email.send({
        SecureToken: "1df44291-2521-4127-87ca-a00d7572f25a",
        To: emailTo,
        From: "sneaker.addict.epitech@gmail.com",
        Subject: "Ma Wishlist de Sneakers",
        Body: formattedWishlist,
        Attachments: [
          ...thumbnailAttachments,
        ],
      }).then(
        message => alert(`Votre wishlist a bien été partagée à l'adresse mail : ${emailTo}`)
      );
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
    }
  };
  
  
  

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
              className="mt-6 bg-red-700 hover:bg-red-500 disabled:opacity-50 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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

        {/* Ajout du champ d'input pour l'adresse e-mail */}
        <div>
          <input
            type="email"
            placeholder="Entrez une adresse e-mail"
            value={emailRecipient}
            onChange={(e) => setEmailRecipient(e.target.value)}
            className={`mt-4 p-2 border rounded ${!emailValid ? 'border-red-500' : 'border-gray-300'}`} // Ajout des classes de style en fonction de la validité de l'adresse e-mail
          />
          {!emailValid && (
            <p className="text-red-500">Veuillez entrer une adresse e-mail valide.</p>
          )}
        </div>

        <button onClick={handleShareCollection} className="mt-4 bg-custom-blue hover:bg-custom-hover-blue disabled:opacity-50 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">PARTAGER MA WISHLIST</button>
      </div>
    </>
  );
};

export default Profil;
