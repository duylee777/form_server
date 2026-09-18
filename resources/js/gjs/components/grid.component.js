export function GridComponent(editor) {
    const gridType = 'grid-component';
    const itemType = 'dynamic-grid-item';

    // 1. Định nghĩa Ô lưới con (Cell)
    editor.Components.addType(itemType, {
        model: {
            defaults: {
                name: 'Ô lưới (Cell)',
                draggable: false, // Giữ cố định vị trí trong Grid
                droppable: true,  // Cho phép kéo thả các phần tử khác vào đây
                attributes: {
                    class: 'min-h-5 p-4 bg-gray-50 box-border'
                },
            }
        }
    });

    // 2. Định nghĩa Khung Lưới Cha (Grid Container)
    editor.Components.addType(gridType, {
        isComponent: el => (el.tagName === 'DIV' && el.getAttribute('data-gjs-type') === gridType) ? { type: gridType } : false,
        model: {
            defaults: {
                name: 'Khung Lưới (Grid)',
                droppable: `[data-gjs-type="${itemType}"]`,

                // 🟢 LƯU GIÁ TRỊ TRỰC TIẾP VÀO ATTRIBUTES CỦA THẺ HTML
                attributes: { 
                    'data-gjs-type': gridType,
                    'data-columns': '3',
                    'data-rows': '2',
                    'data-gap': '10'
                },

                // 🟢 ÁNH XẠ TRAIT THẲNG VÀO TÊN ATTRIBUTE
                traits: [
                    {
                        type: 'number',
                        label: 'Số cột (Columns)',
                        name: 'data-columns', // Lưu trực tiếp vào attribute data-columns
                        min: 1,
                        max: 12,
                        step: 1
                    },
                    {
                        type: 'number',
                        label: 'Số hàng (Rows)',
                        name: 'data-rows', // Lưu trực tiếp vào attribute data-rows
                        min: 1,
                        max: 10,
                        step: 1
                    },
                    {
                        type: 'number',
                        label: 'Khoảng cách Gap (px)',
                        name: 'data-gap', // Lưu trực tiếp vào attribute data-gap
                        min: 0,
                        max: 50,
                        step: 2
                    }
                ]
            },

            init() {
                // Lắng nghe khi thuộc tính HTML (attributes) thay đổi
                this.on('change:attributes:data-columns change:attributes:data-rows change:attributes:data-gap', this.updateGrid);
                this.updateGrid();
            },

            updateGrid() {
                // Đọc dữ liệu từ Attributes của thẻ
                const attrs = this.getAttributes();
                const cols = Math.max(1, parseInt(attrs['data-columns'] || 3, 10));
                const rows = Math.max(1, parseInt(attrs['data-rows'] || 2, 10));
                const gap = Math.max(0, parseInt(attrs['data-gap'] || 10, 10));

                // 1. Cập nhật CSS Grid
                this.addStyle({
                    'display': 'grid',
                    'grid-template-columns': `repeat(${cols}, 1fr)`,
                    'grid-template-rows': `repeat(${rows}, minmax(80px, auto))`,
                    'gap': `${gap}px`,
                    'width': '100%',
                    'box-sizing': 'border-box',
                    'padding': '1rem'
                });

                // 2. Đồng bộ số lượng ô con
                const totalNeeded = cols * rows;
                const children = this.components();
                const currentCount = children.length;

                if (currentCount < totalNeeded) {
                    for (let i = currentCount; i < totalNeeded; i++) {
                        children.add({ type: itemType });
                    }
                } else if (currentCount > totalNeeded) {
                    for (let i = currentCount - 1; i >= totalNeeded; i--) {
                        const itemToRemove = children.at(i);
                        if (itemToRemove) itemToRemove.remove();
                    }
                }
            }
        }
    });

    return gridType;
}