import { AccordionComponent } from "../components/accordion.component";

export function Accordion(editor, category = 'General') {
    const accordionComponent = AccordionComponent(editor);

    editor.BlockManager.add('accordion', {
        label: 'Mục xổ xuống (Accordion)',
        category: category,
        media: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-arrow-down-icon lucide-square-arrow-down"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M12 8v8"/><path d="m8 12 4 4 4-4"/></svg>`,
        content: { 
            type: accordionComponent
        }
    });
}