import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ArticlesPage from '../components/ArticlesPage.jsx';
import { getToken, getUserId } from '../helpers.js';

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchURL, setSearchURL] = useState('');
    const [searchCOLOR, setSearchCOLOR] = useState('');
    const [page, setPage] = useState(1);
    const [deleteMessage, setDeleteMessage] = useState('');

    let apiUrl = `http://localhost:1337/api/privates/${getUserId()}?populate=*`;

    const fetchData = async () => {
        try {
            if (searchURL.trim() !== '') {
                apiUrl += `&filters[$or][0][name][$containsi]=${searchURL}&filters[$or][1][brand][$containsi]=${searchURL}`;
            }

            if (searchCOLOR.trim() !== '') {
                apiUrl += `&filters[colorway][$containsi]=${searchCOLOR}`;
            }

            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getToken()}`,
                },
            });
            
            const dataBrut = await response.json();
            //console.log(dataBrut)
            //console.log("data brut:", dataBrut.data.attributes.wishlist.data)
            const dataBrut2 = JSON.stringify(dataBrut.data.attributes.wishlist.data)
            const dataBrut3 = JSON.parse(dataBrut2)
            //console.log("data brut 2:", dataBrut2)
            if (dataBrut.data && dataBrut.data.attributes.wishlist.data.length > 0) {
                const modifiedData = {
                    data: dataBrut.data.attributes.wishlist.data.map(article => ({
                        id: article.id,
                        brand: article.attributes.brand,
                        colorway: article.attributes.colorway,
                        UID: article.attributes.UID,
                        createdAt: article.attributes.createdAt,
                        estimatedMarketValue: article.attributes.estimatedMarketValue,
                        gender: article.attributes.gender,
                        image: article.attributes.image,
                        links: article.attributes.links,
                        name: article.attributes.name,
                        releaseDate: article.attributes.releaseDate,
                    })),
                };
                //console.log("data modif :", modifiedData)
                setWishlist(modifiedData);

            } else {
                setError('Invalid response format from the API');
            }

            setLoading(false);
        } catch (error) {
            console.error('Error fetching data from API', error);
            setError('Error fetching data from API');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [page, searchURL, searchCOLOR]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleSearch = () => {
        fetchData();
    };

    // Fonction de suppression


    const handleDelete = async (articleId) => {
        try {
            const raw = {
                "data": {
                    "wishlist":{
                        "disconnect": articleId
                    }
                }              
            };
    
            const response = await fetch(`http://localhost:1337/api/privates/${getUserId()}?populate=*`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getToken()}`,
                },
                body: JSON.stringify(raw),
            });
    
            if (response.ok) {
                console.log(`Suppression de l'article avec l'ID ${articleId} réussie.`);
                fetchData();
            } else {
                console.error(`Échec de la suppression de l'article avec l'ID ${articleId}. Réponse de l'API :`, response);
            }
        } catch (error) {
            console.error(`Erreur lors de la suppression de l'article avec l'ID ${articleId}.`, error);
        }
    };
    
    
    //console.log("final wishlist.jsx :", wishlist.data)
    return (
        <>
            <Navbar />
            <div className="pb-3"></div>
            {loading && <p>Loading...</p>}

            {!loading && !error && wishlist.data && wishlist.data.length > 0 ? (
                <>
                    {deleteMessage && <p>{deleteMessage}</p>}
                    <ArticlesPage articles={wishlist.data} onDelete={handleDelete} fetchData={fetchData} />
                </>
            ) : (
                <p className="text-center text-2xl">Votre wishlist est actuellement vide. Parcourez notre site et ajoutez des éléments à votre wishlist dès maintenant afin de pouvoir la partager avec vos amis !</p>
            )}
            <div className="pb-6"></div>
        </>
    );
};

export default Wishlist;
