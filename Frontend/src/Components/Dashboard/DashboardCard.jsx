import React from 'react'
import './DashboardCard.css'

const DashboardCard = ({icon,text,number}) => {
  return (
    <div className='manager-card'>
      <div className='manager-card-icon'>
        {icon}
      </div>
      <div className='manager-card-items'>
        <p>{text}</p>
        <p>{number}</p>
      </div>
    </div>
  )
}

export default DashboardCard

