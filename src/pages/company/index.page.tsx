import * as React from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'

import { useContext } from 'react'
import { Skeleton, Typography } from '@mui/material'
import Title from '@/components/Title'
import { ContainerItem } from './styles'

import { getSession } from 'next-auth/react'
import { useQuery } from 'react-query'
import { CompanyContext } from '@/contexts/CompanyContext'

interface companyProps {
  id: number
  name: string
  cnpj: string
  cpf: string
  active?: boolean
}
export default function CompanyList() {
  const { handleCompanySelected } = useContext(CompanyContext)

  function handleSelectCompany(newCompany: companyProps) {
    handleCompanySelected(newCompany)
  }

  const { data, isSuccess, isLoading } = useQuery<companyProps[] | []>(
    ['company-page-list-company'],
    () => getSession().then((resp) => resp?.user.companies as companyProps[]),
    {
      refetchOnWindowFocus: false,
      retry: false,
    }
  )

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {isLoading && (
            <>
              <Grid item xs={12} md={4} lg={4}>
                <Skeleton
                  sx={{ borderRadius: 1 }}
                  variant="rectangular"
                  height={180}
                />
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <Skeleton
                  sx={{ borderRadius: 1 }}
                  variant="rectangular"
                  height={180}
                />
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <Skeleton
                  sx={{ borderRadius: 1 }}
                  variant="rectangular"
                  height={180}
                />
              </Grid>
            </>
          )}
          {isSuccess &&
            data?.map((item, index) => {
              return (
                <Grid
                  item
                  xs={12}
                  md={4}
                  lg={4}
                  key={`${item.id}-${index}`}
                  onClick={() => handleSelectCompany(item)}
                >
                  <ContainerItem
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 180,
                    }}
                  >
                    <Title>{item.name || 'Não informado'}</Title>
                    <Typography>{item.cnpj || item.cpf}</Typography>
                  </ContainerItem>
                </Grid>
              )
            })}
        </Grid>
      </Container>
    </>
  )
}

CompanyList.auth = true
