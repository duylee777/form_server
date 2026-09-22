export function IconComponent(editor) {
    const iconType = 'icon-component';

    // Bộ thư viện SVG sẵn có
    const SVG_ICONS = {
        'check': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-full h-full"><path d="M20 6L9 17l-5-5"/></svg>`,
        'star': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-full h-full"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
        'heart': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-full h-full"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
        'bell': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-full h-full"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,
        'shield': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-full h-full"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`
    };

    editor.Components.addType(iconType, {
        isComponent: el => (el.tagName === 'DIV' && el.getAttribute('data-gjs-type') === iconType) ? { type: iconType } : false,

        model: {
            defaults: {
                tagName: 'div',
                classes: ['icon-wrapper', 'inline-flex', 'items-center', 'justify-center'],
                attributes: {
                    'data-gjs-type': iconType,
                    'icon_name': 'check',
                    'icon_size': 'w-6 h-6',
                    'icon_color': 'text-blue-600'
                },
                traits: [
                    {
                        type: 'select',
                        label: 'Chọn Biểu tượng',
                        name: 'icon_name',
                        options: [
                            { id: 'check', name: 'Dấu tích (Check)' },
                            { id: 'star', name: 'Ngôi sao (Star)' },
                            { id: 'heart', name: 'Trái tim (Heart)' },
                            { id: 'bell', name: 'Chuông (Bell)' },
                            { id: 'shield', name: 'Bảo mật (Shield)' }
                        ]
                    },
                    {
                        type: 'select',
                        label: 'Kích thước',
                        name: 'icon_size',
                        options: [
                            { id: 'w-4 h-4', name: 'Nhỏ (16px)' },
                            { id: 'w-6 h-6', name: 'Vừa (24px)' },
                            { id: 'w-8 h-8', name: 'Lớn (32px)' },
                            { id: 'w-12 h-12', name: 'Rất lớn (48px)' }
                        ]
                    },
                    {
                        type: 'select',
                        label: 'Màu sắc',
                        name: 'icon_color',
                        options: [
                            { id: 'text-blue-600', name: 'Xanh dương' },
                            { id: 'text-emerald-600', name: 'Xanh lá' },
                            { id: 'text-red-500', name: 'Đỏ' },
                            { id: 'text-amber-500', name: 'Vàng/Cam' },
                            { id: 'text-slate-700', name: 'Xám đậm' }
                        ]
                    }
                ]
            },

            init() {
                this.on('change:attributes:icon_name change:attributes:icon_size change:attributes:icon_color', this.renderStructure);
                if (!this.components().length) {
                    this.renderStructure();
                }
            },

            renderStructure() {
                if (this.isRendering) return;
                this.isRendering = true;

                const attrs = this.getAttributes();
                const name = attrs.icon_name || 'check';
                const size = attrs.icon_size || 'w-6 h-6';
                const color = attrs.icon_color || 'text-blue-600';

                const svgContent = SVG_ICONS[name] || SVG_ICONS['check'];

                this.components(`
                    <span data-gjs-type="default" class="inline-block ${size} ${color}">
                        ${svgContent}
                    </span>
                `);

                this.isRendering = false;
            }
        }
    });

    return iconType;
}