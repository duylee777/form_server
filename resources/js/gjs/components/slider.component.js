export function SlideComponent(editor) {
    const sliderType = 'slider-component';
    
    // 1. Component Swiper Slider
    editor.Components.addType(sliderType, {
        isComponent: el => (el.tagName === 'DIV' && el.getAttribute('data-gjs-type') === sliderType) ? { type: sliderType } : false,
        model: {
            defaults: {
                tagName: 'div',
                classes: ['swiper', 'mySwiper'],
                // CSS ÉP SLIDER CHỈ RỘNG BẰNG CỘT CHỨA NÓ
                style: { 
                    'width': '100%', 
                    'max-width': '100%', 
                    'height': '350px', 
                    'position': 'relative',
                    'box-sizing': 'border-box'
                },
                
                height_num: 350,

                attributes: {
                    'data-gjs-type': sliderType,
                    'slides_data': JSON.stringify([
                        { url: 'https://picsum.photos/800/400?random=1' },
                        { url: 'https://picsum.photos/800/400?random=2' },
                        { url: 'https://picsum.photos/800/400?random=3' }
                    ])
                },

                traits: [
                    {
                        type: 'number',
                        label: 'Chiều cao (px)',
                        name: 'height_num',
                        placeholder: '350',
                        min: 100,
                        max: 1000,
                        step: 10,
                        changeProp: 1
                    },
                    {
                        type: 'slides-manager',
                        name: 'slides_data'
                    }
                ],

                // SCRIPT TỰ ĐỘNG KHỞI TẠO VÀ TÍNH TOÁN THEO KÍCH THƯỚC CỘT
                script: function() {
                    var el = this;

                    var initSwiper = function() {
                        if (typeof Swiper === 'undefined') {
                            setTimeout(initSwiper, 100);
                            return;
                        }

                        if (el.swiperObserver) {
                            el.swiperObserver.disconnect();
                        }

                        if (el.swiperInstance) {
                            try { el.swiperInstance.destroy(true, true); } catch (err) {}
                        }

                        // KHỞI TẠO SWIPER CÓ BẬT OBSERVER KÍCH THƯỚC CỘT
                        el.swiperInstance = new Swiper(el, {
                            loop: true,
                            observer: true,         // Theo dõi thay đổi trong DOM
                            observeParents: true,   // Theo dõi thay đổi kích thước của Cột cha
                            resizeObserver: true,   // Tự động reload width khi resize màn hình
                            autoplay: { delay: 3000, disableOnInteraction: false },
                            pagination: { el: el.querySelector('.swiper-pagination'), clickable: true },
                            navigation: {
                                nextEl: el.querySelector('.swiper-button-next'),
                                prevEl: el.querySelector('.swiper-button-prev'),
                            },
                        });

                        if (window.MutationObserver) {
                            if (!el.swiperObserver) {
                                el.swiperObserver = new MutationObserver(function() {
                                    initSwiper();
                                });
                            }
                            el.swiperObserver.observe(el, { childList: true, subtree: true });
                        }
                    };

                    initSwiper();
                }
            },

            init() {
                this.on('change:attributes:slides_data', this.renderSlidesFromData);
                this.on('change:height_num', this.onHeightChange);

                if (!this.components().length) {
                    this.renderSlidesFromData();
                }
            },

            onHeightChange() {
                const h = this.get('height_num') || 350;
                this.addStyle({ height: `${h}px` });
            },

            renderSlidesFromData() {
                const attrs = this.getAttributes();
                let slides = [];
                try { slides = JSON.parse(attrs.slides_data || '[]'); } catch (e) { slides = []; }

                let slidesHtml = slides.map(item => `
                    <div class="swiper-slide" style="width: 100%; height: 100%; max-width: 100%;">
                        <img src="${item.url}" style="width: 100%; height: 100%; object-fit: cover; display: block;" />
                    </div>
                `).join('');

                this.components(`
                    <div class="swiper-wrapper" style="width: 100%; height: 100%;">
                        ${slidesHtml}
                    </div>
                    <div class="swiper-pagination"></div>
                    <div class="swiper-button-prev"></div>
                    <div class="swiper-button-next"></div>
                `);
            }
        }
    });

    // 2. Trait Manager 
    editor.Traits.addType('slides-manager', {
        noLabel: true,
        createInput({ trait }) {
            const el = document.createElement('div');
            el.className = 'slides-manager-wrapper';
            el.style.cssText = 'margin-top: 10px; border-top: 1px solid #ccc; padding-top: 10px;';
            
            const component = trait.target; 
            if (!component) return el;

            let slides = [];
            try { slides = JSON.parse(component.getAttributes().slides_data || '[]'); } 
            catch (e) { slides = []; }

            const updateModel = () => component.addAttributes({ slides_data: JSON.stringify(slides) });

            const renderList = () => {
                el.innerHTML = '';
                slides.forEach((slide, index) => {
                    const itemEl = document.createElement('div');
                    itemEl.style.cssText = 'padding: 6px; border: 1px solid #ddd; margin-bottom: 6px; border-radius: 4px; background: #fff;';
                    itemEl.innerHTML = `
                        <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 11px; margin-bottom: 4px; color: #333;">
                            <span>Slide ${index + 1}</span>
                            <span class="btn-del" style="color: red; cursor: pointer;">✕ Xóa</span>
                        </div>
                        <input type="text" class="input-url" value="${slide.url || ''}" placeholder="URL ảnh..." style="width: 100%; box-sizing: border-box; padding: 4px; font-size: 11px;" />
                    `;

                    itemEl.querySelector('.input-url').addEventListener('change', (e) => {
                        slides[index].url = e.target.value;
                        updateModel();
                    });

                    itemEl.querySelector('.btn-del').addEventListener('click', () => {
                        if (slides.length <= 1) return alert('Cần giữ ít nhất 1 slide!');
                        slides.splice(index, 1);
                        updateModel();
                        renderList();
                    });

                    el.appendChild(itemEl);
                });

                const addBtn = document.createElement('button');
                addBtn.type = 'button';
                addBtn.innerText = '➕ Thêm Slide mới';
                addBtn.style.cssText = 'width: 100%; padding: 6px; cursor: pointer; background: #2563eb; color: #fff; border: none; border-radius: 4px; font-size: 11px; font-weight: bold;';
                addBtn.addEventListener('click', () => {
                    slides.push({ url: `https://picsum.photos/800/400?random=${Math.floor(Math.random() * 1000)}` });
                    updateModel();
                    renderList();
                });
                el.appendChild(addBtn);
            };

            renderList();
            return el;
        }
    });

    return sliderType;
}