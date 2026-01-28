import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue2'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig(({ mode }) => {
  // Carica le variabili d'ambiente in base al mode (development/production)
  // Il terzo parametro '' carica tutte le variabili, non solo quelle VITE_
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [vue()],
    css: {
      preprocessorOptions: {
        sass: {
          silentDeprecations: ['global-builtin', 'import']
        },
        scss: {
          silentDeprecations: ['global-builtin', 'import']
        }
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    server: {
      proxy: {
        '/api': {
          // Usa la variabile dal file .env, oppure fallback a localhost
          target: env.VITE_API_URL || 'http://localhost:8080',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  }
})
