import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import process from 'node:process'

const viteEntry = 'node_modules/vite/bin/vite.js'
let repairReason = existsSync(viteEntry) ? null : 'node_modules is missing or incomplete'

if (!repairReason && process.platform === 'darwin') {
  const check = spawnSync(
    '/usr/bin/find',
    ['node_modules', '-type', 'f', '-flags', '+dataless', '-print', '-quit'],
    { encoding: 'utf8' },
  )

  if (check.status === 0 && check.stdout.trim()) {
    repairReason = 'macOS has offloaded dependency files to cloud storage'
  }
}

if (repairReason) {
  console.warn(`[predev] ${repairReason}; rebuilding dependencies with npm ci...`)
  const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  const install = spawnSync(npm, ['ci'], { stdio: 'inherit' })

  if (install.status !== 0) {
    console.error('[predev] Dependency repair failed. Run npm ci and try again.')
    process.exit(install.status ?? 1)
  }
}
