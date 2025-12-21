import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getAllPosts } from '../lib/client';

export async function GET(context: APIContext) {
    const data = await getAllPosts();
    const posts = data.publication.posts.edges.map((edge) => edge.node);

    return rss({
        title: 'Joe Attardi - Blog',
        description:
            'Thoughts on front-end development, JavaScript, CSS, and the modern web platform.',
        site: context.site!,
        items: posts.map((post) => ({
            title: post.title,
            pubDate: new Date(post.publishedAt),
            description: post.brief,
            link: `/blog/${post.slug}/`
        })),
        customData: `<language>en-us</language>`
    });
}
