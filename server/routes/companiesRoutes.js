const express = require('express');
const router = express.Router();
const companiesController = require('../controllers/companiesController');
const { authenticateToken } = require('../middleware/authMiddleware');

// Create a new company
router.post('/companies', authenticateToken, companiesController.createCompany);

// Get a list of all companies
router.get('/companies', companiesController.getCompanies);

// Get a specific company by ID
router.get('/companies/:id', authenticateToken, companiesController.getCompanyById);

// Update a company by ID
router.put('/companies/:id', authenticateToken, companiesController.updateCompany);

// Delete a company by ID
router.delete('/companies/:id', authenticateToken, companiesController.deleteCompany);

// Get the most recently added companies (limit to 3)
router.get('/recent-companies', companiesController.getRecentCompanies);

module.exports = router;