import React from 'react';
import defaultImage from '../assets/no-image-found-2.jpg';
import Slider from 'react-slick';

const Modal = ({ article, onClose }) => {
  const imageObj = JSON.parse(article.image);
  const linksObj = JSON.parse(article.links);

  const modalStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1000,
    width: '80%',
    height: '80%',
    backgroundColor: 'white',
    padding: '16px',
    borderRadius: '8px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    border: '4px solid rgb(160, 184, 186)',
    overflow: 'auto',
    textAlign: 'center',
  };

  // Style caroussel
  const sliderStyle = {
    width: '60%',
    margin: '0 auto',
    marginBottom: '25px',
    marginTop: '1px'
  };

  const imageStyle = {
    width: '100%',
    height: 'auto',
    margin: 'auto',
    maxWidth: '100%',
  };

  const CustomPrevArrow = (props) => (
    <div onClick={props.onClick} style={{ position: 'absolute', top: '50%', left: 0, cursor: 'pointer', zIndex: 1, color: 'rgb(160, 184, 186)' }}>
      &#9664;
    </div>
  );
    
  const CustomNextArrow = (props) => (
    <div onClick={props.onClick} style={{ position: 'absolute', top: '50%', right: 0, cursor: 'pointer', zIndex: 1, color: 'rgb(160, 184, 186)' }}>
      &#9654;
    </div>
  );

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ],
  };

  // Vérification des URL
  const isThumbnailValidUrl = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(imageObj.thumbnail);
  const isOriginalValidUrl = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(imageObj.original);
  const isSmallValidUrl = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(imageObj.small);
  const is360ValidUrl = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(imageObj['360']);

  const thumbnailUrl = isThumbnailValidUrl ? imageObj.thumbnail : defaultImage;
  const originalUrl = isOriginalValidUrl ? imageObj.original : defaultImage;
  const smallUrl = isSmallValidUrl ? imageObj.small : defaultImage;
  const a360Url = is360ValidUrl ? imageObj['360'] : defaultImage;

  return (
    <>
      <div style={modalStyle}>
        <div style={{ position: 'relative', top: '15%%' }}>
            <h1 className="text-4xl font-bold mb-2">{article.name}</h1>
            <p className="text-3xl font-semibold">{article.brand}</p>
            <p className='text-2xl text-black'>{article.colorway}</p>
            <p className='text-xl font-semibold'>{article.gender}</p>
            <p className='text-2xl italic'>Retail: {article.retailPrice}€ / Valeur actuelle: {article.estimatedMarketValue}€</p>
        </div>
            <Slider style={sliderStyle} {...sliderSettings}>
                {isThumbnailValidUrl && <img style={imageStyle} src={thumbnailUrl} alt="Thumbnail" />}
                {isOriginalValidUrl && <img style={imageStyle} src={originalUrl} alt="Original" />}
                {isSmallValidUrl && <img style={imageStyle} src={smallUrl} alt="Small" />}
                {is360ValidUrl && <img style={imageStyle} src={a360Url} alt="360" />}
            </Slider>

            {article.releaseDate && (
                <div>
                <h3 className='text-2xl text-black font-semibold'>Date de sortie</h3>
                <p className='text-2xl text-black italic'>{article.releaseDate}</p>
                </div>
            )}

            {article.silhouette && (
                <div>
                <h3 className='text-2xl text-black font-semibold'>Silhouette</h3>
                <p className='text-2xl text-black italic'>{article.silhouette}</p>
                </div>
            )}

            {article.story && (
                <div>
                <h3 className='text-2xl text-black font-semibold'>Histoire</h3>
                <p className='text-2xl text-black italic'>{article.story}</p>
                </div>
            )}
            
            <div>
                <h3 className='text-2xl text-black font-semibold'>Liens vers les sites partenaires :</h3>
                <p className='text-xl text-black italic'><a href={linksObj.goat} target="_blank" rel="noopener noreferrer">Voir sur Goat</a></p>
                <p className='text-xl text-black italic'><a href={linksObj.stockX} target="_blank" rel="noopener noreferrer">Voir sur StockX</a></p>
                <p className='text-xl text-black italic'><a href={linksObj.flightClub} target="_blank" rel="noopener noreferrer">Voir sur flightClub</a></p>
                <p className='text-xl text-black italic'><a href={linksObj.stadiumGoods} target="_blank" rel="noopener noreferrer">Voir sur Stadium Goods</a></p>
            </div>
        </div>
      <button onClick={onClose} style={{ position: 'fixed', top: '13%', right: '13%', backgroundColor: 'rgb(160, 184, 186)', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', zIndex: 1001, }} > x </button>
    </>
  );
};

export default Modal;
