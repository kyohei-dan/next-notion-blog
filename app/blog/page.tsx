import type { Metadata } from 'next'
import Link from 'next/link'
import { NEXT_PUBLIC_URL, NEXT_PUBLIC_SITE_TITLE, NEXT_PUBLIC_SITE_DESCRIPTION, NUMBER_OF_POSTS_PER_PAGE } from '../../app/server-constants'
import GoogleAnalytics from '../../components/google-analytics'
import { NextPageLink } from '../../components/blog-parts'
import { getPosts, getFirstPost } from '../../lib/notion/client'
import Header from "../../components/header";
import { getBlogLink, getDateStr } from '../../lib/blog-helpers'

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

const BlogPage = async () => {
  const [posts, firstPost] = await Promise.all([
    getPosts(NUMBER_OF_POSTS_PER_PAGE),
    getFirstPost(),
  ])

  return (
    <>
      <GoogleAnalytics pageTitle="Blog" />
      <div className="site-wrapper blog">
        <Header />
        <main>
          <header className="lower-header">
            <div className="inner">
              <h1>Blog</h1>
              <p className="lead">Here is a list of our technical articles. We use Notion for content management.</p>
            </div>
          </header>

          <section className="post">
            <div className="inner">
              <ul className="post-list">
              {posts.map(post => {
                return (
                  <li key={post.Slug}>
                    <Link href={getBlogLink(post.Slug)}>
                      <time>{post.Date ? getDateStr(post.Date) : ''}</time>
                      <h3>{post.Title}</h3>
                    </Link>
                  </li>
                )
              })}
              </ul>
            </div>
          </section>
        </main>
        <footer>
          <NextPageLink firstPost={firstPost} posts={posts} />
        </footer>
      </div>
    </>
  )
}

export default BlogPage
