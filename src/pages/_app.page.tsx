import * as React from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'
import createEmotionCache from '@/styles/config/createEmotionCache'
import theme from '@/styles/config/theme'
import { AuthProvider } from '@/contexts/AuthContext'
import { ReactNode } from 'react'
import Router from 'next/router'
import Layout from '@/Layout'
import { SessionProvider, useSession } from 'next-auth/react'
import { NextComponentType } from 'next/types'
import { Box, CircularProgress, GlobalStyles } from '@mui/material'
import { globals } from '@/styles/globals'
import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClient, QueryClientProvider } from 'react-query'
import { CompanyProvider } from '@/contexts/CompanyContext'
import { ServiceScheduleProvider } from '@/contexts/ServiceScheduleContext'

const clientSideEmotionCache = createEmotionCache()

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

type CustomAppProps = MyAppProps & {
  Component: NextComponentType & { auth?: boolean } // add auth type
}

const MyApp = (props: CustomAppProps) => {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps: { session, ...pageProps },
  } = props

  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles styles={globals} />
        <SessionProvider session={session} refetchInterval={60 * 5}>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <CompanyProvider>
                <ServiceScheduleProvider>
                  {Component.auth ? (
                    // @ts-ignore
                    <Auth>
                      <Layout>
                        <Component {...props.pageProps} />
                      </Layout>
                    </Auth>
                  ) : (
                    <Component {...pageProps} />
                  )}

                  {/* <Component {...pageProps} /> */}
                  <ReactQueryDevtools initialIsOpen={false} />
                </ServiceScheduleProvider>
              </CompanyProvider>
            </AuthProvider>
          </QueryClientProvider>
        </SessionProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default MyApp

function Auth({ children }: { children: ReactNode }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      Router.replace('/auth/login')
    },
  })

  if (status === 'loading') {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100vw',
          height: '100vh',
        }}
      >
        <CircularProgress size={150} />
      </Box>
    )
  }

  return children
}
