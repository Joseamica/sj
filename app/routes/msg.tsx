import React from 'react'
import {getUser, getUserId, requireUserId} from '../session.server'
import {prisma} from '~/db.server'

import {getNoteListItems} from '~/models/note.server'
import {json} from '@remix-run/node'
import {Link, NavLink, useLoaderData, Outlet, Form} from '@remix-run/react'
import {useUser} from '~/utils'
import {MsgContainer} from '../components/msg-container'
import {ButtonNew} from '../components/button-new'
import {AnimatePresence} from 'framer-motion'

export async function loader({request}) {
  const messages = await prisma.note.findMany({})
  // const userId = await requireUserId(request)
  const userId = await getUserId(request)

  return json({messages, userId})
}

export default function Mensajes() {
  const data = useLoaderData()

  return (
    <div className="flex h-full min-h-screen flex-col space-y-2 ">
      <header className="flex items-center justify-between bg-[#324269] p-4 text-white shadow-lg">
        <h1 className="text-3xl font-bold">
          <Link to=".">Mensajes para Soum ♥️</Link>
        </h1>
        <ButtonNew to="/new" label="Escribir Mensaje" />
      </header>
      <main className="flex h-full flex-col bg-bg ">
        {data.messages.length === 0 ? (
          <p className="p-4 text-white">Aun no hay notas...</p>
        ) : (
          <AnimatePresence>
            <ol className="flex flex-row  flex-wrap">
              {data.messages.map(
                (message: {
                  id: React.Key | null | undefined | string
                  title: any
                  body: any
                  createdAt: any
                  profilePicture: any
                  name: any
                  presentation: any
                }) => {
                  return (
                    <MsgContainer
                      id={message.id}
                      key={message.id}
                      title={message.title}
                      body={message.body}
                      created={message.createdAt}
                      profilePicture={message.profilePicture}
                      name={message.name}
                      presentation={message.presentation}
                      userId={data.userId}
                    />
                  )
                },
              )}
            </ol>
          </AnimatePresence>
        )}

        {/* <div className="flex-1 p-6">
        <Outlet />
      </div> */}
      </main>
    </div>
  )
}
