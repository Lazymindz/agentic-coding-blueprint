import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  image?: string;
  type?: string;
  publishedAt?: string;
  modifiedAt?: string;
  author?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = "A Developer's Guide to Agentic Coding",
  description = "Master the art of AI-powered software development with this comprehensive guide to agentic coding workflows, context engineering, and production-ready AI systems.",
  keywords = ["agentic coding", "AI programming", "software development", "AI workflows", "context engineering", "production AI systems"],
  canonicalUrl = "https://aiproof.me",
  image = "https://aiproof.me/web-app-manifest-512x512.png",
  type = "website",
  publishedAt,
  modifiedAt,
  author = "Claude Code"
}) => {
  const fullTitle = title !== "A Developer's Guide to Agentic Coding" 
    ? `${title} - A Developer's Guide to Agentic Coding`
    : title;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content={author} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="AIProof.ME" />
      {publishedAt && <meta property="og:article:published_time" content={publishedAt} />}
      {modifiedAt && <meta property="og:article:modified_time" content={modifiedAt} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@lazymindz" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Schema.org for Google */}
      <meta itemProp="name" content={fullTitle} />
      <meta itemProp="description" content={description} />
      <meta itemProp="image" content={image} />
      
      {/* Additional SEO */}
      <meta name="robots" content="index,follow" />
      <meta name="googlebot" content="index,follow" />
      <meta name="bingbot" content="index,follow" />
    </Helmet>
  );
};

export default SEO;