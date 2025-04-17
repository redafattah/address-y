'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Article, allArticles } from '../data/articles';

const ARTICLES_PER_PAGE = 6;

export default function ArticlesPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil((allArticles?.length || 0) / ARTICLES_PER_PAGE);
  const start = (currentPage - 1) * ARTICLES_PER_PAGE;
  const paginatedArticles = allArticles.slice(start, start + ARTICLES_PER_PAGE);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-12 text-center">📰 Tous les articles</h1>

        <div className="grid md:grid-cols-3 gap-8">
          {paginatedArticles.map((article: Article) => (
            <div
              key={article.id}
              className="relative h-[400px] rounded-lg overflow-hidden shadow-lg group transition hover:scale-[1.02]"
            >
              {/* Image + Gradient */}
              <img
                src={article.image_url}
                alt={article.title}
                className="w-full h-[400px] object-cover transition duration-300 group-hover:brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 flex flex-col justify-end text-white">
                <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                <p className="text-sm line-clamp-3">{article.summary}</p>
                <Button asChild variant="secondary" className="mt-4 w-fit text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30">
                  <Link href={`/articles/${article.id}`}>Lire l’article</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

     {/* Pagination améliorée */}
<div className="flex justify-center mt-12 space-x-2">
  <Button
    variant="outline"
    size="sm"
    onClick={handlePrev}
    disabled={currentPage === 1}
    className="rounded-full px-4"
  >
    ◀
  </Button>

  {Array.from({ length: totalPages }).map((_, index) => {
    const page = index + 1;
    const isActive = currentPage === page;

    return (
      <button
        key={page}
        onClick={() => setCurrentPage(page)}
        className={`w-9 h-9 rounded-full border text-sm font-medium transition ${
          isActive
            ? 'bg-primary text-white border-primary'
            : 'bg-white dark:bg-muted text-gray-700 dark:text-gray-300 border-gray-300 hover:bg-primary hover:text-white hover:border-primary'
        }`}
      >
        {page}
      </button>
    );
  })}

  <Button
    variant="outline"
    size="sm"
    onClick={handleNext}
    disabled={currentPage === totalPages}
    className="rounded-full px-4"
  >
    ▶
  </Button>
</div>

      </div>
    </section>
  );
}
