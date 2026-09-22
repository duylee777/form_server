export function Div(editor, category = 'General') {
    editor.BlockManager.add('div', {
        label: 'Div',
        category: category,
        media: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-icon lucide-square"><rect width="18" height="18" x="3" y="3" rx="2"/></svg>`,
        content: {
            tagName: 'div',
            droppable: '*', 
            attributes: {
                class: 'p-4'
            },
            components: [
                {
                    tagName: 'p',
                    content: 'Nội dung div ...',
                    droppable: false 
                },
            ]
        }
    });
}