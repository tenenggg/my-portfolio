import { defineConfig, loadEnv } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'



export default defineConfig(({mode}) => {


  const env = loadEnv(mode, process.cwd(), '') 
  const PORT = env.PORT || process.env.PORT || 5175

  return {


    plugins: [
      react(),
      babel({ presets: [reactCompilerPreset()] }),
      tailwindcss()
    ],

    server: {
      port: Number(PORT),
    },

  }

})
