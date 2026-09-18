export function SelectTrait(editor) {
    editor.TraitManager.addType('options-manager', {
        createInput({ trait, component }) {
            const el = document.createElement('div');
            el.className = 'gjs-options-manager-container';

            // Lấy danh sách options từ component (hoặc khởi tạo mặc định)
            let options = component.get('options_data') || [
                { label: 'Lựa chọn 1', value: 'option1' },
                { label: 'Lựa chọn 2', value: 'option2' }
            ];

            const render = () => {
                el.innerHTML = '';

                // Khung chứa các dòng
                const listContainer = document.createElement('div');
                listContainer.style.cssText = 'display: flex; flex-direction: column; gap: 6px; margin-bottom: 8px;';

                options.forEach((opt, index) => {
                    const row = document.createElement('div');
                    row.style.cssText = 'display: flex; align-items: center; gap: 4px;';

                    // 1. Ô nhập Nhãn (Label)
                    const inputLabel = document.createElement('input');
                    inputLabel.type = 'text';
                    inputLabel.placeholder = 'Nhãn';
                    inputLabel.value = opt.label || '';
                    inputLabel.style.cssText = 'flex: 1; width: 0; padding: 5px; font-size: 11px; border: 1px solid #444; background: #2a2a2a; color: #fff; border-radius: 3px;';
                    inputLabel.oninput = (e) => {
                        options[index].label = e.target.value;
                        updateData();
                    };

                    // 2. Ô nhập Giá trị (Value)
                    const inputValue = document.createElement('input');
                    inputValue.type = 'text';
                    inputValue.placeholder = 'Giá trị';
                    inputValue.value = opt.value || '';
                    inputValue.style.cssText = 'flex: 1; width: 0; padding: 5px; font-size: 11px; border: 1px solid #444; background: #2a2a2a; color: #fff; border-radius: 3px;';
                    inputValue.oninput = (e) => {
                        options[index].value = e.target.value;
                        updateData();
                    };

                    // 3. Nút Xóa dòng
                    const btnDelete = document.createElement('button');
                    btnDelete.type = 'button';
                    btnDelete.innerHTML = '✕';
                    btnDelete.title = 'Xóa dòng';
                    btnDelete.style.cssText = 'padding: 4px 8px; background: #ef4444; color: #fff; border: none; border-radius: 3px; cursor: pointer; font-size: 11px; font-weight: bold;';
                    btnDelete.onclick = () => {
                        options.splice(index, 1);
                        updateData();
                        render(); // Render lại danh sách
                    };

                    row.appendChild(inputLabel);
                    row.appendChild(inputValue);
                    row.appendChild(btnDelete);
                    listContainer.appendChild(row);
                });

                // 4. Nút Thêm Option (+)
                const btnAdd = document.createElement('button');
                btnAdd.type = 'button';
                btnAdd.innerHTML = '+ Thêm Option';
                btnAdd.style.cssText = 'width: 100%; padding: 6px; background: #2563eb; color: #fff; border: none; border-radius: 3px; cursor: pointer; font-size: 12px; font-weight: 500;';
                btnAdd.onclick = () => {
                    const newIndex = options.length + 1;
                    options.push({ label: `Lựa chọn ${newIndex}`, value: `option${newIndex}` });
                    updateData();
                    render(); // Render lại danh sách
                };

                el.appendChild(listContainer);
                el.appendChild(btnAdd);
            };

            const updateData = () => {
                // Cập nhật lại thuộc tính vào Model và kích hoạt sự kiện thay đổi
                component.set('options_data', [...options]);
                component.trigger('change:options_data');
            };

            render();
            return el;
        }
    });

    return 'options-manager';
}