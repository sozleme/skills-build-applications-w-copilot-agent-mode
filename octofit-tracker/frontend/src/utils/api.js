export function getApiBaseUrl() {
  const { hostname, protocol } = window.location;

  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:8000/api';
  }

  // In Codespaces, derive backend URL from the frontend hostname
  const codespacesMatch = hostname.match(/^(.*)-3000\.app\.github\.dev$/);
  if (protocol === 'https:' && codespacesMatch) {
    return `https://${codespacesMatch[1]}-8000.app.github.dev/api`;
  }

  return `${protocol}//${hostname}:8000/api`;
}

export function getApiUrl(resourceName) {
  return `${getApiBaseUrl()}/${resourceName}/`;
}
