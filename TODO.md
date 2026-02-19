# TODO - Fix PDF Form Data Issue

## Problem
The form data is not showing in the PDF after form submission. This is due to duplicate code in script.js:
- Two form submission handlers
- Two generatePDF functions  
- Two storedFormData variables

## Solution
Remove duplicate code and keep only one clean implementation.

## Tasks
- [ ] Edit script.js to remove duplicate code at the bottom
- [ ] Keep only one form handler inside DOMContentLoaded
- [ ] Keep only one generatePDF function
- [ ] Test the fix

## Files to Edit
- script.js - Remove duplicate code (lines ~570 onwards)
