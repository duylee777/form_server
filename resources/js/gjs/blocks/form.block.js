import { FormComponent } from "../components/form.component";

export function Form(editor, category = 'General') {
    const formComponent = FormComponent(editor);

    editor.BlockManager.add('form', {
        label: 'Form (Biểu mẫu)',
        category: category,
        media: '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 640 640"><path d="M544 139.2L544 500.9C544 525.2 525 544.1 500.8 544.1L139.2 544.1C115.3 544 96 525.4 96 500.8L96 139.2C96 115.1 114.8 96 139.2 96L500.9 96C524.9 96 544 114.8 544 139.2zM506.7 500.8L506.7 139.2C506.7 136.2 504.1 133.4 500.9 133.4L491.6 133.4L381.3 208L320 158.1L258.8 208L148.5 133.3L139.2 133.3C136 133.3 133.4 136.1 133.4 139.1L133.4 500.8C133.4 503.8 136 506.6 139.2 506.6L500.9 506.6C504.1 506.7 506.7 503.9 506.7 500.8zM246.2 250L246.2 287L172.7 287L172.7 250L246.2 250zM246.2 324.4L246.2 361.7L172.7 361.7L172.7 324.4L246.2 324.4zM257.3 177.1L311.3 133.4L192.8 133.4L257.3 177.1zM467.3 250L467.3 287L271.3 287L271.3 250L467.3 250zM467.3 324.4L467.3 361.7L271.3 361.7L271.3 324.4L467.3 324.4zM382.7 177.1L447.2 133.4L328.8 133.4L382.7 177.1zM467.3 399L467.3 436.3L367.9 436.3L367.9 399L467.3 399z"/></svg>',
        content: {
            type: formComponent,
            // content: `
            //     <!-- Tự động chèn CSRF Token của Laravel -->
            //     <input type="hidden" name="_token" value="${document.querySelector('meta[name="csrf-token"]')?.content || ''}">
                
            //     <div style="margin-bottom: 12px;">
            //         <label style="display:block; margin-bottom:4px; font-weight:600;">Họ và tên</label>
            //         <input type="text" name="fullname" placeholder="Nhập họ tên..." style="width:100%; padding:8px; border:1px solid #ccc; border-radius:4px;">
            //     </div>

            //     <button type="submit" style="background:#2563eb; color:#fff; padding:8px 16px; border:none; border-radius:4px; cursor:pointer;">
            //         Gửi thông tin
            //     </button>
            // `,
            components: [
                {
                    tagName: 'input',
                    droppable: false,
                    attributes: {
                        type: 'hidden',
                        name: '_token',
                        value: document.querySelector('meta[name="csrf-token"]')?.content || ''
                    },
                    
                },
                {
                    tagName: 'p',
                    droppable: false,
                    attributes: {
                        class: 'p-4'
                    },
                    content: 'Nội dung biểu mẫu ...'
                },
                {
                    tagName: 'div',
                    droppable: '*',
                    attributes: {
                        class: 'w-full p-4 flex items-center justify-start',
                    },
                    components: [
                        {
                            tagName: 'button',
                            droppable: '*',
                            attributes: {
                                type: 'submit',
                                class: 'text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800',
                            },
                            content: 'Lưu'
                        }
                    ]
                }
            ]
        }
    });
}