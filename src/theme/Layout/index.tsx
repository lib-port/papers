import React, {type ReactNode} from 'react';
import Head from '@docusaurus/Head';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {useColorMode} from '@docusaurus/theme-common';
import Layout from '@theme-original/Layout';
import type {Props} from '@theme/Layout';

function ThemeFavicon(): ReactNode {
  const {colorMode} = useColorMode();
  const faviconUrl = useBaseUrl(
    colorMode === 'dark' ? 'img/logo-dark.svg' : 'img/logo.svg',
  );

  return (
    <Head>
      <link rel="icon" type="image/svg+xml" href={faviconUrl} />
    </Head>
  );
}

export default function LayoutWrapper({children, ...props}: Props): ReactNode {
  return (
    <Layout {...props}>
      <ThemeFavicon />
      {children}
    </Layout>
  );
}
