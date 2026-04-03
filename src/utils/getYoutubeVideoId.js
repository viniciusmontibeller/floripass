export function getYoutubeVideoId(url) {
    try {
        const parsed = new URL(url);

        // youtu.be/VIDEO_ID
        if (parsed.hostname.includes('youtu.be')) {
        return parsed.pathname.split('/').filter(Boolean)[0] ?? null;
        }

        // youtube.com/shorts/VIDEO_ID
        if (parsed.pathname.startsWith('/shorts/')) {
        return parsed.pathname.split('/')[2] ?? null;
        }

        // youtube.com/embed/VIDEO_ID
        if (parsed.pathname.startsWith('/embed/')) {
        return parsed.pathname.split('/')[2] ?? null;
        }

        // youtube.com/watch?v=VIDEO_ID
        return parsed.searchParams.get('v');
    } catch {
        return null;
    }
}