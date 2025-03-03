import { nanoid } from 'nanoid';
import { ShortLink } from '../types';

// Local storage key
const STORAGE_KEY = 'short_links';

// Generate a short ID
export const generateShortId = (): string => {
  return nanoid(8);
};

// Save links to local storage
export const saveLinks = (links: ShortLink[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
};

// Get links from local storage
export const getLinks = (): ShortLink[] => {
  const linksJson = localStorage.getItem(STORAGE_KEY);
  if (!linksJson) return [];
  try {
    return JSON.parse(linksJson);
  } catch (e) {
    console.error('Failed to parse links from localStorage', e);
    return [];
  }
};

// Create a new short link
export const createShortLink = (
  originalUrl: string,
  refreshInterval: number | null
): ShortLink => {
  const now = Date.now();
  return {
    id: generateShortId(),
    originalUrl,
    createdAt: now,
    updatedAt: now,
    refreshInterval,
    nextRefreshAt: refreshInterval ? now + refreshInterval : null,
    accessCount: 0,
  };
};

// Add a new link to storage
export const addLink = (link: ShortLink): void => {
  const links = getLinks();
  links.push(link);
  saveLinks(links);
};

// Get a link by ID
export const getLinkById = (id: string): ShortLink | undefined => {
  return getLinks().find((link) => link.id === id);
};

// Update a link
export const updateLink = (updatedLink: ShortLink): void => {
  const links = getLinks();
  const index = links.findIndex((link) => link.id === updatedLink.id);
  if (index !== -1) {
    links[index] = updatedLink;
    saveLinks(links);
  }
};

// Delete a link
export const deleteLink = (id: string): void => {
  const links = getLinks();
  const filteredLinks = links.filter((link) => link.id !== id);
  saveLinks(filteredLinks);
};

// Refresh a QR code (update the timestamp)
export const refreshQRCode = (id: string): ShortLink | undefined => {
  const link = getLinkById(id);
  if (!link) return undefined;
  
  const now = Date.now();
  const updatedLink: ShortLink = {
    ...link,
    updatedAt: now,
    nextRefreshAt: link.refreshInterval ? now + link.refreshInterval : null,
  };
  
  updateLink(updatedLink);
  return updatedLink;
};

// Check and process links that need auto-refresh
export const processAutoRefreshLinks = (): string[] => {
  const now = Date.now();
  const links = getLinks();
  const refreshedIds: string[] = [];
  
  links.forEach((link) => {
    if (link.nextRefreshAt && link.nextRefreshAt <= now) {
      // Time to refresh this link
      link.updatedAt = now;
      link.nextRefreshAt = link.refreshInterval ? now + link.refreshInterval : null;
      refreshedIds.push(link.id);
    }
  });
  
  if (refreshedIds.length > 0) {
    saveLinks(links);
  }
  
  return refreshedIds;
};

// 增加访问计数
export const incrementAccessCount = (id: string): void => {
  const link = getLinkById(id);
  if (!link) return;
  
  const updatedLink: ShortLink = {
    ...link,
    accessCount: link.accessCount + 1,
  };
  
  updateLink(updatedLink);
};

// 获取状态颜色
export const getStatusColor = (accessCount: number): string => {
  if (accessCount >= 110) return 'red';
  if (accessCount >= 80) return 'yellow';
  return 'green';
};