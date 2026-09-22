export function Section(editor, category = 'General') {
    editor.BlockManager.add('section', {
        label: 'Section',
        category: category,
        media: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-box-icon lucide-box"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>`,
        content: {
            tagName: 'div',
            droppable: '*', 
            attributes: {
                class: 'w-full p-4'
            },
            components: [
                {
                    tagName: 'p',
                    content: 'Nội dung section ...',
                    droppable: false 
                },
            ]
        }
    });
}