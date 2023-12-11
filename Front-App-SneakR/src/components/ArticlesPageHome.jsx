import React, { useState } from 'react';
import ArticleCard from './ArticleCardHome.jsx';
import Modal from './ModalHome.jsx';
import './style/ArticlesPage.css'
import { getToken, getUserId } from '../helpers.js';


const blurContainerStyle = {
    filter: 'blur(2px)',
    transition: 'filter 0.1s ease-in-out',
};

const ArticlesPage = ({ articles }) => {
    const [selectedArticle, setSelectedArticle] = useState(null);

    const openModal = (article) => {
        setSelectedArticle(article);
    };
    
    const closeModal = () => {
        setSelectedArticle(null);
    };
    // console.log("ArticlesPage articles:", articles)

    //Fonction ajout sneaker dans collection
    const addToCollection = async (article) => {
        try {
            const raw = {
                "data": {
                    "collection": {
                        "connect": [article.id]
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
                console.log(`Successfully added article with ID ${article.id}.`);
            } else {
                console.error(`Failed to add article with ID ${article.id}. API response:`, response);
            }
            } catch (error) {
            console.error(`Error adding article with ID ${article.id}.`, error);
        }
    };
    
    //Fonction ajout sneaker dans wishlist
    const addToWishlist = async (article) => {
        try {
            const raw = {
                "data": {
                    "wishlist": {
                        "connect": [article.id]
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
                console.log(`Successfully added article with ID ${article.id}.`);
            } else {
                console.error(`Failed to add article with ID ${article.id}. API response:`, response);
            }
            } catch (error) {
            console.error(`Error adding article with ID ${article.id}.`, error);
        }
    };

    return (
        <div>
            <div style={selectedArticle ? blurContainerStyle : null}>
                <div className="container mx-auto grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.isArray(articles.data) && articles.data.map((article) => (
                        <ArticleCard key={article.id} article={article} onClick={() => openModal(article)}/>
                    ))}
                </div>
            </div>
            {selectedArticle && (
                <div>
                    <Modal article={selectedArticle} onClose={closeModal} onAddToCollection={() => addToCollection(selectedArticle)} onAddToWishlist={() => addToWishlist(selectedArticle)} />
                </div>
            )}
        </div>
    );
};

export default ArticlesPage;
