```markdown
# 🚀 Lighthouse Widget

A beautiful, cyberpunk-styled React component that displays Google Lighthouse metrics for your website. Perfect for monitoring performance, accessibility, SEO, and best practices right in your app!

## ✨ Features

- 🎨 Stunning cyberpunk-themed UI
- 📊 Real-time Lighthouse scores
- 🔄 Auto-refresh capability
- 🎭 Funny loading messages
- 🎨 Customizable theming
- 📱 Fully responsive
- ⚡ TypeScript support

## 📦 Installation

```bash
npm install @mrno/lighthouse-widget
# or
yarn add @mrno/lighthouse-widget
```

## 🚀 Usage

```tsx
import { LighthouseWidget } from '@mrno/lighthouse-widget';

function App() {
  return (
    
  );
}
```

## 🔑 Get Your API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable PageSpeed Insights API
4. Create credentials (API Key)
5. Copy your API key

Get detailed instructions: https://developers.google.com/speed/docs/insights/v5/get-started

## ⚙️ Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `apiKey` | `string` | **Required** | Google PageSpeed Insights API key |
| `url` | `string` | `window.location.origin` | URL to test |
| `autoFetch` | `boolean` | `true` | Auto-fetch scores on mount |
| `theme` | `object` | - | Custom theme colors |
| `onScoresFetched` | `function` | - | Callback when scores are loaded |
| `onError` | `function` | - | Callback when error occurs |

## 🎨 Custom Theming

```tsx
<LighthouseWidget 
  apiKey="YOUR_API_KEY"
  theme={{
    primary: '#ff00ff',      // Accent color
    background: '#1a1a2e',   // Background
    border: '#ff00ff'        // Border color
  }}
/>
```

## 📝 Example with Callbacks

```tsx
<LighthouseWidget 
  apiKey="YOUR_API_KEY"
  onScoresFetched={(scores) => {
    console.log('Scores:', scores);
    // Send to analytics, etc.
  }}
  onError={(error) => {
    console.error('Failed to fetch:', error);
  }}
/>
```

## 🎯 TypeScript

Full TypeScript support included:

```tsx
import { LighthouseScore, LighthouseWidgetProps } from '@mrno/lighthouse-widget';
```

## 📄 License

MIT © Your Name

## 🤝 Contributing

Contributions welcome! Please open an issue or PR.
```

## 9. .npmignore

```
src/
rollup.config.js
tsconfig.json
.git
.gitignore
node_modules/
*.log
```

## 🚀 Publishing Steps

1. **Build the package:**
```bash
npm run build
```

2. **Test locally first:**
```bash
npm link
# In another project:
npm link @mrno/lighthouse-widget
```

3. **Login to npm:**
```bash
npm login
```

4. **Publish:**
```bash
npm publish --access public
```

## 📝 Usage After Publishing

Users can then install and use it:

```bash
npm install @mrno/lighthouse-widget
```

```tsx
import { LighthouseWidget } from '@mrno/lighthouse-widget';


```
