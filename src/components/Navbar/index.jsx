import React from 'react'
import style from "./Navbar.module.scss"
export default function index({setTab,tab}) {
  return (
    <div className={style.navBar}>
      <button className={tab=="Dev"?style.activeTab:""}  onClick={()=>{setTab("Dev")}}>Development Server</button>
      <button className={tab=="Prod"?style.activeTab:""} onClick={()=>{setTab("Prod")}}>Production Sever</button>
    </div>
  )
}
