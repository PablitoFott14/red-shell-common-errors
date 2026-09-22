/* The example opens over the error you were reading, not on a page of its own.
   Same move as "Open the task" on the insights dashboard: a dialog, the point
   being made pinned on the left, the task's own fields tabbed on the right, and
   closing it puts you back exactly where you were. */
(function () {
  "use strict";

  var open = null;          // the dialog currently up
  var prevFocus = null;     // whatever had focus before it opened

  function dialog(id) {
    return document.getElementById("ex-" + id);
  }

  function show(id) {
    var d = dialog(id);
    if (!d) return;
    if (open) hide(true);
    else prevFocus = document.activeElement;
    d.hidden = false;
    document.body.style.overflow = "hidden";
    open = d;
    var c = d.querySelector(".ovclose");
    if (c) c.focus();
  }

  function hide(swapping) {
    if (!open) return;
    open.hidden = true;
    open.classList.remove("wide");
    var w = open.querySelector(".ovwide");
    if (w) w.textContent = "Expand";
    open = null;
    if (swapping) return;
    document.body.style.overflow = "";
    // Back to the card you came from, at the scroll position you left.
    if (prevFocus && prevFocus.focus) prevFocus.focus();
    prevFocus = null;
  }

  /* Tabs. One pane visible at a time, inside this dialog only. */
  function selectPane(dlg, n) {
    var i, tabs = dlg.querySelectorAll(".ovtab[data-pane]");
    for (i = 0; i < tabs.length; i++) {
      var on = tabs[i].getAttribute("data-pane") === String(n);
      tabs[i].classList.toggle("on", on);
      tabs[i].setAttribute("aria-selected", on ? "true" : "false");
    }
    var panes = dlg.querySelectorAll(".ovpane");
    for (i = 0; i < panes.length; i++) {
      panes[i].classList.toggle("on", panes[i].getAttribute("data-pane") === String(n));
    }
  }

  /* A jump chip puts the right tab up, then walks you to the row itself. */
  function goTo(dlg, pane, rowId) {
    selectPane(dlg, pane);
    var el = document.getElementById(rowId);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.classList.remove("pulse");
    void el.offsetWidth;                       // restart the animation
    el.classList.add("pulse");
    window.setTimeout(function () { el.classList.remove("pulse"); }, 1600);
  }

  document.addEventListener("click", function (e) {
    var t = e.target;

    var card = t.closest(".excard");
    if (card) { show(card.getAttribute("data-ex")); return; }

    var nav = t.closest(".exnav");
    if (nav) { show(nav.getAttribute("data-ex")); return; }

    if (t.closest(".ovclose")) { hide(); return; }

    var wide = t.closest(".ovwide");
    if (wide) {
      var back = wide.closest(".ovback");
      var now = back.classList.toggle("wide");
      wide.textContent = now ? "Shrink" : "Expand";
      return;
    }

    var body = t.closest(".ovbody");
    if (t.closest(".railhide") && body) { body.classList.add("railoff"); return; }
    if (t.closest(".showrail") && body) { body.classList.remove("railoff"); return; }

    var tab = t.closest(".ovtab[data-pane]");
    if (tab) { selectPane(tab.closest(".ovback"), tab.getAttribute("data-pane")); return; }

    var jump = t.closest(".jump");
    if (jump) {
      goTo(jump.closest(".ovback"), jump.getAttribute("data-pane"), jump.getAttribute("data-row"));
      return;
    }
  });

  /* Clicking the backdrop closes, the way every dialog on the dashboard does. */
  document.addEventListener("mousedown", function (e) {
    if (open && e.target === open) hide();
  });

  document.addEventListener("keydown", function (e) {
    if (!open) return;
    if (e.key === "Escape") { hide(); return; }
    // Left and right walk the tabs, so a long criteria block can be skimmed
    // without reaching for the mouse.
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    if (document.activeElement && document.activeElement.closest(".ovpanes")) return;
    var tabs = open.querySelectorAll(".ovtab[data-pane]");
    if (tabs.length < 2) return;
    var at = 0, i;
    for (i = 0; i < tabs.length; i++) if (tabs[i].classList.contains("on")) at = i;
    at = (at + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length;
    selectPane(open, tabs[at].getAttribute("data-pane"));
    e.preventDefault();
  });
})();
