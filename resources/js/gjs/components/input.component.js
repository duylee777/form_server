export function InputComponent(editor) {
    editor.Components.addType('input-component', {
        model: {
            defaults: {
                tagName: 'input',
                draggable: 'form, div',
                attributes: {
                    type: 'text',
                    name: '',
                    placeholder: '',
                },
                style: {
                    'width': '100%',
                    'padding': '10px',
                    'margin-bottom': '12px',
                    'border': '1px solid #cbd5e1',
                    'border-radius': '6px',
                    'box-sizing': 'border-box'
                },
                traits: [
                    {
                        type: 'select',
                        label: 'Loại Input',
                        name: 'type',
                        options: [
                            { id: 'text', name: 'Văn bản (Text)' },
                            { id: 'email', name: 'Email' },
                            { id: 'number', name: 'Số (Number)' },
                            { id: 'password', name: 'Mật khẩu' },
                            { id: 'hidden', name: 'Ẩn (Hidden)' },
                        ]
                    },
                    {
                        type: 'text',
                        label: 'Tên trường (Name)',
                        name: 'name',
                        placeholder: 'ví dụ: email_khach_hang'
                    },
                    {
                        type: 'text',
                        label: 'Gợi ý (Placeholder)',
                        name: 'placeholder',
                        placeholder: 'Nhập email...'
                    },
                    {
                        type: 'checkbox',
                        label: 'Bắt buộc nhập',
                        name: 'required',
                    }
                ],
            },
        },
        isComponent: el => {
            if (el.tagName === 'INPUT') {
                return { type: 'input-component' };
            }
        }
    });

    return 'input-component';
}