import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import { ErrorBoundary } from "react-error-boundary";
// import { ErrorFallback } from "@/components/ErrorFallback.tsx";
import { Provider } from "react-redux";
import { store } from "./store/index.ts";
const queryClient = new QueryClient();
import { AuthProvider } from "@/context/AuthContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      {/* <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => {
          //TODO: Reset App state or navigate
          window.location.reload();
        }}
        // onError={() => {
        //    //FEATURE: Learn About Sentry for logging error using
        // }}
      > */}
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Suspense fallback={<div>App is loading...</div>}>
            <AuthProvider>
              <App />
            </AuthProvider>
          </Suspense>
          <ReactQueryDevtools initialIsOpen={false} />
        </Provider>
      </QueryClientProvider>

      {/* </ErrorBoundary> */}
    </BrowserRouter>
  </StrictMode>
);
