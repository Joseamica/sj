import type {LinksFunction, LoaderArgs} from '@remix-run/node'
import {json} from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react'
import {Header} from './components/header'

import tailwindStylesheetUrl from './styles/tailwind.css'
import {getUser} from './session.server'

export const links: LinksFunction = () => {
  return [{rel: 'stylesheet', href: tailwindStylesheetUrl}]
}

export async function loader({request}: LoaderArgs) {
  return json({
    user: await getUser(request),
  })
}

export default function App() {
  const data = useLoaderData<typeof loader>()
  return (
    <html lang="en" className="h-full bg-[#303F63]">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className=" h-full ">
        <Header user={data.user} />

        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

// export const ErrorBoundary = ({error}) => {
//   return <div>ERROR: {error.message}</div>
// }
