
import { Injectable } from '@nestjs/common';
import {ProductDocument,Product} from './product.model'
import { InjectModel } from '@nestjs/mongoose';
import {Model} from 'mongoose'
@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name) private readonly productModel:Model<ProductDocument>
    ){
    }
    async all(): Promise<Product[]>{
        return this.productModel.find().exec(); 
    }
    //create
    async create(data): Promise<Product>{
        return new this.productModel(data).save();
    }
    //delete
    async delete(id):Promise<any>{
        this.productModel.findOneAndDelete({id})
    }
    //find by id
    async findProduct(id:number):Promise<Product>{
        return this.productModel.findOne({id})
    }
    //find the updated
    async update(id:number,data):Promise<Product>{
    return this.productModel.findOneAndUpdate({id},data)
    }
   
}
