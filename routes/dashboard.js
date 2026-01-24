const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

router.get('/', dashboardController.renderDashboard);
router.get('/api/dashboard/stats', dashboardController.getDashboardStats);
router.get('/api/dashboard/timetable', dashboardController.getTimetableData);
router.get('/api/dashboard/filters', dashboardController.getFilterOptions);

module.exports = router;
