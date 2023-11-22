import express from 'express';
import { dashboardService } from './dashboardService';

const dashboardRouter = express.Router();

/**
 * @openapi
 * '/api/dashboard/':
 *  get:
 *     tags:
 *       - Dashboard
 *     operationId: getDashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
dashboardRouter.get('/', async (_req, res) => {
  try {
    const dashboard = await dashboardService.getDashboardData();
    res.status(200).json(dashboard);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default dashboardRouter;