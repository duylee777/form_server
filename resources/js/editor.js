import grapesjs from "grapesjs";
import 'grapesjs/dist/css/grapes.min.css';
import beautify from 'js-beautify';
import Swiper from 'swiper';
import 'swiper/css';
import { javascript } from '@codemirror/lang-javascript';

window.grapesjs = grapesjs;
window.Swiper = Swiper;

document.addEventListener('DOMContentLoaded', () => {
    const editor = grapesjs.init({
        container: `#gjs-page-${window.pageId}`,
        height: '100vh',
        width: 'auto',
        fromElement: true,
        protectedCss: '',
        storageManager: false,
        allowScripts: true,
        forceId: false,
        selectorManager: {
            escapeName: name => name,
            componentFirst: true
        },
        assetManager: {
            headers: {
                'X-CSRF-TOKEN': '{{ csrf_token() }}'
            },
            uploadName: 'files',
            upload: window.uploadApi,
            autoAdd: true,
            // assets: images
        },
        canvas: {
            styles: [],
            scripts: []
        }
    });
});

