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

- A reference-first Arabic verb conjugation app covering 1013 verbs across triliteral Forms I–X and quadriliteral Forms Iq–IVq.
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

Running the ElixirFM comparison across the full 4969-verb dataset (`npm run debug:elixirfm`) currently scores **~98.9% agreement**, excluding the conjugations ElixirFM has no equivalent for.

132 verbs cannot be compared at all, and another 296 disagree with ElixirFM somewhere in their paradigm. Every discrepancy falls into one of the categories below. Every category has been adjudicated against Wiktionary, and none is a Muṣarrif error. Six verbs disagree in two ways and are listed under both categories, so the rows do not sum to 296.

| Discrepancy | Verbs | Error? |
| --- | --- | --- |
| <details><summary>**Doubled-verb contraction.** ElixirFM renders jussive and imperative of doubled verbs uncontracted (يَشدِد) where Muṣarrif contracts (يَشِدَّ). Both are attested; Muṣarrif prefers the contracted reading.</summary>`$EE-4`, `$TT-8`, `$bb-1`, `$dd-1`, `$dd-3`, `$dd-6`, `$dd-8`, `$ff-1`, `$ff-10`, `$kk-1`, `$ll-4`, `$mm-8`, `$qq-1`, `$qq-7`, `$qq-8`, `'dd-1`, `'jj-1`, `'mm-8`, `'zz-1`, `*ll-4`, `*mm-1`, `Ddd-3`, `Ddd-6`, `Djj-1`, `Djj-4`, `Dll-1`, `Dll-4`, `Dmm-1`, `Dmm-6`, `Dmm-7`, `Drr-1`, `Drr-4`, `Drr-8`, `Edd-1`, `Edd-4`, `Edd-10`, `Ell-8`, `Enn-1`, `Ezz-4`, `Ezz-8`, `HSS-3`, `HTT-7`, `HZZ-1`, `Hbb-1`, `Hbb-4`, `Hbb-6`, `Hbb-10`, `Hdd-3`, `Hdd-4`, `Hdd-8`, `Hjj-3`, `Hjj-6`, `Hjj-8`, `Hkk-4`, `Hkk-8`, `Hll-4`, `Hll-7`, `Hll-8`, `Hll-10`, `Hmm-10`, `Hqq-3`, `Hqq-4`, `Hqq-10`, `Hss-1`, `Hss-4`, `Hvv-10`, `Sbb-7`, `Sff-8`, `Skk-8`, `Smm-1`, `Smm-4`, `Srr-4`, `Tbb-10`, `Tll-4`, `Zll-1`, `Znn-1`, `bHH-1`, `bdd-10`, `bll-8`, `brr-4`, `bvv-7`, `bzz-8`, `dll-1`, `dll-10`, `drr-4`, `drr-10`, `dss-7`, `fDD-7`, `fSS-8`, `fkk-1`, `fkk-7`, `frr-8`, `fzz-1`, `fzz-4`, `fzz-10`, `gll-10`, `gmm-7`, `gmm-8`, `gnn-4`, `grr-8`, `hll-1`, `hll-4`, `hll-10`, `hmm-4`, `hmm-8`, `hzz-8`, `jbb-1`, `jdd-10`, `jll-4`, `jmm-10`, `jnn-4`, `jnn-10`, `jrr-4`, `jrr-8`, `jzz-8`, `kZZ-8`, `kbb-1`, `kbb-4`, `kbb-7`, `kff-7`, `kff-10`, `kll-4`, `l**-8`, `l**-10`, `lHH-4`, `lbb-1`, `lff-1`, `lff-8`, `lmm-1`, `mSS-8`, `mdd-1`, `mdd-3`, `mdd-4`, `mdd-8`, `mdd-10`, `mll-4`, `mnn-8`, `mrr-1`, `mrr-10`, `mss-1`, `mss-3`, `mss-6`, `qDD-4`, `qDD-7`, `qSS-3`, `qSS-8`, `qTT-8`, `qdd-7`, `qll-1`, `qll-4`, `qll-10`, `qrr-1`, `qrr-4`, `qrr-10`, `rSS-6`, `rdd-1`, `rdd-8`, `rdd-10`, `rjj-8`, `rqq-10`, `rzz-4`, `sbb-1`, `sbb-3`, `sbb-6`, `sdd-4`, `sdd-7`, `sff-4`, `sll-7`, `sll-8`, `snn-4`, `snn-8`, `srr-3`, `srr-4`, `srr-10`, `tmm-1`, `tmm-4`, `wdd-1`, `wdd-3`, `wdd-6`, `xSS-8`, `xTT-1`, `xTT-8`, `xff-10`, `xll-3`, `xll-4`, `xll-8`</details> | 186 | No |
| <details><summary>**Not in ElixirFM.** The lexeme is absent from ElixirFM's lexicon, so the whole paradigm is skipped.</summary>`$bb-4`, `$bb-10`, `$qq-3`, `$rb-7`, `$rb-10`, `'*y-2`, `'jr-3`, `'kl-8`, `'mm-1`, `'r$f-1`, `'tmt-1`, `'wl-5`, `'x*-7`, `'x*-10`, `*hb-5`, `*hb-6`, `*hb-10`, `*xr-2`, `DHk-2`, `ESrn-1`, `ETy-4`, `Ely-1`, `Ely-4`, `Eml-2`, `Ewd-8`, `Eyl-4`, `Eyy-5`, `Eyy-6`, `Eyy-10`, `Hdy-5`, `Hr$f-3`, `Hrb-1`, `Hrfz-3`, `Hrjm-3`, `Hrk-1`, `Hsn-6`, `Hsn-7`, `Hsn-8`, `Hss-2`, `Hwr-8`, `Hwr-9`, `Hwz-7`, `Hyw-2`, `Hyw-4`, `Hyw-10`, `SbH-1`, `Sdr-6`, `Srf-3`, `Srf-10`, `Srx-4`, `Swr-1`, `TEm-6`, `Tbq-1`, `bHbH-1`, `brg$-4`, `drs-5`, `drs-10`, `dxl-2`, `fEl-2`, `fEl-4`, `fHl-1`, `fkr-1`, `fkr-6`, `fty-10`, `gTy-2`, `gsl-7`, `jlEb-4`, `jlEd-4`, `jlfE-3`, `jlw-7`, `jrmz-4`, `k$f-4`, `klm-1`, `klm-6`, `ktb-2`, `ktb-5`, `kyf-2`, `lwy-3`, `mHq-2`, `mkn-1`, `mknn-1`, `mrD-10`, `ndy-3`, `nmw-6`, `qSS-7`, `qdr-4`, `qdr-5`, `qr'-2`, `qr'-3`, `qr'-5`, `qr'-7`, `qwd-2`, `qwd-3`, `qwd-5`, `qwd-6`, `qwl-2`, `qwl-5`, `qyn-1`, `r$f-4`, `rbd-2`, `rbd-4`, `rdd-3`, `rdd-6`, `rmy-2`, `rmy-7`, `rtb-1`, `sny-5`, `tHd-1`, `tHr-1`, `tdr-1`, `tmr-1`, `tnb-1`, `wH$-1`, `wld-4`, `wqt-1`, `xrmS-4`, `ydy-3`, `zrq-2`</details> | 118 | No |
| <details><summary>**Form I stem-vowel variants.** Same lexeme, different Form I stem vowel: Muṣarrif reads أَحْسَبُ where ElixirFM reads أَحسِبُ, and مَسِسْتُ where it reads مَسَستُ. Wiktionary records the Muṣarrif vowelling, except for `bky-1`, where ElixirFM inflects بَكَى with an *a-a* imperfect (يَبكَى, تَبكَونَ) against Muṣarrif's *a-i* (يَبْكِي, تَبْكُونَ): Wiktionary and Reverso record only the Muṣarrif vowelling.</summary>`$br-1`, `$rT-1`, `'fl-1`, `E$w-1`, `Er$-1`, `Etb-1`, `H$d-1`, `H$r-1`, `HSb-1`, `HSd-1`, `Hds-1`, `Hjl-1`, `Hjz-1`, `Hrv-1`, `Hsb-1`, `Hsr-1`, `Hss-1`, `Tbx-1`, `bHH-1`, `bky-1`, `bqr-1`, `dbg-1`, `dfq-1`, `ftn-1`, `fzz-1`, `h*r-1`, `hn'-1`, `jvm-1`, `kfr-1`, `khn-1`, `lbb-1`, `lgm-1`, `lms-1`, `mDg-1`, `mhr-1`, `msk-1`, `mss-1`, `nEq-1`, `nEr-1`, `nHl-1`, `nbE-1`, `nfr-1`, `nhb-1`, `nsb-1`, `nxr-1`, `nzH-1`, `qdr-1`, `qmT-1`, `r$f-1`, `r's-1`, `rbT-1`, `rjH-1`, `rkz-1`, `rms-1`, `sbq-1`, `slx-1`, `srT-1`, `xm$-1`, `z'r-1`, `zHr-1`, `zbr-1`</details> | 61 | No |
| <details><summary>**Form IX gemination.** The pattern geminates the final radical of a sound root, and ElixirFM again leaves the jussive and imperative uncontracted: يَحمَرِر where Muṣarrif contracts to يَحْمَرَّ.</summary>`Ewj-9`, `Hmr-9`, `Hwl-9`, `Sfr-9`, `Shb-9`, `byD-9`, `dhm-9`, `gbr-9`, `kmd-9`, `qtm-9`, `rbd-9`, `rfD-9`, `smr-9`, `swd-9`, `xDl-9`, `xDr-9`, `zrq-9`</details> | 17 | No |
| <details><summary>**Hamza seat.** Carrier choice, not vocalisation: Muṣarrif writes بَائُوا, تَبُوءَانِ, أُوءَدُ and تَرْتَئِ where ElixirFM has بَاؤُوا, تَبُوؤَانِ, أُوؤَدُ and تَرتَإِ. Wiktionary always lists the Muṣarrif spelling: first, where it gives variants before a long -ū (جَائُوا). A word-final hamza carrying the stem kasra of a dropped weak radical (تَرْتَئِ, يُرَائِ) is the one place Wiktionary accepts every seat, and Muṣarrif writes ئ, the only seat all of its variant lists share.</summary>`Dw'-4`, `Dw'-10`, `bw'-1`, `fy'-4`, `jy'-1`, `n'y-8`, `nw'-1`, `nw'-4`, `r'y-3`, `r'y-6`, `r'y-8`, `sw'-4`, `sw'-8`, `w'd-1`, `y's-1`</details> | 15 | No |
| <details><summary>**Form I citation vowel differs.** ElixirFM's Form I entry for the root is a different vowelling of the same verb — حَبَط for Muṣarrif's حَبِطَ, كَبَر for كَبُرَ — so the paradigm is skipped rather than compared.</summary>`$Zy-1`, `$jE-1`, `'hl-1`, `HbT-1`, `bEd-1`, `dh$-1`, `g$y-1`, `gmD-1`, `kbr-1`, `qdm-1`, `wfq-1`, `wjz-1`, `wvq-1`, `xsr-1`</details> | 14 | No |
| <details><summary>**Prothetic imperative vowel on weak initials.** After the prothetic alif, Muṣarrif merges a vowelless weak first radical into the matching long vowel — اِيدَدْنَ for وَدَّ, اِيجَلْ for وَجِلَ, اُوسُرْ for يَسُرَ — where ElixirFM keeps the radical (اِودَد, اِوجَل, اُيسُر). Wiktionary writes the merged forms.</summary>`wHl-1`, `wbr-1`, `wdd-1`, `whl-1`, `whm-1`, `wjE-1`, `wjl-1`, `wlE-1`, `wsn-1`, `wsx-1`, `wxm-1`, `ysr-1`</details> | 12 | No |
| <details><summary>**Form I passive of assimilated verbs.** ElixirFM drops the stem wāw (يُعَى) where the passive retains it (يُوعَى).</summary>`w'y-1`, `wEy-1`, `wfy-1`, `wly-1`, `wny-1`, `wqy-1`</details> | 6 | No |
| <details><summary>**Geminate wāw spelling.** Where a vowelless first-radical hamza turns into a wāw of prolongation before a radical wāw, Muṣarrif writes the pair out (أُووِي, أُووَى), ElixirFM collapses it to one wāw with shadda (أُوِّي, أُوَّى). Wiktionary and Reverso both write the pair.</summary>`'wy-1`, `'wy-4`</details> | 2 | No |
| <details><summary>**Contracted imperative of أَمَرَ.** مُرْ vs. ElixirFM's اُؤمُر. Both attested.</summary>`'mr-1`</details> | 1 | No |
| <details><summary>**Quadriliteral passive with a yāʾ second radical.** The yāʾ becomes a wāw after the passive ḍamma — سُوْطِرَ for سَيْطَرَ — where ElixirFM keeps it: سُيطِرَ. Wiktionary and Reverso both write the wāw.</summary>`syTr-1`</details> | 1 | No |
| <details><summary>**Doubled yāʾ in the masculine plural past.** When the second and third radicals both surface as yāʾ (حَيِيَ), Muṣarrif follows Wiktionary and writes the masculine plural with a shadda, حَيُّوا, where ElixirFM writes حَيُوا.</summary>`Hyw-1`</details> | 1 | No |

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
npm run check:lint
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
4. Run `npm run check:all` locally before opening a PR
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
npm run add:tests -- elixirfm ktb-1
npm run add:tests -- reverso ktb-1
npm run add:tests -- wiktionary ktb-1
npm run add:tests -- qutrub ktb-1
```

`add:tests` takes a source (`elixirfm`, `reverso`, `wiktionary`, or `qutrub`) and a slug, resolves the slug to a verb/lemma/root, and fetches paradigms from that source.

Form I verbs accept an optional vowel pattern (`a-a`, `a-i`, `a-u`, `i-a`, …) as a third argument, which disambiguates roots with more than one Form I conjugation:

```bash
npm run add:tests -- wiktionary qdr-1 a-u
```

ElixirFM responses are cached under `.caches/elixirfm/` so repeat runs (including `debug:elixirfm`) don't re-fetch unchanged lookups.

Usage notes:

- Slug format is `<root>-<form>` (example: `ktb-1`)
- If the slug contains an apostrophe, quote it in the shell (example: `npm run add:tests -- wiktionary "qr'-1"`)

## Reporting Incorrect Conjugations

Use the GitHub [incorrect conjugation issue form](https://github.com/goblindegook/musarrif/issues/new?template=incorrect-conjugation.yml). Include verb details, expected output, and source references.

## Acknowledgements

Verb frequency ranking uses the [CAMeL Arabic Frequency Lists](https://github.com/CAMeL-Lab/Camel_Arabic_Frequency_Lists) by CAMeL Lab, NYU Abu Dhabi, licensed CC BY-SA 4.0. Lemmatization is performed offline with [CAMeL Tools](https://github.com/CAMeL-Lab/camel_tools) (MIT license, data GPL v2).

## License

This project is licensed under the GNU General Public License v3.0.
See [LICENSE](LICENSE).
