export const contentstackConfig = {
  // Default Contentstack configuration
  defaultEnvironment: 'development',
  regions: {
    us: 'https://cdn.contentstack.io/v3',
    eu: 'https://eu-cdn.contentstack.io/v3',
    azure: 'https://azure-cdn.contentstack.io/v3'
  },
  
  // Content type mappings
  contentTypes: {
    tour: {
      fields: ['title', 'description', 'location', 'price', 'duration'],
      searchable: true
    },
    faq: {
      fields: ['question', 'answer', 'category'],
      searchable: true
    },
    blog: {
      fields: ['title', 'content', 'author', 'tags'],
      searchable: true
    }
  }
};
