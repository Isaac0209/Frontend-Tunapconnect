import * as React from 'react'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'

// import AccessTimeFilledOutlinedIcon from '@mui/icons-material/AccessTimeFilledOutlined'
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/router'

import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import Link from 'next/link'
import { useContext, useEffect, useMemo, useState } from 'react'
import { ListItemButton } from './styles'
import { CompanyContext } from '@/contexts/CompanyContext'

type memuListProps = Array<{
  path: string
  href: string
  component: React.ReactNode
  title: string
}>

// const memuList: memuListProps = [
//   {
//     path: '/company',
//     href: '/company',
//     component: <AccountBalanceIcon />,
//     title: 'Empresas',
//   },
//   {
//     path: '/service-schedule',
//     href: '/service-schedule?company=:companyId',
//     component: <CalendarMonthIcon />,
//     title: 'Agendamento',
//   },
//   {
//     path: '/checklist',
//     href: '/checklist',
//     component: <AccessTimeFilledOutlinedIcon />,
//     title: 'Checklist',
//   },
// ]

export const MainListItems = ({ opended }: { opended: boolean }) => {
  const [routeActual, setRouteActual] = useState('')
  const router = useRouter()
  const { companySelected } = useContext(CompanyContext)
  // console.log('aberto',opended)
  const memuList: memuListProps = useMemo(
    () => [
      {
        path: '/company',
        href: '/company',
        component: <AccountBalanceIcon />,
        title: 'Empresas',
      },
      {
        path: '/service-schedule',
        href: `/service-schedule?company_id=${companySelected}`,
        component: <CalendarMonthIcon />,
        title: 'Agendamento',
      },
      // {
      //   path: '/checklist',
      //   href: '/checklist',
      //   component: <AccessTimeFilledOutlinedIcon />,
      //   title: 'Checklist',
      // },
      {
        path: '/budget',
        href: `/budget?company_id=${companySelected}`,
        component: <AttachMoneyIcon />,
        title: 'Orçamentos',
      },
    ],
    [companySelected],
  )

  const menuListCompanyId = useMemo(
    () =>
      memuList.map((item) => {
        return item.path === '/company'
          ? item
          : {
              ...item,
              href: `${item.href}`,
            }
      }),
    [companySelected],
  )

  useEffect(() => {
    setRouteActual(router.pathname)
  }, [router])

  return (
    <React.Fragment>
      {menuListCompanyId.map((menu, index) => {
        return (
          <Link href={menu.href} key={index} style={{ textDecoration: 'none' }}>
            <ListItemButton
              selected={routeActual.includes(menu.path)}
              sx={{
                ...(opended && { margin: '10px 20px' }),
              }}
            >
              <ListItemIcon>{menu.component}</ListItemIcon>
              <ListItemText primary={menu.title} style={{ color: 'white' }} />
            </ListItemButton>
          </Link>
        )
      })}
    </React.Fragment>
  )
}

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset></ListSubheader>
    <ListItemButton onClick={() => signOut({ callbackUrl: '/' })}>
      <ListItemIcon>
        <ExitToAppOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Sair" />
    </ListItemButton>
  </React.Fragment>
)
