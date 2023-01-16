import React from 'react'
import { useAuthStore } from '../../hooks/useAuthStore'

export const Navbar = () => {

  const { startLogout, user } = useAuthStore();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">

        <a className="navbar-brand" href="#">
          <i className="fa-solid fa-calendar-days me-3"></i>
          {user.name}
        </a>
        
        <button className="btn btn-outline-danger" type="submit" onClick={startLogout}>
          <i className="fa-solid fa-right-from-bracket me-2"></i>
          Salir
        </button>
      </div>
    </nav>
  )
}
