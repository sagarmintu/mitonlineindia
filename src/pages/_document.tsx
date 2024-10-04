import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          rel="preconnect"
          href="https://o4504156929982464.ingest.sentry.io"
        />
        <link
          rel="dns-prefetch"
          href="https://o4504156929982464.ingest.sentry.io"
        />
        <script
          dangerouslySetInnerHTML={{
        	__html: `
        	  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-N822DJQF');
        	`,
          }}
        />
      </Head>
      <body>
        <noscript
          dangerouslySetInnerHTML={{
        	__html: `
        	  ><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-N822DJQF" height="0" width="0" style="display:none;visibility:hidden"></iframe>
        	`,
          }}
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
