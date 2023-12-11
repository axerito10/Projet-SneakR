import React, { useState } from 'react';
import ArticleCard from './ArticleCard.jsx';
import Modal from './Modal.jsx';
import './style/ArticlesPage.css'

const blurContainerStyle = {
    filter: 'blur(2px)',
    transition: 'filter 0.1s ease-in-out',
};

const ArticlesPage = ({ articles, onDelete, fetchData }) => {
    const [selectedArticle, setSelectedArticle] = useState(null);

    const openModal = (article) => {
        setSelectedArticle(article);
    };
    
    const closeModal = () => {
        setSelectedArticle(null);
    };

    const handleArticleDelete = async (articleId) => {
        await onDelete(articleId);
        fetchData();
    };

    return (
        <div>
            <div style={selectedArticle ? blurContainerStyle : null}>
                <div className="container mx-auto grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.isArray(articles) && articles.map((article) => (
                        <ArticleCard key={article.id} article={article} onClick={() => openModal(article) } onDelete={handleArticleDelete}/>
                    ))}
                </div>
            </div>
            {selectedArticle && (
                <div>
                    <Modal article={selectedArticle} onClose={closeModal} />
                </div>
            )}
        </div>
    );
};

export default ArticlesPage;
