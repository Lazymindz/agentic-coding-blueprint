import React from 'react';
import { useParams, Navigate } from 'react-router-dom';

export default function LegacySlideRedirect() {
  const { slideNumber } = useParams<{ slideNumber: string }>();
  
  if (!slideNumber) {
    return <Navigate to="/blueprint" replace />;
  }
  
  return <Navigate to={`/blueprint/slide/${slideNumber}`} replace />;
}