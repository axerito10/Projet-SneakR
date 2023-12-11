import React from 'react';
import defaultImage from '../assets/no-image-found-2.jpg';

const ArticleCard = ({ article, onClick }) => {
    const imageObj = JSON.parse(article.attributes.image);

    const cardStyle = {
        backgroundColor: 'white',
        padding: '16px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(1, 2, 0, 1.5)',
        border: '2px solid rgb(160, 184, 186)',
    };

    const isThumbnailValidUrl = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(imageObj.thumbnail);

    const thumbnailUrl = isThumbnailValidUrl ? imageObj.thumbnail : defaultImage;

    return (
        <div className="bg-white p-4 rounded-md shadow-md article-card" style={cardStyle} onClick={onClick}>
            <h2 className="text-xl font-bold mb-2">{article.attributes.name}</h2>
            <p className="text-gray-600">{article.attributes.brand}</p>
            <p>{article.attributes.estimatedMarketValue}€</p>
            <img src={thumbnailUrl} alt={article.attributes.name} />
        </div>
    );
};

export default ArticleCard;

