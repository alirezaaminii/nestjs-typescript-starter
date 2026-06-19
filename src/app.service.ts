import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { Public } from './common/decorators/auth.decorator';

@Injectable()
@Public()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  getHello(): string {
    return 'Hello World!';
  }
  async getData(key: string): Promise<string> {
    const cachedData = await this.cacheManager.get<string>(key);
    if (cachedData) {
      return `from cache: ${cachedData}`;
    }
    const data = `new data for ${key}`;
    await this.cacheManager.set<string>(key, data, 5000);
    return `new: ${data}`;
  }
}
