import React, {useState} from 'react'
import {json, redirect} from '@remix-run/node'
import {Form, Link, useActionData, useLoaderData} from '@remix-run/react'
import {prisma} from '~/db.server'
import type {ActionArgs, UploadHandler} from '@remix-run/node'
import {
  unstable_composeUploadHandlers as composeUploadHandlers,
  unstable_createMemoryUploadHandler as createMemoryUploadHandler,
  unstable_parseMultipartFormData as parseMultipartFormData,
} from '@remix-run/node'

import {createNote} from '~/models/note.server'
import {getSession, requireUserId} from '~/session.server'
import {uploadImage} from '~/utils/util.server'

export async function action({request}) {
  // const uploadHandler: UploadHandler = composeUploadHandlers(
  //   async ({name, data}) => {
  //     if (name !== 'img') {
  //       return undefined
  //     }

  //     const uploadedImage = await uploadImage(data)
  //     return uploadedImage.secure_url
  //   },
  //   createMemoryUploadHandler(),
  // )

  // const formDataUpload = await parseMultipartFormData(request, uploadHandler)
  // const imgSrc = (formDataUpload.get('img') as string) || 'user'

  const formData = await request.formData()
  // const title = formData.get('title')
  const body = formData.get('body')
  const name = formData.get('name')
  const title = formData.get('title')
  const present = formData.get('present')

  const session = await getSession(request)

  if (typeof title !== 'string' || title.length === 0 || title.length > 8) {
    return json(
      {
        errors: {
          title: 'Parentesco es requerido o parentesco muy largo',
          body: null,
        },
      },
      {status: 400},
    )
  }

  if (typeof name !== 'string' || name.length === 0) {
    return json(
      {errors: {title: 'Nombre es requerido', body: null}},
      {status: 400},
    )
  }
  if (typeof body !== 'string' || body.length === 0) {
    return json(
      {errors: {title: 'Mensaje requerido', body: null}},
      {status: 400},
    )
  }
  const note = await prisma.note.create({
    data: {
      name,
      body,
      title,
      presentation: present,
    },
  })
  // if (imgSrc) {
  //   return json({imgSrc})
  // }
  return redirect(`/addPic?noteId=${note.id}`)
}

export default function NewMessage() {
  const actionData = useActionData<typeof action>()
  const data = useLoaderData()

  return (
    <div className="mt-10 flex flex-col items-center justify-center space-y-4 pb-10">
      <div className="w-full pl-20">
        <Link
          to="/msg"
          className="flex flex-row items-center text-xl text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            className="h-8 w-8"
          >
            <path d="M14.71 18.29a1 1 0 0 1-1.42 0l-6-6a1 1 0 0 1 0-1.41l6-6a1 1 0 0 1 1.42 1.41L9.41 12l5.3 5.29a1 1 0 0 1 0 1.42z" />
          </svg>
          <span>Atras</span>
        </Link>
      </div>
      <h1 className="flex h-20 w-20 items-center justify-center rounded-full bg-[#6383CF] text-white">
        Paso 1
      </h1>

      <Form method="post" className="flex w-72 flex-col space-y-3">
        <TextField
          label="Parentesco *"
          all="title"
          placerholder="primo, tio, amigo"
        />
        <TextField label="Nombre *" all="name" />
        {/* <TextField label="Foto" all="pic" /> */}

        <label
          htmlFor="body"
          className="pl-2 text-sm font-semibold uppercase text-[#97A4C1]"
        >
          Mensaje *
        </label>
        <textarea
          name="body"
          id="body"
          className="h-48 w-72 rounded-lg bg-formBg p-2 ring-4 ring-primary"
        />

        <label
          htmlFor="present"
          className="pl-2 text-sm font-semibold uppercase text-[#97A4C1]"
        >
          ¿Que le regalaras? 🎁
        </label>
        <textarea
          name="present"
          id="present"
          placeholder="Se revelara la informacion para Soum el 12 de abril."
          className="h-32 w-72 rounded-lg bg-formBg p-2 ring-4 ring-primary"
        />

        {/* <div className="flex  flex-col items-center justify-center space-y-3 rounded-xl border-4 border-primary p-4">
          <h1 className="uppercase text-[#97A4C1]">Opcional</h1>
          <a
            href="https://imgbb.com/upload"
            target="_blank"
            rel="noreferrer"
            className="flex h-14 w-72 items-center justify-center rounded-full bg-primary text-center text-white"
          >
            Subir foto tuya en imgbb
          </a>
          <TextField
            label="URL FOTO PERFIL"
            all="pic"
            placerholder="https://ibb.co/9gd2xXt"
          />
        </div> */}

        <button
          type="submit"
          className=" mt-5 h-14 w-72 rounded-full  bg-primary text-white "
        >
          Enviar 🥳
        </button>
        {actionData?.errors?.title && (
          <div className="pt-1 text-red-700" id="title-error">
            {actionData.errors.title}
          </div>
        )}
      </Form>
    </div>
  )
}

export function TextField({
  label,
  all,
  placerholder,
}: {
  label: string
  all: string
  placerholder?: string
}) {
  return (
    <div className="flex flex-col space-y-2">
      <label
        htmlFor={all}
        className="pl-2 text-sm font-semibold uppercase text-[#97A4C1]"
      >
        {label}
      </label>
      <input
        type="text"
        name={all}
        id={all}
        placeholder={placerholder}
        className="h-10 w-72 rounded-full bg-[#97A4C1] p-2 placeholder-primary ring-4 ring-primary placeholder:p-2"
      />
    </div>
  )
}
