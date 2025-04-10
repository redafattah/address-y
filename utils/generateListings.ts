const cities = [
    { name: "Casablanca", lat: 33.5731, lng: -7.5898 },
    { name: "Rabat", lat: 34.0209, lng: -6.8417 },
    { name: "Marrakech", lat: 31.6295, lng: -7.9811 },
    { name: "Tangier", lat: 35.7595, lng: -5.8339 },
    { name: "Agadir", lat: 30.4278, lng: -9.5981 },
    { name: "Fes", lat: 34.0331, lng: -5.0003 },
    { name: "Oujda", lat: 34.6829, lng: -1.9092 },
    { name: "Tetouan", lat: 35.5785, lng: -5.3684 },
  ];
  
  const adjectives = ["Cozy", "Modern", "Elegant", "Traditional"];
  const images = [1, 2, 3, 4];
  
  export function generateListings(count = 14) {
    const listings = [];
  
    for (let i = 0; i < count; i++) {
      const city = cities[Math.floor(Math.random() * cities.length)];
      const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
      const img = images[i % images.length];
  
      listings.push({
        id: i + 1,
        title: `${adjective} Stay in ${city.name}`,
        address: `${city.name}, Morocco`,
        price: Math.floor(Math.random() * 500) + 300,
        beds: Math.floor(Math.random() * 4) + 1,
        baths: Math.floor(Math.random() * 3) + 1,
        guests: Math.floor(Math.random() * 5) + 2,
        description: "Charming accommodation located in the heart of the city.",
        imageUrl: `/images/sample-${img}.jpg`,
        images: [
          `/images/sample-${img}-1.jpg`,
          `/images/sample-${img}-2.jpg`,
          `/images/sample-${img}-3.jpg`,
        ],
        availableFrom: "2025-04-01",
        availableTo: "2025-10-31",
        lat: parseFloat((city.lat + Math.random() * 0.01 - 0.005).toFixed(6)),
        lng: parseFloat((city.lng + Math.random() * 0.01 - 0.005).toFixed(6)),
      });
    }
  
    return listings;
  }
  