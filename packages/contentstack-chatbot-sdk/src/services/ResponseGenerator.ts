import { ContentstackEntry, ResponseGenerator as IResponseGenerator } from '../types';

export class ResponseGenerator implements IResponseGenerator {
  generateResponse(message: string, content: { tours: ContentstackEntry[], faqs: ContentstackEntry[] }): string {
    const { tours, faqs } = content;
    const lowerMessage = message.toLowerCase();

    // Price intent: price | prize | cost | fees | how much
    if (/\b(price|prize|cost|fees|how much)\b/i.test(lowerMessage)) {
      const tokens = lowerMessage
        .replace(/[^a-z0-9\s]/gi, ' ')
        .split(/\s+/)
        .filter(t => t.length > 1);

      const scored = tours.map(t => {
        const title = (t.title || '').toLowerCase();
        const score = tokens.reduce((s, tok) => s + (title.includes(tok) ? 1 : 0), 0);
        return { t, score };
      }).sort((a, b) => b.score - a.score);

      const best = scored[0]?.score ? scored[0].t : null;
      if (best) {
        if (best.price != null) {
          return `The price of “${best.title}” is $${best.price}.`;
        }
        return `I couldn’t find a price for “${best.title}”. Would you like other details (duration, country)?`;
      }

      const priced = tours.filter(t => t.price != null).slice(0, 3);
      if (priced.length > 0) {
        const list = priced.map(t => `• ${t.title} — $${t.price}`).join('\n');
        return `Here are some tour prices:\n\n${list}\n\nWhich tour would you like a price for?`;
      }

      return 'Could you specify the tour name so I can give you the exact price?';
    }

    // Handle specific queries
    if (lowerMessage.includes('how many tours') || lowerMessage.includes('tour count')) {
      return `We currently have ${tours.length} amazing tours available! Would you like to know more about any specific destination?`;
    }

    if (lowerMessage.includes('accommodation') || lowerMessage.includes('hotel') || lowerMessage.includes('provide')) {
      const accommodationFaq = faqs.find(faq => 
        faq.question?.toLowerCase().includes('accommodation') ||
        faq.title?.toLowerCase().includes('accommodation')
      );
      if (accommodationFaq) {
        return `**${accommodationFaq.question || accommodationFaq.title}**\n\n${accommodationFaq.answers || accommodationFaq.answer}\n\nDo you have any specific accommodation preferences?`;
      }
    }

    if (lowerMessage.includes('booking') || lowerMessage.includes('book')) {
      const bookingFaq = faqs.find(faq => 
        faq.question?.toLowerCase().includes('book')
      );
      if (bookingFaq) {
        return `**${bookingFaq.question}**\n\n${bookingFaq.answers || bookingFaq.answer}\n\nWould you like help with booking a specific tour?`;
      }
    }

    if (lowerMessage.includes('cancel')) {
      const cancelFaq = faqs.find(faq => 
        faq.question?.toLowerCase().includes('cancel')
      );
      if (cancelFaq) {
        return `**${cancelFaq.question}**\n\n${cancelFaq.answers || cancelFaq.answer}\n\nDo you need help with a specific cancellation?`;
      }
    }

    if (lowerMessage.includes('payment')) {
      const paymentFaq = faqs.find(faq => 
        faq.question?.toLowerCase().includes('payment')
      );
      if (paymentFaq) {
        return `**${paymentFaq.question}**\n\n${paymentFaq.answers || paymentFaq.answer}\n\nDo you have any other payment questions?`;
      }
    }

    if (lowerMessage.includes('insurance')) {
      const insuranceFaq = faqs.find(faq => 
        faq.question?.toLowerCase().includes('insurance')
      );
      if (insuranceFaq) {
        return `**${insuranceFaq.question}**\n\n${insuranceFaq.answers || insuranceFaq.answer}\n\nWould you like help finding travel insurance?`;
      }
    }

    if (lowerMessage.includes('flight')) {
      const flightFaq = faqs.find(faq => 
        faq.question?.toLowerCase().includes('flight')
      );
      if (flightFaq) {
        return `**${flightFaq.question}**\n\n${flightFaq.answers || flightFaq.answer}\n\nWould you like help with flight bookings?`;
      }
    }

    if (lowerMessage.includes('refund')) {
      const refundFaq = faqs.find(faq => 
        faq.question?.toLowerCase().includes('refund')
      );
      if (refundFaq) {
        return `**${refundFaq.question}**\n\n${refundFaq.answers || refundFaq.answer}\n\nDo you need help with a specific refund?`;
      }
    }

    // General tour information
    if (tours.length > 0) {
      const tourList = tours.slice(0, 3).map(tour => 
        `• **${tour.title}** - ${tour.country} (${tour.duration}, $${tour.price})`
      ).join('\n');
      
      return `Here are some of our amazing tours:\n\n${tourList}\n\nWould you like more details about any specific tour?`;
    }

    // General FAQ response
    if (faqs.length > 0) {
      const faq = faqs[0];
      return `**${faq.question || faq.title}**\n\n${faq.answers || faq.answer}\n\nIs there anything else I can help you with?`;
    }

    return "I understand you're asking about travel and tours. I can help you with information about our tours, booking, accommodation, and more. Could you be more specific? For example:\n\n• \"How many tours do you have?\"\n• \"Tell me about your tours\"\n• \"How do I book a tour?\"\n• \"What's your cancellation policy?\"\n\nWhat would you like to know?";
  }
}
