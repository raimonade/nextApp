import React from 'react'
import s from './AppWrapper.module.scss'
const AppWrapper = ({children}) => {
  return (
    <div className={s.Wrapper}>
      {children}
    </div>
  )
}

export default AppWrapper
