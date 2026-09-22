import { SelectComponent } from "../components/select.component";

export function Select(editor, category = 'General') {
    const select = SelectComponent(editor);

    editor.BlockManager.add('select', {
        label: 'Danh sách chọn (Select)',
        category: category,
        media: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-list-chevrons-up-down-icon lucide-list-chevrons-up-down"><path d="M3 5h8"/><path d="M3 12h8"/><path d="M3 19h8"/><path d="m15 8 3-3 3 3"/><path d="m15 16 3 3 3-3"/></svg>`,
        content: { 
            type: select 
        }
    });
}