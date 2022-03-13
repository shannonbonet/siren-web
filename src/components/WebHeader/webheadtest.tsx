import React from 'react'
import styled, {css} from 'styled-components'
import {Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink} from ';
import Link from 'next/link'

const WebHeader = () => {
  return (
    <div class="webHead">
      <div>
        <Link href={''}>
          <a>Intake Dashboard</a>
        </Link>
      </div>
      <div>
        <Link href={''}>
          <a>Intake Form</a>
        </Link>
      </div>
      <div>
        <Link href={''}>
        <a href="">Calendly</a>
        </Link>
      </div>

    </div>
  )
}

export default WebHeader