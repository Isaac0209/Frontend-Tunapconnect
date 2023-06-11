import Script from 'next/script'

export default function Custom404() {
  return (
    <>
      <Script id={'Custom404'}>{`document.location.href="/company"`}</Script>
    </>
  )
}
