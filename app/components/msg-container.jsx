import React, {useState} from 'react'
import {motion} from 'framer-motion'
import {UserCircleIcon, XIcon} from '@heroicons/react/solid'
import {Form, Link} from '@remix-run/react'

export function MsgContainer({
  id,
  title,
  body,
  created,
  profilePicture,
  name,
  presentation,
  userId,
}) {
  const date = new Date()
  const day = date.getDate()
  const month = date.getMonth() + 1

  const [open, setOpen] = useState(false)

  return (
    // <motion.div
    //   className="  m-2 flex w-72 flex-row rounded-xl bg-primary text-white shadow-lg"
    //   initial={{opacity: 0}}
    //   animate={{opacity: 1}}
    // >

    //   <div className="flex w-24 flex-col items-center justify-between space-y-2 p-2 ">
    //     {profilePicture ? (
    //       <img
    //         className="h-14 w-14 rounded-full object-contain" //object-cover
    //         src={profilePicture}
    //         alt="profile"
    //       />
    //     ) : (
    //       // <BeakerIcon class="h-6 w-6 text-blue-500" />
    //       <UserCircleIcon className="h-14 w-14 text-blue-500" />
    //     )}

    //     <div className="flex w-full flex-col items-center">
    //       <p className=" text-ellipsis text-xs">{title}</p>

    //       <p className="text-lg">{name}</p>
    //     </div>
    //   </div>
    //   <div className="flex  w-3/4 flex-col  p-2">
    //     <p className="h-20">{body}</p>
    //     {/* <p className="text-xs ">{created}</p> */}
    //   </div>
    //   <div className="flex flex-col items-center justify-center p-2">
    //     {day === 12 && month === 4
    //       ? presentation && {presentation}
    //       : presentation && '🤫🎁'}
    //   </div>
    // </motion.div>

    <div className="m-2 flex w-72 flex-col justify-between space-y-4 rounded-xl bg-primary p-2 text-white shadow-lg">
      <div className="relative flex flex-col items-center justify-center">
        {userId && (
          <Form method="post" action={`/delete/${id}`}>
            <button
              type="submit"
              className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#1A2236]"
            >
              <XIcon className="h-4 w-4 text-white" />
            </button>
          </Form>
        )}

        {profilePicture ? (
          <img
            className="h-14 w-14 rounded-full object-contain" //object-cover
            src={profilePicture}
            alt="profile"
          />
        ) : (
          //       // <BeakerIcon class="h-6 w-6 text-blue-500" />
          <UserCircleIcon className="h-14 w-14 text-blue-500" />
        )}
        <p className="text-xs">{title}</p>
        <p className="font-medium text-[#fafafa]">{name}</p>
      </div>
      <div className=" text-center ">
        {body.length > 150 ? (
          <div>
            <p>
              {open ? body : body.slice(0, 150)}
              ...
            </p>
            <button
              onClick={() => setOpen(!open)}
              className="ring-principal mt-4 rounded-full p-2 text-sm ring-2"
            >
              {open ? 'Mostrar Menos' : 'Mostrar Mas'}
            </button>
          </div>
        ) : (
          <div>{body}</div>
        )}
      </div>
      {presentation && <hr />}

      <div className="flex flex-col items-center justify-center space-y-2">
        {day >= 12 && month === 4
          ? presentation && <p>{presentation}</p>
          : presentation && (
              <div className="space-y-2 text-center">
                <p className="text-sm text-formBg">
                  {name} te regalara algo 🎁!
                </p>
                <p className="text-sm text-formBg">
                  Abrir regalo el 12 de abril 🥳🎉🎊
                </p>
              </div>
            )}
      </div>
    </div>
  )
}
