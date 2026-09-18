export function Map(editor, category = 'General') {
    editor.BlockManager.add('map', {
        label: 'Bản đồ (Map)',
        category: category,
        media: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin-icon lucide-map-pin"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>`,
        content: {
            type: 'map', // Type map có sẵn trong GrapesJS
            style: {
                'height': '350px',
                'width': '100%'
            }
        }
    });
}