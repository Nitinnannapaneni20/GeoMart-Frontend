"use client";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { fetchProductsDataByLocation } from "@/services/Apis";

export default function HomePage() {
  const [data, setData] = useState({ categories: [], productTypes: [], products: [] });
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [filteredTypes, setFilteredTypes] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const locationId = 1;
      const result = await fetchProductsDataByLocation(locationId);
      if (result) {
        setData(result);
      }
    };

    fetchData();
  }, []);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = parseInt(e.target.value);
    setSelectedCategory(categoryId.toString());
    setFilteredTypes(data.productTypes.filter((type) => type.CategoryID === categoryId));
    setFilteredProducts([]);
    setSelectedType("");
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const typeId = parseInt(e.target.value);
    setSelectedType(typeId.toString());
    setFilteredProducts(data.products.filter((product) => product.TypeID === typeId));
  };

  const handleSearch = () => {
    setSearchResults(filteredProducts);
  };

  return (
    <>
      <Header />
      <main className="bg-gray-100 dark:bg-gray-900 min-h-screen pt-20">
        {/* Banner Section */}
        <div className="relative w-full h-80 bg-cover bg-center bg-[url('/your-banner-image.jpg')] flex items-center justify-center text-white text-2xl font-bold">
          <div className="bg-black/50 w-full h-full flex items-center justify-center">
            <p>🚀 Special Offers & Discounts Available!</p>
          </div>
        </div>

        {/* Search Section */}
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">Find Your Product</h2>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <select
              className="p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
              onChange={handleCategoryChange}
            >
              <option value="">Select Category</option>
              {data.categories.map((cat) => (
                <option key={cat.ID} value={cat.ID}>
                  {cat.Name}
                </option>
              ))}
            </select>

            <select
              className="p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
              onChange={handleTypeChange}
              disabled={!selectedCategory}
            >
              <option value="">Select Product Type</option>
              {filteredTypes.map((type) => (
                <option key={type.ID} value={type.ID}>
                  {type.Name}
                </option>
              ))}
            </select>

            <select
              className="p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
              disabled={!selectedType}
            >
              <option value="">Select Product</option>
              {filteredProducts.map((prod) => (
                <option key={prod.ID} value={prod.ID}>
                  {prod.Name}
                </option>
              ))}
            </select>

            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-md"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="max-w-6xl mx-auto mt-10">
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {searchResults.map((prod) => (
                <div key={prod.ID} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
                  <img
                    src={prod.ImageURL}
                    alt={prod.Name}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <h4 className="mt-2 font-semibold text-gray-900 dark:text-white">{prod.Name}</h4>
                  <p className="text-gray-600 dark:text-gray-400">{prod.Brand}</p>
                  <p className="text-indigo-600 font-bold">₹{prod.Cost}</p>
                  <button className="mt-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md">
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-700 dark:text-white mt-6">
              Select filters and click search to see results.
            </p>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-10 bg-gray-800 text-white text-center py-4">
        &copy; 2025 GeoMart - Your trusted grocery partner.
      </footer>
    </>
  );
}
