import { LLMProvider, LLMConfig } from '../types/llm';
interface LLMProviderSelectorProps {
    selectedProvider: LLMProvider;
    onProviderChange: (provider: LLMProvider) => void;
    onConfigChange: (config: LLMConfig) => void;
    config: LLMConfig;
    className?: string;
    theme?: 'light' | 'dark' | 'auto';
}
export default function LLMProviderSelector({ selectedProvider, onProviderChange, onConfigChange, config, className, theme }: LLMProviderSelectorProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=LLMProviderSelector.d.ts.map