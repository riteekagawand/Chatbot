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
      fields: ['title', 'description', 'country', 'price', 'duration'],
      searchable: true
    },
    faqs: {
      fields: ['question', 'answers', 'tags'],
      searchable: true
    }
  }
};
