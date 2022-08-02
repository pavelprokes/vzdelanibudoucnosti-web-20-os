import React from "react"
import styled from "@emotion/styled"
import { theme } from "../../styles/styles"
import { LayoutAvatar } from "../../components/Layout/Avatar"
import { signOut, useSession } from "next-auth/react"
import { css } from "@emotion/react"

const AuthFlag = () => {
  const { data: session } = useSession()
  if (!session) {
    return null
  }

  return (
    <LayoutAvatar
      onClick={() => signOut()}
      email={session?.user?.email}
      image={session?.user?.image}
      css={css`
        margin-right: 8px;
      `}
    />
  )
}

export const Beta = styled.div`
  top: 50%;
  left: 0;
  margin-left: -2px;
  margin-top: 7px;
  position: absolute;
  font-size: 10px;
  color: white;
  background-color: ${theme.colors["primary-color"]};
  line-height: 1;
  padding: 2px;
  transform: rotate(20deg);
  z-index: 9;
`

export interface HeaderMenuItem {
  slug: string
  title: string
  label?: React.ReactNode
  href?: string
  onClick?: () => void
  subMenu?: HeaderMenuItem[]
}

export const menuItems: HeaderMenuItem[] = [
  {
    href: "/krouzky-pro-deti",
    title: "Kroužky pro děti",
    slug: "krouzky-pro-deti"
  },
  /*{
    href: "/kurzy-pro-dospele",
    title: "Kurzy pro dospělé",
    slug: "kurzy-pro-dospele"
  },*/
  {
    href: "/projektove-dny",
    title: "Projektové dny",
    slug: "projektove-dny"
  },
  {
    href: "/recenze",
    title: "Recenze",
    slug: "recenze"
  },
  {
    href: "/organizace",
    title: "Organizace",
    slug: "organizace",
    subMenu: [
      {
        href: "/poradali-jsme",
        title: "Pořádali jsme",
        slug: "poradali-jsme"
      }
    ]
  },
  {
    href: "/blog",
    title: "Blog",
    slug: "blog"
  },
  {
    href: "/kontakt",
    title: "Kontakt",
    slug: "kontakt"
  }
]
