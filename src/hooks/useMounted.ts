import { useEffect, useRef } from 'react';

export const useMounted = () => {
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    /**
     * Clean up function which runs when the component unmounts
     * It also runs before DOM is updated for the next render
     * although that isn't of much significance for just
     * checking whether or not a component unmounted
     */
    return () => {
      mounted.current = false;
    };
  }, []);

  return mounted;
};
