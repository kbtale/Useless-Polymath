import clsx from 'clsx';
import type React from 'react';
import { memo } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from './CoreMarkdownRenderer.module.scss';

export interface CoreMarkdownRendererProps extends React.HTMLAttributes<HTMLDivElement> {
  content: string;
}

export const CoreMarkdownRenderer: React.FC<CoreMarkdownRendererProps> = memo(
  ({ content, className, ...props }) => {
    return (
      <div className={clsx(styles.markdownContainer, className)} {...props}>
        <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
      </div>
    );
  },
);
