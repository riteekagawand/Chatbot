interface ContentEntry {
  uid: string;
  title: string;
  content: string;
  contentType: string;
  metadata: Record<string, any>;
}

interface RelevanceScore {
  entry: ContentEntry;
  score: number;
  reasons: string[];
}

class RelevanceService {
  // Weight factors for different scoring criteria
  private weights = {
    exactMatch: 10,
    titleMatch: 8,
    contentMatch: 6,
    keywordMatch: 4,
    contentType: 2,
    recency: 1
  };

  calculateRelevance(query: string, entries: ContentEntry[]): RelevanceScore[] {
    const queryLower = query.toLowerCase();
    const queryWords = this.extractKeywords(queryLower);
    
    return entries.map(entry => {
      const score = this.calculateEntryScore(entry, queryLower, queryWords);
      return {
        entry,
        score: score.total,
        reasons: score.reasons
      };
    }).sort((a, b) => b.score - a.score);
  }

  private calculateEntryScore(entry: ContentEntry, query: string, queryWords: string[]): { total: number; reasons: string[] } {
    let totalScore = 0;
    const reasons: string[] = [];

    // 1. Exact match in title
    const titleLower = entry.title.toLowerCase();
    if (titleLower.includes(query)) {
      totalScore += this.weights.exactMatch;
      reasons.push(`Exact match in title: "${entry.title}"`);
    }

    // 2. Title keyword matches
    const titleMatches = queryWords.filter(word => titleLower.includes(word));
    if (titleMatches.length > 0) {
      const titleScore = titleMatches.length * this.weights.titleMatch;
      totalScore += titleScore;
      reasons.push(`Title keywords: ${titleMatches.join(', ')}`);
    }

    // 3. Content keyword matches
    const contentLower = entry.content.toLowerCase();
    const contentMatches = queryWords.filter(word => contentLower.includes(word));
    if (contentMatches.length > 0) {
      const contentScore = contentMatches.length * this.weights.contentMatch;
      totalScore += contentScore;
      reasons.push(`Content keywords: ${contentMatches.join(', ')}`);
    }

    // 4. Keyword density scoring
    const keywordDensity = this.calculateKeywordDensity(queryWords, contentLower);
    if (keywordDensity > 0) {
      totalScore += keywordDensity * this.weights.keywordMatch;
      reasons.push(`Keyword density: ${keywordDensity.toFixed(2)}`);
    }

    // 5. Content type bonus
    const contentTypeBonus = this.getContentTypeBonus(entry.contentType, query);
    if (contentTypeBonus > 0) {
      totalScore += contentTypeBonus;
      reasons.push(`Content type bonus: ${entry.contentType}`);
    }

    // 6. Recency bonus (if metadata has dates)
    const recencyBonus = this.getRecencyBonus(entry.metadata);
    if (recencyBonus > 0) {
      totalScore += recencyBonus;
      reasons.push(`Recent content bonus`);
    }

    return { total: totalScore, reasons };
  }

  private extractKeywords(query: string): string[] {
    // Remove common stop words and extract meaningful keywords
    const stopWords = new Set([
      'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
      'what', 'how', 'when', 'where', 'why', 'who', 'which', 'do', 'does', 'did', 'is', 'are',
      'was', 'were', 'be', 'been', 'have', 'has', 'had', 'will', 'would', 'could', 'should'
    ]);

    return query
      .split(/\s+/)
      .map(word => word.replace(/[^\w]/g, ''))
      .filter(word => word.length > 2 && !stopWords.has(word));
  }

  private calculateKeywordDensity(keywords: string[], content: string): number {
    if (keywords.length === 0) return 0;

    const contentWords = content.split(/\s+/).length;
    const keywordCount = keywords.reduce((count, keyword) => {
      const matches = (content.match(new RegExp(keyword, 'gi')) || []).length;
      return count + matches;
    }, 0);

    return keywordCount / contentWords;
  }

  private getContentTypeBonus(contentType: string, query: string): number {
    const queryLower = query.toLowerCase();
    
    // FAQ bonus for question-like queries
    if (contentType === 'faqs' && this.isQuestionQuery(queryLower)) {
      return 3;
    }
    
    // Tour bonus for travel-related queries
    if (contentType === 'tour' && this.isTravelQuery(queryLower)) {
      return 3;
    }
    
    return 0;
  }

  private isQuestionQuery(query: string): boolean {
    const questionWords = ['what', 'how', 'when', 'where', 'why', 'who', 'which', 'do', 'does', 'did', 'is', 'are', 'can', 'could', 'should', 'would'];
    return questionWords.some(word => query.startsWith(word));
  }

  private isTravelQuery(query: string): boolean {
    const travelWords = ['tour', 'travel', 'trip', 'visit', 'destination', 'place', 'country', 'city', 'adventure', 'vacation', 'holiday'];
    return travelWords.some(word => query.includes(word));
  }

  private getRecencyBonus(metadata: Record<string, any>): number {
    // Check for recent publish date or update date
    const dates = [
      metadata.publish_details?.time,
      metadata.updated_at,
      metadata.created_at
    ].filter(Boolean);

    if (dates.length === 0) return 0;

    const mostRecent = new Date(Math.max(...dates.map(date => new Date(date).getTime())));
    const daysSinceUpdate = (Date.now() - mostRecent.getTime()) / (1000 * 60 * 60 * 24);

    // Bonus decreases over time
    if (daysSinceUpdate < 7) return 2; // Recent (within a week)
    if (daysSinceUpdate < 30) return 1; // Recent (within a month)
    return 0;
  }

  // Get top N most relevant results
  getTopResults(scoredResults: RelevanceScore[], limit: number = 5): RelevanceScore[] {
    return scoredResults.slice(0, limit);
  }

  // Filter results by minimum relevance score
  filterByRelevance(scoredResults: RelevanceScore[], minScore: number = 1): RelevanceScore[] {
    return scoredResults.filter(result => result.score >= minScore);
  }

  // Get relevance summary for debugging
  getRelevanceSummary(scoredResults: RelevanceScore[]): {
    totalResults: number;
    averageScore: number;
    topScore: number;
    scoreDistribution: Record<string, number>;
  } {
    const scores = scoredResults.map(r => r.score);
    const averageScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    const topScore = Math.max(...scores);
    
    const scoreDistribution = {
      high: scoredResults.filter(r => r.score >= 10).length,
      medium: scoredResults.filter(r => r.score >= 5 && r.score < 10).length,
      low: scoredResults.filter(r => r.score >= 1 && r.score < 5).length,
      none: scoredResults.filter(r => r.score < 1).length
    };

    return {
      totalResults: scoredResults.length,
      averageScore: Math.round(averageScore * 100) / 100,
      topScore,
      scoreDistribution
    };
  }
}

export const relevanceService = new RelevanceService();
