import type {AppProps} from "next/app";
import Head from "next/head";
import {Provider} from "react-redux";
import Layout from "layouts";
import store from "store";
import Router from "next/router";
import NProgress from "nprogress";
import "css/tailwind.css";
import "css/main.css";
import "css/layouts/layout-1.scss";
import "css/layouts/e-commerce.css";
import "css/animate.css";
import "css/components/left-sidebar-1/styles-lg.scss";
import "css/components/left-sidebar-1/styles-sm.css";
import "css/components/nprogress.css";
import "css/components/recharts.css";
import "css/components/steps.css";
import "css/components/left-sidebar-3.css";


function App({Component, pageProps: { ...pageProps}}: AppProps): React.ReactElement {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>

      <Provider store={store}>

        <Layout>
          <Component {...pageProps} />
        </Layout>

      </Provider>

    </>
  );
}
export default App;
