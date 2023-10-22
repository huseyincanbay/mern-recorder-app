import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import CompanyUpdate from "../components/CompanyUpdate";

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [formData, setFormData] = useState({
    companyName: "",
    legalNumber: "",
    country: "",
    website: "",
  });

  const [editingCompanyId, setEditingCompanyId] = useState(null); // Track the currently editing company ID
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false); // State for opening/closing the modal

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get("http://localhost:5000/companies");
        setCompanies(response.data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchCompanies();
  }, []);

  const handleCreateCompany = async () => {
    if (
      !formData.companyName ||
      !formData.legalNumber ||
      !formData.country ||
      !formData.website
    ) {
      toast.error("All fields are required!", {
        position: "bottom-left",
        autoClose: 2000,
      });
      return; 
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/companies",
        formData
      );
      setCompanies([...companies, response.data]);
      setFormData({
        companyName: "",
        legalNumber: "",
        country: "",
        website: "",
      });
      toast.success("Company created successfully.", {
        position: "bottom-right",
        autoClose: 2000,
      });
    } catch (error) {
      console.error("Error creating company:", error);
      toast.error("An error occurred while creating the company.", {
        autoClose: 2000,
      });
    }
  };

  const handleEditCompany = (companyId) => {
    setEditingCompanyId(companyId);
    setUpdateModalOpen(true);
  };

  const handleDeleteCompany = async (companyId) => {
    try {
      await axios.delete(`http://localhost:5000/companies/${companyId}`);
      const updatedCompanies = companies.filter(
        (company) => company._id !== companyId
      );
      setCompanies(updatedCompanies);
      toast.success("Company Deleted successfully.", {
        position: "bottom-right",
        autoClose: 2000,
      });
    } catch (error) {
      console.error("Error deleting company:", error);
    }
  };

  const handleUpdateCompany = async (updatedData) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/companies/${editingCompanyId}`,
        updatedData
      );
      const updatedCompanies = companies.map((company) =>
        company._id === editingCompanyId ? response.data : company
      );
      setCompanies(updatedCompanies);
      setEditingCompanyId(null); 
      setUpdateModalOpen(false);
      toast.success("Company Updated successfully.", {
        position: "bottom-right",
        autoClose: 2000,
      });
    } catch (error) {
      console.error("Error editing company:", error);
      toast.error("An error occurred while Updating the company.", {
        autoClose: 2000,
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingCompanyId(null); 
    setUpdateModalOpen(false);
  };

  return (
    <div className="min-h-screen max-w-screen-xl mx-auto m-4">
      <h1 className="text-2xl font-bold mb-4">Companies</h1>
      <form className="mb-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            className="border p-2"
            value={formData.companyName}
            onChange={(e) =>
              setFormData({ ...formData, companyName: e.target.value })
            }
            required
          />
          <input
            type="text"
            name="legalNumber"
            placeholder="Legal Number"
            className="border p-2"
            value={formData.legalNumber}
            onChange={(e) =>
              setFormData({ ...formData, legalNumber: e.target.value })
            }
            required
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            className="border p-2"
            value={formData.country}
            onChange={(e) =>
              setFormData({ ...formData, country: e.target.value })
            }
            required
          />
          <input
            type="url"
            name="website"
            placeholder="Website"
            className="border p-2"
            value={formData.website}
            onChange={(e) =>
              setFormData({ ...formData, website: e.target.value })
            }
            required
          />
          <button
            type="button"
            onClick={handleCreateCompany}
            className="bg-blue-500 hover:bg-blue-700 text-white rounded p-2 mt-2 transition duration-300 ease-in-out hover:scale-105"
          >
            Create Company
          </button>
        </div>
      </form>
      <ToastContainer />
      <table className="w-full">
        <thead>
          <tr>
            <th className="bg-gray-200 text-left px-4 py-2">Company Name</th>
            <th className="bg-gray-200 text-left px-4 py-2">Legal Number</th>
            <th className="bg-gray-200 text-left px-4 py-2">Country</th>
            <th className="bg-gray-200 text-left px-4 py-2">Website</th>
            <th className="bg-gray-200 text-left px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr key={company._id}>
              <td className="border px-4 py-2">{company.companyName}</td>
              <td className="border px-4 py-2">{company.legalNumber}</td>
              <td className="border px-4 py-2">{company.country}</td>
              <td className="border px-4 py-2">{company.website}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEditCompany(company._id)}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white rounded p-1 px-2 mx-1 transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteCompany(company._id)}
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
        <CompanyUpdate
          isOpen={isUpdateModalOpen}
          onClose={handleCancelEdit}
          company={companies.find((c) => c._id === editingCompanyId)}
          onSave={handleUpdateCompany}
        />
      )}
    </div>
  );
};

export default Companies;
