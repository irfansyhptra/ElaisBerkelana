# 🌐 Internationalization (i18n) System

## 📋 Fitur Utama

✅ **Redux Toolkit & Persistence** - State management dengan penyimpanan otomatis
✅ **Bahasa Indonesia & English** - Dukungan dua bahasa dengan default Indonesia
✅ **Global State Management** - Satu source of truth untuk semua terjemahan
✅ **Responsive Language Selector** - UI yang adaptif untuk semua device
✅ **Persistent Language Selection** - Pilihan bahasa tersimpan otomatis
✅ **Parameter Interpolation** - Dukungan dynamic text dengan parameter
✅ **Comprehensive Coverage** - Semua text statis telah dikonversi ke translation keys

## 🏗️ Struktur System

### 1. Store & State Management

```typescript
// src/store/i18nSlice.ts
- Redux slice untuk language state
- Translations store dalam format JSON
- Actions untuk switch bahasa

// src/store/store.ts
- Redux store configuration
- Redux Persist setup
- TypeScript types
```

### 2. Hooks & Utilities

```typescript
// src/hooks/useTranslation.ts
- Custom hook untuk akses translation
- Parameter interpolation support
- Language detection utilities
```

### 3. UI Components

```typescript
// src/components/LanguageSelector.tsx
- Multi-variant language switcher
- Navbar, floating, dan minimal variants
- Responsive design dengan glass morphism

// src/components/FloatingLanguageSelector.tsx
- Floating button untuk mobile
- Auto-hide/show berdasarkan scroll
- Touch-optimized design
```

### 4. Provider Integration

```typescript
// src/providers/ReduxProvider.tsx
- Redux Provider wrapper
- PersistGate integration
- Client-side hydration
```

## 🎯 Translation Keys Coverage

### Navigation & Common

- `nav.*` - Semua menu navigasi
- `common.*` - Text umum (loading, error, buttons)
- `footer.*` - Footer content
- `social.*` - Social media labels

### Page Content

- `hero.*` - Hero section
- `home.*` - Homepage sections
- `destinations.*` - Destinations page
- `journal.*` - Documentation page
- `contact.*` - Contact form
- `about.*` - About page
- `admin.*` - Admin panel

### Interactive Elements

- `language.*` - Language selector
- `visitor.*` - Visitor counter
- `error.*` - Error messages
- `success.*` - Success messages

## 🚀 Cara Penggunaan

### 1. Dalam Component

```tsx
import { useTranslation } from "@/hooks/useTranslation";

function MyComponent() {
  const { t, currentLanguage, isIndonesian } = useTranslation();

  return (
    <div>
      <h1>{t("hero.title")}</h1>
      <p>{t("home.description", { count: 5 })}</p>
    </div>
  );
}
```

### 2. Switch Bahasa

```tsx
import { useDispatch } from "react-redux";
import { setLanguage } from "@/store/i18nSlice";

const dispatch = useDispatch();
dispatch(setLanguage("en")); // Ganti ke English
dispatch(setLanguage("id")); // Ganti ke Indonesia
```

### 3. Tambah Translation Baru

```typescript
// Di src/store/i18nSlice.ts
const translations = {
  id: {
    "new.key": "Text dalam Bahasa Indonesia",
    "dynamic.text": "Halo {name}, selamat datang!",
  },
  en: {
    "new.key": "Text in English",
    "dynamic.text": "Hello {name}, welcome!",
  },
};
```

## 🎨 UI Components

### Desktop Navigation

- Language selector terintegrasi di navbar
- Glass morphism design
- Smooth animations

### Mobile Experience

- Minimal language selector dalam mobile menu
- Floating language button dengan auto-hide
- Touch-optimized dengan 44px minimum targets

### Visual Indicators

- Flag emojis (🇮🇩 🇺🇸)
- Active language indicator
- Smooth transitions

## 🔧 Technical Features

### Redux Persistence

- Automatic state persistence
- Cross-session language retention
- Client-side hydration support

### Parameter Interpolation

```typescript
// Template: "Hello {name}, you have {count} messages"
t("message.greeting", { name: "John", count: 5 });
// Output: "Hello John, you have 5 messages"
```

### TypeScript Support

- Type-safe language codes
- Translation key autocomplete
- Runtime type checking

## 📱 Responsive Behavior

### Desktop (≥1024px)

- Full language selector dalam navbar
- Dropdown dengan flag dan nama lengkap

### Tablet (768px - 1023px)

- Compact selector dalam slide menu
- Medium-sized interactive elements

### Mobile (<768px)

- Minimal selector dalam mobile menu
- Floating button untuk akses cepat
- Touch-optimized interactions

## 🌟 Best Practices

### 1. Translation Keys

- Gunakan naming convention hierarchical: `section.subsection.item`
- Key harus descriptive dan consistent
- Hindari duplicate keys

### 2. Parameter Usage

- Gunakan parameter untuk dynamic content
- Minimal parameter untuk performa optimal
- Consistent parameter naming

### 3. Performance

- Lazy loading translations (future enhancement)
- Minimize bundle size dengan tree shaking
- Efficient state updates

## 🎉 Status Implementasi

✅ **Core System**: Redux store, hooks, providers  
✅ **UI Components**: Language selectors untuk semua variants
✅ **Page Integration**: Homepage, destinations, contact, journal, about
✅ **Navigation**: Navbar dan footer translations
✅ **Mobile Support**: Responsive design dan floating selector
✅ **Persistence**: Auto-save language preference
✅ **Build Success**: Production build verified

## 🚀 Next Steps (Opsional)

- [ ] Language detection berdasarkan browser
- [ ] RTL language support (Arabic, Hebrew)
- [ ] Translation management dashboard
- [ ] Automated translation validation
- [ ] Performance monitoring untuk i18n

---

**Sistem i18n telah fully implemented dan ready untuk production!** 🎯
