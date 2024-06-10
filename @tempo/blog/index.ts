import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { globSync } from 'glob';
import matter from 'gray-matter';
import type { BlogPost } from './types';

export type { BlogPost } from './types';

export { serialize } from 'next-mdx-remote/serialize';
export type { MDXRemoteSerializeResult } from 'next-mdx-remote';
export { MDXRemote } from 'next-mdx-remote';

const getPostsDir = () => `${process.cwd()}/posts`;

export const getAllPostSlugs = async () => {
  const postsDir = getPostsDir();
  if (!existsSync(postsDir)) return [];
  const globPattern = `${getPostsDir()}/**/*.mdx`;
  return globSync(globPattern).map((filename) => {
    return filename
      .split('/')
      .slice(-1)[0]
      .replace(/ /g, '-')
      .replace(/\.mdx?$/, '')
      .trim();
  });
};

export const slugToPath = (slug: string): string => join(getPostsDir(), `${slug}.mdx`);

export const getPublishedPosts = async (): Promise<BlogPost[]> => {
  const slugs = await getAllPostSlugs();
  return Promise.all(slugs.map((slug) => getPostBySlug(slug))).then((posts) =>
    posts.filter((post) => post.publishedAt)
  );
};

export const getPostBySlug = async (slug: string): Promise<BlogPost> => {
  const modulePath = slugToPath(slug);
  const fileContents = readFileSync(modulePath, 'utf8');
  return parseMarkdown(fileContents);
};

export const parseMarkdown = (fileContents: string): BlogPost => {
  const { data, content } = matter(fileContents);
  const parsedData = data as Omit<BlogPost, 'content'>;
  return {
    ...parsedData,
    content,
  };
};
