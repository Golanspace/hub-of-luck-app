
/**
 * Cloudways API Service
 * Handles server and app management tasks.
 */

const getCredentials = () => {
  const email = localStorage.getItem('cw_email');
  const apiKey = localStorage.getItem('cw_api_key');
  return { email, apiKey };
};

export const cloudwaysApi = {
  async getAccessToken() {
    const { email, apiKey } = getCredentials();
    if (!email || !apiKey) throw new Error('Cloudways credentials not found.');

    const res = await fetch('https://api.cloudways.com/api/v1/oauth/access_token', {
      method: 'POST',
      body: new URLSearchParams({ email, api_key: apiKey })
    });
    const data = await res.json();
    return data.access_token;
  },

  async getServerStatus(serverId: string) {
    const token = await this.getAccessToken();
    const res = await fetch(`https://api.cloudways.com/api/v1/server/${serverId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
  },

  async purgeVarnish(serverId: string, appId: string) {
    const token = await this.getAccessToken();
    const res = await fetch('https://api.cloudways.com/api/v1/service/varnish', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: new URLSearchParams({ server_id: serverId, app_id: appId, action: 'purge' })
    });
    return res.json();
  }
};
