import axios from 'axios';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import Swiper from 'swiper';
import 'swiper/css';
import { createIcons, Mail, Lock } from 'lucide';

window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.grapesjs = grapesjs;
window.Swiper = Swiper;
createIcons({ icons: { Mail, Lock } });