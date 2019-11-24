export const GITHUB_API_URL = user => `https://api.github.com/users/${user}`;
export const GITHUB_API_REPOS_URL = user => `https://api.github.com/users/${user}/repos`;

export default { GITHUB_API_URL, GITHUB_API_REPOS_URL }