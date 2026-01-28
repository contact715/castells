/**
 * THALASSA DESIGN SYSTEM
 * 
 * Централизованные константы и утилиты для единообразного дизайна
 * Используй эти константы при создании новых компонентов и страниц
 */

/**
 * Цвета карточек и поверхностей
 */
export const colors = {
  // Основные поверхности
  pageBackground: "bg-gradient-to-br from-[#F5F8FA] via-[#E8F4F8] to-[#D9EAF7]",
  mainContent: "bg-white",
  card: "bg-[#D4E6F1]",
  cardInner: "bg-white/40",
  
  // Текст
  textPrimary: "text-gray-900",
  textSecondary: "text-gray-600",
  textTertiary: "text-gray-500",
  textMuted: "text-gray-400",
  
  // Акцентные цвета
  accent: {
    blue: "bg-primary",
    blueHover: "hover:bg-primary/90",
    blueText: "text-blue-600",
    blueBg: "bg-blue-100",
  },
  success: {
    bg: "bg-emerald-100",
    text: "text-emerald-600",
    solid: "bg-emerald-500",
  },
  error: {
    bg: "bg-red-100",
    text: "text-red-600",
    solid: "bg-red-500",
  },
  warning: {
    bg: "bg-amber-100",
    text: "text-amber-600",
  },
  
  // Активные состояния
  active: "bg-[#D4E6F1]",
  activeText: "text-gray-900",
} as const;

/**
 * Границы
 */
export const borders = {
  // Основные границы
  main: "border border-gray-200/60",
  card: "border border-gray-300/30",
  inner: "border border-gray-200/50",
  
  // Активные границы
  active: "border-blue-300/50",
  focus: "border-blue-300 focus:ring-2 focus:ring-blue-100/30",
  
  // Разделители
  divider: "border-gray-200/50",
} as const;

/**
 * Тени
 */
export const shadows = {
  // Основные блоки (sidebar, header, main)
  container: "shadow-[0_2px_8px_rgba(0,0,0,0.04),0_4px_16px_rgba(0,0,0,0.04)]",
  
  // Карточки
  card: "shadow-[0_4px_12px_rgba(0,0,0,0.1),0_8px_24px_rgba(0,0,0,0.06)]",
  
  // Кнопки
  button: "shadow-sm",
} as const;

/**
 * Закругления
 */
export const radius = {
  container: "rounded-container",  // 20px
  card: "rounded-card",              // 20px
  inner: "rounded-inner",            // 20px
  element: "rounded-element",        // 12px
  pill: "rounded-pill",              // 9999px
  button: "rounded-inner",           // 20px (для кнопок)
  input: "rounded-input",            // 12px
} as const;

/**
 * Отступы
 */
export const spacing = {
  // Основные контейнеры
  page: "p-4 lg:p-5",
  main: "p-6",
  
  // Карточки
  card: {
    sm: "p-3",
    md: "p-4",
    lg: "p-5",
    xl: "p-6",
  },
  
  // Элементы
  element: {
    sm: "p-2",
    md: "p-3",
    lg: "p-4",
  },
} as const;

/**
 * Промежутки (Gap)
 */
export const gaps = {
  page: "gap-4 lg:gap-5",  // Между основными блоками
  section: "gap-6",         // Между секциями
  grid: "gap-4",            // Между карточками в grid
  items: "gap-2",           // Между мелкими элементами
} as const;

/**
 * Типография
 */
export const typography = {
  // Заголовки
  h1: "text-4xl font-black tracking-tight text-gray-900",
  h2: "text-3xl font-bold tracking-tight text-gray-900",
  h3: "text-2xl font-semibold text-gray-900",
  h4: "text-xl font-semibold text-gray-900",
  h5: "text-lg font-semibold text-gray-900",
  h6: "text-base font-semibold text-gray-900",
  
  // Текст
  body: "text-sm text-gray-600",
  bodyLarge: "text-base text-gray-600",
  caption: "text-xs text-gray-500",
  label: "text-xs font-semibold text-gray-500",
} as const;

/**
 * Классы для стандартных компонентов
 */
export const componentClasses = {
  // Card
  card: [
    colors.card,
    borders.card,
    shadows.card,
    radius.card,
  ].join(" "),
  
  // Card inner element
  cardInner: [
    colors.cardInner,
    radius.inner,
  ].join(" "),
  
  // Main container
  mainContainer: [
    colors.mainContent,
    radius.container,
    shadows.container,
    borders.main,
  ].join(" "),
  
  // Header
  header: [
    colors.mainContent,
    radius.container,
    shadows.container,
    borders.main,
  ].join(" "),
  
  // Sidebar
  sidebar: [
    colors.mainContent,
    radius.container,
    shadows.container,
    borders.main,
  ].join(" "),
  
  // Active menu item
  activeMenuItem: [
    colors.active,
    colors.activeText,
    "font-medium",
    radius.inner,
  ].join(" "),
  
  // Inactive menu item
  inactiveMenuItem: [
    "text-gray-600",
    "hover:text-gray-900",
    "hover:bg-gray-50",
    radius.inner,
  ].join(" "),
} as const;

/**
 * Утилита для объединения классов компонентов
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Пресеты для часто используемых комбинаций
 */
export const presets = {
  // Стандартная карточка
  card: (className?: string) => cn(
    componentClasses.card,
    spacing.card.lg,
    className
  ),
  
  // Внутренний элемент карточки
  cardInner: (className?: string) => cn(
    componentClasses.cardInner,
    spacing.element.md,
    className
  ),
  
  // Секция страницы
  section: (className?: string) => cn(
    "space-y-6",
    className
  ),
  
  // Grid карточек
  cardGrid: (cols: 1 | 2 | 3 | 4 = 3) => cn(
    `grid grid-cols-1 lg:grid-cols-${cols}`,
    gaps.grid
  ),
} as const;

/**
 * Чеклист для проверки соответствия дизайн-системе
 */
export const checklist = {
  card: [
    "Использует bg-[#D4E6F1]",
    "Имеет border border-gray-300/30",
    "Имеет shadow-[0_4px_12px_rgba(0,0,0,0.1),0_8px_24px_rgba(0,0,0,0.06)]",
    "Использует rounded-card",
  ],
  text: [
    "Основной текст: text-gray-900",
    "Вторичный текст: text-gray-600",
    "Третичный текст: text-gray-500",
    "Нет text-white на светлом фоне",
  ],
  buttons: [
    "Primary: bg-blue-500 text-white",
    "Secondary: bg-gray-100 text-gray-700",
    "Использует rounded-inner",
  ],
  radius: [
    "Нет rounded-lg, rounded-xl",
    "Использует только rounded-container, rounded-card, rounded-inner, rounded-element",
  ],
} as const;
