import React from 'react'
import laonChr from '../landing/img/laon_404.png'
import './styles/NotFound.css'

function NotFound() {
  return (
    <div className='notFound-container font'>
      <div className='notFound-content'>
        <img src={laonChr}/>
        <div className='notFound-text font'>
          <p>요청하신 페이지를</p>
          <p>찾을 수 없습니다</p>
        </div>
      </div>
      <div className='notFound-content'>
        <span className='notFound-title'>devloped by LA:ON</span>
      </div>
    </div>
  )
}

export default NotFound;