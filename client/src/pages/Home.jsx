import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [companies, setCompanies] = useState([]);
  const [recentCompanies, setRecentCompanies] = useState([]);
  const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/recent-products")
      .then((response) => {
        setRecentProducts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get("http://localhost:5000/companies")
      .then((response) => {
        setCompanies(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get("http://localhost:5000/recent-companies")
      .then((response) => {
        setRecentCompanies(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="container mt-5 min-h-screen max-w-screen-xl mx-auto m-4">
      <h1 className="text-3xl font-semibold mb-3">Company List</h1>
              <div className="mb-5 mt-5">
          <div className="bg-white p-4 shadow-md rounded-md">
            <p className="text-2xl font-semibold">
              There are {companies.length} companies in the system.
            </p>
          </div>
        </div>
      <div className="mt-5">
        <h2 className="text-2xl font-semibold mb-3">
          Recently Added Companies
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentCompanies.map((company) => (
            <div
              key={company._id}
              className="bg-white p-4 shadow-md rounded-md"
            >
              <h2 className="text-xl font-semibold">{company.companyName}</h2>
              <p>Legal Number: {company.legalNumber}</p>
              <p>Country: {company.country}</p>
              <a
                href={company.website}
                className="text-blue-500 hover:underline"
              >
                Website
              </a>
            </div>
          ))}
        </div>
        <h1 className="text-3xl font-semibold mt-6">Product List</h1>
        <div className="mb-5 mt-4">
          <div className="bg-white p-4 shadow-md rounded-md">
            <p className="text-2xl font-semibold">
              There are {recentProducts.length} recent products in the system.
            </p>
          </div>
        </div>
        <h2 className="text-2xl font-semibold mb-3 mt-6">Recently Added Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white p-4 shadow-md rounded-md"
            >
              <h2 className="text-xl font-semibold">{product.productName}</h2>
              <p>Category: {product.productCategory}</p>
              <p>
                Amount: {product.productAmount} {product.amountUnit}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
