import express from 'express';
import {defaultRoute} from './defaultRoute';

export const mainRoutes = express.Router();

mainRoutes.use(defaultRoute);