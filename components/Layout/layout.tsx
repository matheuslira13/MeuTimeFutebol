import { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";

export default function Layout(children: ReactNode) {
  return (
    <div>
      <Head>
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <title>Meu Time</title>
      </Head>
      <div className="containerHeader">
        <ul>
          <li>
            <Link href="/">somethig</Link>
          </li>
          <li>
            <Link href="/">somethig</Link>
          </li>
          <li>
            <Link href="/">somethig</Link>
          </li>
        </ul>
      </div>
      {children}
      <div className="containerFooter"></div>
    </div>
  );
}
