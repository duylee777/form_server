export function SpacerComponent(editor) {
    const spacerType = 'spacer-component';

    editor.Components.addType(spacerType, {
        isComponent: el => (el.tagName === 'DIV' && el.getAttribute('data-gjs-type') === spacerType) ? { type: spacerType } : false,

        model: {
            defaults: {
                tagName: 'div',
                classes: ['spacer-block', 'w-full', 'h-8'],
                attributes: {
                    'data-gjs-type': spacerType,
                    'spacer_height': 'h-8'
                },
                traits: [
                    {
                        type: 'select',
                        label: 'Chiều cao (Height)',
                        name: 'spacer_height',
                        options: [
                            { id: 'h-4', name: 'Nhỏ (16px)' },
                            { id: 'h-8', name: 'Vừa (32px)' },
                            { id: 'h-12', name: 'Lớn (48px)' },
                            { id: 'h-16', name: 'Rất lớn (64px)' },
                            { id: 'h-24', name: 'Cực lớn (96px)' }
                        ]
                    }
                ]
            },

            init() {
                this.on('change:attributes:spacer_height', this.renderStructure);
                if (!this.components().length) {
                    this.renderStructure();
                }
            },

            renderStructure() {
                if (this.isRendering) return;
                this.isRendering = true;

                const attrs = this.getAttributes();
                const heightClass = attrs.spacer_height || 'h-8';

                // Cập nhật class trực tiếp vào thẻ DIV bọc ngoài
                this.setClass(['spacer-block', 'w-full', heightClass]);

                // Render một khoảng trống có gợi ý nhẹ trên canvas
                this.components(`
                    <div data-gjs-type="default" class="w-full h-full pointer-events-none"></div>
                `);

                this.isRendering = false;
            }
        }
    });

    return spacerType;
}