import { IframeComponent } from "../components/iframe.component";

export function Iframe(editor, category = 'General') {
    const iframeComponent = IframeComponent(editor);

    editor.BlockManager.add('iframe-component', {
        label: 'Khung nhúng (Iframe)',
        category: category,
        media: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-frame-icon lucide-frame"><line x1="22" x2="2" y1="6" y2="6"/><line x1="22" x2="2" y1="18" y2="18"/><line x1="6" x2="6" y1="2" y2="22"/><line x1="18" x2="18" y1="2" y2="22"/></svg>`,
        content: { 
            type: iframeComponent 
        }
    });
}