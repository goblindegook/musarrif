<p align="center">
  <a href="https://musarrif.com"><img src="public/icon.png" alt="Muṣarrif" width="128" height="128"></a>
</p>

# Muṣarrif

[Muṣarrif](https://musarrif.com) is an interactive Arabic verb conjugator and
drill tool. It helps learners search roots, inspect full paradigms, and practice
recognition across forms, tenses, pronouns, and nominal derivations.

Muṣarrif is a Progressive Web Application designed for fast lookup on desktop
and mobile that is lightweight and works offline.

## What It Is

- A reference-first Arabic verb conjugation app covering 992 verbs across triliteral Forms I–X and quadriliteral Forms Iq–IVq.
- A progressive testing environment for paradigm recognition.
- Offline-capable, with camera-based optical transfer to move your data (favourites, progress) between devices without a server.

## What It Is Not

- Not a full Arabic course or grammar textbook.
- Not a dictionary or automatic translator.
- Not a conversational tutor or chat assistant.
- Not a corpus-backed frequency trainer.

## Who It Is For

- Independent Arabic learners who need quick, reliable conjugation lookup.
- Students following a textbook/class who want fast pattern verification.
- Teachers and tutors who need a compact paradigm reference during instruction.

## Accuracy

Every conjugation is checked against [Wiktionary](https://en.wiktionary.org/) first and [ElixirFM](https://quest.ms.mff.cuni.cz/cgi-bin/elixir/index.fcgi) second.

Running the ElixirFM comparison across the full 992-verb dataset (`npm run debug:elixirfm`) currently scores **~98.2% agreement**, excluding the conjugations ElixirFM has no equivalent for.

130 verbs cannot be compared at all, and another 101 disagree with ElixirFM somewhere in their paradigm. Every discrepancy falls into one of the categories below; the 18 verbs marked under review are listed again [below](#under-review). Seven verbs disagree in two ways and are listed under both categories, so the rows do not sum to 101.

| Discrepancy | Verbs | Error? |
| --- | --- | --- |
| **Not in ElixirFM.** The lexeme is absent from ElixirFM's lexicon, so the whole paradigm is skipped. | <details><summary>101 verbs</summary>`$jE-1`, `$m'z-4`, `$rb-7`, `$rb-10`, `'*y-2`, `'frq-1`, `'jr-3`, `'ksd-1`, `'lmn-2`, `'mrk-2`, `'r$f-1`, `'tmt-1`, `'wl-5`, `'x*-7`, `'x*-10`, `*b*b-2`, `*hb-5`, `*hb-6`, `*hb-10`, `*xr-2`, `Eml-2`, `Erql-1`, `Erql-2`, `Hr$f-3`, `Hrb-1`, `Hrfz-3`, `Hrjm-3`, `Hsn-6`, `Hsn-7`, `Hss-2`, `SbH-1`, `Sdr-6`, `Srf-3`, `Srf-10`, `Srx-4`, `TEm-6`, `Tbq-1`, `bHbH-1`, `blwr-2`, `brg$-4`, `brhn-1`, `dHrj-1`, `drs-5`, `drs-10`, `dxl-2`, `fEl-2`, `fEl-4`, `fkr-6`, `frqE-1`, `g$y-1`, `glgl-2`, `gmD-1`, `jlEb-4`, `jlEd-4`, `jlfE-3`, `jrmz-4`, `k'k'-2`, `kfhr-4`, `klm-1`, `klm-6`, `klwr-1`, `ktb-2`, `ktb-5`, `kyf-2`, `l'l'-1`, `mkn-1`, `mrD-10`, `mrkz-2`, `q$Er-4`, `qSS-7`, `qlql-1`, `qr'-2`, `qr'-3`, `qr'-5`, `qr'-7`, `qwd-2`, `qwd-3`, `qwd-5`, `qwd-6`, `qwl-2`, `qwl-5`, `r$f-4`, `rdd-3`, `rdd-6`, `rmy-2`, `rmy-7`, `rtb-1`, `syTr-1`, `tHd-1`, `tHr-1`, `trjm-1`, `wld-4`, `wsws-1`, `xlxl-1`, `xlxl-2`, `xrTm-3`, `xrmS-4`, `xsr-1`, `zHzH-1`, `zlzl-1`, `zrq-2`</details> | No |
| **Doubled-verb contraction.** ElixirFM renders jussive and imperative of doubled verbs uncontracted (يَشدِد) where Muṣarrif contracts (يَشِدَّ). Both are attested; Muṣarrif prefers the contracted reading. | <details><summary>68 verbs</summary>`$bb-1`, `$dd-1`, `$ff-1`, `$ff-10`, `$kk-1`, `'dd-1`, `'jj-1`, `'mm-8`, `'zz-1`, `*mm-1`, `Ddd-6`, `Djj-1`, `Dll-1`, `Dmm-1`, `Drr-1`, `Drr-8`, `Edd-1`, `Edd-4`, `Edd-10`, `Enn-1`, `Hbb-1`, `Hbb-4`, `Hbb-6`, `Hbb-10`, `Hjj-8`, `Hll-8`, `Hmm-10`, `Hqq-10`, `Hss-1`, `Hss-4`, `Smm-1`, `Smm-4`, `Zll-1`, `Znn-1`, `bvv-7`, `dss-7`, `fkk-1`, `fkk-7`, `gll-10`, `hll-1`, `hmm-4`, `jbb-1`, `kff-7`, `lmm-1`, `mdd-1`, `mdd-3`, `mdd-4`, `mdd-8`, `mdd-10`, `mrr-1`, `mrr-10`, `mss-1`, `mss-6`, `qll-1`, `qrr-1`, `qrr-4`, `qrr-10`, `rdd-1`, `rdd-8`, `rdd-10`, `sbb-1`, `sbb-6`, `sff-4`, `srr-3`, `tmm-1`, `tmm-4`, `wdd-1`, `xTT-1`</details> | No |
| **Citation form does not match.** ElixirFM's entry for the root and form cites a different verb, so the paradigm is skipped rather than compared. | <details><summary>29 verbs</summary>`'mm-1`, `DHk-2`, `Ely-1`, `HbT-1`, `Hrk-1`, `Hsn-1`, `Hsn-8`, `Sfw-1`, `bEd-1`, `bdw-1`, `dEw-1`, `fkr-1`, `jdw-1`, `kbr-1`, `lwm-1`, `n$r-1`, `nDj-1`, `nwm-1`, `nxb-1`, `qdm-1`, `skn-1`, `tdr-1`, `tmr-1`, `tnb-1`, `twb-1`, `wjz-1`, `wvq-1`, `xlw-1`, `zwr-1`</details> | No |
| **Hamza seat after a long vowel.** Muṣarrif writes بَائُوا where ElixirFM has بَاؤُوا, and أُوءَدُ where it has أُوؤَدُ. Carrier choice, not vocalisation. | <details><summary>11 verbs</summary>`Dw'-4`, `Dw'-10`, `bw'-1`, `jy'-1`, `nw'-1`, `r'y-3`, `r'y-6`, `r'y-8`, `sw'-8`, `w'd-1`, `w'y-1`</details> | Under review |
| **Form IX gemination.** The pattern geminates the final radical of a sound root, and ElixirFM again leaves the jussive and imperative uncontracted: يَحمَرِر where Muṣarrif contracts to يَحْمَرَّ. | <details><summary>6 verbs</summary>`Hmr-9`, `Sfr-9`, `byD-9`, `xDl-9`, `xDr-9`, `zrq-9`</details> | No |
| **Form I stem-vowel variants.** Muṣarrif reads أَحْسَبُ where ElixirFM reads أَحسِبُ, and مَسِسْتُ where it reads مَسَستُ. Both vowellings are lexically attested. | <details><summary>6 verbs</summary>`Hsb-1`, `Hss-1`, `Tbx-1`, `lms-1`, `mss-1`, `rkz-1`</details> | No |
| **Form I passive of assimilated verbs.** ElixirFM drops the stem wāw (يُعَى) where the passive retains it (يُوعَى). | <details><summary>5 verbs</summary>`w'y-1`, `wEy-1`, `wly-1`, `wny-1`, `wqy-1`</details> | No |
| **Prothetic imperative vowel on weak and hamzated initials.** Muṣarrif writes اِيدِدْنَ where ElixirFM has اِئدِدنَ, and اُوسُرْ where it has اُيسُر. | <details><summary>5 verbs</summary>`'dd-1`, `'jj-1`, `'zz-1`, `wdd-1`, `ysr-1`</details> | Under review |
| **Variant lexeme compared.** The citation form matches, but ElixirFM inflects a different verb of the same root: `zwl-1` compares Muṣarrif's زَالَ يَزُولُ (to cease) against ElixirFM's auxiliary يَزَالُ; `gyr-1` compares غَارَ يَغَارُ (gh-y-r) against a gh-w-r entry. | <details><summary>4 verbs</summary>`Swr-1`, `bky-1`, `gyr-1`, `zwl-1`</details> | No |
| **Geminate wāw spelling.** Muṣarrif writes أُووِي (long ū + wāw), ElixirFM أُوِّي (shadda). | <details><summary>2 verbs</summary>`'wy-1`, `'wy-4`</details> | Under review |
| **Contracted imperative of أَمَرَ.** مُرْ vs. ElixirFM's اُؤمُر. Both attested. | <details><summary>1 verb</summary>`'mr-1`</details> | No |

### Under Review

The 18 verbs whose discrepancies are still open questions, and what was found for each:

| Verb | Lemma | Under review | Settled |
| --- | --- | --- | --- |
| `'dd-1` | أَدَّ | Prothetic imperative vowel | Doubled-verb contraction |
| `'jj-1` | أَجَّ | Prothetic imperative vowel | Doubled-verb contraction |
| `'wy-1` | أَوَى | Geminate wāw spelling | |
| `'wy-4` | آوَى | Geminate wāw spelling | |
| `'zz-1` | أَزَّ | Prothetic imperative vowel | Doubled-verb contraction |
| `Dw'-4` | أَضَاءَ | Hamza seat after a long vowel | |
| `Dw'-10` | اِسْتَضَاءَ | Hamza seat after a long vowel | |
| `bw'-1` | بَاءَ | Hamza seat after a long vowel | |
| `jy'-1` | جَاءَ | Hamza seat after a long vowel | |
| `nw'-1` | نَاءَ | Hamza seat after a long vowel | |
| `r'y-3` | رَاءَى | Hamza seat after a long vowel | |
| `r'y-6` | تَرَاءَى | Hamza seat after a long vowel | |
| `r'y-8` | اِرْتَأَى | Hamza seat after a long vowel | |
| `sw'-8` | اِسْتَاءَ | Hamza seat after a long vowel | |
| `w'd-1` | وَأَدَ | Hamza seat after a long vowel | |
| `w'y-1` | وَأَى | Hamza seat after a long vowel | Form I passive of assimilated verbs |
| `wdd-1` | وَدَّ | Prothetic imperative vowel | Doubled-verb contraction |
| `ysr-1` | يَسُرَ | Prothetic imperative vowel | |

ElixirFM also omits sukūns entirely; the comparison normalises them away before matching, so they never surface as mismatches.

## Setup

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Build production bundle:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Desktop Target (Tauri 2)

The repository includes a desktop build target via Tauri 2.0.

Run in desktop dev mode:

```bash
npm run tauri:dev
```

Build desktop bundles:

```bash
npm run tauri:build
```

## Quality Commands

Run tests (single pass, no watch):

```bash
npm test -- --no-watch
```

Run one test file:

```bash
npm test -- --no-watch src/path/to/file.test.ts
```

Count the verbs in the dataset (requires `jq`):

```bash
npm run count:verbs
```

Coverage and mutation:

```bash
npm run test:coverage
npm run test:mutation
```

Lint and formatting:

```bash
npm run lint
npm run lint:fix
npm run format
```

## Contributing

Contributions are welcome, especially for:

- Incorrect or incomplete conjugation behavior
- Missing verb entries and lexical metadata
- Exercise quality and distractor quality improvements
- Localization improvements (English, Italian, Portuguese or Arabic copy)
- Accessibility and mobile usability fixes

### Contribution Workflow

1. Open an issue describing the bug or change (or use the [incorrect conjugation form](https://github.com/goblindegook/musarrif/issues/new?template=incorrect-conjugation.yml))
2. Create a focused branch
3. Implement the smallest change needed, remembering to add or update tests
4. Run lint + tests locally before opening a PR
5. Include lexical sources whenever changing verb data or grammar expectations

## Verb Adding Utility

Use the interactive wizard to add or edit entries in:

- `src/data/roots.json`
- `src/ui/locales/en.verbs.json`
- `src/ui/locales/it.verbs.json`
- `src/ui/locales/pt.verbs.json`

Run it with:

```bash
npm run add:verb
```

The wizard guides you through:

- Root and form selection (`I` to `X` for triliteral roots, `Iq` to `IVq` for quadriliteral roots)
- Form I vowel pattern
- Passive voice support (`full`, `impersonal`, `none`)
- Masdar pattern selection
- Passive participle support
- Root glosses (EN/IT/PT)
- Verb translations (EN/IT/PT)

It then shows a summary and writes sorted JSON updates.

### Data Expectations

Before adding verbs, verify from lexical sources:

- Root
- Form
- Present vowel pattern (for Form I)
- Masdar pattern(s)
- Passive voice support
- Passive participle support

Keep locale updates atomic with verb entry changes.

## Test Generators

Generate a paradigm test file at `src/paradigms/verbs/<slug>.test.ts`:

```bash
npm run add:tests:elixirfm -- ktb-1
npm run add:tests:reverso -- ktb-1
npm run add:tests:wiktionary -- ktb-1
```

- `add:tests:elixirfm`: Resolves the slug to a verb/form and fetches paradigms from ElixirFM.
- `add:tests:reverso`: Resolves the slug to a lemma and fetches paradigms from Reverso.
- `add:tests:wiktionary`: Resolves the slug to a lemma/root and fetches paradigms from Wiktionary.

Generate test files for every verb in the dataset at once:

```bash
npm run add:tests:all
```

ElixirFM responses are cached under `.caches/elixirfm/` so repeat runs (including `debug:elixirfm`) don't re-fetch unchanged lookups.

Usage notes:

- Slug format is `<root>-<form>` (example: `ktb-1`)
- If the slug contains an apostrophe, quote it in the shell (example: `npm run add:tests:wiktionary -- "qr'-1"`)

## Reporting Incorrect Conjugations

Use the GitHub [incorrect conjugation issue form](https://github.com/goblindegook/musarrif/issues/new?template=incorrect-conjugation.yml). Include verb details, expected output, and source references.

## License

This project is licensed under the GNU General Public License v3.0.
See [LICENSE](LICENSE).
