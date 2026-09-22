export function Video(editor, category = 'General') {
    editor.BlockManager.add('video', {
        label: 'Video',
        category: category,
        media: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-video-icon lucide-video"><path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/></svg>`,
        content: {
            type: 'video', // Dùng type video sẵn có của GrapesJS
            provider: 'so', // Mặc định hỗ trợ nhiều nguồn (YouTube, Vimeo...)
            src: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            style: {
                'height': '350px',
                'width': '100%'
            }
        }
    });
}