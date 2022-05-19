const { utils: { fromBuildIdentifier } } = require('@electron-forge/core')
const appName = 'pos-forge'

module.exports = {
  packagerConfig: {
    executableName: appName,
    name: appName,
    appBundleId: fromBuildIdentifier({ beta: 'com.beta.app', prod: 'com.app' })
  },
  electronRebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      platforms: [
        "win32"
      ],
      config: {
        name: appName,
        exe: `${appName}.exe`,
      }
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: [
        "darwin"
      ],
      config: {}
    }
  ],
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      platforms: ['darwin', 'win32'],
      config: {
        repository: {
          owner: 'bruce0205',
          name: 'forge-dev'
        }
      }
    }
  ],
  plugins: [],
  hooks: {},
  buildIdentifier: process.env.IS_BETA ? 'beta' : 'prod'
}