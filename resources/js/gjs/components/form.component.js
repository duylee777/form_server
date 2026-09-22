export function FormComponent(editor) {
    // 1. Tự định nghĩa Component cho Thẻ <form>
    editor.Components.addType('form', {
        model: {
            defaults: {
                tagName: 'form',
                droppable: true, // Cho phép kéo các element khác vào trong form
                attributes: { 
                    method: 'POST', 
                    action: '',
                    class: 'p-4' 
                },
                // Khai báo các ô cấu hình trong tab Traits (Bánh răng)
                traits: [
                    {
                        type: 'select',
                        label: 'Phương thức (Method)',
                        name: 'method',
                        options: [
                            { id: 'POST', name: 'POST' },
                            { id: 'GET', name: 'GET' },
                        ]
                    },
                    {
                        type: 'text',
                        label: 'Đường dẫn API (Action)',
                        name: 'action',
                        placeholder: '/api/submit-form'
                    }
                ],
            }
        },
        // THÊM HÀM NÀY: Giúp GrapesJS nhận diện lại type khi nạp HTML thô
        isComponent: el => {
            if (el.tagName === 'FORM') {
                return { type: 'form' };
            }
        }
    });

    return 'form';
}