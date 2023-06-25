import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { NEXT_PUBLIC_URL, NEXT_PUBLIC_SITE_TITLE } from '../../server-constants';
import GoogleAnalytics from '../../../components/google-analytics';
import {
  BlogPostLink,
  BlogTagLink,
  PostBody,
  PostDate,
  PostTags,
  PostTitle,
} from '../../../components/blog-parts';
import { getBlogLink } from '../../../lib/blog-helpers';
import {
  getAllPosts,
  getPostBySlug,
  getPostsByTag,
  getAllTags,
  getAllBlocksByBlockId,
} from '../../../lib/notion/client'
import Header from "../../../components/header";


export const revalidate = 30

export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  const title = `${post?.Title} - ${NEXT_PUBLIC_SITE_TITLE}`
  const description = post?.Excerpt
  const url = NEXT_PUBLIC_URL ? new URL(getBlogLink(post?.Slug || ''), NEXT_PUBLIC_URL) : undefined
  const images = NEXT_PUBLIC_URL ? [{ url: new URL(`/api/og-image?slug=${post?.Slug}`, NEXT_PUBLIC_URL) }] : []

  const metadata: Metadata = {
    title: title,
    description: description,
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
  return metadata
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map(p => ({ slug: p.Slug }));
}

const BlogSinglePage = async ({ params: { slug } }) => {
  const post = await getPostBySlug(slug);

  if (!post) { redirect('/blog') }

  const [blocks, tags, sameTagPosts] = await Promise.all([
    getAllBlocksByBlockId(post.PageId),
    getAllTags(),
    getPostsByTag(post.Tags[0]?.name, 6)
  ]);

  const otherPostsHavingSameTag = sameTagPosts.filter((p) => p.Slug !== post.Slug)

  return (
    <>
      <GoogleAnalytics pageTitle={post.Title} />
      <div className="site-wrapper blog-single">
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
              <PostTags post={post} />
              <PostTitle post={post} enableLink={false} />
              <PostDate post={post} />
              <PostBody blocks={blocks} />
            </div>
          </section>

          {/* <section className="post-category">
            <BlogPostLink heading="Posts in the same category" posts={otherPostsHavingSameTag}/>
          </section>

          <section className="all-category">
            <BlogTagLink heading="Categories" tags={tags} />
          </section> */}
        </main>
      </div>
    </>
  )
}

export default BlogSinglePage
