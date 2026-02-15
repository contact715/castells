# 📊 Настройка аналитики

## Google Analytics 4

### Шаг 1: Получить Measurement ID

1. Перейдите в [Google Analytics](https://analytics.google.com/)
2. Создайте новое свойство (Property) или используйте существующее
3. Скопируйте Measurement ID (формат: `G-XXXXXXXXXX`)

### Шаг 2: Добавить в проект

1. Создайте файл `.env` в корне проекта (скопируйте из `.env.example`)
2. Добавьте ваш Measurement ID:
   ```
   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
3. Перезапустите dev server

### Шаг 3: Проверить работу

1. Откройте сайт в браузере
2. Откройте DevTools → Network
3. Найдите запросы к `googletagmanager.com`
4. В Google Analytics → Realtime → Events должны появляться события

---

## Отслеживаемые события

### Автоматические события:
- ✅ **Page View** - просмотр страницы
- ✅ **Scroll Depth** - глубина прокрутки (25%, 50%, 75%, 90%, 100%)
- ✅ **Time on Page** - время на странице (30s, 1m, 2m, 5m, 10m)

### События, которые нужно добавить вручную:

#### CTA кнопки:
```typescript
import { trackCTAClick } from '@/lib/analytics';

<Button onClick={() => {
  trackCTAClick('Start Your Project', 'Hero Section');
  // ... остальной код
}}>
```

#### Формы:
```typescript
import { trackFormSubmit } from '@/lib/analytics';

const handleSubmit = async (data) => {
  trackFormSubmit('Contact Form', { topic: data.topic });
  // ... отправка формы
};
```

#### Просмотр кейсов:
```typescript
import { trackCaseStudyView } from '@/lib/analytics';

useEffect(() => {
  trackCaseStudyView(caseStudy.id, caseStudy.client);
}, [caseStudy]);
```

#### Просмотр блога:
```typescript
import { trackBlogPostView } from '@/lib/analytics';

useEffect(() => {
  trackBlogPostView(post.id, post.title);
}, [post]);
```

---

## Доступные функции трекинга

Все функции находятся в `lib/analytics.ts`:

- `pageview(url)` - просмотр страницы
- `event({ action, category, label, value })` - кастомное событие
- `trackFormSubmit(formName, formData)` - отправка формы
- `trackCTAClick(ctaName, location)` - клик по CTA
- `trackScrollDepth(depth)` - глубина прокрутки
- `trackTimeOnPage(seconds)` - время на странице
- `trackOutboundLink(url, linkText)` - клик по внешней ссылке
- `trackVideoPlay(videoName, videoUrl)` - воспроизведение видео
- `trackSearch(searchTerm, resultsCount)` - поиск
- `trackCaseStudyView(caseStudyId, caseStudyName)` - просмотр кейса
- `trackBlogPostView(postId, postTitle)` - просмотр поста

---

## Настройка конверсионных целей в GA4

1. Перейдите в GA4 → Admin → Events
2. Отметьте нужные события как "Mark as conversion":
   - `submit` (Form) - отправка формы
   - `click` (CTA) - клик по CTA
   - `view` (Case Study) - просмотр кейса

---

## Отладка

Если события не отслеживаются:

1. Проверьте, что `VITE_GA_MEASUREMENT_ID` установлен в `.env`
2. Проверьте консоль браузера на ошибки
3. Используйте [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna) для отладки
4. Проверьте Network tab - должны быть запросы к `googletagmanager.com`

---

**Готово!** Аналитика настроена и работает. 🎉

