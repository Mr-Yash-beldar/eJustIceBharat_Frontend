import React, { useState, useEffect } from 'react';
import Advocates from './Advocate'; // Advocate data
import AdvocateGrid from './AdvocateGrid'; // Grid layout
import AdvocateDetailsModal from './AdvocateDetailsModal'; // Modal for advocate details

const AdvocateList: React.FC = () => {
  const [selectedAdvocate, setSelectedAdvocate] = useState(null); // State for selected advocate
  const [searchInput, setSearchInput] = useState(''); // State for search input
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false); // Toggle for dropdown visibility
  const [filterCriteria, setFilterCriteria] = useState({
    location: '',
    specialization: '',
    rating: '',
    nearMe: false,
  });

  const [filteredAdvocates, setFilteredAdvocates] = useState(Advocates); // Filtered advocate list

  // Function to handle "View More" click
  const handleViewMore = (advocate: any) => {
    setSelectedAdvocate(advocate); // Set the selected advocate
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setSelectedAdvocate(null); // Clear selected advocate
  };

  // Function to handle search input and filtering
  useEffect(() => {
    let filtered = Advocates;

    if (searchInput) {
      filtered = filtered.filter((advocate) =>
        advocate.name.toLowerCase().includes(searchInput.toLowerCase()),
      );
    }

    if (filterCriteria.location) {
      filtered = filtered.filter((advocate) =>
        advocate.location
          .toLowerCase()
          .includes(filterCriteria.location.toLowerCase()),
      );
    }

    if (filterCriteria.specialization) {
      filtered = filtered.filter((advocate) =>
        advocate.specialization
          .toLowerCase()
          .includes(filterCriteria.specialization.toLowerCase()),
      );
    }

    if (filterCriteria.rating) {
      filtered = filtered.filter(
        (advocate) => advocate.ratings >= parseFloat(filterCriteria.rating),
      );
    }

    if (filterCriteria.nearMe) {
      // Simulate a "near me" filter by proximity logic (to be implemented with real geolocation API)
      filtered = filtered.filter((advocate) => advocate.distance); // Assuming isNearMe is a boolean flag in data
    }

    setFilteredAdvocates(filtered);
  }, [searchInput, filterCriteria]);

  return (
    <div className="p-6">
      {/* Search Bar */}
      <div className="mb-6 flex items-center space-x-2 border-2 border-white rounded-lg p-2 shadow-lg bg-white">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search by name"
            className="border-0 pl-12 pr-4 py-2 w-full focus:ring-0 transition duration-200 ease-in-out"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 11a4 4 0 100-8 4 4 0 000 8zm0 2a7 7 0 014.9 11.9m4.1-3.9a7 7 0 11-9.8-9.8m5 5H21"
              />
            </svg>
          </span>
        </div>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full px-6 py-2 shadow-lg transition duration-200 ease-in-out">
          Search
        </button>

        {/* Dropdown Button for Filters */}
        <div className="relative">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full px-6 py-2 shadow-lg transition duration-200 ease-in-out"
            onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
          >
            Filters
          </button>

          {/* Dropdown Content */}
          {filterDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg z-10 border border-gray-200">
              <div className="px-4 py-2">
                <label className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="Enter location"
                  className="border border-blue-400 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-200 ease-in-out bg-blue-50"
                  value={filterCriteria.location}
                  onChange={(e) =>
                    setFilterCriteria({
                      ...filterCriteria,
                      location: e.target.value,
                    })
                  }
                />
              </div>

              <div className="px-4 py-2">
                <label className="block text-sm font-medium text-gray-700">
                  Specialization
                </label>
                <input
                  type="text"
                  placeholder="Enter specialization"
                  className="border border-blue-400 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-200 ease-in-out bg-blue-50"
                  value={filterCriteria.specialization}
                  onChange={(e) =>
                    setFilterCriteria({
                      ...filterCriteria,
                      specialization: e.target.value,
                    })
                  }
                />
              </div>

              <div className="px-4 py-2">
                <label className="block text-sm font-medium text-gray-700">
                  Rating
                </label>
                <select
                  className="border border-blue-400 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-200 ease-in-out bg-blue-50"
                  value={filterCriteria.rating}
                  onChange={(e) =>
                    setFilterCriteria({
                      ...filterCriteria,
                      rating: e.target.value,
                    })
                  }
                >
                  <option value="">Filter by rating</option>
                  <option value="4">4 & above</option>
                  <option value="3">3 & above</option>
                  <option value="2">2 & above</option>
                </select>
              </div>

              <div className="px-4 py-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-500 rounded transition duration-200 ease-in-out"
                    checked={filterCriteria.nearMe}
                    onChange={(e) =>
                      setFilterCriteria({
                        ...filterCriteria,
                        nearMe: e.target.checked,
                      })
                    }
                  />
                  <span className="ml-2 text-sm text-gray-700">Near Me</span>
                </label>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Advocate Grid */}
      <AdvocateGrid advocates={filteredAdvocates} onViewMore={handleViewMore} />

      {/* Modal for detailed advocate information */}
      {selectedAdvocate && (
        <AdvocateDetailsModal
          advocate={selectedAdvocate}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default AdvocateList;
