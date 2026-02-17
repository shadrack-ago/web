'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featured_image: string;
  author_name: string;
  published_at: string;
  created_at: string;
}

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (params.slug) {
      fetchPost(params.slug as string);
    }
  }, [params.slug]);

  const fetchPost = async (slug: string) => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .single();

      if (error) {
        setError('Blog post not found');
        return;
      }

      setPost(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f4ede6] flex items-center justify-center">
        <div className="text-[#1f2428]">Loading...</div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-[#f4ede6] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif text-[#1f2428] mb-4">Blog Post Not Found</h1>
          <p className="text-[#2f3438] mb-6">The blog post you're looking for doesn't exist or isn't published.</p>
          <button
            onClick={() => router.push('/#blog')}
            className="btn-primary"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4ede6] text-[#1f2428]">
      <header className="sticky top-0 z-40 border-b border-black/5 bg-[#f4ede6]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#5c1f2d] text-[#f4ede6] font-serif text-xl font-semibold tracking-tight shadow-sm">
              FR
            </div>
            <div className="leading-tight">
              <div className="font-semibold tracking-tight">FAR Researchers</div>
              <div className="text-xs text-[#4a1824]">
                Your dependable research partner
              </div>
            </div>
          </div>
          
          <nav className="hidden gap-5 text-sm font-medium md:flex">
            <a href="/" className="rounded-full px-3 py-2 transition-colors hover:bg-black/5">
              Home
            </a>
            <a href="/#blog" className="rounded-full px-3 py-2 transition-colors hover:bg-black/5">
              Blog
            </a>
            <a href="/#contact" className="rounded-full px-3 py-2 transition-colors hover:bg-black/5">
              Contact
            </a>
          </nav>
          
          <a href="/#contact" className="btn-primary hidden text-sm md:inline-flex">
            Talk to Us
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 pb-20 pt-10">
        <article className="space-y-8">
          <div className="text-center space-y-4">
            <p className="text-sm uppercase tracking-[0.2em] text-[#4a1824]">
              Blog Post
            </p>
            <h1 className="font-serif text-4xl leading-tight text-[#1f2428] sm:text-5xl">
              {post.title}
            </h1>
            <div className="flex items-center justify-center gap-4 text-sm text-[#2f3438]">
              <span>By {post.author_name}</span>
              <span>•</span>
              <span>{new Date(post.published_at).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
          </div>

          {post.featured_image && (
            <div className="rounded-3xl overflow-hidden">
              <img 
                src={post.featured_image} 
                alt={post.title}
                className="w-full h-64 object-cover"
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none">
            <div className="bg-white/70 rounded-3xl p-10 shadow-sm backdrop-blur">
              <div className="whitespace-pre-wrap text-[#2f3438] leading-relaxed">
                {post.content}
              </div>
            </div>
          </div>

          <div className="text-center pt-8">
            <a href="/#blog" className="btn-ghost">
              ← Back to Blog
            </a>
          </div>
        </article>
      </main>
    </div>
  );
}
