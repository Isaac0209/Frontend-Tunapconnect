import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'
import LinkMaterial from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import Link from 'next/link'
import { HeaderBreadcrumbProps } from './types'
import Title from '../Title'

// function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
//   event.preventDefault()
// }

export default function HeaderBreadcrumb({
  data,
  title,
}: HeaderBreadcrumbProps) {
  return (
    <>
      {title && (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Title>{title}</Title>
          {/* <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            {data &&
              data.map((item, index) => {
                if (index === data.length - 1) {
                  return (
                    <Typography key={item.label + index} color="text.primary">
                      {item.label}
                    </Typography>
                  )
                }
                return (
                  <LinkMaterial
                    component={Link}
                    underline="hover"
                    key={item.label + index}
                    color="inherit"
                    href={item.href}
                  >
                    {item.label}
                  </LinkMaterial>
                )
              })}
          </Breadcrumbs> */}
        </Stack>
      )}
      {title === undefined && (
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          {data &&
            data.map((item, index) => {
              if (index === data.length - 1) {
                return (
                  <Typography key={item.label + index} color="text.primary">
                    {item.label}
                  </Typography>
                )
              }
              return (
                <LinkMaterial
                  component={Link}
                  underline="hover"
                  key={item.label + index}
                  color="inherit"
                  href={item.href}
                >
                  {item.label}
                </LinkMaterial>
              )
            })}
        </Breadcrumbs>
      )}
    </>
  )
}
