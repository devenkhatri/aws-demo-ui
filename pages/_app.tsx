import { SWRConfig } from 'swr'
import fetchJson from '../lib/fetchJson'

import { JSX as LocalJSX} from '@ionic/core'
import {JSX as IoniconsJSX} from 'ionicons'
import { HTMLAttributes, ReactText } from 'react'

import React, { useEffect } from 'react'
import { defineCustomElements as ionDefineCustomElements } from '@ionic/core/loader';
/* Core CSS required for Ionic components to work properly */
import '@ionic/core/css/core.css';

// /* Basic CSS for apps built with Ionic */
import '@ionic/core/css/normalize.css';
// import '@ionic/core/css/structure.css'; // commented as it was not making the page scroll
import '@ionic/core/css/typography.css';

// /* Optional CSS utils that can be commented out */
import '@ionic/core/css/padding.css';
import '@ionic/core/css/float-elements.css';
import '@ionic/core/css/text-alignment.css';
import '@ionic/core/css/text-transformation.css';
import '@ionic/core/css/flex-utils.css';
import '@ionic/core/css/display.css';

/* Theme variables */
import '../styles/variables.css';

import '../styles/globals.css'
import 'antd/dist/antd.css';


// type ToReact<T> = {
//   [P in keyof T]?: T[P] & Omit<HTMLAttributes<Element>, 'className'> & {
//     class?: string;
//     key?: ReactText;
//   }
// }

// declare global {
//   export namespace JSX {
//     interface IntrinsicElements extends ToReact<LocalJSX.IntrinsicElements & IoniconsJSX.IntrinsicElements> {}
//   }
// }

function MyApp({ Component, pageProps }: any) {
  useEffect(() => {
    ionDefineCustomElements(window)
  })
  return (
    <SWRConfig
      value={{
        fetcher: fetchJson,
        onError: (err) => {
          console.error(err)
        },
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  )
}

export default MyApp
