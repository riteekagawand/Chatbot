// Mock tour data for testing when Contentstack is not available
const mockTours = [
  {
    uid: 'swiss-alps-adventure',
    title: 'Swiss Alps Adventure Tour',
    description: 'Experience the breathtaking beauty of the Swiss Alps with our comprehensive adventure tour. This 7-day journey takes you through the most spectacular mountain landscapes, charming alpine villages, and world-class hiking trails.',
    location: 'Swiss Alps, Switzerland',
    price: '€1,299 per person',
    duration: '7 days / 6 nights',
    difficulty: 'Moderate to Challenging',
    highlights: [
      'Matterhorn views from Gornergrat',
      'Jungfraujoch - Top of Europe',
      'Scenic train rides on Glacier Express',
      'Hiking in Zermatt and Interlaken',
      'Traditional Swiss cheese tasting',
      'Lucerne city tour with Chapel Bridge'
    ],
    included: [
      '6 nights accommodation in 3-star hotels',
      'All breakfasts and 4 dinners',
      'Glacier Express train tickets',
      'Jungfraujoch excursion',
      'Professional English-speaking guide',
      'All transportation between destinations',
      'Welcome gift and maps'
    ],
    requirements: 'Good physical condition for hiking, comfortable walking shoes, warm clothing for mountain weather',
    season: 'May to October (Best: June to September)'
  },
  {
    uid: 'italian-dolomites-trek',
    title: 'Italian Dolomites Trekking Adventure',
    description: 'Discover the dramatic peaks and pristine valleys of the Italian Dolomites. This challenging trekking tour offers some of the most spectacular mountain scenery in Europe.',
    location: 'Dolomites, Italy',
    price: '€1,199 per person',
    duration: '6 days / 5 nights',
    difficulty: 'Challenging',
    highlights: [
      'Tre Cime di Lavaredo',
      'Alta Via 1 trail sections',
      'Cortina d\'Ampezzo',
      'Lago di Braies',
      'Via Ferrata climbing',
      'Mountain hut stays'
    ],
    included: [
      '5 nights in mountain huts and hotels',
      'All meals',
      'Professional mountain guide',
      'Via Ferrata equipment',
      'Transportation to trailheads',
      'Maps and safety equipment'
    ],
    requirements: 'Excellent physical condition, previous hiking experience, climbing experience preferred',
    season: 'June to September'
  },
  {
    uid: 'alpine-lakes-tour',
    title: 'Alpine Lakes and Villages Tour',
    description: 'A more relaxed tour focusing on the beautiful alpine lakes and charming mountain villages. Perfect for those who want to experience alpine culture without strenuous hiking.',
    location: 'Austrian Alps, Austria',
    price: '€899 per person',
    duration: '5 days / 4 nights',
    difficulty: 'Easy to Moderate',
    highlights: [
      'Hallstatt village and salt mines',
      'Lake Wolfgang boat cruise',
      'Salzburg city tour',
      'Eagle\'s Nest historical site',
      'Traditional Austrian villages',
      'Cable car to mountain viewpoints'
    ],
    included: [
      '4 nights in 4-star hotels',
      'All breakfasts and 2 dinners',
      'Boat cruise on Lake Wolfgang',
      'Salt mine tour in Hallstatt',
      'Salzburg city walking tour',
      'All transportation',
      'Professional guide'
    ],
    requirements: 'Basic fitness level, comfortable walking shoes',
    season: 'April to October (Best: May to September)'
  }
];

function searchMockTours(query) {
  const searchTerm = query.toLowerCase();
  return mockTours.filter(tour => 
    tour.title.toLowerCase().includes(searchTerm) ||
    tour.description.toLowerCase().includes(searchTerm) ||
    tour.location.toLowerCase().includes(searchTerm) ||
    tour.highlights.some(highlight => highlight.toLowerCase().includes(searchTerm))
  );
}

function getTourByTitle(title) {
  return mockTours.find(tour => 
    tour.title.toLowerCase().includes(title.toLowerCase())
  );
}

module.exports = {
  mockTours,
  searchMockTours,
  getTourByTitle
};
