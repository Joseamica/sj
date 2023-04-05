import {Link, NavLink} from '@remix-run/react'
import React from 'react'

export function Header({user}) {
  return (
    <div className="sticky inset-0  flex h-20 w-full items-center justify-center bg-[#1A2236] px-2 text-white">
      <img
        src="https://firebasestorage.googleapis.com/v0/b/sjweb-d2b63.appspot.com/o/sj%20copy.png?alt=media&token=608800c3-f2e7-4465-8c91-eac70743b82f"
        alt="logo"
        className="mr-10 h-10 w-10"
      />
      <div className="flex w-full  flex-row items-center justify-between">
        {/* <LinkNav to="/" label="Paracaima" /> */}
        <LinkNav to="/msg" label="Mensajes" />
        {user ? (
          <>
            <LinkNav to="/pics" label="Fotos" />
            <LinkNav to="/videos" label="Videos" />
            <LinkNav to="/us" label="♥️" />
          </>
        ) : null}
      </div>
    </div>
  )
}

function LinkNav({to, label}) {
  return (
    <NavLink preventScrollReset to={to} className="p-2 text-white">
      {label}
    </NavLink>
  )
}
