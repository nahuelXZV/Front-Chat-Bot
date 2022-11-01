import Nav from "./Nav";
import Aside from "./Aside";
import Head from "next/head";
import PrivateComponent from "./privatecomponent";

export default function Layout({ children, title }) {
  return (
    <>
      <PrivateComponent />
      <Head>
        <title>{title}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex h-screen overflow-y-hidden bg-white">
        <Aside />
        <div className="flex flex-col flex-1 h-full overflow-hidden">
          <Nav />

          <main className="flex-1 max-h-full p-1 py-1 overflow-hidden overflow-y-scroll">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
