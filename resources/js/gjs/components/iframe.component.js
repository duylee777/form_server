export function IframeComponent(editor) {
    const iframeType = 'iframe-component';

    editor.Components.addType(iframeType, {
        isComponent: el => (el.tagName === 'DIV' && el.getAttribute('data-gjs-type') === iframeType) ? { type: iframeType } : false,

        model: {
            defaults: {
                tagName: 'div',
                classes: ['p-4', 'iframe-wrapper', 'w-full', 'overflow-hidden', 'rounded-lg', 'shadow-sm'],
                attributes: {
                    'data-gjs-type': iframeType,
                    'iframe_src': 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                    'iframe_height': '400px',
                    'iframe_border': false
                },
                traits: [
                    { type: 'text', label: 'Đường dẫn (URL/Src)', name: 'iframe_src' },
                    { type: 'text', label: 'Chiều cao (Height)', name: 'iframe_height' },
                    { type: 'checkbox', label: 'Hiển thị khung viền', name: 'iframe_border' }
                ]
            },

            init() {
                this.on('change:attributes:iframe_src change:attributes:iframe_height change:attributes:iframe_border', this.renderStructure);
                if (!this.components().length) {
                    this.renderStructure();
                }
            },

            renderStructure() {
                if (this.isRendering) return;
                this.isRendering = true;

                const attrs = this.getAttributes();
                const src = attrs.iframe_src || 'https://www.youtube.com/embed/dQw4w9WgXcQ';
                const height = attrs.iframe_height || '400px';
                const hasBorder = (attrs.iframe_border === true || attrs.iframe_border === 'true');

                const borderClass = hasBorder ? 'border border-slate-300' : 'border-0';

                this.components(`
                    <iframe 
                        data-gjs-type="default" 
                        src="${src}" 
                        style="height: ${height};" 
                        class="w-full ${borderClass} rounded-lg" 
                        allowfullscreen 
                        loading="lazy">
                    </iframe>
                `);

                this.isRendering = false;
            }
        }
    });

    return iframeType;
}