import { LLMProvider, LLMConfig } from '../types/llm';
import { ContentstackConfig } from '../types/contentstack';
interface ConfigFormProps {
    onConfigSubmit: (config: {
        llm: {
            provider: LLMProvider;
            config: LLMConfig;
        };
        contentstack?: ContentstackConfig;
    }) => void;
    initialConfig?: {
        llm: {
            provider: LLMProvider;
            config: LLMConfig;
        };
        contentstack?: ContentstackConfig;
    };
    className?: string;
    theme?: 'light' | 'dark' | 'auto';
}
export default function ConfigForm({ onConfigSubmit, initialConfig, className, theme }: ConfigFormProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ConfigForm.d.ts.map