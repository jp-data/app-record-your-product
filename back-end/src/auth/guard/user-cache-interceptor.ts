import { ExecutionContext, Injectable } from '@nestjs/common';
import { CacheInterceptor } from "@nestjs/cache-manager";
import { RequestWithUser } from './guard';

@Injectable()
export class UserCacheInterceptor extends CacheInterceptor {
    protected trackBy(context: ExecutionContext): string | undefined {
        const request = context.switchToHttp().getRequest<RequestWithUser>();
        const userId = request.user?.sub;
        const url = request.url;

        if (request.method === 'GET' && userId) {
            const key = `${userId}-${url}`;
            return key;
        }

        return undefined;
    }
}