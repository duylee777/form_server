export function AccordionComponent(editor) {
    const accordionType = 'accordion-component';

    editor.Components.addType(accordionType, {
        isComponent: el => (el.tagName === 'DIV' && el.getAttribute('data-gjs-type') === accordionType) ? { type: accordionType } : false,

        model: {
            defaults: {
                tagName: 'div',
                classes: ['accordion-item', 'border', 'border-slate-200', 'rounded-lg', 'p-4', 'overflow-hidden'],
                attributes: {
                    'data-gjs-type': accordionType,
                    'acc_title': 'Câu hỏi thường gặp: Sản phẩm có bảo hành không?',
                    'acc_content': 'Có, toàn bộ sản phẩm được bảo hành 12 tháng chính hãng và hỗ trợ đổi trả trong vòng 30 ngày đầu tiên.',
                    'acc_open': false
                },
                traits: [
                    { type: 'text', label: 'Tiêu đề câu hỏi', name: 'acc_title' },
                    { type: 'textarea', label: 'Nội dung trả lời', name: 'acc_content' },
                    { type: 'checkbox', label: 'Mở sẵn nội dung', name: 'acc_open' }
                ],
                // Tích hợp Script chạy khi xuất bản trang ngoài public
                script: function() {
                    var header = this.querySelector('.accordion-header');
                    var body = this.querySelector('.accordion-body');
                    var icon = this.querySelector('.accordion-icon');

                    if (header && body) {
                        header.addEventListener('click', function() {
                            var isHidden = body.classList.contains('hidden');
                            if (isHidden) {
                                body.classList.remove('hidden');
                                if (icon) icon.style.transform = 'rotate(180deg)';
                            } else {
                                body.classList.add('hidden');
                                if (icon) icon.style.transform = 'rotate(0deg)';
                            }
                        });
                    }
                }
            },

            init() {
                this.on('change:attributes:acc_title change:attributes:acc_content change:attributes:acc_open', this.renderStructure);
                if (!this.components().length) {
                    this.renderStructure();
                }
            },

            renderStructure() {
                if (this.isRendering) return;
                this.isRendering = true;

                const attrs = this.getAttributes();
                const title = attrs.acc_title || 'Câu hỏi thường gặp';
                const content = attrs.acc_content || 'Nội dung trả lời ở đây...';
                const isOpen = (attrs.acc_open === true || attrs.acc_open === 'true');

                const hiddenClass = isOpen ? '' : 'hidden';
                const iconRotate = isOpen ? 'rotate(180deg)' : 'rotate(0deg)';

                this.components(`
                    <div class="accordion-header flex justify-between items-center px-4 py-3 bg-slate-50 hover:bg-slate-100 cursor-pointer select-none transition-colors duration-150">
                        <span class="font-medium text-slate-800 text-sm">${title}</span>
                        <svg class="accordion-icon w-4 h-4 text-slate-500 transition-transform duration-200" style="transform: ${iconRotate};" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                    <div class="accordion-body px-4 py-3 bg-white text-sm text-slate-600 border-t border-slate-100 ${hiddenClass}">
                        ${content}
                    </div>
                `);

                this.isRendering = false;
            }
        }
    });

    return accordionType;
}
