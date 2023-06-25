import type { Metadata } from 'next'
import { NEXT_PUBLIC_URL, NEXT_PUBLIC_SITE_TITLE, NEXT_PUBLIC_SITE_DESCRIPTION } from '../../app/server-constants'
import GoogleAnalytics from '../../components/google-analytics'
import Header from "../../components/header";

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const title = `Blog - ${NEXT_PUBLIC_SITE_TITLE}`
  const description = NEXT_PUBLIC_SITE_DESCRIPTION
  const url = NEXT_PUBLIC_URL ? new URL('/blog', NEXT_PUBLIC_URL) : undefined
  const images = NEXT_PUBLIC_URL ? [{ url: new URL('/default.png', NEXT_PUBLIC_URL) }] : []

  const metadata: Metadata = {
    title: title,
    openGraph: {
      title: title,
      description: description,
      url: url,
      siteName: title,
      type: 'website',
      images: images,
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: images,
    },
    alternates: {
      canonical: url,
    },
  }

  return metadata
}

const AboutPage = async () => {

  return (
    <>
      <GoogleAnalytics pageTitle="About" />
      <div className="site-wrapper blog">
        <Header />
        <main>
          <header className="lower-header">
            <div className="inner">
              <h1>About</h1>
              <p className="lead">Here is a list of our technical articles. We use Notion for content management.</p>
            </div>
          </header>
          <section>
          </section>
        </main>
        <footer>
        </footer>
      </div>
    </>
  )
}

export default AboutPage
