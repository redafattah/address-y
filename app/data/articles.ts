// data/articles.ts
export interface Article {
    id: string;
    title: string;
    summary: string;
    image_url: string;
    published_at: string;
  }
  
  export const allArticles: Article[] = [
    {
      id: '1',
      title: 'Top 5 des plages à visiter au Maroc',
      summary: 'Découvrez les plus belles plages marocaines pour vos vacances d’été.',
      image_url: 'https://images.unsplash.com/photo-1521499420147-36d5bfc2781f?q=80&w=2602&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      published_at: '2025-04-10',
    },
    {
      id: '2',
      title: 'Pourquoi le printemps est la meilleure saison pour voyager',
      summary: 'Profitez de la nature en fleurs et du climat doux pour vos prochaines escapades.',
      image_url: 'https://images.unsplash.com/photo-1603705502222-4356c929be57?q=80&w=3276&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      published_at: '2025-04-08',
    },
    {
      id: '3',
      title: 'Astuces pour bien réserver votre hôtel',
      summary: 'Découvrez les conseils pour trouver les meilleures offres et éviter les pièges.',
      image_url: 'https://images.unsplash.com/photo-1635548166842-bf67bacbefaa?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      published_at: '2025-04-05',
    },
    // Ajoute + d'articles pour tester la pagination
    {
      id: '4',
      title: 'Visiter les montagnes de l’Atlas',
      summary: 'Un guide pour explorer les merveilles naturelles de l’Atlas marocain.',
      image_url: 'https://images.unsplash.com/photo-1559315390-1065ae6b47c0?q=80&w=3294&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      published_at: '2025-03-30',
    },
    {
      id: '5',
      title: 'Les meilleures kasbahs du sud marocain',
      summary: 'Un voyage dans l’histoire à travers les kasbahs les plus emblématiques.',
      image_url: 'https://images.unsplash.com/photo-1548105155-b8c1b5142252?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      published_at: '2025-03-25',
    },
    {
      id: '6',
      title: 'Guide gastronomique du Maroc',
      summary: 'Découvrez les spécialités marocaines incontournables à déguster.',
      image_url: 'https://images.unsplash.com/photo-1600353908694-a606c58a0b73?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      published_at: '2025-03-20',
    },
    {
      id: '7',
      title: 'Conseils pour un voyage solo en toute sécurité',
      summary: 'Voyagez seul(e) avec sérénité grâce à nos astuces pratiques.',
      image_url: 'https://images.unsplash.com/photo-1520466809213-7b9a56adcd45?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      published_at: '2025-03-10',
    },
  ];
  