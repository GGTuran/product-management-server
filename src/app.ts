import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { productRoutes } from './app/modules/product/product.route';
import { OrderRoutes } from './app/modules/orders/order.route';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

//application routes
app.use('/api/products',productRoutes);
app.use('/api/orders', OrderRoutes );

app.get('/', (req: Request, res: Response) => {
  res.send('Product Management server');
});

export default app;
