import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import type { AxiosResponse } from 'axios';

@Injectable()
export class HttpClientService {
  constructor(private readonly http: HttpService) {}

  async get<T>(url: string, params?: Record<string, string>): Promise<T> {
    const response: AxiosResponse<T> = await lastValueFrom(
      this.http.get<T>(url, { params }),
    );
    return response.data;
  }
}
