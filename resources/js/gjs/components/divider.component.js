export function DividerComponent(editor) {
    const dividerType = 'divider-component';

    editor.Components.addType(dividerType, {
        isComponent: el => (el.tagName === 'DIV' && el.getAttribute('data-gjs-type') === dividerType) ? { type: dividerType } : false,

        model: {
            defaults: {
                tagName: 'div',
                classes: ['divider-wrapper', 'w-full', 'py-4'],
                attributes: {
                    'data-gjs-type': dividerType,
                    'border_style': 'border-solid',
                    'border_color': 'border-slate-300',
                    'border_width': 'border-t'
                },
                traits: [
                    {
                        type: 'select',
                        label: 'Kiểu đường kẻ',
                        name: 'border_style',
                        options: [
                            { id: 'border-solid', name: 'Nét liền (Solid)' },
                            { id: 'border-dashed', name: 'Nét đứt (Dashed)' },
                            { id: 'border-dotted', name: 'Nét chấm (Dotted)' }
                        ]
                    },
                    {
                        type: 'select',
                        label: 'Độ dày',
                        name: 'border_width',
                        options: [
                            { id: 'border-t', name: 'Mỏng (1px)' },
                            { id: 'border-t-2', name: 'Vừa (2px)' },
                            { id: 'border-t-4', name: 'Dày (4px)' }
                        ]
                    },
                    {
                        type: 'select',
                        label: 'Màu sắc',
                        name: 'border_color',
                        options: [
                            { id: 'border-slate-300', name: 'Xám nhạt' },
                            { id: 'border-slate-600', name: 'Xám đậm' },
                            { id: 'border-blue-500', name: 'Xanh dương' },
                            { id: 'border-emerald-500', name: 'Xanh lá' }
                        ]
                    }
                ]
            },

            init() {
                this.on('change:attributes:border_style change:attributes:border_width change:attributes:border_color', this.renderStructure);
                if (!this.components().length) {
                    this.renderStructure();
                }
            },

            renderStructure() {
                if (this.isRendering) return;
                this.isRendering = true;

                const attrs = this.getAttributes();
                const style = attrs.border_style || 'border-solid';
                const width = attrs.border_width || 'border-t';
                const color = attrs.border_color || 'border-slate-300';

                this.components(`
                    <hr data-gjs-type="default" class="w-full m-0 border-b-0 border-x-0 ${width} ${style} ${color}" />
                `);

                this.isRendering = false;
            }
        }
    });

    return dividerType;
}