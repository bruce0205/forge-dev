const { utils: { fromBuildIdentifier } } = require('@electron-forge/core')

module.exports = {
  packagerConfig: {
    executableName: "meproz-forge",
    name: "meproz-forge",
    appBundleId: fromBuildIdentifier({ beta: 'com.beta.app', prod: 'com.app' })
  },
  electronRebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        name: "forge_dev",
        exe: "forge_dev.exe",
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
  "publisher": {
    name: '@electron-forge/publisher-github',
    config: {
      repository: {
        owner: 'me',
        name: 'awesome-thing'
      },
      prerelease: true
    }
  },
  plugins: [],
  hooks: [],
  buildIdentifier: process.env.IS_BETA ? 'beta' : 'prod'
}