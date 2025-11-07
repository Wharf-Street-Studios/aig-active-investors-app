/**
 * Simple time formatting utility
 * Replaces date-fns for better web compatibility
 */

export function formatTimeAgo(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;

    // For older dates, just show the date
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}/${day}`;
  } catch (error) {
    return 'recently';
  }
}
