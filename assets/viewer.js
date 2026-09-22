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

  /* Evidence loads only when its tab is up: a page, a video or a recording is
     fetched the first time someone opens it, never with the page itself. */
  function wake(pane) {
    if (!pane) return;
    var i, lazy = pane.querySelectorAll("[data-src]");
    for (i = 0; i < lazy.length; i++) {
      if (!lazy[i].getAttribute("src")) {
        if (lazy[i].tagName !== "IFRAME") lazy[i].preload = "metadata";
        lazy[i].setAttribute("src", lazy[i].getAttribute("data-src"));
      }
    }
    toFirstMark(pane);
  }

  /* A text file or a table opens on its first marked passage, not on line 1. */
  function toFirstMark(pane) {
    var i, boxes = pane.querySelectorAll(".evtab, .evtext");
    for (i = 0; i < boxes.length; i++) {
      var box = boxes[i], hit = box.querySelector("tr.hit, mark");
      if (box._shown || !hit) continue;
      box._shown = true;
      box.scrollTop += hit.getBoundingClientRect().top - box.getBoundingClientRect().top - box.clientHeight / 3;
    }
  }

  function hush(root, keep) {
    var i, media = root.querySelectorAll("video, audio");
    for (i = 0; i < media.length; i++) {
      if (!keep || !keep.contains(media[i])) media[i].pause();
    }
  }

  function show(id) {
    var d = dialog(id);
    if (!d) return;
    if (open) hide(true);
    else prevFocus = document.activeElement;
    d.hidden = false;
    document.body.style.overflow = "hidden";
    open = d;
    wake(d.querySelector(".ovpane.on"));
    var c = d.querySelector(".ovclose");
    if (c) c.focus();
  }

  function hide(swapping) {
    if (!open) return;
    hush(open);
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
    var panes = dlg.querySelectorAll(".ovpane"), on = null;
    for (i = 0; i < panes.length; i++) {
      var here = panes[i].getAttribute("data-pane") === String(n);
      panes[i].classList.toggle("on", here);
      if (here) on = panes[i];
    }
    hush(dlg, on);
    wake(on);
  }

  /* A marked span of a video: jump to its start, play it, stop at its end. */
  function playSpan(btn) {
    var v = btn.closest(".evi").querySelector("video, audio");
    if (!v) return;
    wake(btn.closest(".ovpane"));
    var start = parseFloat(btn.getAttribute("data-t")), end = parseFloat(btn.getAttribute("data-end"));
    function go() {
      v.currentTime = start;
      v._startAt = start;
      v._stopAt = end;
      var p = v.play();
      if (p && p.catch) p.catch(function () {});
    }
    if (v.readyState >= 1) go();
    else v.addEventListener("loadedmetadata", go, { once: true });
  }

  /* Seeking out of the span by hand lets the video run on. */
  document.addEventListener("seeked", function (e) {
    var v = e.target;
    if (v._stopAt && (v.currentTime < v._startAt - 0.5 || v.currentTime > v._stopAt)) v._stopAt = null;
  }, true);

  document.addEventListener("timeupdate", function (e) {
    var v = e.target;
    if (v._stopAt && v.currentTime >= v._stopAt) { v.pause(); v._stopAt = null; }
  }, true);

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

    var img = t.closest(".evimg");
    if (img) { img.classList.toggle("full"); return; }

    var span = t.closest(".evmark");
    if (span) { playSpan(span); return; }

    var jump = t.closest(".jump, .evjump");
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
