function tokenize(text) {
  return String(text || '').toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter(Boolean);
}

function buildText(resource) {
  return [resource.title, resource.author, resource.category, resource.department, resource.courseCode, resource.description, ...(resource.keywords || [])].join(' ');
}

function cosineSimilarity(aTokens, bTokens) {
  const a = {}, b = {};
  aTokens.forEach(t => a[t] = (a[t] || 0) + 1);
  bTokens.forEach(t => b[t] = (b[t] || 0) + 1);
  const terms = new Set([...Object.keys(a), ...Object.keys(b)]);
  let dot = 0, magA = 0, magB = 0;
  terms.forEach(t => {
    dot += (a[t] || 0) * (b[t] || 0);
    magA += (a[t] || 0) ** 2;
    magB += (b[t] || 0) ** 2;
  });
  if (!magA || !magB) return 0;
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

function recommendResources(resources, userProfile, limit = 8) {
  const profileText = [userProfile.department, userProfile.level, ...(userProfile.interests || [])].join(' ');
  const profileTokens = tokenize(profileText);
  return resources
    .map(resource => ({ resource, score: cosineSimilarity(profileTokens, tokenize(buildText(resource))) }))
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => ({ ...item.resource.toObject?.() || item.resource, score: Number(item.score.toFixed(3)) }));
}

module.exports = { recommendResources };
