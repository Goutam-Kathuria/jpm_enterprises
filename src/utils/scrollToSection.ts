export function scrollToSection(id: string) {
  const el = document.getElementById(id);

  if (!el) {
    return;
  }

  const navigationOffset = 92;
  const targetTop =
    el.getBoundingClientRect().top + window.scrollY - navigationOffset;

  window.scrollTo({
    top: Math.max(targetTop, 0),
    behavior: "smooth",
  });
}
