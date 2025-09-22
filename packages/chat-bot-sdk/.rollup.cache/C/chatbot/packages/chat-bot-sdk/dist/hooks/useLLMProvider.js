import { useState } from 'react';
export function useLLMProvider() {
    const [provider, setProvider] = useState('openai');
    const [config, setConfig] = useState(null);
    const updateProvider = (newProvider) => {
        setProvider(newProvider);
    };
    const updateConfig = (newConfig) => {
        setConfig(newConfig);
    };
    return {
        provider,
        config,
        updateProvider,
        updateConfig
    };
}
//# sourceMappingURL=useLLMProvider.js.map