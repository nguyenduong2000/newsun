
'use client';

import { MutableRefObject, useEffect, useRef } from 'react';

export function useIsMounted(): MutableRefObject<boolean> {
  const isMounted = useRef(false)

  useEffect(() => {
   isMounted.current = true
  }, []);

  return isMounted;
}
