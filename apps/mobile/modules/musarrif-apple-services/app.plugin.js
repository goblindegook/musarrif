const fs = require('node:fs')
const path = require('node:path')
const { IOSConfig, withDangerousMod, withEntitlementsPlist, withXcodeProject } = require('expo/config-plugins')

const withCloudKit = (config, props = {}) => {
  const bundleIdentifier = config.ios?.bundleIdentifier
  const containerIdentifier = props.containerIdentifier || (bundleIdentifier && `iCloud.${bundleIdentifier}`)
  if (!containerIdentifier)
    throw new Error('CloudKit requires an iOS bundle identifier or explicit container identifier.')

  return withEntitlementsPlist(config, (modConfig) => {
    modConfig.modResults['com.apple.developer.icloud-container-identifiers'] = [containerIdentifier]
    modConfig.modResults['com.apple.developer.icloud-services'] = ['CloudKit']
    return modConfig
  })
}

const withSettingsBundle = (config) => {
  const source = path.join(__dirname, 'settings-bundle', 'Settings.bundle')
  config = withDangerousMod(config, [
    'ios',
    (modConfig) => {
      const { platformProjectRoot, projectName } = modConfig.modRequest
      fs.cpSync(source, path.join(platformProjectRoot, projectName, 'Settings.bundle'), { recursive: true })
      return modConfig
    },
  ])
  return withXcodeProject(config, (modConfig) => {
    IOSConfig.XcodeUtils.addResourceFileToGroup({
      filepath: path.join(modConfig.modRequest.projectName, 'Settings.bundle'),
      groupName: modConfig.modRequest.projectName,
      isBuildFile: true,
      project: modConfig.modResults,
    })
    return modConfig
  })
}

module.exports = (config, props) => withSettingsBundle(withCloudKit(config, props))
