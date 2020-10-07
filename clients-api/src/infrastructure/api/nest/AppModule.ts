import { Module } from '@nestjs/common';
import { ClientsModule } from './modules/ClientsModule';

@Module({
  imports: [ClientsModule],
})
export class AppModule {}
