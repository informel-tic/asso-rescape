import fs from 'fs';

const data = JSON.parse(fs.readFileSync('./eslint-errors.json', 'utf8'));

for (const fileResult of data) {
  const filePath = fileResult.filePath;
  let hasChanges = false;
  
  // We need to collect all valid ranges to replace
  // Then we replace from back to front to avoid breaking offsets
  const replacements = [];

  for (const msg of fileResult.messages) {
    if (msg.ruleId === '@typescript-eslint/no-explicit-any' && msg.suggestions) {
      const unknownSuggestion = msg.suggestions.find(s => s.messageId === 'suggestUnknown');
      if (unknownSuggestion && unknownSuggestion.fix) {
        replacements.push(unknownSuggestion.fix);
      }
    }
  }

  if (replacements.length === 0) continue;

  // Sort descending by range start
  replacements.sort((a, b) => b.range[0] - a.range[0]);

  let content = fs.readFileSync(filePath, 'utf8');
  for (const rep of replacements) {
    content = content.substring(0, rep.range[0]) + rep.text + content.substring(rep.range[1]);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Fixed ${replacements.length} 'any' usages in ${filePath}`);
}
