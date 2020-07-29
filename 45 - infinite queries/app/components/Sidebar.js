import React from 'react'
import Link from 'next/link'

import { SidebarStyles } from './styled'

export default function Sidebar() {
  return (
    <SidebarStyles>
      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
      </ul>
    </SidebarStyles>
  )
}
