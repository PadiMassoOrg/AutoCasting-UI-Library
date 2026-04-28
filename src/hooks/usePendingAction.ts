import { useCallback, useState } from 'react';

export const usePendingAction = () => {
  const [isPending, setIsPending] = useState(false);

  const execute = useCallback(async (action: () => void | Promise<void>) => {
    setIsPending(true);
    try {
      await action();
    } finally {
      setIsPending(false);
    }
  }, []);

  return { isPending, execute };
};
