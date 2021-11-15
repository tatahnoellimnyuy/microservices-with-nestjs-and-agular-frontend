import { Controller, Get, Post, Body,Param, Put, Delete, Inject, HttpService } from '@nestjs/common';
import { ProductService } from './product.service';
import { create } from 'node:domain';
import {ClientProxy} from  '@nestjs/microservices'
import { response } from 'express';

//endpoint 
@Controller('products')
export class ProductController {
    constructor(private productService: ProductService,
    @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy,private httpService:HttpService,
    ){}
    
    @Get()
    async all() {
        var product = await this.productService.all()
        //this.client.emit('all_products',product)
        return product
    }
    @Post()
    async create(
        @Body('title') title: string,
        @Body('image') image:string,
    ){
        var product= await this.productService.create({
            title,
            image,
        })
        
        this.client.emit('test','doing some tryals')
        await this.client.emit('product_created',product)
        return product;
    }
    @Get(':id')
    async get(@Param('id') id:number){
        return this.productService.get(id)
    }

    @Put(':id')
    async update( 
        @Param('id') id:number,
        @Body('title') title:string,
        @Body('image') image:string,
    ){
        await this.productService.update(id,{title,image});

        var product= await this.productService.get(id);

        this.client.emit('update_product',product);
        return product;

    }
    @Delete(':id')
    async delete(
        @Param('id') id:number,
    ){
        await this.productService.delete(id)
        this.client.emit('delete_element',id)
    }

    @Post(':id/like')
    async like(
        @Param('id') id:number,
    ){
         var product= await this.productService.get(id)
         this.httpService.post('http://localhost:8001/api/products/${id}/like',{}).subscribe(
             res =>{
                 console.log(res)
             }
         )
         return this.productService.update(id,{
             likes:product.likes+1
         })
    }
}
