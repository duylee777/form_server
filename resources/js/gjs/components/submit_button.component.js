export function SubmitButtonComponent(editor) {
    const buttonType = 'submit-button-component';

    editor.Components.addType(buttonType, {
        isComponent: el => (el.tagName === 'DIV' && el.getAttribute('data-gjs-type') === buttonType) ? { type: buttonType } : false,

        model: {
            defaults: {
                tagName: 'div',
                classes: ['form-group', 'mb-3'],
                attributes: {
                    'data-gjs-type': buttonType,
                    'button_text': 'Gửi dữ liệu',
                    'button_style': 'btn-primary'
                },
                traits: [
                    { type: 'text', label: 'Tên nút (Text)', name: 'button_text' },
                    {
                        type: 'select',
                        label: 'Giao diện',
                        name: 'button_style',
                        options: [
                            { id: 'btn-primary', name: 'Xanh dương' },
                            { id: 'btn-success', name: 'Xanh lá' },
                            { id: 'btn-dark', name: 'Tối màu' }
                        ]
                    }
                ]
            },

            init() {
                this.on('change:attributes:button_text change:attributes:button_style', this.renderContent);
                if (!this.components().length) {
                    this.renderContent();
                }
            },

            renderContent() {
                if (this.isRendering) return;
                this.isRendering = true;

                const attrs = this.getAttributes();
                const btnText = attrs.button_text || 'Gửi dữ liệu';
                const btnStyle = attrs.button_style || 'btn-primary';

                let colorClasses = 'bg-blue-600 hover:bg-blue-700 text-white';
                if (btnStyle === 'btn-success') colorClasses = 'bg-emerald-600 hover:bg-emerald-700 text-white';
                if (btnStyle === 'btn-dark') colorClasses = 'bg-slate-800 hover:bg-slate-900 text-white';

                this.components(`
                    <button data-gjs-type="default" type="submit" class="w-full px-4 py-2.5 rounded-md font-medium text-sm transition-colors duration-200 cursor-pointer shadow-sm ${colorClasses}">
                        ${btnText}
                    </button>
                `);

                this.isRendering = false;
            }
        }
    });

    return buttonType;
}