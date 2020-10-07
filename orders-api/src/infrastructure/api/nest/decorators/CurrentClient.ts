import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentClient = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.currentClient;
  }
);
