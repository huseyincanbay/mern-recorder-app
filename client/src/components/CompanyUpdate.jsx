import { useState } from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";

// Styles for the modal
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
    border: "none", // 
  },
};

const CompanyUpdate = ({ isOpen, onClose, company, onSave }) => {
  const [formData, setFormData] = useState(company);

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
      contentLabel="Update Company Modal"
    >
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Edit Company</h1>
        <form>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1">
              <label className="block text-gray-700">Company Name:</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="border p-2 w-full rounded"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-gray-700">Legal Number:</label>
              <input
                type="text"
                name="legalNumber"
                value={formData.legalNumber}
                onChange={handleChange}
                className="border p-2 w-full rounded"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-gray-700">Country:</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="border p-2 w-full rounded"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-gray-700">Website:</label>
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="border p-2 w-full rounded"
              />
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

CompanyUpdate.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  company: PropTypes.object, 
  onSave: PropTypes.func.isRequired,
};

export default CompanyUpdate;
