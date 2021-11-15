import { ProductService } from './product.service';
export declare class ProductController {
    private productService;
    constructor(productService: ProductService);
    all(): Promise<import("./product.model").Product[]>;
    like(id: number): Promise<any>;
    try(data: string): Promise<void>;
    create(product: any): Promise<void>;
    update(product: any): Promise<void>;
    delete(id: number): Promise<void>;
}
