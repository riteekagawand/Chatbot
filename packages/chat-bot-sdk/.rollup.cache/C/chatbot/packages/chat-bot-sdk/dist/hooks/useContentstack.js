import { useState } from 'react';
export function useContentstack() {
    const [config, setConfig] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const connect = async (newConfig) => {
        // TODO: Implement Contentstack connection
        setConfig(newConfig);
        setIsConnected(true);
    };
    const disconnect = () => {
        setConfig(null);
        setIsConnected(false);
    };
    return {
        config,
        isConnected,
        connect,
        disconnect
    };
}
//# sourceMappingURL=useContentstack.js.map