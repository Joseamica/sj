import {Link} from '@remix-run/react'
import React from 'react'

export function ButtonNew({to, label}) {
  return (
    <Link
      to={to}
      className="flex h-14 w-40 shrink-0 items-center justify-center rounded-full bg-primary p-4 text-xl text-white shadow-lg"
    >
      <span className="text-base"> {label}</span>
    </Link>
  )
}
