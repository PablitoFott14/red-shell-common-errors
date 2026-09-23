# Red Shell · Common Errors: mistake viewer

The error pages of the **Common Errors** course for the OpenClaw MM Rubrics MULTI TURN project.

23 errors that keep costing people their tasks. Each page carries the rules the error breaks, quoted from
the Guidelines or the QC spec with the section they live in, and real tasks you can open beside them to see
the field that broke.

## → [pablitofott14.github.io/red-shell-common-errors](https://pablitofott14.github.io/red-shell-common-errors/)

That link is the course. The menu lists all 23 errors grouped into the seven sections, every error has its
own page, and each page moves to the next with the arrows at the bottom. The files in this repository are
what builds it; you do not need to read them to take the course.

---

## What is in here

| Page | What it does |
|---|---|
| `index.html` | The menu. Every error, grouped into the course's seven sections. |
| `mistakes/<name>.html` | One page per error, in five steps: what the issue is, why it matters with the rules it breaks quoted, how to recognise it in your own task, real tasks where it happened, what to do instead. |
| `checklist.html` | Every recognition test on one page, section by section. The five minutes before you submit. |
| `data/course.json` | The same content as data, if you want to render it somewhere else. |
| `evidence/<task>/` | The task files the examples open: golden pages, photos, videos. Only what an example needs. |

## Opening an example

Examples open **on the page you are already reading**, not on one of their own. Click one and a dialog comes
up with the point on the left (what is wrong here, why, what it should have been, and the rules that decide
it) and the task's own fields on the right, tabbed.

The tabs carry only the parts of the task the error actually lives in, so a milestone error shows you the
milestone table and the golden archive rather than the whole folder. The red chips in the left column jump
straight to the row that broke, switching tabs and scrolling to it. Left and right arrows walk the tabs,
**Expand** takes the dialog full window, and **Escape** puts you back where you were.

Where a task repeats the same defect a dozen times the panel shows four rows and tells you the count.

### Seeing the evidence

Where an error can only be checked by looking, the files it turns on open in the same dialog, as blue tabs
beside the task's fields: the golden page running as it shipped, the photo a prompt gave away, the video with
buttons that play the exact scene, the row of an export, the file a golden archive should not have carried.
Each one says what to look at, and the passage the example points to is marked. The blue chips in the left
column open them, and so does **Open it** beside a file in an archive panel. Click an image for full size.

Only the files an example needs are published, taken from the task's own archive. An input is published only
if the run itself named it, since a saved inputs archive does not always match what the run saw. Images carry
no metadata, and nothing on these pages identifies a contributor.

## What grounds all of this

**The rules come first.** Every error names the sections of the Guidelines and the QC spec that make it an
error, quoted word for word, with the section titles as they are printed in the document so you can go and
read the whole thing around them. All three documents are in `Evals/Project Resources`.

**The examples are real.** Every one is a task that was actually submitted to this project, shown as it was
submitted. Two things had to agree before an example was published: a mechanical detector reading the task
folder directly, so the defect is provably in the data, and an independent review of that same task. Where
both were not available, the example came from a worked write-up with every field value re-read from the
task folder, so the page shows what the task actually contains.

## Keeping it current

The site is generated. The build scripts live with the course material in Drive, under
`Coruses & Screenings/common errors/improved/_build/`:

```bash
python detect5.py      # run the mechanical detectors over the task folders
python relocate.py     # resolve each real task example to its task and rows
python build_data.py   # -> course_data.json
python build_site.py   # -> this site
python build_slides.py # -> the deck
python build_docs.py   # -> course_structure.md, explanations.md
```

`spec.py` holds what each mistake says. `rules.py` holds the quoted rules and the document section each one
comes from; a checker verifies every quote still appears verbatim in the file it names. Edit either and
rebuild. The slides, the explanations and these pages all read the same `course_data.json`, so none of them
can drift from the others.

## The rest of the course

- **Slides**: 13 HTML frames at 1920x1080, with a PNG of each
- **Explanations**: the course text, one entry per mistake, with the same quoted rules
- **Questions**: 23 comprehension questions, built to test whether someone can recognise the mistake rather
  than repeat the rule

All three live beside the build scripts in Drive.
