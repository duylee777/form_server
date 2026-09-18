import { SaveTemplateCommand } from "../commands/save_template.command";

export function SaveTemplate(editor, templateId) {
    const saveTemplate = SaveTemplateCommand(editor, templateId);
    editor.Panels.addButton('options', {
        id: 'save-template',
        className: 'fa fa-save',
        command: saveTemplate,
        attributes: { title: 'Lưu giao diện' }
    });
}