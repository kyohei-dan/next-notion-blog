import Image from 'next/image';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL, NEXT_PUBLIC_SITE_TITLE, NEXT_PUBLIC_SITE_DESCRIPTION } from './server-constants';
import GoogleAnalytics from '../components/google-analytics';
import Header from "../components/header";
import ProjectPreview from "../components/ProjectPreview";

export async function generateMetadata(): Promise<Metadata> {
  const title = NEXT_PUBLIC_SITE_TITLE;
  const description = NEXT_PUBLIC_SITE_DESCRIPTION;
  const url = NEXT_PUBLIC_URL ? new URL(NEXT_PUBLIC_URL) : undefined;
  const images = NEXT_PUBLIC_URL ? [{ url: new URL('/default.png', NEXT_PUBLIC_URL) }] : [];

  const metadata: Metadata = {
    openGraph: {
      title: title,
      description: description,
      url: url,
      siteName: title,
      type: 'article',
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

  return metadata;
}

const Home = () => (
  <>
    <GoogleAnalytics pageTitle={NEXT_PUBLIC_SITE_TITLE} />
    <div className="site-wrapper top">
      <Header />
      <main>
        <section className="lead">
          <ul>
            <li>
              <h1>Hello, I&apos;m a Front-end Developer with 6 years of experience.</h1>
              <p>Please take your time to check out what I have created and posted.</p>
              <div className="contact">
                <a href="/blog">Blog</a>
                <a href="https://github.com/kyohei-dan" target="_blank">
                  <Image src="/images/github.svg" alt="Github" width={32} height={32}/>
                </a>
              </div>
            </li>
            <li>
              <figure>
                <Image src="/images/profile.png" alt="logo" width={1000} height={1000}/>
              </figure>
            </li>
          </ul>
        </section>

        <section className="list">
          <ul>
            <ProjectPreview
              name="NPM PACKAGE"
              description="webp converter"
              imageUrl="/images/npm-logo-black.svg"
              bgColor="#685cdd"
              url="https://www.npmjs.com/package/@kyohei-dan/webp-converter-package"
              dark
              />
            <ProjectPreview
              name="GOOGLE CHROME EXTENTION"
              description="Overflow Elements Check"
              imageUrl="/images/accessibility-check.svg"
              bgColor="#313442"
              url="https://chrome.google.com/webstore/detail/overflow-elements-check/nhpepiaeojjlngfmmpfnfijlppdneelc"
              dark
            />
            <ProjectPreview
              name="CHATGPT-CLONE WORDPRESS-POST"
              description="system using CHATGPT and WordPress."
              imageUrl="/images/chatgpt-clone.png"
              url="https://big-d.dev/gpt/"
              />
            <ProjectPreview
              name="WORDPRESS"
              description="WordPress Accessibility Template Site"
              imageUrl="/images/wordpress-template-site.png"
              url="https://big-d.dev/"
              bgColor="#4e4e56"
              dark
              />
            <ProjectPreview
              name="VARIABLE-TEXT-IMAGE-GENERATOR"
              description="create og image"
              imageUrl="/images/satori.png"
              url="https://og-image-generator-mu.vercel.app/og-image-generator/example1"
              bgColor="#171717"
              dark
              />
            <ProjectPreview
              name="TOOL APP"
              description="develop support tool"
              imageUrl="/images/tool-app.png"
              url="https://tool-app.vercel.app/"
            />
            <ProjectPreview
              name="TODO APP"
              description="using React"
              imageUrl="/images/todo-app.png"
              url="https://portfolio-todo-app.vercel.app/"
            />
          </ul>
        </section>
      </main>
    </div>
  </>
)

export default Home

