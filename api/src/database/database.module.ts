import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:smartpass4202@smartparkcluster0.n3t1c1r.mongodb.net/?retryWrites=true&w=majority&appName=SmartParkCluster0',
    ),
  ],
})
export class DatabaseModule {}
