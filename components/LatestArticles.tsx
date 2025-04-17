'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Article, allArticles } from '@/app/data/articles';

export default function LatestArticles() {
  const latestArticles: Article[] = allArticles
    .slice()
    .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
    .slice(0, 3);

  return (
    <section className="py-12 bg-muted/40">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 text-center">🗞️ Derniers articles</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {latestArticles.map((article) => (
            <div
              key={article.id}
              className="relative h-[300px] rounded-xl overflow-hidden group shadow-lg"
            >
              <img
                src={article.image_url}
                alt={article.title}
                className="w-full h-full object-cover group-hover:brightness-75 transition"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 flex flex-col justify-end text-white">
                <h3 className="text-lg font-semibold">{article.title}</h3>
                <p className="text-xs mt-1 line-clamp-2">{article.summary}</p>
                <Button asChild variant="secondary" className="mt-3 w-fit text-white bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-sm">
                  <Link href={`/articles/${article.id}`}>Lire l’article</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
