exports.createMarkdownDocument = ({ fileName, results }) => {
	const {  totalCount, frequencies } = results;

	return `
## 🧮 JS identifiers analysis

- File → [${fileName}](${fileName})
- Total number of identifiers → ${totalCount}

### Identifier density

| Name | Density (%) | Count | Context |
| ---  | ---         | ---   | ---     |
${frequencies
		.map(([name, count, f, context]) => `| ${name} | ${(Math.round(f * 100) / 100).toFixed(2)} | ${count} | ${context.join(', ')} |`)
		.join('\n')
};
	`;
};
