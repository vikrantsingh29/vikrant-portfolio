// Google Analytics utility functions for tracking user interactions

// Sends custom events to Google Analytics
export const trackEvent = (eventName, parameters = {}) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', eventName, {
            event_category: 'Portfolio Interaction',
            event_label: parameters.label || '',
            value: parameters.value || 0,
            ...parameters
        });
    }
};

// Tracks page views (useful for SPA navigation)
export const trackPageView = (pageTitle, pagePath) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('config', 'G-9Q9BNXLZ0Q', {
            page_title: pageTitle,
            page_path: pagePath
        });
    }
};

// Tracks project clicks
export const trackProjectClick = (projectSlug, projectTitle) => {
    trackEvent('project_click', {
        event_category: 'Project Engagement',
        event_label: projectSlug,
        project_name: projectTitle
    });
};

// Tracks contact interactions
export const trackContactClick = (contactType, contactValue) => {
    trackEvent('contact_click', {
        event_category: 'Contact Engagement',
        event_label: contactType,
        contact_method: contactValue
    });
};

// Tracks skill section interactions
export const trackSkillInteraction = (skillCategory) => {
    trackEvent('skill_interaction', {
        event_category: 'Skills Engagement',
        event_label: skillCategory
    });
};

// Tracks chatbot interactions
export const trackChatbotInteraction = (action, message = '') => {
    trackEvent('chatbot_interaction', {
        event_category: 'Chatbot Engagement',
        event_label: action,
        interaction_type: action,
        message_preview: message.substring(0, 50)
    });
};
