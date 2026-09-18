import { ViewSourceCommand } from "../commands/view_source.command";

export function ViewSourceComponent(editor) {
    const openViewSourceModal = ViewSourceCommand(editor);

    editor.on('component:selected', (model) => {
        const toolbar = model.get('toolbar') || [];
        const exists = toolbar.some(item => item.id === 'view-source');
        
        if (!exists) {
            toolbar.unshift({
                id: 'view-source',
                label: '<i class="fa fa-code" style="color: #ffffff;"></i>',
                command: openViewSourceModal,
                attributes: { title: 'Xem & Sửa Code phân vùng này' }
            });
            model.set('toolbar', toolbar);
        }
    });
}