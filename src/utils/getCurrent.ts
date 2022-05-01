import { ExecutionContext } from '@nestjs/common';
import { Dictionary } from 'code-config';
import { User } from 'src/users/schemas/user.schema';

export interface Client {
  headers: Dictionary<string>;
  user: User;
}

export const getClient = <T = Client>(ctx: ExecutionContext): T => {
  switch (ctx.getType()) {
    case 'http':
      return ctx.switchToHttp().getRequest();
    default:
      return undefined;
  }
};
