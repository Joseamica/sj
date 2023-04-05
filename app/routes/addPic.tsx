import {ActionArgs, UploadHandler, redirect} from '@remix-run/node'
import {
  json,
  unstable_composeUploadHandlers as composeUploadHandlers,
  unstable_createMemoryUploadHandler as createMemoryUploadHandler,
  unstable_parseMultipartFormData as parseMultipartFormData,
} from '@remix-run/node'
import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useLocation,
  useParams,
  useSearchParams,
} from '@remix-run/react'
import {prisma} from '~/db.server'
import {getSession, sessionStorage} from '~/session.server'
import {uploadImage} from '~/utils/util.server'

export const action = async ({request}: ActionArgs) => {
  const session = await getSession(request)
  const url = new URL(request.url)
  const search = new URLSearchParams(url.search)
  const noteId = search.get('noteId')

  const uploadHandler: UploadHandler = composeUploadHandlers(
    async ({name, data}) => {
      if (name !== 'img') {
        return undefined
      }
      // console.log('data', data)

      const uploadedImage = await uploadImage(data)
      return uploadedImage.secure_url
    },
    createMemoryUploadHandler(),
  )

  const formData = await parseMultipartFormData(request, uploadHandler)
  const imgSrc = formData.get('img')

  session.set('imgSrc', imgSrc)

  if (typeof imgSrc !== 'string') {
    return json({error: 'Primero sube una foto'})
  }

  if (noteId) {
    await prisma.note.update({
      where: {
        id: noteId,
      },
      data: {
        profilePicture: imgSrc,
      },
    })
  }

  // return json({imgSrc})
  return redirect('/msg')
  // return json(
  //   {imgSrc},
  //   // {
  //   //   headers: {
  //   //     'Set-Cookie': await sessionStorage.commitSession(session),
  //   //   },
  //   // },
  // )
}

// export async function loader({request}) {
//   const session = await getSession(request)
//   const imgSrc = session.get('imgSrc')
//   // console.log('imgSrc from loader', imgSrc)
//   return json({imgSrc})
// }

export default function Index() {
  const actionData = useActionData<typeof action>()
  const data = useLoaderData()
  // const [params] = useSearchParams()
  // console.log('params', params)
  // console.log('actionData', actionData)

  return (
    <div className="mt-10 flex flex-col items-center justify-center">
      <h1 className="flex h-20 w-20 items-center justify-center rounded-full bg-[#6383CF] text-white">
        Paso 2
      </h1>
      <Form
        method="post"
        // action="/cloudinary-upload"
        className="mt-10 flex flex-col items-center justify-center space-y-4"
        encType="multipart/form-data"
      >
        {actionData?.imgSrc ? (
          <>
            <h2 className="font-semibold uppercase text-[#97A4C1]">
              Foto que subiste
            </h2>
            <img
              src={actionData.imgSrc}
              alt={actionData?.imgDesc || 'Upload result'}
              className="flex h-52 w-52 items-center justify-center rounded-full bg-white object-contain"
            />
            <button
              type="submit"
              name="erase"
              value="erase"
              className="text-white"
            >
              Borrar
            </button>
          </>
        ) : (
          <>
            <h1 className="text-start text-[#97A4C1]">
              Subir foto es opcional
            </h1>
            <div className="flex w-72 items-center justify-center">
              <label
                htmlFor="img-field"
                className={` h-42 flex w-full ${
                  actionData?.error
                    ? 'animate-pulse border-[#FF8080] hover:border-red-500'
                    : null
                } cursor-pointer flex-col items-center justify-center rounded-2xl border-2  border-dashed border-gray-600 bg-formBg hover:border-gray-500 hover:bg-primary`}
              >
                <div className="flex flex-col items-center justify-center  pb-6 pt-5 text-center hover:text-white">
                  <svg
                    aria-hidden="true"
                    className="text-principal mb-3 h-10 w-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p className="text-principal mb-2 text-sm ">
                    {/* <span className="font-semibold">
                      Click aqui para subir tu foto
                    </span>{' '}
                    o arrastra y suelta */}
                  </p>
                  <p className="text-principal mb-2">
                    Click para subir una foto tuya
                  </p>
                  <input
                    id="img-field"
                    type="file"
                    className=" flex w-64 items-center justify-center rounded-full bg-formBg text-center text-white ring-2 ring-primary "
                    name="img"
                    accept="image/*"
                  />
                </div>
              </label>
            </div>
            {actionData?.error ? (
              <div className="w-72 text-center text-[#FF8080]">
                <p>Primero sube una foto para que Soum sepa quien eres!</p>
              </div>
            ) : null}
            <button
              type="submit"
              className=" h-14 w-72 rounded-full bg-[#05C270] text-white "
            >
              Subir foto
            </button>
            <div className="py-7" />
            <Link
              to="/msg"
              className=" flex h-14 w-72 items-center justify-center rounded-full bg-[#FF8080] text-white "
            >
              No quiero subir foto
            </Link>
          </>
        )}
        {/* <hr className="w-full border-2 " /> */}
        <div className="py-2" />
      </Form>

      {actionData?.imgSrc ? (
        <>
          <h2>uploaded image</h2>
          <img
            src={actionData.imgSrc}
            alt={actionData.imgDesc || 'Upload result'}
          />
        </>
      ) : null}
    </div>
  )
}
