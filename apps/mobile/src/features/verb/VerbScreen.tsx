import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { ActivityIndicator, Share, Text, View } from 'react-native'
import { applyDiacriticsPreference } from '../../../../../src/paradigms/tokens'
import type { DisplayVerb } from '../../../../../src/paradigms/verb-types'
import { getVerbById } from '../../../../../src/paradigms/verbs'
import { ArabicText } from '../../components/ArabicText'
import { CAPS_TRACKING } from '../../components/Heading'
import { Surface } from '../../components/Surface'
import { getCopy, useSystemLanguage } from '../../i18n/copy'
import { useUserData, useUserDataValue } from '../../storage/UserDataProvider'
import { useDiacriticsPreference, useSpeechVoice } from '../../storage/user-data-hooks'
import { useThemeTokens } from '../../theme/tokens'
import { VerbDetail } from './VerbDetail'

export function VerbScreen({ source }: { source: 'search' | 'build' }) {
  const params = useLocalSearchParams<{ verbId: string }>()
  const verbId = Array.isArray(params.verbId) ? params.verbId[0] : params.verbId
  const router = useRouter()
  const canGoBack = router.canGoBack()
  const theme = useThemeTokens()
  const { ready, put, remove } = useUserData()
  const verb = verbId ? getVerbById(verbId) : undefined
  const isFavorite = Boolean(useUserDataValue(`favorite:${verbId}`))
  const language = useSystemLanguage()
  const { t } = getCopy(language)
  const diacriticsPreference = useDiacriticsPreference()
  const speechVoice = useSpeechVoice()

  if (!ready) {
    return (
      <Surface style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator accessibilityLabel={t('loading.verb')} />
      </Surface>
    )
  }

  if (!verb) {
    return (
      <Surface style={{ flex: 1, padding: 24 }}>
        <Text style={{ color: theme.ink }}>{t('verb.unavailable')}</Text>
      </Surface>
    )
  }

  const toggleFavorite = () => {
    const key = `favorite:${verb.id}` as const
    void (isFavorite ? remove(key) : put(key, true))
  }
  const openVerb = (related: DisplayVerb) => {
    router.push({
      pathname: source === 'build' ? '/build/verb/[verbId]' : '/search/verb/[verbId]',
      params: { verbId: related.id },
    })
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: applyDiacriticsPreference(verb.lemma, diacriticsPreference),
          headerTitleAlign: 'center',
          headerBackButtonDisplayMode: 'minimal',
          headerTitle: verb.synthetic
            ? () => (
                <View style={{ alignItems: 'center' }}>
                  <ArabicText style={{ color: theme.accent, fontSize: 27 }}>
                    {applyDiacriticsPreference(verb.lemma, diacriticsPreference)}
                  </ArabicText>
                  <Text
                    style={{
                      color: theme.inkSecondary,
                      fontSize: 10,
                      letterSpacing: CAPS_TRACKING,
                      textTransform: 'uppercase',
                    }}
                  >
                    {t('verb.generated')}
                  </Text>
                </View>
              )
            : undefined,
          headerTitleStyle: { color: theme.accent, fontSize: 27 },
        }}
      />
      {canGoBack ? null : (
        <Stack.Toolbar placement="left">
          <Stack.Toolbar.Button
            accessibilityLabel={source === 'build' ? t('tabs.build') : t('tabs.search')}
            icon="chevron.left"
            onPress={() => router.replace(source === 'build' ? '/build' : '/search')}
            tintColor={theme.accent}
          />
        </Stack.Toolbar>
      )}
      <Stack.Toolbar placement="right">
        <Stack.Toolbar.Button
          accessibilityLabel={t('aria.share')}
          icon="square.and.arrow.up"
          onPress={() => void Share.share({ url: `https://musarrif.com/verbs/${encodeURIComponent(verb.id)}` })}
          tintColor={theme.accent}
        />
        <Stack.Toolbar.Button
          accessibilityLabel={isFavorite ? t('aria.favourite.remove') : t('aria.favourite.add')}
          icon={isFavorite ? 'heart.fill' : 'heart'}
          onPress={toggleFavorite}
          tintColor={theme.accent}
        />
      </Stack.Toolbar>
      <VerbDetail
        diacriticsPreference={diacriticsPreference}
        language={language}
        onOpenVerb={openVerb}
        speechVoice={speechVoice}
        verb={verb}
      />
    </>
  )
}
