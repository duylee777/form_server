export function Layout2Cols(editor, category = 'General') {
    editor.BlockManager.add('layout-2-columns', {
        label: '2 Cột (50 / 50)',
        category: category,
        media: '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-columns2-icon lucide-columns-2"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M12 3v18"/></svg>',
        content: {
            tagName: 'div',
            droppable: '*', 
            attributes: {
                class: 'p-4 flex flex-wrap items-center gap-4'
            },
            components: [
                {
                    tagName: 'div',
                    droppable: '*', 
                    attributes: {
                        class: 'grow min-w-70 p-4'
                    },
                    components: [
                        {
                            tagName: 'p',
                            droppable: false, 
                            content: 'Nội dung cột 1 ...'
                        }
                    ]
                },
                {
                    tagName: 'div',
                    droppable: '*', 
                    attributes: {
                        class: 'grow min-w-70 p-4'
                    },
                    components: [
                        {
                            tagName: 'p',
                            droppable: false, 
                            content: 'Nội dung cột 2 ...'
                        }
                    ]
                },
            ]
        }
    });
}