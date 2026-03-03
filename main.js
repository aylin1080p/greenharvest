const loadPartials = async () => {
  const partialNodes = document.querySelectorAll('load[src]');

  await Promise.all(
    [...partialNodes].map(async node => {
      const src = node.getAttribute('src');
      if (!src) return;

      const response = await fetch(src);
      const html = await response.text();
      node.outerHTML = html;
    })
  );
};

loadPartials().catch(error => {
  console.error('Partial loading failed:', error);
});
