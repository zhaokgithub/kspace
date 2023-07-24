import { createI18n } from 'vue-i18n'
import en from './en';
import cn from './zh-cn';
console.log('cn: ', cn);


const currentLang = localStorage.getItem('lang') || 'en';
const il8n = createI18n({
    locale: currentLang,
    legacy: false,
    globalInjection: true,
    messages: {
        en,
        cn
    }
})


export default il8n;