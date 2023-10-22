import { useState } from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
  },
};

const ProductsUpdate = ({ isOpen, onClose, product, onSave, companies }) => {
  const [formData, setFormData] = useState(
    product
      ? { ...product }
      : {
          productName: "",
          productCategory: "",
          productAmount: "",
          amountUnit: "",
          companyId: "", 
        }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCancel}
      style={customStyles}
      contentLabel="Update Product Modal"
    >
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
        <form>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1">
              <label className="block text-gray-700">Product Name:</label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                className="border p-2 w-full rounded"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-gray-700">Product Category:</label>
              <input
                type="text"
                name="productCategory"
                value={formData.productCategory}
                onChange={handleChange}
                className="border p-2 w-full rounded"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-gray-700">Product Amount:</label>
              <input
                type="number"
                name="productAmount"
                value={formData.productAmount}
                onChange={handleChange}
                className="border p-2 w-full rounded"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-gray-700">Amount Unit:</label>
              <input
                type="text"
                name="amountUnit"
                value={formData.amountUnit}
                onChange={handleChange}
                className="border p-2 w-full rounded"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-gray-700">Company:</label>
              <select
                name="companyId" 
                value={formData.companyId} 
                onChange={handleChange}
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
          </div>
          <div className="mt-4">
            <button
              type="button"
              onClick={handleSave}
              className="bg-blue-500 text-white rounded p-2"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-400 text-white rounded p-2 ml-2"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

ProductsUpdate.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  product: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  companies: PropTypes.array.isRequired,
};

export default ProductsUpdate;
