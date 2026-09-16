# Copy Terminology and Punctuation

Applies to every string in `src/ui/locales/*.strings.json`. One concept, one name; change all four locales together.

## Examples inside copy

**Use the verb on screen, or use no example.** Explanation strings receive the real forms as params (`{arabic}`, `{pastForm}`, `{presentForm}`, `{prefix}`, `{suffix}`, `{elidedPrefix}`, `{elidedSuffix}`, `{root}`, `{initialRadical}`, `{pattern}`) — reach for those first.

Never illustrate a rule with an unrelated verb (`كُتِبَ` in a string about `نَاوَلَ`), and never invent an inflected pattern form (`يَفْعُو`, `فَعَوْتُ`) to stand in for one. A sentence with no example is better than a sentence with a misleading one.

Pattern names themselves (`فَعَّلَ`, `اِسْتَفْعَل`, `مَفْعُول`, `فُعِلَ`) are standard examples and stay. So do grammatical terms (`اسم الفاعل`, `شَدَّة`), particles (`لَمْ`, `أَنْ`, `سَوْفَ`), bare root letters, and the verb a page is about (`لَيْسَ` on the laysa page, `كَانَ` as its stated analogy).

## Arabic in copy

Every Arabic run, literal or param, is wrapped: `<span lang="ar">…</span>`. `FormattedText` keeps `lang`; without it the browser picks the wrong font and screen readers read Arabic in the UI voice.

Copy is written fully vocalised. `ExplanationText` and `FormInsights` apply the reader's diacritics preference at render, so do not pre-strip marks in the source string.

## One name per concept

| Use | Not |
| --- | --- |
| mīmī | mimi |
| the verb | the stem |
| Form II … Form X, Form Iq … Form IVq | measure, binyan |
| radical (for a root letter) | letter |

A root letter is a **radical** — *first radical*, *middle radical*, *last radical*, *the identical radicals*. Reserve **letter** for something that is not a radical: the Form VIII ت infix, the carrier the hamza sits on, the doubled letter a merge produces, and counting a root's size (*four-letter root*). Italian and Portuguese treat `radicale` / `radical` as feminine, following the `rootInfo.*` strings.

`stem` has no definition anywhere in the copy, so it is not used in it. Say *the verb*, *at the front*, *at the end*.

**Masdar is the one deliberate split.** UI labels stay *Verbal noun* / *Verbal nouns* (`meta.verbalNoun`, `nominalInfo.title.masdar`, `exercise.*.nominal.masdar`); explanation prose says *masdar*, because that is the term the explanation is teaching. Arabic uses `ٱلْمَصْدَرُ` throughout.

Arabic names a radical by its slot in فعل: `ٱلْفَاءُ`, `ٱلْعَيْنُ`, `ٱللَّامُ`, and `ٱلْأُصُولُ` for the set, matching `rootInfo.*`. They are feminine, so agreement follows (`تَصِيرُ ٱلْعَيْنُ ٱلْمُعْتَلَّةُ`, not `يَصِيرُ`). `ٱلْحَرْف` stays for non-radicals: `حَرْفُ ٱلْمُضَارَعَةِ`, `حَرْفٌ مُضَعَّفٌ`, `حَرْفُ عِلَّةٍ` as a category.

Arabic also keeps the wasl distinction the Latin locales make: `أَلِفُ ٱلْوَصْلِ` for the written carrier, `هَمْزَةُ وَصْلٍ` for the elidable hamza.

## Register

Explanation copy is plain: short sentences, hedged with *usually* / *often* where the grammar is a tendency. `formInfo.*.relationship` sits on the same panel as `explanation.form.*` and matches that register. No `animate causer`, `co-participant`, `patient`, `self-causation`.

## Punctuation

- English is **en-US**: `color`, `behavior`, `favorite`, `memorize`.
- Portuguese is **pt_PT, pre-AO90**: `acção`, `activo`, `facto`, `contacto`.
- Apostrophe `’`, never `'`. Ellipsis `…`, never `...`. En dash `–` for ranges (`Forms II–X`); no em dashes.
- Quotes: `“ ”` in English, `« »` in Italian, Portuguese and Arabic.
- Transliterated hamza is `ʾ` (`yāʾ`), never `'`. Long vowels and emphatics carry their marks: `fatḥa`, `ḍamma`, `mīmī`.
- Straight `"` appears only inside markup (`<span lang="ar">`).
