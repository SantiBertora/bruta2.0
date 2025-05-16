import React from 'react'

const AdminContent = ({ user }) => {
  return (
    <div>
      <h1>Bienvenido, {user.email}</h1>
      </div>
  )
}

export default AdminContent