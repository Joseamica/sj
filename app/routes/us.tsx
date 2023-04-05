import {json} from '@remix-run/node'
import {requireUserId} from '~/session.server'

export async function loader({request, params}) {
  const userId = await requireUserId(request)

  return json({success: true})
}
