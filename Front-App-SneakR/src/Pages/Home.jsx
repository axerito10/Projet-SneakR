import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import SearchBar from '../components/SearchBar.jsx';
import Pagination from '../components/Pagination.jsx';
import ArticlesPage from '../components/ArticlesPageHome.jsx';

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [searchURL, setSearchURL] = useState('');
  const [searchCOLOR, setSearchCOLOR] = useState('');

  const fetchData = async () => {
    try {
      let apiUrl = `http://localhost:1337/api/sneakers?pagination[pageSize]=30&pagination[page]=${page}`;

      if (searchURL.trim() !== '') {
        apiUrl += `&filters[$or][0][name][$containsi]=${searchURL}&filters[$or][1][brand][$containsi]=${searchURL}`;
      }

      if (searchCOLOR.trim() !== '') {
        apiUrl += `&filters[colorway][$containsi]=${searchCOLOR}`;
      }

      const response = await fetch(apiUrl);
      const data = await response.json();

      console.log('API Response:', data);

      if (data.meta && data.meta.pagination) {
        setArticles(data);
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

  return (
    <>
      <Navbar />
      <SearchBar setSearchURL={setSearchURL} setSearchCOLOR={setSearchCOLOR} onSearch={handleSearch} setPage={setPage} />
      <div className='pb-3'></div>
      {loading && <p>Loading...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && <ArticlesPage articles={articles} />}

      {!loading && !error && articles.meta && articles.meta.pagination && (
        <Pagination currentPage={page} totalPages={articles.meta.pagination.pageCount} onPageChange={handlePageChange} />
      )}
    </>
  );
};

export default Home;
