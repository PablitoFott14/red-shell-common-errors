# Red Shell · Common Errors: mistake viewer

The error pages of the **Common Errors** course for the OpenClaw MM Rubrics MULTI TURN project.

23 mistakes that keep costing people their tasks, each shown in a real task from this project. Open a
mistake and every real task on its page is laid out as a diagnosis: the exact words, row or field where it
went wrong, beside what it should have been, then why it breaks the standard and the rule it breaks. Click
any line to open the real task on that spot.

## → [pablitofott14.github.io/red-shell-common-errors](https://pablitofott14.github.io/red-shell-common-errors/)

That link is the course. The menu lists all 23 mistakes in the seven sections, and can show only the ones
that fail the task, fail a client CORE standard or cost points. The **Slides** tab steps through the course's
slide deck, with a PDF and a PPTX of it to download. The files in this repository are what builds it; you do
not need to read them to take the course.

---

## What is in here

| Page | What it does |
|---|---|
| `index.html` | The menu. Every mistake, grouped into the course's seven sections, with a filter by what it costs. |
| `mistakes/<name>.html` | One page per mistake. The mistake and what to do instead, side by side; each real task where it happened, as a diagnosis; how to catch it in your own task; where the correct guidance is written; and why it matters, folded away. |
| `explanations.html` | The course's explanations: every mistake and every example taken apart in full. Each example links back to the exact spot in the viewer, and the viewer links to each example here. |
| `checklist.html` | Every recognition test on one page, section by section, with ticks that stay in your browser. |
| `slides/` | The Slides tab: the course's deck, one slide at a time, with the arrow keys, a strip of every slide, full screen and a link to each slide (`#1` to `#13`). `common-errors-slides.pdf` and `common-errors-slides.pptx` are the same deck to download: the PDF keeps the text as text, and the PPTX shows each slide as one picture, with its words in the speaker notes. |
| `data/course.json` | The same content as data, if you want to render it somewhere else. |
| `evidence/<task>/` | The task files the examples open: golden pages, photos, videos. Only what an example needs. |

## Reading an example

Every real task on a mistake's page is a **diagnosis** you can read without opening anything:

- **Where it shows**: the lines of the task where the mistake is, quoted in the task's own words, with the
  words at fault marked and the one field at fault ringed: a weight, a category, a modifier, an Assets
  Delivered. Something the task should have and does not, such as a criterion, a clause or a milestone,
  is a dashed line.
- **What it should have been**: the same lines as they should read, with what changes in green.
- **How it breaks the standard**, in a sentence, and **the rule it breaks**, quoted from the Guidelines or
  the QC spec by its printed section. Its link opens the full quote.

Every line names where it sits in the task. Click it, or any marked word, and the real task opens over the
page on exactly that spot.

## Opening an example

Examples open **on the page you are already reading**, not on one of their own. The dialog puts the same
diagnosis on the left, in the order the explanations use (the task, where it shows, how it breaks the
standard, what it should have been), and the task's own fields on the right, tabbed. The tabs carry only
the parts of the task the mistake lives in.

It opens **on the spot**: the tab the diagnosis's first line points at, scrolled to the first marked place.

- **Yellow** marks the exact words to look at, inside the task's own text.
- **Red** flags the row at fault, and rings the one field at fault on it. A **dashed red** row is what the
  task is missing, drawn where it belongs: a Leg A turn no milestone covers, a clause a milestone lacks, a
  criterion the rubric never wrote.
- **Green** marks what is right: the corrected value, or task text that already does it the right way.
- **Blue** is a task file you can open.

The **Spot 1 of N** stepper in a tab's header walks every marked place in it, inside a golden page too. Each
line of the diagnosis jumps straight to its place, and every reference in the explanation is a link:
*criterion 30*, *Leg B turn 7*, *milestone 9*, a filename or a quoted phrase takes you to what it names.
Left and right arrows walk the tabs, **Expand** takes the dialog full window, and **Escape** puts you back
where you were.

Every example carries the number the whole course gives it, so Example 12 here is Example 12 on the slides
and in the explanations. A link ending in `#ex-<mistake>-<n>` opens that example straight away, and the
address follows the example you have open, so Back from the explanations returns to it.

Where a task repeats the same defect a dozen times, the panel shows a few rows and tells you the count.

### Seeing the evidence

Where a mistake can only be checked by looking, the files it turns on open in the same dialog, as blue tabs
beside the task's fields: the golden page running as it shipped, the photo a prompt gave away, the video with
buttons that play the exact scene, the row of an export, the file a golden archive should not have carried.
Each one says what to look at, and the passage the example points to is marked. Click an image for full size.

Only the files an example needs are published, taken from the task's own archive. An input is published only
if the run itself named it, since a saved inputs archive does not always match what the run saw. Images carry
no metadata, and nothing on these pages identifies a contributor.

## What grounds all of this

**The rules come first.** Every mistake names the sections of the Guidelines and the QC spec that make it an
error, quoted word for word, with the section titles as they are printed in the document so you can search
for them and read the whole thing around them.

**The examples are real.** Every one is a task that was actually submitted to this project. Every line under
*Where it shows* that quotes the task is checked against the task's own text when the site is built, piece by
piece, and so is every marked phrase, so a quote is always one the task really contains. *What it should have
been* is the course's correction, never presented as the task's.

## Keeping it current

The site is generated. The build scripts live with the course material in Drive, under
`Coruses & Screenings/common errors/improved/_build/`:

```bash
python build_data.py   # -> course_data.json, and the evidence files
python build_site.py   # -> this site, explanations.html included
python build_docs.py   # -> course_structure.md, explanations.md
python build_slides.py # -> the deck
python build_deck.py   # -> slides/: the Slides tab, its PDF and its PPTX
```

`spec.py` holds what each mistake says, where each example's mistake sits and each example's diagnosis.
`rules.py` holds the quoted rules and the document section each one comes from; a checker verifies every quote
still appears verbatim in the file it names. `check_viewer.py` drives every page in a headless browser: every
card is a diagnosis, every line of it lands on its spot, every example opens on its spot, every rule link opens
its quote, every evidence file loads, and every link between the explanations and the viewer resolves.
`check_deck.py` renders every slide afresh and holds the Slides tab, the PDF and the PPTX to it, slide by
slide: nothing clipped, overlapping or outside the frame, the PDF's text where the slide puts it, and the PPTX
opened and exported by PowerPoint itself.

## The rest of the course

- **Slides**: 13 slides at 1920x1080, published here as the Slides tab, with a PDF and a PPTX
- **Explanations**: the course text, one entry per mistake, published here as `explanations.html`
- **Questions**: comprehension questions, built to test whether someone can recognise the mistake rather
  than repeat the rule
