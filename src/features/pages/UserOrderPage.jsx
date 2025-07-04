import React from 'react'
import NavBar from '../navbar/NavBar'
import UserOrder from '../user/component/UserOrder'

const UserOrderPage = () => {
  return (
    <div>
        <NavBar>
      <UserOrder />
    </NavBar>
    </div>
  )
}

export default UserOrderPage