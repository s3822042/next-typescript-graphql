import "@//styles/globals.css";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import React, { useState } from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import { ErrorBoundary } from "react-error-boundary";

import { AppErrorFallback } from "@/components/shared/AppErrorFallback";
import BaseLayout from "@/components/layout/BaseLayout";

type Page<P = {}> = NextPage<P> & {
  getLayout?: (page: React.ReactElement) => React.ReactElement;
};
interface WorkaroundAppProps extends AppProps {
  err: any;
  Component: Page;
}

export default function App({
  Component,
  pageProps,
  router,
  err,
}: WorkaroundAppProps) {
  const [errorInfo, setErrorInfo] = useState<any>();

  const getLayout =
    Component.getLayout ||
    ((page: React.ReactElement) => <BaseLayout>{page}</BaseLayout>);
  return (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <ErrorBoundary
        onError={(error, info) => {
          setErrorInfo(info);
        }}
        fallbackRender={(fallbackProps) => {
          return <AppErrorFallback {...fallbackProps} errorInfo={errorInfo} />;
        }}
      >
        {getLayout(<Component {...pageProps} err={err} />)}
      </ErrorBoundary>
    </>
  );
}
