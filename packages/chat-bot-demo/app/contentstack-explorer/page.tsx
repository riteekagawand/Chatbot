'use client';

import { useState, useEffect } from 'react';

interface ContentTypeSummary {
  count: number;
  sampleFields: string[];
  lastModified: string | null;
  error?: string;
}

interface ContentEntry {
  uid: string;
  title: string;
  content: string;
  contentType: string;
  metadata: Record<string, any>;
  url?: string;
}

interface ContentstackData {
  contentTypes: string[];
  contentSummary: Record<string, ContentTypeSummary>;
  allContent: Record<string, ContentEntry[]>;
  totalEntries: number;
  message: string;
}

export default function ContentstackExplorer() {
  const [data, setData] = useState<ContentstackData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [action, setAction] = useState<'all' | 'types' | 'content'>('all');

  const fetchData = async (actionType: 'all' | 'types' | 'content', contentType?: string) => {
    setLoading(true);
    setError(null);
    
    try {
      let url = '/api/test-contentstack?action=' + actionType;
      if (contentType) {
        url += '&type=' + contentType;
      }
      
      const response = await fetch(url);
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch data');
      }
      
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData('all');
  }, []);

  const handleTypeClick = (type: string) => {
    setSelectedType(selectedType === type ? null : type);
    if (selectedType !== type) {
      fetchData('content', type);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Contentstack Explorer</h1>
            <p className="mt-1 text-sm text-gray-600">
              Explore your Contentstack content types and entries
            </p>
          </div>

          <div className="p-6">
            {/* Action Buttons */}
            <div className="mb-6 flex flex-wrap gap-3">
              <button
                onClick={() => fetchData('all')}
                disabled={loading}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  action === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading && action === 'all' ? 'Loading...' : 'Load All Data'}
              </button>
              <button
                onClick={() => fetchData('types')}
                disabled={loading}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  action === 'types'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading && action === 'types' ? 'Loading...' : 'Content Types Only'}
              </button>
            </div>

            {/* Error Display */}
            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Error</h3>
                    <div className="mt-2 text-sm text-red-700">{error}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="mb-6 flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600">Loading data from Contentstack...</span>
              </div>
            )}

            {/* Data Display */}
            {data && !loading && (
              <div className="space-y-6">
                {/* Summary */}
                <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                  <h3 className="text-lg font-medium text-blue-900 mb-2">Summary</h3>
                  <p className="text-blue-800">{data.message}</p>
                  {data.totalEntries && (
                    <p className="text-blue-700 text-sm mt-1">
                      Total entries across all content types: {data.totalEntries}
                    </p>
                  )}
                </div>

                {/* Content Types */}
                {data.contentTypes && data.contentTypes.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Content Types</h3>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {data.contentTypes.map((type) => {
                        const summary = data.contentSummary?.[type];
                        return (
                          <div
                            key={type}
                            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                            onClick={() => handleTypeClick(type)}
                          >
                            <div className="flex items-center justify-between">
                              <h4 className="text-lg font-medium text-gray-900 capitalize">
                                {type}
                              </h4>
                              <span className="text-sm text-gray-500">
                                {summary?.count || 0} entries
                              </span>
                            </div>
                            
                            {summary && (
                              <div className="mt-2 space-y-1">
                                <div className="text-sm text-gray-600">
                                  <strong>Fields:</strong> {summary.sampleFields?.join(', ') || 'N/A'}
                                </div>
                                {summary.lastModified && (
                                  <div className="text-sm text-gray-600">
                                    <strong>Last Modified:</strong> {new Date(summary.lastModified).toLocaleDateString()}
                                  </div>
                                )}
                                {summary.error && (
                                  <div className="text-sm text-red-600">
                                    <strong>Error:</strong> {summary.error}
                                  </div>
                                )}
                              </div>
                            )}
                            
                            {selectedType === type && (
                              <div className="mt-3 pt-3 border-t border-gray-200">
                                <div className="text-sm text-blue-600">
                                  Click to view detailed content ↓
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Detailed Content for Selected Type */}
                {selectedType && data.allContent?.[selectedType] && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Content for {selectedType.toUpperCase()}
                    </h3>
                    <div className="space-y-4">
                      {data.allContent[selectedType].map((entry, index) => (
                        <div key={entry.uid} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="text-lg font-medium text-gray-900">
                              {entry.title}
                            </h4>
                            <span className="text-sm text-gray-500">#{index + 1}</span>
                          </div>
                          
                          <div className="text-sm text-gray-600 mb-2">
                            <strong>UID:</strong> {entry.uid}
                          </div>
                          
                          <div className="text-sm text-gray-700 mb-3">
                            <strong>Content:</strong> {entry.content}
                          </div>
                          
                          <details className="text-sm">
                            <summary className="cursor-pointer text-blue-600 hover:text-blue-800">
                              View Full Metadata
                            </summary>
                            <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-auto">
                              {JSON.stringify(entry.metadata, null, 2)}
                            </pre>
                          </details>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Raw Data (for debugging) */}
                <details className="mt-8">
                  <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-800">
                    View Raw API Response
                  </summary>
                  <pre className="mt-2 p-4 bg-gray-100 rounded text-xs overflow-auto max-h-96">
                    {JSON.stringify(data, null, 2)}
                  </pre>
                </details>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
