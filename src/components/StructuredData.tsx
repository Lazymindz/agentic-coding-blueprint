import React from 'react';
import { Helmet } from 'react-helmet-async';

interface StructuredDataProps {
  type?: 'Course' | 'Article' | 'WebSite' | 'CourseInstance';
  name: string;
  description: string;
  url: string;
  image?: string;
  author?: string;
  publisher?: string;
  datePublished?: string;
  dateModified?: string;
  provider?: string;
  courseCode?: string;
  educationalLevel?: string;
  learningResourceType?: string;
  timeRequired?: string;
  teaches?: string[];
}

const StructuredData: React.FC<StructuredDataProps> = ({
  type = 'Course',
  name,
  description,
  url,
  image = 'https://aiproof.me/web-app-manifest-512x512.png',
  author = 'Claude Code',
  publisher = 'AIProof.ME',
  datePublished = '2025-07-18',
  dateModified = '2025-07-18',
  provider = 'AIProof.ME',
  courseCode = 'agentic-coding-guide',
  educationalLevel = 'Intermediate',
  learningResourceType = 'Course',
  timeRequired = 'PT1H',
  teaches = ['agentic coding', 'AI collaboration', 'context engineering', 'production AI systems', 'AI workflows']
}) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type,
    name,
    description,
    url,
    image,
    author: {
      '@type': 'Person',
      name: author
    },
    publisher: {
      '@type': 'Organization',
      name: publisher,
      logo: {
        '@type': 'ImageObject',
        url: 'https://aiproof.me/web-app-manifest-192x192.png'
      }
    },
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
    ...(type === 'Course' && {
      provider: {
        '@type': 'Organization',
        name: provider
      },
      courseCode,
      educationalLevel,
      learningResourceType,
      timeRequired,
      teaches,
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: 'online',
        instructor: {
          '@type': 'Person',
          name: author
        },
        courseSchedule: 'self-paced',
        coursePrerequisites: 'Basic programming knowledge'
      }
    }),
    ...(type === 'Article' && {
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': url
      }
    })
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData, null, 2)}
      </script>
    </Helmet>
  );
};

export default StructuredData;