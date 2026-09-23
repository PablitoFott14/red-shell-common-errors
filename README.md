# Red Shell · Common Errors: mistake viewer

The error pages of the **Common Errors** course for the OpenClaw MM Rubrics MULTI TURN project.

23 mistakes that keep costing people their tasks, each shown in a real task from this project with the
exact spot marked. Open a mistake, see what went wrong and what to do instead, then open the real task and
land on the words, the row or the field where it happened.

## → [pablitofott14.github.io/red-shell-common-errors](https://pablitofott14.github.io/red-shell-common-errors/)

That link is the course. The menu lists all 23 mistakes in the seven sections, and can show only the ones
that fail the task, fail a client CORE standard or cost points. The files in this repository are what builds
it; you do not need to read them to take the course.

---

## What is in here

| Page | What it does |
|---|---|
| `index.html` | The menu. Every mistake, grouped into the course's seven sections, with a filter by what it costs. |
| `mistakes/<name>.html` | One page per mistake. The mistake and what to do instead, side by side; the real tasks where it happened; how to catch it in your own task; where the correct guidance is written; and why it matters, folded away. |
| `explanations.html` | The course's explanations: every mistake and every example taken apart in full. Each example links back to the exact spot in the viewer, and the viewer links to each example here. |
| `checklist.html` | Every recognition test on one page, section by section, with ticks that stay in your browser. |
| `data/course.json` | The same content as data, if you want to render it somewhere else. |
| `evidence/<task>/` | The task files the examples open: golden pages, photos, videos. Only what an example needs. |

## Opening an example

Examples open **on the page you are already reading**, not on one of their own. The dialog puts the point on
the left, in the order the explanations use (the task, where it shows, how it breaks the standard, what it
should have been), and the task's own fields on the right, tabbed. The tabs carry only the parts of the task
the mistake lives in.

It opens **on the spot**: the tab that "where it shows" points at, scrolled to the first marked place.

- **Yellow** marks the exact words to look at, inside the task's own text.
- **Red** flags the row at fault, and rings the one field at fault on it (a weight, a category, a modifier,
  an Assets Delivered). A Leg A turn no milestone covers is drawn into the milestone table as a missing row.
- **Green** marks task text that already does it the right way, where the task has any.
- **Blue** is a task file you can open.

The **Spot 1 of N** stepper in a tab's header walks every marked place in it, inside a golden page too. The
chips under "where it shows" jump straight to each one, and every reference in the explanation is a link:
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

**The examples are real.** Every one is a task that was actually submitted to this project, shown as it was
submitted. Every mark an example declares is checked against the task's own text when the site is built, so a
marked phrase is always one the task really contains.

## Keeping it current

The site is generated. The build scripts live with the course material in Drive, under
`Coruses & Screenings/common errors/improved/_build/`:

```bash
python build_data.py   # -> course_data.json, and the evidence files
python build_site.py   # -> this site, explanations.html included
python build_docs.py   # -> course_structure.md, explanations.md
python build_slides.py # -> the deck
```

`spec.py` holds what each mistake says and where each example's mistake sits. `rules.py` holds the quoted
rules and the document section each one comes from; a checker verifies every quote still appears verbatim in
the file it names. `check_viewer.py` drives every page in a headless browser: every example opens on its spot,
every jump lands, every evidence file loads, and every link between the explanations and the viewer resolves.

## The rest of the course

- **Slides**: 13 HTML frames at 1920x1080, with a PNG of each
- **Explanations**: the course text, one entry per mistake, published here as `explanations.html`
- **Questions**: comprehension questions, built to test whether someone can recognise the mistake rather
  than repeat the rule
