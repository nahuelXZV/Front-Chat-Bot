import Head from "next/head";

export default function Layout_Login({ children, title }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-fondo">
        <div className="flex justify-center h-screen w-screen items-center">
          {children}
        </div>
      </div>
    </>
  );
}