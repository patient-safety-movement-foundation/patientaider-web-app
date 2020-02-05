import qs from 'qs';

export default function translations(location, path) {
  const map = {
    title: {
      en: 'Where is the patient?',
      es: '¿Dónde está el paciente?',
      zh: '病人在哪裡',
      ar: 'أين المريض؟',
    },
    preparing: {
      en: 'At home, preparing',
      es: 'En casa, preparando',
      zh: '在家裡，準備中',
      ar: 'يستعد في المنزل',
    },
    inHospital: {
      en: 'In the hospital',
      es: 'En el hospital',
      zh: '在醫院',
      ar: 'في المستشفى',
    },
    recovering: {
      en: 'At home, recovering',
      es: 'En casa, recuperandose',
      zh: '在家裡，恢復中',
      ar: 'يتعافى في المنزل',
    },
    justBrowsing: {
      en: 'I don’t know, I’m just browsing…',
      es: 'No se, solo estoy navegando…',
      zh: '不知道，只是瀏覽一下',
      ar: 'لا أعرف، أنا فقط أتصفح...',
    },
    'tags.adult': {
      en: 'Adult',
      es: 'Adulto',
      zh: '成人',
      ar: 'البالغين',
    },
    'tags.pediatric': {
      en: 'Pediatric',
      es: 'Pediátrico',
      zh: '兒科',
      ar: 'الأطفال',
    },
    'tags.pregnancy': {
      en: 'Pregnancy',
      es: 'Embarazo',
      zh: '懷孕',
      ar: 'الحوامل',
    },
  };

  const language =
    qs.parse(location.search, {
      ignoreQueryPrefix: true,
    }).lang || 'en';

  return map[path][language];
}
