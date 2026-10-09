'use client';

import { useMemo } from 'react';
import DOMPurify from 'dompurify';

interface SanitizedHtmlProps {
  html: string;
  className?: string;
}

export default function SanitizedHtml({ html, className }: SanitizedHtmlProps) {
  const cleanHtml = useMemo(() => {
    if (typeof window === 'undefined') {
      return html;
    }
    return DOMPurify.sanitize(html, {
      USE_PROFILES: { html: true },
      ADD_ATTR: ['target', 'rel'],
    });
  }, [html]);

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
    />
  );
}
