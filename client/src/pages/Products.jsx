import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import ProductsUpdate from "../components/ProductsUpdate";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [formData, setFormData] = useState({
    productName: "",
    productCategory: "",
    productAmount: "",
    amountUnit: "",
    companyId: "",
  });

  const [editingProductId, setEditingProductId] = useState(null);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await axios.get(
          "http://localhost:5000/products"
        );
        const companiesResponse = await axios.get(
          "http://localhost:5000/companies"
        );

        setProducts(productsResponse.data);
        setCompanies(companiesResponse.data); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCreateProduct = async () => {
    if (
      !formData.productName ||
      !formData.productCategory ||
      !formData.productAmount ||
      !formData.amountUnit ||
      !formData.companyId
    ) {
      toast.error("All fields are required!", {
        position: "bottom-left",
        autoClose: 2000,
      });
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/products",
        formData
      );
      setProducts([...products, response.data]);
      setFormData({
        productName: "",
        productCategory: "",
        productAmount: "",
        amountUnit: "",
        companyId: "",
      });
      toast.success("Product created successfully.", {
        position: "bottom-right",
        autoClose: 2000,
      });
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("An error occurred while creating the product.", {
        autoClose: 2000,
      });
    }
  };

  const handleEditProduct = (productId) => {
    setEditingProductId(productId);
    setUpdateModalOpen(true);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/products/${productId}`);
      const updatedProducts = products.filter(
        (product) => product._id !== productId
      );
      setProducts(updatedProducts);
      toast.success("Product deleted successfully.", {
        position: "bottom-right",
        autoClose: 2000,
      });
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleUpdateProduct = async (updatedData) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/products/${editingProductId}`,
        updatedData
      );
      const updatedProducts = products.map((product) =>
        product._id === editingProductId ? response.data : product
      );
      setProducts(updatedProducts);
      setEditingProductId(null);
      setUpdateModalOpen(false);
      toast.success("Product updated successfully.", {
        position: "bottom-right",
        autoClose: 2000,
      });
    } catch (error) {
      console.error("Error editing product:", error);
      toast.error("An error occurred while updating the product.", {
        autoClose: 2000,
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingProductId(null);
    setUpdateModalOpen(false);
  };

  return (
    <div className="min-h-screen max-w-screen-xl mx-auto m-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <form className="mb-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="productName"
            placeholder="Product Name"
            className="border p-2"
            value={formData.productName}
            onChange={(e) =>
              setFormData({ ...formData, productName: e.target.value })
            }
            required
          />
          <input
            type="text"
            name="productCategory"
            placeholder="Product Category"
            className="border p-2"
            value={formData.productCategory}
            onChange={(e) =>
              setFormData({ ...formData, productCategory: e.target.value })
            }
            required
          />
          <input
            type="number"
            name="productAmount"
            placeholder="Product Amount"
            className="border p-2"
            value={formData.productAmount}
            onChange={(e) =>
              setFormData({ ...formData, productAmount: e.target.value })
            }
            required
          />
          <input
            type="text"
            name="amountUnit"
            placeholder="Amount Unit"
            className="border p-2"
            value={formData.amountUnit}
            onChange={(e) =>
              setFormData({ ...formData, amountUnit: e.target.value })
            }
            required
          />
          <div className="col-span-1">
            <label className="block text-gray-700">Company:</label>
            <select
              name="companyId"
              value={formData.companyId}
              onChange={(e) =>
                setFormData({ ...formData, companyId: e.target.value })
              }
              className="border p-2 w-full rounded"
              required
            >
              <option value="" disabled>
                Select a Company
              </option>
              {companies.map((company) => (
                <option key={company._id} value={company._id}>
                  {company.companyName}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={handleCreateProduct}
            className="bg-blue-500 hover:bg-blue-700 text-white rounded m-2 transition duration-300 ease-in-out hover:scale-100"
          >
            Create Product
          </button>
        </div>
      </form>
      <ToastContainer />
      <table className="w-full">
        <thead>
          <tr>
            <th className="bg-gray-200 text-left px-4 py-2">Product Name</th>
            <th className="bg-gray-200 text-left px-4 py-2">
              Product Category
            </th>
            <th className="bg-gray-200 text-left px-4 py-2">Product Amount</th>
            <th className="bg-gray-200 text-left px-4 py-2">Amount Unit</th>
            <th className="bg-gray-200 text-left px-4 py-2">Company</th>
            <th className="bg-gray-200 text-left px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td className="border px-4 py-2">{product.productName}</td>
              <td className="border px-4 py-2">{product.productCategory}</td>
              <td className="border px-4 py-2">{product.productAmount}</td>
              <td className="border px-4 py-2">{product.amountUnit}</td>
              <td className="border px-4 py-2">
                {
                  companies.find((company) => company._id === product.companyId)
                    ?.companyName
                }
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEditProduct(product._id)}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white rounded p-1 px-2 mx-1 transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteProduct(product._id)}
                  className="bg-red-500 hover:bg-red-700 text-white rounded p-1 px-2 mx-1 transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isUpdateModalOpen && (
        <ProductsUpdate
          isOpen={isUpdateModalOpen}
          onClose={handleCancelEdit}
          product={products.find((p) => p._id === editingProductId)}
          onSave={handleUpdateProduct}
          companies={companies}
        />
      )}
    </div>
  );
};

export default Products;
