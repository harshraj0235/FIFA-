import teamsData from './data/teams.json';
import groupsData from './data/groups.json';
import venuesData from './data/venues.json';
import matchesData from './data/matches.json';
import timezonesData from './data/timezones.json';

export default function sitemap() {
  const baseUrl = 'https://fanscoreboard.com';
  
  // Base routes
  const routes = [
    '',
    '/teams',
    '/groups',
    '/venues',
    '/schedule',
    '/tools/timezone-converter',
    '/blog',
    '/about',
    '/privacy-policy',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily',
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Team pages
  const teamRoutes = teamsData.map((team) => ({
    url: `${baseUrl}/teams/${team.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // Group pages
  const groupRoutes = groupsData.map((group) => ({
    url: `${baseUrl}/groups/${group.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  // Venue pages
  const venueRoutes = venuesData.map((venue) => ({
    url: `${baseUrl}/venues/${venue.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // Match pages
  const matchRoutes = matchesData.map((match) => ({
    url: `${baseUrl}/matches/${match.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'hourly',
    priority: 0.9,
  }));

  // Timezone pages
  const timezoneRoutes = timezonesData.map((tz) => ({
    url: `${baseUrl}/timezone/${tz.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...routes, ...teamRoutes, ...groupRoutes, ...venueRoutes, ...matchRoutes, ...timezoneRoutes];
}
