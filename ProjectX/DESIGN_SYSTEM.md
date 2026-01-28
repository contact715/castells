# 🎨 THALASSA DESIGN SYSTEM

**Единая система дизайна для всех модулей проекта Castells**

> ⚠️ **ВАЖНО**: При создании любого нового модуля, страницы или компонента **ОБЯЗАТЕЛЬНО** следуй этим стандартам. Не изобретай новые стили!

---

## 📐 ОСНОВНЫЕ ПРИНЦИПЫ

1. **Светлая тема** - все модули используют светлую тему
2. **Единообразие** - все элементы должны выглядеть одинаково во всех модулях
3. **Контрастность** - карточки должны быть хорошо видны на фоне
4. **Закругления** - используй только стандартные радиусы

---

## 🎨 ЦВЕТОВАЯ ПАЛИТРА

### Основные цвета

```css
/* Фон страницы */
background: linear-gradient(135deg, #F5F8FA 0%, #E8F4F8 50%, #D9EAF7 100%)

/* Основной контент (main) */
bg-white rounded-container
shadow-[0_2px_8px_rgba(0,0,0,0.04),0_4px_16px_rgba(0,0,0,0.04)]
border border-gray-200/60

/* Карточки (Card) */
bg-[#D4E6F1]
border border-gray-300/30
shadow-[0_4px_12px_rgba(0,0,0,0.1),0_8px_24px_rgba(0,0,0,0.06)]
rounded-card

/* Внутренние элементы внутри карточек */
bg-white/40 rounded-inner
border border-gray-200/50 (если нужна граница)

/* Активные элементы (выбранные пункты меню, активные табы) */
bg-[#D4E6F1] text-gray-900 font-medium
```

### Текст

```css
/* Основной текст */
text-gray-900 (заголовки, важный текст)

/* Вторичный текст */
text-gray-600 (описания, обычный текст)

/* Третичный текст (метки, подсказки) */
text-gray-500 (мелкий текст, метаданные)

/* Неактивный текст */
text-gray-400 (disabled состояния)
```

### Акцентные цвета

```css
/* Primary кнопки */
bg-primary text-white (кнопки primary - синий #3B82F6)
bg-blue-100 text-blue-600 (иконки, бейджи)
hover:bg-primary/90 (hover состояния)

/* Успех */
bg-emerald-100 text-emerald-600
bg-emerald-500 text-white

/* Ошибка */
bg-red-100 text-red-600
bg-red-500 text-white

/* Предупреждение */
bg-amber-100 text-amber-600
```

---

## 🔲 ЗАКРУГЛЕНИЯ (Border Radius)

**Используй ТОЛЬКО эти классы:**

```css
rounded-container  /* 20px - основные блоки (sidebar, header, main) */
rounded-card        /* 20px - карточки */
rounded-inner       /* 20px - элементы внутри карточек */
rounded-element     /* 12px - мелкие элементы (кнопки, инпуты, бейджи) */
rounded-pill        /* 9999px - pill формы */
```

**НЕ используй:**
- `rounded-lg`, `rounded-xl`, `rounded-2xl` (используй стандартные классы)
- Произвольные значения типа `rounded-[10px]`

---

## 📦 КОМПОНЕНТЫ

### Card (Карточка)

```tsx
<Card className="p-6">
  {/* Контент */}
</Card>
```

**Стили по умолчанию:**
- `bg-[#D4E6F1]`
- `border border-gray-300/30`
- `shadow-[0_4px_12px_rgba(0,0,0,0.1),0_8px_24px_rgba(0,0,0,0.06)]`
- `rounded-card` (20px)

**Внутри карточки:**
- Вложенные элементы: `bg-white/40 rounded-inner`
- Отступы: `p-4`, `p-6` в зависимости от размера

### Button (Кнопка)

```tsx
<Button variant="primary">Текст</Button>
<Button variant="secondary">Текст</Button>
<Button variant="outline">Текст</Button>
<Button variant="ghost">Текст</Button>
```

**Варианты:**
- `primary`: `bg-primary text-white hover:bg-primary/90`
- `secondary`: `bg-gray-100 text-gray-700 hover:bg-gray-200`
- `outline`: `bg-transparent border border-gray-200 text-gray-700`
- `ghost`: `text-gray-600 hover:text-gray-900 hover:bg-gray-100`

**Размеры:**
- `sm`: `px-3 py-1.5 text-xs rounded-inner`
- `md`: `px-4 py-2 text-sm rounded-inner` (по умолчанию)
- `lg`: `px-6 py-2.5 text-base rounded-inner`

### Badge (Бейдж)

```tsx
<Badge variant="default">Текст</Badge>
<Badge variant="success">Текст</Badge>
<Badge variant="info">Текст</Badge>
```

**Варианты:**
- `default`: `bg-gray-100 text-gray-700`
- `success`: `bg-emerald-100 text-emerald-600`
- `warning`: `bg-amber-100 text-amber-600`
- `danger`: `bg-red-100 text-red-600`
- `info`: `bg-blue-100 text-blue-600`

**Стили:**
- `rounded-full` (pill форма)
- `text-xs font-semibold`
- `px-3 py-1`

### Input (Поле ввода)

```tsx
<Input className="..." />
```

**Стили по умолчанию:**
- `bg-white/60 backdrop-blur-sm`
- `border border-gray-200`
- `rounded-input` (12px)
- `focus:border-blue-300 focus:ring-2 focus:ring-blue-100/30`

### Tabs (Вкладки)

```tsx
<Tabs defaultValue="tab1">
  <TabsList className="bg-[#D4E6F1] border border-gray-300/30 p-1.5 rounded-card">
    <TabsTrigger value="tab1" className="...">Tab 1</TabsTrigger>
  </TabsList>
</Tabs>
```

**TabsList:**
- `bg-[#D4E6F1] border border-gray-300/30 p-1.5 rounded-card`

**TabsTrigger (активный):**
- `bg-white text-gray-900 font-medium rounded-inner`

**TabsTrigger (неактивный):**
- `text-gray-600 hover:text-gray-900`

---

## 🏗️ СТРУКТУРА СТРАНИЦЫ

### Layout (Макет)

```tsx
<div className="dash-light relative z-10 flex min-h-[100dvh] p-4 lg:p-5 gap-4 lg:gap-5">
  {/* Sidebar */}
  <aside className="...">
    <div className="bg-white rounded-container shadow-[0_2px_8px_rgba(0,0,0,0.04),0_4px_16px_rgba(0,0,0,0.04)] border border-gray-200/60">
      {/* Навигация */}
    </div>
  </aside>

  {/* Main Content */}
  <main className="flex-1 min-w-0 overflow-hidden relative bg-white rounded-container shadow-[0_2px_8px_rgba(0,0,0,0.04),0_4px_16px_rgba(0,0,0,0.04)] border border-gray-200/60">
    <div className="h-full overflow-y-auto no-scrollbar p-6">
      {/* Контент страницы */}
    </div>
  </main>
</div>
```

### Header (Шапка)

```tsx
<header className="w-full bg-white rounded-container shadow-[0_2px_8px_rgba(0,0,0,0.04),0_4px_16px_rgba(0,0,0,0.04)] border border-gray-200/60">
  {/* Контент */}
</header>
```

### Sidebar (Боковая панель)

```tsx
<aside className="...">
  <div className="bg-white rounded-container shadow-[0_2px_8px_rgba(0,0,0,0.04),0_4px_16px_rgba(0,0,0,0.04)] border border-gray-200/60">
    {/* Навигация */}
  </div>
</aside>
```

**Активный пункт меню:**
- `bg-[#D4E6F1] text-gray-900 font-medium rounded-inner`

**Неактивный пункт меню:**
- `text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-inner`

---

## 📏 ОТСТУПЫ И РАЗМЕРЫ

### Отступы

```css
/* Внутри main контента */
p-6 (основной padding)

/* Внутри карточек */
p-4 (компактные карточки)
p-5 (средние карточки)
p-6 (большие карточки)

/* Внутри вложенных элементов */
p-3 (компактные элементы)
p-4 (обычные элементы)
```

### Промежутки (Gap)

```css
gap-4 lg:gap-5  /* Между основными блоками */
gap-6            /* Между секциями */
gap-4            /* Между карточками в grid */
gap-2            /* Между мелкими элементами */
```

---

## 🎯 ПРИМЕРЫ ИСПОЛЬЗОВАНИЯ

### Пример 1: Простая страница с карточками

```tsx
export default function MyPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-black tracking-tight text-gray-900">
        Заголовок страницы
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Заголовок карточки
          </h3>
          <p className="text-sm text-gray-600">
            Описание
          </p>
        </Card>
      </div>
    </div>
  );
}
```

### Пример 2: Карточка с внутренними элементами

```tsx
<Card className="p-6">
  <h3 className="text-lg font-semibold text-gray-900 mb-4">
    Заголовок
  </h3>
  
  <div className="space-y-2">
    <div className="p-3 bg-white/40 rounded-inner">
      <p className="text-sm text-gray-900">Элемент 1</p>
    </div>
    <div className="p-3 bg-white/40 rounded-inner">
      <p className="text-sm text-gray-900">Элемент 2</p>
    </div>
  </div>
</Card>
```

### Пример 3: Форма с кнопками

```tsx
<Card className="p-6">
  <div className="space-y-4">
    <div>
      <label className="text-xs font-semibold text-gray-500 mb-2 block">
        Название поля
      </label>
      <Input className="w-full" />
    </div>
    
    <div className="flex gap-2">
      <Button variant="primary">Сохранить</Button>
      <Button variant="secondary">Отмена</Button>
    </div>
  </div>
</Card>
```

---

## ❌ ЧТО НЕЛЬЗЯ ДЕЛАТЬ

1. ❌ **Не используй темные темы** (`bg-black`, `bg-gray-900`, `text-white` на темном фоне)
2. ❌ **Не используй произвольные цвета** - только из палитры выше
3. ❌ **Не используй произвольные закругления** - только стандартные классы
4. ❌ **Не используй старые стили** (`variant="glass"`, `bg-primary/10` для карточек)
5. ❌ **Не создавай новые варианты компонентов** - используй существующие
6. ❌ **Не используй `rounded-lg`, `rounded-xl`** - используй `rounded-card`, `rounded-inner`
7. ❌ **Не используй `text-white`** для основного текста (только на кнопках/бейджах)

---

## ✅ ЧЕКЛИСТ ПРИ СОЗДАНИИ НОВОГО МОДУЛЯ

- [ ] Все карточки используют `Card` с дефолтными стилями
- [ ] Внутренние элементы используют `bg-white/40 rounded-inner`
- [ ] Все тексты используют `text-gray-900`, `text-gray-600`, `text-gray-500`
- [ ] Кнопки используют стандартные варианты (`primary`, `secondary`, etc.)
- [ ] Закругления используют только стандартные классы
- [ ] Тени соответствуют стандартам
- [ ] Границы используют `border-gray-300/30` или `border-gray-200/50`
- [ ] Активные элементы используют `bg-[#D4E6F1]`
- [ ] Нет темных фонов или темных текстов на светлом фоне
- [ ] Все соответствует стилю dashboard модуля

---

## 📚 ДОПОЛНИТЕЛЬНЫЕ РЕСУРСЫ

- `tailwind.config.ts` - конфигурация Tailwind с кастомными классами
- `app/globals.css` - глобальные стили и CSS переменные
- `components/ui/` - стандартные UI компоненты

---

**Последнее обновление:** 2026-01-19  
**Версия:** 1.0.0
