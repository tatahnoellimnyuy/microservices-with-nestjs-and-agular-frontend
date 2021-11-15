import { Product } from './product.entity';
import { Module, HttpModule } from '@nestjs/common';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './product.service';
import { Transport, ClientsModule } from '@nestjs/microservices';

@Module({
  imports:[HttpModule,
    TypeOrmModule.forFeature([Product],),
    ClientsModule.register([
      {
        name: 'PRODUCT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqps://llezgzor:oKlqyLITjoBgiSl3exK8EHSJOCNhwzDV@cow.rmq2.cloudamqp.com/llezgzor'],
          queue: 'main_queue',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
