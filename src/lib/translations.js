import qs from 'qs';

export default function translations(location, path) {
  const map = {
    title: {
      en: 'Where is the patient?',
      es: '¿Dónde está el paciente?',
      zh: '病人在哪裡？',
    },
    preparing: {
      en: 'At home, preparing',
      es: 'En casa, preparando',
      zh: '在家裡，準備中',
    },
    inHospital: {
      en: 'In the hospital',
      es: 'En el hospital',
      zh: '在醫院',
    },
    recovering: {
      en: 'At home, recovering',
      es: 'En casa, recuperandose',
      zh: '在家裡，恢復中',
    },
    justBrowsing: {
      en: 'I don’t know, I’m just browsing…',
      es: 'No se, solo estoy navegando…',
      zh: '不知道，只是瀏覽一下',
    },
  };

  const language =
    qs.parse(location.search, {
      ignoreQueryPrefix: true,
    }).lang || 'en';

  return map[path][language];
}
