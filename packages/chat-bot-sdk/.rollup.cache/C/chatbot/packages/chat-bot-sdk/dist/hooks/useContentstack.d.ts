import { ContentstackConfig } from '../types/contentstack';
export declare function useContentstack(): {
    config: ContentstackConfig | null;
    isConnected: boolean;
    connect: (newConfig: ContentstackConfig) => Promise<void>;
    disconnect: () => void;
};
//# sourceMappingURL=useContentstack.d.ts.map