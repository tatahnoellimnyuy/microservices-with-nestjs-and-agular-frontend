import { ProductDocument, Product } from './product.model';
import { Model } from 'mongoose';
export declare class ProductService {
    private readonly productModel;
    constructor(productModel: Model<ProductDocument>);
    all(): Promise<Product[]>;
    create(data: any): Promise<Product>;
    delete(id: any): Promise<any>;
    findProduct(id: number): Promise<Product>;
    update(id: number, data: any): Promise<Product>;
}
