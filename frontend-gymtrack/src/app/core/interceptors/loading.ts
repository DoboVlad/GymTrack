import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { finalize } from "rxjs";
import { LoadingService } from "../services/loading/loading";

export const loadingInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    const loadingService = inject(LoadingService);

    // Show loading indicator for all requests
    loadingService.show();

    return next(req).pipe(
        finalize(() => {
            // Hide loading indicator after request completes
            loadingService.hide();
        }),
    );
}