import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components//ui/button";
import { ErrorBoundary } from "react-error-boundary";

type FallbackProps = {
  error: Error;
  resetErrorBoundary: () => void;
};
export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div>
      <Alert variant="destructive" className="border-red-200 bg-red-50">
        <AlertTitle className="text-red-800">Something went wrong</AlertTitle>
        <AlertDescription className="text-red-700">
          {error.message}
          <Button
            onClick={resetErrorBoundary}
            className="w-fit text-red-700 bg-red-200 hover:bg-red-300 transition duration-100 "
          >
            TryAgain
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const withErrorBoundary = (Component: React.ComponentType) => {
  return function WrappedWithErrorBoundary(props: any) {
    return (
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
};
