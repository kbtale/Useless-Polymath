import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from './CoreMarkdownRenderer.module.scss';

interface CoreMarkdownRendererProps {
  content: string;
}

export const CoreMarkdownRenderer: React.FC<CoreMarkdownRendererProps> = ({ content }) => {
  return (
    <div className={styles.markdownContainer}>
      <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
    </div>
  );
};
