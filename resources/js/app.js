import { 
    createIcons,
    Mail,
    Lock
} from 'lucide';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import Swiper from 'swiper';
import 'swiper/css';

createIcons({
    icons: {
        Mail,
        Lock
    }
});

window.grapesjs = grapesjs;
window.Swiper = Swiper;
