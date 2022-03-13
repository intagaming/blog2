# blog2

## Overview

This repository contains the Next.js project for my blog at
[https://hxann.com](https://hxann.com).

The project is my second attempt at making a Next.js blog. Last time with a
database, now I store images, posts & pages directly in the repo. So without a
database, you can just `npm run dev` and be on your way.

## Who is interested in this?

If you're interested in using this repo as a blog, I think you should already be
interested in practicing Next.js/React. It is trivial for writing new blog
posts, though for utilizing the power of MDX (an extension of Markdown), you
should be aware of its capability of interpolating React components into the
Markdown. It is extensible, but it is non-trivial for a non-developer to do
that.

## Features

- Posts & pages are of MDX format.
- Has all of the goodies of an MDX.
- MDX has frontmatter that provides meta about the post/page. Checkout the
  `types/blog.ts` file.
- I utilized the [`hashicorp/next-mdx-remote`][1] library, which parses MDX and
  renders into HTML tags. It uses `unified` under the hood. It can also renders
  React components from the MDX.
- Multiple authors permitted.
- Leveraging the `unified` ecosystem. There's a custom plugin for fetching
  placeholder images in the markdown and pass it into the `next/image`'s `Image`
  component.
- The order of the h1 title tag & cover image are adjustable within the MDX
  file.
- Simple blog archive, sorted by DESC date, paginated.
- `next-seo` for the SEO, configured for the home page, posts and pages.
- `next-sitemap` for the sitemap.
- Some blog configurations are available in `blog.config.ts`, including:
  - The list of navbar links to show (currently only allow links to the pages,
    not an arbitrary URL)
  - Blog name
  - Blog description
  - Number of posts on the home page
  - Number of posts in each archive page
  - The blog's banner image URL
  - Copyright information
- Styled using Tailwind CSS. Dark mode toggle.
- ESLint & Prettier & TypeScript setup.

## How to run

Checkout the `package.json` file. When I develop, I use `npm run dev`. When I
deploy, I go to Vercel and deploy. I don't use the `build` script manually.

## Writing

_Just copy a blog post and change things up, won't ya?_

No, but seriously. All of the available frontmatter fields are written in the
`types/blog.ts` file.

The **`#` Markdown heading** (which renders to `h1` in HTML) and the **cover
image** should be available in the post's Markdown. The post's excerpt is
recommended as the first line after the `#` heading.

Pages and posts are very similar.

- Pages could be linked to the navbar. Posts are not.
- Pages don't have cover image.

Here's a general workflow for creating a post:

1. (Optional) Add your author profile to the `content/authors.ts` file.
1. Go create a post in `content/posts` folder. Remember to follow the above
   requirements.
1. If you find out that you need something more advanced than texts and code
   blocks, you should be comfortable creating a new MDX component if it's not
   available. Go create them in `components/mdx`, and register them in the
   `pages/[slug].tsx` file. Then include them in the MDX, just don't use
   `import`. Check out this [`hashicorp/next-mdx-remote`][2] repo section for
   the reason behind that.
1. You should see your post now.

### What is "slug"?

It's used for rendering the post/page's URL. If a post/page has a slug of
`the-post`, then the URL would be `https://example.com/the-post`. That's it.

[1]: https://github.com/hashicorp/next-mdx-remote
[2]: https://github.com/hashicorp/next-mdx-remote#import--export
