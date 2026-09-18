export function HeadingComponent(editor) {
    editor.Components.addType('heading-component', {
        model: {
            defaults: {
                tagName: 'h2', 
                content: 'Tiêu đề của bạn',
                type: 'text', 
                traits: [
                    {
                        type: 'select',
                        label: 'Cấp Tiêu Đề',
                        name: 'heading-tag', // Tên nhận diện trait
                        options: [
                            { id: 'h1', name: 'Heading 1 (H1)' },
                            { id: 'h2', name: 'Heading 2 (H2)' },
                            { id: 'h3', name: 'Heading 3 (H3)' },
                            { id: 'h4', name: 'Heading 4 (H4)' },
                            { id: 'h5', name: 'Heading 5 (H5)' },
                        ],
                        // Đọc giá trị trực tiếp từ thuộc tính tagName của component
                        changeProp: true, 
                    }
                ],
                style: {
                    'font-weight': 'bold',
                    'color': '#0f172a',
                    'margin-bottom': '15px'
                }
            },

            init() {
                // Lắng nghe sự thay đổi thuộc tính tagName hệ thống từ trait (nhờ changeProp: true)
                this.on('change:tagName', this.handleTagNameChange);
            },

            handleTagNameChange() {
                const newTag = this.get('tagName'); // Lấy thẻ mới được chọn (h1, h2, h3...)
                const parent = this.parent();
                
                if (parent && newTag) {
                    // 1. Giữ lại nội dung chữ hiện tại
                    const currentContent = this.get('content') || this.getHtml() || 'Tiêu đề của bạn';
                    // 2. Giữ lại style hiện tại
                    const currentStyles = { ...this.get('style') };
                    // 3. Tìm vị trí hiện tại trong node cha
                    const index = parent.components().indexOf(this);
                    
                    // 4. Tạo component mới thay thế
                    const newComponent = parent.append({
                        type: 'heading-component',
                        tagName: newTag, // Gán thẻ mới
                        content: currentContent,
                        style: currentStyles,
                    }, { at: index });

                    // 5. Xóa bỏ component cũ
                    this.remove();

                    // 6. Chọn lại component mới để cập nhật mượt mà thanh Settings
                    setTimeout(() => {
                        editor.select(newComponent);
                    }, 50);
                }
            }
        }
    });

    return 'heading-component'; 
}
