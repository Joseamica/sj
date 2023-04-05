import {V2_MetaFunction, json, redirect} from '@remix-run/node'
import {Link} from '@remix-run/react'

import {getUserId} from '~/session.server'

import {useOptionalUser} from '~/utils'

export const meta: V2_MetaFunction = () => [{title: 'Remix Notes'}]

export async function loader({request}) {
  const userId = await getUserId(request)
  if (!userId) {
    return redirect('/msg')
  } else {
    return json({userId})
  }
}

export default function Index() {
  const user = useOptionalUser()
  return (
    <main className="relative min-h-screen  sm:flex sm:items-center sm:justify-center">
      <div className="absolute inset-0">
        <div className="flex w-full flex-col items-center justify-center">
          <h1 className="text-center text-9xl">
            Bienvenido a una pagina hecha especialmente para Soum
          </h1>
        </div>
        <p>que estas pensando</p>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/sjweb-d2b63.appspot.com/o/f45b2fb4-856f-4cf7-9488-4166f53d00d2%202.JPG?alt=media&token=11490b8d-e02c-4cc7-8252-487183962968"
          className=" absolute object-cover"
          alt="juntos"
        />
      </div>

      {/* <div className="absolute inset-x-0 bottom-0 top-14 -skew-y-6 transform bg-gradient-to-r from-purple-400 to-blue-500 shadow-lg sm:-rotate-6 sm:skew-y-0 sm:rounded-3xl" />
      <div className="relative bg-white px-4 py-10 shadow-lg sm:rounded-3xl sm:p-20">
        <div className="mx-auto max-w-md">
          <div>
            <img
              className="h-96 object-contain "
              src="https://remix-jokes.lol/social.png"
              alt="Workflow"
            />
          </div>
        </div>
      </div> */}
    </main>
  )
}
