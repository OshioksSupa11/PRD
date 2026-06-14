'use client';

import posthog from 'posthog-js';

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com';

let initialized = false;

export function initAnalytics(): void {
  if (typeof window === 'undefined' || initialized) return;
  if (!POSTHOG_KEY) return;

  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    capture_pageview: false,
    capture_pageleave: true,
  });
  initialized = true;
}

export function trackEvent(
  name: string,
  properties?: Record<string, unknown>
): void {
  if (typeof window === 'undefined') return;
  try {
    if (POSTHOG_KEY && initialized) {
      posthog.capture(name, properties);
    }
  } catch {
    // silently fail — analytics should never break the app
  }
}

export const AnalyticsEvents = {
  RESUME_DOWNLOAD: 'resume_download',
  CONTACT_FORM_SUBMIT: 'contact_form_submit',
  PROJECT_VIEW: 'project_view',
  PROJECT_DETAIL_VIEW: 'project_detail_view',
  BLOG_POST_VIEW: 'blog_post_view',
  CERTIFICATION_VIEW: 'certification_view',
  AI_CHAT_OPEN: 'ai_chat_open',
  AI_QUESTION_ASKED: 'ai_question_asked',
  THEME_TOGGLE: 'theme_toggle',
} as const;
