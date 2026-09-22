import { HeadingComponent } from "../components/heading.component";

export function Heading(editor, category = 'General') {
    const headingComponent = HeadingComponent(editor);

    editor.BlockManager.add('heading', {
        label: 'Tiêu đề tùy chọn (H1-H5)',
        category: category,
        media: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heading-icon lucide-heading"><path d="M6 12h12"/><path d="M6 20V4"/><path d="M18 20V4"/></svg>`,
        content: {
            type: headingComponent // Gọi type đã định nghĩa ở trên
        }
    });
}