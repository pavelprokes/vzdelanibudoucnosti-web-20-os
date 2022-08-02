import React from "react"
import { Menu } from "antd"
import { useRouter } from "next/router"
import Link from "next/link"
import styled from "@emotion/styled"
import { sm } from "../../styles/mediaQuery"
import { HeaderMenuItem, menuItems } from "../../lib/menu/menuItems"
import { css } from "@emotion/react"
import { FacebookFilled, GoogleOutlined, YoutubeOutlined } from "@ant-design/icons"

const fontColor = "#fff"

export const HeaderMenu = ({ menuItems: propsMenuItems }: Props) => {
  const { route, push } = useRouter()
  const getFirstRoute = (route: string) => route.split("/")[1] || undefined
  const defaultSelectedKeys = getFirstRoute(route)

  return (
    <MenuWrapper>
      <LogoWrapper>
        <Link href={"/"}>
          <a title="Domů">
            <Logo />
          </a>
        </Link>
      </LogoWrapper>

      <RightSideMenuWrapper>
        <Menu theme="dark" mode="horizontal" selectedKeys={defaultSelectedKeys && [defaultSelectedKeys]}>
          {(propsMenuItems || menuItems).map(({ href, title, label, onClick, subMenu, slug }) =>
            subMenu?.length > 0 ? (
              <Menu.SubMenu key={`subMenu${title}`} title={title} onTitleClick={() => push(href)}>
                {subMenu.map((sItem) => (
                  <Menu.Item key={`subMenuItem-${sItem.slug}`}>
                    {sItem.href ? (
                      <Link href={sItem.href} passHref>
                        <A title={sItem.title} fontColor={fontColor}>
                          {sItem.label ?? sItem.title}
                        </A>
                      </Link>
                    ) : (
                      <div
                        title={sItem.title}
                        onClick={() => sItem.onClick()}
                        css={css`
                          color: ${fontColor};
                        `}>
                        {sItem.label ?? sItem.title}
                      </div>
                    )}
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            ) : (
              <Menu.Item key={slug}>
                {href ? (
                  <Link href={href} passHref>
                    <A title={title} fontColor={fontColor}>
                      {label ?? title}
                    </A>
                  </Link>
                ) : (
                  <div
                    title={title}
                    onClick={() => onClick()}
                    css={css`
                      color: ${fontColor};
                    `}>
                    {label ?? title}
                  </div>
                )}
              </Menu.Item>
            )
          )}

          <Menu.Item key="Youtube Nerdi budoucnosti">
            <Link href="https://www.youtube.com/channel/UCo_bRS8x2_oYv78lEj52lUw">
              <a title="Youtube Nerdi budoucnosti" target="_blank" rel="noopener noreferrer">
                <YoutubeOutlined style={{ fontSize: 26 }} />
              </a>
            </Link>
          </Menu.Item>

          <Menu.Item key="Google business">
            <Link href="https://g.page/r/CfOxvTup-d7hEAE">
              <a title="Google business" target="_blank" rel="noopener noreferrer">
                <GoogleOutlined style={{ fontSize: 26 }} />
              </a>
            </Link>
          </Menu.Item>

          <Menu.Item key="Facebook">
            <Link href="https://www.facebook.com/vzdelanibudoucnosti">
              <a title="Facebook" target="_blank" rel="noopener noreferrer">
                <FacebookFilled style={{ fontSize: 26 }} />
              </a>
            </Link>
          </Menu.Item>
        </Menu>
      </RightSideMenuWrapper>
    </MenuWrapper>
  )
}

interface Props {
  menuItems?: HeaderMenuItem[]
}

const MenuWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  align-items: stretch;
`

const LogoWrapper = styled.div`
  width: 250px;
  flex: 0 250px;

  ${sm} {
    width: 125px;
    flex: 0 125px;
  }
`

const Logo = styled.div`
  background-image: url("/images/vzdelanibudoucnosti_2.svg");
  background-position: center center;
  background-repeat: no-repeat;
  height: 80px;
  width: 250px;
  display: block;

  ${sm} {
    width: 125px;
    height: 35px;
  }
`

const RightSideMenuWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  text-align-last: right;

  > ul {
    justify-content: flex-end;
  }

  .ant-menu-dark.ant-menu-horizontal > .ant-menu-submenu {
    padding: 0;
  }

  .ant-menu-item-selected {
    a {
      position: relative;

      &:after {
        content: "";
        width: 100%;
        height: 2px;
        background-color: white;
        display: block;
        position: absolute;
        bottom: 20px;
        border-radius: 2px;
      }
    }
  }

  > ul {
    width: 100%;
  }

  ${sm} {
    width: 28px;
    flex: 0 28px;
  }

  .anticon.anticon-ellipsis {
    font-size: 30px;
    text-align: center;
    color: white;

    svg {
      width: 40px;
      height: 40px;
    }
  }
`

const A = styled.a<{ fontColor: string }>`
  display: block;
  color: ${(props: { fontColor: string }) => props.fontColor};
`
