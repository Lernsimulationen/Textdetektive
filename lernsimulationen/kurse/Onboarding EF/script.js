(function () {
  'use strict';
  const content = window.ONBOARDING_CONTENT;
  const updated = document.getElementById('lastUpdated');
  if (updated && content) updated.textContent = content.siteMeta.updated;

  // Die Startseite bleibt bewusst ein Wegweiser. Alle Details liegen auf eigenen Themenseiten.
  ['onboarding', 'oberstufe', 'startguide', 'ef-fahrplan', 'lernen', 'wenn-dann', 'assistent', 'kommunikation', 'kommunikationsregeln', 'tag', 'schulalltag', 'klausuren', 'bewertung', 'kursfahrt', 'faelle', 'regeln', 'rechte', 'konflikt', 'lernen-strategien', 'ki-guide', 'quellenarbeit', 'eltern', 'termine', 'service', 'unterstuetzung', 'feedback', 'glossar'].forEach(id => document.getElementById(id)?.remove());
  document.querySelector('.intro')?.remove();
  document.querySelector('.teams-callout')?.remove();

  const form = document.getElementById('siteSearch');
  const input = document.getElementById('searchInput');
  const results = document.getElementById('searchResults');
  const clear = document.getElementById('clearSearch');
  const topics = [
    { title: 'Was ist jetzt zu tun?', href: 'hilfe.html', terms: 'krank verspätung entschuldigung beurlaubung fehlzeit teams webuntis notfall hilfe' },
    { title: 'Schulalltag & Regeln', href: 'alltag.html', terms: 'handy rauchen vape raummiete flur toiletten notfall teams webuntis' },
    { title: 'Mein Alltag & meine Leistungen', href: 'lernen.html', terms: 'klausur bewertung lernen ki quellenarbeit täuschung' },
    { title: 'Für Eltern & Erziehungsberechtigte', href: 'eltern.html', terms: 'eltern krankheit unterstützung kontakt' },
    { title: 'Termine', href: 'termine.html', terms: 'termine kalender ferien projektwoche quartal' },
    { title: 'Glossar', href: 'glossar.html', terms: 'glossar eva attestpflicht operator nacharbeit oberstufe' }
  ];
  const hubCopy = document.querySelector('.hub-copy');
  if (hubCopy) hubCopy.textContent = 'Wähle ein Thema und finde die Informationen, die du gerade brauchst.';
  document.querySelectorAll('footer').forEach(footer => footer.remove());
  const renderResults = query => {
    if (!results || !clear) return;
    const normalized = query.trim().toLocaleLowerCase('de-DE');
    results.replaceChildren(); clear.hidden = !normalized;
    if (!normalized) return;
    const matches = topics.filter(topic => `${topic.title} ${topic.terms}`.toLocaleLowerCase('de-DE').includes(normalized));
    const message = document.createElement('p');
    message.className = 'search-empty';
    message.textContent = matches.length ? 'Passende Themen:' : `Keine direkte Zuordnung für „${query.trim()}“.`;
    results.append(message);
    if (!matches.length) return;
    const list = document.createElement('ul'); list.className = 'search-result-list';
    matches.forEach(topic => {
      const item = document.createElement('li'); const link = document.createElement('a');
      link.href = topic.href; link.textContent = topic.title; item.append(link); list.append(item);
    });
    results.append(list);
  };
  if (form && input) {
    form.addEventListener('submit', event => { event.preventDefault(); renderResults(input.value); });
    input.addEventListener('input', () => renderResults(input.value));
    form.addEventListener('reset', () => window.setTimeout(() => renderResults(''), 0));
  }
}());
