/* eslint @typescript-eslint/explicit-function-return-type: 0 */

import "bootstrap/dist/css/bootstrap.min.css";

import "./index.css";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />;
}
