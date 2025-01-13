export class Config {
    constructor() {
      this.apiURL = import.meta.env.VITE_BASE_URL_API_DEV || 'http://localhost:3000/graphql';
      this.recaptchaSite= import.meta.env.RECAPTCHA_SITE_KEY || '6LfWkUwpAAAAAAMC8hH3KJjHBYeWcmyzvhegjYYz';
    }
  }