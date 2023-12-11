import React from 'react';
import defaultImage from '../assets/no-image-found-2.jpg';

const ArticleCard = ({ article, onClick, onDelete }) => {
    const imageObj = JSON.parse(article.image);

    const cardStyle = {
        backgroundColor: 'white',
        padding: '16px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(1, 2, 0, 1.5)',
        border: '2px solid rgb(160, 184, 186)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between', // Aligner les éléments de manière verticale
        height: '100%', // Utiliser la hauteur complète du conteneur parent
    };

    const isThumbnailValidUrl = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(imageObj.thumbnail);

    const thumbnailUrl = isThumbnailValidUrl ? imageObj.thumbnail : defaultImage;

    const handleDeleteClick = (event) => {
        event.stopPropagation();
        onDelete(article.id);
    };

    return (
        <div className="bg-white p-4 rounded-md shadow-md article-card" style={cardStyle} onClick={onClick}>
            <div>
                <h2 className="text-xl font-bold mb-2">{article.name}</h2>
                <p className="text-gray-600">{article.brand}</p>
                <p>{article.estimatedMarketValue}€</p>
                <img src={thumbnailUrl} alt={article.name} />
            </div>
            <button onClick={handleDeleteClick} className="px-1 py-2 mx-0.5 my-1 text-white bg-custom-blue rounded hover:bg-custom-hover-blue disabled:opacity-50">Supprimer</button>
        </div>
    );
};

export default ArticleCard;
