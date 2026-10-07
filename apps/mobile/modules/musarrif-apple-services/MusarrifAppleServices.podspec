Pod::Spec.new do |s|
  s.name           = 'MusarrifAppleServices'
  s.version        = '0.1.0'
  s.summary        = 'Local Apple services for Muṣarrif.'
  s.description    = 'CloudKit private database bridge backed by CKSyncEngine.'
  s.license        = { :type => 'MIT' }
  s.author         = 'Muṣarrif'
  s.homepage       = 'https://github.com/goblindegook/musarrif'
  s.source         = { :path => '.' }
  s.platform       = :ios, '26.0'
  s.swift_version  = '5.9'
  s.source_files   = 'ios/**/*.{h,m,mm,swift}'
  s.dependency 'ExpoModulesCore'
end
