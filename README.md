# Red Shell · Common Errors — mistake viewer

The worked-example layer of the **Common Errors** course for the OpenClaw MM Rubrics MULTI TURN project.

24 errors that keep costing people their tasks. Each page carries the rule the error breaks, quoted from the
Guidelines or the QC spec, then a real task where it happened with the field that broke it marked.

## → [pablitofott14.github.io/red-shell-common-errors](https://pablitofott14.github.io/red-shell-common-errors/)

That link is the course. The menu lists all 24 errors grouped into the seven sections, every error has its
own page, and each page moves to the next with the arrows at the bottom. The files in this repository are
what builds it; you do not need to read them to take the course.

---

## What is in here

| Page | What it does |
|---|---|
| `index.html` | The menu. Every error, grouped into the course's seven sections. |
| `mistakes/<name>.html` | One page per error. The rule it breaks, what the mistake is, how to spot it in your own task, what to do instead, then the real examples. |
| `checklist.html` | Every recognition test on one page, in build order. The five minutes before you submit. |
| `data/course.json` | The same content as data, if you want to render it somewhere else. |

Each example shows only the slice of the task that carries the mistake — the criterion, the milestone rows, the
prompt turn, the file listing — rather than the whole folder. The offending row is marked, and where a task
repeats the same defect a dozen times the page shows four and tells you the count.

## How the examples were chosen

The audit record decides which errors are worth a page and which task illustrates each one. It is not what
makes any of these an error: that is the rule quoted at the top of every page. Two things had to agree
before an example was published:

1. **A mechanical detector** reading the task folder directly, so the defect is provably in the data rather than
   inferred from a narrative. The detectors catch every task the auditors flagged for those mistakes, and
   usually a few more.
2. **The audit evidence list**, so a reviewer independently called it out on that task.

Examples that could not satisfy both were sourced from the audit pipeline's own worked example, with the field
values re-read from the task folder so the page shows what the task actually contains.

## Contributors

Each mistake page lists the people it was found on, as stable IDs like `CB-3F7A`. The IDs are consistent across
every page and across the insights dashboard, so the same ID is the same person throughout. The mapping from ID
to person is kept out of this repository.

## Keeping it current

The site is generated. The build scripts live with the course material in Drive, under
`Coruses & Screenings/common errors/improved/_build/`:

```bash
python detect5.py      # run the mechanical detectors over the task folders
python relocate.py     # resolve each worked example to its task and rows
python build_data.py   # -> course_data.json
python build_site.py   # -> this site
python build_slides.py # -> the deck
python build_docs.py   # -> course_structure.md, explanations.md
```

Edit `spec.py` to change what a mistake says, then rebuild. The slides, the explanations and these pages all
read the same `course_data.json`, so none of them can drift from the others.

## The rest of the course

- **Slides** — 13 HTML frames at 1920x1080
- **Explanations** — the course text, one entry per mistake
- **Questions** — 19 comprehension questions, built to test whether someone can recognise the mistake rather
  than repeat the rule

All three live beside the build scripts in Drive.
