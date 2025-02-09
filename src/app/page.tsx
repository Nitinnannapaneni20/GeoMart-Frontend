"use client";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { fetchProductsDataByLocation, fetchPromotionProductsByLocation } from "@/services/Apis";

export default function HomePage() {
  const [data, setData] = useState({ categories: [], productTypes: [], products: [] });
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [filteredTypes, setFilteredTypes] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [promotionProducts, setPromotionProducts] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const locationId = 1;
      const result = await fetchProductsDataByLocation(locationId);
      const promotedProducts = await fetchPromotionProductsByLocation(locationId);
      if (promotedProducts) {
        setPromotionProducts(promotedProducts.specials.map(special => special.Product));
      }
      if (result) {
        setData(result);
      }
    };
    fetchData();
  }, []);

  const handleCategoryChange = (e) => {
    const categoryId = parseInt(e.target.value);
    setSelectedCategory(categoryId.toString());
    setFilteredTypes(data.productTypes.filter((type) => type.CategoryID === categoryId));
    setFilteredProducts([]);
    setSelectedType("");
  };

  const handleTypeChange = (e) => {
    const typeId = parseInt(e.target.value);
    setSelectedType(typeId.toString());
    setFilteredProducts(data.products.filter((product) => product.TypeID === typeId));
  };

  const handleSearch = () => {
    setSearchResults(filteredProducts);
    setIsFiltering(true);
  };

  const handleClearFilters = async () => {
    setSelectedCategory("");
    setSelectedType("");
    setFilteredTypes([]);
    setFilteredProducts([]);
    setSearchResults([]);
    setIsFiltering(false);
    const promotedProducts = await fetchPromotionProductsByLocation(1);
    if (promotedProducts) {
      setPromotionProducts(promotedProducts.specials.map(special => special.Product));
    }
  };

  return (
    <>
      <Header />
      <main className="bg-gray-50 dark:bg-gray-900 min-h-screen pt-20">
        {/* Banner Section */}
        <div className="relative w-full h-80 bg-gradient-to-r from-blue-100 to-indigo-200 dark:bg-gray-800 flex items-center justify-center text-gray-900 dark:text-white text-2xl font-bold shadow-md">
          <p>🚀 Special Offers & Discounts Available!</p>
        </div>

        {/* Search Section */}
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-100 dark:bg-gray-800 shadow-lg rounded-xl border border-gray-200 dark:border-none">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 text-center">Find Your Product</h2>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <select className="p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500" value={selectedCategory} onChange={handleCategoryChange}>
              <option value="">Select Category</option>
              {data.categories.map((cat) => (
                <option key={cat.ID} value={cat.ID}>{cat.Name}</option>
              ))}
            </select>

            <select className="p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500" value={selectedType} onChange={handleTypeChange} disabled={!selectedCategory}>
              <option value="">Select Product Type</option>
              {filteredTypes.map((type) => (
                <option key={type.ID} value={type.ID}>{type.Name}</option>
              ))}
            </select>

            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg shadow-md" onClick={handleSearch}>Search</button>
            <button className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg shadow-md" onClick={handleClearFilters}>Clear Filters</button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="max-w-6xl mx-auto mt-10">
          {isFiltering ? (
            searchResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {searchResults.map((prod) => (
                  <div key={prod.ID} className="bg-gray-100 dark:bg-gray-800 shadow-md rounded-lg p-4 border border-gray-200 dark:border-none">
                    <img src={prod.ImageURL} alt={prod.Name} className="w-full h-40 object-cover rounded-lg" />
                    <h4 className="mt-2 font-semibold text-gray-900 dark:text-white">{prod.Name}</h4>
                    <p className="text-gray-600 dark:text-gray-400">{prod.Brand}</p>
                    <p className="text-indigo-600 font-bold">₹{prod.Cost}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center mt-6 text-gray-700 dark:text-gray-400">No products found for the selected filters.</p>
            )
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {promotionProducts.map((prod) => (
                <div key={prod.ID} className="bg-gray-100 dark:bg-gray-800 shadow-md rounded-lg p-4 border border-gray-200 dark:border-none">
                  <img src={prod.ImageURL} alt={prod.Name} className="w-full h-40 object-cover rounded-lg" />
                  <h4 className="mt-2 font-semibold text-gray-900 dark:text-white">{prod.Name}</h4>
                  <p className="text-gray-600 dark:text-gray-400">{prod.Brand}</p>
                  <p className="text-indigo-600 font-bold">₹{prod.Cost}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <footer className="bg-gray-800 text-white text-center py-4">
        &copy; 2025 GeoMart - Your trusted grocery partner.
      </footer>
    </>
  );
}