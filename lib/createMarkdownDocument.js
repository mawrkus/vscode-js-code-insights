exports.createMarkdownDocument = ({ fileName, results }) => {
	const {  totalCount, frequencies } = results;

	return `
## 🧮 JS identifier frequency analysis

- File → [${fileName}](${fileName})
- Total number of identifiers → ${totalCount}

### Frequencies

| Name | Frequency (%) | Count |
| ---  | ---           | ---   |
${frequencies
		.map(([name, f, count]) => `| ${name} | ${(Math.round(f * 100) / 100).toFixed(2)} | ${count} |`)
		.join('\n')
};
	`;
};
