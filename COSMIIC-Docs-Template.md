---
sidebar_position: X
---

# COSMIIC Docs Style Guide

Guide for consistent contributions to documentation

---

## File formatting

- Use sidebar_position metadata to intentionally position a page in its category, 1 being top of category, on the sidebar menu
- Title of page follows the header metadata as a Header 1 `# Title`
- A short description of the page should follow the title
- [Optional: Add a quick link after the description]
- This title block should be separated from the rest of the document with a horizontal line `---`
- The body of the page should be organized into sections with subheadings at the Header 2 level `## Subheader`
- In the body text, each paragraph should be contained to a single code line
- Sections and paragraphs should be separated by an extra blank line for readability in code environments.

---

## Markdown styling

- Add code blocks or terms using back quote symbols ` `` ` to encapsulate code text
    - To encapsulate multiple lines of code, employ triple back quotes at the beginning and end ` ``` code ``` `
- Make text bold using asterisk symbols **`**link/text**`** when referencing a jargon vocabulary or links or file download links
    - Tag quick links at top of pages with the `:link:` emoticon
    - Tag file download links with the `:file_folder:` emoticon
- Connect content on pages with relative filepath links
- Beautify your page with images through the `![image](./img/filename.jpg)` shortcut

### Additional Markdown Styling

For additional basic Markdown formatting, refer to **[this cheat sheet](https://www.markdownguide.org/cheat-sheet/)**

---

## Contributing

Checklist to consider when contributing documentation:

- Test builds must be functional with no errors or warnings
- No broken links
- Check page order with header value `sidebar_position`
- Materials fit within CC-BY-4.0 license
- Content follows guidelines of the COSMIIC community **[Code of Conduct](./docs/Community/Code-of-Conduct.md)**