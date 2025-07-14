// src/app/core/services/loading.service.ts
import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private requestCount = signal(0);
  loading = computed(() => this.requestCount() > 0);

  show() {
    this.requestCount.update(count => count + 1);
  }

  hide() {
    this.requestCount.update(count => Math.max(count - 1, 0));
  }
}
