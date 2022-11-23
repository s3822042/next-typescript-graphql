import React from "react";

import { FallbackProps } from "react-error-boundary";

import Section from "./Section";
import Button from "./Button";

interface AEFProps extends FallbackProps {
  errorInfo: React.ErrorInfo | null;
}

const sliceErrorStack = (stackTrace = "", numLines = 10) => {
  const lines = stackTrace.split("\n");
  const firstNLines = lines.slice(0, numLines);
  const joinedLines = firstNLines.join("\n");
  return joinedLines;
};

export const AppErrorFallback = ({
  error,
  errorInfo,
  resetErrorBoundary,
}: AEFProps) => {
  return (
    <Section className="flex flex-col items-center justify-center w-full min-h-screen py-4 md:py-20 ">
      <div className="w-full p-8 bg-background-800">
        <h1 className="mb-4 text-5xl font-semibold">An Error Occurred</h1>
        <p className="mb-1 text-lg">
          The application detected an error, and it&apos;s been reported to the
          application development team. You can try clicking &quot;Reload the
          Page&quot; to return to the page you were on previously.
        </p>
        <p className="text-lg">
          If the error keeps occurring, please file a bug report with the
          following details, and include any steps to reproduce the issue:
        </p>
        <Button primary className="my-8" onClick={resetErrorBoundary}>
          Reload the Page
        </Button>
        <h3 className="mb-1 text-2xl font-semibold">Error Details</h3>

        <pre className="mb-3 text-red-300">Error: {error.message}</pre>

        <details>
          <summary className="mb-4">Expand to Show Error Stack Traces</summary>
          <h5 className="mb-1 text-lg font-semibold">Stack Trace</h5>
          <pre
            style={{ wordWrap: "break-word", whiteSpace: "pre-wrap" }}
            className="mb-6"
          >
            {sliceErrorStack(error.stack)}
          </pre>
          <h4 className="mb-1 text-lg font-semibold">Component Stack</h4>
          <pre style={{ wordWrap: "break-word", whiteSpace: "pre-wrap" }}>
            {sliceErrorStack(errorInfo?.componentStack)}
          </pre>
        </details>
      </div>
    </Section>
  );
};
