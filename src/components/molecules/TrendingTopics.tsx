import React from 'react';
import styles from './TrendingTopics.module.css';

interface TrendingTopicsProps {
  onTopicClick: (topic: string) => void;
}

const TRENDING_TOPICS = [
  { name: 'Politics', icon: '🏛️', color: 'var(--color-politics)' },
  { name: 'Technology', icon: '💻', color: 'var(--color-technology)' },
  { name: 'Climate', icon: '🌍', color: 'var(--color-science)' },
  { name: 'Business', icon: '💼', color: 'var(--color-business)' },
  { name: 'Health', icon: '🏥', color: 'var(--color-health)' },
  { name: 'Sports', icon: '⚽', color: 'var(--color-sports)' },
  { name: 'Arts', icon: '🎨', color: 'var(--color-arts)' },
  { name: 'World', icon: '🌏', color: 'var(--color-world)' },
];

export const TrendingTopics: React.FC<TrendingTopicsProps> = ({ onTopicClick }) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Explore by Topic</h3>
      <div className={styles.topics}>
        {TRENDING_TOPICS.map((topic, index) => (
          <button
            key={topic.name}
            className={styles.topic}
            onClick={() => onTopicClick(topic.name.toLowerCase())}
            style={{ 
              '--topic-color': topic.color,
              animationDelay: `${index * 0.1}s`
            } as React.CSSProperties}
          >
            <span className={styles.topicIcon}>{topic.icon}</span>
            <span className={styles.topicName}>{topic.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};