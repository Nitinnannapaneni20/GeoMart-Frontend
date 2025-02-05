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
      const locationId = 1; // You can dynamically change this
      const result = await fetchProductsDataByLocation(locationId);
      if (result) {
        setData(result);
      }
    };

    fetchData();
  }, []);

  // ✅ Update product types dropdown when category changes
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = parseInt(e.target.value);
    setSelectedCategory(categoryId.toString());
    setFilteredTypes(data.productTypes.filter((type) => type.CategoryID === categoryId));
    setFilteredProducts([]);
    setSelectedType("");
  };

  // ✅ Update products dropdown when product type changes
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const typeId = parseInt(e.target.value);
    setSelectedType(typeId.toString());
    setFilteredProducts(data.products.filter((product) => product.TypeID === typeId));
  };

  // ✅ Handle Search Button Click
  const handleSearch = () => {
    setSearchResults(filteredProducts);
  };

  return (
    <>
      <Header />
      <main className="homepage-container">
        <div className="marquee">
          <p>Special offers and discounts available!</p>
        </div>

        <div className="search-section">
          {/* ✅ Category Dropdown */}
          <select className="search-bar" onChange={handleCategoryChange}>
            <option value="">Select Category</option>
            {data.categories.map((cat) => (
              <option key={cat.ID} value={cat.ID}>
                {cat.Name}
              </option>
            ))}
          </select>

          {/* ✅ Product Type Dropdown */}
          <select className="search-bar" onChange={handleTypeChange} disabled={!selectedCategory}>
            <option value="">Select Product Type</option>
            {filteredTypes.map((type) => (
              <option key={type.ID} value={type.ID}>
                {type.Name}
              </option>
            ))}
          </select>

          {/* ✅ Product Dropdown */}
          <select className="search-bar" disabled={!selectedType}>
            <option value="">Select Product</option>
            {filteredProducts.map((prod) => (
              <option key={prod.ID} value={prod.ID}>
                {prod.Name}
              </option>
            ))}
          </select>

          <button onClick={handleSearch}>Search</button>
        </div>

        <div className="product-grid">
          {searchResults.length > 0 ? (
            searchResults.map((prod) => (
              <div key={prod.ID} className="product-item">
                <img src={prod.ImageURL} alt={prod.Name} className="product-image" />
                <h4>{prod.Name}</h4>
                <p>{prod.Brand}</p>
                <p>₹{prod.Cost}</p>
              </div>
            ))
          ) : (
            <p>Select filters and click search to see results.</p>
          )}
        </div>
      </main>

      <footer className="footer">Footer Content goes here</footer>
    </>
  );
}
