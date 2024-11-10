import React, { useEffect, useState } from 'react';
import { Advocate } from '../FindAdvocate/Advocate';
import FeedbackCard from './FeedbackCard'; // Updated to FeedbackCard
import FeedbackModal from './FeedbackModal';
import axiosInstance from '../../utils/axiosInstance';

const AdvocateFeedbackPage: React.FC =() => {
  const [Advocates, setAdvocates] = useState<Advocate[]>([]);
  const [displayedAdvocates, setDisplayedAdvocates] = useState<Advocate[]>([]);
  const [selectedAdvocate, setSelectedAdvocate] = useState<Advocate | null>(
    null,
  );
  const [searchInput, setSearchInput] = useState('');
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [filterCriteria, setFilterCriteria] = useState({
    location: '',
    specialization: '',
    rating: '',
    nearMe: false,
  });
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadedAdvocatesCount, setLoadedAdvocatesCount] = useState(0); // Updated to track loaded advocates

  const token = localStorage.getItem('token');

  const fetchAdvocates = async (reset = false) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/litigants/getAdvocates', {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          page: currentPage,
          limit: 3,
          name: searchInput,
          rating: filterCriteria.rating,
          specialization: filterCriteria.specialization,
          location: filterCriteria.location,
          nearMe: filterCriteria.nearMe,
        },
      });

      const newAdvocates = response.data.advocates;

      setAdvocates((prevAdvocates) =>
        reset ? newAdvocates : [...prevAdvocates, ...newAdvocates],
      );

      setDisplayedAdvocates((prevDisplayedAdvocates) =>
        reset ? newAdvocates : [...prevDisplayedAdvocates, ...newAdvocates],
      );

      setTotalPages(response.data.pagination.totalPages);

      // Update loaded advocates count
      setLoadedAdvocatesCount((prevCount) => prevCount + newAdvocates.length);
    } catch (error) {
      console.error('Error fetching advocates:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvocates(true); // Fetch advocates on initial load or when filters change
  }, [currentPage, searchInput, filterCriteria]);

  const handleSearchChange = (e: any) => {
    setSearchInput(e.target.value);
    setCurrentPage(1); // Reset to first page when search term changes
    setLoadedAdvocatesCount(0); // Reset loaded advocates count
  };

  const handleFilterChange = (key: any, value: any) => {
    setFilterCriteria({ ...filterCriteria, [key]: value });
    setCurrentPage(1); // Reset to first page when filter changes
    setLoadedAdvocatesCount(0); // Reset loaded advocates count
  };

  // const handleViewMore = (advocate: any) => {
  //   setSelectedAdvocate(advocate);
  // };

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1); // Increment the current page
    }
  };

  const handleGiveFeedback = (advocate: any) => {
    setSelectedAdvocate(advocate);
  };

  const handleCloseModal = () => {
    setSelectedAdvocate(null);
  };

  return (

    <div className="p-6">
      {/* Search Bar */}
      <div className="mb-6 flex items-center space-x-2 border-2 border-white rounded-lg p-2 shadow-lg bg-white relative">
        <input
          type="text"
          placeholder="Search by name"
          className="border-0 pl-12 pr-4 py-2 w-full focus:ring-0 transition duration-200 ease-in-out"
          value={searchInput}
          onChange={handleSearchChange}
        />
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full px-6 py-2 shadow-lg transition duration-200 ease-in-out">
          Search
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full px-6 py-2 shadow-lg transition duration-200 ease-in-out"
          onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
        >
          Filters
        </button>
        {loading && (
          <div className="absolute right-10 top-2">
            <div className="loader"></div>
          </div>
        )}
        {filterDropdownOpen && (
          <div className="absolute right-0 mt-64 w-64 bg-white shadow-lg rounded-lg z-10 border border-gray-200 p-4 transform translate-y-12">
            <label>
              Location:
              <input
                type="text"
                className="w-full mt-1 p-2 border border-gray-300 rounded"
                onChange={(e) => handleFilterChange('location', e.target.value)}
              />
            </label>
            <label className="mt-4">
              Specialization:
              <input
                type="text"
                className="w-full mt-1 p-2 border border-gray-300 rounded"
                onChange={(e) =>
                  handleFilterChange('specialization', e.target.value)
                }
              />
            </label>
            <label className="mt-4">
              Rating:
              <input
                type="number"
                className="w-full mt-1 p-2 border border-gray-300 rounded"
                onChange={(e) => handleFilterChange('rating', e.target.value)}
              />
            </label>
            <label className="mt-4 flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={filterCriteria.nearMe}
                onChange={() =>
                  handleFilterChange('nearMe', !filterCriteria.nearMe)
                }
              />
              Near Me
            </label>
          </div>
        )}
      </div>

<div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {Advocates.map((advocate) => (
        <FeedbackCard
          key={advocate.id}
          advocate={advocate}
          onGiveFeedback={() => handleGiveFeedback(advocate)}
        />
      ))}
      {selectedAdvocate && (
        <FeedbackModal advocate={selectedAdvocate} onClose={handleCloseModal} />
      )}
    </div>
    {/* Load More Button */}
      {/* Pagination Info */}
      <div className="text-center my-4">
        <p>{currentPage} of {totalPages}</p>
      </div>

      {/* Load More Button */}
      {loadedAdvocatesCount < Advocates.length || currentPage < totalPages ? (
        <div className="text-center my-6">
          <button
            onClick={handleLoadMore}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full px-6 py-2 shadow-lg transition duration-200 ease-in-out"
          >
            Load More
          </button>
        </div>
      ) : (
        <div className="text-center text-gray-500 my-6">
          {Advocates.length === 0 ? "Advocates not available" : "You reached the end"}
        </div>
      )}

  </div>
  );
};

export default AdvocateFeedbackPage;
