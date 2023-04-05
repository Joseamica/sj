import {ActionArgs, json, redirect} from '@remix-run/node'
import {prisma} from '~/db.server'

export async function action({params, request}: ActionArgs) {
  const {noteId} = params
  const deleteNote = await prisma.note.delete({where: {id: noteId}})

  return redirect('/msg')
}
