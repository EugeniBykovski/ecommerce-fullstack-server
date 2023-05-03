import { Module } from '@nestjs/common';
import { BoilerPartsController } from './boiler-parts.controller';
import { BoilerPartsService } from './boiler-parts.service';

@Module({
  controllers: [BoilerPartsController],
  providers: [BoilerPartsService]
})
export class BoilerPartsModule {}
