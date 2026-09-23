function slugForm(sourceField = 'name', targetField = 'slug') {
    return {
        // Khởi tạo dynamic key dựa trên tham số truyền vào
        [sourceField]: '',
        [targetField]: '',

        // Tự động điền Slug khi focus vào ô target
        generateSlugOnFocus() {
            if (!this[targetField] && this[sourceField]) {
                this[targetField] = this.createSlug(this[sourceField]);
            }
        },

        // Hàm chuyển đổi chuỗi thành Slug
        createSlug(str) {
        if (!str) return '';
        return str
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[đĐ]/g, 'd')
            .replace(/[^a-z0-9\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');
        }
    }
}

window.slugForm = slugForm;