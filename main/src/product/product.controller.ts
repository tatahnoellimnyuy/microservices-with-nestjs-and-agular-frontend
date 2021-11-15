import { create } from 'node:domain';
import { ProductService } from './product.service';
import { Controller, Post, Get, Param } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller('products')
export class ProductController {
    constructor(private productService: ProductService){}
    
    @Get()
    async all() {

        return this.productService.all()
    }
    @Post(':id/like')
        async like(
            @Param('id') id:number,
        ):Promise<any>{
            var product=await this.productService.findProduct(id)
            return this.productService.update(id,{
                likes:product.likes+1
            })            
        }
    
    @EventPattern('test')
    async try(data:string){
        console.log(data)
    }
    
    @EventPattern('product_created')
    async create(product:any){
        console.log(product)
        await this.productService.create({
            id: product.id,
            title:product.title,
            image:product.image,
            likes:product.likes,
        })

    }
    @EventPattern('update_product')
    async update(product:any){ 
        await this.productService.update(product.id,{
            id: product.id,
            title:product.title,
            image:product.image,
            likes:product.likes,
        })

    }
    @EventPattern('delete_element')
    async delete(id:number){ 
        await this.productService.delete(id)

    }



}
