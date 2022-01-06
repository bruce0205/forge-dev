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
      config: {
        name: appName,
        exe: `${appName}.exe`,
      }
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: [
        "darwin"
      ]
    },
    {
      name: "@electron-forge/maker-deb",
      config: {}
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {}
    }
  ],
  "publishers": [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'bruce0205',
          name: 'forge-dev'
        },
        prerelease: true
      }
    }
  ],
  plugins: [],
  hooks: [],
  buildIdentifier: process.env.IS_BETA ? 'beta' : 'prod'
}