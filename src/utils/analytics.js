// ✅ Google Analytics 4
export const inicializarAnalytics = () => {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
    // Cargar gtag script
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX'; // Reemplaza con tu ID
    document.head.appendChild(script);

    // Configurar gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX', {
      page_title: 'Anthony Mejia Portfolio',
      page_location: window.location.href
    });

    console.log('📊 Analytics initialized for AnThony69x');
  }
};

// ✅ Eventos personalizados
export const trackEvent = (eventName, parameters = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      event_category: 'Portfolio Interaction',
      event_label: parameters.label || '',
      value: parameters.value || 0,
      ...parameters
    });
    console.log(`📊 Event tracked: ${eventName}`, parameters);
  }
};

// ✅ Tracking específico para tu portfolio
export const trackPageView = (pageName) => {
  trackEvent('page_view', {
    page_title: pageName,
    page_location: window.location.href,
    user: 'AnThony69x'
  });
};

export const trackDownloadCV = () => {
  trackEvent('file_download', {
    file_name: 'CV_Anthony_Mejia.pdf',
    label: 'CV Download',
    category: 'Download'
  });
};

export const trackSocialClick = (platform, url) => {
  trackEvent('social_click', {
    social_platform: platform,
    outbound_url: url,
    label: 'Social Media',
    category: 'External Link'
  });
};

export const trackContactInteraction = (method) => {
  trackEvent('contact_interaction', {
    contact_method: method,
    label: 'Contact Attempt',
    category: 'Engagement'
  });
};

// ✅ Performance monitoring
export const trackPerformance = () => {
  if ('performance' in window) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0];
        if (perfData) {
          const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
          
          trackEvent('page_load_time', {
            value: Math.round(loadTime),
            label: 'Performance',
            load_time_ms: loadTime
          });
        }
      }, 0);
    });
  }
};

// ✅ Error tracking
export const trackError = (error, context = '') => {
  trackEvent('javascript_error', {
    error_message: error.message || 'Unknown error',
    error_context: context,
    label: 'JavaScript Error',
    category: 'Error'
  });
};