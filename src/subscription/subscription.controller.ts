import { Body, Controller, Delete, Post } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscribeDto } from './dto/subscribe.dto';

@Controller('subscriptions')
export class SubscriptionController {
  constructor(private readonly service: SubscriptionService) {}

  @Post()
  subscribe(@Body() dto: SubscribeDto) {
    return this.service.subscribe(dto);
  }

  @Delete()
  unsubscribe(@Body() dto: SubscribeDto) {
    return this.service.unsubscribe(dto.memberId, dto.sportId);
  }
}
