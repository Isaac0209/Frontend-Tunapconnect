import * as React from 'react'
// import { useForm, SubmitHandler } from 'react-hook-form'
import { useEffect, useState } from 'react'
import Container from '@mui/material/Container'

import { ApiCore } from '@/lib/api'
import Title from '@/components/Title'
import { useRouter } from 'next/router'
import CircularProgress from '@mui/material/CircularProgress'
import { Box, Grid, Typography } from '@mui/material'
import tunapLogoImg from '@/assets/images/tunap-login.svg'
import Image from 'next/image'
const api = new ApiCore()

export default function BudgetView() {
  const router = useRouter()
  const [budgetInfo, setBudgetInfo] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    api
      .get(
        'https://tunapconnect-api.herokuapp.com/api/quotations/show/' +
          router.query.id,
      )
      .then((response) => {
        setBudgetInfo(response.data.data)
        console.log(budgetInfo)
        setLoading(false)
      })
  })
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Title>Orçamento</Title>

      <Container style={{ backgroundColor: 'white', overflowX: 'auto' }}>
        {loading ? (
          <CircularProgress></CircularProgress>
        ) : (
          <>
            <Box paddingTop={'30px'} display={'flex'} justifyContent={'center'}>
              <Image
                src={tunapLogoImg}
                height={60}
                alt="Tunap connect"
                style={{ marginRight: '10px' }}
              />
            </Box>
            <Container
              style={{ minHeight: '100vh' }}
              maxWidth="lg"
              sx={{ ml: 6, mt: 4, mb: 4, mr: 6 }}
            >
              <Grid display={'flex'} columnGap={'20px'}>
                <Box
                  width={'400px'}
                  minHeight={'200px'}
                  border={'1px solid black'}
                  borderRadius={'19px'}
                  sx={{ pl: 2, pt: 1, pb: 1, pr: 2 }}
                >
                  <Typography variant="body1">
                    Nome da Concessionária
                  </Typography>
                  <Typography variant="body1">CAMARGO - SOROCABA</Typography>
                  <Typography variant="body1">AV. DOM AGUIRE</Typography>
                  <Grid display={'flex'} justifyContent={'space-between'}>
                    <Typography variant="body1">CEP: 18090-002</Typography>
                    <Typography variant="body1">
                      SOROCABA - São Paulo - SP
                    </Typography>
                  </Grid>
                  <Grid display={'flex'} justifyContent={'space-between'}>
                    <Typography variant="body1">Tel: 153331-5556</Typography>
                    <Typography variant="body1">FAX: 153331-5556</Typography>
                  </Grid>
                  <Grid display={'flex'} justifyContent={'space-between'}>
                    <Typography variant="body1">
                      CNPJ: 02-521-849/0001-36
                    </Typography>
                    <Typography variant="body1">
                      INSCR. ESTAD: 153331-5556
                    </Typography>
                  </Grid>
                  <Typography variant="body1">CCM: 106671</Typography>
                </Box>
                <Box
                  width={'400px'}
                  minHeight={'200px'}
                  border={'1px solid black'}
                  borderRadius={'19px'}
                  sx={{ pl: 2, pt: 1, pb: 1, pr: 2 }}
                >
                  <Typography
                    variant="h6"
                    fontWeight={'900'}
                    textAlign={'center'}
                  >
                    ORDEM DE SERVIÇO
                  </Typography>
                  <Typography
                    variant="h6"
                    fontWeight={'900'}
                    textAlign={'center'}
                  >
                    N° 192371
                  </Typography>
                  <Typography variant="body1" textAlign={'center'}>
                    IP-Interna Peças
                  </Typography>
                  <Typography variant="body1">Condição Pagamento</Typography>
                  <Grid display={'flex'} justifyContent={'space-between'}>
                    <Typography variant="body1">
                      Data Emissão: 18/03/2019 11:29
                    </Typography>
                    <Typography variant="body1">Validade: Dias</Typography>
                  </Grid>
                  <Typography variant="body1">
                    Orçamento Prévio a ser Emitido em:
                  </Typography>
                </Box>
              </Grid>
            </Container>
          </>
        )}
      </Container>
    </Container>
  )
}

BudgetView.auth = true
