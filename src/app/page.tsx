import Header from '@/components/Header';
import '@/styles/homepage.css';

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="homepage-container">
        {/* Marquee for special offers */}
        <div className="marquee">
        <p>Specials with offers and stuff goes here with marquee effect and has buttons on left and right side to toggle between offers</p>
        </div>

        {/* Search Section */}
        <div className="search-section">
          <select className="search-bar">
            <option>Product Category</option>
            <option>Rice and Rice products</option>
            <option>Millet and Millet Products</option>

          </select>
          <select className="search-bar">
            <option>Product Type</option>
            <option>Dry Fruits and Nuts</option>
            <option>Masalas and Spices</option>
            <option>Atta and Flours</option>
            <option>Pickles</option>
          </select>
          <select className="search-bar">
            <option>Products</option>
            <option>Dry Fruits and Nuts</option>
            <option>Masalas and Spices</option>
            <option>Atta and Flours</option>
            <option>Pickles</option>
          </select>

          <button>search </button>
        </div>

        {/* Product Grid */}
        <div className="product-grid">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="product-item">Product {index + 1}</div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        Footer Content goes here
      </footer>
    </>
  );
}
